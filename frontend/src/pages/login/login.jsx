// ... (import precedenti)

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // ... (stati loading e prenotazioni)

  const stats = [
    {
      label: "Today's Bookings",
      value: todayBookings.length,
      icon: <CalendarIcon />
    },
    {
      label: "Rooms Available",
      value: 119 - new Set(todayBookings.map(p => p.ID_AULA)).size,
      icon: <HomeIcon />
    },
    {
      label: "Total Bookings",
      value: prenotazioni.length,
      icon: <ClockIcon />
    },
    {
      label: "Classes Today",
      value: todayBookings.reduce((acc, p) => acc + (p.CLASSI?.split(',').length || 0), 0),
      icon: <UsersIcon />
    }
  ];

  return (
    <div className="db-shell">
      <Navbar />
      <div className="db-page">
        <div className="db-header">
          <div>
            <h1 className="db-title">Dashboard</h1>
            <p className="db-date">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="db-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon-wrapper">{s.icon}</div>
              <div className="stat-content">
                <span className="stat-value">{loading ? '...' : s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="db-table-container">
          <div className="table-header">
            <h3>Today's Bookings</h3>
            <p>All classroom reservations scheduled for today</p>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Room</th>
                <th>Time</th>
                <th>Classes</th>
                <th>Booked By</th>
              </tr>
            </thead>
            <tbody>
              {todayBookings.map(p => (
                <tr key={p.ID_PRENOTAZIONE}>
                  <td><strong>Room {p.NUMERO_AULA}</strong></td>
                  <td>{p.ORA_INIZIO.substring(0,5)} - {p.ORA_FINE.substring(0,5)}</td>
                  <td>
                    {p.CLASSI?.split(',').map((c, i) => (
                      <span key={i} className="badge-class">{c.trim()}</span>
                    ))}
                  </td>
                  <td>{p.EMAIL}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}