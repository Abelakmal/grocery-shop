import { useState } from "react";
import { baseURL } from "../../helper/config";
import axios from "axios";
import toast from "react-hot-toast";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = async (email:string) => {
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${baseURL}/auth/forgotPassword/${email}`,{});
      toast.success("Successfully!", { duration: 3000 });
    } catch (err: any) {
      setError(err.response.data?.error || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return { send, loading, error };
};

export default useForgotPassword;
