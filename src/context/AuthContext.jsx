import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ accessToken, setAccessToken ] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser, accessToken, setAccessToken }}>
      {children}
    </UserContext.Provider>
  );
};