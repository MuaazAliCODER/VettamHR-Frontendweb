import styles from "./RegistrationSuccess.module.css";

function RegistrationSuccess({ registrationData, onContinue }) {
  const company = registrationData?.companyName || "hdb";
  const email = registrationData?.email || "i@gmail.com";
  const plan = registrationData?.planData?.plan
    ? registrationData.planData.plan.charAt(0).toUpperCase() +
      registrationData.planData.plan.slice(1)
    : "Enterprise";

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        {/* Logo */}
        <div className={styles.logoRow}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <span className={styles.logoText}>VettamHR</span>
        </div>

        {/* Portal Label */}
        <div className={styles.portalLabel}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Business Portal
        </div>

        {/* Success Icon */}
        <div className={styles.successIconWrap}>
          <div className={styles.successIcon}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className={styles.heading}>Registration Complete!</h1>
        <p className={styles.message}>
          Welcome to VettamHR! Your business account has been set up successfully.
        </p>

        {/* Details */}
        <div className={styles.detailsBox}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Company:</span>
            <span className={styles.detailValue}>{company}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Plan:</span>
            <span className={styles.detailValue}>{plan}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email:</span>
            <span className={styles.detailValue}>{email}</span>
          </div>
        </div>

        {/* Buttons */}
        <button className={styles.primaryBtn} onClick={() => onContinue?.()}>
          Continue to Dashboard
        </button>
        <button className={styles.secondaryBtn} onClick={() => window.location.reload()}>
          Go to Sign In Page
        </button>

      </div>
    </div>
  );
}

export default RegistrationSuccess;