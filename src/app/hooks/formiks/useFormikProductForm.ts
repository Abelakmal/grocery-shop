import * as Yup from 'yup';

import { useFormik } from 'formik';
import { IProduct } from '@/app/type.web/product.type';
import axios from 'axios';
import toast from 'react-hot-toast';

const useFormikProductForm = (
  product: any,
  router: string,
  refreshData: CallableFunction,
  method: string,
  setOpenModal: CallableFunction,
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Title cannot be empty'),
    weight: Yup.number().required('Weight cannot be empty'),
    description: Yup.string().required('Description cannot be empty'),
    price: Yup.number().required('Price cannot be empty'),
    unitWeight: Yup.string().required('Unit cannot be empty'),
    image: Yup.string().required('Image cannot be empty'),
    categoryId: Yup.number().required('Category cannot be empty'),
  });

  const formik = useFormik({
    initialValues: {
      name: product.name || '',
      description: product.description || '',
      weight: product.weight || 0,
      unitWeight: product.unitWeight || 'GRAM',
      image: product.image,
      price: product.price || 0,
      categoryId: product?.categoryId || 1,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = new FormData();
        data.append('name', values.name);
        data.append('price', String(values.price));
        data.append('description', values.description);
        data.append('weight', String(values.weight));
        data.append('unitWeight', values.unitWeight);
        data.append('categoryId', String(values.categoryId));
        data.append('image', values.image);

        const result =
          method === 'put'
            ? await axios.put(
                process.env.NEXT_PUBLIC_BASE_API_URL + router,
                data,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              )
            : await axios.post(
                process.env.NEXT_PUBLIC_BASE_API_URL + router,
                data,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                },
              );

        toast.success('Successfully toasted!', { duration: 1000 });
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

export default useFormikProductForm;
