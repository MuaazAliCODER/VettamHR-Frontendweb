import { useState } from "react";
import styles from "./StaffStatusPanel.module.css";

export default function StaffStatusPanel({
  title,
  description,
  searchPlaceholder,
  emptyMessage,
}) {
  const [query, setQuery] = useState("");

  return (
    <div className={styles.panelWrapper}>
      <div className={styles.panelCard}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{description}</p>
          </div>
        </div>

        <div className={styles.contentArea}>
          <label className={styles.searchLabel}>Search employees</label>
          <div className={styles.searchField}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.searchIcon}
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className={styles.searchInput}
              type="search"
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search employees"
            />
          </div>

          <div className={styles.emptyState}>
            <p>{emptyMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
