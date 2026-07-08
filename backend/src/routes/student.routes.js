const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/student.controller');

router.get('/:sbd', StudentController.getStudentBySbd);

module.exports = router;