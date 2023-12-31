import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "../hooks";
import { getNavigationTheme, screen } from "../utils";
import { TabNavigation } from "./TabNavigation";

const Stack = createNativeStackNavigator();

export function AppNavigation() {
  const { theme } = useTheme();
  const MyTheme = getNavigationTheme(theme);

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen
          name={screen.app.tab}
          component={TabNavigation}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
