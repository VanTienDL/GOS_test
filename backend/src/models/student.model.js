const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sbd: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true // Tự động tạo UNIQUE INDEX cho Số Báo Danh từ phía DB
  },
  toan: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  ngu_van: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  ngoai_ngu: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  vat_li: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  hoa_hoc: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  sinh_hoc: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  lich_su: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  dia_li: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  gdcd: { 
    type: DataTypes.FLOAT, 
    allowNull: true 
  },
  ma_ngoai_ngu: { 
    type: DataTypes.STRING(5), 
    allowNull: true 
  }
}, {
  tableName: 'Students', // Chỉ định rõ ràng tên bảng trong Postgres
  timestamps: false,     // Tắt thuộc tính tự sinh createdAt và updatedAt để tối ưu dung lượng
  indexes: [
    {
      unique: true,
      fields: ['sbd']     // Đánh index tường minh tối ưu hóa truy vấn tìm kiếm bằng SBD
    }
  ]
});

module.exports = Student;