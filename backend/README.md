# GOS Backend API

Ứng dụng Backend được xây dựng bằng NodeJS Express, chịu trách nhiệm xử lý các logic tính toán phân phối điểm thi, quản lý danh sách thí sinh và kết nối trực tiếp với PostgreSQL.

## ⚙️ Các tính năng cốt lõi
- Kết nối và tự động đồng bộ cấu trúc bảng sang PostgreSQL thông qua Sequelize ORM.
- Tích hợp Seeder tự động nạp dữ liệu điểm thi khi phát hiện cơ sở dữ liệu trống.
- Cấu hình CORS động thông qua biến môi trường để tích hợp an toàn với Frontend trên mây.

## 🔑 Biến môi trường (.env)
Tạo file `.env` tại thư mục này với các biến sau:
```text
PORT=5000
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
FRONTEND_URL=http://localhost:3000
```

### 1. Cài đặt thư viện dependencies
npm install

### 2. Khởi chạy server ở chế độ Development
npm run dev

### 3. Khởi chạy server ở chế độ Production
npm start

### 4. Build Docker Image chuẩn hệ thống
docker build -t <username_dockerhub>/gos-backend:latest .

### 5. Đẩy Image lên Docker Hub Registry
docker push <username_dockerhub>/gos-backend:latest ```
