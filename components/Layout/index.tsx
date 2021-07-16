import Seo from './Seo/Seo';
import Header from './Header/Header';
import SkipLink from './SkipLink/SkipLink';
import PhaseBanner from './PhaseBanner/PhaseBanner';
import BackButton from './BackButton/BackButton';
import Footer from './Footer/Footer';

export interface Props {
  children: React.ReactChild;
  goBackButton: string | boolean;
  noLayout: boolean;
}

const Layout = ({
  children,
  goBackButton = false,
  noLayout = false,
}: Props): React.ReactElement => {
  if (noLayout) return <>{children}</>;

  const feedbackLink = process.env.NEXT_PUBLIC_FEEDBACK_LINK || '';
  return (
    <>
      <Seo title="Social Care Admin - Hackney Council" />
      <SkipLink />
      <Header serviceName="Social Care" />
      <PhaseBanner phase="beta" feedbackLink={feedbackLink} />
      {goBackButton && (
        <BackButton
          href={typeof goBackButton === 'string' ? goBackButton : undefined}
        />
      )}

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="content" role="main">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
