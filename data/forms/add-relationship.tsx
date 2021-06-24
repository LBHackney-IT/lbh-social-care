import { FormStep } from 'components/Form/types';

const formSteps: FormStep[] = [
  {
    id: 'add-relationship',
    title: 'Add Relationship',
    components: [
      <h2
        key="subtitle-details"
        className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
      >
        Add new relationship
      </h2>,
      {
        component: 'Select',
        placeHolder: 'Relationship type',
        name: 'type',
        label: 'Type',
        width: 20,
        rules: { required: true },
        options: [
          { value: 'A', text: 'AAA' },
          { value: 'C', text: 'BBB' },
        ],
      },
      {
        component: 'TextInput',
        name: 'details',
        width: 20,
        label: 'Details',
        rules: { required: false },
      },
    ],
  },
];

export default formSteps;
