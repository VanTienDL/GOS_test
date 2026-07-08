const { Sequelize } = require('sequelize');
const Student = require('../models/student.model');
const { availableSubjects } = require('../subjects/subject.manager');

// API 2: Thống kê mốc điểm phục vụ vẽ biểu đồ ở Frontend
exports.getScoreStatistics = async (req, res) => {
  try {
    const selectAttributes = [];

    // Áp dụng OOP: Lặp qua danh sách các môn học để tự động dựng câu lệnh SQL đếm động
    availableSubjects.forEach((subject) => {
      const col = subject.fieldName;

      // Dùng tính chất đa hình để tạo câu lệnh đếm cho từng mốc điểm của môn học đó
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

    // Thực hiện truy vấn Group/Aggregate trực tiếp dưới DB
    const rawStats = await Student.findOne({
      attributes: selectAttributes,
      raw: true
    });

    // Format lại dữ liệu thành mảng tường minh để Frontend (Chart) đọc phát ăn ngay
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

// API 3: Lọc Top 10 thí sinh khối A (Toán, Vật Lý, Hóa Học)
exports.getTopKhoidA = async (req, res) => {
  try {
    // Thắt chặt logic: Chỉ lấy những thí sinh thi ĐỦ CẢ 3 MÔN (không môn nào bị null)
    const topStudents = await Student.findAll({
      where: {
        toan: { [Sequelize.Op.ne]: null },
        vat_li: { [Sequelize.Op.ne]: null },
        hoa_hoc: { [Sequelize.Op.ne]: null }
      },
      attributes: [
        'sbd', 'toan', 'vat_li', 'hoa_hoc',
        // Tạo một cột ảo tính tổng điểm: toan + vat_li + hoa_hoc
        [Sequelize.literal('toan + vat_li + hoa_hoc'), 'totalScore']
      ],
      order: [
        [Sequelize.literal('toan + vat_li + hoa_hoc'), 'DESC'] // Sắp xếp giảm dần
      ],
      limit: 10, // Chỉ lấy 10 người cao nhất
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