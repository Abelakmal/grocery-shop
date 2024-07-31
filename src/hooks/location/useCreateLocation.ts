import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../helper/config";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../types/user.type";
import axiosInstance from "../../helper/axios";
import { getAddress } from "../../redux/features/addressSlice";

const useCreateLocation = (
  latitude: number,
  longitude: number,
  setOpenAddLocation: CallableFunction,
  setStep: CallableFunction
) => {
  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Wajib Disi"),
    details: Yup.string().required("Wajib Disi"),
    recipient_name: Yup.string().required("Wajib Disi"),
    recipient_number: Yup.string().required("Wajib Disi"),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

  const user = useSelector((state: any) => state.user.user as IUser);

  const formik = useFormik({
    initialValues: {
      label: "",
      details: "",
      recipient_name: user.name,
      recipient_number: user.phone,
      main: 0,
      error: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const {
          details,
          label,
          recipient_name,
          recipient_number,
          main,
        } = values;

        await axiosInstance.post(baseURL + "/address", {
          label,
          details,
          recipient_name,
          recipient_number,
          main,
          longitude: longitude.toString(),
          latitude: latitude.toString(),
        });

        setLoading(true);
        setOpenAddLocation(false);
        dispatch(getAddress());
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