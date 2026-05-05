import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardOverview from "./DashboardOverview";
import AddStaffMember from "./modules/AddStaffMember";
import OnBoardNetworkStaff from "./modules/OnBoardNetworkStaff";
import EmployeePayments from "./modules/EmployeePayments";
import StaffStatusPanel from "./modules/StaffStatusPanel";
import PerformanceReview from "./modules/PerformanceReview";
import Disputes from "./modules/Disputes";
import NotificationCenter from "./modules/NotificationCenter";
import "./DashboardLayout.css";

export default function DashboardLayout({ user, onSignOut }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard": return <DashboardOverview user={user} onNavigate={handleNavClick} />;
      case "add-staff": return <AddStaffMember onSuccess={() => setActiveNav("dashboard")} onCancel={() => setActiveNav("dashboard")} />;
      case "onboard": return <OnBoardNetworkStaff onSuccess={() => setActiveNav("dashboard")} onCancel={() => setActiveNav("dashboard")} />;
      case "offboard": return (
        <StaffStatusPanel
          title="Offboard Employees"
          description="Manage employee offboarding process and maintain records (0 active employees)."
          searchPlaceholder="Search employees by name, role, department, phone, or email..."
          emptyMessage="No employees are currently onboarded. Use the 'Onboard Staff' feature to add employees first."
        />
      );
      case "directory": return (
        <StaffStatusPanel
          title="Employee Directory"
          description="View and manage all onboarded employees in your organization (0 total)."
          searchPlaceholder="Search employees by name, role, department, phone, NIN, or skills..."
          emptyMessage="No employees have been onboarded yet. Use the 'Onboard Staff' feature to add employees to your directory."
        />
      );
      case "payments": return <EmployeePayments />;
      case "performance": return <PerformanceReview />;
      case "disputes": return <Disputes />;
      case "notifications": return <NotificationCenter />;
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
        onNavigate={handleNavClick}
        user={user}
        onSignOut={onSignOut}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="dashboard-wrapper">
        <div className="dashboard-header-mobile">
          <button
            className="hamburger-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            )}
          </button>
        </div>
        <main className="dashboard-main">
          <div className="dashboard-content">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}