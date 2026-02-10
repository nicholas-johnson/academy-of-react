import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user } = useAuth();

  return (
    <div className="page">
      <h2>Welcome to Battle Command</h2>
      <p>Track and manage ongoing military operations.</p>

      {user ? (
        <div className="welcome-box">
          <p>
            Welcome back, <strong>{user.name}</strong>!
          </p>
          <Link to="/war-room" className="btn">
            Enter War Room →
          </Link>
        </div>
      ) : (
        <div className="welcome-box">
          <p>Please log in to access the War Room.</p>
          <Link to="/login" className="btn">
            Login →
          </Link>
        </div>
      )}
    </div>
  );
}
