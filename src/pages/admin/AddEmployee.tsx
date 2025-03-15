
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { addEmployee, departments, positions } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft, Save } from 'lucide-react';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    hireDate: new Date().toISOString().split('T')[0],
    salary: 0,
    status: 'active' as 'active' | 'inactive',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredPositions = positions.filter(
    (pos) => !formData.department || pos.department === formData.department
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await addEmployee(formData);
      
      toast({
        title: 'Success',
        description: 'Employee has been successfully added',
      });
      
      navigate('/admin/employees');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add employee',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl animate-fade-in">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate('/admin/employees')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Employees
        </Button>
        
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Add New Employee</CardTitle>
            <CardDescription>
              Fill in the details to add a new employee to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <Select
                    onValueChange={(value) => handleSelectChange('department', value)}
                    value={formData.department}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">
                    Position
                  </label>
                  <Select
                    onValueChange={(value) => handleSelectChange('position', value)}
                    value={formData.position}
                    disabled={!formData.department}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={
                        !formData.department 
                          ? "Select department first" 
                          : "Select position"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPositions.map((pos) => (
                        <SelectItem key={pos.id} value={pos.id}>
                          {pos.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="hireDate" className="text-sm font-medium">
                    Hire Date
                  </label>
                  <Input
                    id="hireDate"
                    name="hireDate"
                    type="date"
                    value={formData.hireDate}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="salary" className="text-sm font-medium">
                    Salary
                  </label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    value={formData.salary || ''}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="status" className="text-sm font-medium">
                    Status
                  </label>
                  <Select
                    onValueChange={(value) => 
                      handleSelectChange('status', value as 'active' | 'inactive')
                    }
                    defaultValue="active"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => navigate('/admin/employees')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Employee
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddEmployee;
