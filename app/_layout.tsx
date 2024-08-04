import React from "react";
import { Stack } from "expo-router";
import { UserLocationProvider } from "@/components/Index/UserLocationContext";

import { ServerStatusProvider } from "@/components/common/ServerStatusContext";
import GlobalButtons from "@/components/common/globalButtons/GlobalButtons";

export default function RootLayout() {
  return (
    <ServerStatusProvider>
      <UserLocationProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="map" options={{ headerShown: false }} />
        </Stack>
        <GlobalButtons />
      </UserLocationProvider>
    </ServerStatusProvider>
  );
}
