
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    required: true
  },
  position: {
    type: String
  },
  hireDate: {
    type: String
  },
  salary: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  image: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
