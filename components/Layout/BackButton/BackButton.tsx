const BackButton = ({ href }: { href?: string }): React.ReactElement => (
  <div className="lbh-container">
    <a
      className="govuk-back-link lbh-back-link lbh-link--no-visited-state"
      href={href ?? '#'}
      onClick={href ? undefined : () => window.history.back()}
    >
      Go back
    </a>
  </div>
);

export default BackButton;
