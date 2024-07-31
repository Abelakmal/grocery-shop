import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseURL } from "../../helper/config";
import { useDispatch } from "react-redux";
import axiosInstance from "../../helper/axios";
import { getAddress } from "../../redux/features/addressSlice";
import { IAddress } from "../../types/address.type";

const useUpdate = (data: IAddress, setOpenUpdate: CallableFunction) => {
  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Wajib Disi"),
    details: Yup.string().required("Wajib Disi"),
    recipient_name: Yup.string().required("Wajib Disi"),
    recipient_number: Yup.string().required("Wajib Disi"),
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<any>();

  const formik = useFormik({
    initialValues: {
      id: data.id,
      label: data.label,
      details: data.details,
      recipient_name: data.recipient_name,
      recipient_number: data.recipient_number,
      latitude: data.latitude,
      longitude: data.longitude,
      error: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const {
          id,
          details,
          label,
          recipient_name,
          recipient_number,
          latitude,
          longitude,
        } = values;

        await axiosInstance.put(baseURL + "/address/" + id, {
          label,
          details,
          recipient_name,
          recipient_number,
          latitude,
          longitude,
        });

        setLoading(true);
        setOpenUpdate(false);
        dispatch(getAddress());
      } catch (error: any) {
        console.error("Error :", error);
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

export default useUpdate;
