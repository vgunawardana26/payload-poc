import React, { createContext, useContext, useState } from "react";

const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const value = { currentUser, setCurrentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("User Context must be used with a User Context provider");
  } else {
    return context;
  }
};
