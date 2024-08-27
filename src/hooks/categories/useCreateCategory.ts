import * as Yup from "yup";

import { useFormik } from "formik";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import toast from "react-hot-toast";

const useCreateCategory = (
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title cannot be empty"),
    image: Yup.string().required("Image cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const data = new FormData();
        data.append("name", values.name);
        data.append("image", values.image);

        await axiosInstance.post(baseURL + "/category", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Successfully!", { duration: 1000 });
        setOpenModal(false);
        refreshData();
        resetForm()
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return formik;
};

export default useCreateCategory;
