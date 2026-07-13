// CSS Modules imports
import { Button as CSSButton } from "./components/CSSModules/Button/Button";
import { TabBar as CSSTabBar } from "./components/CSSModules/TabBar/TabBar";
import { Tab as CSSTab } from "./components/CSSModules/Tab/Tab";

// Plain CSS imports
import { Button as PlainButton } from "./components/PlainCSS/Button/Button";
import { TabBar as PlainTabBar } from "./components/PlainCSS/TabBar/TabBar";
import { Tab as PlainTab } from "./components/PlainCSS/Tab/Tab";

// Styled Components imports
import { Button as SCButton } from "./components/StyledComponents/Button/Button";
import { TabBar as SCTabBar } from "./components/StyledComponents/TabBar/TabBar";
import { Tab as SCTab } from "./components/StyledComponents/Tab/Tab";

// Tailwind imports
import { Button as TWButton } from "./components/Tailwind/Button";
import { TabBar as TWTabBar } from "./components/Tailwind/TabBar";
import { Tab as TWTab } from "./components/Tailwind/Tab";

function App() {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      {/* Plain CSS Demo */}
      <div style={{ marginBottom: "3rem" }}>
        <h1>Plain CSS</h1>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <PlainButton variant="primary">Primary</PlainButton>
          <PlainButton variant="secondary">Secondary</PlainButton>
        </div>

        <PlainTabBar>
          <PlainTab value="Profile" activeTab="Profile" onTabChange={() => {}}>
            Profile
          </PlainTab>
          <PlainTab value="Settings" activeTab="Profile" onTabChange={() => {}}>
            Settings
          </PlainTab>
          <PlainTab value="Messages" activeTab="Profile" onTabChange={() => {}}>
            Messages
          </PlainTab>
          <PlainTab value="History" activeTab="Profile" onTabChange={() => {}}>
            History
          </PlainTab>
        </PlainTabBar>
      </div>

      {/* CSS Modules Demo */}
      <div style={{ marginBottom: "3rem" }}>
        <h1>CSS Modules</h1>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <CSSButton variant="primary">Primary</CSSButton>
          <CSSButton variant="secondary">Secondary</CSSButton>
        </div>

        <CSSTabBar>
          <CSSTab value="Profile" activeTab="Profile" onTabChange={() => {}}>
            Profile
          </CSSTab>
          <CSSTab value="Settings" activeTab="Profile" onTabChange={() => {}}>
            Settings
          </CSSTab>
          <CSSTab value="Messages" activeTab="Profile" onTabChange={() => {}}>
            Messages
          </CSSTab>
          <CSSTab value="History" activeTab="Profile" onTabChange={() => {}}>
            History
          </CSSTab>
        </CSSTabBar>
      </div>

      {/* Styled Components Demo */}
      <div style={{ marginBottom: "3rem" }}>
        <h1>Styled Components</h1>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <SCButton variant="primary">Primary</SCButton>
          <SCButton variant="secondary">Secondary</SCButton>
        </div>

        <SCTabBar>
          <SCTab value="Profile" activeTab="Profile" onTabChange={() => {}}>
            Profile
          </SCTab>
          <SCTab value="Settings" activeTab="Profile" onTabChange={() => {}}>
            Settings
          </SCTab>
          <SCTab value="Messages" activeTab="Profile" onTabChange={() => {}}>
            Messages
          </SCTab>
          <SCTab value="History" activeTab="Profile" onTabChange={() => {}}>
            History
          </SCTab>
        </SCTabBar>
      </div>

      {/* Tailwind Demo */}
      <div style={{ marginBottom: "3rem" }}>
        <h1>Tailwind CSS</h1>

        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <TWButton variant="primary">Primary</TWButton>
          <TWButton variant="secondary">Secondary</TWButton>
        </div>

        <TWTabBar>
          <TWTab value="Profile" activeTab="Profile" onTabChange={() => {}}>
            Profile
          </TWTab>
          <TWTab value="Settings" activeTab="Profile" onTabChange={() => {}}>
            Settings
          </TWTab>
          <TWTab value="Messages" activeTab="Profile" onTabChange={() => {}}>
            Messages
          </TWTab>
          <TWTab value="History" activeTab="Profile" onTabChange={() => {}}>
            History
          </TWTab>
        </TWTabBar>
      </div>
    </div>
  );
}

export default App;
