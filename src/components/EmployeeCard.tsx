
import React from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDepartmentName, getPositionName } from '@/lib/data';
import { Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EmployeeCardProps {
  employee: Employee;
  onDelete: (id: string) => void;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee, onDelete }) => {
  return (
    <Card className="overflow-hidden bg-white transition-all duration-300 hover:shadow-md">
      <div className="aspect-square w-full overflow-hidden">
        <img 
          src={employee.image || 'https://randomuser.me/api/portraits/lego/1.jpg'} 
          alt={`${employee.firstName} ${employee.lastName}`}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {employee.firstName} {employee.lastName}
          </h3>
          <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
            {employee.status === 'active' ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>{getPositionName(employee.position)}</p>
          <p>{getDepartmentName(employee.department)}</p>
          <p>{employee.email}</p>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t p-4">
        <Link to={`/admin/employees/edit/${employee.id}`}>
          <Button variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </Link>
        
        <Button variant="outline" size="sm" onClick={() => onDelete(employee.id)} className="text-destructive hover:border-destructive hover:bg-destructive/10">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;
