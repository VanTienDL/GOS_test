import React, { useState } from 'react';
import { Form, Input, Button, Card, Descriptions, Alert, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import api from '../../api/axiosClient';
import './SearchScore.scss';

const SearchScore = () => {
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    setStudentData(null);
    try {
      const response = await api.get(`/students/${values.sbd}`);
      if (response.data.success) {
        setStudentData(response.data.data);
        message.success('Tìm kiếm thành công!');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Không tìm thấy thí sinh này hoặc hệ thống bận.';
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Hàm bổ trợ render điểm số hoặc hiển thị dấu "-" nếu null
  const renderScore = (score) => (score !== null && score !== undefined ? score : '-');

  return (
    <div className="search-score-container">
      <Card title="🔍 TRA CỨU ĐIỂM THI THPT 2024" className="search-card">
        <Form layout="inline" onFinish={onFinish} className="search-form">
          <Form.Item
            name="sbd"
            rules={[
              { required: true, message: 'Vui lòng nhập Số Báo Danh!' },
              { pattern: /^[0-9]{8,12}$/, message: 'Số báo danh phải là dãy số từ 8 - 12 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập số báo danh thí sinh..." maxLength={12} className="search-input" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={loading}>
              Tra cứu
            </Button>
          </Form.Item>
        </Form>

        {studentData && (
          <div className="result-container">
            <Alert message={`Kết quả tìm kiếm cho SBD: ${studentData.sbd}`} type="success" showIcon className="result-alert" />
            <Descriptions title="Bảng điểm chi tiết" bordered column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}>
              <Descriptions.Item label="Toán">{renderScore(studentData.toan)}</Descriptions.Item>
              <Descriptions.Item label="Ngữ Văn">{renderScore(studentData.ngu_van)}</Descriptions.Item>
              <Descriptions.Item label="Ngoại Ngữ">
                {renderScore(studentData.ngoai_ngu)} {studentData.ma_ngoai_ngu ? `(${studentData.ma_ngoai_ngu})` : ''}
              </Descriptions.Item>
              <Descriptions.Item label="Vật Lý">{renderScore(studentData.vat_li)}</Descriptions.Item>
              <Descriptions.Item label="Hóa Học">{renderScore(studentData.hoa_hoc)}</Descriptions.Item>
              <Descriptions.Item label="Sinh Học">{renderScore(studentData.sinh_hoc)}</Descriptions.Item>
              <Descriptions.Item label="Lịch Sử">{renderScore(studentData.lich_su)}</Descriptions.Item>
              <Descriptions.Item label="Địa Lý">{renderScore(studentData.dia_li)}</Descriptions.Item>
              <Descriptions.Item label="GDCD">{renderScore(studentData.gdcd)}</Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SearchScore;