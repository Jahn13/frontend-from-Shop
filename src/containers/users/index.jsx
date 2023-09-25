import "../../index.css";
import { useContext, useState } from "react";
import {
  Alert,
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Table,
} from "antd";
import moment from 'moment'
import { ProductContext } from "../../context";
import { Instance } from "../../api";

const User = () => {
  const [form] = Form.useForm();
  const {
    dataUsers,
    setIsModalOpen,
    isModalOpen,
    handleCancel,
    getAllUsers,
    getTokenFromLocalStorage,
  } = useContext(ProductContext);
  const [key, setKey] = useState(0);
  const [error, setError] = useState(false);

  const onFinish = async () => {
    handleCancel();
    const value = await form.validateFields();
    try {
      const token = getTokenFromLocalStorage();
      if (!key) {
        await Instance.post("users/create", value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllUsers();
      } else {
        await Instance.put(`users/edit/${key}`, value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (key) => {
    try {
      const token = getTokenFromLocalStorage();
      await Instance.delete(`users/delete/${key}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllUsers();
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const showModal = (id) => {
    setKey(id);
    if (id) {
      setIsModalOpen(true);
      const copyData = [...dataUsers];
      const find = copyData.find((item) => item.id === id);
      const copyFind = { ...find };
      copyFind.password = '';
      form.setFieldsValue(copyFind);
    } else {
      form.resetFields();
      setIsModalOpen(true);
    }
  };

  const onFinishFailed = (errorInfo) => {
    if (!errorInfo) {
      handleCancel();
    }
  };

  const columns = [
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      render: (fecha) => {
        return moment(fecha).format('DD-MM-YYYY')
      }
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      render: (fecha) => {
        return moment(fecha).format('DD-MM-YYYY')
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        dataUsers.length > 0 ? (
          <Space size="middle">
            <Button onClick={() => showModal(record.id)}>Edit</Button>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  return (
    <>
      <h1>Users</h1>
      <Modal
        title={key ? "Update User" : "Create User"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input.Password value={''}/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {error ? (
        <Alert
          message="El User que está intentando eliminar está siendo usada en otra parte"
          type="error"
        />
      ) : null}
      <Table
        columns={columns}
        dataSource={dataUsers}
        rowKey="id"
        scroll={{ x: 1300 }}
      />
      <Button className="CreateButton" onClick={() => showModal()}>
        +
      </Button>
    </>
  );
};
export { User };
