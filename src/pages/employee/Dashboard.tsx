
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/auth-context';
import { getEmployee, getDepartmentName, getPositionName, updateEmployee } from '@/lib/data';
import { Employee } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Edit, Calendar, DollarSign, Building, Briefcase, Mail, Phone } from 'lucide-react';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      if (!user?.employeeId) {
        setIsLoading(false);
        return;
      }

      try {
        const employeeData = await getEmployee(user.employeeId);
        if (employeeData) {
          setEmployee(employeeData);
          setFormData({
            email: employeeData.email,
            phone: employeeData.phone,
          });
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to fetch your profile data',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeData();
  }, [user, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employee) return;

    setIsSaving(true);

    try {
      const updatedEmployee = await updateEmployee(employee.id, formData);
      setEmployee(updatedEmployee);
      setIsEditing(false);
      
      toast({
        title: 'Success',
        description: 'Your profile has been updated',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update your profile',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 flex items-center justify-center h-[60vh]">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="ml-2">Loading your profile...</span>
        </div>
      </Layout>
    );
  }

  if (!employee) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="bg-white shadow-sm">
            <CardContent className="pt-6 pb-6 text-center">
              <p>No employee profile found. Please contact your administrator.</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-sm h-full">
              <CardContent className="pt-6 pb-6 flex flex-col items-center justify-center h-full">
                <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-white shadow-sm">
                  <img 
                    src={employee.image || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                    alt={`${employee.firstName} ${employee.lastName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold mt-2">{employee.firstName} {employee.lastName}</h2>
                <p className="text-muted-foreground">{getPositionName(employee.position)}</p>
                <div className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {getDepartmentName(employee.department)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">Employee Information</CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    disabled={isSaving}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>
                <CardDescription>Your personal and work details</CardDescription>
              </CardHeader>
              
              <CardContent>
                {isEditing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="flex justify-end pt-2">
                      <Button 
                        type="submit"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <Mail className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email</p>
                          <p>{employee.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Phone</p>
                          <p>{employee.phone}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Building className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Department</p>
                          <p>{getDepartmentName(employee.department)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Briefcase className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Position</p>
                          <p>{getPositionName(employee.position)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Hire Date</p>
                          <p>{new Date(employee.hireDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Salary</p>
                          <p>${employee.salary.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
