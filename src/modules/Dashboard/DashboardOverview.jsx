import StatCard from "./components/StatCard";
import ActivityFeed from "./components/ActivityFeed";
import TopPerformers from "./components/TopPerformers";
import QuickActions from "./components/QuickActions";
import "./DashboardOverview.css";

export default function DashboardOverview({ user, onNavigate }) {
  console.log("DashboardOverview rendering with user:", user);
  const SAMPLE_ACTIVITIES = [
    { name: "Welcome to your dashboard", detail: user?.email || "user@example.com", time: "Now" },
    { name: "Ready to onboard staff", detail: "System", time: "Now" },
  ];

  const QUICK_ACTIONS = [
    { icon: "👤", label: "Add New Staff", sub: "Register new team members", onClick: () => onNavigate("add-staff") },
    { icon: "🔗", label: "Onboard Staff", sub: "Add existing network staff", onClick: () => onNavigate("onboard") },
    { icon: "💳", label: "Process Payments", sub: "Pay your employees", onClick: () => onNavigate("payments") },
    { icon: "☰", label: "View Directory", sub: "Browse all employees", onClick: () => onNavigate("directory") },
  ];
  return (
    <div className="dashboard-overview" style={{ minHeight: '100vh', background: '#f5f5f7', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* Welcome banner */}
      <div className="welcome-banner" style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 className="welcome-title" style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>Welcome to {user?.companyName || "Your Company"} Dashboard</h2>
        <p className="welcome-sub" style={{ color: '#666', marginBottom: '15px' }}>Get started by onboarding staff members to your organization.</p>
        
      </div>

      {/* Stat cards */}
      <div className="stats-row">
        <StatCard label="Total Employees" value="0" sub="No employees yet" icon="👥" />
        <StatCard label="New Hires" value="0" sub="This month" icon="👤" />
        <StatCard label="Monthly Payroll" value="0" prefix="₦" sub="No payroll yet" icon="💳" />
        <StatCard label="Average Rating" value="0" sub="No ratings yet" icon="★" />
      </div>

      {/* Activity + Performers */}
      <div className="mid-row">
        <ActivityFeed activities={SAMPLE_ACTIVITIES} />
        <TopPerformers />
      </div>

      {/* Quick actions */}
      <QuickActions actions={QUICK_ACTIONS} />
    </div>
  );
}