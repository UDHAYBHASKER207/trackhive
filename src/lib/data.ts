
import { toast } from 'sonner';
import { Employee } from './types';
import * as api from './api';

// Get authentication token
const getToken = () => localStorage.getItem('token');

// Employee functions
export const getEmployees = async (): Promise<Employee[]> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  try {
    return await api.getEmployees(token);
  } catch (error) {
    console.error('Error fetching employees:', error);
    toast.error('Failed to fetch employees');
    throw error;
  }
};

export const getEmployee = async (id: string): Promise<Employee> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  try {
    return await api.getEmployee(id, token);
  } catch (error) {
    console.error(`Error fetching employee ${id}:`, error);
    toast.error('Failed to fetch employee details');
    throw error;
  }
};

export const addEmployee = async (employeeData: Partial<Employee>): Promise<Employee> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  try {
    const result = await api.addEmployee(employeeData, token);
    toast.success('Employee added successfully');
    return result;
  } catch (error) {
    console.error('Error adding employee:', error);
    toast.error('Failed to add employee');
    throw error;
  }
};

export const updateEmployee = async (id: string, employeeData: Partial<Employee>): Promise<Employee> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  try {
    const result = await api.updateEmployee(id, employeeData, token);
    toast.success('Employee updated successfully');
    return result;
  } catch (error) {
    console.error(`Error updating employee ${id}:`, error);
    toast.error('Failed to update employee');
    throw error;
  }
};

export const deleteEmployee = async (id: string): Promise<void> => {
  const token = getToken();
  if (!token) throw new Error('Authentication required');
  
  try {
    await api.deleteEmployee(id, token);
    toast.success('Employee deleted successfully');
  } catch (error) {
    console.error(`Error deleting employee ${id}:`, error);
    toast.error('Failed to delete employee');
    throw error;
  }
};

// Re-export department and position helpers
export const { departments, positions, getDepartmentName, getPositionName } = api;
