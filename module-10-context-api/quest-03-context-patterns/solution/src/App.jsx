import { AuthProvider, useAuth } from "./context/AuthContext";
import { LoginForm } from "./components/LoginForm";
import { Dashboard } from "./components/Dashboard";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app">
      <h1> Wizard Academy</h1>
      <p>Authentication with Context API</p>

      {isAuthenticated ? <Dashboard /> : <LoginForm />}

      <div className="info-box">
        <h3>Auth Context Pattern</h3>
        <ul>
          <li>User state stored in context</li>
          <li>Login/logout available globally</li>
          <li>Conditional rendering based on auth state</li>
          <li>Protected content without prop drilling</li>
        </ul>
      </div>
    </div>
  );
}

function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProvider;
