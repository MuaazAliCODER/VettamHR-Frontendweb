import "./StatCard.css";

export default function StatCard({ label, value, sub, icon, prefix = "" }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-value">
        {prefix && <span className="stat-prefix">{prefix}</span>}
        {value}
      </div>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
  );
}