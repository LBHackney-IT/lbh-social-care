import { GetServerSideProps } from 'next';
import { Submission } from 'data/flexibleForms/forms.types';
import { getSubmissionById } from 'lib/submissions';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';
import Head from 'next/head';
import s from 'stylesheets/Sidebar.module.scss';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import { Resident, User } from 'types';
import forms from 'data/flexibleForms';
import RevisionTimeline from 'components/RevisionTimeline/RevisionTimeline';
import PanelApprovalWidget from 'components/ApprovalWidget/PanelApprovalWidget';
import ApprovalWidget from 'components/ApprovalWidget/ApprovalWidget';
import { useAuth } from 'components/UserContext/UserContext';

interface Props {
  submission: Submission;
  person: Resident;
  user: User;
}

const SubmissionPage = ({ submission, person }: Props): React.ReactElement => {
  const form = forms.find((form) => form.id === submission.formId);
  const { user } = useAuth() as { user: User };

  return (
    <>
      <Head>
        <title>
          {form?.name} | {person.firstName} {person.lastName} | Social care |
          Hackney Council
        </title>
      </Head>

      {form?.approvable && (
        <ApprovalWidget user={user} submission={submission} />
      )}

      {form?.panelApprovable && (
        <PanelApprovalWidget user={user} submission={submission} />
      )}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            {form?.name}
          </h1>
        </div>
      </div>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          <FlexibleAnswers answers={submission.formAnswers} />
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <p className="lbh-body">This is for:</p>
            <PersonWidget person={person} />
            <RevisionTimeline submission={submission} />
          </div>
        </div>
      </div>
    </>
  );
};

SubmissionPage.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const submission = await getSubmissionById(String(params?.submissionId));
  const person = submission.residents.find(
    (p) => p.id === parseInt(params?.id as string)
  ) as Resident;

  if (!submission.submissionId || submission.submissionState === 'Discarded') {
    return {
      props: {},
      redirect: {
        destination: `/404`,
      },
    };
  }

  if (submission.submissionState === 'In progress') {
    return {
      props: {},
      redirect: {
        destination: `/submissions/${submission.submissionId}`,
      },
    };
  }

  return {
    props: {
      submission,
      person,
    },
  };
};

export default SubmissionPage;
