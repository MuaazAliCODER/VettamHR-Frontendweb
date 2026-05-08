import { useState } from "react";
import styles from "./StaffStatusPanel.module.css";

export default function StaffStatusPanel({
  title,
  description,
  searchPlaceholder,
  emptyMessage,
  employees = [],
}) {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredEmployees = employees.filter((employee) => {
    const searchable = `${employee.name} ${employee.role} ${employee.department} ${employee.status} ${employee.tag}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  });

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

          {employees.length > 0 ? (
            filteredEmployees.length > 0 ? (
              <div className={styles.employeeGrid}>
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className={styles.employeeCard}>
                    <div className={styles.cardTop}>
                      <div className={styles.avatar}>{employee.initials}</div>
                      <div className={styles.headerContent}>
                        <div className={styles.titleRow}>
                          <h3 className={styles.employeeName}>{employee.name}</h3>
                          <span className={styles.statusBadge}>{employee.status}</span>
                        </div>
                        <p className={styles.employeeRole}>{employee.role}</p>
                      </div>
                    </div>

                    <div className={styles.detailGroup}>
                      <span className={styles.detailLabel}>Department</span>
                      <span className={styles.detailValue}>{employee.department}</span>
                    </div>

                    <div className={styles.ratingSection}>
                      <span className={styles.detailLabel}>Rating</span>
                      <div className={styles.ratingDisplay}>
                        <span className={styles.starsRow}>
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index} className={styles.star}>
                              {index < employee.rating ? "★" : "☆"}
                            </span>
                          ))}
                        </span>
                        <span className={styles.ratingCount}>{employee.rating}</span>
                      </div>
                    </div>

                    <span className={styles.tagChip}>{employee.tag}</span>

                    <button className={styles.viewButton}>View Details</button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <p>No employees match your search.</p>
              </div>
            )
          ) : (
            <div className={styles.emptyState}>
              <p>{emptyMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
