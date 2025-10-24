import React, { createContext, useState, useEffect } from 'react';
import { authenticateUser } from '../services/api';
import type { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use a stable navigate function reference if possible, or handle inside effects.
  // This basic implementation is for demonstration.
  // const navigate = useNavigate();

  useEffect(() => {
    // Check for a logged-in user in sessionStorage on initial load
    try {
      const storedUser = sessionStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage", error);
      sessionStorage.removeItem('authUser');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (identifier: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const authenticatedUser = await authenticateUser(identifier, password);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        sessionStorage.setItem('authUser', JSON.stringify(authenticatedUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('authUser');
    // In a real app with routing hooks available everywhere, you'd navigate here
    // navigate('/');
  };

  const value = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
