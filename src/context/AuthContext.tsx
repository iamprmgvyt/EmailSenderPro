"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // This function checks if the authentication token exists in the browser's cookies.
    // The actual security is handled by the middleware on the server, but this
    // helps keep the UI in sync with the user's logged-in state.
    const checkAuthStatus = () => {
        const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('token='));
        // We also need to check that the token is not empty, e.g. 'token=' after logout
        const tokenValue = document.cookie.split(';').find(item => item.trim().startsWith('token='))?.split('=')[1];
        setIsLoggedIn(hasToken && !!tokenValue);
    }
    checkAuthStatus();
    
    // We can also set up an interval or listen to window focus events to re-check,
    // which can be useful for multi-tab scenarios, but for now this is sufficient.
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
