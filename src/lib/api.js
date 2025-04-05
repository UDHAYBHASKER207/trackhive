
import { toast } from '@/hooks/use-toast';

const API_URL = 'http://localhost:5000/api';

// Helper function for handling fetch responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.message || response.statusText;
    throw new Error(error);
  }
  
  return data;
};

// Auth API calls
export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signup = async (userData, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password,
        role: userData.role,
      }),
    });
    
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logout = async () => {
  // Just clear the token from localStorage
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return true;
};

// Employee API calls
export const getEmployees = async (token) => {
  try {
    const response = await fetch(`${API_URL}/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getEmployee = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const addEmployee = async (employeeData, token) => {
  try {
    // Check if we have an image file to upload
    if (employeeData.image && typeof employeeData.image === 'object') {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add all employee data to FormData
      Object.keys(employeeData).forEach(key => {
        if (key === 'image') {
          formData.append('image', employeeData.image);
        } else {
          formData.append(key, employeeData[key]);
        }
      });
      
      const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      return handleResponse(response);
    } else {
      // Regular JSON request without file upload
      const response = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });
      
      return handleResponse(response);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateEmployee = async (id, employeeData, token) => {
  try {
    // Check if we have an image file to upload
    if (employeeData.image && typeof employeeData.image === 'object') {
      // Create FormData for file uploads
      const formData = new FormData();
      
      // Add all employee data to FormData
      Object.keys(employeeData).forEach(key => {
        if (key === 'image') {
          formData.append('image', employeeData.image);
        } else {
          formData.append(key, employeeData[key]);
        }
      });
      
      const response = await fetch(`${API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      
      return handleResponse(response);
    } else {
      // Regular JSON request without file upload
      const response = await fetch(`${API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(employeeData),
      });
      
      return handleResponse(response);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteEmployee = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return handleResponse(response);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Department and position helpers
export const departments = [
  { id: '1', name: 'Engineering', description: 'Software development and technical operations' },
  { id: '2', name: 'Marketing', description: 'Brand management and customer acquisition' },
  { id: '3', name: 'Human Resources', description: 'Personnel management and recruitment' },
  { id: '4', name: 'Finance', description: 'Financial operations and accounting' },
  { id: '5', name: 'Sales', description: 'Revenue generation and client relations' },
  { id: '6', name: 'Operations', description: 'Business processes and logistics' },
  { id: '7', name: 'Customer Support', description: 'Customer service and assistance' },
];

export const positions = [
  { id: '1', name: 'Software Engineer', department: '1' },
  { id: '2', name: 'Senior Software Engineer', department: '1' },
  { id: '3', name: 'Product Manager', department: '1' },
  { id: '4', name: 'Marketing Specialist', department: '2' },
  { id: '5', name: 'Marketing Manager', department: '2' },
  { id: '6', name: 'HR Coordinator', department: '3' },
  { id: '7', name: 'HR Manager', department: '3' },
  { id: '8', name: 'Accountant', department: '4' },
  { id: '9', name: 'Financial Analyst', department: '4' },
  { id: '10', name: 'Sales Representative', department: '5' },
  { id: '11', name: 'Sales Manager', department: '5' },
  { id: '12', name: 'Operations Coordinator', department: '6' },
  { id: '13', name: 'Operations Manager', department: '6' },
  { id: '14', name: 'Customer Support Representative', department: '7' },
  { id: '15', name: 'Customer Support Manager', department: '7' },
];

export const getDepartmentName = (id) => {
  return departments.find(d => d.id === id)?.name || '';
};

export const getPositionName = (id) => {
  return positions.find(p => p.id === id)?.name || '';
};
