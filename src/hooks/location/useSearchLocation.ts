import axios from "axios";
import { useCallback, useState } from "react";
import { ILocation } from "../../types/location.type";

const useSearchLocation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [location, setLocation] = useState<ILocation[]>();

  const search = useCallback (async (locationName: string) => {
    setLoading(true);
    setError(null);

    try {
        const { data } = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            locationName.replaceAll(" ", "-")
          )}&format=json&addressdetails=1`
        );
        const result: ILocation[] = [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((data: any) => {
          result.push({
            name: data.display_name,
            city: data.address.city,
            latitude: data.lat,
            longitude: data.lon,
          });
        });

        setLocation(result);
        setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "An error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
  }, []);

  return { search, location, loading, error };
};

export default useSearchLocation;
