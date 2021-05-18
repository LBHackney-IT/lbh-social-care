import { useState, useEffect } from 'react';

import { getData, deleteData, SavedData } from 'utils/saveData';
import SavedDataTable from './SavedDataTable';

export const SavedForms = (): React.ReactElement => {
  const [savedForms, setSavedForms] = useState<Record<string, SavedData>>();
  useEffect(() => {
    setSavedForms(getData());
  }, []);
  const deleteForm = (path: string) => {
    deleteData(path);
    setSavedForms(getData());
  };
  if (!savedForms || Object.keys(savedForms)?.length === 0) {
    return (
      <p className="govuk-body">You have no incomplete forms right now.</p>
    );
  }
  const detailHeader = ['Person ID', 'Client Name', 'Date of birth'];
  const standardHeader = ['Form type', 'Last saved', 'Actions', ''];
  const sortData = Object.values(savedForms);
  const formQty = sortData.length;
  const detailData = sortData.filter((item) => Boolean(item.personDetails));
  const standardData = sortData.filter((item) => !item.personDetails);
  return (
    <>
      <p>
        Displaying ({formQty}) unfinished {formQty > 1 ? 'forms' : 'form'}
      </p>
      {standardData.length > 0 && (
        <SavedDataTable
          tableHeader={standardHeader}
          savedData={standardData}
          deleteForm={deleteForm}
        />
      )}
      {detailData.length > 0 && (
        <SavedDataTable
          tableHeader={[...detailHeader, ...standardHeader]}
          savedData={detailData}
          deleteForm={deleteForm}
        />
      )}
    </>
  );
};

export default SavedForms;
