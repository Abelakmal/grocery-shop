import { useState } from "react";
import { useFormik } from "formik";
import { axiosInstance } from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/features/userSlice";

const useChangeImg = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

  const formik = useFormik({
    initialValues: {
      image: "",
      preview: "",
    },
    onSubmit: async (values, { setErrors }) => {
      try {
        setLoading(true);
        const { image } = values;

        const data = new FormData();

        data.append("image", image);

        await axiosInstance.patch(`${baseURL}/users/img`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(fetchCurrentUser());
      } catch (error: any) {
        if (error.response.data.error) {
          setErrors({
            image: error.response.data.error,
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, loading };
};

export default useChangeImg;
