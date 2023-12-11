import React, { createContext, useContext, useState } from "react";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [responseData, setResponseData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const updateResponseData = (data) => {
    setResponseData(data);
  };

  const updateLoadingStatus = (status) => {
    setIsLoading(status);
  };

  return (
    <DataContext.Provider
      value={{
        responseData,
        updateResponseData,
        isLoading,
        updateLoadingStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(DataContext);
};
