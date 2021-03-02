import TENURETYPES from 'data/tenureTypes';
import SUPPORTREASON from 'data/supportReason';
import PROFESSIONS from 'data/professions';

const steps = [
  {
    id: 'Conversation3',
    title: '/form/conversation-3/',
    components: [
      {
        id: 'record-of-conversation-1',
        title: 'Record of Conversation',
        components: [
          {
            component: 'DatePicker',
            name: 'start_date_of_conversation_3',
            label: 'Start Date of Conversation 3',
            rules: { required: true },
          },
          <h3
            key="person details"
            className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
          >
            Person Details
          </h3>,
          {
            component: 'NumberInput',
            name: 'emergency_id',
            label: 'Emergency ID (ASC)',
            width: '10',
            hint:
              '(Find or create an emergency ID number for this person in the list of numbers provided to your team, and enter it here)',
          },
          {
            component: 'Select',
            name: 'primary_address_tenure_type',
            label: 'Primary Address Tenure Type',
            options: TENURETYPES,
          },
          {
            component: 'Radios',
            name: 'household_structure',
            label: 'Household Structure',
            options: ['Lives alone', 'Lives with Others', 'Unknown'],
          },
          <h3
            key="key contacts"
            className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
          >
            Key Contacts
          </h3>,
          {
            component: 'TextInput',
            name: 'list_key_contacts',
            width: '30',
            label: 'List your key contacts',
            hint:
              "(Include 'Name', 'Relationship/Role', 'Address and Contact Details' for each individual that would appear in the Key Contacts table)",
          },
          {
            component: 'TextInput',
            name: 'gp_name',
            width: '30',
            label: 'GP Name',
          },
          {
            component: 'TextInput',
            name: 'gp_practice',
            width: '30',
            label: 'GP Practice',
          },
          {
            component: 'TextInput',
            name: 'gp_address',
            width: '30',
            label: 'GP Address',
          },
          {
            component: 'PhoneInput',
            name: 'gp_phone',
            width: '30',
            label: 'GP Telephone',
          },
          {
            component: 'EmailInput',
            name: 'gp_email',
            width: '30',
            label: 'GP Email',
          },
          {
            component: 'Radios',
            name: 'person_assessed',
            label:
              'Has this person been assessed by Hackney adult social care before?',
            options: ['Yes', 'No', 'Not known'],
            rules: { required: true },
          },
          <h3
            key="support reasons"
            className="govuk-fieldset__legend--l gov-weight-lighter govuk-!-margin-bottom-5"
          >
            Support Reasons
          </h3>,
          {
            component: 'Select',
            name: 'primary_support_reason',
            label: 'Primary Support Reason',
            options: SUPPORTREASON,
          },
        ],
      },
      {
        id: 'communication-2',
        title: 'Communication',
        components: [
          {
            component: 'TextInput',
            name: 'preferred_contact',
            width: '30',
            label: 'Preferred method of contact',
          },
          {
            component: 'TextInput',
            name: 'fluency_english',
            width: '30',
            label: 'Fluency in English',
          },
          {
            component: 'TextInput',
            name: 'first_preferred_language',
            width: '30',
            label: 'First/preferred language',
          },
          {
            component: 'Radios',
            name: 'interpreter_required',
            label: 'Interpreter required?',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'communication_difficulties',
            label: 'Do you have communication difficulties?',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'understanding_difficulties',
            label:
              'Do you have any difficulties with understanding and/or retaining information?',
            options: ['Yes', 'No'],
          },
          {
            component: 'Radios',
            name: 'decision_impact_diffiulties',
            label:
              'Do you have any difficulties making decisions and/or understanding their impact?',
            options: ['Yes', 'No'],
          },
          {
            component: 'TextArea',
            name: 'communication_further_details',
            label: 'Further Details (Communication)',
          },
        ],
      },
      {
        id: 'supporting-assessment-3',
        title: 'Supporting you in your assessment',
        components: [
          {
            component: 'TextArea',
            name: 'assessment_help',
            label:
              'Please provide details of difficulties and what would help you communicate more easily during your assessment (e.g. a family member or friend present, an independent advocate, specialist communication support)',
          },
          {
            component: 'TextArea',
            name: 'assessment_help',
            label:
              'Please list other people involved in your assessment (e.g. advocate, carer, family, friend, other professionals) Provide details including names, roles/relationship and contact details.',
          },
        ],
      },
      {
        id: 'about-you-4',
        title: 'About You',
        components: [
          {
            component: 'Radios',
            name: 'decline_support',
            label:
              'Did the client choose to decline any further Social Services support?',
            hint:
              '(Has the client stated that they do not wish further assessment or services from Hackney Adults Social Care at this point)',
            options: ['Yes', 'No'],
          },
        ],
      },
      {
        id: 'personal-budget10',
        title: 'My Personal Budget',
        components: [
          {
            component: 'TextInput',
            name: 'total_weekly_hours',
            width: '30',
            label: 'My total weekly hours (Budget)',
            hint: 'Use decimal notation for part-hours',
          },
          {
            component: 'DateInput',
            name: 'date_of_plan',
            label: 'Date of Plan',
            hint:
              'Submission date of this Google form - instead of authorised date',
          },
          <h3 key="budget_sub_heading">Budget Spending Plan Guidance</h3>,
          <p key="gross_weekly">
            Calculate gross weekly cost of all resources approved (excluding top
            ups). Do not include symbols or commas in the figures entered.
          </p>,
          {
            component: 'Checkbox',
            name: 'desired_outcome_options',
            label: 'Desired outcome options',
            options: [
              { value: '1', text: ' Maintain a habitable home environment' },
              { value: '2', text: 'Manage and maintain nutrition' },
              { value: '3', text: 'Manage toilet needs' },
              { value: '4', text: 'Maintain personal hygiene' },
              { value: '5', text: 'Be appropriately clothed' },
              {
                value: '6',
                text:
                  'Develop and maintain family or other personal relationships',
              },
              {
                value: '7',
                text:
                  'Make use of necessary facilities or services in local community',
              },
              {
                value: '8',
                text:
                  'Access and engage in work, training, education or volunteering',
              },
              {
                value: '9',
                text: 'Carry out any caring responsibilities for a child',
              },
              { value: '10', text: 'Be able to make use of your home safely' },
            ],
          },
          {
            component: 'Checkbox',
            name: 'show_next_step',
            label: 'Show next step',
          },
          <p key="options">
            Who by options (Who will be responsible to do this):
            <ul>
              <li>By myself</li>
              <li>By family </li>
              <li> friend </li>
              <li>carer </li>
              <li>By support from a community group</li>
              <li> By support from a health professional</li>
              <li> By provision of equipment </li>
              <li>Major Adaptation </li>
              <li>By provision of domiciliary care </li>
              <li>By provision of Direct Payment </li>
              <li>By Housing with Care By respite </li>
              <li>By a day service</li>
              <li> By support from housing</li>
              <li>By support from Children’s services</li>
            </ul>
          </p>,
          {
            component: 'TextArea',
            name: 'budget_desired_outcome',
            width: '30',
            label: 'Budget Spending Plan: Desired Outcome',
            hint: 'Select from options above for each numbered row',
          },
          {
            component: 'TextArea',
            name: 'budget_spending_plan',
            label: 'Budget Spending Plan: How this will be achieved',
          },
          {
            component: 'TextArea',
            name: 'budget_spending_plan_who',
            label: 'Budget Spending Plan: Who by',
          },
          {
            component: 'TextArea',
            name: 'budget_spending_plan_often',
            label: 'Budget Spending Plan: How often',
          },
          {
            component: 'TextArea',
            name: 'budget_spending_plan_cost',
            label: 'Budget Spending Plan: Weekly cost £',
          },
          {
            component: 'TextArea',
            name: 'budget_spending_plan_cost_yearly',
            label: 'Budget Spending Plan: Yearly cost £',
          },
          {
            component: 'DateInput',
            name: 'budget_spending_plan_start_date',
            label: 'Budget Spending Plan:  Start Date',
          },
          {
            component: 'DateInput',
            name: 'budget_spending_plan_end_date',
            label: 'Budget Spending Plan:  End Date',
          },
        ],
      },
      {
        id: 'managing-my-budget11',
        title: 'Managing my budget',
        components: [
          {
            component: 'Radios',
            name: 'manage_my_budget',
            label: 'Who will manage my budget?',
            options: [
              'Me via a Direct Payment',
              'My representative - via Direct Payment',
              'Local Authority',
              'Other arrangement (e.g. mixed)',
            ],
            //find out what is needed here
          },
        ],
      },
      {
        id: 'special_funding_arrangements12',
        title: 'Special funding arrangements',
        components: [
          {
            component: 'Radios',
            name: 'DS1500',
            label: 'Has a DS1500 form been issued?',
            options: ['Yes', 'No', 'Not known'],
          },
          {
            component: 'Radios',
            name: 'Section117aftercare',
            label: 'Are you entitled to Section 117 aftercare?',
            options: ['Yes', 'No', 'Not longer'],
          },
          {
            component: 'Radios',
            name: 'CareProgrammeApproach',
            label: 'Are you receiving care under the Care Programme Approach',
            options: ['Yes', 'No', 'Not longer'],
          },
        ],
      },
      {
        id: '13',
        title: 'Weekly Timetable',
        components: [
          {
            component: 'DatePicker',
            name: 'date_of_timetable',
            label: 'Date of Timetable',
            hint:
              "Today's date, being the submission date of this Google form  instead of authorised date",
            rules: { required: true },
          },
          {
            component: 'NumberInput',
            name: 'total_weekly_hours',
            width: '10',
            label: 'Total weekly hours (Timetable)',
            hint: '(Use decimal notation for part-hours)',
            rules: { required: true },
          },
          {
            component: 'TextInput',
            name: 'other_£',
            width: '30',
            label: 'Other (£/Week)',
          },
          <h3 key="weekly_ttable">My Weekly Timetable</h3>,
          <p key="replaces_a_table">
            Replaces a table - please number each row and use the same number
            across all of the fields below
          </p>,
          {
            component: 'Select',
            name: 'day_options',
            label: 'Day Options',
            options: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
          },
          {
            component: 'TextInput',
            name: 'details_of_weekly_timetable',
            width: '30',
            label: 'List details of my weekly timetable',
          },
        ],
      },
      {
        id: 'Completedby14',
        title: 'Completed by',
        components: [
          {
            component: 'DateInput',
            name: 'completed_date_3',
            label: 'Completed date (Conversation 3)',
            rules: { required: true },
          },
          //find out what is needed here
          {
            component: 'Select',
            name: 'other_professionals_involved',
            label: 'Other professionals involved',
            options: PROFESSIONS,
          },
        ],
      },
      {
        id: 'NextActions15',
        title: 'Next actions',
        components: [
          <p key="careact">
            This assessment was conducted in line with the Care Act 2014, and I
            have to the best of my knowledge, gathered as much information and
            evidence as possible, with the adult concerned, and in certain
            circumstances due to Covid related risks, this may have been
            conducted remotely. With their consent, I have spoken with other
            professionals involved with the adult as part of the MDT, as well as
            family, carers, friends and voluntary organisations who know the
            adult. In this proportionate Care Act assessment, I have sought to
            adhere to the Ethics Framework and the ECHR, particularly S 2, 3 and
            8
          </p>,
          {
            component: 'Radios',
            name: 'SafeguardingConcern?',
            label: 'Will this Conversation lead to a Safeguarding Concern?',
            options: ['Yes', 'No'],
          },
          <p key="completeAsc">
            If yes, please ensure you complete an Adults - Safeguarding Adult
            Concern form
          </p>,
          {
            component: 'Checkbox',
          },
          //add appropriate checkboxes here
          {
            component: 'Radios',
            name: 'SafeguardingConcern?',
            label: 'What Next - workflow',
            options: ['Yes', 'No'],
          },

          //add logic to send user to appropriate section
        ],
      },
      {
        id: 'TransferLongTerm15',
        title: 'Transfer case to Long Term team',
        components: [{}],
      },
    ],
  },
];

export default steps;
