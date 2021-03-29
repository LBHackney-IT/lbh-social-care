import Seo from 'components/Layout/Seo/Seo';
import Search from 'components/Search/Search';

const MyCasesPage = (): React.ReactElement => (
  <div>
    <Seo title="My records notes" />
    <Search
      type="records"
      subHeader="Filter results by (any combination)"
      resultHeader="All records you have added"
      showOnlyMyResults
      columns={[
        'person_id',
        'first_name',
        'formName',
        'date_of_event',
        'action',
      ]}
      ctaText="Filter"
    />
  </div>
);

export default MyCasesPage;