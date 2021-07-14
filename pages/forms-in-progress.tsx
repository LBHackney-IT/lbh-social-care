import Seo from 'components/Layout/Seo/Seo';
import SavedForms from 'components/SaveFormData/SaveFormData';
import DashboardWrapper from 'components/Dashboard/DashboardWrapper';
import { GetServerSideProps } from 'next';
import { getUnfinishedSubmissions } from 'lib/submissions';
import { Submission } from 'data/flexibleForms/forms.types';
import SubmissionsTable from 'components/SubmissionsTable';
import { isAuthorised } from 'utils/auth';

interface Props {
  submissions: Submission[];
}

const UnfinishedSubmissions = ({ submissions }: Props): React.ReactElement => (
  <>
    <Seo title="Unfinished submissions" />
    <DashboardWrapper>
      <>
        <h1 className="lbh-heading-h2 govuk-!-margin-bottom-6">
          Unfinished submissions
        </h1>
        {submissions?.length > 0 && (
          <SubmissionsTable submissions={submissions} />
        )}
        <SavedForms />
      </>
    </DashboardWrapper>
  </>
);

export default UnfinishedSubmissions;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = isAuthorised(req);
  const submissions = await getUnfinishedSubmissions(user?.permissionFlag);

  return {
    props: {
      submissions,
    },
  };
};
