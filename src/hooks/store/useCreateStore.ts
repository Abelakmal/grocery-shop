import * as Yup from "yup";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import { baseURL } from "../../helper/config";
import axiosInstance from "../../helper/axios";

const useCreateStore = (
  refreshData: CallableFunction,
  setOpenModal: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    location: Yup.string().required("Location cannot be empty"),
    longitude: Yup.string().required(),
    latitude: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      location: "",
      longitude: "",
      latitude: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { name, location, latitude, longitude } = values;

        await axiosInstance.post(baseURL + "/store-branch", {
          name,
          location,
          latitude,
          longitude,
        });

        toast.success("Successfully toasted!", { duration: 1000 });
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

export default useCreateStore;
