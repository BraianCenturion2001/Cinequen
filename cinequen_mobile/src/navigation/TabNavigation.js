import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import { screen } from "../utils";
import { HomeStack, FuncionesStack, ScannerStack } from "./stacks";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#fff",
        tabBarStyle: { backgroundColor: "#252525", borderTopWidth: 0 },
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
          tabBarLabelStyle: {
            display: "none",
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={screen.funciones.tab}
        component={FuncionesStack}
        options={{ title: "Ver Funciones", headerShown: false }}
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
