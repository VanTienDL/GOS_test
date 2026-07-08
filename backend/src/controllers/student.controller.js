const Student = require('../models/student.model');

exports.getStudentBySbd = async (req, res) => {
  try {
    const { sbd } = req.params;

    // Logic Tightening: Kiểm tra định dạng SBD đầu vào (Chỉ gồm các chữ số và độ dài chuẩn)
    const sbdRegex = /^[0-9]{8,12}$/; 
    if (!sbd || !sbdRegex.test(sbd)) {
      return res.status(400).json({
        success: false,
        message: 'Số báo danh không hợp lệ. SBD phải là chuỗi các chữ số từ 8-12 ký tự.'
      });
    }

    // Truy vấn dữ liệu từ Postgres (Nhờ có Index Unique tốc độ sẽ < 10ms)
    const student = await Student.findOne({ where: { sbd } });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Không tìm thấy thí sinh có SBD: ${sbd}`
      });
    }

    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Lỗi tra cứu SBD:', error);
    return res.status(500).json({
      success: false,
      message: 'Lỗi hệ thống khi tra cứu điểm.'
    });
  }
};