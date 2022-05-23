import * as React from "react";

export const FilterContext = React.createContext(null);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = React.useState({
    repo: "trptcolin/slowdb",
  });
  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
