import { useState } from "react";
import styles from "./Disputes.module.css";

export default function Disputes() {
  const [selectedDispute, setSelectedDispute] = useState(null);
  const [disputes] = useState([]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Disputes</h1>
        <p className={styles.subtitle}>Manage disputes raised by your staff</p>
      </div>

      <div className={styles.layout}>
        {/* Left Panel — All Disputes */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>All Disputes</h2>
            <p className={styles.panelMeta}>{disputes.length} total disputes</p>
          </div>

          <div className={styles.panelBody}>
            {disputes.length === 0 ? (
              <div className={styles.emptyState}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <p className={styles.emptyText}>No disputes yet</p>
              </div>
            ) : (
              <div className={styles.disputesList}>
                {disputes.map((dispute) => (
                  <div
                    key={dispute.id}
                    className={`${styles.disputeItem} ${selectedDispute?.id === dispute.id ? styles.disputeItemActive : ""}`}
                    onClick={() => setSelectedDispute(dispute)}
                  >
                    <h3 className={styles.itemTitle}>{dispute.title}</h3>
                    <p className={styles.itemEmployee}>{dispute.employeeName}</p>
                    <span className={`${styles.badge} ${styles[dispute.status.toLowerCase()]}`}>
                      {dispute.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel — Dispute Details */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2 className={styles.panelTitle}>Dispute Details</h2>
            <p className={styles.panelMeta}>Select a dispute to view details</p>
          </div>

          <div className={styles.panelBody}>
            {!selectedDispute ? (
              <div className={styles.emptyState}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <p className={styles.emptyText}>Select a dispute to view details</p>
              </div>
            ) : (
              <div className={styles.details}>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Employee</span>
                  <span className={styles.detailValue}>{selectedDispute.employeeName}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Status</span>
                  <span className={`${styles.badge} ${styles[selectedDispute.status.toLowerCase()]}`}>
                    {selectedDispute.status}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date Raised</span>
                  <span className={styles.detailValue}>{selectedDispute.dateRaised}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Description</span>
                  <p className={styles.detailDescription}>{selectedDispute.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}