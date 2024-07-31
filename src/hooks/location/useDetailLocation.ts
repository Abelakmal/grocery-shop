import { useState } from "react";
import axios from "axios";

const useDetailLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detail = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      return data;
      setLoading(false);
    } catch (err: any) {
      setError(err.response.data?.error || "Server Error");
    }
  };

  return { detail, loading, error };
};

export default useDetailLocation;
