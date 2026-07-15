import { useUser } from "./UserContext";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const { user } = useUser();

  return (
    <header style={{ backgroundColor: "lightblue", padding: "10px" }}>
      Name: {user.name}
      <ThemeToggle />
    </header>
  );
};
