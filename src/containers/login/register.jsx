import React from "react";
import "./styles.css";
import "atropos/css";
import Atropos from "atropos/react";
import { Link, Navigate } from "react-router-dom";
import { LockOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import { Instance } from "../../api";
import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../../context";

const Register = () => {
    const [error, setError] = useState(false)
    const { getTokenFromLocalStorage } = useContext(ProductContext)
    const [form] = Form.useForm();

    const onFinish = async () => {
      const value = await form.validateFields();
      try{
          const token = getTokenFromLocalStorage()
          await Instance.post('users/create', value, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          Navigate('/login')
      }catch(error){
        setError(true)
        setTimeout(() => {
          setError(false)
        }, 3000)
      }
    };

  return (
    <>
      <Row className="justify-content-center mt10">
        <Col lg={6}>
          <Atropos>
            <Card hoverable className="background-bottom">
              <Link to='/login'>Volver</Link>
              <h1 className="text-center">Register<ShopOutlined style={{fontSize: '32px'}}/></h1>
              <Form
                form={form}
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
              >
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, type: "email", message: "Please input your Email!" },
                  ]}
                >
                  <Input
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

                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Atropos>
        </Col>
        <Col lg={9}>
          {error ? (
            <Alert message="Hubo un error al registrarse" type="error" />
          ):(
            null
          )}
        </Col>
      </Row>
    </>
  );
};

export { Register };
