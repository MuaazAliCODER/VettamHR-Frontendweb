import { useState } from "react";
import styles from "./EmployeePayments.module.css";

const tabs = [
  { id: "make", label: "Make Payment" },
  { id: "bulk", label: "Bulk Payment" },
  { id: "history", label: "Payment History" },
];

const paymentHistory = [
  { id: 1, name: "John Doe", amount: "₦450,000.00", date: "Jan 1, 2024", method: "Bank Transfer", status: "Completed" },
  { id: 2, name: "Jane Smith", amount: "₦380,000.00", date: "Jan 1, 2024", method: "Bank Transfer", status: "Completed" },
  { id: 3, name: "Mike Johnson", amount: "₦420,000.00", date: "Jan 1, 2024", method: "Bank Transfer", status: "Pending" },
  { id: 4, name: "John Doe", amount: "₦450,000.00", date: "Dec 1, 2023", method: "Bank Transfer", status: "Completed" },
  { id: 5, name: "Jane Smith", amount: "₦380,000.00", date: "Dec 1, 2023", method: "Bank Transfer", status: "Failed" },
];

const statusClass = (status) => {
  if (status === "Completed") return styles.statusComplete;
  if (status === "Pending") return styles.statusPending;
  if (status === "Failed") return styles.statusFailed;
  return styles.statusDefault;
};

export default function EmployeePayments() {
  const [activeTab, setActiveTab] = useState("make");

  return (
    <div className={styles.wrapper}>
      <div className={styles.panel}>
        <div className={styles.tabBar}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.activeTab : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "make" && (
          <div className={styles.contentBlock}>
            <div className={styles.headlineRow}>
              <h2>Make Employee Payment</h2>
              <p>Send payments to individual employees (0 total employees)</p>
            </div>

            <div className={styles.sourceCard}>
              <p className={styles.sourceLabel}>
                <svg className={styles.sourceLabelIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/>
                </svg>
                Payment Source
              </p>

              <div className={styles.sourceInfo}>
                <div className={styles.sourceRow}>
                  <span className={styles.sourceName}>Account Name:</span>
                  <span className={styles.sourceValue}>TechCorp Nigeria Limited</span>
                </div>
                <div className={styles.sourceRow}>
                  <span className={styles.sourceName}>Account Number:</span>
                  <span className={styles.sourceValue}>0123456789</span>
                </div>
                <div className={styles.sourceRow}>
                  <span className={styles.sourceName}>Bank:</span>
                  <span className={styles.sourceValue}>Access Bank</span>
                </div>
              </div>

              <p className={styles.sourceNote}>
                <svg className={styles.sourceNoteIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth="2.5"/>
                  <line x1="12" y1="12" x2="12" y2="16"/>
                </svg>
                All payments will be processed from this default account. You can manage your bank accounts in{" "}
                <a href="#" className={styles.sourceLink}>Subscription &amp; Billing</a>.
              </p>
            </div>

            <div className={styles.emptyState}>
              No employees are currently onboarded. Use the "Onboard Staff" feature to add employees first.
            </div>
          </div>
        )}

        {activeTab === "bulk" && (
          <div className={styles.contentBlock}>
            <div className={styles.headlineRow}>
              <h2>Bulk Payment</h2>
              <p>Pay multiple employees at once (e.g., monthly salaries)</p>
            </div>
            <div className={styles.emptyState}>
              No employees are currently onboarded. Use the "Onboard Staff" feature to add employees first.
            </div>
          </div>
        )}

        {activeTab === "history" && (
          <div className={styles.contentBlock}>
            <div className={styles.headlineRow}>
              <h2>Payment History</h2>
              <p>View all payment transactions</p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.paymentTable}>
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((row) => (
                    <tr key={row.id}>
                      <td className={styles.employeeCell}>
                        <span className={styles.avatar}>
                          {row.name.split(" ").map((part) => part[0]).join("")}
                        </span>
                        <span>{row.name}</span>
                      </td>
                      <td>{row.amount}</td>
                      <td>{row.date}</td>
                      <td>{row.method}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${statusClass(row.status)}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}