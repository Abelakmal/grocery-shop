import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../helper/config";
import { fetchCurrentAdmin } from "../../redux/features/adminSlice";

const useLoginAdmin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
  
    const login = async (email: string, password: string) => {
      setLoading(true);
      setError(null);

      try {
        const { data } = await axios.post(
          `${baseURL}/auth/login-admin`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        console.log(data);
        localStorage.setItem("token", data.data.token);
        dispatch(fetchCurrentAdmin());
        navigate("/admin");
      } catch (err: any) {

        
        setError(err.response.data?.error || "Server Error");
      } finally {
        setLoading(false);
      }
    };
  
    return { login, loading, error };
  };
  
  export default useLoginAdmin;