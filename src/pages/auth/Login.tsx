
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, LogIn, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth-context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter both email and password',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const user = await login(email, password);
      
      toast({
        title: 'Welcome back!',
        description: `You've successfully logged in as ${user.firstName}`,
      });
      
      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // For demo purposes, provide quick login buttons
  const quickLogin = async (role: 'admin' | 'employee') => {
    try {
      setIsLoading(true);
      let loginEmail = '';
      
      if (role === 'admin') {
        loginEmail = 'admin@company.com';
      } else {
        loginEmail = 'john.doe@company.com';
      }
      
      const user = await login(loginEmail, 'password');
      
      toast({
        title: 'Demo Login',
        description: `Logged in as ${user.firstName} (${role})`,
      });
      
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/employee/dashboard');
      }
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Something went wrong with the demo login.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="w-full max-w-md">
          <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>Enter your credentials to sign in to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Link 
                      to="#" 
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign in
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => quickLogin('admin')}
                  disabled={isLoading}
                >
                  <User className="mr-2 h-4 w-4" />
                  Demo Admin
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full"
                  onClick={() => quickLogin('employee')}
                  disabled={isLoading}
                >
                  <User className="mr-2 h-4 w-4" />
                  Demo Employee
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                <span className="text-gray-600">Don't have an account? </span>
                <Link 
                  to="/signup" 
                  className="text-primary font-medium hover:underline"
                >
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
