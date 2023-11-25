import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export function TabNavigation() {
  return (
    <Tab>
      <Tab.Screen></Tab.Screen>
    </Tab>
  );
}
