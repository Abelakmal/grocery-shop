import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { Button } from "flowbite-react";
import React from "react";
import { FormikProps } from "formik";
import { IFormAddress } from "../types/address.type";

interface Props {
  formik: FormikProps<IFormAddress>;
  setStep: (step: number) => void;
}

const Map: React.FC<Props> = ({ formik, setStep }) => {
  const position: LatLngExpression = [
    parseInt(formik.values.latitude),
    parseInt(formik.values.longitude),
  ];

  return (
    <div>
      <MapContainer
        center={position}
        zoom={13}
        className="md:h-[500px] h-96 w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{formik.values.location}</Popup>
        </Marker>
      </MapContainer>
      <Button className="mt-4" color={"success"} onClick={() => setStep(3)}>
        Pilih Lokasi & Lengkapi Alamat
      </Button>
    </div>
  );
};

export default Map;
