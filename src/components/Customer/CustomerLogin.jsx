import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./CustomerLogin.css";
import confetti from "canvas-confetti";
import {
    signUpAndCreateProfile,
    signInAndFetchProfile,
    requestPasswordReset,
} from "../../lib/authService.js";


function EyeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="none" stroke="#c61010" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            width="22" height="22"
        >
            <path d="M1 12s3-8 11-8 11 8 11 8-3 8-11 8-11-8-11-8Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}
function TicketIcon(props) {
    return (
        <svg {...props} viewBox="0 0 1024 1024" className="icon" version="1.1"
             xmlns="http://www.w3.org/2000/svg" fill="#000000" aria-hidden="true">
            <g id="SVGRepo_iconCarrier">
                <path d="M512 512m-296.421053 0a296.421053 296.421053 0 1 0 592.842106 0 296.421053 296.421053 0 1 0-592.842106 0Z" fill="#a80000"></path>
                <path d="M970.105263 512c0 224.983579-163.166316 412.186947-377.263158 450.533053v-54.460632C777.135158 870.507789 916.210526 707.206737 916.210526 512c0-222.881684-181.328842-404.210526-404.210526-404.210526S107.789474 289.118316 107.789474 512s181.328842 404.210526 404.210526 404.210526c9.081263 0 18.000842-0.754526 26.947368-1.374315v53.894736c-8.973474 0.538947-17.866105 1.374316-26.947368 1.374316-252.604632 0-458.105263-205.500632-458.105263-458.105263S259.395368 53.894737 512 53.894737s458.105263 205.500632 458.105263 458.105263z m-498.122105 265.620211L431.157895 754.526316V485.052632h-66.074948c-14.470737 110.645895-44.355368 197.066105-102.696421 260.742736l-39.747368-36.432842C306.526316 617.876211 323.368421 462.901895 323.368421 242.526316V215.578947h377.263158v53.894737H377.182316c-0.404211 58.260211-2.209684 112.128-6.359579 161.684211H700.631579v53.894737h-122.152421a481.172211 481.172211 0 0 0 76.826947 119.70021l66.479158-39.855158 27.728842 46.214737-54.460631 32.687158c29.507368 24.953263 63.757474 45.675789 102.80421 58.098526l-16.303158 51.361684c-134.224842-42.711579-222.773895-167.073684-261.551158-268.207157H485.052632v221.857684l68.985263-41.391158 27.728842 46.214737-109.783579 65.886316zM646.736842 377.263158h-215.578947v-53.894737h215.578947v53.894737z" fill="#231F20"></path>
            </g>
        </svg>
    );
}
function UserAvatarIcon(props) {
    return (
        <svg {...props} version="1.1" viewBox="-2.4 -2.4 28.80 28.80" fill="#000000">
            <g id="SVGRepo_iconCarrier">
                <g transform="translate(2.000000, 2.000000)">
                    <path fillRule="evenodd" fill="#e10e0e" d="M10,10c2.9,0,5.2-2.3,5.2-5.2c0-2.9-2.3-5.2-5.2-5.2S4.8,1.9,4.8,4.8 C4.8,7.7,7.1,10,10,10L10,10z"></path>
                    <path fillRule="evenodd" fill="#e10e0e" d="M10,12.7c-3.5,0-10.5,1.7-10.5,5.2v2.6h21v-2.6C20.5,14.4,13.5,12.7,10,12.7L10,12.7z "></path>
                </g>
            </g>
        </svg>
    );
}
function LockIcon(props) {
    return (
        <svg {...props} viewBox="-102.4 -102.4 1228.80 1228.80" className="icon" version="1.1"
             xmlns="http://www.w3.org/2000/svg" fill="#000000" aria-hidden="true">
            <g id="SVGRepo_iconCarrier">
                <path d="M789.942857 899.657143H263.314286c-43.885714 0-80.457143-36.571429-80.457143-80.457143V482.742857c0-43.885714 36.571429-80.457143 80.457143-80.457143h526.628571c43.885714 0 80.457143 36.571429 80.457143 80.457143v336.457143c0 43.885714-36.571429 80.457143-80.457143 80.457143z" fill="#6d080a"></path>
                <path d="M753.371429 424.228571H299.885714V197.485714c0-87.771429 73.142857-168.228571 153.6-168.228571h138.971429c87.771429 0 153.6 73.142857 153.6 168.228571v226.742857z" fill="#D72822"></path>
            </g>
        </svg>
    );
}
function MailIcon(props) {
    return (
        <svg {...props} viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"
                  fill="#c91703"></path>
        </svg>
    );
}
function PhoneIcon(props) {
    return (
        <svg {...props} viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ec0909">
            <path d="M5.11596 12.7268L8.15456 9.08666C8.46255 8.69067 8.61655 8.49267 8.69726 8.27061C8.76867 8.07411 8.79821 7.86486 8.784 7.65628C8.76793 7.42055 8.67477 7.18766 8.48846 6.72187L7.77776 4.94513C7.50204 4.25581 7.36417 3.91116 7.12635 3.68525C6.91678 3.48618 6.65417 3.3519 6.37009 3.29856C6.0477 3.23803 5.68758 3.32806 4.96733 3.50812L3 4.00002C3 14 9.99969 21 20 21L20.4916 19.0324C20.6717 18.3122 20.7617 17.952 20.7012 17.6297C20.6478 17.3456 20.5136 17.083 20.3145 16.8734C20.0886 16.6356 19.7439 16.4977 19.0546 16.222L17.4691 15.5878C16.9377 15.3752 16.672 15.2689 16.4071 15.2608C16.1729 15.253 15.9404 15.3013 15.728 15.4002C15.4877 15.512 15.2854 15.7144 14.8807 16.1191L11.7943 19.1569" stroke="#d30909" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
}
function CloseIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

/* ===== Componente ===== */
export default function CustomerLogin({ onClose }) {
    const [view, setView] = useState("login");
    const navigate = useNavigate();

    // Login
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [loginUserMsg, setLoginUserMsg] = useState("");
    const [loginPassMsg, setLoginPassMsg] = useState("");

    // Registro
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [registerError, setRegisterError] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState("");

    // Recuperación
    const [recoverValue, setRecoverValue] = useState("");
    const [recoverError, setRecoverError] = useState("");
    const [recoverSuccess, setRecoverSuccess] = useState("");

    /* === LOGIN === */
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginUserMsg("");
        setLoginPassMsg("");

        let hasErr = false;
        if (!username.trim()) {
            setLoginUserMsg("Ingresa tu correo.");
            hasErr = true;
        }
        if (!password.trim()) {
            setLoginPassMsg("Ingresa tu contraseña.");
            hasErr = true;
        }
        if (hasErr) return;

        try {
            const { auth, profile } = await signInAndFetchProfile({ email: username, password });

            if (!auth?.user) {
                setLoginPassMsg("No se pudo autenticar el usuario.");
                return;
            }

            //  Confeti al iniciar sesión
            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#C42126", "#F2B705", "#FFFFFF"],
            });

            console.log("Perfil cargado:", profile);
            onClose?.();
            navigate("/reservas");
        } catch (err) {
            console.error("Error al iniciar sesión:", err.message);
            setLoginPassMsg(err.message || "Credenciales incorrectas o usuario no registrado.");
        }

};

    /* === REGISTRO === */
    const handleRegister = async (e) => {
        e.preventDefault();
        setRegisterError("");
        setRegisterSuccess("");

        if (!acceptTerms) {
            setRegisterError("Debes aceptar los términos del servicio.");
            return;
        }

        try {
            await signUpAndCreateProfile({
                email,
                password: regPassword,
                full_name: fullName,
                phone,
            });

            // 🎉 Confeti también al CREAR el usuario
            confetti({
                particleCount: 140,
                spread: 70,
                origin: { y: 0.6 },
                colors: ["#C42126", "#F2B705", "#FFFFFF"],
            });

            setRegisterSuccess("Registro exitoso. Revisa tu correo para confirmar.");
            setTimeout(() => setView("login"), 1800);
        } catch (_err) {
            setRegisterError("No se pudo registrar. Verifica tus datos.");
        }
    };

    /* === RECUPERAR === */
    const handleRecover = async (e) => {
        e.preventDefault();
        setRecoverError("");
        setRecoverSuccess("");

        if (!recoverValue.trim()) {
            setRecoverError("Ingresa tu correo para continuar.");
            return;
        }
        try {
            await requestPasswordReset(recoverValue);
            setRecoverSuccess(" Enviamos las instrucciones a tu correo.");
            setTimeout(() => {
                setView("login");
                setRecoverValue("");
            }, 2000);
        } catch (_err) {
            setRecoverError("No se pudo enviar el correo. Intenta nuevamente.");
        }
    };

    /* === VISTAS === */
    const renderLoginForm = () => (
        <>
            <div className="card-header">
                <span className="card-icon" role="img" aria-label="ticket"><TicketIcon /></span>
                <h2 className="card-title">Iniciar Sesión</h2>
                <p className="card-description">Accede para realizar tus reservas.</p>
            </div>

            <form onSubmit={handleLogin}>
                <div className="input-container">
                    <span className="input-icon" aria-label="usuario"><UserAvatarIcon /></span>
                    <input
                        type="email"
                        id="login-username"
                        placeholder="Correo electrónico"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                {loginUserMsg && <p className="error-text">{loginUserMsg}</p>}

                <div className="input-container">
                    <span className="input-icon" aria-label="contraseña"><LockIcon /></span>
                    <input
                        type={showLoginPassword ? "text" : "password"}
                        id="login-password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        className="input-icon-right"
                        aria-label={showLoginPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={() => setShowLoginPassword((prev) => !prev)}
                        title={showLoginPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        style={{ cursor: "pointer", opacity: showLoginPassword ? 1 : 0.9 }}
                    >

                        <EyeIcon />
          </span>
                </div>
                {loginPassMsg && <p className="error-text">{loginPassMsg}</p>}

                <div className="form-actions">
                    <button type="submit" className="primary-button">Iniciar Sesión</button>
                </div>
            </form>

            <div className="spacer-grow" />
            <div className="switch-links">
                <button type="button" className="link-button" onClick={() => setView("register")}>Agregar Usuario</button>
                {/*<button type="button" className="link-button" onClick={() => setView("forgot")}>Recuperar Contraseña</button>*/}
            </div>
        </>
    );

    const renderRegisterForm = () => (
        <>
            <div className="card-header">
                <span className="card-icon" aria-label="ticket"><TicketIcon /></span>
                <h2 className="card-title">Crear Cuenta</h2>
                <p className="card-description">Regístrate para reservar más rápido.</p>
            </div>

            <form onSubmit={handleRegister}>
                <div className="input-container">
                    <span className="input-icon"><UserAvatarIcon /></span>
                    <input
                        type="text"
                        id="full-name"
                        placeholder="Ingresa tu nombre completo"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <span className="input-icon"><MailIcon /></span>
                    <input
                        type="email"
                        id="reg-email"
                        placeholder="tucorreo@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <span className="input-icon"><PhoneIcon /></span>
                    <input
                        type="tel"
                        id="reg-phone"
                        placeholder="Ingresa tu número de teléfono"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <span className="input-icon"><LockIcon /></span>
                    <input
                        type={showRegPassword ? "text" : "password"}
                        id="reg-password"
                        placeholder="Crea una contraseña segura"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                    />
                    <span
                        className="input-icon-right"
                        aria-label={showRegPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        onClick={() => setShowRegPassword((prev) => !prev)}
                        title={showRegPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        style={{ cursor: "pointer", opacity: showRegPassword ? 1 : 0.9 }}
                    >
            {/* Un solo ojo rojo para registro también */}
                        <EyeIcon />
          </span>
                </div>

                <div className="terms-container">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    />
                    <label htmlFor="terms">
                        Acepto los <span className="highlight-text">Términos de Servicio</span> y la <span className="highlight-text">Política de Privacidad</span>.
                    </label>
                </div>

                {registerError && <p className="error-text">{registerError}</p>}
                {registerSuccess && <p className="success-text">{registerSuccess}</p>}

                <div className="form-actions">
                    <button type="submit" className="primary-button">Registrarse</button>
                </div>
            </form>

            <div className="spacer-grow" />
            <div className="switch-links single-link">
                <span>¿Ya tienes una cuenta?&nbsp;</span>
                <button type="button" className="link-button" onClick={() => setView("login")}>Inicia Sesión</button>
            </div>
        </>
    );

    const renderForgotForm = () => (
        <>
            <div className="card-header">
                <span className="card-icon" aria-label="ticket"><TicketIcon /></span>
                <h2 className="card-title">Recuperar Contraseña</h2>
                <p className="card-description">Ingresa tu correo para restablecer tu contraseña.</p>
            </div>

            <form onSubmit={handleRecover}>
                <div className="input-container">
                    <span className="input-icon"><MailIcon /></span>
                    <input
                        type="email"
                        id="recover-value"
                        placeholder="tucorreo@ejemplo.com"
                        value={recoverValue}
                        onChange={(e) => setRecoverValue(e.target.value)}
                    />
                </div>
                {recoverError && <p className="error-text">{recoverError}</p>}
                {recoverSuccess && <p className="success-text">{recoverSuccess}</p>}

                <div className="form-actions">
                    <button type="submit" className="primary-button">Enviar Instrucciones</button>
                </div>
            </form>

            <div className="spacer-grow" />
            <div className="switch-links single-link">
                <button type="button" className="link-button" onClick={() => setView("login")}>Volver al Inicio de Sesión</button>
            </div>
        </>
    );

    return (
        <div className="overlay" style={{ zIndex: 99999 }}>
            <div className="modal">
                <button className="close-button" onClick={() => onClose?.()} aria-label="Cerrar" title="Cerrar">
                    <CloseIcon />
                </button>

                <section className="login-section">
                    <div className="login-card">
                        {view === "login" && renderLoginForm()}
                        {view === "register" && renderRegisterForm()}
                        {view === "forgot" && renderForgotForm()}
                    </div>
                </section>
            </div>

            <style>
                {`
          .error-text {
            color: #d10a0a;
            font-size: 0.9rem;
            margin-top: 4px;
            text-align: left;
          }
          .success-text {
            color: #0a9d2b;
            font-size: 0.9rem;
            margin-top: 4px;
            text-align: left;
          }
        `}
            </style>
        </div>
    );
}
