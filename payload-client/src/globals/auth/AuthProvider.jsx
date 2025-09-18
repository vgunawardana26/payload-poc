/* 
    Global Auth provider. This is a React context that will provide the logged in state for the user.
    The global state can be used to dictate permissions and routes. 
**/

import React, { createContext, useContext, useState, useEffect } from "react";
import auth from "../../services/auth/authService";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoggedInState = async () => {
      try {
        const res = await auth.getMeUser();
        const { data } = res;

        if (data.user === null || data.exp === 0) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    getLoggedInState();
  }, []);

  const values = {
    isLoggedIn,
    setIsLoggedIn,
    loading,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return new Error("Auth context must be used within a Auth provider");
  } else {
    return context;
  }
};
