import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../helper/config";
import { useSelector } from "react-redux";
import { IUser } from "../../types/user.type";

const useCreateLocation = (
  latitude: number,
  longitude: number,
  setOpenAddLocation: CallableFunction,
  setStep: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    label_alamat: Yup.string().required("Wajib Disi"),
    detail_alamat: Yup.string().required("Wajib Disi"),
    nama_penerima: Yup.string().required("Wajib Disi"),
    nomor_penerima: Yup.string().required("Wajib Disi"),
  });

  const [loading, setLoading] = useState(false);

  const user = useSelector((state: any) => state.user.user as IUser);

  const formik = useFormik({
    initialValues: {
      label_alamat: "",
      detail_alamat: "",
      nama_penerima: user.name,
      nomor_penerima: user.phone,
      error: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        setLoading(true);
        setOpenAddLocation(false);
        setStep(1);
      } catch (error: any) {
        console.error("Error Register:", error);
        if (error.response.data.error) {
          setErrors({
            error: error.response.data.error,
          });
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return { formik, loading };
};

export default useCreateLocation;
