import axios from 'axios';

// Init Axios instance
const api = axios.create({
  // Local development: http://localhost:8080/api
  // Production: https://your-production-domain.com/api
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000, // 30s timeout 
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error Interceptor:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;