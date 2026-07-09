class Subject {
  constructor(name, fieldName) {
    this.name = name;           // Display name
    this.fieldName = fieldName; // Column name
  }

  // Evaluate func
  getScoreLevel(score) {
    if (score === null || score === undefined) return null;
    
    if (score >= 8.0) return 'LEVEL_1';
    if (score < 8.0 && score >= 6.0) return 'LEVEL_2'; 
    if (score < 6.0 && score >= 4.0) return 'LEVEL_3';
    return 'LEVEL_4';
  }

  // Validate score input
  isValidScore(score) {
    if (score === null || score === undefined) return true;
    return typeof score === 'number' && score >= 0 && score <= 10;
  }
}

module.exports = Subject;