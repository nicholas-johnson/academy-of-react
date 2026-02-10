import { LanguageProvider } from "./context/LanguageContext";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import { WelcomeMessage } from "./components/WelcomeMessage";
import { SpellList } from "./components/SpellList";
import "./App.css";

function App() {
  return (
    <LanguageProvider>
      <div className="app">
        <Header />
        <Navigation />
        <main className="main-content">
          <WelcomeMessage />
          <SpellList />
        </main>
        <div className="info-box">
          <h3>🌐 Language Context Pattern</h3>
          <ul>
            <li>
              Translation function <code>t(key)</code> available globally
            </li>
            <li>Language switch updates all components instantly</li>
            <li>No props needed - components access translations directly</li>
            <li>Easy to add new languages or translations</li>
          </ul>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
