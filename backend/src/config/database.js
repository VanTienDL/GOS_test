const { Sequelize } = require('sequelize');

let sequelize;

// Nếu trên Cloud (Koyeb) có nạp DATABASE_URL tổng hợp, ta sử dụng nó
if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  // Môi trường LOCAL (Cả chạy npm start thuần hoặc Docker Compose)
  // Ép Sequelize kết nối thông qua các biến đơn lẻ, đây là cách chạy ỔN ĐỊNH NHẤT của Postgres trên Windows
  console.log('🔌 Thiết lập kết nối Postgres Local qua thông số cấu hình đơn lẻ...');
  
  sequelize = new Sequelize(
    process.env.DB_NAME || 'gos_thpt_2024',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '123456',
    {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      dialect: 'postgres',
      logging: false,
      native: false, // Tuyệt đối không dùng driver native C++ gây lỗi .on()
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
}

module.exports = sequelize;