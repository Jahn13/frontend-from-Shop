import axios from "axios";

const Instance = axios.create({
    baseURL : 'http://localhost:4000/',
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      timeout : 1000,
    }, 
  });
  
export { Instance };
