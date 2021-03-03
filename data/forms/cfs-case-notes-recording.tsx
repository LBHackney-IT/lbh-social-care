import CFS_SERVICE_AREAS from 'data/cfsServiceAreas';
import CFS_CASE_NOTE from 'data/cfsCaseNoteTypes';

import { FormStep, Option } from 'components/Form/types';

const dynamicServiceAreas: { [key: string]: Option[] } = CFS_SERVICE_AREAS;

const formSteps: FormStep[] = [
  {
    id: 'cfs-case-notes-recording',
    title: 'CFS Case Notes Recording',
    components: [
      {
        component: 'Select',
        name: 'serviceAreaType',
        label: 'Is this a group case note?',
        options: ['Yes', 'No'],
      },
      {
        component: 'Select',
        name: 'serviceArea',
        label: 'Service Areas',
        options: Object.keys(CFS_SERVICE_AREAS),
      },
      {
        component: 'Select',
        name: 'unit',
        label: 'Service Areas - Unit',
        options: ({ serviceArea }) => dynamicServiceAreas[serviceArea],
        conditionalRender: ({ serviceArea }) => Boolean(serviceArea),
      },
      {
        component: 'Select',
        name: 'cfsCaseNoteType',
        label: 'What type of case note is this?',
        options: CFS_CASE_NOTE,
      },
      {
        component: 'TextInput',
        name: 'cfsOtherNoteType',
        width: 30,
        label: "if 'Other', please provide case note type",
        conditionalRender: ({ cfsCaseNoteType }) => cfsCaseNoteType === 'Other',
      },
      {
        component: 'DateInput',
        name: 'dateOfEvent',
        label: 'Date of Event',
        hint: 'For example, 31 03 1980',
      },
      {
        component: 'TextInput',
        name: 'cfsCaseNoteTitle',
        width: 30,
        label: 'Case Note Title',
      },
      {
        component: 'TextArea',
        name: 'cfsCaseNoteDescription',
        width: 30,
        label: 'Case Note Description',
      },
    ],
  },
];

export default formSteps;