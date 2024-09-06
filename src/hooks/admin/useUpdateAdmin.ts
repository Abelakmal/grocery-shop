import * as Yup from "yup";

import { FormikProps, useFormik } from "formik";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import { IAdmin, IFormAdmin } from "../../types/admin.type";
import axios from "axios";

const useUpdateAdmin = (
  admin: IAdmin,
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
): FormikProps<IFormAdmin> => {
  console.log(admin);
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    email: Yup.string().required("email cannot be empty").email(),
    storeId: Yup.number().required("Store cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: admin.name,
      email: admin.email,
      password: "",
      storeId: admin.storeId || 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance.put(baseURL + "/admin/" + admin.id, {
          name: values.name,
          email: values.email,
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

export default useUpdateAdmin;
