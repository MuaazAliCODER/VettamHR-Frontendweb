import "./TopPerformers.css";

export default function TopPerformers({ performers = [] }) {
  const placeholders = [
    { rank: 1, name: "No employees yet", sub: "Onboard staff to see" },
    { rank: 2, name: "Performance data", sub: "Will appear here" },
    { rank: 3, name: "Top performers", sub: "Coming soon" },
  ];

  const items = performers.length ? performers : placeholders;

  return (
    <div className="top-performers">
      <div className="section-header">
        <h3 className="section-title">Top Performers</h3>
        <p className="section-sub">Employee performance tracking</p>
      </div>
      <div className="performers-list">
        {items.map((p, i) => (
          <div key={i} className="performer-item">
            <div className={`rank-badge rank-${p.rank}`}>#{p.rank}</div>
            <div className="performer-body">
              <p className="performer-name">{p.name}</p>
              <p className="performer-sub">{p.sub}</p>
            </div>
            {p.score && <span className="performer-score">{p.score}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}