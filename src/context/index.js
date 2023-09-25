import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instance } from '../api';

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataBrands, setDataBrands] = useState([]);
  const [dataCategories, setDataCategories] = useState([]);

  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token');
  };

  const getRoleFromLocalStorage = () => {
    return localStorage.getItem('rol');
  };

  const removeTokenFromLocalStorage = () => {
    try{
      navigate('/login');
      return localStorage.removeItem('token'), localStorage.removeItem('rol');
    }catch(error){
      console.error(error);
    }
  };

  const supervisorToken = () => {
    const token = getTokenFromLocalStorage();
    if(token){
      getAllBrands();
      getAllCategories();
      getAllProducts();
      getAllUsers();
    }
  }

  const getAllUsers = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await Instance.get("users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDataUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const getAllProducts = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await Instance.get("products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response.data.data.data);
      setDataProduct(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const getAllBrands = async () => {
    try {
      const token = getTokenFromLocalStorage();
      const response = await Instance.get("brands", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDataBrands(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const getAllCategories = async () => {
    try{
      const token = getTokenFromLocalStorage();
      const response = await Instance.get("category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setDataCategories(response.data.data);
    }catch(error){
      console.log(error);
    }
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const value = {
    dataProduct, dataCategories, getAllCategories, getAllUsers,
    isModalOpen, setIsModalOpen, dataUsers, getTokenFromLocalStorage,
    handleOk, handleCancel, dataBrands, getAllBrands, getAllProducts,
    removeTokenFromLocalStorage, getRoleFromLocalStorage,
  };

  useEffect(() => {
    supervisorToken();
  }, [])

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export { ProductProvider, ProductContext }