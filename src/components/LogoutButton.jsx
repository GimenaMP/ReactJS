import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../lib/supabaseClient.js";

export default function LogoutButton({
                                         label = "Cerrar sesión",
                                         redirectTo = "/",
                                         compact = false,
                                     }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [msg, setMsg] = useState("");

    // Cerrar con ESC
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        if (open) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const handleSignOut = async () => {
        setMsg("");
        setSigningOut(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            // Pequeña pausa para ver el estado "Éxito"
            setMsg("Sesión cerrada correctamente.");
            setTimeout(() => {
                setOpen(false);
                navigate(redirectTo);
            }, 600);
        } catch (err) {
            setMsg(err?.message || "No se pudo cerrar la sesión.");
        } finally {
            setSigningOut(false);
        }
    };

    return (
        <>

            <button
                type="button"
                onClick={() => setOpen(true)}
                className={`btn ${compact ? "btn-outline" : "btn-primary"}`}
                style={{
                    padding: compact ? "0.45rem 0.75rem" : "0.6rem 1rem",
                    borderRadius: "999px",
                    border: compact ? "1px solid #d1d5db" : "none",
                    background: compact ? "transparent" : "var(--primary, #C42126)",
                    color: compact ? "var(--primary, #C42126)" : "#fff",
                    fontWeight: 600,
                    boxShadow: compact ? "none" : "0 6px 20px rgba(196,33,38,.25)",
                    transition: "transform .06s ease",
                }}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
                {label}
            </button>

            {/* Modal */}
            {open && (
                <div
                    className="overlay"
                    onClick={(e) => {
                        if (e.target.classList.contains("overlay")) setOpen(false);
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,.45)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        animation: "fadeIn .2s ease",
                    }}
                >
                    <div
                        className="modal"
                        style={{
                            width: "92%",
                            maxWidth: 420,
                            background: "rgba(255,255,255,.97)",
                            backdropFilter: "blur(8px)",
                            borderRadius: 16,
                            padding: "1.25rem 1.25rem 1rem",
                            boxShadow: "0 10px 30px rgba(0,0,0,.25)",
                            animation: "popIn .15s ease",
                            position: "relative",
                        }}
                    >
                        <button
                            type="button"
                            aria-label="Cerrar"
                            title="Cerrar"
                            onClick={() => setOpen(false)}
                            style={{
                                position: "absolute",
                                right: 10,
                                top: 8,
                                background: "transparent",
                                border: "none",
                                fontSize: 22,
                                cursor: "pointer",
                                color: "#374151",
                            }}
                        >
                            ×
                        </button>

                        <h3
                            style={{
                                margin: 0,
                                textAlign: "center",
                                fontWeight: 700,
                                fontSize: "1.15rem",
                            }}
                        >
                            ¿Deseas cerrar tu sesión?
                        </h3>

                        <p
                            style={{
                                textAlign: "center",
                                color: "#6b7280",
                                margin: ".5rem 0 1rem",
                                fontSize: ".95rem",
                            }}
                        >
                            Podrás volver a entrar cuando quieras con tu correo y contraseña.
                        </p>

                        {/* Mensaje de estado */}
                        {msg && (
                            <div
                                style={{
                                    background: "#f3f4f6",
                                    color: "#111827",
                                    borderRadius: 10,
                                    padding: ".6rem .8rem",
                                    marginBottom: ".75rem",
                                    textAlign: "center",
                                    fontSize: ".93rem",
                                }}
                            >
                                {msg}
                            </div>
                        )}

                        <div style={{ display: "flex", justifyContent: "center", gap: ".5rem" }}>
                            <button
                                className="btn btn-primary"
                                onClick={handleSignOut}
                                disabled={signingOut}
                                style={{
                                    padding: ".6rem 1rem",
                                    borderRadius: 10,
                                    border: "none",
                                    background: "var(--primary, #C42126)",
                                    color: "#fff",
                                    fontWeight: 700,
                                    minWidth: 160,
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: ".5rem",
                                    cursor: "pointer",
                                    boxShadow: "0 6px 18px rgba(196,33,38,.25)",
                                }}
                            >
                                {signingOut ? (
                                    <>
                    <span
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            border: "2px solid #fff",
                            borderTopColor: "transparent",
                            display: "inline-block",
                            animation: "spin .6s linear infinite",
                        }}
                    />
                                        Cerrando…
                                    </>
                                ) : (
                                    "Sí, cerrar sesión"
                                )}
                            </button>

                            <button
                                className="btn btn-outline"
                                onClick={() => setOpen(false)}
                                style={{
                                    padding: ".6rem 1rem",
                                    borderRadius: 10,
                                    border: "1px solid #d1d5db",
                                    background: "transparent",
                                    color: "#374151",
                                    fontWeight: 600,
                                    minWidth: 120,
                                    cursor: "pointer",
                                }}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>


                    <style>
                        {`
              @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
              @keyframes popIn { from { transform: translateY(4px); opacity:.95 } to { transform: translateY(0); opacity:1 } }
              @keyframes spin { to { transform: rotate(360deg) } }
            `}
                    </style>
                </div>
            )}
        </>
    );
}
