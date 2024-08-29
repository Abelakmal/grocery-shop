import * as Yup from "yup";

import { useFormik } from "formik";
import axiosInstance from "../../helper/axios";
import { baseURL } from "../../helper/config";
import toast from "react-hot-toast";
import { ICategory } from "../../types/category.type";

const useUpdateCategory = (
  category: ICategory,
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title cannot be empty"),
    image: Yup.string().required("Image cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: category.name,
      image: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        let data;

        if (values.image) {
          data = new FormData();
          data.append("name", values.name);
          data.append("image", values.image);
        } else {
          data = {
            name: values.name,
          };
        }

        await axiosInstance.put(baseURL + "/category/" + category.id, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Successfully!", { duration: 3000 });
        setOpenModal(false);
        refreshData();
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return formik;
};

export default useUpdateCategory;
