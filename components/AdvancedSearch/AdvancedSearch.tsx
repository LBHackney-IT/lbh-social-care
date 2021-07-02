import React, { useState } from 'react';
import { useCallback } from 'react';
import { SWRInfiniteResponse } from 'swr';
import { Formik, Form } from 'formik';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Field } from '../../data/flexibleForms/forms.types';
import FlexibleField from '../FlexibleForms/FlexibleFields';
import { generateFlexibleSchema } from '../../lib/validators';
import Button from '../Button/Button';

type SWRSearchHook = (
  params: Record<string, unknown>
) => SWRInfiniteResponse<Record<string, unknown>, Error>;

const parseQueryFromUrl = (
  queryString: string | string[] | undefined
): Record<string, symbol> => {
  if (!queryString) {
    return {};
  }

  if (Array.isArray(queryString)) {
    const [query] = queryString;

    return parseQueryFromUrl(query);
  }

  return JSON.parse(queryString);
};

const hasInitialQueryFromUrl = (
  queryString: string | string[] | undefined
): boolean => {
  if (!queryString) {
    return false;
  }

  if (Array.isArray(queryString)) {
    const [query] = queryString;

    return hasInitialQueryFromUrl(query);
  }

  const query = parseQueryFromUrl(queryString);

  return Object.keys(query).length > 0 ? true : false;
};

// eslint-disable-next-line
export const useSearch = <T extends object>({
  fields,
  hit: HitRenderer,
  resultsWrapper: ResultsWrapper = ({ children }) => <>{children}</>,
  noResults: NoResults = () => <div>No records match your query</div>,
  dataSource: useDataSource,
  dataResponseKey,
}: {
  fields: Field[];
  hit: React.FC<{ hit: T }>;
  resultsWrapper: React.FC;
  noResults: React.FC;
  dataSource: SWRSearchHook;
  dataResponseKey: string;
}): {
  Search: {
    Form: React.FC;
    Results: React.FC;
  };
} => {
  const { push, basePath, query } = useRouter();
  const [searchQuery, setSearchQuery] = useState(parseQueryFromUrl(query.q));
  const [hasQuery, setHasQueryRun] = useState(hasInitialQueryFromUrl(query.q));

  const handleSearch = useCallback(
    (e) => {
      setSearchQuery(e);
      setHasQueryRun(true);

      push(`${basePath}?q=${encodeURIComponent(JSON.stringify(e))}`);
    },
    [push, basePath]
  );

  const handleClearSearch = useCallback(() => {
    setSearchQuery({});
    setHasQueryRun(false);
    push(basePath);
  }, [push, basePath]);

  const SearchForm = useMemo(() => {
    const SearchFormComponent = () => (
      <Formik
        initialValues={searchQuery}
        validationSchema={generateFlexibleSchema(fields)}
        onSubmit={handleSearch}
        validateOnMount={true}
      >
        {({ values, touched, errors, submitForm }) => (
          <Form>
            {fields.map((field) => {
              return (
                <FlexibleField
                  key={field.id}
                  field={field}
                  values={values}
                  touched={touched}
                  errors={errors}
                />
              );
            })}

            <Button label="Search" onClick={submitForm} />
            <button
              className="lbh-link govuk-link"
              id="clear-link"
              onClick={handleClearSearch}
            >
              Clear search
            </button>
          </Form>
        )}
      </Formik>
    );

    return SearchFormComponent;
  }, [fields, handleSearch, searchQuery, handleClearSearch]);

  const SearchResults = useMemo(() => {
    const SearchResultsComponent = () => {
      const { data, isValidating, error, size, setSize } =
        useDataSource(searchQuery);

      const handleLoadMore = useCallback(() => {
        setSize(size + 1);
      }, [setSize, size]);

      if (error) {
        return <div>Error: {error.message}</div>;
      }

      if (isValidating && !data) {
        return <div>Searching...</div>;
      }

      if (
        !data ||
        data.length === 0 ||
        (data[0][dataResponseKey] as T[]).length === 0
      ) {
        return <NoResults />;
      }

      return (
        <>
          <ResultsWrapper>
            {data.map((page) => {
              return (page[dataResponseKey] as T[]).map((r, index) => {
                return <HitRenderer key={index} hit={r} />;
              });
            })}
          </ResultsWrapper>

          <Button label="Load more" onClick={handleLoadMore} />
        </>
      );
    };
    return SearchResultsComponent;
  }, [
    HitRenderer,
    ResultsWrapper,
    dataResponseKey,
    searchQuery,
    useDataSource,
  ]);

  return {
    Search: {
      Form: SearchForm,
      Results: hasQuery ? SearchResults : () => null,
    },
  };
};

export type HitRenderer<T> = React.FC<{
  hit: T;
}>;
