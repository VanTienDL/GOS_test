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
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
   return (
    <div 
      className="loading-container" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        width: '100%' 
      }}
    >
      <Spin size="large" tip="Đang tải dữ liệu biểu đồ..." />
    </div>
  );
  }

  const legendItems = [
    { label: 'Xuất sắc (>= 8)', color: '#52c41a' },
    { label: 'Khá (6 <= x < 8)', color: '#1890ff' },
    { label: 'Trung bình (4 <= x < 6)', color: '#faad14' },
    { label: 'Yếu (< 4)', color: '#f5222d' },
  ];

  return (
    <div className="score-chart-container">
      <Card title="📊 BIỂU ĐỒ THỐNG KÊ PHÂN PHỐI MỨC ĐIỂM THEO MÔN HỌC" className="chart-card">
        <div style={{ width: '100%', height: 470 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subjectName" />
              <YAxis />
              
              <Tooltip 
                formatter={(value) => new Intl.NumberFormat('en-US').format(value) + ' thí sinh'}
                itemSorter={(item) => {
                  const order = { level1: 1, level2: 2, level3: 3, level4: 4 };
                  return order[item.dataKey];
                }}
              />
              
              <Bar dataKey="level1" name="Xuất sắc (>= 8)" fill="#52c41a" />
              <Bar dataKey="level2" name="Khá (6 <= x < 8)" fill="#1890ff" />
              <Bar dataKey="level3" name="Trung bình (4 <= x < 6)" fill="#faad14" />
              <Bar dataKey="level4" name="Yếu (< 4)" fill="#f5222d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="custom-legend-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Space size="large">
            {legendItems.map((item, index) => (
              <Badge 
                key={index} 
                color={item.color} 
                text={<span style={{ fontSize: '14px', fontWeight: 500, color: '#555' }}>{item.label}</span>} 
              />
            ))}
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default ScoreChart;