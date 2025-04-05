
const Employee = require('../models/Employee');
const User = require('../models/User');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private/Admin
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get employee by ID
// @route   GET /api/employees/:id
// @access  Private
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

// @desc    Create a new employee
// @route   POST /api/employees
// @access  Private/Admin
const addEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      hireDate,
      salary,
      status
    } = req.body;

    // Check if employee with this email already exists
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: 'Employee already exists with this email' });
    }

    // Create new employee
    const employee = await Employee.create({
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      hireDate,
      salary,
      status: status || 'active',
      image: req.file ? `/uploads/${req.file.filename}` : ''
    });

    if (employee) {
      res.status(201).json(employee);
    } else {
      res.status(400).json({ message: 'Invalid employee data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error while creating employee',
      error: error.message
    });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private/Admin
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      position,
      hireDate,
      salary,
      status
    } = req.body;

    // Check if updating email to one that already exists
    if (email !== employee.email) {
      const emailExists = await Employee.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use by another employee' });
      }
    }

    // Update fields
    employee.firstName = firstName || employee.firstName;
    employee.lastName = lastName || employee.lastName;
    employee.email = email || employee.email;
    employee.phone = phone || employee.phone;
    employee.department = department || employee.department;
    employee.position = position || employee.position;
    employee.hireDate = hireDate || employee.hireDate;
    employee.salary = salary || employee.salary;
    employee.status = status || employee.status;
    
    if (req.file) {
      employee.image = `/uploads/${req.file.filename}`;
    }

    const updatedEmployee = await employee.save();
    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.status(500).json({ 
        message: 'Server error while updating employee',
        error: error.message
      });
    }
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private/Admin
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Find and update any user associated with this employee
    await User.updateMany(
      { employeeId: employee._id },
      { $unset: { employeeId: "" } }
    );

    // Delete the employee
    await employee.remove();
    
    res.json({ message: 'Employee removed' });
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      res.status(404).json({ message: 'Employee not found' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
