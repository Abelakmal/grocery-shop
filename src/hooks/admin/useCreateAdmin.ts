import * as Yup from "yup";

import { FormikProps, useFormik } from "formik";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import axios from "axios";
import { IFormAdmin } from "../../types/admin.type";

const useCreateAdmin = (
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
): FormikProps<IFormAdmin> => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    email: Yup.string().required("email cannot be empty").email(),
    password: Yup.string().required("Password cannot be empty"),
    storeId: Yup.number().required("Store cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      storeId: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance.post(baseURL + "/admin", {
          name: values.name,
          email: values.email,
          password: values.password,
          storeId: values.storeId,
        });

        toast.success("Successfully!", { duration: 3000 });
        setOpenModal(false);
        refreshData();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

  return formik;
};

export default useCreateAdmin;
