import { Button, Spinner } from "flowbite-react";
import InputFields from "../../components/InputFields";
import { useEffect } from "react";
import useSearchLocation from "../../../../hooks/location/useSearchLocation";
import { ILocation } from "../../../../types/location.type";

const FormStore = ({ formik, setOpenModal }: any) => {
  const { search, location, loading } = useSearchLocation();

  useEffect(() => {
    if (formik.values.location) {
      search(formik.values.location);
    }
  }, [formik.values.location]);

  const handleLocation = (
    latitude: string,
    longitude: string,
    name: string | undefined
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
                        data.name
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
