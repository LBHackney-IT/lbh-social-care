import Link from 'next/link';
import { LegacyResident, User } from 'types';
import { canManageCases, canUserEditPerson } from '../../../lib/permissions';
import { useAuth } from '../../UserContext/UserContext';

const ResultEntry = (person: LegacyResident): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const { mosaicId, firstName, lastName, dateOfBirth, ageContext } = person;

  return (
    <tr className="govuk-table__row">
      <td className="govuk-table__cell">{mosaicId}</td>
      <td className="govuk-table__cell">
        {firstName} {lastName}
      </td>
      <td className="govuk-table__cell">
        {dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-GB')}
      </td>
      <td className="govuk-table__cell">
        {ageContext === 'A' ? 'ACS' : ageContext === 'C' ? 'CFS' : 'Both'}
      </td>
      <td className="govuk-table__cell govuk-table__cell--numeric">
        {!canManageCases(user, {
          contextFlag: ageContext,
          restricted: person.restricted,
        }) && (
          <span className="govuk-tag lbh-tag lbh-tag--grey">Restricted</span>
        )}
      </td>
      <td className="govuk-table__cell">
        <Link href={`/people/${mosaicId}`}>
          <a className="govuk-link govuk-custom-text-color">View</a>
        </Link>
      </td>
    </tr>
  );
};

const ResultTable = ({
  records,
}: {
  records: LegacyResident[];
}): React.ReactElement => (
  <table className="govuk-table lbh-table" data-testid="residents-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Mosaic ID
        </th>
        <th scope="col" className="govuk-table__header">
          Client Name
        </th>
        <th scope="col" className="govuk-table__header">
          Date of birth
        </th>
        <th scope="col" className="govuk-table__header">
          Service
        </th>
        <th scope="col" className="govuk-table__header" colSpan={2}></th>
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {records.map((result) => (
        <ResultEntry key={result.mosaicId} {...result} />
      ))}
    </tbody>
  </table>
);

export default ResultTable;
