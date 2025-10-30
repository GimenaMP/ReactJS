import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import supabase from '../lib/supabaseClient.js';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [signingOut, setSigningOut] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const atReservations = location.pathname.startsWith('/reservas');

    useEffect(() => {
        let mounted = true;
        (async () => {
            const { data } = await supabase.auth.getUser();
            if (mounted) setUser(data?.user ?? null);
        })();
        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });
        return () => {
            mounted = false;
            sub?.subscription?.unsubscribe?.();
        };
    }, []);

    const handleLogout = async () => {
        setSigningOut(true);
        try {
            await supabase.auth.signOut();
            navigate('/');
        } catch (err) {
            alert(err?.message || 'No se pudo cerrar la sesión.');
        } finally {
            setSigningOut(false);
        }
    };

    return (
        <header className="header">
            <div className="nav-container">
                <NavLink
                    to="/"
                    className="logo"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', fontWeight: 800 }}
                >
                    <svg viewBox="0 0 1024 1024" className="icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" aria-hidden="true">
                        <path d="M512 512m-296.421053 0a296.421053 296.421053 0 1 0 592.842106 0 296.421053 296.421053 0 1 0-592.842106 0Z" fill="#a80000"></path>
                        <path d="M970.105263 512c0 224.983579-163.166316 412.186947-377.263158 450.533053v-54.460632C777.135158 870.507789 916.210526 707.206737 916.210526 512c0-222.881684-181.328842-404.210526-404.210526-404.210526S107.789474 289.118316 107.789474 512s181.328842 404.210526 404.210526 404.210526c9.081263 0 18.000842-0.754526 26.947368-1.374315v53.894736c-8.973474 0.538947-17.866105 1.374316-26.947368 1.374316-252.604632 0-458.105263-205.500632-458.105263-458.105263S259.395368 53.894737 512 53.894737s458.105263 205.500632 458.105263 458.105263z m-498.122105 265.620211L431.157895 754.526316V485.052632h-66.074948c-14.470737 110.645895-44.355368 197.066105-102.696421 260.742736l-39.747368-36.432842C306.526316 617.876211 323.368421 462.901895 323.368421 242.526316V215.578947h377.263158v53.894737H377.182316c-0.404211 58.260211-2.209684 112.128-6.359579 161.684211H700.631579v53.894737h-122.152421a481.172211 481.172211 0 0 0 76.826947 119.70021l66.479158-39.855158 27.728842 46.214737-54.460631 32.687158c29.507368 24.953263 63.757474 45.675789 102.80421 58.098526l-16.303158 51.361684c-134.224842-42.711579-222.773895-167.073684-261.551158-268.207157H485.052632v221.857684l68.985263-41.391158 27.728842 46.214737-109.783579 65.886316zM646.736842 377.263158h-215.578947v-53.894737h215.578947v53.894737z" fill="#231F20"></path>
                    </svg>
                    Golden&nbsp;Chopsticks
                </NavLink>

                <button
                    className={`burger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Abrir menú"
                >
                    <span />
                    <span />
                    <span />
                </button>

                <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <NavLink to="/" end onClick={() => setMenuOpen(false)}>
                        Inicio
                    </NavLink>
                    <NavLink to="/menu" onClick={() => setMenuOpen(false)}>
                        Gastronomía
                    </NavLink>
                    <NavLink to="/contacto" onClick={() => setMenuOpen(false)}>
                        Contacto
                    </NavLink>
                    {atReservations && user ? (
                        <button
                            onClick={handleLogout}
                            disabled={signingOut}
                            className="logout-btn"
                        >
                            {signingOut ? 'Saliendo...' : 'Salir'}
                        </button>
                    ) : null}
                </nav>
            </div>
        </header>
    );
}
