import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Scanner, EntradaCheck } from "../../screens/App";
import { screen } from "../../utils";

const Stack = createNativeStackNavigator();

export function ScannerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screen.scanner.scannerQR}
        component={Scanner}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name={screen.scanner.entradaCheck}
        component={EntradaCheck}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
