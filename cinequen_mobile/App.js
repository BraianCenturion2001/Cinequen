import { ThemeProvider, AuthProvider } from "./src/context";
import { RootNavigation } from "./src/navigation";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootNavigation />
      </AuthProvider>
    </ThemeProvider>
  );
}
