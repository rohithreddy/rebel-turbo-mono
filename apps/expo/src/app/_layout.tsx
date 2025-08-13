import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { queryClient } from "~/utils/api";

import "../styles.css";

import { QueryClientProvider } from "@tanstack/react-query";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <QueryClientProvider client={queryClient}>
      {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colorScheme == "dark" ? "#0A0A0F" : "#fb7c37",
          },
          headerTintColor: colorScheme == "dark" ? "#FAFAFA" : "#FFFFFF",
          contentStyle: {
            backgroundColor: colorScheme == "dark" ? "#0A0A0F" : "#FFFFFF",
          },
        }}
      />
      <StatusBar />
    </QueryClientProvider>
  );
}
