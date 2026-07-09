import React from 'react';
import { Layout, Menu } from 'antd';
import { SearchOutlined, BarChartOutlined, TrophyOutlined } from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './Layout.scss';

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { key: '/search', icon: <SearchOutlined />, label: 'Tra cứu điểm thi' },
    { key: '/chart', icon: <BarChartOutlined />, label: 'Thống kê biểu đồ' },
    { key: '/top-10', icon: <TrophyOutlined />, label: 'Top 10 khối A' },
  ];

  return (
    <Layout className="main-layout">
      <div className="sidebar-container">
        <div className="logo">
          <h2>THPT 2024</h2>
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          selectedKeys={[location.pathname]} 
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </div>
      
      <Layout className="site-layout">
        <Header className="site-header">
          <h1>HỆ THỐNG QUẢN LÝ & TRA CỨU ĐIỂM THI THPT QUỐC GIA 2024</h1>
        </Header>

        
        <div className="mobile-navigation">
          <Menu 
            theme="dark" 
            mode="horizontal" 
            selectedKeys={[location.pathname]} 
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            disabledOverflow={true} 
          />
        </div>
        
        <Content className="site-content">
          <div className="content-container">
            <Outlet />
          </div>
        </Content>
        
        <Footer className="site-footer">
          Golden Owl Assignment ©2026 - Developed by VanTienDL
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;