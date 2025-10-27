
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function EmployeeLogin() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [reservations, setReservations] = useState([
    { id: 'R-001', date: '2025-10-08', time: '18:30', people: 4, status: 'confirmed', arrived: false },
    { id: 'R-002', date: '2025-10-08', time: '19:00', people: 2, status: 'canceled', arrived: false },
    { id: 'R-003', date: '2025-10-09', time: '12:00', people: 6, status: 'confirmed', arrived: true },
  ]);


  const totalCount = reservations.length;
  const canceledCount = reservations.filter((r) => r.status === 'canceled').length;
  const arrivedCount = reservations.filter((r) => r.arrived && r.status === 'confirmed').length;
  const pendingCount = reservations.filter((r) => !r.arrived && r.status === 'confirmed').length;


  function markArrived(id) {
    setReservations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, arrived: true } : r))
    );
  }


  function handleLogin(event) {
    event.preventDefault();

    setLoggedIn(true);
  }

  if (!loggedIn) {
    return (
        <main>
          <section className="login-section">
            <div className="login-card">
              <h2>Panel de Empleados</h2>
              <p style={{ textAlign: 'center', marginBottom: '1rem' }}>
                Accede para gestionar las reservas del restaurante.
              </p>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="username">Usuario</label>
                  <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Nombre de usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    Iniciar Sesión
                  </button>
                </div>
              </form>
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/" style={{ color: 'var(--primary)' }}>
                  ← Volver al Inicio
                </Link>
              </div>
            </div>
          </section>
        </main>
    );
  }


  return (
      <main>
        <section className="login-section">
          <div className="login-card" style={{ width: '100%', maxWidth: '960px' }}>
            <h2>Resumen de Reservas</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              Aquí puedes ver todas las reservas activas, verificar si han sido
              canceladas y marcar cuando un cliente ha llegado.
            </p>


            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <div className="summary-card">
                <strong>Total:</strong> {totalCount}
              </div>
              <div className="summary-card">
                <strong>Canceladas:</strong> {canceledCount}
              </div>
              <div className="summary-card">
                <strong>En espera:</strong> {pendingCount}
              </div>
              <div className="summary-card">
                <strong>Llegaron:</strong> {arrivedCount}
              </div>
            </div>
            {/* Reservations table */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>ID</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Fecha</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Hora</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Personas</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Estado</th>
                <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>Acción</th>
              </tr>
              </thead>
              <tbody>
              {reservations.map((res) => (
                  <tr key={res.id} style={{ opacity: res.status === 'canceled' ? 0.5 : 1 }}>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{res.id}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{res.date}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{res.time}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>{res.people}</td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                      {res.status === 'canceled' ? 'Cancelada' : res.arrived ? 'Llegó' : 'Confirmada'}
                    </td>
                    <td style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                      {res.status === 'confirmed' && !res.arrived ? (
                          <button
                              className="btn btn-primary"
                              onClick={() => markArrived(res.id)}
                              style={{ fontSize: '0.85rem', padding: '0.3rem 0.6rem' }}
                          >
                            Marcar llegada
                          </button>
                      ) : (
                          <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
  );
}