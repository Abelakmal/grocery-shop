import axios, { AxiosError } from "axios";
import { useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../helper/config";
import { IFormRegister } from "../../types/user.type";

const useRegister = (
  setStep: CallableFunction
): { formik: FormikProps<IFormRegister>; loading: boolean } => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Frist Name cannot be empty"),
    email: Yup.string().email().required("email cannot be empty"),
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "Password must then 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password") ?? ""], "Password must match")
      .required("Password cannot be empty"),
    isAgree: Yup.boolean()
      .required()
      .oneOf([true], "Anda harus menyetujui untuk melanjutkan."),
  });

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      isAgree: false,
      dob: "",
      phone: "",
      address: "",
      confirmPassword: "",
      error: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setLoading(true);
        const { firstname, lastname, email, password, dob, phone, address } =
          values;
        await axios.post(`${baseURL}/users`, {
          name: firstname + " " + lastname,
          email,
          password,
          dob,
          phone,
          address,
        });
        setStep(3);
      } catch (error) {
        console.error("Error Register:", error);
        if (error instanceof AxiosError) {
          setErrors({
            error: error.response?.data.error,
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, loading };
};

export default useRegister;
