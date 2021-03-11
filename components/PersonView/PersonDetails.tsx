import { useState } from 'react';
import { ExtendedResident } from 'types';

interface Props {
  person: ExtendedResident;
  expandView?: boolean;
}

const PersonDetails = ({
  person: {
    otherNames,
    ageContext,
    firstName,
    lastName,
    mosaicId,
    dateOfBirth,
    nhsNumber,
    firstLanguage,
    religion,
    dateOfDeath,
    sexualOrientation,
    gender,
    address,
    ethnicity,
    phoneNumber,
    email,
    preferredMethodOfContact,
  },
  expandView = false,
}: Props): React.ReactElement => {
  const [expandDetails, setExpandDetails] = useState(false);
  return (
    <>
      <div className="govuk-!-margin-bottom-7">
        <div className="lbh-table-header">
          <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
            {expandView ? `${firstName} ${lastName}` : 'PERSON DETAILS'}
          </h2>
          {expandView && (
            <div
              className="govuk-link"
              role="button"
              onClick={() => setExpandDetails(!expandDetails)}
            >
              {expandDetails ? 'Collapse' : 'Expand'} view
            </div>
          )}
        </div>
        <hr className="govuk-divider" />
        {(!expandView || expandDetails) && (
          <>
            <dl className="govuk-summary-list">
              {otherNames && otherNames?.length > 0 && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Other Names</dt>
                  <dd className="govuk-summary-list__value">
                    <ul className="govuk-list">
                      {otherNames.map(({ firstName, lastName }) => (
                        <li key={`${firstName} ${lastName}`}>
                          {firstName} {lastName}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              <div className="govuk-summary-list__row">
                <dt className="govuk-summary-list__key">Person ID</dt>
                <dd className="govuk-summary-list__value">#{mosaicId}</dd>
              </div>
              {gender && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Gender</dt>
                  <dd className="govuk-summary-list__value">{gender}</dd>
                </div>
              )}
              {dateOfBirth && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Date of birth</dt>
                  <dd className="govuk-summary-list__value">
                    {new Date(dateOfBirth).toLocaleDateString('en-GB')}
                  </dd>
                </div>
              )}
              {dateOfDeath && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Date Of Death</dt>
                  <dd className="govuk-summary-list__value">
                    {new Date(dateOfDeath).toLocaleDateString('en-GB')}
                  </dd>
                </div>
              )}
              {ethnicity && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Ethnicity</dt>
                  <dd className="govuk-summary-list__value">{ethnicity}</dd>
                </div>
              )}
              {firstLanguage && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">First Language </dt>
                  <dd className="govuk-summary-list__value">{firstLanguage}</dd>
                </div>
              )}
              {religion && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Religion </dt>
                  <dd className="govuk-summary-list__value">{religion}</dd>
                </div>
              )}
              {sexualOrientation && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Sexual orientation
                  </dt>
                  <dd className="govuk-summary-list__value">
                    {sexualOrientation}
                  </dd>
                </div>
              )}
              {nhsNumber && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">NHS number</dt>
                  <dd className="govuk-summary-list__value">{nhsNumber}</dd>
                </div>
              )}
              {address?.address && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Address</dt>
                  <dd className="govuk-summary-list__value">
                    <p>{address.address}</p>
                  </dd>
                </div>
              )}
              {phoneNumber && phoneNumber?.length > 0 && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Phone Number</dt>
                  <dd className="govuk-summary-list__value">
                    <ul className="govuk-list">
                      {phoneNumber.map(({ phoneNumber, phoneType }) => (
                        <li key={phoneNumber}>
                          {phoneNumber} - {phoneType}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {email && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Email </dt>
                  <dd className="govuk-summary-list__value">{email}</dd>
                </div>
              )}
              {preferredMethodOfContact && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">
                    Preferred Method Of Contact
                  </dt>
                  <dd className="govuk-summary-list__value">
                    {preferredMethodOfContact}
                  </dd>
                </div>
              )}
              {ageContext && (
                <div className="govuk-summary-list__row">
                  <dt className="govuk-summary-list__key">Person type</dt>
                  <dd className="govuk-summary-list__value">
                    {ageContext === 'C' ? 'CFS' : 'ASC'}
                  </dd>
                </div>
              )}
            </dl>
          </>
        )}
      </div>
    </>
  );
};

export default PersonDetails;