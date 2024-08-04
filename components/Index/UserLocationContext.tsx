import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Location from "expo-location";

// Types
export type UserLocation = {
  latitude: number;
  longitude: number;
};

interface UserLocationContextType {
  userLocation: UserLocation | null;
  setUserLocation: React.Dispatch<React.SetStateAction<UserLocation | null>>;
}

// Context
const UserLocationContext = createContext<UserLocationContextType | undefined>(
  undefined,
);

// Provider
type UserLocationProviderProps = {
  children: ReactNode;
};

export function UserLocationProvider({ children }: UserLocationProviderProps) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Update every 10 seconds
          distanceInterval: 10, // Or every 10 meters
        },
        (location) => {
          setUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        },
      );
    })();

    // Cleanup function to remove the subscription when the component unmounts
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  const contextValue = useMemo(
    () => ({
      userLocation,
      setUserLocation,
    }),
    [userLocation],
  );

  return (
    <UserLocationContext.Provider value={contextValue}>
      {children}
    </UserLocationContext.Provider>
  );
}

// Hook
export const useUserLocationContext = () => {
  const context = useContext(UserLocationContext);
  if (context === undefined) {
    throw new Error(
      "useUserLocationContext must be used within a UserLocationProvider",
    );
  }
  return context;
};
