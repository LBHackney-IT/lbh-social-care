import { Formik, Form, Field, FormikHelpers } from 'formik';
import { useState } from 'react';
import s from './InPlaceEditor.module.scss';

interface Props {
  initialValue: string;
  onChange: (newValue: string) => void;
  required?: boolean;
  error?: string;
}

interface FormValues {
  attribute: string;
}

const InPlaceEditor = ({
  initialValue,
  onChange,
  required,
  error = 'You must provide a value',
}: Props): React.ReactElement => {
  const [editing, setEditing] = useState<boolean>(false);

  const handleSubmit = async (
    values: FormValues,
    { setStatus }: FormikHelpers<FormValues>
  ) => {
    try {
      setEditing(false);
      await onChange(values.attribute);
    } catch (e) {
      setStatus(e.toString());
    }
  };

  const handleCancel = (resetForm: () => void) => {
    setEditing(false);
    resetForm();
  };

  if (editing)
    return (
      <Formik
        initialValues={{
          attribute: initialValue,
        }}
        onSubmit={handleSubmit}
        validationSchema={(values: FormValues) => {
          if (required && !values.attribute)
            return {
              attribute: error,
            };
          return {};
        }}
      >
        {({ resetForm, isSubmitting, errors }) => (
          <Form className={s.form}>
            <Field name="attribute" />

            {(status || errors.attribute) && (
              <span role="alert" className={s.errorMessage}>
                <span className="govuk-visually-hidden">Error:</span>
                {status || errors.attribute}
              </span>
            )}

            <button disabled={isSubmitting} className={s.saveButton}>
              Save changes
            </button>
            <button
              type="button"
              onClick={() => handleCancel(resetForm)}
              className={s.cancelButton}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    );

  return (
    <div className={s.outer}>
      <span>{initialValue}</span>
      <button onClick={() => setEditing(true)} className={s.editButton}>
        Edit
      </button>
    </div>
  );
};

export default InPlaceEditor;
