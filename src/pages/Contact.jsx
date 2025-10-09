import { Link } from 'react-router-dom';

/**
 * Contact page component.  Presents the restaurant's contact information
 * including address, phone numbers, email addresses, business hours and
 * special notes.  A call to action encourages visitors to make a
 * reservation directly from the contact page.
 */
export default function Contact() {
  return (
    <main>
      <section className="contact-section">
        <h2>Contáctanos</h2>
        <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Estamos aquí para atenderte.  Contáctanos para reservas, consultas
          o cualquier información que necesites.
        </p>
        <div className="contact-grid">
          {/* Dirección */}
          <div className="contact-card">
            <h3>Dirección</h3>
            <p>
              Zona 10, Ciudad de Guatemala<br />6a Avenida&nbsp;12‑23, Local&nbsp;4
              <br />Edificio Plaza Oriental
            </p>
          </div>
          {/* Teléfonos */}
          <div className="contact-card">
            <h3>Teléfonos</h3>
            <p>
              +502&nbsp;2334‑5678<br />+502&nbsp;5678‑9012<br />WhatsApp:
              +502&nbsp;4123‑5678
            </p>
          </div>
          {/* Correo Electrónico */}
          <div className="contact-card">
            <h3>Correo Electrónico</h3>
            <p>
              info@goldenchopsticks.gt<br />reservas@goldenchopsticks.gt
              <br />eventos@goldenchopsticks.gt
            </p>
          </div>
          {/* Horarios */}
          <div className="contact-card">
            <h3>Horarios de Atención</h3>
            <p>
              Lunes a Domingo: 11:00&nbsp;AM ‑ 10:00&nbsp;PM<br />Cocina
              cierra: 9:30&nbsp;PM<br />Último turno de reservas:
              8:30&nbsp;PM
            </p>
          </div>
          {/* Estacionamiento */}
          <div className="contact-card">
            <h3>Estacionamiento</h3>
            <p>Parking gratuito disponible para nuestros clientes.</p>
          </div>
          {/* Servicio a Domicilio */}
          <div className="contact-card">
            <h3>Servicio a Domicilio</h3>
            <p>Delivery disponible en un radio de 10&nbsp;km.</p>
          </div>
          {/* Notas Especiales */}
          <div className="contact-card" style={{ gridColumn: 'span 2' }}>
            <h3>Notas Especiales</h3>
            <p>
              <strong>Reservas:</strong> Las reservas en línea tienen un costo
              adicional de Q15 por persona (Q50 para grupos de 5+).
            </p>
            <p>
              <strong>Cancelación:</strong> Las cancelaciones deben
              realizarse con al menos 2 horas de anticipación.
            </p>
            <p>
              <strong>Capacidad:</strong> Máximo 8 personas por mesa.
              Para grupos más grandes, contactar directamente.
            </p>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="cta">
        <h2>¿Listo para visitarnos?</h2>
        <p>
          Haz tu reserva ahora y experimenta los auténticos sabores de la cocina
          china.
        </p>
        <Link to="/reservas" className="btn btn-primary">
          Hacer Reserva
        </Link>
      </section>
    </main>
  );
}