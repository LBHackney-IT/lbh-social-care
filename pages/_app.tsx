import { useState } from 'react';
import App, { AppInitialProps, AppContext, AppProps } from 'next/app';
import { NextComponentType } from 'next';
import axios from 'axios';
import { SWRConfig } from 'swr';

import Layout from 'components/Layout';
import GoogleAnalytics from 'components/GoogleAnalytics/GoogleAnalytics';
import { AuthProvider } from 'components/UserContext/UserContext';
import { ErrorBoundary } from 'components/ErrorBoundary/ErrorBoundary';
import { isAuthorised, shouldRedirect } from 'utils/auth';

import type { User } from 'types';

import 'stylesheets/all.scss';
import 'stylesheets/header.scss';
import { FeatureFlagProvider } from '../lib/feature-flags/feature-flags';
import { getFeatureFlags } from 'features';
import { useRouter } from 'next/router';

interface Props {
  user?: Partial<User>;
}

interface ExtendedAppProps extends AppProps<Props> {
  Component: NextComponentType & {
    goBackButton: boolean;
    noLayout: boolean;
  };
}

const CustomApp = ({
  Component,
  pageProps,
}: ExtendedAppProps): JSX.Element | null => {
  const [user] = useState(pageProps.user);
  const { query } = useRouter();
  const features = getFeatureFlags({
    environmentName: pageProps.environmentName,
    query,
  });

  return (
    <FeatureFlagProvider features={features}>
      <SWRConfig
        value={{
          fetcher: (resource, options) =>
            axios.get(resource, options).then((res) => res.data),
          onErrorRetry: (error) => {
            if (error.status === 404) return;
          },
        }}
      >
        <AuthProvider user={user}>
          <GoogleAnalytics>
            <Layout
              goBackButton={Component.goBackButton}
              noLayout={Component.noLayout}
            >
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </Layout>
          </GoogleAnalytics>
        </AuthProvider>
      </SWRConfig>
    </FeatureFlagProvider>
  );
};

CustomApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & Props> => {
  let user;

  if (appContext.ctx.req && appContext.ctx.res) {
    user = isAuthorised(appContext.ctx.req) ?? user;
    const redirect =
      appContext.ctx.req.url && shouldRedirect(appContext.ctx.req.url, user);
    if (redirect && appContext.ctx.res.writeHead) {
      appContext.ctx.res.writeHead(302, {
        Location: redirect,
      });
      appContext.ctx.res.end();
    }
  }

  const appProps = await App.getInitialProps(appContext);

  const environmentName = [
    'social-care-service-staging.hackney.gov.uk',
    'dev.hackney.gov.uk:3000',
  ].includes(process.env.REDIRECT_URL || '')
    ? 'development'
    : 'production';

  return {
    ...appProps,
    pageProps: { ...appProps.pageProps, user, environmentName },
  };
};

export default CustomApp;
