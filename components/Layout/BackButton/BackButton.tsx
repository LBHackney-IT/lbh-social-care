import Router from 'next/router';

const BackButton = (): React.ReactElement => (
  <a className="govuk-back-link" role="button" onClick={() => Router.back()}>
    Back
  </a>
);

export default BackButton;