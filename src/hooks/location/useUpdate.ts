import { useState } from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import axiosInstance from "../../helper/axios";
import { getAddress } from "../../redux/features/addressSlice";
import { IAddress, IFormAddress } from "../../types/address.type";
import { AppDispatch } from "../../redux/store";
import axios from "axios";
import toast from "react-hot-toast";

const useUpdate = (
  refreshData: () => void,
  data: IAddress,
  setOpenUpdate: CallableFunction
): { formik: FormikProps<IFormAddress>; loading: boolean } => {
  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Wajib Disi"),
    details: Yup.string().required("Wajib Disi"),
    recipient_name: Yup.string().required("Wajib Disi"),
    recipient_number: Yup.string().required("Wajib Disi"),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      label: data.label,
      details: data.details,
      location: data.location,
      recipient_name: data.recipient_name,
      recipient_number: data.recipient_number,
      latitude: data.latitude,
      longitude: data.longitude,
      main: data.main,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const {
          details,
          label,
          location,
          recipient_name,
          recipient_number,
          latitude,
          longitude,
        } = values;

        await axiosInstance.put(baseURL + "/address/" + data.id, {
          label,
          details,
          recipient_name,
          recipient_number,
          location,
          latitude,
          longitude,
        });

        setLoading(true);
        setOpenUpdate(false);
        dispatch(getAddress());
        refreshData()
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

export default useUpdate;
