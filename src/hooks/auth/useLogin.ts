import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/features/userSlice";
import { AppDispatch } from "../../redux/store";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const login = async (email: string, password: string) => {
    setLoading(true);

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

      localStorage.setItem("token", data.data.token);
      dispatch(fetchCurrentUser());
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin;
