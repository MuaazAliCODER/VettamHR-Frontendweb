import LoginForm from "../components/loginForm";
import "./Login.css";

function Login({ onSignUp, onLoginSuccess }) {
  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-row">
          <div className="logo-icon">
            <svg width="30" height="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="40" fill="#050815" />
              <path d="M24 40L35.5 52L56 30" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="38" cy="18" r="6" fill="#D9D9D9" />
              <circle cx="24" cy="21" r="6" fill="#D9D9D9" />
              <circle cx="52" cy="21" r="6" fill="#D9D9D9" />
            </svg>
          </div>
          <span className="logo-text">VettamHR</span>
        </div>

        {/* Portal label */}
        <div className="portal-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#4f63d2" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Business Portal</span>
        </div>

        <p className="subtitle">Sign in to manage your staff</p>

        <LoginForm onLoginSuccess={onLoginSuccess} />

        <p className="signup-row">
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSignUp?.();
            }}
          >
            Sign Up
          </a>
        </p>
      </div>

      <div className="help-btn">?</div>
    </div>
  );
}

export default Login;