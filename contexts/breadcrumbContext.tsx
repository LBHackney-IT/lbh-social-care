import React, { useContext, createContext, useState } from 'react';

interface ContextType {
  goBackUrl: string | false;
  //   setGoBackUrl: (newVal: string | false) => void;
}

const BreadcrumbContext = createContext<ContextType>({
  goBackUrl: false,
  //   setGoBackUrl: () => null,
});

export const BreadcrumbProvider = ({
  children,
}: {
  children: React.ReactChild;
}): React.ReactElement => {
  //   const [goBackUrl, setGoBackUrl] = useState<string | false>(false);

  let goBackUrl;

  return (
    <BreadcrumbContext.Provider value={{ goBackUrl }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = (): ContextType => useContext(BreadcrumbContext);

export default BreadcrumbContext;
