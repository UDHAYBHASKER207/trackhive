
import { Employee, User } from './types';

// Mock admin user
export const adminUser: User = {
  id: '1',
  email: 'admin@company.com',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin'
};

// Mock employee user
export const employeeUser: User = {
  id: '2',
  email: 'employee@company.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'employee',
  employeeId: '101'
};

// Mock employees data
export const employees: Employee[] = [
  {
    id: '101',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '555-123-4567',
    department: '1', // Engineering
    position: '2', // Senior Software Engineer
    hireDate: '2023-01-15',
    salary: 95000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: '102',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    phone: '555-987-6543',
    department: '2', // Marketing
    position: '5', // Marketing Manager
    hireDate: '2022-11-05',
    salary: 85000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: '103',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@company.com',
    phone: '555-456-7890',
    department: '4', // Finance
    position: '9', // Financial Analyst
    hireDate: '2023-03-22',
    salary: 78000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/3.jpg'
  },
  {
    id: '104',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@company.com',
    phone: '555-234-5678',
    department: '3', // Human Resources
    position: '7', // HR Manager
    hireDate: '2022-08-12',
    salary: 82000,
    status: 'inactive',
    image: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: '105',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@company.com',
    phone: '555-876-5432',
    department: '1', // Engineering
    position: '1', // Software Engineer
    hireDate: '2023-02-28',
    salary: 75000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/5.jpg'
  }
];
