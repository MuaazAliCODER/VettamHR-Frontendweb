import "./Sidebar.css";

const NAV_ITEMS = [
  { icon: "⊞", label: "Dashboard Overview", id: "dashboard" },
  { icon: "＋", label: "Add New Staff to Network", id: "add-staff" },
  { icon: "↑", label: "Onboard Network Staff", id: "onboard" },
  { icon: "↓", label: "Offboard Network Staff", id: "offboard" },
  { icon: "☰", label: "Employee Directory", id: "directory" },
  { icon: "★", label: "Performance Reviews", id: "performance" },
  { icon: "💳", label: "Employee Payments", id: "payments" },
  { icon: "⚑", label: "Staff Disputes", id: "disputes", badge: 0 },
  { icon: "🔔", label: "Notification Center", id: "notifications", badge: 0 },
  { icon: "⚙", label: "Subscription & Billing", id: "billing" },
];

export default function Sidebar({ activeId = "dashboard", onNavigate, user, onSignOut }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">✓</div>
          <span className="sidebar-logo-text">VettamHR</span>
        </div>
        <div className="sidebar-user">
          <p className="sidebar-email">{user?.email || "wahab@gmail.com"}</p>
          <p className="sidebar-role">Staff Management Portal</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeId === item.id ? "active" : ""}`}
            onClick={() => onNavigate?.(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
            {item.badge !== undefined && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Sign out */}
      <div className="sidebar-footer">
        <button className="signout-btn" onClick={onSignOut}>Sign Out</button>
      </div>
    </aside>
  );
}