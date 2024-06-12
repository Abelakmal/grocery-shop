import * as Yup from 'yup';

import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { IStock } from '@/app/type.web/stock.type';

const useFormikUpdateStock = (
  stock: IStock,
  refreshData: CallableFunction,
  setOpenModal: CallableFunction,
) => {
  const validationSchema = Yup.object().shape({
    amount: Yup.number().required('Weight cannot be empty'),
  });

  const formik = useFormik({
    initialValues: {
      amount: stock.amount || 0,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.patch('http://localhost:8000/api/stocks/' + stock.id, {
          amount: values.amount,
        });

        toast.success('Successfully toasted!', { duration: 1000 });
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

export default useFormikUpdateStock;
