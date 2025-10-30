import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Contact from './pages/Contact.jsx';
import EmployeeLogin from './components/Employee/EmployeeLogin.jsx';
import Reservations from './pages/Reservations.jsx';
import BackgroundVideo from './components/BackgroundVideo.jsx';
import AuthCallback from "./pages/AuthCallback.jsx";
import './styles.css';

export default function App() {
    return (
        <Router>
            <div className="app-container">

                <BackgroundVideo />


                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/empleados" element={<EmployeeLogin />} />
                    <Route path="/reservas" element={<Reservations />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}
