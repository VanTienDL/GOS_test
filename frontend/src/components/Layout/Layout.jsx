import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { SearchOutlined, BarChartOutlined, TrophyOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Layout.scss';

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/search', icon: <SearchOutlined />, label: 'Tra cứu điểm thi' },
    { key: '/chart', icon: <BarChartOutlined />, label: 'Thống kê biểu đồ' },
    { key: '/top-10', icon: <TrophyOutlined />, label: 'Top 10 khối A' },
  ];

  return (
    <Layout className="main-layout">
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
        breakpoint="lg"
      >
        <div className="logo">
          <h2>{collapsed ? 'THPT' : 'THPT 2024'}</h2>
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={[location.pathname]} 
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      
      <Layout className="site-layout">
        <Header className="site-header">
          <h1>HỆ THỐNG QUẢN LÝ & TRA CỨU ĐIỂM THI THPT QUỐC GIA 2024</h1>
        </Header>
        
        <Content className="site-content">
          <div className="content-container">
            {/* Outlet sẽ là nơi hiển thị nội dung các route con */}
            <Outlet />
          </div>
        </Content>
        
        <Footer className="site-footer">
          Golden Owl Assignment ©2026 - Developed by Tien
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;