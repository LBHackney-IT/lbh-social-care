import * as Yup from 'yup';
import { FormikValues, FormikErrors } from 'formik';
import { Field } from 'data/flexibleForms/forms.types';
import { ObjectShape, OptionalObjectSchema, TypeOfShape } from 'yup/lib/object';
import { getTotalHours } from './utils';

export const startSchema = Yup.object().shape({
  socialCareId: Yup.number()
    .typeError('ID can only contain numbers')
    .integer('ID can only contain numbers')
    .required('Please provide an ID'),
  formId: Yup.string().required('Please choose a form'),
});

export const addRelationshipSchema = Yup.object().shape({
  relationshipType: Yup.string().required('Please provide a relationship type'),
  context: Yup.string().required('Enter some context'),
  additionalOptions: Yup.array().of(Yup.string()),
});

const getErrorMessage = (field: Field) => {
  if (field.error) return field.error;
  if (field.type === `timetable`) return `Total hours must be more than zero`;
  if (field.type === `checkboxes`) return `Choose at least one item`;
  if (
    field.type === 'Tags' ||
    field.type === 'repeater' ||
    field.type === `repeaterGroup`
  )
    return `Add at least one ${field.itemName || 'item'}`;
  return `This question is required`;
};

/** create a validation schema for a flexible form, ignoring conditional fields */
export const generateFlexibleSchema = (
  fields: Field[]
): OptionalObjectSchema<
  ObjectShape,
  Record<string, unknown>,
  TypeOfShape<ObjectShape>
> => {
  const shape: { [key: string]: Yup.AnySchema | Yup.ArraySchema<any> } = {};

  fields.map((field) => {
    if (field.type === 'repeaterGroup') {
      // recursively generate a schema for subfields of a repeater geoup
      shape[field.id] = Yup.array().of(
        generateFlexibleSchema(field.subfields || [])
      );
    } else if (field.type === 'timetable') {
      shape[field.id] = Yup.object();
    } else if (
      field.type === 'checkboxes' ||
      field.type === 'repeater' ||
      field.type === 'Tags'
    ) {
      shape[field.id] = Yup.array().of(Yup.string());
    } else {
      shape[field.id] = Yup.string();
    }

    // add a required attribute if a field is required and not conditional
    if (field.required && !field.condition) {
      if (field.type === 'timetable') {
        shape[field.id] = shape[field.id].test(
          'total',
          getErrorMessage(field),
          (value) => getTotalHours(value) !== 0
        );
      } else if (
        field.type === 'checkboxes' ||
        field.type === 'Tags' ||
        field.type === 'repeater' ||
        field.type === 'repeaterGroup'
      ) {
        shape[field.id] = (shape[field.id] as Yup.NumberSchema).min(
          1,
          getErrorMessage(field)
        );
      } else {
        shape[field.id] = shape[field.id].required(getErrorMessage(field));
      }
    }
  });

  return Yup.object().shape(shape);
};

/** respect the "required" attribute for conditional fields, only when the condition is met */
export const validateConditionalFields = (
  values: FormikValues,
  fields: Field[]
): FormikErrors<FormikValues> => {
  const errors: FormikErrors<FormikValues> = {};
  fields.map((field) => {
    if (field.condition) {
      if (
        Array.isArray(field.condition)
          ? !field.condition.every((cond) => values[cond.id] === cond.value) &&
            field.required
          : values[field.condition.id] === field.condition.value &&
            field.required
      ) {
        if (field.type === 'timetable') {
          // handle timetable fields specially
          if (getTotalHours(values[field.id]) === 0)
            errors[field.id] = getErrorMessage(field);
        } else {
          if (!values[field.id]?.length)
            errors[field.id] = getErrorMessage(field);
        }
      }
    }
  });
  return errors;
};
