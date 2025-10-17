import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "../Customer/CustomerLogin.css";
import ElectricBorder from "../Customer/ElectricBorder.jsx";

export default function CustomerLogin({ onClose }) {



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();




    // const handleLogin = (e) => {
    //     e.preventDefault();
    //
    //     // Lógica de inicio de sesión
    //     if (username.trim() && password.trim()) {
    //         console.log('okay, entraaaaaaa xd: ', username);
    //         onClose();
    //         navigate('/reservas');
    //     } else {
    //         alert('Por favor, ingresa un nombre de usuario y contraseña válidos.');
    //     }
    // };

    const handleLogin = (e) => {
        e.preventDefault();

        // Lógica de inicio de sesión
        if (username=='xd' && password==='123') {
            console.log('okay, entraaaaaaa xd: ', username);
            onClose();
            navigate('/reservas');
        } else {
            alert('Por favor, ingresa un nombre de usuario y contraseña válidos.');
        }
    };

    return (
        <div className="overlay">
            <ElectricBorder
                color={"rgba(255,0,51)"}
                speed={0.2}
                chaos={0.2}
                thickness={2}
                style={{ borderRadius: 19 }}
            >

            <main className="modal">
                <section className="login-section">
                    <div className="login-card">
                        <h2 style={{color: 'rgb(255,255,255)'}}>Inicia Sesión</h2>
                        <p style={{ textAlign: 'center', marginBottom: '1rem',  color: 'rgb(255, 255, 255)' }}>
                            Accede para realizar tus reservas.
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
                            {/*<Link to="/" style={{ color: 'var(--primary)' }}>*/}
                            {/*    ← Volver al Inicio*/}
                            {/*</Link>*/}
                        </div>
                    </div>
                </section>
            </main>
            </ElectricBorder>
        </div>
    );
}