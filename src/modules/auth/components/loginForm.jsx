import { useState } from "react";
import { useAuth } from "../hooks/userAuth";
import "./form.css";

function LoginForm({ onLoginSuccess }) {
  const { login, loading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(form, onLoginSuccess);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="field">
        <label className="field-label">Business Email</label>
        <input
          type="email"
          name="email"
          placeholder="your-business@company.com"
          onChange={handleChange}
          required
        />
      </div>

      <div className="field">
        <label className="field-label">Password</label>
        <div className="input-wrap">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              /* eye-off */
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="#000000" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
                  a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
                  a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              /* eye */
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
                stroke="#000000" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;