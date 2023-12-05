import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import { HomeStack, FuncionesStack, ScannerStack } from "./stacks";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={screen.home.tab}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#940000",
        tabBarStyle: {
          backgroundColor: "#440000",
          borderTopWidth: 0,
          height: 60,
        },
        tabBarIcon: (props) => tabIcon({ route, ...props }),
      })}
    >
      <Tab.Screen
        name={screen.scanner.tab}
        component={ScannerStack}
        options={{ title: "Scanner QR", headerShown: false }}
      />
      <Tab.Screen
        name={screen.home.tab}
        component={HomeStack}
        options={{
          title: "Inicio",
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function tabIcon(props) {
  const { route, size, color, focused } = props;

  let iconName = "plus";

  if (route.name === screen.home.tab) {
    iconName = focused ? "home" : "home-outline";
  }

  if (route.name === screen.scanner.tab) {
    iconName = "qrcode-scan";
  }

  if (route.name === screen.funciones.tab) {
    iconName = "movie-roll";
  }
  return (
    <Icon type="material-community" name={iconName} size={size} color={color} />
  );
}
