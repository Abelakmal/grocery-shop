import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IUser } from "../../types/user.type";
import { axiosInstance } from "../../helper/axios";
import { baseURL } from "../../helper/config";

const useUpdate = (
  data: IUser,
  setOpenChangeBio: CallableFunction,
  getUser: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name cannot be empty"),
    email: Yup.string().email().required("email cannot be empty"),
    phone: Yup.string()
      .matches(/^\+?([ -]?\d+)+|\(\d+\)([ -]\d+)$/, "Number phone is not valid")
      .optional(),
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      name: data.name || undefined,
      email: data.email || undefined,
      dob: data.dob,
      phone: data.phone,
      address: data.address || undefined,
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setLoading(true);
        const { name, email, dob, phone, address } = values;

        await axiosInstance.patch(
          `${baseURL}/users`,
          {
            name,
            email,
            dob: new Date(dob),
            phone,
            address,
          }
        );
        getUser();
        setOpenChangeBio(false);
      } catch (error: any) {
        console.error("Error Register:", error);
        if (error.response.data.error) {
          setErrors({
            email: error.response.data.error,
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, loading };
};

export default useUpdate;
