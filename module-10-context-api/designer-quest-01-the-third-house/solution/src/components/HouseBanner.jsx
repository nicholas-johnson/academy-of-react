import { useTheme } from "../context/ThemeContext.jsx";
import "./HouseBanner.css";

function HouseBanner() {
  const { theme } = useTheme();

  return (
    <div
      className="house-banner"
      style={{ borderColor: theme.colors.primary }}
    >
      <span className="house-banner-crest">⚔️</span>
      <span className="house-banner-text">House {theme.name}</span>
    </div>
  );
}

export default HouseBanner;
