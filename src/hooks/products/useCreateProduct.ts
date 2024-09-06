import * as Yup from "yup";

import { useFormik, FormikProps } from "formik";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import axios from "axios";
import { IFormProduct} from "../../types/product.type";

const useCreateProduct = (
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
): FormikProps<IFormProduct> => {
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
      weight: 0,
      unitWeight: "",
      image: "",
      price: "",
      categoryId: 0,
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

export default useCreateProduct;
