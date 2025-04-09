
// This is a compatibility layer to use the new API but maintain the same interface
// for the existing components in the system

import * as api from './api';

export const departments = api.departments;
export const positions = api.positions;

// Get token helper
const getToken = () => localStorage.getItem('token');

// Auth functions
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const login = async (email, password) => {
  return api.login(email, password);
};

export const signup = async (userData, password) => {
  return api.signup(userData, password);
};

export const logout = async () => {
  return api.logout();
};

// Employee CRUD operations
export const getEmployees = async () => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.getEmployees(token);
};

export const getEmployee = async (id) => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.getEmployee(id, token);
};

export const getDepartmentName = (id) => {
  return api.getDepartmentName(id);
};

export const getPositionName = (id) => {
  return api.getPositionName(id);
};

export const addEmployee = async (employee) => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.addEmployee(employee, token);
};

export const updateEmployee = async (id, data) => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  return api.updateEmployee(id, data, token);
};

export const deleteEmployee = async (id) => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  await api.deleteEmployee(id, token);
  return true;
};
