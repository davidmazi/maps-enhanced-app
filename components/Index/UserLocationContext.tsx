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
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
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
