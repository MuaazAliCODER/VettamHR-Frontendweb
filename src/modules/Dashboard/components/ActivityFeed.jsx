import "./ActivityFeed.css";

export default function ActivityFeed({ activities = [] }) {
  return (
    <div className="activity-feed">
      <div className="section-header">
        <h3 className="section-title">Recent Activities</h3>
        <p className="section-sub">Latest updates in your staff management</p>
      </div>
      <div className="activity-list">
        {activities.length === 0 ? (
          <p className="activity-empty">No recent activities</p>
        ) : (
          activities.map((item, i) => (
            <div key={i} className="activity-item">
              <div className="activity-avatar">
                {item.avatar || <span>{item.name?.[0] || "•"}</span>}
              </div>
              <div className="activity-body">
                <p className="activity-name">{item.name}</p>
                <p className="activity-detail">{item.detail}</p>
              </div>
              <span className="activity-time">{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}