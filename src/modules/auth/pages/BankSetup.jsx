import { useState } from "react";
import "./BankSetup.css";

const BANKS = [
  "Access Bank", "Citibank Nigeria", "Ecobank Nigeria", "Fidelity Bank",
  "First Bank of Nigeria", "First City Monument Bank (FCMB)", "Globus Bank",
  "Guaranty Trust Bank (GTBank)", "Heritage Bank", "Keystone Bank",
  "Lotus Bank", "Polaris Bank", "Providus Bank", "Stanbic IBTC Bank",
  "Standard Chartered Bank", "Sterling Bank", "SunTrust Bank", "Titan Bank",
  "Union Bank of Nigeria", "United Bank for Africa (UBA)", "Unity Bank",
  "Wema Bank", "Zenith Bank",
];

export default function BankSetup({ registrationData, onBack, onComplete }) {
  const [form, setForm] = useState({
    bank: "",
    accountNumber: "",
    accountType: "Current Account",
  });

  const [verifyState, setVerifyState] = useState("idle"); // idle | loading | success | error
  const [verifiedName, setVerifiedName] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Reset verification if account number changes
    if (name === "accountNumber") {
      setVerifyState("idle");
      setVerifiedName("");
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.bank) errs.bank = "Please select a bank.";
    if (!form.accountNumber) {
      errs.accountNumber = "Account number is required.";
    } else if (!/^\d{10}$/.test(form.accountNumber)) {
      errs.accountNumber = "Enter a valid 10-digit NUBAN account number.";
    }
    if (!form.accountType) errs.accountType = "Please select account type.";
    return errs;
  };

  const handleVerify = async () => {
    const errs = {};
    if (!form.bank) errs.bank = "Select a bank before verifying.";
    if (!/^\d{10}$/.test(form.accountNumber))
      errs.accountNumber = "Enter a valid 10-digit NUBAN number.";
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setVerifyState("loading");
    // Simulate API call — replace with real Paystack/Flutterwave resolve call
    await new Promise((r) => setTimeout(r, 1800));
    const success = form.accountNumber !== "0000000000"; // mock: fail all-zeros
    if (success) {
      setVerifyState("success");
      setVerifiedName("Bussiness Account"); // replace with API response
    } else {
      setVerifyState("error");
      setErrors((prev) => ({ ...prev, accountNumber: "Account not found. Check the number and bank." }));
    }
  };

  const maskedAccount = form.accountNumber ? `${form.accountNumber.slice(-4)}` : "";

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    if (verifyState !== "success") {
      setErrors((prev) => ({ ...prev, accountNumber: "Please verify your account number first." }));
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitting(false);
    onComplete?.({ ...form, verifiedName });
  };

  const planData = registrationData?.planData;
  const summary = {
    company: registrationData?.companyName || "Your company",
    plan: planData?.plan ? planData.plan.charAt(0).toUpperCase() + planData.plan.slice(1) : "Professional",
    billing: planData?.billingCycle || "Monthly",
    amount: planData?.price ? `₦${Number(planData.price).toLocaleString("en-NG")}` : "—",
  };

  return (
    <div className="bank-setup-page">
      <div className="bank-card">
        {/* Top branding */}
        <div className="bank-branding">
          <div className="logo-row">
            <div className="logo-icon">
              <svg width="30" height="30" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="40" fill="#050815" />
                <path d="M24 40L35.5 52L56 30" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="38" cy="17" r="6" fill="#D9D9D9" />
                <circle cx="24" cy="20" r="6" fill="#D9D9D9" />
                <circle cx="52" cy="20" r="6" fill="#D9D9D9" />
              </svg>
            </div>
            <span className="logo-text">VettamHR</span>
          </div>
          <div className="portal-label">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4f63d2" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Business Portal
          </div>
          <p className="portal-sub">Add your business bank account</p>
        </div>

        {/* Icon + Title */}
        <div className="section-icon-wrap">
          <div className="section-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4f63d2" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
              <line x1="1" y1="10" x2="23" y2="10"/>
            </svg>
          </div>
        </div>
        <h2 className="section-title">Bank Account Setup</h2>
        <p className="section-sub">Add your business bank account for subscription payments</p>

        {/* Form */}
        <div className="form-body">

          {/* Select Bank */}
          <div className="field">
            <label className="field-label">Select Bank <span className="req">*</span></label>
            <div className="select-wrap">
              <select
                name="bank"
                value={form.bank}
                onChange={handleChange}
                className={`field-select ${errors.bank ? "input-error" : ""}`}
              >
                <option value="">Select a bank</option>
                {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            {errors.bank && <p className="field-error">{errors.bank}</p>}
          </div>

          {/* Account Number */}
          <div className="field">
            <label className="field-label">Account Number <span className="req">*</span></label>
            <div className="account-row">
              <input
                type="text"
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                placeholder="0123456789"
                maxLength={10}
                className={`field-input ${errors.accountNumber ? "input-error" : verifyState === "success" ? "input-success" : ""}`}
              />
              <button
                className={`verify-btn ${verifyState === "success" ? "verified" : ""} ${verifyState === "loading" ? "loading" : ""}`}
                onClick={handleVerify}
                disabled={verifyState === "loading" || verifyState === "success"}
              >
                {verifyState === "loading" ? (
                  <span className="spinner" />
                ) : verifyState === "success" ? (
                  "✓ Verified"
                ) : (
                  "Verify"
                )}
              </button>
            </div>
            <p className="field-hint">Enter your 10-digit NUBAN account number</p>
            {errors.accountNumber && <p className="field-error">{errors.accountNumber}</p>}
            {verifyState === "success" && (
              <div className="verification-success">
                <div className="verification-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div className="verification-text">
                  <p className="verification-title">Account Verified</p>
                  <p className="verification-subtitle">{verifiedName} · {maskedAccount}</p>
                </div>
              </div>
            )}
          </div>

          {/* Account Type */}
          <div className="field">
            <label className="field-label">Account Type <span className="req">*</span></label>
            <div className="select-wrap">
              <select
                name="accountType"
                value={form.accountType}
                onChange={handleChange}
                className={`field-select ${errors.accountType ? "input-error" : ""}`}
              >
                <option value="Current Account">Current Account</option>
                <option value="Savings Account">Savings Account</option>
                <option value="Domiciliary Account">Domiciliary Account</option>
              </select>
              <svg className="select-chevron" width="16" height="16" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            {errors.accountType && <p className="field-error">{errors.accountType}</p>}
          </div>

          <div className="summary-box invoice-box">
            <p className="summary-title">Registration Summary</p>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Company:</span><span>{summary.company}</span>
              </div>
              <div className="summary-row">
                <span>Plan:</span><span>{summary.plan}</span>
              </div>
              <div className="summary-row">
                <span>Billing:</span><span>{summary.billing}</span>
              </div>
              <div className="summary-row amount-row">
                <span>Amount:</span>
                <span className="amount-val">{summary.amount}</span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            className={`complete-btn ${submitting ? "submitting" : ""}`}
            onClick={handleSubmit}
            disabled={
              submitting ||
              !form.bank ||
              !form.accountNumber ||
              !/^\d{10}$/.test(form.accountNumber) ||
              !form.accountType ||
              verifyState !== "success"
            }
          >
            {submitting ? <><span className="spinner white" /> Completing...</> : "Complete Registration"}
          </button>

          <button className="back-link" onClick={onBack}>← Back to Business Details</button>
        </div>
      </div>

      <div className="help-btn">?</div>
    </div>
  );
}