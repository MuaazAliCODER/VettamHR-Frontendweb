import StatCard from "./components/StatCard";
import ActivityFeed from "./components/ActivityFeed";
import TopPerformers from "./components/TopPerformers";
import QuickActions from "./components/QuickActions";
import "./DashboardOverview.css";

export default function DashboardOverview({ user }) {
  const SAMPLE_ACTIVITIES = [
    { name: "Welcome to your dashboard", detail: user?.email || "user@example.com", time: "Now" },
    { name: "Ready to onboard staff", detail: "System", time: "Now" },
  ];
  return (
    <div className="dashboard-overview">
      {/* Welcome banner */}
      <div className="welcome-banner">
        <h2 className="welcome-title">Welcome to {user?.companyName || "Your Company"} Dashboard</h2>
        <p className="welcome-sub">Get started by onboarding staff members to your organization.</p>
        <div className="user-info">
          <p className="user-email">Account: {user?.email || "user@example.com"}</p>
          <p className="user-plan">Plan: {user?.plan || "Professional"} ({user?.billingCycle || "Monthly"})</p>
        </div>
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