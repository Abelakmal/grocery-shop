import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { BiTargetLock } from "react-icons/bi";
import useSearchLocation from "../hooks/location/useSearchLocation";
import { ILocation } from "../types/location.type";
import { Spinner } from "flowbite-react";
import useDetailLocation from "../hooks/location/useDetailLocation";
import { FormikProps } from "formik";
import { IFormAddress } from "../types/address.type";

interface Props {
  formik: FormikProps<IFormAddress>;
  setStep: (step: number) => void;
}

const Koordinat: React.FC<Props> = ({ formik, setStep }) => {
  const [searchParam, setSearchParam] = useState<string>("");
  const { search, location, loading } = useSearchLocation();
  const { detail } = useDetailLocation();
  const [loadingNowLoc, setLoadingNowLoc] = useState(false);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const handleGetNowLocation = async (
    latitude: number,
    longitude: number,
    name: string = ""
  ) => {
    setLoadingNowLoc(true);
    setTimeout(async () => {
      if (!name) {
        const result = await detail(latitude, longitude);
        name = result?.display_name;
      }

      formik.setFieldValue("location", name);
      formik.setFieldValue("latitude", latitude.toString());
      formik.setFieldValue("longitude", longitude.toString());

      setLoadingNowLoc(false);
      setStep(2);
    }, 1000);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchParam) {
        search(searchParam);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam]);

  return (
    <>
      <div className="relative">
        <form className="">
          <div className="flex flex-col">
            <label>Ketik Lokasi Tujuan Mu</label>
            <input
              type="search"
              onChange={(e) => setSearchParam(e.target.value)}
            />
          </div>
        </form>
        {searchParam && (
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
                        handleGetNowLocation(
                          data.latitude,
                          data.longitude,
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
      </div>
      {coords && (
        <div className="flex items-center">
          <button
            className="border-2 flex items-center text-lg p-2 m-4"
            onClick={() =>
              handleGetNowLocation(coords?.latitude, coords?.longitude)
            }
          >
            {loadingNowLoc ? (
              <Spinner aria-label="Default status example" />
            ) : (
              <>
                <BiTargetLock className="mr-2" /> Gunakan lokasi sekarang
              </>
            )}
          </button>
        </div>
      )}
      <div>
        {!isGeolocationAvailable && (
          <div className="text-red-500">
            Your browser does not support Geolocation
          </div>
        )}
        {!isGeolocationEnabled && (
          <div className="text-red-500 font-semibold">
            Geolocation is not enabled
          </div>
        )}
      </div>
    </>
  );
};

export default Koordinat;
