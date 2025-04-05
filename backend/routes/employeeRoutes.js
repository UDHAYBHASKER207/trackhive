
const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/roleMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

// Admin routes
router.route('/')
  .get(protect, getEmployees)
  .post(protect, adminOnly, upload.single('image'), addEmployee);

router.route('/:id')
  .get(protect, getEmployeeById)
  .put(protect, adminOnly, upload.single('image'), updateEmployee)
  .delete(protect, adminOnly, deleteEmployee);

module.exports = router;
