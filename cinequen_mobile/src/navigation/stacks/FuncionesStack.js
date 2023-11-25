import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Funciones, FuncionDetalle } from "../../screens/App";
import { screen } from "../../utils";

const Stack = createNativeStackNavigator();

export function FuncionesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.funciones.funciones}
        component={Funciones}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name={screen.funciones.funcionDetalle}
        component={FuncionDetalle}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
