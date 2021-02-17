import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Summary from 'components/Summary/Summary';

const ConfirmationStep = ({
  formData,
  formSteps,
  formPath,
  successMessage,
  isSummaryCollapsable,
}) => {
  const router = useRouter();
  const { ref } = router.query;
  if (!formSteps) return null;
  return (
    <div>
      <div className="govuk-panel govuk-panel--confirmation govuk-!-margin-bottom-9">
        <h1 className="govuk-panel__title">
          {successMessage || 'Submission complete'}
        </h1>
        {ref && (
          <div className="govuk-panel__body">
            Your reference code
            <br />
            <strong>{ref}</strong>
          </div>
        )}
      </div>
      <Summary
        formData={formData}
        formPath={formPath}
        formSteps={formSteps}
        isSummaryCollapsable={isSummaryCollapsable}
      />
    </div>
  );
};

ConfirmationStep.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  formPath: PropTypes.string.isRequired,
  successMessage: PropTypes.string,
  isSummaryCollapsable: PropTypes.bool,
};

export default ConfirmationStep;
