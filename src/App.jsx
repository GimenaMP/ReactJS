import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Menu from './pages/Menu.jsx';
import Contact from './pages/Contact.jsx';
import EmployeeLogin from './pages/EmployeeLogin.jsx';
import Reservations from './pages/Reservations.jsx';

/**
 * App is the root component of the application.  It sets up routing
 * using react‑router and renders the common header and footer on every
 * page.  Each Route corresponds to a page component defined in the
 * src/pages directory.
 */
export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/empleados" element={<EmployeeLogin />} />
        <Route path="/reservas" element={<Reservations />} />
        {/* Fallback: redirect unknown paths back to home */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}