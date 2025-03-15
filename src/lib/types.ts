
export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  hireDate: string;
  salary: number;
  status: 'active' | 'inactive';
  image?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'employee';
  employeeId?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
}

export interface Position {
  id: string;
  name: string;
  department: string;
}

export type AuthUser = User | null;
