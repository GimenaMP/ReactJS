import React from "react";

export default function AlertMessage({ text = "", type = "info" }) {
    if (!text) return null;


    const msg = text.toLowerCase();
    let bg, border, color, title;

    if (type === "success" || msg.includes("confirmada")) {
        bg = "linear-gradient(90deg, rgba(16,185,129,0.1), rgba(16,185,129,0.25))";
        border = "1px solid rgba(16,185,129,0.4)";
        color = "#065f46";
        title = "Reserva Confirmada";
    } else if (type === "warning" || msg.includes("cancelada")) {
        bg = "linear-gradient(90deg, rgba(245,158,11,0.1), rgba(245,158,11,0.25))";
        border = "1px solid rgba(245,158,11,0.4)";
        color = "#92400e";
        title = "Reserva Cancelada";
    } else if (type === "error" || msg.includes("error") || msg.includes("no se pudo")) {
        bg = "linear-gradient(90deg, rgba(220,38,38,0.1), rgba(220,38,38,0.25))";
        border = "1px solid rgba(220,38,38,0.4)";
        color = "#b91c1c";
        title = "Error";
    } else {
        bg = "linear-gradient(90deg, rgba(59,130,246,0.1), rgba(59,130,246,0.25))";
        border = "1px solid rgba(59,130,246,0.4)";
        color = "#1d4ed8";
        title = "Información";
    }

    return (
        <div
            style={{
                marginTop: "1.5rem",
                padding: "1rem 1.25rem",
                borderRadius: "10px",
                background: bg,
                border: border,
                color: color,
                textAlign: "center",
                fontWeight: 500,
                lineHeight: 1.4,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                maxWidth: "640px",
                marginInline: "auto",
                animation: "fadeIn 0.4s ease-in-out",
            }}
        >
            <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                {title}
            </div>
            <div style={{ fontSize: "0.95rem", opacity: 0.9 }}>{text}</div>


            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
            </style>
        </div>
    );
}
