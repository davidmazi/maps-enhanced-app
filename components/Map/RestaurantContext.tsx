import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UserLocation } from "../Index/UserLocationContext";

export type Restaurant = {
  name: string;
  photoUrl: string | null;
  rating: number | null;
  address: string;
  type: string;
  latitude: number;
  longitude: number;
};

interface RestaurantContextType {
  currentRestaurant: Restaurant | null;
  setCurrentRestaurant: React.Dispatch<React.SetStateAction<Restaurant | null>>;
  restaurants: Restaurant[];
  setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>;
  fetchRestaurants: (latitude: string, longitude: string) => void;
  isSpinning: boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined,
);

type RestaurantProviderProps = {
  children: ReactNode;
};

export function RestaurantProvider({ children }: RestaurantProviderProps) {
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(
    null,
  );
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [paramsToFetch, setParamsToFetch] = useState<Partial<UserLocation>>({});

  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (
      restaurants.length > 0 &&
      (!restaurants.find((rest) => rest.name === currentRestaurant?.name)
        ?.name ||
        !currentRestaurant)
    )
      setCurrentRestaurant(restaurants[0]);
  }, [restaurants, currentRestaurant]);

  const fetchRestaurants = useCallback(
    (latitude: string, longitude: string) => {
      setShouldFetch(true);
      setParamsToFetch({ latitude: +latitude, longitude: +longitude });
    },
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (isFetchingRef.current || !shouldFetch) {
        return;
      }

      isFetchingRef.current = true;
      setIsSpinning(true);

      try {
        const response = await axios.get(
          "http://192.168.1.13:3000/restaurants",
          // "https://maps-enhanced-api.onrender.com/restaurants",
          {
            params: paramsToFetch,
            timeout: 5000,
          },
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsSpinning(false);
        isFetchingRef.current = false;
        setShouldFetch(false);
      }
    };

    fetchData();
  }, [shouldFetch]);

  const contextValue = useMemo(
    () => ({
      currentRestaurant,
      setCurrentRestaurant,
      restaurants,
      setRestaurants,
      fetchRestaurants,
      isSpinning,
    }),
    [currentRestaurant, restaurants, fetchRestaurants, isSpinning],
  );

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurantContext = () => {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error(
      "useRestaurantContext must be used within a RestaurantProvider",
    );
  }
  return context;
};
