import axios from "axios";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const useRegister = (setStep: CallableFunction) => {
  const validationSchema = Yup.object().shape({
    fristname: Yup.string().required("Frist Name cannot be empty"),
    email: Yup.string().email().required("email cannot be empty"),
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "Password must then 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password") ?? ""], "Password must match")
      .required("Password cannot be empty"),
  });

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fristname: "",
      lastname: "",
      email: "",
      password: "",
      dob: null,
      phone: null,
      address: null,
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setLoading(true);
        const { fristname, lastname, email, password, dob, phone, address } =
          values;
        await axios.post("http://localhost:3000/api/users", {
          name: fristname + " " + lastname,
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
