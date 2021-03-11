import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import Summary from 'components/Summary/Summary';
import { useCaseByResident } from 'utils/api/cases';
import * as form from 'data/forms';

const CaseRecap = ({ personId, recordId }) => {
  const { data: record, error: recordError } = useCaseByResident(
    personId,
    recordId
  );

  const recordData =
    record && record.caseFormData && record.caseFormData.form_name_overall;
  const fileData = form[recordData];

  if (recordError || (recordData && !fileData)) {
    return <ErrorMessage />;
  }
  if (!record || !fileData) {
    return <Spinner />;
  }
  return (
    <>
      <Summary
        formData={record.caseFormData}
        formSteps={fileData}
        formPath={`/people/${personId}/records/${recordId}/`}
      />
    </>
  );
};

CaseRecap.propTypes = {
  personId: PropTypes.string.isRequired,
  recordId: PropTypes.string.isRequired,
};

export default CaseRecap;