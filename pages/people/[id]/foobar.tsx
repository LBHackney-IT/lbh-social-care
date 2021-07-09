import Head from 'next/head';
import PersonWidget from 'components/PersonWidget/PersonWidget';
import s from 'stylesheets/Sidebar.module.scss';
import React from 'react';
import { mockedResident } from 'factories/residents';
import { addRelationships } from 'utils/api/relationships';
import { Formik, Form } from 'formik';
import Button from 'components/Button/Button';
import RELATIONSHIP_TYPE_OPTIONS from 'data/relationships';
import ComboboxField from 'components/FlexibleForms/ComboboxField';
import TextField from 'components/FlexibleForms/TextField';
import CheckboxField from 'components/FlexibleForms/CheckboxField';
import { addRelationshipSchema } from 'lib/validators';

interface FormData {
  relationshipType: string;
  context: string;
  additionalOptions: string[];
}

const TaskListPage = (): React.ReactElement => {
  const onFormSubmit = async (formData: FormData) => {
    const { data, error } = await addRelationships({
      ...formData,
      personId: Number(mockedResident.id),
      otherPersonId: 4,
    });

    if (error) throw error;

    return data;
  };

  const choices = (values: FormData) => {
    return (
      RELATIONSHIP_TYPE_OPTIONS?.find(
        (el) => el.value === values.relationshipType
      )?.additionalOptions?.map((option) => ({
        value: option,
        label: option,
      })) || []
    );
  };

  return (
    <>
      <Head>
        <title>Add a new relationship | Social care | Hackney Council</title>
      </Head>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
            Add a new relationship
          </h1>
        </div>
      </div>
      <div className={`govuk-grid-row ${s.outer}`}>
        <div className="govuk-grid-column-two-thirds">
          <Formik
            validationSchema={addRelationshipSchema}
            onSubmit={onFormSubmit}
            initialValues={{
              relationshipType: RELATIONSHIP_TYPE_OPTIONS[0].value,
              context: '',
              additionalOptions: [],
            }}
          >
            {({ touched, errors, isSubmitting, values }) => (
              <Form>
                <ComboboxField
                  touched={touched}
                  errors={errors}
                  label="What type of relationship?"
                  name="relationshipType"
                  choices={RELATIONSHIP_TYPE_OPTIONS.map((option) => ({
                    value: option.value,
                    label: option.text,
                  }))}
                />
                {choices(values).length > 0 && (
                  <CheckboxField
                    touched={touched}
                    errors={errors}
                    choices={choices(values)}
                    name="additionalOptions"
                    label="Select all that apply"
                  />
                )}
                <TextField
                  touched={touched}
                  errors={errors}
                  label="More context"
                  hint="For example, no longer in contact"
                  name="context"
                  as="textarea"
                />
                <button
                  className="govuk-button lbh-button"
                  disabled={isSubmitting}
                >
                  Save relationship
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div className="govuk-grid-column-one-third">
          <div className={s.sticky}>
            <p className="lbh-body">This is for:</p>
            <PersonWidget person={mockedResident} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskListPage;
