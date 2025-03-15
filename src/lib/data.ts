
import { Employee, User, Department, Position } from './types';

export const departments: Department[] = [
  { id: '1', name: 'Engineering', description: 'Software development and technical operations' },
  { id: '2', name: 'Marketing', description: 'Brand management and customer acquisition' },
  { id: '3', name: 'Human Resources', description: 'Personnel management and recruitment' },
  { id: '4', name: 'Finance', description: 'Financial operations and accounting' },
  { id: '5', name: 'Sales', description: 'Revenue generation and client relations' },
  { id: '6', name: 'Operations', description: 'Business processes and logistics' },
  { id: '7', name: 'Customer Support', description: 'Customer service and assistance' },
];

export const positions: Position[] = [
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

export const employees: Employee[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '555-123-4567',
    department: '1',
    position: '2',
    hireDate: '2020-01-15',
    salary: 95000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    phone: '555-987-6543',
    department: '2',
    position: '5',
    hireDate: '2019-03-20',
    salary: 88000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@company.com',
    phone: '555-456-7890',
    department: '3',
    position: '7',
    hireDate: '2021-06-10',
    salary: 79000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@company.com',
    phone: '555-789-0123',
    department: '1',
    position: '1',
    hireDate: '2022-02-05',
    salary: 75000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '5',
    firstName: 'Michael',
    lastName: 'Williams',
    email: 'michael.williams@company.com',
    phone: '555-321-6547',
    department: '4',
    position: '9',
    hireDate: '2020-09-15',
    salary: 82000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@company.com',
    phone: '555-654-9870',
    department: '5',
    position: '11',
    hireDate: '2019-11-03',
    salary: 92000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
  {
    id: '7',
    firstName: 'David',
    lastName: 'Miller',
    email: 'david.miller@company.com',
    phone: '555-234-5678',
    department: '6',
    position: '13',
    hireDate: '2021-08-22',
    salary: 85000,
    status: 'active',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
  },
];

export const users: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
  {
    id: '2',
    email: 'john.doe@company.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'employee',
    employeeId: '1',
  },
  {
    id: '3',
    email: 'jane.smith@company.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'employee',
    employeeId: '2',
  },
];

// Simple auth functions for mock data
let currentUser: User | null = null;

export const getCurrentUser = () => currentUser;

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // In a real app, this would check the password too
      const user = users.find(u => u.email === email);
      if (user) {
        currentUser = user;
        resolve(user);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 500);
  });
};

export const signup = (userData: Partial<User>, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (users.some(u => u.email === userData.email)) {
        reject(new Error('User already exists'));
      } else {
        const newUser: User = {
          id: String(users.length + 1),
          email: userData.email!,
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          role: userData.role || 'employee',
          employeeId: userData.employeeId,
        };
        users.push(newUser);
        currentUser = newUser;
        resolve(newUser);
      }
    }, 500);
  });
};

export const logout = (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      resolve();
    }, 300);
  });
};

// Mock employee CRUD operations
export const getEmployees = (): Promise<Employee[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...employees]);
    }, 500);
  });
};

export const getEmployee = (id: string): Promise<Employee | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employees.find(e => e.id === id));
    }, 300);
  });
};

export const getDepartmentName = (id: string): string => {
  return departments.find(d => d.id === id)?.name || '';
};

export const getPositionName = (id: string): string => {
  return positions.find(p => p.id === id)?.name || '';
};

export const addEmployee = (employee: Omit<Employee, 'id'>): Promise<Employee> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newEmployee = {
        ...employee,
        id: String(employees.length + 1),
      };
      employees.push(newEmployee);
      resolve(newEmployee);
    }, 500);
  });
};

export const updateEmployee = (id: string, data: Partial<Employee>): Promise<Employee> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = employees.findIndex(e => e.id === id);
      if (index !== -1) {
        employees[index] = { ...employees[index], ...data };
        resolve(employees[index]);
      } else {
        reject(new Error('Employee not found'));
      }
    }, 500);
  });
};

export const deleteEmployee = (id: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = employees.findIndex(e => e.id === id);
      if (index !== -1) {
        employees.splice(index, 1);
        resolve(true);
      } else {
        reject(new Error('Employee not found'));
      }
    }, 500);
  });
};

// Auth context creation
export const createAuthContext = () => {
  return {
    user: currentUser,
    login,
    signup,
    logout,
  };
};
