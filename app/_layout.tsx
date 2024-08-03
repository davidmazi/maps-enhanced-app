import React from "react";
import { Stack } from "expo-router";
import { UserLocationProvider } from "@/components/Index/UserLocationContext";

import ServerStatus from "@/components/common/ServerStatus";
import { ServerStatusProvider } from "@/components/common/ServerStatusContext";

export default function RootLayout() {
  return (
    <ServerStatusProvider>
      <UserLocationProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="map" options={{ headerShown: false }} />
        </Stack>
        <ServerStatus />
      </UserLocationProvider>
    </ServerStatusProvider>
  );
}
