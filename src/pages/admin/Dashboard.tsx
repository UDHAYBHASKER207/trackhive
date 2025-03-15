
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardFooter 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { getEmployees, getDepartmentName } from '@/lib/data';
import { useAuth } from '@/lib/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Employee } from '@/lib/types';
import { 
  UserPlus, 
  Users, 
  Briefcase, 
  Building, 
  BarChart, 
  CheckCircle, 
  XCircle,
  ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch employee data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [toast]);

  // Calculate dashboard statistics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.status === 'active').length;
  const inactiveEmployees = employees.filter(e => e.status === 'inactive').length;
  
  // Group employees by department for the chart
  const departmentCounts = employees.reduce((acc: Record<string, number>, employee) => {
    const deptName = getDepartmentName(employee.department);
    acc[deptName] = (acc[deptName] || 0) + 1;
    return acc;
  }, {});

  // Recent employees (last 3)
  const recentEmployees = [...employees]
    .sort((a, b) => new Date(b.hireDate).getTime() - new Date(a.hireDate).getTime())
    .slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.firstName}! Here's an overview of your employee data.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Employees</p>
                  <p className="text-3xl font-bold">{totalEmployees}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Active Employees</p>
                  <p className="text-3xl font-bold text-green-600">{activeEmployees}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 flex items-center justify-center rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Inactive Employees</p>
                  <p className="text-3xl font-bold text-red-500">{inactiveEmployees}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded-full">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="animate-slide-up">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Employee Overview</CardTitle>
                    <CardDescription>Distribution of employees across the organization</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="text-center p-8">
                      <BarChart className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Department-based employee distribution chart would appear here
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="departments" className="animate-slide-up">
                <Card className="bg-white shadow-sm">
                  <CardHeader>
                    <CardTitle>Department Distribution</CardTitle>
                    <CardDescription>Number of employees in each department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(departmentCounts).map(([dept, count]) => (
                        <div key={dept} className="flex items-center justify-between p-3 bg-muted rounded-md">
                          <div className="flex items-center">
                            <Building className="h-5 w-5 text-primary mr-3" />
                            <span className="font-medium">{dept}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-muted-foreground mr-2">{count} employees</span>
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="bg-white shadow-sm animate-slide-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Employees</CardTitle>
                  <Link to="/admin/employees">
                    <Button variant="ghost" size="sm" className="h-8 gap-1">
                      View all
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEmployees.map((employee) => (
                    <div 
                      key={employee.id} 
                      className="flex items-center p-3 hover:bg-muted rounded-md transition-colors duration-200"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden mr-3 border border-gray-200">
                        <img 
                          src={employee.image || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{employee.firstName} {employee.lastName}</p>
                        <p className="text-sm text-muted-foreground">
                          {getDepartmentName(employee.department)}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(employee.hireDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/50 flex justify-center">
                <Link to="/admin/employees/add">
                  <Button variant="outline" className="w-full">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Employee
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <Link to="/admin/employees">
            <Button className="mr-4">
              <Users className="h-4 w-4 mr-2" />
              Manage Employees
            </Button>
          </Link>
          <Link to="/admin/employees/add">
            <Button variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
