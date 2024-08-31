import { useState } from "react";
import { useFormik } from "formik";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../redux/features/userSlice";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useUpdatePassword = (token: string) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("password cannot be empty")
      .min(8, "Password must then 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password") ?? ""], "Password must match")
      .required("Password cannot be empty"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const { password } = values;

        await axios.patch(
          `${baseURL}/users/resetPassword`,
          {
            password,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success("Successfully!", { duration: 3000 });
        navigate("/signin")
        dispatch(fetchCurrentUser());
      } catch (error: any) {
        throw error;
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, loading };
};

export default useUpdatePassword;
