import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../helper/config";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post(
        `${baseURL}/auth/login-users`,
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

      navigate("/");
    } catch (err: any) {
      console.log(err);

      setError(err.response.data?.error || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
