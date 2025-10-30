import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer style={{ textAlign: "center", padding: "20px", background: "#111", color: "#fff" }}>
            <div style={{ marginBottom: "10px" }}>
                {/* WhatsApp */}
                <a
                    href="https://wa.me/qr/YXZS5WNPCIJHP1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "0 10px", color: "red", fontSize: "32px" }}
                >
                    <FaWhatsapp />
                </a>

                {/* YouTube */}
                <a
                    href="https://youtu.be/AnmCIELOqi4?si=aiwjKsBTCfocM2GX"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "0 10px", color: "red", fontSize: "32px" }}
                >
                    <FaYoutube />
                </a>

                {/* Facebook */}
                <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "0 10px", color: "red", fontSize: "32px" }}
                >
                    <FaFacebook />
                </a>
            </div>

            <div>
                © 2025 Golden Chopsticks. Todos los derechos reservados.
            </div>
        </footer>
    );
}
