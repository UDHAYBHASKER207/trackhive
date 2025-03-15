
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle, XCircle, BarChart } from 'lucide-react';

// Mock attendance data - in a real app, this would come from an API
const attendanceData = [
  { date: '2023-06-01', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'present' },
  { date: '2023-06-02', checkIn: '08:45 AM', checkOut: '05:15 PM', status: 'present' },
  { date: '2023-06-03', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'present' },
  { date: '2023-06-04', checkIn: null, checkOut: null, status: 'absent' },
  { date: '2023-06-05', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'present' },
];

// Mock task data - in a real app, this would come from an API
const taskData = [
  { id: 1, title: 'Complete project documentation', dueDate: '2023-06-10', status: 'in-progress' },
  { id: 2, title: 'Review code changes', dueDate: '2023-06-07', status: 'completed' },
  { id: 3, title: 'Prepare presentation for client meeting', dueDate: '2023-06-15', status: 'not-started' },
  { id: 4, title: 'Weekly team meeting', dueDate: '2023-06-08', status: 'in-progress' }
];

const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [tasks, setTasks] = useState(taskData);

  // Function to handle check-in
  const handleCheckIn = () => {
    const now = new Date();
    const formattedTime = format(now, 'hh:mm a');
    setCheckInTime(formattedTime);
    
    toast({
      title: "Checked In",
      description: `You have checked in at ${formattedTime}`,
    });
  };

  // Function to handle check-out
  const handleCheckOut = () => {
    const now = new Date();
    const formattedTime = format(now, 'hh:mm a');
    
    toast({
      title: "Checked Out",
      description: `You have checked out at ${formattedTime}`,
    });
  };

  // Function to handle task status update
  const updateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    
    toast({
      title: "Task Updated",
      description: "Task status has been updated successfully.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <h1 className="text-3xl font-bold mb-6">Attendance & Tasks</h1>

        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Today's Attendance Card */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Today's Attendance
                  </CardTitle>
                  <CardDescription>
                    {format(new Date(), 'EEEE, MMMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Check In</p>
                        <p className="text-lg">{checkInTime || '–'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Check Out</p>
                        <p className="text-lg">–</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        onClick={handleCheckIn} 
                        disabled={!!checkInTime}
                        className="w-full"
                      >
                        Check In
                      </Button>
                      <Button 
                        onClick={handleCheckOut} 
                        disabled={!checkInTime}
                        variant="outline"
                        className="w-full"
                      >
                        Check Out
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Card */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Attendance Calendar
                  </CardTitle>
                  <CardDescription>
                    View and manage your attendance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border mx-auto"
                  />
                </CardContent>
              </Card>

              {/* Attendance History Card */}
              <Card className="col-span-1 md:col-span-3">
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription>Your recent attendance records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 bg-muted py-3 px-4 text-sm font-medium">
                      <div>Date</div>
                      <div>Check In</div>
                      <div>Check Out</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {attendanceData.map((record, index) => (
                        <div key={index} className="grid grid-cols-4 py-3 px-4">
                          <div>{new Date(record.date).toLocaleDateString()}</div>
                          <div>{record.checkIn || '–'}</div>
                          <div>{record.checkOut || '–'}</div>
                          <div className="flex items-center">
                            {record.status === 'present' ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Present
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <XCircle className="h-4 w-4 mr-1" />
                                Absent
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Tasks Summary Card */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5" />
                    Tasks Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Not Started</span>
                      <span className="text-sm font-medium">
                        {tasks.filter(t => t.status === 'not-started').length}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-400" 
                        style={{ width: `${tasks.filter(t => t.status === 'not-started').length / tasks.length * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">In Progress</span>
                      <span className="text-sm font-medium">
                        {tasks.filter(t => t.status === 'in-progress').length}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400" 
                        style={{ width: `${tasks.filter(t => t.status === 'in-progress').length / tasks.length * 100}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Completed</span>
                      <span className="text-sm font-medium">
                        {tasks.filter(t => t.status === 'completed').length}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-400" 
                        style={{ width: `${tasks.filter(t => t.status === 'completed').length / tasks.length * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Task List Card */}
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <CardTitle>My Tasks</CardTitle>
                  <CardDescription>Your assigned tasks and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map(task => (
                      <div key={task.id} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{task.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <select
                              value={task.status}
                              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                              className="text-sm border rounded px-2 py-1"
                            >
                              <option value="not-started">Not Started</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Attendance;
