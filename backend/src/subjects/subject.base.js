class Subject {
  constructor(name, fieldName) {
    this.name = name;           // Tên môn học hiển thị (Ví dụ: "Toán")
    this.fieldName = fieldName; // Tên cột tương ứng trong DB (Ví dụ: "toan")
  }

  // Phương thức dùng chung: Phân loại mức điểm theo đúng 4 cấp của đề bài
  getScoreLevel(score) {
    if (score === null || score === undefined) return null;
    
    if (score >= 8.0) return 'LEVEL_1';               // >= 8 points
    if (score < 8.0 && score >= 6.0) return 'LEVEL_2'; // 8 > && >= 6 points
    if (score < 6.0 && score >= 4.0) return 'LEVEL_3'; // 6 > && >= 4 points
    return 'LEVEL_4';                                  // < 4 points
  }

  // Phương thức validate điểm số đầu vào
  isValidScore(score) {
    if (score === null || score === undefined) return true; // Thí sinh không thi môn này
    return typeof score === 'number' && score >= 0 && score <= 10;
  }
}

module.exports = Subject;