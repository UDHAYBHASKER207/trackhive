
// Mock API endpoints and data
import { v4 as uuidv4 } from 'uuid';

// Initial data for departments
export const departments = [
  { id: 'd1', name: 'Engineering', description: 'Software Development and Engineering' },
  { id: 'd2', name: 'Marketing', description: 'Brand Management and Marketing Activities' },
  { id: 'd3', name: 'HR', description: 'Human Resources Management' },
  { id: 'd4', name: 'Finance', description: 'Financial Planning and Management' },
  { id: 'd5', name: 'Operations', description: 'Daily Business Operations' },
];

// Initial data for positions
export const positions = [
  { id: 'p1', name: 'Software Engineer', department: 'd1' },
  { id: 'p2', name: 'Senior Developer', department: 'd1' },
  { id: 'p3', name: 'Marketing Specialist', department: 'd2' },
  { id: 'p4', name: 'HR Manager', department: 'd3' },
  { id: 'p5', name: 'Accountant', department: 'd4' },
  { id: 'p6', name: 'Operations Manager', department: 'd5' },
];

// Mock database
let employees = [
  {
    id: 'e1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '123-456-7890',
    department: 'd1',
    position: 'p2',
    hireDate: '2022-01-15',
    salary: 95000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 'e2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    phone: '987-654-3210',
    department: 'd2',
    position: 'p3',
    hireDate: '2021-05-20',
    salary: 75000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: 'e3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@company.com',
    phone: '555-123-4567',
    department: 'd3',
    position: 'p4',
    hireDate: '2020-11-10',
    salary: 85000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

let users = [
  {
    id: 'u1',
    email: 'admin@company.com',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
  {
    id: 'u2',
    email: 'john.doe@company.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'employee',
    employeeId: 'e1',
  },
];

// Helper functions
export const login = async (email, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, token: 'mock-jwt-token' };
  } else {
    throw new Error('Invalid email or password');
  }
};

export const signup = async (userData, password) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if email already exists
  if (users.some(u => u.email === userData.email)) {
    throw new Error('Email already in use');
  }
  
  // Create new user
  const newUser = {
    id: uuidv4(),
    ...userData,
    password,
  };
  
  // Add to "database"
  users.push(newUser);
  
  const { password: _, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword, token: 'mock-jwt-token' };
};

export const logout = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

export const getEmployees = async (token) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Token validation would go here in a real app
  if (!token) throw new Error('Unauthorized');
  
  return employees;
};

export const getEmployee = async (id, token) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Token validation would go here in a real app
  if (!token) throw new Error('Unauthorized');
  
  const employee = employees.find(e => e.id === id);
  if (!employee) throw new Error('Employee not found');
  
  return employee;
};

export const addEmployee = async (employeeData, token) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Token validation would go here in a real app
  if (!token) throw new Error('Unauthorized');
  
  const newEmployee = {
    id: uuidv4(),
    ...employeeData,
  };
  
  employees.push(newEmployee);
  return newEmployee;
};

export const updateEmployee = async (id, data, token) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Token validation would go here in a real app
  if (!token) throw new Error('Unauthorized');
  
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) throw new Error('Employee not found');
  
  employees[index] = { ...employees[index], ...data };
  return employees[index];
};

export const deleteEmployee = async (id, token) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Token validation would go here in a real app
  if (!token) throw new Error('Unauthorized');
  
  const index = employees.findIndex(e => e.id === id);
  if (index === -1) throw new Error('Employee not found');
  
  employees = employees.filter(e => e.id !== id);
  return true;
};

export const getDepartmentName = (departmentId) => {
  const department = departments.find(d => d.id === departmentId);
  return department ? department.name : 'Unknown Department';
};

export const getPositionName = (positionId) => {
  const position = positions.find(p => p.id === positionId);
  return position ? position.name : 'Unknown Position';
};
