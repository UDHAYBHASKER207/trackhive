
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect if already logged in
    if (isAuthenticated) {
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <Layout hideNavbar>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4 py-12 text-center">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
              Office Manager
              <span className="text-primary"> Pro</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mt-6">
              An efficient employee management system for modern businesses. Streamline your HR processes and manage your team with ease.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <Button 
                size="lg" 
                onClick={() => navigate('/login')} 
                className="px-8"
              >
                Log in <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => navigate('/signup')} 
                className="px-8"
              >
                Sign up
              </Button>
            </div>
            
            <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2">Employee Management</h3>
                <p className="text-muted-foreground">Track and manage your employee data efficiently.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2">Department Organization</h3>
                <p className="text-muted-foreground">Organize employees by department and position.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
                <p className="text-muted-foreground">Comprehensive dashboard for administrators.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
