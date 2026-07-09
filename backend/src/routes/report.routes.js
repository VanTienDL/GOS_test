const express = require('express');
const router = express.Router();
const ReportController = require('../controllers/report.controller');

router.get('/statistics', ReportController.getScoreStatistics);
router.get('/top-khoi-a', ReportController.getTopKhoiA);

module.exports = router;