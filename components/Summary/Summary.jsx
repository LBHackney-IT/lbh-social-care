import PropTypes from 'prop-types';
import Link from 'next/link';

import SummaryList from 'components/Summary/SummaryList';
import { filterStepsOnCondition, filterDataOnCondition } from 'utils/steps';

const MultiValue = ([key, value]) => (
  <div key={key}>
    <span>{value}</span>
    <br />
  </div>
);

const SummaryMultiSection = ({
  formData,
  id,
  title,
  canEdit,
  formPath,
  ...props
}) => (
  <>
    {formData[id].map((data, key) => (
      <SummarySection
        {...props}
        canEdit={canEdit}
        formData={data}
        formPath={formPath}
        title={`${title} - ${key + 1}`}
        key={`${id}/${key}`}
        id={`${id}/${key + 1}`}
      />
    ))}
    {canEdit && (
      <p className="govuk-!-margin-bottom-7">
        <Link
          href={`${formPath}${id}/${formData[id].length + 1}?fromSummary=true`}
          as={`${formPath}${id}/${formData[id].length + 1}?fromSummary=true`}
        >
          <a className="govuk-link">Add Another {title}</a>
        </Link>
      </p>
    )}
  </>
);

export const SummarySection = ({
  formData,
  id,
  title,
  components,
  formPath,
  canEdit,
}) => {
  const Summary = (
    <SummaryList
      list={components
        .filter(({ name }) => formData[name])
        .map(
          ({ component, name, label }) =>
            console.log(component) || {
              key: name,
              title: label,
              value: Array.isArray(formData[name])
                ? formData[name]
                    .filter(Boolean)
                    .map((v) => MultiValue(v.split('/').pop()))
                : typeof formData[name] === 'object'
                ? Object.entries(formData[name])
                    // eslint-disable-next-line no-unused-vars
                    .filter(([key, value]) => Boolean(value))
                    .filter(
                      ([key]) =>
                        !(component === 'AddressLookup' && key === 'uprn')
                    )
                    .map(MultiValue)
                : typeof formData[name] === 'boolean'
                ? JSON.stringify(formData[name])
                : formData[name],
            }
        )}
    />
  );
  return (
    <div className="govuk-!-margin-bottom-7">
      <h3 className="govuk-heading-m">{title}</h3>
      {Summary}
      {canEdit && (
        <Link
          href={`${formPath}${id}?fromSummary=true`}
          as={`${formPath}${id}?fromSummary=true`}
        >
          <a className="govuk-link">Change</a>
        </Link>
      )}
    </div>
  );
};

const Summary = ({ formData, formSteps, formPath, canEdit }) =>
  filterStepsOnCondition(formSteps, formData).map((section) => {
    const props = {
      key: section.id,
      formData: filterDataOnCondition(formSteps, formData),
      formPath: formPath,
      canEdit: canEdit,
      ...section,
    };
    return section.isMulti ? (
      <SummaryMultiSection {...props} />
    ) : (
      <SummarySection {...props} />
    );
  });

Summary.propTypes = {
  formData: PropTypes.shape({}).isRequired,
  formSteps: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  formPath: PropTypes.string.isRequired,
  canEdit: PropTypes.bool,
};

export default Summary;
