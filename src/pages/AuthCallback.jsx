import React, { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient.js";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
    const [msg, setMsg] = useState("Procesando confirmación...");
    const navigate = useNavigate();

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {

                const { data: { session } } = await supabase.auth.getSession();
                // console.log('Auth callback session:', session);

                if (!session?.user) {
                    if (!cancelled) setMsg("No hay sesión. Por favor inicia sesión o usa el mismo dispositivo donde te registraste.");
                    return;
                }


                const pending = localStorage.getItem("pending_profile");
                if (pending) {
                    const { email, full_name, phone } = JSON.parse(pending);
                    if (email && full_name && /^[0-9]{8}$/.test(phone)) {
                        const { error } = await supabase
                            .from("profiles")
                            .upsert(
                                { user_id: session.user.id, email, full_name, phone, created_at: new Date().toISOString() },
                                { returning: "minimal" }
                            );
                        if (error) {
                            console.error("Upsert profiles error:", error);
                            if (!cancelled) setMsg("No se pudo completar tu perfil.");
                            return;
                        }
                        localStorage.removeItem("pending_profile");
                        if (!cancelled) setMsg("¡Cuenta confirmada y perfil listo! Redirigiendo…");
                        setTimeout(() => navigate("/reservas"), 600);
                        return;
                    }
                }

                // Si no hay pending, intentar usar metadata enviado en signUp
                const meta = session.user.user_metadata || {};
                if (meta.full_name && meta.phone && /^[0-9]{8}$/.test(meta.phone)) {
                    const { error } = await supabase
                        .from("profiles")
                        .upsert(
                            { user_id: session.user.id, email: session.user.email, full_name: meta.full_name, phone: meta.phone, created_at: new Date().toISOString() },
                            { returning: "minimal" }
                        );
                    if (error) {
                        console.error('Upsert from metadata error:', error);
                        if (!cancelled) setMsg("No se pudo crear el perfil desde metadata.");
                        return;
                    }
                    if (!cancelled) setMsg("¡Cuenta confirmada y perfil creado  Redirigiendo…");
                    setTimeout(() => navigate("/reservas"), 600);
                    return;
                }


                if (!cancelled) {
                    setMsg("Confirmación exitosa. Completa tu perfil si hace falta. Redirigiendo…");
                    setTimeout(() => navigate("/reservas"), 600);
                }
            } catch (err) {
                console.error("AuthCallback error:", err);
                if (!cancelled) setMsg("Ocurrió un error procesando la confirmación.");
            }
        })();
        return () => { cancelled = true; };
    }, [navigate]);


    return (
        <main style={{ padding: 24 }}>
            <h1>{msg}</h1>
            <p>Si no avanza, vuelve al inicio.</p>
        </main>
    );
}
