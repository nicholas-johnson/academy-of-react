import { ThemeProvider } from "./context/ThemeContext";
import { Header } from "./components/Header";
import { Content } from "./components/Content";
import { Footer } from "./components/Footer";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <Content />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
