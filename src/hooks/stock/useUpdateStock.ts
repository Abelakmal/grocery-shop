import * as Yup from "yup";

import { FormikProps, useFormik } from "formik";
import toast from "react-hot-toast";
import { IStock } from "../../types/stock.type";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";
import axios from "axios";

const useUpdateStock = (
  stock: IStock,
  refreshData: () => void,
  setOpenModal: (open: boolean) => void
): FormikProps<{ amount: number }> => {
  const validationSchema = Yup.object().shape({
    amount: Yup.number().required("Weight cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      amount: stock.amount || 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axiosInstance.patch(baseURL + "/stock/" + stock.id, {
          amount: values.amount,
        });

        toast.success("Successfully!", { duration: 3000 });
        setOpenModal(false);
        refreshData();
        resetForm();
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

export default useUpdateStock;
