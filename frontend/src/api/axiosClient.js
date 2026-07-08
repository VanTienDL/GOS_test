import axios from 'axios';

// Khởi tạo một instance riêng cho Axios
const api = axios.create({
  // Lấy URL từ biến môi trường, nếu không có thì mặc định gọi về local backend port 5000
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, // 30 giây timeout cho các truy vấn tính toán lớn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Bạn có thể cấu hình thêm Interceptors tại đây nếu cần xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error Interceptor:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;