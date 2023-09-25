import React, { useContext, useState } from "react";
import './styles.css'
import { ProductContext } from "../context";
import { Link, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BarChartOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button } from "antd";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const { Header, Content, Footer, Sider } = Layout;

const items = [
  getItem(<Link to="/users">Users</Link>, "1", <UserOutlined />),
  getItem(<Link to="/products">Products</Link>, "2", <UserOutlined />),
  getItem(<Link to="/brands">Brands</Link>, "3", <BarChartOutlined />),
  getItem(<Link to="/category">Category</Link>, "4", <UploadOutlined />),
];

const items2 = [
  getItem(<Link to="/category">Category</Link>, "1", <UploadOutlined />),
]

function LayoutShope({ children }) {
  const { removeTokenFromLocalStorage, getRoleFromLocalStorage } = useContext(ProductContext)
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const role = getRoleFromLocalStorage();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={role === "moderador" ? items2 : items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: location.pathname.includes("/")
              ? "rgb(95, 140, 180)"
              : colorBgContainer,
          }}
          className='d-flex justify-content-between'
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Link className="logout" onClick={() => removeTokenFromLocalStorage()}>Logout</Link>
        </Header>
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: location.pathname.includes("/")
                ? "rgb(180, 210, 248)"
                : colorBgContainer,
              minHeight: "80vh",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "rgb(95, 140, 180)"
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
export { LayoutShope };