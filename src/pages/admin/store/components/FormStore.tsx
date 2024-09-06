import { Button, Spinner } from "flowbite-react";
import InputFields from "../../components/InputFields";
import React, { useEffect } from "react";
import useSearchLocation from "../../../../hooks/location/useSearchLocation";
import { ILocation } from "../../../../types/location.type";
import { FormikProps } from "formik";
import { IFormStore } from "../../../../types/store.type";

interface Props {
  formik: FormikProps<IFormStore>;
  setOpenModal: (open: boolean) => void;
}

const FormStore: React.FC<Props> = ({ formik, setOpenModal }) => {
  const { search, location, loading } = useSearchLocation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (formik.values.location) {
        search(formik.values.location);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.location]);

  const handleLocation = (
    latitude: string,
    longitude: string,
    name: string
  ) => {
    formik.setValues({
      ...formik.values,
      location: name,
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <InputFields
        label="Name"
        type="text"
        id="name"
        name="name"
        formik={formik}
      />
      <InputFields
        label="Alamat"
        type="search"
        id="location"
        name="location"
        formik={formik}
      />
      {formik.values.location && (
        <div className="z-50 border-2 h-96 overflow-y-scroll mt-2   w-full bg-white">
          {loading ? (
            <div className="w-full  h-full flex justify-center items-center">
              <Spinner aria-label="Default status example" />
            </div>
          ) : (
            <>
              {location?.map((data: ILocation, index: number) => {
                return (
                  <p
                    key={index}
                    className="hover:bg-gray-300 cursor-pointer w-full p-2"
                    onClick={() =>
                      handleLocation(
                        data.latitude.toString(),
                        data.longitude.toString(),
                        data.name as string
                      )
                    }
                  >
                    {data.name}
                  </p>
                );
              })}
            </>
          )}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Button type="submit" color="success" className="mr-4">
          Submit
        </Button>
        <Button type="button" color="gray" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default FormStore;
