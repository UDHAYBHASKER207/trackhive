
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth-context';
import { getEmployee, getDepartmentName, getPositionName, updateEmployee } from '@/lib/data';
import { Employee } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Loader2, Save, Edit, Calendar, DollarSign, Building, Briefcase, 
  Mail, Phone, Clock, CheckCircle, XCircle, FileText, Bell, 
  User, Lock, ListTodo, ClipboardList, MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
  
  // Simulated data for demonstration purposes
  const attendanceStatus = "present"; // or "absent"
  const recentActivities = [
    { type: "login", date: new Date(Date.now() - 24 * 60 * 60 * 1000), message: "Logged in to the system" },
    { type: "profile", date: new Date(Date.now() - 48 * 60 * 60 * 1000), message: "Updated contact information" },
    { type: "notification", date: new Date(Date.now() - 72 * 60 * 60 * 1000), message: "New announcement from Admin" },
  ];
  
  const assignedTasks = [
    { id: 1, name: "Complete weekly report", dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), status: "in-progress" },
    { id: 2, name: "Team meeting", dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), status: "pending" },
  ];
  
  const announcements = [
    { id: 1, title: "Office Closure", date: new Date(Date.now() - 72 * 60 * 60 * 1000), content: "The office will be closed for maintenance this weekend." },
  ];

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
      <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Employee Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Personal Information Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-sm h-full">
              <CardHeader className="pb-2">
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-2 pb-6 flex flex-col items-center justify-center">
                <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-white shadow-sm">
                  <img 
                    src={employee.image || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
                    alt={`${employee.firstName} ${employee.lastName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold mt-2">{employee.firstName} {employee.lastName}</h2>
                <p className="text-muted-foreground mb-1">
                  <Badge variant="outline" className="mr-1">ID: EMP-{employee.id.substring(0, 5)}</Badge>
                </p>
                <p className="text-muted-foreground">{getPositionName(employee.position)}</p>
                <div className="mt-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {getDepartmentName(employee.department)}
                </div>
                
                <div className="mt-4 space-y-2 w-full">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">{employee.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-sm">{employee.phone}</span>
                  </div>
                </div>
                
                <div className="mt-4 w-full">
                  <Link to="/employee/profile/edit">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6">
              {/* Work Summary Section */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Work Summary</CardTitle>
                  <CardDescription>Your current work status and metrics</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Attendance Status</h3>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex items-center">
                        {attendanceStatus === "present" ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                            <span className="font-medium text-green-500">Present</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-500 mr-2" />
                            <span className="font-medium text-red-500">Absent</span>
                          </>
                        )}
                      </div>
                      <Link to="/employee/attendance" className="mt-4 text-xs text-primary hover:underline self-end">
                        View Attendance History
                      </Link>
                    </div>
                    
                    <div className="flex flex-col p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Assigned Tasks</h3>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">{assignedTasks.length}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {assignedTasks.filter(t => t.status === "in-progress").length} in progress
                      </div>
                      <Link to="#" className="mt-4 text-xs text-primary hover:underline self-end">
                        View All Tasks
                      </Link>
                    </div>
                    
                    <div className="flex flex-col p-4 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Performance</h3>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="text-2xl font-bold">92%</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        +5% from last month
                      </div>
                      <Link to="#" className="mt-4 text-xs text-primary hover:underline self-end">
                        View Performance Report
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity Section */}
              <Card className="bg-white shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent actions and notifications</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start border-b border-border pb-3 last:border-0 last:pb-0">
                        {activity.type === "login" && <Clock className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />}
                        {activity.type === "profile" && <User className="h-5 w-5 text-green-500 mr-3 mt-0.5" />}
                        {activity.type === "notification" && <Bell className="h-5 w-5 text-orange-500 mr-3 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-sm">{activity.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {activity.date.toLocaleDateString()} at {activity.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions & Additional Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quick Actions Section */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="grid grid-cols-1 gap-2">
                      <Link to="/employee/profile">
                        <Button variant="outline" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                      <Link to="/employee/profile/edit">
                        <Button variant="outline" className="w-full justify-start">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full justify-start">
                        <Lock className="h-4 w-4 mr-2" />
                        Change Password
                      </Button>
                      <Link to="/employee/attendance">
                        <Button variant="outline" className="w-full justify-start">
                          <ClipboardList className="h-4 w-4 mr-2" />
                          View Attendance
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>

                {/* Announcements Section */}
                <Card className="bg-white shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Announcements</CardTitle>
                    <CardDescription>Messages from administration</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    {announcements.length > 0 ? (
                      <div className="space-y-4">
                        {announcements.map(announcement => (
                          <div key={announcement.id} className="flex items-start pb-2">
                            <MessageSquare className="h-5 w-5 text-primary mr-3 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">{announcement.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                {announcement.date.toLocaleDateString()}
                              </p>
                              <p className="text-sm mt-1">{announcement.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No announcements at this time.</p>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="link" className="p-0 h-auto">View all announcements</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
