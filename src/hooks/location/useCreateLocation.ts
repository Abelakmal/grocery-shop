import { useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../helper/config";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../../types/user.type";
import axiosInstance from "../../helper/axios";
import { getAddress } from "../../redux/features/addressSlice";
import { AppDispatch, RootState } from "../../redux/store";
import axios from "axios";
import toast from "react-hot-toast";
import { IFormAddress } from "../../types/address.type";

const useCreateLocation = (
  refreshData: () => void,
  setOpenAddLocation: CallableFunction,
  setStep: CallableFunction
): { formik: FormikProps<IFormAddress>; loading: boolean } => {
  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Wajib Disi"),
    details: Yup.string().required("Wajib Disi"),
    recipient_name: Yup.string().required("Wajib Disi"),
    recipient_number: Yup.string().required("Wajib Disi"),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user.user as IUser);

  const formik = useFormik({
    initialValues: {
      label: "",
      details: "",
      location: "",
      recipient_name: user.name,
      recipient_number: user.phone,
      longitude: "",
      latitude: "",
      main: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const {
          details,
          label,
          recipient_name,
          recipient_number,
          main,
          latitude,
          longitude,
          location,
        } = values;

        await axiosInstance.post(baseURL + "/address", {
          label,
          details,
          location,
          recipient_name,
          recipient_number,
          main,
          longitude,
          latitude,
        });

        setLoading(true);
        setOpenAddLocation(false);
        refreshData();
        dispatch(getAddress());
        setStep(1);
      } catch (error) {
        console.error("Error Register:", error);
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

export default useCreateLocation;
