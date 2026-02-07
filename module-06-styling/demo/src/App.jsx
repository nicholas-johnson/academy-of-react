import { useState } from "react";
import styled from "styled-components";

// ============================================
// 1. CSS MODULES
// ============================================
// Import creates an object with scoped class names
// e.g., styles.button might become "Button_button_x7k2j"
import styles from "./Button.module.css";

function CSSModulesButton({ variant = "primary", children }) {
  // Combine base class with variant class
  return (
    <button className={`${styles.button} ${styles[variant]}`}>
      {children}
    </button>
  );
}

// ============================================
// 2. STYLED COMPONENTS
// ============================================
// CSS-in-JS: styles are defined with the component
// Props can dynamically change styles

const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  /* Dynamic styles based on props */
  background: ${(props) => {
    switch (props.$variant) {
      case "secondary":
        return "transparent";
      case "danger":
        return "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)";
      default:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  }};

  color: ${(props) => (props.$variant === "secondary" ? "#667eea" : "white")};
  border: ${(props) =>
    props.$variant === "secondary" ? "2px solid #667eea" : "none"};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) =>
      props.$variant === "danger"
        ? "0 4px 12px rgba(244, 63, 94, 0.4)"
        : "0 4px 12px rgba(102, 126, 234, 0.4)"};
  }
`;

// ============================================
// 3. TAILWIND CSS
// ============================================
// Utility classes applied directly in JSX
// No separate CSS file needed

function TailwindButton({ variant = "primary", children }) {
  // Define variant classes
  const variants = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/40",
    secondary:
      "bg-transparent text-indigo-400 border-2 border-indigo-400 hover:bg-indigo-400/10",
    danger:
      "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:shadow-lg hover:shadow-rose-500/40",
  };

  return (
    <button
      className={`
      px-6 py-3 rounded-lg font-semibold
      transition-all duration-200 hover:-translate-y-0.5
      ${variants[variant]}
    `}
    >
      {children}
    </button>
  );
}

// ============================================
// DEMO APP
// ============================================

function App() {
  const [clicks, setClicks] = useState({ css: 0, styled: 0, tailwind: 0 });

  return (
    <div>
      <h1>⚡ Three Ways to Style React</h1>

      <div className="demo-grid">
        {/* CSS Modules Section */}
        <div className="demo-section">
          <h2>1. CSS Modules</h2>
          <p
            style={{
              marginBottom: "1rem",
              color: "#94a3b8",
              fontSize: "0.875rem",
            }}
          >
            Scoped CSS with automatic unique class names
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <CSSModulesButton
              variant="primary"
              onClick={() => setClicks((c) => ({ ...c, css: c.css + 1 }))}
            >
              Primary ({clicks.css})
            </CSSModulesButton>
            <CSSModulesButton variant="secondary">Secondary</CSSModulesButton>
            <CSSModulesButton variant="danger">Danger</CSSModulesButton>
          </div>
          <pre
            style={{
              marginTop: "1rem",
              fontSize: "0.75rem",
              color: "#64748b",
              background: "rgba(0,0,0,0.3)",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              overflow: "auto",
            }}
          >
            {`import styles from './Button.module.css'

<button className={styles.primary}>
  Click me
</button>`}
          </pre>
        </div>

        {/* Styled Components Section */}
        <div className="demo-section">
          <h2>2. Styled Components</h2>
          <p
            style={{
              marginBottom: "1rem",
              color: "#94a3b8",
              fontSize: "0.875rem",
            }}
          >
            CSS-in-JS with dynamic props
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <StyledButton
              $variant="primary"
              onClick={() => setClicks((c) => ({ ...c, styled: c.styled + 1 }))}
            >
              Primary ({clicks.styled})
            </StyledButton>
            <StyledButton $variant="secondary">Secondary</StyledButton>
            <StyledButton $variant="danger">Danger</StyledButton>
          </div>
          <pre
            style={{
              marginTop: "1rem",
              fontSize: "0.75rem",
              color: "#64748b",
              background: "rgba(0,0,0,0.3)",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              overflow: "auto",
            }}
          >
            {`const Button = styled.button\`
  background: \${props => 
    props.$variant === 'danger' 
      ? 'red' : 'blue'
  };
\``}
          </pre>
        </div>

        {/* Tailwind Section */}
        <div className="demo-section">
          <h2>3. Tailwind CSS</h2>
          <p
            style={{
              marginBottom: "1rem",
              color: "#94a3b8",
              fontSize: "0.875rem",
            }}
          >
            Utility-first classes in JSX
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <TailwindButton
              variant="primary"
              onClick={() =>
                setClicks((c) => ({ ...c, tailwind: c.tailwind + 1 }))
              }
            >
              Primary ({clicks.tailwind})
            </TailwindButton>
            <TailwindButton variant="secondary">Secondary</TailwindButton>
            <TailwindButton variant="danger">Danger</TailwindButton>
          </div>
          <pre
            style={{
              marginTop: "1rem",
              fontSize: "0.75rem",
              color: "#64748b",
              background: "rgba(0,0,0,0.3)",
              padding: "0.5rem",
              borderRadius: "0.25rem",
              overflow: "auto",
            }}
          >
            {`<button className="
  bg-gradient-to-r 
  from-indigo-500 
  to-purple-600
  px-6 py-3 rounded-lg
">
  Click me
</button>`}
          </pre>
        </div>
      </div>

      {/* Comparison Table */}
      <div
        style={{ maxWidth: "1200px", margin: "2rem auto", padding: "0 2rem" }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.1)" }}>
              <th
                style={{ padding: "1rem", textAlign: "left", color: "#a5b4fc" }}
              >
                Feature
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#a5b4fc",
                }}
              >
                CSS Modules
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#a5b4fc",
                }}
              >
                Styled Components
              </th>
              <th
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  color: "#a5b4fc",
                }}
              >
                Tailwind
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "0.75rem" }}>Scoped Styles</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>✅</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>✅</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>✅</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "0.75rem" }}>Dynamic Props</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>❌</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>✅</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>
                ⚠️ (via classnames)
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "0.75rem" }}>Zero Runtime</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>✅</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>❌</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>✅</td>
            </tr>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <td style={{ padding: "0.75rem" }}>Separate Files</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>Yes</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>No</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>No</td>
            </tr>
            <tr>
              <td style={{ padding: "0.75rem" }}>Learning Curve</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>Low</td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>
                Medium
              </td>
              <td style={{ padding: "0.75rem", textAlign: "center" }}>
                Medium
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
