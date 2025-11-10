import { UserProvider } from "./AuthContext.jsx";
import { DataProvider } from "./DataContext.jsx";

export function Providers({ children }) {
  return (
    <UserProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </UserProvider>
)}
