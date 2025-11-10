import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [ roles, setRoles ] = useState(null);
  const [ provincias, setProvincias ] = useState(null)

  return (
    <DataContext.Provider value={{ roles, setRoles, provincias, setProvincias }}>
      {children}
    </DataContext.Provider>
  );
};