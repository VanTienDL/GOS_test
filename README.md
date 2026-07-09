# Hệ Thống Quản Lý & Tra Cứu Điểm Thi THPT Quốc Gia 2024

Hệ thống bao gồm hai thành phần độc lập: Frontend (React Vite) và Backend (ExpressJS), được đóng gói bằng Docker và deploy lên môi trường Production (Vercel & Koyeb).

## 📁 Cấu trúc thư mục dự án
```text
.
├── backend/          # Source code NodeJS Express & cấu hình Docker
├── frontend/         # Source code React Vite & cấu hình Vercel/Docker
└── README.md         # Tài liệu hướng dẫn tổng quan hệ thống
```
## 🛠️ Công nghệ sử dụng trong hệ thống
- **Frontend:** ReactJS, Vite, Ant Design, Axios, Chart.js.
- **Backend:** NodeJS, ExpressJS, Sequelize (ORM).
- **Database:** PostgreSQL (Supabase Cloud).
- **DevOps:** Docker, Docker Hub, Vercel, Koyeb Cloud.

## 🚀 Hướng dẫn chạy nhanh dưới Local bằng Docker Compose
Nếu máy local đã cài sẵn Docker Desktop, hệ thống có thể khởi động ngay lập tức thông qua file docker-compose (nếu có):

```bash
# Khởi động toàn bộ dịch vụ (Frontend, Backend, Database)
docker-compose up -d --build

Hệ thống sẽ chạy tại các cổng mặc định:

Frontend: http://localhost:3000 hoặc http://localhost:5173

Backend: http://localhost:5000

Chi tiết cấu hình và cài đặt thủ công từng phần, vui lòng xem tại tài liệu hướng dẫn riêng trong thư mục /backend và /frontend.
