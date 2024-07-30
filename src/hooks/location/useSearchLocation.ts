import axios from "axios";
import { useState } from "react";
import { ILocation } from "../../types/location.type";

const useSearchLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState<ILocation[]>();

  const search = async (locationName: string) => {
    setLoading(true);
    setError(null);

    try {
      setTimeout(async () => {
        const { data } = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            locationName.replaceAll(" ", "-")
          )}&format=json&addressdetails=1`
        );
        const result: ILocation[] = [];
        data.forEach((data: any) => {
          result.push({
            name: data.display_name,
            latitude: data.lat,
            longitude: data.lon,
          });
        });

        setLocation(result);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      console.log(err);

      setError(err.response.data?.error || "Server Error");
    }
  };

  return { search, location, loading, error };
};

export default useSearchLocation;
