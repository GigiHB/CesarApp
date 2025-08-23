import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { UserDetailProvider } from "../context/userDetailContext";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    SerifRegular: require("../assets/fonts/DMSerifDisplay-Regular.ttf"),
    SerifItalic: require("../assets/fonts/DMSerifDisplay-Italic.ttf"),
    Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
    SerifTextItalic: require("../assets/fonts/DMSerifText-Italic.ttf"),
    SerifText: require("../assets/fonts/DMSerifText-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <UserDetailProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </UserDetailProvider>
  );
}
