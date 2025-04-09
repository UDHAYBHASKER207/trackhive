
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  if (!user) {
    return null;
  }

  const isActive = (path) => {
    return location.pathname === path ||
      (path !== '/' && location.pathname.startsWith(path));
  };

  const navLinks = user.role === 'admin'
    ? [
        { path: '/admin/dashboard', label: 'Dashboard' },
        { path: '/admin/employees', label: 'Employees' },
      ]
    : [
        { path: '/employee/dashboard', label: 'Dashboard' },
        { path: '/employee/profile', label: 'Profile' },
        { path: '/employee/attendance', label: 'Attendance' },
      ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-foreground">
              OfficeManager
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="mx-6 hidden flex-1 items-center space-x-4 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="p-2">
                  <p className="text-sm font-medium leading-none">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="mt-1 text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={logout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && menuOpen && (
        <div className="border-t border-border bg-background px-4 py-2 md:hidden">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
