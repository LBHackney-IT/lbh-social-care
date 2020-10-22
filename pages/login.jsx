import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { redirectToHome, isAuthorised } from 'utils/auth';
import { getProtocol } from 'lib/urls';
import AdminLogin from 'components/AdminLogin/AdminLogin';

export default function AdminLoginPage({ gssoUrl, returnUrl }) {
  return (
    <div>
      <NextSeo title="Log In" noindex={true} />
      <h1>Login</h1>

      <p className="govuk-body">
        Please log in with your Hackney email account.
      </p>

      <AdminLogin submitText="Login" gssoUrl={`${gssoUrl}${returnUrl}`} />

      <p className="govuk-body">
        Please contact your administrator if you have issues logging in.
      </p>
    </div>
  );
}

AdminLoginPage.propTypes = {
  gssoUrl: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired
};

export const getServerSideProps = async ctx => {
  const { GSSO_URL } = process.env;
  const protocol = getProtocol();
  const host = ctx.req.headers.host;

  const user = isAuthorised(ctx);

  if (user && user.isAuthorised) {
    redirectToHome(ctx);
  }

  return {
    props: {
      gssoUrl: GSSO_URL,
      returnUrl: `${protocol}://${host}`
    }
  };
};
