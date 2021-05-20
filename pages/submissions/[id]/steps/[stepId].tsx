import { useCallback } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import StepForm from 'components/FlexibleForms/StepForm';
import { useRouter } from 'next/router';
import s from '../../../../styles/Sidebar.module.scss';
import Banner from 'components/FlexibleForms/Banner';
import { Form, Step, Field } from 'data/flexibleForms/forms.types';
import { Resident } from 'types';
import axios from 'axios';
import { getProtocol } from 'utils/urls';
import { FormikValues as FormValues, FormikHelpers } from 'formik';

interface Props {
  params: {
    id: string;
    stepId: string;
  };
  stepAnswers;
  person: Resident;
  step: Step;
  form: Form;
}

const Step = ({
  params,
  stepAnswers,
  person,
  step,
  form,
}: Props): React.ReactElement => {
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}/steps/${params.stepId}`,
        {
          data: values,
        }
      );
      if (data.error) throw data.error;
    } catch (e) {
      setStatus(e.toString());
    }
  };

  const handleFinish = async (
    values: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/submissions/${params.id}`,
        {
          data: person,
        }
      );
      if (data.error) throw data.error;
      router.push('/');
    } catch (e) {
      setStatus(e.toString());
    }
  };

  const prefillable = useCallback(
    () => step.fields.find((field: Field) => field.prefill),
    [step.fields]
  )();

  return (
    <>
      <Head>
        <title>{step.name} | Social care | Hackney Council</title>
      </Head>

      {!stepAnswers && prefillable && (
        <Banner title="Some answers on this page have been prefilled">
          You can change them if you need.
        </Banner>
      )}

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            {step.name}
          </h1>
        </div>
      </div>

      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          {step.fields && (
            <StepForm
              person={person}
              initialValues={stepAnswers}
              fields={step.fields}
              onSubmit={handleSubmit}
              onFinish={handleFinish}
              singleStep={form.steps.length === 1}
            />
          )}
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <p className="lbh-body">This is for:</p>
            <PersonWidget person={person} />
          </div>
        </div>
      </div>
    </>
  );
};

Step.goBackButton = true;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const protocol = getProtocol();

  const { data } = await axios.get(
    `${protocol}://${process.env.REDIRECT_URL}/api/submissions/${params?.id}/steps/${params?.stepId}`
  );

  // redirect if step doesn't exist
  if (!data.step) {
    return {
      props: {},
      redirect: {
        destination: '/404',
      },
    };
  }

  return {
    props: {
      params,
      ...data,
    },
  };
};

export default Step;
