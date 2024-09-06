import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const useDetailLocation = () => {
  const [loading, setLoading] = useState(false);

  const detail = async (latitude: number, longitude: number) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );

      return data;
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return { detail, loading };
};

export default useDetailLocation;
