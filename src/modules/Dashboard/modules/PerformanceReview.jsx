import { useState } from "react";
import styles from "./PerformanceReview.module.css";

const TABS = ["overdue", "dueSoon", "upcoming"];

const TAB_CONFIG = {
  overdue: {
    label: "Overdue Reviews",
    tabLabel: "Overdue",
    emptyMessage: "No overdue reviews",
    iconClass: "iconRed",
    countClass: "countRed",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },

  dueSoon: {
    label: "Due Soon",
    tabLabel: "Due Soon",
    emptyMessage: "No reviews due soon",
    iconClass: "iconAmber",
    countClass: "countAmber",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },

  upcoming: {
    label: "Upcoming",
    tabLabel: "Upcoming",
    emptyMessage: "No upcoming reviews",
    iconClass: "iconBlue",
    countClass: "countBlue",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
};

const stats = {
  overdue: 0,
  dueSoon: 0,
  upcoming: 0,
};

const reviews = {
  overdue: [],
  dueSoon: [],
  upcoming: [],
};

export default function PerformanceReview() {
  const [activeTab, setActiveTab] = useState("overdue");

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6b7280"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
        </div>

        <div className={styles.headerText}>
          <h2 className={styles.title}>Performance Review System</h2>

          <p className={styles.subtitle}>
            Manage 6-month performance reviews for all employees
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {TABS.map((tab) => {
          const cfg = TAB_CONFIG[tab];

          return (
            <div
              key={tab}
              className={`${styles.statCard} ${
                activeTab === tab ? styles.statCardActive : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              <div
                className={`${styles.statIcon} ${styles[cfg.iconClass]}`}
              >
                {cfg.icon}
              </div>

              <div>
                <p className={styles.statLabel}>{cfg.label}</p>

                <p
                  className={`${styles.statCount} ${
                    styles[cfg.countClass]
                  }`}
                >
                  {stats[tab]}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className={styles.tabsWrap}>
        {TABS.map((tab) => {
          const cfg = TAB_CONFIG[tab];

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tabBtn} ${
                activeTab === tab ? styles.tabBtnActive : ""
              }`}
            >
              {cfg.icon}
              {cfg.tabLabel} ({stats[tab]})
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className={styles.contentArea}>
        {reviews[activeTab].length === 0 ? (
          <div className={styles.emptyState}>
            <svg
              className={styles.emptyIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>

            <p className={styles.emptyText}>
              {TAB_CONFIG[activeTab].emptyMessage}
            </p>
          </div>
        ) : (
          <div className={styles.reviewsList}>
            {/* Reviews Here */}
          </div>
        )}
      </div>
    </div>
  );
}