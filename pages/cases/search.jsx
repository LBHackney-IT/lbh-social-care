import { NextSeo } from 'next-seo';

import BackButton from 'components/Layout/BackButton/BackButton';
import Search from 'components/Search/Search';

const SearchCasesPage = ({ query }) => {
  return (
    <div>
      <NextSeo title="Find unlinked case notes" noindex />
      <BackButton />
      <Search query={query} type="cases" />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  return {
    props: {
      query,
    },
  };
};

export default SearchCasesPage;
