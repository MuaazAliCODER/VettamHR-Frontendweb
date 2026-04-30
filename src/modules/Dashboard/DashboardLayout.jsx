import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./DashboardOverview";
import "./DashboardLayout.css";

export default function DashboardLayout({ user, onSignOut }) {
  const [activeNav, setActiveNav] = useState("dashboard");

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard": return <DashboardOverview user={user} />;
      // Add more cases as you build more pages:
      // case "add-staff": return <AddStaff />;
      // case "directory": return <EmployeeDirectory />;
      default:
        return (
          <div className="coming-soon">
            <p>🚧 This section is coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar
        activeId={activeNav}
        onNavigate={setActiveNav}
        user={user}
        onSignOut={onSignOut}
      />
      <main className="dashboard-main">
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}