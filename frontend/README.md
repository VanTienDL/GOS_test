# GOS Frontend UI

Ứng dụng giao diện người dùng được xây dựng bằng ReactJS và Vite, cung cấp các bộ lọc tra cứu điểm thi và hiển thị biểu đồ phân tích trực quan.

## ⚙️ Các tính năng cốt lõi
- **Tra cứu:** Tìm kiếm điểm thi chi tiết theo Số báo danh (SBD) của thí sinh.
- **Thống kê:** Biểu đồ phân phối mức điểm theo từng môn học sử dụng Chart.js.
- **Top Khối:** Danh sách xếp hạng các thí sinh đạt điểm cao nhất theo các khối thi (A, B, C...).

## 🔑 Biến môi trường (.env)
Tạo file `.env` tại thư mục này để kết nối API:
```text
VITE_API_BASE_URL=http://localhost:5000/api
```

### 1. Cài đặt các gói thư viện
npm install

### 2. Chạy ứng dụng dưới local
npm run dev

### 3. Biên dịch mã nguồn ra thư mục tĩnh (dist)
npm run build

