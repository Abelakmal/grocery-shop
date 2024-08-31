import * as Yup from "yup";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";

const useCreateProduct = (
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title cannot be empty"),
    weight: Yup.string().required("Weight cannot be empty"),
    description: Yup.string().required("Description cannot be empty"),
    price: Yup.string().required("Price cannot be empty"),
    image: Yup.string().required("Image cannot be empty"),
    categoryId: Yup.string().required("Category cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      weight: "",
      unitWeight: "",
      image: "",
      price: "",
      categoryId: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = new FormData();
        data.append("name", values.name);
        data.append("price", values.price.replaceAll(".", ""));
        data.append("description", values.description);
        data.append("weight", values.weight.toString());
        data.append("unitWeight", values.unitWeight || "GRAM");
        data.append("categoryId", values.categoryId.toString());
        data.append("image", values.image);

        await axiosInstance.post(baseURL + "/product", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Successfully!", { duration: 3000 });
        setOpenModal(false);
        refreshData();
        resetForm();
      } catch (error: any) {
        toast.error(error.response.data.message || error.response.data);
      }
    },
  });

  return formik;
};

export default useCreateProduct;
