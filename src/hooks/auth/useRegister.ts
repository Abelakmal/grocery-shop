import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../helper/config";

const useRegister = (setStep: CallableFunction) => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Frist Name cannot be empty"),
    email: Yup.string().email().required("email cannot be empty"),
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "Password must then 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password") ?? ""], "Password must match")
      .required("Password cannot be empty"),
    isAgree: Yup.boolean().required().oneOf(
      [true],
      "Anda harus menyetujui untuk melanjutkan."
    ),
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

export default useRegister;
