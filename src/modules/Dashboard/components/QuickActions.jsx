import "./QuickActions.css";

export default function QuickActions({ actions = [] }) {
  return (
    <div className="quick-actions-section">
      <div className="section-header">
        <h3 className="section-title">Quick Actions</h3>
        <p className="section-sub">Common tasks to get you started</p>
      </div>
      <div className="quick-actions-grid">
        {actions.map((action, i) => (
          <button key={i} className="quick-action-btn" onClick={action.onClick}>
            <span className="qa-icon">{action.icon}</span>
            <span className="qa-label">{action.label}</span>
            <span className="qa-sub">{action.sub}</span>
          </button>
        ))}
      </div>
    </div>
  );
}