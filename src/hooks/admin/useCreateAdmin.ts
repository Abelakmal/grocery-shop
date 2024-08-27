import * as Yup from "yup";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";

const useCreateAdmin = (
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    email: Yup.string().required("email cannot be empty").email(),
    password: Yup.string().required("Password cannot be empty"),
    storeId: Yup.string().required("Store cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      storeId: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axiosInstance.post(baseURL + "/admin", {
          name: values.name,
          email: values.email,
          password: values.password,
          storeId: parseInt(values.storeId,0),
        });

        toast.success("Successfully toasted!", { duration: 1000 });
        setOpenModal(false);
        refreshData();
      } catch (error: any) {
        console.log(error);

        toast.error(error.response.data.message);
      }
    },
  });

  return formik;
};

export default useCreateAdmin;
