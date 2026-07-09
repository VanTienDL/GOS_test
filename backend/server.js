const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./src/config/database');
const Student = require('./src/models/student.model');
const { seedData } = require('./src/utils/seeder');
const studentRoutes = require('./src/routes/student.routes');
const reportRoutes = require('./src/routes/report.routes');

const app = express();

// CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.FRONTEND_URL //For cloud
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
  credentials: true
}));

app.use(express.json());
app.use('/api/students', studentRoutes);
app.use('/api/reports', reportRoutes);

const PORT = process.env.PORT || 5000;

// Init DB & Seed Data
async function initializeDatabase() {
  try {
    console.log('🔄 Đang kết nối và đồng bộ cấu trúc bảng với PostgreSQL...');
    await sequelize.authenticate(); // Check connection
    console.log('📶 Kết nối thành công tới Database Server!');
    
    await sequelize.sync({ force: false });
    console.log('✅ Đồng bộ cấu trúc bảng thành công!');

    const count = await Student.count();
    if (count === 0) {
      console.log('➡️ Phát hiện Database trống. Bắt đầu seed dữ liệu...');
      await seedData();
    } else {
      console.log(`✅ Database đã có sẵn ${count} bản ghi. Bỏ qua bước seed dữ liệu.`);
    }
  } catch (error) {
    console.error('❌ Lỗi khởi tạo hệ thống Database:', error.message);
  }
}

// Run server
app.listen(PORT, async () => {
  console.log(`🚀 Server đang chạy thành công tại port: ${PORT}`);
  await initializeDatabase();
});