import cx from 'classnames';
import { LegacyResident } from 'types';

const ResultEntry = ({
  person,
  callback,
}: {
  person: LegacyResident;
  callback: any;
}): React.ReactElement => {
  const { mosaicId, firstName, lastName, dateOfBirth, address } = person;

  return (
    <>
      <tr className={cx('govuk-table__row')}>
        <td className="govuk-table__cell">
          <input
            id={mosaicId}
            name="personId"
            type="radio"
            value={mosaicId}
            onChange={(e) => {
              callback(e.target.value);
            }}
          />
        </td>
        <td className="govuk-table__cell">{mosaicId}</td>
        <td className="govuk-table__cell">
          <label htmlFor={mosaicId}>
            {firstName} {lastName}
          </label>
        </td>
        <td className="govuk-table__cell">
          <span>{(address && address.postcode) || ''}</span>
        </td>
        <td className="govuk-table__cell">
          {dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-GB')}
        </td>
      </tr>
    </>
  );
};

const RelationshipSearchTable = ({
  records,
  callback,
}: {
  records: LegacyResident[];
  callback: any;
}): React.ReactElement => {
  return (
    <table className="govuk-table lbh-table" data-testid="residents-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Select
          </th>
          <th scope="col" className="govuk-table__header">
            ID
          </th>
          <th scope="col" className="govuk-table__header">
            Client Name
          </th>
          <th scope="col" className="govuk-table__header">
            Address
          </th>
          <th scope="col" className="govuk-table__header">
            Date of birth
          </th>
          <th scope="col" className="govuk-table__header" />
        </tr>
      </thead>

      <tbody className="govuk-table__body">
        {records.map((result) => (
          <ResultEntry
            key={result.mosaicId}
            person={result}
            callback={callback}
          />
        ))}
      </tbody>
    </table>
  );
};

export default RelationshipSearchTable;
