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

import { useRouter } from "expo-router";
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
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [paramsToFetch, setParamsToFetch] = useState<Partial<UserLocation>>({});

  const isFetchingRef = useRef(false);
  const router = useRouter();

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

  const fetchRestaurantsData = useCallback(
    async (params: Partial<UserLocation>, retryCount = 0) => {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;

      if (!apiUrl) {
        console.error(`Missing API URL env variable`);
        return [];
      }

      try {
        console.debug(
          "🚀\x1b[35m ~ file: RestaurantContext.tsx ~ fetchRestaurantsData ~ params\x1b[0m",
          params,
        );
        const response = await axios.get(`${apiUrl}/restaurants`, {
          params,
          timeout: 5000,
        });

        if (response.data.length === 0 && retryCount === 0) {
          console.debug("Empty response, retrying...");
          return await fetchRestaurantsData(params, 1);
        }
        if (response.data.length === 0 && retryCount > 0) {
          console.debug("Empty response again, returing home");
          router.navigate("/");
          return [];
        }
        return response.data;
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        if (retryCount === 0) {
          return fetchRestaurantsData(params, 1);
        }
        router.navigate("/");
        return [];
      }
    },
    [router],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (isFetchingRef.current || !shouldFetch) {
        return;
      }

      isFetchingRef.current = true;
      setIsSpinning(true);

      try {
        const restaurantsData = await fetchRestaurantsData(paramsToFetch);
        setRestaurants(restaurantsData);
      } catch (e) {
        console.error("Error while fetching or setting restaurants", e as any);
      } finally {
        setIsSpinning(false);
        isFetchingRef.current = false;
        setShouldFetch(false);
      }
    };

    fetchData();
  }, [fetchRestaurantsData, paramsToFetch, shouldFetch]);

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
