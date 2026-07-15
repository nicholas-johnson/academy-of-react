import "./App.css";
import { Header } from "./Header";
import { Profile } from "./Profile";
import { UserForm } from "./UserForm";

import { useTheme } from "./ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "white" : "black",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <Header />
      <Profile />
      <UserForm />
    </div>
  );
}

export default App;
