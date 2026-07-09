const { Sequelize } = require('sequelize');
const Student = require('../models/student.model');
const { availableSubjects } = require('../subjects/subject.manager');

// Statistics & chart API
exports.getScoreStatistics = async (req, res) => {
  try {
    const selectAttributes = [];

    // OOP: Loop through subjects to count
    availableSubjects.forEach((subject) => {
      const col = subject.fieldName;

      selectAttributes.push([
        Sequelize.literal(`SUM(CASE WHEN "${col}" >= 8.0 THEN 1 ELSE 0 END)`),
        `${col}_level1`
      ]);
      selectAttributes.push([
        Sequelize.literal(`SUM(CASE WHEN "${col}" < 8.0 AND "${col}" >= 6.0 THEN 1 ELSE 0 END)`),
        `${col}_level2`
      ]);
      selectAttributes.push([
        Sequelize.literal(`SUM(CASE WHEN "${col}" < 6.0 AND "${col}" >= 4.0 THEN 1 ELSE 0 END)`),
        `${col}_level3`
      ]);
      selectAttributes.push([
        Sequelize.literal(`SUM(CASE WHEN "${col}" < 4.0 THEN 1 ELSE 0 END)`),
        `${col}_level4`
      ]);
    });

    // Query Group/Aggregate
    const rawStats = await Student.findOne({
      attributes: selectAttributes,
      raw: true
    });

    // Format for frontend chart
    const formattedData = availableSubjects.map((subject) => {
      const col = subject.fieldName;
      return {
        subjectName: subject.name,
        subjectCode: col,
        level1: parseInt(rawStats[`${col}_level1`] || 0, 10), // >= 8
        level2: parseInt(rawStats[`${col}_level2`] || 0, 10), // 6 <= x < 8
        level3: parseInt(rawStats[`${col}_level3`] || 0, 10), // 4 <= x < 6
        level4: parseInt(rawStats[`${col}_level4`] || 0, 10)  // < 4
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    console.error('Lỗi thống kê mức điểm:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi tính toán thống kê.'
    });
  }
};

// Top 10 in A-group API
exports.getTopKhoiA = async (req, res) => {
  try {
    // Not null in all toan, vat_li, hoa_hoc
    const topStudents = await Student.findAll({
      where: {
        toan: { [Sequelize.Op.ne]: null },
        vat_li: { [Sequelize.Op.ne]: null },
        hoa_hoc: { [Sequelize.Op.ne]: null }
      },
      attributes: [
        'sbd', 'toan', 'vat_li', 'hoa_hoc',
        // Summing
        [Sequelize.literal('toan + vat_li + hoa_hoc'), 'totalScore']
      ],
      order: [
        [Sequelize.literal('toan + vat_li + hoa_hoc'), 'DESC']
      ],
      limit: 10,
      raw: true
    });

    return res.status(200).json({
      success: true,
      data: topStudents
    });
  } catch (error) {
    console.error('Lỗi lọc Top 10 khối A:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi tìm kiếm thủ khoa khối A.'
    });
  }
};