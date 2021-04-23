import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import AddForm from 'components/AddForm/AddForm';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';

const AddNewRecordPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  return (
    <>
      <Seo title={`Add a new record for #${query.id}`} />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a new record for
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => (
          <>
            <p className="govuk-label govuk-!-margin-top-7 govuk-!-margin-bottom-5">
              Use forms to create a new record for a person
            </p>
            <AddForm person={person} />
          </>
        )}
      </PersonView>
    </>
  );
};

export default AddNewRecordPage;
