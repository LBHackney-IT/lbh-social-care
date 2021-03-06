import { ConditionalFeature } from '../../../lib/feature-flags/feature-flags';
import { useAuth } from '../../UserContext/UserContext';
import s from './Footer.module.scss';

const Footer = (): React.ReactElement => {
  const { user } = useAuth();

  return (
    <footer className={`${s.footer}`} role="contentinfo">
      <div className="govuk-width-container">
        <nav className={s.links}>
          <a href="https://sites.google.com/hackney.gov.uk/moderntoolsforsocialcare">
            Roadmap
          </a>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScILbPD1ioKHzp1D3HN4_DKaxV2tpWLMu8upSSqNgSPCo85cg/viewform">
            Give feedback
          </a>
        </nav>

        <div className={s.meta}>Built and maintained by HackIT.</div>

        <ConditionalFeature name="feature-flags-implementation-proof">
          {user?.hasAdminPermissions && (
            <div className={s.meta}>Feature flags are active and working</div>
          )}
        </ConditionalFeature>
      </div>
    </footer>
  );
};

export default Footer;
