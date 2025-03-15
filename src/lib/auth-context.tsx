
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { getCurrentUser, login as loginApi, logout as logoutApi, signup as signupApi } from './data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (userData: Partial<User>, password: string) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an existing session
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session token with the server
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await loginApi(email, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: Partial<User>, password: string) => {
    try {
      const user = await signupApi(userData, password);
      setUser(user);
      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutApi();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
