import React, { useEffect, useState } from 'react';
import { Card, Spin, message, Space, Badge } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../api/axiosClient';
import './ScoreChart.scss';

const ScoreChart = () => {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/reports/statistics');
        if (response.data.success) {
          setChartData(response.data.data);
        }
      } catch (error) {
        message.error('Không thể lấy dữ liệu thống kê biểu đồ.');
      } finally {
        loading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" tip="Đang tải dữ liệu biểu đồ..." />
      </div>
    );
  }

  const legendItems = [
    { label: 'Giỏi (>= 8)', color: '#52c41a' },
    { label: 'Khá (6 <= x < 8)', color: '#1890ff' },
    { label: 'Trung bình (4 <= x < 6)', color: '#faad14' },
    { label: 'Yếu (< 4)', color: '#f5222d' },
  ];

  return (
    <div className="score-chart-container">
      <Card title="📊 BIỂU ĐỒ THỐNG KÊ PHÂN PHỐI MỨC ĐIỂM THEO MÔN HỌC" className="chart-card">
        {/* Đưa style height ra ngoài file SCSS để responsive theo màn hình */}
        <div className="responsive-chart-wrapper">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 5 }} // Giảm margin trái phải cho rộng chỗ
            >
              <CartesianGrid strokeDasharray="3 3" />
              {/* SỬA CHỖ NÀY: Nghiêng chữ 45 độ để tránh đè chữ trên mobile */}
              <XAxis 
                dataKey="subjectName" 
                tick={{ fontSize: 11 }}
                angle={-45} 
                textAnchor="end" 
                height={65} 
              />
              {/* SỬA CHỖ NÀY: Giới hạn width của trục Y cho đỡ chiếm chỗ */}
              <YAxis tick={{ fontSize: 11 }} width={45} />
              
              <Tooltip 
                formatter={(value) => new Intl.NumberFormat('en-US').format(value) + ' thí sinh'}
                itemSorter={(item) => {
                  const order = { level1: 1, level2: 2, level3: 3, level4: 4 };
                  return order[item.dataKey];
                }}
              />
              
              <Bar dataKey="level1" name="Giỏi (>= 8)" fill="#52c41a" />
              <Bar dataKey="level2" name="Khá (6 <= x < 8)" fill="#1890ff" />
              <Bar dataKey="level3" name="Trung bình (4 <= x < 6)" fill="#faad14" />
              <Bar dataKey="level4" name="Yếu (< 4)" fill="#f5222d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Xóa inline style ở đây, kiểm soát hoàn toàn bằng SCSS */}
        <div className="custom-legend-container">
          <Space size="large" wrap className="legend-space">
            {legendItems.map((item, index) => (
              <Badge 
                key={index} 
                color={item.color} 
                text={<span className="legend-text">{item.label}</span>} 
              />
            ))}
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ScoreChart;