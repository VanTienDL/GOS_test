const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report.controller');

router.get('/statistics', ReportController.getScoreStatistics);
router.get('/top-khoid-a', ReportController.getTopKhoidA);

module.exports = router;