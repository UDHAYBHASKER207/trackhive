
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminDashboard from "./pages/admin/Dashboard";
import EmployeeList from "./pages/admin/EmployeeList";
import AddEmployee from "./pages/admin/AddEmployee";
import EditEmployee from "./pages/admin/EditEmployee";
import EmployeeDashboard from "./pages/employee/Dashboard";
import EmployeeProfile from "./pages/employee/Profile";
import EditProfile from "./pages/employee/EditProfile";
import Attendance from "./pages/employee/Attendance";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles: Array<'admin' | 'employee'> 
}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Loading state is handled in Layout component
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Redirect to appropriate dashboard based on role
  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else {
    return <Navigate to="/employee/dashboard" replace />;
  }
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Admin routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/employees" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <EmployeeList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/employees/add" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AddEmployee />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/employees/edit/:id" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <EditEmployee />
                </ProtectedRoute>
              } 
            />

            {/* Employee routes */}
            <Route 
              path="/employee/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/profile" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EmployeeProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/profile/edit" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <EditProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/employee/attendance" 
              element={
                <ProtectedRoute allowedRoles={['employee']}>
                  <Attendance />
                </ProtectedRoute>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
