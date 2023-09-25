import './styles.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../containers/login/context";

const PreventDefault = () => {
    const navigate = useNavigate();
    const { login } = useContext(LoginContext);
  
    useEffect(() => {
      if (!login) {
        navigate("/login");
      }
    }, []);
    return <h1 className='text-center'>Not Found 404</h1>;
  };
  

export {PreventDefault};