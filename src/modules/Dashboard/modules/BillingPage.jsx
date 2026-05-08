import { useState } from "react";
import styles from "./BillingPage.module.css";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    desc: "Perfect for small businesses getting started",
    pricing: { Monthly: 150000, Annual: 150000 },
    employeeLimit: "Up to 10 employees",
    features: [
      "Up to 10 employees",
      "Basic employee management",
      "Staff verification",
    ],
    extraCount: 3,
  },
  {
    id: "professional",
    name: "Professional",
    desc: "For growing businesses with expanded needs",
    pricing: { Monthly: 250000, Annual: 250000 },
    employeeLimit: "Up to 50 employees",
    features: [
      "Up to 50 employees",
      "Advanced employee management",
      "Staff verification & background checks",
    ],
    extraCount: 5,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "For large organizations requiring full control",
    pricing: { Monthly: 500000, Annual: 500000 },
    employeeLimit: "Unlimited employees",
    unlimitedHighlight: true,
    features: [
      "Unlimited employees",
      "Full employee lifecycle management",
      "Comprehensive verification suite",
    ],
    extraCount: 6,
  },
];

const PLAN_DETAILS = {
  basic: {
    features: [
      "Up to 10 employees",
      "Basic employee management",
      "Staff verification",
      "Payment processing",
    ],
  },
  professional: {
    features: [
      "Up to 50 employees",
      "Advanced employee management",
      "Staff verification & background checks",
      "Advanced payment processing",
      "SMS & email notifications",
      "Detailed reporting & analytics",
      "Priority support",
      "Custom onboarding",
    ],
  },
  enterprise: {
    features: [
      "Unlimited employees",
      "Full employee lifecycle management",
      "Comprehensive verification suite",
      "Enterprise payment solutions",
      "Multi-channel notifications",
      "Advanced analytics & insights",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
};

function fmt(n) {
  return "₦" + n.toLocaleString("en-NG");
}

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.featureCheckSvg}>
    <circle cx="12" cy="12" r="10" stroke="#22c55e" strokeWidth="1.8" />
    <polyline points="8 12 11 15 16 9" stroke="#22c55e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function BillingPage({ registrationData }) {
  const [billingCycle, setBillingCycle] = useState("Annual");
  const [showAddBank, setShowAddBank] = useState(false);

  const currentPlanId = registrationData?.planData?.plan || "professional";
  const currentPlan = PLANS.find((p) => p.id === currentPlanId);
  const planDetails = PLAN_DETAILS[currentPlanId] || PLAN_DETAILS.professional;
  const company = registrationData?.companyName || "wahab@gmail.com";
  const email = registrationData?.email || "wahab@gmail.com";

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Subscription & Billing</h1>
        <p className={styles.pageSubtitle}>Manage your VettamHR subscription and billing details</p>
      </div>

      {/* ── Current Plan ── */}
      <section className={styles.section}>
        <div className={styles.currentPlanCard}>
          {/* Top row */}
          <div className={styles.planTopRow}>
            <div className={styles.planTopLeft}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
                <path d="M3 6l3 10h12l3-10-5 4-4-6-4 6-5-4z" />
              </svg>
              <span className={styles.planTopLabel}>Current Plan</span>
            </div>
            <div className={styles.planBadges}>
              <span className={styles.badgePopular}>Most Popular</span>
              <span className={styles.badgeActive}>Active</span>
            </div>
          </div>

          {/* Plan name + price */}
          <div className={styles.planNamePriceRow}>
            <div>
              <h2 className={styles.planName}>{currentPlan?.name}</h2>
              <p className={styles.planDesc}>For growing businesses with expanded needs</p>
            </div>
            <div className={styles.planPriceRight}>
              <span className={styles.priceAmount}>{fmt(currentPlan?.pricing[billingCycle])}</span>
              <span className={styles.pricePeriod}>per monthly</span>
            </div>
          </div>

          {/* Details grid */}
          <div className={styles.detailsGrid}>
            <div className={styles.detailBox}>
              <h4 className={styles.detailBoxTitle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="4" width="22" height="16" rx="2" />
                  <line x1="1" y1="10" x2="23" y2="10" />
                </svg>
                Billing Details
              </h4>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Company:</span>
                <span className={styles.detailValue}>{email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Billing Cycle:</span>
                <span className={styles.detailValue}>Monthly</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Next Billing:</span>
                <span className={styles.detailValue}>Jan 15, 2025</span>
              </div>
            </div>
            <div className={styles.detailBox}>
              <h4 className={styles.detailBoxTitle}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Usage &amp; Limits
              </h4>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Employees:</span>
                <span className={styles.detailValue}>0 / 50</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Remaining:</span>
                <span className={`${styles.detailValue} ${styles.green}`}>50</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className={styles.featuresSection}>
            <h4 className={styles.featuresSectionTitle}>Plan Features</h4>
            <div className={styles.featuresGrid}>
              {planDetails.features.map((f, i) => (
                <div key={i} className={styles.featureItem}>
                  <CheckIcon />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Change Plan ── */}
      <section className={styles.section}>
        <div className={styles.whiteCard}>
          <h3 className={styles.cardTitle}>Change Your Plan</h3>
          <p className={styles.cardSubtitle}>Upgrade or downgrade your subscription to better fit your needs</p>

          <div className={styles.cycleSelect}>
            <label className={styles.cycleLabel}>Billing Cycle</label>
            <div className={styles.selectWrap}>
              <select
                className={styles.select}
                value={billingCycle}
                onChange={(e) => setBillingCycle(e.target.value)}
              >
                <option>Monthly</option>
                <option>6 Months</option>
                <option>Annual</option>
              </select>
              <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>

          <div className={styles.plansGrid}>
            {PLANS.map((plan) => {
              const isCurrent = plan.id === currentPlanId;
              const isBasic = plan.id === "basic";
              return (
                <div key={plan.id} className={`${styles.planCard} ${isCurrent ? styles.planCardCurrent : ""}`}>
                  {isCurrent && <span className={styles.currentBadge}>Current Plan</span>}
                  <h3 className={styles.planCardName}>{plan.name}</h3>
                  <p className={styles.planCardDesc}>{plan.desc}</p>
                  <div className={styles.planCardPrice}>
                    <span className={styles.planCardAmount}>{fmt(plan.pricing[billingCycle])}</span>
                    <span className={styles.planCardPeriod}>per {billingCycle.toLowerCase()}</span>
                  </div>
                  <div className={styles.planCardEmployeeRow}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={plan.unlimitedHighlight ? "#22c55e" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span className={plan.unlimitedHighlight ? styles.planEmpGreen : styles.planEmpGrey}>{plan.employeeLimit}</span>
                  </div>
                  <ul className={styles.planCardFeatures}>
                    {plan.features.map((f, i) => (
                      <li key={i} className={styles.planCardFeatureItem}>
                        <CheckIcon />
                        <span>{f}</span>
                      </li>
                    ))}
                    {plan.extraCount > 0 && (
                      <li className={styles.planCardExtra}>+{plan.extraCount} more features</li>
                    )}
                  </ul>
                  {!isCurrent && (
                    <button className={styles.planActionBtn}>
                      {isBasic ? (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
                          Downgrade
                        </>
                      ) : (
                        <>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
                          Upgrade
                        </>
                      )}
                    </button>
                  )}
                  {isCurrent && <div className={styles.planCurrentPlaceholder} />}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Payment & Banking ── */}
      <section className={styles.section}>
        <div className={styles.whiteCard}>
          <div className={styles.sectionIconRow}>
            <div className={styles.sectionIconBox}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <div>
              <h3 className={styles.cardTitle}>Payment &amp; Banking</h3>
              <p className={styles.cardSubtitle}>Manage your business bank accounts for employee payments and subscription billing</p>
            </div>
          </div>

          {/* Bank Accounts */}
          <div className={styles.bankSection}>
            <div className={styles.bankSectionHeader}>
              <div className={styles.bankSectionLeft}>
                <div className={styles.sectionIconBox}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" />
                    <line x1="1" y1="10" x2="23" y2="10" />
                  </svg>
                </div>
                <div>
                  <h4 className={styles.bankTitle}>Bank Accounts</h4>
                  <p className={styles.bankSubtitle}>Manage your business bank accounts for employee payments</p>
                </div>
              </div>
              <button className={styles.addAccountBtn} onClick={() => setShowAddBank(!showAddBank)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Account
              </button>
            </div>

            {/* Bank Account Item */}
            {/* Bank Account Item */}
<div className={styles.bankAccountItem}>

  {/* LEFT SIDE */}
  <div className={styles.bankAccountLeft}>

    <div className={styles.bankAccountTop}>
      <span className={styles.bankAccountName}>
        TechCorp Nigeria Limited
      </span>

      <span className={styles.verifiedBadge}>
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>

        Verified
      </span>

      <span className={styles.defaultBadge}>
        Default
      </span>
    </div>

    <div className={styles.bankAccountMeta}>

      <div className={styles.bankMetaItem}>
        <span className={styles.bankMetaLabel}>Account:</span>
        <span className={styles.bankMetaValue}>0123456789</span>
      </div>

      <div className={styles.bankMetaItem}>
        <span className={styles.bankMetaLabel}>Bank:</span>
        <span className={styles.bankMetaValue}>Access Bank</span>
      </div>

      <div className={styles.bankMetaItem}>
        <span className={styles.bankMetaLabel}>Type:</span>
        <span className={styles.bankMetaValue}>current</span>
      </div>

    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className={styles.bankAccountActions}>

    <button className={styles.iconBtn}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#374151"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </button>

    <button className={`${styles.iconBtn} ${styles.iconBtnDelete}`}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
        <path d="M9 6V4h6v2" />
      </svg>
    </button>

  </div>
</div>

            {/* Add Bank Form */}
            {showAddBank && (
              <div className={styles.addBankForm}>
                <div className={styles.addBankFormHeader}>
                  <div className={styles.sectionIconBox}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" />
                      <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={styles.formTitle}>Add Bank Account</h4>
                    <p className={styles.formSubtitle}>Add a bank account for employee payments and business transactions</p>
                  </div>
                </div>

                <div className={styles.formGrid}>
                  {/* Left column */}
                  <div className={styles.formLeft}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Bank *</label>
                      <div className={styles.selectWrap}>
                        <select className={styles.select}>
                          <option>Select your bank</option>
                          <option>Access Bank</option>
                          <option>GTBank</option>
                          <option>FirstBank</option>
                          <option>UBA</option>
                        </select>
                        <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Account Number *</label>
                      <input className={styles.formInput} type="text" placeholder="0123456789" />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Account Name *</label>
                      <input className={styles.formInput} type="text" placeholder="Account holder name" />
                    </div>
                  </div>

                  {/* Right column */}
                  <div className={styles.formRight}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Account Type *</label>
                      <div className={styles.selectWrap}>
                        <select className={styles.select}>
                          <option>Current Account</option>
                          <option>Savings Account</option>
                        </select>
                        <svg className={styles.selectChevron} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                      </div>
                    </div>
                    <div className={styles.formCheckbox}>
                      <input type="checkbox" id="defaultAccount" />
                      <label htmlFor="defaultAccount">Set as default payment account</label>
                    </div>
                    <div className={styles.securityBox}>
                      <div className={styles.securityTitle}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        Security Information
                      </div>
                      <ul className={styles.securityList}>
                        <li>Your bank details are encrypted and securely stored</li>
                        <li>Account verification helps prevent payment errors</li>
                        <li>Only verified accounts can be used for payments</li>
                        <li>You can add multiple accounts and set a default</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button className={styles.btnCancel} onClick={() => setShowAddBank(false)}>Cancel</button>
                  <button className={styles.btnSubmit}>Add Account</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}