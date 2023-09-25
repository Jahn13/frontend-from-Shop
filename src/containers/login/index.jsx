import React from "react";
import "./styles.css";
import "atropos/css";
import Atropos from "atropos/react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import { useContext } from "react";
import { Instance } from "../../api";
import { useState } from "react";
import { ProductContext } from "../../context";

const Login = () => {
  const navigate = useNavigate();
  const { getAllBrands, getAllCategories, getAllProducts, getAllUsers } =
    useContext(ProductContext);
  const [error, setError] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async () => {
    const value = await form.validateFields();
    try {
      const login = await Instance.post("login/auth", value);
      const { User } = login.data.data;
      const decodificado = jwt_decode(User);
      console.log(decodificado.roles)
      localStorage.setItem("token", User);
      localStorage.setItem("rol", decodificado.roles);
      if (decodificado.roles[0] !== "moderador") {
        navigate("/users");
        getAllProducts();
        getAllBrands();
        getAllCategories();
        getAllUsers();
      }else{
        navigate("/category");
        getAllCategories();
      }
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <>
      <Row className="justify-content-center mt10">
        <Col lg={6}>
          <Atropos>
            <Card hoverable className="background-bottom">
              <h1 className="text-center">
                Login
                <ShopOutlined style={{ fontSize: "32px" }} />
              </h1>
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your Email!" },
                  ]}
                >
                  <Input
                    type="email"
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your Password!" },
                  ]}
                >
                  <Input.Password
                    prefix={
                      <LockOutlined className="site-form-item-icon transparent" />
                    }
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                  Or <Link to="/register">register now!</Link>
                </Form.Item>
              </Form>
            </Card>
          </Atropos>
        </Col>
        <Col lg={9}>
          {error ? (
            <Alert
              message="No se encontró el usuario en la data"
              type="error"
            />
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export { Login };
