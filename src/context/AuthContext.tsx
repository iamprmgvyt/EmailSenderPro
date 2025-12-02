"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const checkAuthStatus = async () => {
    try {
      // This endpoint doesn't exist, but it's a good pattern for checking auth status
      // For this app, middleware handles protection. We'll simulate a check.
      // In a real app, you might have a `/api/auth/status` endpoint
      const res = await fetch('/api/auth/status');
      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    // A simple way to check for a cookie without reading it. 
    // This isn't perfect but avoids an API call on every load.
    // The real security is in the middleware.
    if (document.cookie.includes('token=')) {
        setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, checkAuthStatus }}>
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
