import { useState } from "react";
import "./ChoosePlan.css";

const PLANS = [
  {
    id: "basic",
    name: "Basic",
    tag: "Up to 10 employees",
    tagStyle: "tag-light",
    desc: "Perfect for small businesses getting started",
    pricing: { Monthly: 15000, "6-Month": 80000, Annual: 150000 },
    features: [
      "Up to 10 employees",
      "Basic employee management",
      "Staff verification",
      "Payment processing",
      "SMS notifications",
      "Basic reporting",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tag: "Up to 50 employees",
    tagStyle: "tag-light",
    desc: "For growing businesses with expanded needs",
    pricing: { Monthly: 25000, "6-Month": 135000, Annual: 250000 },
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
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "Unlimited employees",
    tagStyle: "tag-dark",
    desc: "For large organizations requiring full control",
    pricing: { Monthly: 50000, "6-Month": 270000, Annual: 500000 },
    features: [
      "Unlimited employees",
      "Full employee lifecycle management",
      "Comprehensive verification suite",
      "Enterprise payment solutions",
      "Multi-channel notifications",
      "Advanced analytics & insights",
      "Dedicated account manager",
      "Custom integrations",
      "White-label options",
    ],
  },
];

const CYCLES = ["Monthly", "6-Month", "Annual"];

const COLLAPSED = 4; 

function fmt(n) {
  return "₦" + n.toLocaleString("en-NG");
}

function PlanCard({ plan, selected, onSelect, billingCycle }) {
  const [expanded, setExpanded] = useState(false);
  const visibleFeatures = expanded ? plan.features : plan.features.slice(0, COLLAPSED);
  const hidden = plan.features.length - COLLAPSED;

  return (
    <div
      className={`plan-card ${selected ? "plan-card--selected" : ""}`}
      onClick={() => onSelect(plan.id)}
    >
      <div className="plan-card__header">
        <div className="plan-card__title-row">
          <span className="plan-card__name">{plan.name}</span>
          <span className={`plan-tag ${plan.tagStyle}`}>{plan.tag}</span>
        </div>
        <p className="plan-card__desc">{plan.desc}</p>
      </div>

      <div className="plan-card__pricing">
        {CYCLES.map((c) => (
          <div
            key={c}
            className={`price-block ${billingCycle === c && selected ? "price-block--active" : ""}`}
          >
            <span className="price-amount">{fmt(plan.pricing[c])}</span>
            <span className="price-cycle">{c}</span>
          </div>
        ))}
      </div>

      <ul className="plan-card__features">
        {visibleFeatures.map((f) => (
          <li key={f}>
            <span className="check-icon">✓</span>
            {f}
          </li>
        ))}
      </ul>

      {plan.features.length > COLLAPSED && (
        <button
          className="expand-btn"
          onClick={(e) => {
            e.stopPropagation();
            setExpanded(!expanded);
          }}
        >
          {expanded ? "− Show less" : `+${hidden} more features`}
        </button>
      )}

      {selected && (
        <div className="plan-card__selected-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none">
            <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Selected
        </div>
      )}
    </div>
  );
}

function ChoosePlan({ onContinue, onSignIn }) {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState(null);

  const plan = PLANS.find((p) => p.id === selectedPlan);
  const canContinue = selectedPlan && billingCycle;

  const handleContinue = () => {
    if (!canContinue) return;
    onContinue?.({ plan: selectedPlan, billingCycle, price: plan.pricing[billingCycle] });
  };

  return (
    <div className="choose-plan-container">
      <div className="choose-plan-card">
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
        <p className="subtitle-small">Choose your business plan</p>

        <h2 className="plan-heading">Choose Your Plan</h2>
        <p className="plan-subheading">
          Select the subscription plan that best fits your business needs
        </p>

        {/* Plan cards */}
        <div className="plans-list">
          {PLANS.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              selected={selectedPlan === p.id}
              onSelect={setSelectedPlan}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        {/* Billing Cycle — shown after plan selection */}
        {selectedPlan && (
          <div className="billing-section">
            <p className="billing-label">Billing Cycle</p>
            <div className="billing-toggle">
              {CYCLES.map((c) => (
                <button
                  key={c}
                  className={`cycle-btn ${billingCycle === c ? "cycle-btn--active" : ""}`}
                  onClick={() => setBillingCycle(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Summary row */}
        {canContinue && (
          <div className="plan-summary">
            <div className="summary-row">
              <span className="summary-label">Selected Plan:</span>
              <span className="summary-value">
                {plan.name} – {billingCycle}
              </span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Price:</span>
              <span className="summary-value summary-price">
                {fmt(plan.pricing[billingCycle])}
                <span className="summary-cycle">
                  /{billingCycle === "Monthly" ? "month" : billingCycle === "6-Month" ? "6 months" : "year"}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* CTA */}
        {canContinue && (
          <button className="cta-btn" onClick={handleContinue}>
            Continue with {plan.name} Plan
          </button>
        )}

        <p className="signin-row">
          Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSignIn?.(); }}>Sign In</a>
        </p>
      </div>

      <div className="help-btn">?</div>
    </div>
  );
}

export default ChoosePlan;