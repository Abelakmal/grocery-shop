import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUser } from "../../types/user.type";
import { axiosInstance } from "../../helper/axios";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/features/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { AppDispatch } from "../../redux/store";

const useUpdate = (user: IUser, setOpenChangeBio: CallableFunction) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    email: Yup.string().email().required("email cannot be empty"),
    phone: Yup.string()
      .matches(/^\+?([ -]?\d+)+|\(\d+\)([ -]\d+)$/, "Number phone is not valid")
      .optional(),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      name: user.name || undefined,
      email: user.email || undefined,
      dob: user.dob,
      phone: user.phone,
      address: user.address || undefined,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const { name, email, dob, phone, address } = values;

        await axiosInstance.patch(`${baseURL}/users`, {
          name,
          email,
          dob: new Date(dob),
          phone,
          address,
        });
        dispatch(fetchCurrentUser());
        setOpenChangeBio(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.error || "An error occurred");
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, loading };
};

export default useUpdate;
