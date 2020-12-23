import { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SearchResidentsForm from './forms/SearchResidentsForm';
import SearchCasesForm from './forms/SearchCasesForm';
import ResidentsTable from './results/ResidentsTable';
import CasesTable from './results/CasesTable';

import { Button } from 'components/Form';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import UserContext from 'components/UserContext/UserContext';

import { getResidents } from 'utils/api/residents';
import { getCases } from 'utils/api/cases';
import { getQueryString } from 'utils/urls';

const getRecords = (data) => [
  ...(data.residents || []),
  ...(data?.cases || []),
];

const Search = ({ query, type }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState();
  const [formData, setFormData] = useState();
  const [sort, setSort] = useState({
    sort_by: query.sort_by,
    order_by: query.order_by,
  });
  const { user } = useContext(UserContext);
  const { pathname, replace } = useRouter();
  const { SearchForm, SearchResults, searchFunction } = useMemo(
    () =>
      type === 'records'
        ? {
            SearchForm: SearchCasesForm,
            SearchResults: CasesTable,
            searchFunction: ({ my_notes_only, ...formData }) =>
              getCases({
                ...formData,
                worker_email: my_notes_only ? user.email : '',
              }),
          }
        : {
            SearchForm: SearchResidentsForm,
            SearchResults: ResidentsTable,
            searchFunction: getResidents,
          },
    []
  );
  const onFormSubmit = useCallback(async (formData, records = []) => {
    setLoading(true);
    !formData.cursor && setResults(null);
    setError(null);
    try {
      setFormData(formData);
      const data = await searchFunction({
        ...formData,
        context_flag: user.permissionFlag,
      });
      setLoading(false);
      setResults({
        ...data,
        records: [...records, ...getRecords(data)],
      });
      const qs = getQueryString(formData);
      replace(`${pathname}?${qs}`, `${pathname}?${qs}`, {
        shallow: true,
      });
    } catch (e) {
      setLoading(false);
      setError(e.response?.data?.message || 'Oops an error occurred');
    }
  });

  // commented out as the feature is not ready in the BE
  // eslint-disable-next-line no-unused-vars
  const onSort = useCallback((value) => {
    const { order_by, sort_by } = sort;
    setSort(
      sort_by === value && order_by === 'desc'
        ? { order_by: 'asc', sort_by }
        : { order_by: 'desc', sort_by: value }
    );
  });
  useEffect(() => {
    results && sort.sort_by && onFormSubmit({ ...formData, ...sort });
  }, [sort]);

  // commented out as the feature is not ready to be in prod
  // const addNewPerson = type === 'people' && (
  //   <>
  //     Results don't match{' '}
  //     <Link href="/form/create-new-person/client-details">
  //       <a style={{ textDecoration: 'underline' }} className="govuk-link">
  //         {' '}
  //         Add New Person
  //       </a>
  //     </Link>
  //   </>
  // );
  const addNewPerson = '';
  return (
    <>
      <h1 className="govuk-heading-l">Search</h1>
      <p className="govuk-body govuk-!-margin-bottom-5">
        Use search to find a person before adding a new person or record.
        Records will need to be linked to person.
      </p>
      <div className="govuk-tabs">
        <h2 className="govuk-tabs__title">Contents</h2>
        <ul className="govuk-tabs__list">
          <li
            className={cx('govuk-tabs__list-item', {
              'govuk-tabs__list-item--selected': type !== 'records',
            })}
          >
            <Link href="/" scroll={false}>
              <a className="govuk-tabs__tab">Search for a person</a>
            </Link>
          </li>
          <li
            className={cx('govuk-tabs__list-item', {
              'govuk-tabs__list-item--selected': type === 'records',
            })}
          >
            <Link href="/cases" scroll={false}>
              <a className="govuk-tabs__tab">Search for records by person</a>
            </Link>
          </li>
        </ul>
        <div className="govuk-tabs__panel">
          <p className="govuk-body govuk-!-margin-bottom-5">
            {type === 'records'
              ? 'Search and filter by any combination of fields'
              : 'Search for a person by any combination of fields below'}
          </p>
          <SearchForm onFormSubmit={onFormSubmit} query={query} user={user} />
          {results && (
            <>
              <div className="lbh-table-header">
                <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
                  {type.toUpperCase()} SEARCH RESULT
                </h2>
                <div style={{ textAlign: 'right' }}>{addNewPerson}</div>
              </div>
              <hr className="govuk-divider" />
              {results.records?.length > 0 ? (
                <SearchResults
                  records={results.records}
                  sort={sort}
                  // onSort={onSort} commented out as the feature is not ready in the BE
                />
              ) : (
                <>
                  <p className="govuk-body govuk-!-margin-top-5">
                    {type.charAt(0).toUpperCase() + type.slice(1)} not found
                  </p>
                </>
              )}
            </>
          )}
          <div style={{ height: '50px', textAlign: 'center' }}>
            {loading ? (
              <Spinner />
            ) : (
              results?.nextCursor && (
                <Button
                  label="load more"
                  onClick={() =>
                    onFormSubmit(
                      { ...formData, cursor: results.nextCursor },
                      results.records
                    )
                  }
                />
              )
            )}
          </div>

          {error && <ErrorMessage label={error} />}
        </div>
      </div>
    </>
  );
};

Search.propTypes = {
  type: PropTypes.oneOf(['people', 'records']).isRequired,
  query: PropTypes.shape({}),
};

export default Search;
