import "../../index.css";
import { useContext, useState } from "react";
import { Alert, Button, Form, Input, Modal, Popconfirm, Space, Table } from "antd";
import { ProductContext } from "../../context";
import { Instance } from "../../api";
import { useEffect } from "react";
import moment from 'moment';

const Brand = () => {
  const [form] = Form.useForm();
  const {
    dataBrands,
    setIsModalOpen,
    isModalOpen,
    handleCancel,
    getAllBrands,
    getTokenFromLocalStorage,
  } = useContext(ProductContext);
  const [key, setKey] = useState(0);
  const [error, setError] = useState(false);

  const onFinish = async () => {
    handleCancel();
    const value = await form.validateFields();
    try {
      const token = getTokenFromLocalStorage()
      if (!key) {
        await Instance.post("brands/create/", value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllBrands();
      } else {
        await Instance.put(`brands/edit/${key}`, value, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllBrands();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (key) => {
    try {
      const token = getTokenFromLocalStorage()
      await Instance.delete(`brands/delete/${key}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getAllBrands();
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
      const copyData = [...dataBrands];
      const find = copyData.find((item) => item.id === id);
      const copyFind = { ...find };
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
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      render: (brand) => {
        return moment(brand).format('DD-MM-YYYY')
      }
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      render: (brand) => {
        return moment(brand).format('DD-MM-YYYY')
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        dataBrands.length > 0 ? (
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

  useEffect(() => {}, []);

  return (
    <>
      <h1>Brands</h1>
      <Modal
        title={key ? "Update Brand" : "Create Brand"}
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
            label="Name"
            name="name"
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
        <Alert message="La Brand que está intentando eliminar está siendo usada en otra parte" type="error" />
      ) : null}
      <Table columns={columns} dataSource={dataBrands} rowKey="id" scroll={{x: 1000,}} />
      <Button className="CreateButton" onClick={() => showModal()}>
        +
      </Button>
    </>
  );
};
export { Brand };
