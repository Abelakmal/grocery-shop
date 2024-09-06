import * as Yup from "yup";

import { FormikProps, useFormik } from "formik";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import toast from "react-hot-toast";
import { IFormCatgeory } from "../../types/category.type";
import axios from "axios";

const useCreateCategory = (
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
): FormikProps<IFormCatgeory> => {
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
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = new FormData();
        data.append("name", values.name);
        data.append("image", values.image);

        await axiosInstance.post(baseURL + "/category", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Successfully!", { duration: 3000 });
        setOpenModal(false);
        refreshData();
        resetForm();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.error || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });

  return formik;
};

export default useCreateCategory;
