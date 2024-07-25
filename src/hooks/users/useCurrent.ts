import axios from "axios";
import { useEffect, useState } from "react";
import { IUser } from "../../types/user.type";
import { useNavigate } from "react-router-dom";

const useCurrent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState<IUser>();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if(token){
        getUser();
    }
  }, []);

  const getUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/users/current",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData(data.data);
    } catch (err: any) {
      console.log(err);

      setError(err.message || err.response.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useCurrent;
