import cx from 'classnames';
import Link from 'next/link';
import { canManageCases } from '../../lib/permissions';
import { LegacyResident, User } from '../../types';
import { useResidents } from '../../utils/api/residents';
import { HitRenderer, useSearch } from '../AdvancedSearch/AdvancedSearch';
import { useAuth } from '../UserContext/UserContext';

const styles = {};

const ResultEntry: HitRenderer<LegacyResident> = ({ hit }) => {
  const { user } = useAuth() as { user: User };
  const { mosaicId, firstName, lastName, dateOfBirth, address, ageContext } =
    hit;

  const isRecordRestricted = !canManageCases(user, {
    contextFlag: ageContext,
    restricted: hit.restricted,
  });

  return (
    <tr
      className={cx(
        'govuk-table__row',
        isRecordRestricted && styles.restrictedRow
      )}
    >
      <td className="govuk-table__cell">{mosaicId}</td>
      <td className="govuk-table__cell">
        <Link href={`/people/${mosaicId}`}>
          <a className="govuk-link govuk-custom-text-color">
            {firstName} {lastName}
          </a>
        </Link>
      </td>
      <td className="govuk-table__cell">
        {dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-GB')}
      </td>
      <td className="govuk-table__cell">
        <span className={styles.uppercase}>
          {(address && address.postcode) || ''}
        </span>
      </td>
      <td className="govuk-table__cell govuk-table__cell--numeric">
        {isRecordRestricted && (
          <span
            className={cx('govuk-tag lbh-tag lbh-tag--grey', styles.uppercase)}
          >
            Restricted
          </span>
        )}
      </td>
    </tr>
  );
};

const ResultsWrapper: React.FC = ({ children }) => (
  <table className="govuk-table lbh-table" data-testid="residents-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Social care ID
        </th>
        <th scope="col" className="govuk-table__header">
          Person
        </th>
        <th scope="col" className="govuk-table__header">
          Date of birth
        </th>
        <th scope="col" className="govuk-table__header">
          Postcode
        </th>
        <th scope="col" className="govuk-table__header" />
      </tr>
    </thead>

    <tbody className="govuk-table__body">{children}</tbody>
  </table>
);

export const AdvancedResdentSearch: React.FC = () => {
  const { Search } = useSearch<LegacyResident>({
    fields: [
      {
        id: 'first_name',
        type: 'text',
        question: 'Name',
      },
      {
        id: 'date_of_birth',
        type: 'date',
        question: 'Date of birth',
      },
      {
        id: 'postcode',
        type: 'text',
        question: 'Postcode',
      },
      {
        id: 'mosaic_id',
        type: 'text',
        question: 'Social Care ID (Mosaic ID)',
      },
    ],
    hit: ResultEntry,
    resultsWrapper: ResultsWrapper,
    dataSource: useResidents,
    dataResponseKey: 'residents',
  });

  return (
    <>
      <h1 className="lbh-heading-l">Search</h1>
      <p className="lbh-body govuk-!-margin-bottom-3">
        Use search to find a person before adding a new person or record.
      </p>

      <Search.Form />
      <Search.Results />
    </>
  );
};
