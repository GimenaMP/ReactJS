import { useEffect, useMemo, useState } from 'react';
import supabase from "../lib/supabaseClient.js";
import AlertMessage from "../components/AlertMessage.jsx";

const fmtDateGT = (d = new Date()) => {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Guatemala',
    year: 'numeric', month: '2-digit', day: '2-digit',
  });
  return f.format(d);
};

const nowInGT = () => {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Guatemala',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  });
  const parts = Object.fromEntries(f.formatToParts(new Date()).map(x => [x.type, x.value]));
  return new Date(`${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}-06:00`);
};

const isPastSlotGT = (dateStr, hhmm) => {
  const slotDT = new Date(`${dateStr}T${hhmm}:00-06:00`);
  return slotDT <= nowInGT();
};

const hhmmToHHMMSS = (hhmm) => (/^\d{2}:\d{2}$/.test(hhmm) ? `${hhmm}:00` : hhmm);

const TIME_SLOTS = [
  '11:00','11:30','12:00','12:30','13:00','13:30',
  '14:00','14:30','15:00','15:30','16:00','16:30',
  '17:00','17:30','18:00','18:30','19:00','19:30','20:00',
];

export default function Reservations() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const todayGT = useMemo(() => fmtDateGT(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(() => todayGT);
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [people, setPeople] = useState(1);
  const [requests, setRequests] = useState('');

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  const [reservationId, setReservationId] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [message, setMessage] = useState('');

  const total = useMemo(() => {
    const perPerson = 15;
    const groupPrice = 50;
    const n = Number(people || 1);
    return n >= 5 ? groupPrice : n * perPerson;
  }, [people]);

  // Sesión + perfil
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user || null);
      if (!user) return;
      const { data: prof, error } = await supabase
          .from('profiles')
          .select('full_name, email, phone')
          .eq('user_id', user.id)
          .single();
      if (!error && prof) setProfile(prof);
    })();
  }, []);

  // Cargar slots (usa RPC que cuenta RESERVAS)
  const loadSlots = async (dateStr) => {
    setLoadingSlots(true);
    const { data, error } = await supabase.rpc('get_availability', { p_date: dateStr });
    if (error) {
      console.error('get_availability error:', error.message);
      setSlots([]);
    } else {
      const norm = (data || []).map(row => ({
        slot: String(row.slot).slice(0, 5),
        remaining: row.remaining
      }));
      setSlots(norm);
    }
    setLoadingSlots(false);
  };

  // Carga inicial por fecha
  useEffect(() => { loadSlots(selectedDate); }, [selectedDate]);

  // Polling 7s
  useEffect(() => {
    let alive = true;
    const id = setInterval(() => { if (alive) loadSlots(selectedDate); }, 7000);
    return () => { alive = false; clearInterval(id); };
  }, [selectedDate]);

  const firstName = useMemo(() => (profile?.full_name?.trim()?.split(/\s+/)[0]) || '', [profile]);

  const isDateSoldOut = useMemo(() => {
    if (!slots?.length) return false;
    return slots.every(s => s.remaining === 0);
  }, [slots]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!user) return setMessage('Debes iniciar sesión para reservar.');
    if (isDateSoldOut) return setMessage('No hay horarios disponibles para esta fecha.');

    const current = slots.find(s => s.slot === selectedTime);
    if (!current || current.remaining <= 0) return setMessage('Ese horario ya no está disponible, elige otro.');
    if (!profile?.email || !profile?.full_name || !profile?.phone) return setMessage('Completa tu perfil (nombre, email y teléfono).');
    if (selectedDate === todayGT && isPastSlotGT(selectedDate, selectedTime)) return setMessage('Ese horario ya pasó hoy.');

    setSubmitting(true);
    try {
      const payload = {
        user_id: user.id,
        date: selectedDate,
        time: hhmmToHHMMSS(selectedTime),
        people: Number(people),
        notes: requests?.trim() || null,
      };

      const { data: inserted, error: insErr } = await supabase
          .from('reservations')
          .insert(payload)
          .select('id, confirmation_code, date, time, people, notes')
          .single();

      if (insErr) throw insErr;

      const newId = inserted.id;
      const newCode = inserted.confirmation_code;
      const newDate = inserted.date;
      const newTime = String(inserted.time).slice(0, 5);
      const newPeople = inserted.people;
      const newNotes = inserted.notes || '';

      const { error: fnErr } = await supabase.functions.invoke('send-reservation-email', {
        body: {
          type: 'confirm',
          to: profile.email,
          name: profile.full_name,
          reservation_id: newId,
          confirmation_code: newCode,
          date: newDate,
          time: newTime,
          people: newPeople,
          total_q: total,
          notes: newNotes,
        },
      });
      if (fnErr) console.warn('No se pudo enviar el correo:', fnErr);

      setReservationId(newId);
      setMessage(`¡Reserva confirmada! ID: ${newId}. Revisa tu correo para los detalles.`);
      await loadSlots(selectedDate);
    } catch (err) {
      setMessage(err?.message || 'No se pudo crear la reserva.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setMessage('');
    if (!user) return setMessage('Debes iniciar sesión para cancelar.');
    if (!reservationId) return setMessage('Ingresa el ID de la reserva.');
    if (!confirmationCode) return setMessage('Ingresa el código de confirmación.');

    setCanceling(true);
    try {
      const { data, error } = await supabase.rpc('cancel_reservation', {
        p_id: reservationId,
        p_code: confirmationCode.trim(),
      });
      if (error) throw error;

      if (data) {
        setMessage('Reserva cancelada correctamente.');

        const { error: fnErr } = await supabase.functions.invoke('send-reservation-email', {
          body: {
            type: 'cancel',
            to: profile.email,
            name: profile.full_name,
            reservation_id: reservationId,
            confirmation_code: confirmationCode.trim(),
            date: selectedDate,
            time: selectedTime,
            people: Number(people),
            notes: requests?.trim() || "",
          },
        });
        if (fnErr) console.warn("Correo de cancelación falló:", fnErr);

        await loadSlots(selectedDate);
        setConfirmationCode('');
        setShowCancelModal(false);
      } else {
        setMessage('No se pudo cancelar la reserva (verifica ID/código o ventana de 2 horas).');
      }
    } catch (err) {
      setMessage(err?.message || 'Error al cancelar.');
    } finally {
      setCanceling(false);
    }
  };

  // Prefill y modal cancel
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const rid = q.get('rid');
    const code = q.get('code');
    const cancel = q.get('cancel');
    if (rid) setReservationId(rid);
    if (code) setConfirmationCode(code);
    if (rid && (code || cancel === '1')) setShowCancelModal(true);
  }, []);

  // ESC cierra modal
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setShowCancelModal(false); };
    if (showCancelModal) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showCancelModal]);

  return (
      <main className="gc-root">
        {/* Barra fija resumen */}
        <div className="gc-bar">
          <div className="gc-bar-content">
            <span className="gc-dot" aria-hidden />
            <span className="gc-bar-item">Fecha: <strong>{selectedDate}</strong></span>
            <span className="gc-sep" />
            <span className="gc-bar-item">Hora: <strong>{selectedTime}</strong></span>
            <span className="gc-sep" />
            <span className="gc-bar-item">Total: <strong>Q{total.toFixed(2)}</strong></span>
          </div>
        </div>

        <section className="gc-card" aria-live="polite">
          <header className="gc-header">
            <h2 className="gc-title">
              {firstName ? `¡Bienvenido, ${firstName}! ` : 'Hacer una Reserva'}
            </h2>
            <p className="gc-subtitle"></p>
          </header>

          {isDateSoldOut && (
              <p className="gc-alert">No hay horarios disponibles para esta fecha.</p>
          )}

          <form onSubmit={handleSubmit} className="gc-grid">
            {/* Columna izquierda */}
            <div>
              <div className="gc-group">
                <label htmlFor="date">Seleccionar Fecha</label>
                <input
                    type="date" id="date" name="date"
                    value={selectedDate} min={todayGT}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="gc-input"
                />
              </div>

              <div className="gc-group">
                <label>Horarios</label>

                {/* Skeleton de carga */}
                {loadingSlots && (
                    <div className="gc-slots">
                      {TIME_SLOTS.map((t) => (
                          <div key={t} className="gc-skeleton" aria-hidden />
                      ))}
                    </div>
                )}

                {!loadingSlots && (
                    <div className="gc-slots">
                      {(slots.length ? slots : TIME_SLOTS.map(t => ({ slot: t, remaining: 4 }))).map(s => {
                        const disabled = s.remaining === 0 || (selectedDate === todayGT && isPastSlotGT(selectedDate, s.slot));
                        const active = selectedTime === s.slot;

                        return (
                            <button
                                key={s.slot}
                                type="button"
                                onClick={(e) => {
                                  if (!disabled) {
                                    setSelectedTime(s.slot);
                                    // ripple
                                    const r = document.createElement('span');
                                    r.className = 'gc-ripple';
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    r.style.left = `${e.clientX - rect.left}px`;
                                    r.style.top  = `${e.clientY - rect.top}px`;
                                    e.currentTarget.appendChild(r);
                                    setTimeout(() => r.remove(), 500);
                                  }
                                }}
                                disabled={disabled}
                                className={`gc-slot ${active ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''}`}
                                title={
                                  disabled
                                      ? (s.remaining === 0 ? 'Sin reservas disponibles' : 'Horario ya pasó hoy')
                                      : `Reservas libres: ${s.remaining}/4`
                                }
                                aria-pressed={active}
                            >
                              <span className="gc-slot-time">{s.slot}</span>
                              <span className={`gc-badge ${s.remaining >= 3 ? 'ok' : s.remaining === 2 ? 'mid' : 'low'}`}>
                          {s.remaining}/4
                        </span>
                            </button>
                        );
                      })}
                    </div>
                )}
              </div>

              <div className="gc-group">
                <label htmlFor="people">Número de Personas</label>
                <select
                    id="people" name="people"
                    value={people} onChange={(e) => setPeople(Number(e.target.value))}
                    className="gc-input"
                >
                  {[1,2,3,4,5,6,7,8].map(n => (
                      <option key={n} value={n}>{n} {n===1 ? 'persona' : 'personas'}</option>
                  ))}
                </select>
              </div>

              <div className="gc-group">
                <label>Costo total (Q)</label>
                <input className="gc-input" type="text" value={`Q${total.toFixed(2)}`} readOnly />
              </div>
            </div>

            {/* Columna derecha */}
            <div>
              <div className="gc-group">
                <label>Nombre Completo *</label>
                <input className="gc-input" type="text" value={profile?.full_name || ''} readOnly />
              </div>
              <div className="gc-group">
                <label>Correo Electrónico *</label>
                <input className="gc-input" type="email" value={profile?.email || ''} readOnly />
              </div>
              <div className="gc-group">
                <label>Teléfono *</label>
                <input className="gc-input" type="tel" value={profile?.phone || ''} readOnly />
              </div>

              <div className="gc-group">
                <label>Descripción / Solicitudes</label>
                <textarea
                    className="gc-input"
                    value={requests}
                    onChange={(e) => setRequests(e.target.value)}
                    placeholder="Alergias, mesas, cumpleaños, etc."
                />
              </div>

              <div className="gc-actions">
                <button className="gc-btn gc-primary" type="submit" disabled={submitting || isDateSoldOut}>
                  {submitting ? 'Confirmando…' : 'Confirmar Reserva'}
                </button>
                <button
                    className="gc-btn gc-outline"
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                >
                  Cancelar Reserva
                </button>
              </div>
              <p className="gc-note">Las reservas solo pueden cancelarse con al menos 2 horas de anticipación.</p>
            </div>
          </form>

          <AlertMessage text={message} />
        </section>

        {/* Modal cancelación */}
        {showCancelModal && (
            <div className="gc-overlay" onClick={(e) => { if (e.target.classList.contains('gc-overlay')) setShowCancelModal(false); }}>
              <div className="gc-modal">
                <button type="button" className="gc-close" onClick={() => setShowCancelModal(false)} aria-label="Cerrar">×</button>
                <h3 className="gc-modal-title">Cancelar Reserva</h3>

                <div className="gc-group">
                  <label>ID de la reserva</label>
                  <input className="gc-input" value={reservationId} onChange={(e) => setReservationId(e.target.value)} placeholder="ID recibido por correo" autoFocus />
                </div>
                <div className="gc-group">
                  <label>Código de confirmación</label>
                  <input className="gc-input" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} placeholder="Código recibido por correo" />
                </div>

                <div className="gc-actions center">
                  <button className="gc-btn gc-primary" onClick={handleCancel} disabled={canceling}>
                    {canceling ? 'Cancelando…' : 'Confirmar Cancelación'}
                  </button>
                  <button className="gc-btn gc-outline" onClick={() => setShowCancelModal(false)}>Cerrar</button>
                </div>
              </div>
            </div>
        )}

        {/* Estilos modernos */}
        <style>{`
        :root{
          --bg: #0f0f12;
          --card: rgba(255,255,255,0.08);
          --card-2: rgba(255,255,255,0.10);
          --txt: #f6f6f6;
          --muted: #b5b5b8;
          --primary: #ea2a33;
          --ok:#16a34a; --mid:#f59e0b; --low:#dc2626;
          --ring: 0 0 0 2px rgba(234,42,51,.35), 0 8px 20px rgba(234,42,51,.25);
        }
        *{box-sizing:border-box}
        body{background:
          radial-gradient(1200px 600px at 20% -10%, rgba(234,42,51,.30), transparent 60%),
          radial-gradient(900px 500px at 120% 20%, rgba(255,255,255,.08), transparent 60%),
          #0b0b0d;
          color: var(--txt);
        }

        .gc-root{padding: 6rem 1rem 4rem; min-height: 100dvh;}
        .gc-bar{
          position: sticky; top: 0; z-index: 50;
          backdrop-filter: blur(10px);
          background: linear-gradient(180deg, rgba(10,10,12,.75), rgba(10,10,12,.35));
          border-bottom: 1px solid rgba(255,255,255,.08);
        }
        .gc-bar-content{max-width: 1100px; margin: 0 auto; display:flex; align-items:center; gap:.75rem; padding:.6rem 1rem; font-size:.95rem;}
        .gc-dot{width:8px;height:8px;border-radius:999px;background:var(--primary);box-shadow:0 0 10px var(--primary);}
        .gc-sep{flex:0 0 1px; height:16px; background:rgba(255,255,255,.12)}
        .gc-bar-item strong{color:#fff}

        .gc-card{
          max-width: 1100px; margin: 1.5rem auto;
          background: linear-gradient(180deg, var(--card), var(--card-2));
          border: 1px solid rgba(255,255,255,.12);
          box-shadow: 0 20px 40px rgba(0,0,0,.35);
          backdrop-filter: blur(16px);
          border-radius: 18px; padding: 1.25rem 1.25rem 1.75rem;
          animation: cardIn .35s ease both;
          background: rgba(20, 20, 25, 0.6);
        }
        @keyframes cardIn { from {opacity:0; transform: translateY(8px);} to{opacity:1; transform:none;} }

        .gc-header{ text-align:center; margin: .5rem 0 1rem;  background: rgba(20, 20, 25, 0.6);}
        .gc-title{ font-size: clamp(1.3rem, 1.5vw + 1rem, 2rem); margin:0;}
        .gc-subtitle{ color: var(--muted); margin:.25rem 0 0}
        .gc-alert{ color: #ffb4b4; text-align:center; margin: .4rem 0 .8rem}

        .gc-grid{ display:grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        @media (max-width: 900px){ .gc-grid{ grid-template-columns: 1fr; } }

        .gc-group{ display:grid; gap:.35rem; margin-bottom: .75rem}
        .gc-input{
          width:100%; padding:.8rem .9rem; border-radius: 12px;
          border:1px solid rgba(255,255,255,.12);
          background: rgba(255,255,255,.06); color:#fff;
          outline:none; transition: box-shadow .2s, transform .1s;
        }
        .gc-input:focus{ box-shadow: var(--ring); transform: translateY(-1px); }

        .gc-slots{ display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:.6rem; }
        @media (max-width: 520px){ .gc-slots{ grid-template-columns: repeat(2,1fr);} }

        .gc-slot{
          position:relative; display:flex; align-items:center; justify-content:space-between;
          padding:.65rem .75rem; border-radius:12px; border:1px solid rgba(255,255,255,.10);
          background: rgba(255,255,255,.05); color:#fff; cursor:pointer;
          transition: transform .08s ease, box-shadow .2s ease, background .2s ease, border-color .2s ease;
          overflow:hidden;
        }
        .gc-slot:hover{ box-shadow: 0 8px 24px rgba(0,0,0,.28); background: rgba(255,255,255,.08); }
        .gc-slot:active{ transform: translateY(1px) scale(.98); }
        .gc-slot.is-active{ border-color: rgba(234,42,51,.75); box-shadow: var(--ring); }
        .gc-slot.is-disabled{ color:#9a9aa1; background: rgba(255,255,255,.04); cursor:not-allowed; }

        .gc-slot-time{ font-weight: 600; letter-spacing:.2px; }
        .gc-badge{
          display:inline-flex; align-items:center; justify-content:center;
          min-width: 46px; height: 28px; padding: 0 .5rem; border-radius: 999px;
          font-weight:700; font-size:.85rem; letter-spacing:.2px;
          background: rgba(255,255,255,.10); border:1px solid rgba(255,255,255,.12);
        }
        .gc-badge.ok { background: rgba(22,163,74,.18); border-color: rgba(22,163,74,.35); }
        .gc-badge.mid{ background: rgba(245,158,11,.18); border-color: rgba(245,158,11,.35); }
        .gc-badge.low{ background: rgba(220,38,38,.18); border-color: rgba(220,38,38,.35); }

        .gc-ripple{
          position:absolute; width:10px; height:10px; border-radius:50%;
          background: radial-gradient(circle, rgba(255,255,255,.35), transparent 60%);
          transform: translate(-50%,-50%); animation: ripple .5s ease;
          pointer-events:none;
        }
        @keyframes ripple{
          from{opacity:.7; width:10px; height:10px;}
          to{opacity:0; width:200px; height:200px;}
        }
        @media (prefers-reduced-motion: reduce){
          .gc-slot, .gc-input{ transition:none; }
          .gc-ripple{ display:none; }
        }

        .gc-actions{ display:flex; gap:.6rem; flex-wrap:wrap; }
        .gc-actions.center{ justify-content:center; }
        .gc-btn{
          padding:.75rem 1rem; border-radius:12px; font-weight:700;
          border:1px solid rgba(255,255,255,.12); background: rgba(255,255,255,.06); color:#fff;
          cursor:pointer; transition: transform .08s ease, box-shadow .2s, background .2s, border-color .2s;
        }
        .gc-btn:hover{ box-shadow: 0 10px 24px rgba(0,0,0,.25); background: rgba(255,255,255,.10); }
        .gc-btn:active{ transform: translateY(1px) scale(.98); }
        .gc-primary{ background: linear-gradient(180deg, #ff6067, var(--primary)); border-color: rgba(234,42,51,.6); }
        .gc-primary:hover{ filter: brightness(1.05); }
        .gc-outline{ background: transparent; }

        .gc-note{ color: var(--muted); font-size:.9rem; margin-top:.4rem }

        .gc-overlay{
          position:fixed; inset:0; background: rgba(10,10,12,.55);
          backdrop-filter: blur(6px); display:flex; align-items:center; justify-content:center; z-index: 1000;
          animation: fadeIn .25s ease;
        }
        .gc-modal{
          position:relative; width:min(480px, 92vw);
          background: linear-gradient(180deg, rgba(255,255,255,.10), rgba(255,255,255,.08));
          border:1px solid rgba(255,255,255,.15); border-radius:16px; padding:1.2rem 1rem 1.4rem;
          box-shadow: 0 30px 60px rgba(0,0,0,.45); animation: modalIn .25s ease both;
        }
        @keyframes modalIn { from{opacity:0; transform: translateY(8px)} to{opacity:1; transform:none} }
        .gc-close{
          position:absolute; right:.6rem; top:.4rem; font-size:1.6rem; line-height:1; border:none; background:transparent; color:#fff; cursor:pointer;
        }
        .gc-modal-title{ text-align:center; margin:0 0 .8rem; }

        .gc-skeleton{
          height: 46px; border-radius:12px; background:
            linear-gradient(90deg, rgba(255,255,255,.05) 25%, rgba(255,255,255,.12) 37%, rgba(255,255,255,.05) 63%);
          background-size: 400% 100%; animation: shimmer 1.1s infinite;
        }
        @keyframes shimmer { 0%{background-position: 100% 0} 100%{background-position: 0 0} }

      `}</style>
      </main>
  );
}
