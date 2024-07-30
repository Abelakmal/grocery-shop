import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { Button } from "flowbite-react";

const Map = ({ nowLocation, setStep }: any) => {
  const position: LatLngExpression = [
    nowLocation.latitude,
    nowLocation.longitude,
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
          <Popup>{nowLocation.name}</Popup>
        </Marker>
      </MapContainer>
      <Button className="mt-4" color={"success"} onClick={() => setStep(3)}>Pilih Lokasi & Lengkapi Alamat</Button>
    </div>
  );
};

export default Map;
