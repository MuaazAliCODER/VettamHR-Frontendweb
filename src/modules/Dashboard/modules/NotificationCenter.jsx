import { useState } from "react";
import styles from "./NotificationCenter.module.css";

const FILTERS = ["All", "Unread", "Reviews Due", "Overdue", "Completed", "Disputes"];

function getNotificationIcon(type) {
  switch (type) {
    case "reviews due":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="11" x2="12" y2="17"/>
          <line x1="9" y1="14" x2="15" y2="14"/>
        </svg>
      );
    case "overdue":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
      );
    case "completed":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      );
    case "disputes":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
      );
  }
}

export default function NotificationCenter() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications] = useState([]);

  const filtered = notifications.filter((n) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "unread") return !n.read;
    return n.type?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerIcon}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </div>
        <div>
          <h1 className={styles.title}>Notification Center</h1>
          <p className={styles.subtitle}>
            Stay updated on employee review schedules, disputes, and important reminders
          </p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className={styles.filters}>
        {FILTERS.map((f) => {
          const key = f.toLowerCase();
          return (
            <button
              key={key}
              className={`${styles.filterBtn} ${activeFilter === key ? styles.filterBtnActive : ""}`}
              onClick={() => setActiveFilter(key)}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#c4c9d4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <p className={styles.emptyText}>No notifications yet</p>
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map((notif) => (
              <div
                key={notif.id}
                className={`${styles.item} ${!notif.read ? styles.itemUnread : ""}`}
              >
                <div className={styles.itemIcon}>
                  {getNotificationIcon(notif.type)}
                </div>
                <div className={styles.itemBody}>
                  <h3 className={styles.itemTitle}>{notif.title}</h3>
                  <p className={styles.itemMessage}>{notif.message}</p>
                  <p className={styles.itemTime}>{notif.time}</p>
                </div>
                {!notif.read && <span className={styles.dot} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}