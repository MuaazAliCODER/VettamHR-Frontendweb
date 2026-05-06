import { useState } from "react";
import "./RegisterForm.css";

const RULES = [
  { id: "len",   label: "At least 8 characters",           test: (v) => v.length >= 8 },
  { id: "upper", label: "One uppercase letter",             test: (v) => /[A-Z]/.test(v) },
  { id: "lower", label: "One lowercase letter",             test: (v) => /[a-z]/.test(v) },
  { id: "num",   label: "One number",                       test: (v) => /[0-9]/.test(v) },
  { id: "spec",  label: "One special character (!@#$%^&*)", test: (v) => /[!@#$%^&*]/.test(v) },
];

function PasswordRequirements({ password }) {
  if (!password) return null;
  return (
    <div className="pw-requirements">
      <p className="pw-req-title">Password Requirements:</p>
      <ul>
        {RULES.map((r) => {
          const ok = r.test(password);
          return (
            <li key={r.id} className={ok ? "req-ok" : "req-fail"}>
              <span className="req-dot">{ok ? "✓" : "○"}</span>
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function RegisterForm({ planData, onBack, onSubmit }) {
  const [form, setForm] = useState({
    companyName: "",
    regNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [showPw, setShowPw]   = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set   = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const touch = (k)    => setTouched((t) => ({ ...t, [k]: true }));

  const pwOk    = RULES.every((r) => r.test(form.password));
  const pwMatch = form.password === form.confirmPassword && form.confirmPassword !== "";
  const regOk   = /^\d{10}$/.test(form.regNumber);

  const errors = {
    companyName:     !form.companyName.trim() ? "Company name is required" : null,
    regNumber:       !form.regNumber.trim()
                       ? "Registration number is required"
                       : !regOk
                       ? "Must be exactly 10 digits"
                       : null,
    email:           !form.email.trim()
                       ? "Email is required"
                       : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                       ? "Enter a valid email"
                       : null,
    password:        !form.password
                       ? "Password is required"
                       : !pwOk
                       ? "Password does not meet all requirements"
                       : null,
    confirmPassword: !form.confirmPassword
                       ? "Please confirm your password"
                       : !pwMatch
                       ? "Passwords do not match"
                       : null,
    agreed:          !form.agreed ? "You must accept the terms" : null,
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const showErr   = (k) => (submitted || touched[k]) && errors[k];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (hasErrors) return;
    onSubmit?.({ ...form, planData });
  };

  const planName  = planData?.plan
    ? planData.plan.charAt(0).toUpperCase() + planData.plan.slice(1)
    : "—";
  const planPrice = planData?.price
    ? "₦" + Number(planData.price).toLocaleString("en-NG")
    : "—";

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Logo */}
        <div className="logo-row">
          <div className="logo-icon">✓</div>
          <span className="logo-text">VettamHR</span>
        </div>
        <div className="portal-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#4f63d2" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Business Portal</span>
        </div>
        <p className="subtitle-small">Complete your business setup</p>

        <h2 className="reg-heading">Complete Your Registration</h2>
        <p className="reg-subheading">Provide your business details to get started</p>

        <form onSubmit={handleSubmit} className="reg-form" noValidate>

          {/* Company Name */}
          <Field label="Company Name" required error={showErr("companyName")}>
            <input
              type="text"
              placeholder="Your Company Ltd"
              value={form.companyName}
              onChange={(e) => set("companyName", e.target.value)}
              onBlur={() => touch("companyName")}
              className={showErr("companyName") ? "input-err" : ""}
            />
          </Field>

          {/* Registration Number — 10-digit numeric validation */}
          <Field label="Company Registration Number" required error={showErr("regNumber")}>
            <input
              type="text"
              inputMode="numeric"
              placeholder="0123456789"
              maxLength={10}
              value={form.regNumber}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, "").slice(0, 10);
                set("regNumber", v);
              }}
              onBlur={() => touch("regNumber")}
              className={showErr("regNumber") ? "input-err" : ""}
            />
            <p className="field-hint">10-digit registration number (integers only)</p>
          </Field>

          {/* Business Email */}
          <Field label="Business Email" required error={showErr("email")}>
            <input
              type="email"
              placeholder="admin@yourcompany.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              onBlur={() => touch("email")}
              className={showErr("email") ? "input-err" : ""}
            />
          </Field>

          {/* Password */}
          <Field label="Password" required error={showErr("password")}>
            <div className="input-wrap">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                onBlur={() => touch("password")}
                className={showErr("password") ? "input-err" : ""}
              />
              <EyeBtn show={showPw} toggle={() => setShowPw(!showPw)} />
            </div>
            <PasswordRequirements password={form.password} />
          </Field>

          {/* Confirm Password */}
          <Field label="Confirm Password" required error={showErr("confirmPassword")}>
            <div className="input-wrap">
              <input
                type={showCPw ? "text" : "password"}
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={(e) => set("confirmPassword", e.target.value)}
                onBlur={() => touch("confirmPassword")}
                className={showErr("confirmPassword") ? "input-err" : ""}
              />
              <EyeBtn show={showCPw} toggle={() => setShowCPw(!showCPw)} />
            </div>
            {form.confirmPassword && (
              <p className={`pw-match-hint ${pwMatch ? "match-ok" : "match-fail"}`}>
                {pwMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
              </p>
            )}
          </Field>

          {/* Selected Subscription */}
          <div className="subscription-box">
            <p className="sub-box-title">Selected Subscription:</p>
            <div className="sub-row">
              <span>Plan:</span><span>{planName}</span>
            </div>
            <div className="sub-row">
              <span>Billing:</span><span>{planData?.billingCycle || "—"}</span>
            </div>
            <div className="sub-row sub-row--total">
              <span>Total:</span><span>{planPrice}</span>
            </div>
          </div>

          {/* Terms */}
          <label className={`terms-row ${showErr("agreed") ? "terms-err" : ""}`}>
            <input
              type="checkbox"
              checked={form.agreed}
              onChange={(e) => {
                set("agreed", e.target.checked);
                touch("agreed");
              }}
            />
            <span>
              I agree to the{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
              {" "}and{" "}
              <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            </span>
          </label>
          {showErr("agreed") && <p className="err-msg">{errors.agreed}</p>}

          {/* Submit — blurred & unclickable until form is fully valid */}
          <button
            type="submit"
            className={`cta-btn ${hasErrors ? "cta-btn--disabled" : ""}`}
            disabled={hasErrors}
          >
            Go to Bank Setup
          </button>

          <button
            type="button"
            className="back-plans-btn"
            onClick={() => onBack?.()}
          >
            ← Back to Plans
          </button>
        </form>
      </div>

      <div className="help-btn">?</div>
    </div>
  );
}

/* ── helpers ── */
function Field({ label, required, error, children }) {
  return (
    <div className="field">
      <label className="field-label">
        {label} {required && <span className="req-star">*</span>}
      </label>
      {children}
      {error && <p className="err-msg">{error}</p>}
    </div>
  );
}

function EyeBtn({ show, toggle }) {
  return (
    <button type="button" className="eye-btn" onClick={toggle}>
      {show ? (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  );
}

export default RegisterForm;