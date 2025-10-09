import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Reservations() {
  // Compute today's date in YYYY‑MM‑DD format for the date input.
  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [people, setPeople] = useState(1);
  const [total, setTotal] = useState(15);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [requests, setRequests] = useState('');
  const [reservationId, setReservationId] = useState('');

  // Update cost whenever party size changes.
  useEffect(() => {
    const perPerson = 15;
    const groupPrice = 50;
    const count = Number(people);
    const newTotal = count >= 5 ? groupPrice : count * perPerson;
    setTotal(newTotal);
  }, [people]);

  return (
    <main>
      <section className="form-section">
        <h2>Hacer una Reserva</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Selecciona tu fecha y horario preferido.  El costo de reserva en
          línea es de 15Q por persona (50Q para grupos de 5+).
        </p>
        <div className="form-grid">
          {/* Reserva details */}
          <div>
            <div className="form-group">
              <label htmlFor="date">Seleccionar Fecha</label>
              <input
                type="date"
                id="date"
                name="date"
                value={selectedDate}
                min={formatDate(new Date())}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">Horario Disponible</label>
              <select
                id="time"
                name="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                {/* Time options every 30 minutes from 11:00 to 20:00 */}
                {[
                  '11:00',
                  '11:30',
                  '12:00',
                  '12:30',
                  '13:00',
                  '13:30',
                  '14:00',
                  '14:30',
                  '15:00',
                  '15:30',
                  '16:00',
                  '16:30',
                  '17:00',
                  '17:30',
                  '18:00',
                  '18:30',
                  '19:00',
                  '19:30',
                  '20:00',
                ].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="people">Número de Personas</label>
              <select
                id="people"
                name="people"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="totalCost">Costo total (Q)</label>
              <input
                type="text"
                id="totalCost"
                value={`Q${total.toFixed(2)}`}
                readOnly
              />
            </div>
          </div>
          {/* Client information */}
          <div>
            <div className="form-group">
              <label htmlFor="name">Nombre Completo *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Teléfono *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="1234-5678"
                pattern="[0-9]{4}-[0-9]{4}"
                maxLength={9}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                title="El formato debe ser 1234-5678"
              />
            </div>
            <div className="form-group">
              <label htmlFor="requests">Solicitudes Especiales</label>
              <textarea
                id="requests"
                name="requests"
                placeholder="Alergias, preferencias dietéticas, etc."
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
              ></textarea>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
        {/* Cancel reservation */}
        <div style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            Cancelar Reserva
          </h2>
          <div className="form-group" style={{ maxWidth: '400px' }}>
            <label htmlFor="reservation-id">ID de la reserva</label>
            <input
              type="text"
              id="reservation-id"
              name="reservation-id"
              placeholder="Introduce el ID de tu reserva"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-outline" type="button">
              Cancelar Reserva
            </button>
          </div>
          <p
            style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}
          >
            Las reservas solo pueden cancelarse con al menos 2 horas de
            anticipación.
          </p>
        </div>
      </section>
    </main>
  );
}