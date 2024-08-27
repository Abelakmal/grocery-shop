import * as Yup from "yup";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import { IProduct } from "../../types/product.type";

const useUpdateProduct = (
  product : IProduct,
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Title cannot be empty"),
    weight: Yup.string().required("Weight cannot be empty"),
    description: Yup.string().required("Description cannot be empty"),
    price: Yup.string().required("Price cannot be empty"),
    unitWeight: Yup.string().required("Unit cannot be empty"),
    image: Yup.string().required("Image cannot be empty"),
    categoryId: Yup.string().required("Category cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      weight: product.weight,
      unitWeight: product.unitWeight,
      image: product.image,
      price: product.price,
      categoryId: product.categoryId,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = new FormData();
        data.append("name", values.name);
        data.append("price", values.price.toString());
        data.append("description", values.description);
        data.append("weight", values.weight.toString());
        data.append("unitWeight", values.unitWeight);
        data.append("categoryId", values.categoryId.toString());
        data.append("image", values.image);

        await axiosInstance.put(baseURL + "/product/" + product.id, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Successfully toasted!", { duration: 1000 });
        setOpenModal(false);
        refreshData();
      } catch (error: any) {
        toast.error(error.response.data.message || error.response.data);
      }
    },
  });

  return formik;
};

export default useUpdateProduct;
