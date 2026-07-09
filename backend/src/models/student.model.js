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
    unique: true // UNIQUE INDEX for SBD in DB
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
  tableName: 'Students',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['sbd']   // Indexing for SBD to speed up queries
    }
  ]
});

module.exports = Student;