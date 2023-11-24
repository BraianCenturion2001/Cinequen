import { ThemeProvider } from "./src/context";
import { RootNavigation } from "./src/navigation";

export default function App() {
  return (
    <ThemeProvider>
      <RootNavigation />
    </ThemeProvider>
  );
}
