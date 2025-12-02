"use client";

import { useContext } from 'react';
import { AuthProvider, useAuth as useAuthContext } from '@/context/AuthContext';

// This is a wrapper to re-export the context hook for semantic clarity
export const useAuth = () => {
  return useAuthContext();
};
