
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from './api';
import { AuthUser } from './types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: AuthUser;
  login: (email: string, password: string) => Promise<any>;
  signup: (userData: Partial<any>, password: string) => Promise<any>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => ({}),
  signup: async () => ({}),
  logout: async () => {},
  isAuthenticated: false,
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for existing token and load user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      
      // Store token and user in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      
      setUser(response);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (userData: Partial<any>, password: string) => {
    try {
      const response = await api.signup(userData, password);
      
      // Store token and user in localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response));
      
      setUser(response);
      return response;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Error',
        description: 'Failed to logout. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
