import * as Yup from 'yup';

import { useFormik } from 'formik';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ICategory } from '@/app/type.web/category.type';

const useFormikCategoryForm = (
  category: any,
  router: string,
  refreshData: CallableFunction,
  method: string,
  setOpenModal: CallableFunction,
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Title cannot be empty'),
    image: Yup.string().required('Image cannot be empty'),
  });

  const formik = useFormik({
    initialValues: {
      name: category?.name || '',
      image: category?.image,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = new FormData();
        data.append('name', values.name);
        data.append('image', values.image);

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

        toast.success('Successfully!', { duration: 1000 });
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

export default useFormikCategoryForm;
