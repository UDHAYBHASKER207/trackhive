
// This is a compatibility layer to use the new API but maintain the same interface
// for the existing components in the system

import * as api from './api';
import { Employee, User, Department, Position } from './types';

export const departments: Department[] = api.departments;
export const positions: Position[] = api.positions;

// Get token helper
const getToken = () => localStorage.getItem('token');

// Auth functions
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const login = async (email: string, password: string): Promise<User> => {
  return api.login(email, password);
};

export const signup = async (userData: Partial<User>, password: string): Promise<User> => {
  return api.signup(userData, password);
};

export const logout = async (): Promise<void> => {
  return api.logout();
};

// Employee CRUD operations
export const getEmployees = async (): Promise<Employee[]> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.getEmployees(token);
};

export const getEmployee = async (id: string): Promise<Employee | undefined> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.getEmployee(id, token);
};

export const getDepartmentName = (id: string): string => {
  return api.getDepartmentName(id);
};

export const getPositionName = (id: string): string => {
  return api.getPositionName(id);
};

export const addEmployee = async (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.addEmployee(employee, token);
};

export const updateEmployee = async (id: string, data: Partial<Employee>): Promise<Employee> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.updateEmployee(id, data, token);
};

export const deleteEmployee = async (id: string): Promise<boolean> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  await api.deleteEmployee(id, token);
  return true;
};
