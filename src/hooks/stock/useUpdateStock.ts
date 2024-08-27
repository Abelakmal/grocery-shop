import * as Yup from "yup";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { IStock } from "../../types/stock.type";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";

const useUpdateStock = (
  stock: IStock,
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
) => {
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

        toast.success("Successfully toasted!", { duration: 1000 });
        setOpenModal(false);
        refreshData();
        resetForm();
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    },
  });

  return formik;
};

export default useUpdateStock;
