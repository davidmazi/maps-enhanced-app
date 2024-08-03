import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
import axios from "axios";

interface ServerStatusContextType {
  serverOnline: boolean | undefined;
  isChecking: boolean;
  checkServerStatus: () => Promise<void>;
}

const ServerStatusContext = createContext<ServerStatusContextType | undefined>(
  undefined,
);

export function ServerStatusProvider({ children }: React.PropsWithChildren) {
  const [serverOnline, setServerOnline] = useState<boolean>();
  const [isChecking, setIsChecking] = useState(false);

  const checkServerStatus = useCallback(async () => {
    setIsChecking(true);
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!apiUrl) {
      console.error("Missing API URL env variable");
      return;
    }
    try {
      await axios.get(`${apiUrl}/restaurants`, {
        timeout: 10000,
      });
      setServerOnline(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ERR_BAD_REQUEST") setServerOnline(true);
        else setServerOnline(false);
      }
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkServerStatus();
  }, [checkServerStatus]);

  const value = useMemo(
    () => ({
      serverOnline,
      isChecking,
      checkServerStatus,
    }),
    [serverOnline, isChecking, checkServerStatus],
  );

  return (
    <ServerStatusContext.Provider value={value}>
      {children}
    </ServerStatusContext.Provider>
  );
}

export const useServerStatus = () => {
  const context = useContext(ServerStatusContext);
  if (context === undefined) {
    throw new Error(
      "useServerStatus must be used within a ServerStatusProvider",
    );
  }
  return context;
};
