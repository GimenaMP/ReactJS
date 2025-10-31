// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import Header from './components/Header.jsx';
// import Footer from './components/Footer.jsx';
// import Home from './pages/Home.jsx';
// import Menu from './pages/Menu.jsx';
// import Contact from './pages/Contact.jsx';
//
// import Reservations from './pages/Reservations.jsx';
// import BackgroundVideo from './components/BackgroundVideo.jsx';
// import AuthCallback from "./pages/AuthCallback.jsx";
// import './styles.css';
//
// export default function App() {
//     return (
//         <Router>
//             <div className="app-container">
//
//                 <BackgroundVideo/>
//                 <Header/>
//                 <Routes>
//                     <Route path="/" element={<Home/>}/>
//                     <Route path="/menu" element={<Menu/>}/>
//                     <Route path="/contacto" element={<Contact/>}/>
//
//                     <Route path="/reservas" element={<Reservations/>}/>
//                     <Route path="/auth/callback" element={<AuthCallback/>}/>
//                     <Route path="*" element={<Home/>}/>
//                 </Routes>
//                 <Footer/>
//             </div>
//         </Router>
//     );
// }

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import BackgroundVideo from './components/BackgroundVideo.jsx';


// Lazy loading de componentes
const Home = lazy(() => import('./pages/Home'));
const Menu = lazy(() => import('./pages/Menu'));
const Contact = lazy(() => import('./pages/Contact'));
const Reservations = lazy(() => import('./pages/Reservations'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));


// Componente de fallback mientras cargan las rutas
const LoadingFallback = () => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }}>
        <LoadingSpinner />
    </div>
);

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <BackgroundVideo />
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/reservas" element={<Reservations />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />

                </Routes>
            </Suspense>
            <Footer />
        </BrowserRouter>
    );
}