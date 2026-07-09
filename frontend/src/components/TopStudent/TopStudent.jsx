import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, message } from 'antd';
import api from '../../api/axiosClient';
import './TopStudent.scss';

const TopStudent = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchTopStudents = async () => {
            try {
                const response = await api.get('/reports/top-khoi-a');
                if (response.data.success) {
                    const dataWithKey = response.data.data.map((item, index) => ({
                        ...item,
                        key: item.sbd,
                        rank: index + 1
                    }));
                    setStudents(dataWithKey);
                }
            } catch (error) {
                message.error('Không thể lấy danh sách Top 10 khối A.');
            } finally {
                setLoading(false);
            }
        };
        fetchTopStudents();
    }, []);

    const columns = [
        {
            title: 'Hạng',
            dataIndex: 'rank',
            key: 'rank',
            width: 80,
            align: 'center',
            render: (text, record, index) => {
                const actualRank = index + 1;
                let color = 'blue';
                if (actualRank === 1) color = 'gold';
                if (actualRank === 2) color = 'volcano';
                if (actualRank === 3) color = 'magenta';

                return (
                    <Tag color={color} style={{ fontWeight: 'bold', fontSize: '14px' }}>
                        #{actualRank}
                    </Tag>
                );
            }
        },
        {
            title: 'Số Báo Danh',
            dataIndex: 'sbd',
            key: 'sbd',
            align: 'center',
        },
        {
            title: 'Toán',
            dataIndex: 'toan',
            key: 'toan',
            align: 'center',
        },
        {
            title: 'Vật Lý',
            dataIndex: 'vat_li',
            key: 'vat_li',
            align: 'center',
        },
        {
            title: 'Hóa Học',
            dataIndex: 'hoa_hoc',
            key: 'hoa_hoc',
            align: 'center',
        },
        {
            title: 'Tổng Điểm Khối A',
            dataIndex: 'totalScore',
            key: 'totalScore',
            align: 'center',
            render: (score) => <span style={{ fontWeight: 'bold', color: '#ff4d4f', fontSize: '16px' }}>{score.toFixed(2)}</span>
        }
    ];

    return (
        <div className="top-students-container">
            <Card title="🏆 TOP 10 THÍ SINH CÓ ĐIỂM KHỐI A CAO NHẤT CẢ NƯỚC" className="top-card">
                <Table
                    columns={columns}
                    dataSource={students}
                    loading={loading}
                    pagination={false}
                    bordered
                    scroll={{ x: true }}
                />
            </Card>
        </div>
    );
};

export default TopStudent;