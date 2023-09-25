import "../../index.css";
import { useContext, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Upload,
} from "antd";
import moment from "moment";
import { ProductContext } from "../../context";
import { Instance } from "../../api";

const Products = () => {
  const [form] = Form.useForm();
  const {
    dataProduct,
    setIsModalOpen,
    isModalOpen,
    handleCancel,
    getAllProducts,
    dataBrands,
    dataCategories,
    dataUsers,
  } = useContext(ProductContext);
  const [key, setKey] = useState(0);
  const [fileList, setFileList] = useState();

  const onFinish = async (values) => {
    handleCancel();
    values.image = values.image.file;
    try {
      if (!key) {
        await Instance.post("products/create/", values, {
          headers: {
            "Content-Type": 'multipart/form-data',
          },
        });
      } else {
        await Instance.put(`products/edit/${key}`, values, {
          headers: {
            "Content-Type": 'multipart/form-data',
          },
        });
      }
      getAllProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({fileList}) => {
    setFileList(fileList)
  }

  const handleDelete = async (key) => {
    await Instance.delete(`products/delete/${key}`);
    getAllProducts();
  };

  const showModal = (id) => {
    setKey(id);
    if (id) {
      setIsModalOpen(true);
      const copyData = [...dataProduct];
      const find = copyData.find((item) => item.id === id);
      const copyFind = { ...find };
      copyFind.brandId = copyFind.Brand.name;
      copyFind.userId = copyFind.User.email;
      copyFind.categoryId = copyFind.Category.name;
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
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      render: (fecha) => {
        return moment(fecha).format("DD-MM-YYYY");
      },
    },
    {
      title: "updatedAt",
      dataIndex: "updatedAt",
      render: (fecha) => {
        return moment(fecha).format("DD-MM-YYYY");
      },
    },
    {
      title: "brand",
      dataIndex: "Brand",
      render: (brand) => {
        return brand?.name;
      },
    },
    {
      title: "user",
      dataIndex: "User",
      render: (user) => {
        return user?.email;
      },
    },
    {
      title: "category",
      dataIndex: "Category",
      render: (category) => {
        return category?.name;
      },
    },
    {
      title: "image",
      dataIndex: "image",
      render: (image) => {
        return <Image width={100} src={image} />;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        dataProduct.length > 0 ? (
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
      <h1>Products</h1>
      <Modal
        title={key ? "Update Product" : "Create Product"}
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
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input the price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Brand"
            name="brandId"
            rules={[
              {
                required: true,
                message: "Please input the brand!",
              },
            ]}
          >
            <Select>
              {dataBrands.map((item) => {
                return (
                  <Select.Option value={`${item.id}`} key={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="User"
            name="userId"
            rules={[
              {
                required: true,
                message: "Please input the user!",
              },
            ]}
          >
            <Select>
              {dataUsers.map((item) => {
                return (
                  <Select.Option value={`${item.id}`} key={item.id}>
                    {item.email}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please input the category!",
              },
            ]}
          >
            <Select>
              {dataCategories.map((item) => {
                return (
                  <Select.Option value={`${item.id}`} key={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input the image!",
              },
            ]}
          >
            <Upload 
              fileList={fileList} 
              onChange={handleChange}
              beforeUpload={() => false}
              name="logo" 
              action="/upload.do" 
              listType="picture"
            >
              <Button>Click to upload</Button>
            </Upload>
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
      <Table
        columns={columns}
        dataSource={dataProduct}
        rowKey="id"
        scroll={{ x: 1300 }}
      />
      <Button className="CreateButton" onClick={() => showModal()}>
        +
      </Button>
    </>
  );
};
export { Products };
