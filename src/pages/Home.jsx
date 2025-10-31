
import { Link   } from 'react-router-dom';
import ScrollFloat from "../components/Scroll/ScrollFloat";
import SplitText  from "../components/Split/SplitText";
import { useState } from "react";
import CustomerLogin from "../components/Customer/CustomerLogin";



export default function Home() {


  const handleAnimationComplete = () => {
    console.log('Animadoooooo!');
  };

    const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <main>

      <section className="hero">


        <SplitText
            text="Golden  Chopsticks"
            className="text-2xl font-semibold text-center"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="6px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
        />


        <p>
          Descubre los sabores auténticos de la cocina china en un ambiente
          elegante y tradicional.
        </p>
        <div className="buttons">

            <button
                className="btn btn-primary"
                onClick={() => {
                    console.log('Botón clickeado');
                    setIsLoginOpen(true);
                }}
            >
                Hacer&nbsp;Reserva
            </button>

          <Link to="/menu" className="btn btn-outline">
            Ver&nbsp;Gastronomía
          </Link>
        </div>
      </section>

        {isLoginOpen && <CustomerLogin onClose={() => setIsLoginOpen(false)} />}

      {/* Features Section */}
      <section className="features">
        <h2>¿Por qué elegirnos?</h2>
        <p className="sub">
          Ofrecemos una experiencia culinaria única que combina tradición,
          calidad y comodidad
        </p>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon"></div>
            <h3>Reservas Fáciles</h3>
            <p>
              Haz tu reserva en línea las 24&nbsp;horas, los 7&nbsp;días de la
              semana.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon"></div>
            <h3>Comida Auténtica</h3>
            <p>
              Sabores tradicionales de la cocina china preparados por expertos.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon"></div>
            <h3>Ambiente Familiar</h3>
            <p>
              Perfecto para familias y grupos de hasta 8&nbsp;personas por mesa.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon"></div>
            <h3>Experiencia Premium</h3>
            <p>
              Servicio de calidad en un ambiente elegante y acogedor.
            </p>
          </div>
        </div>
      </section>




      <section className="history">
        <div className="history-container">
          <div className="history-text">
            <div className="feature-grid-2">




              <ScrollFloat
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.03}
              >
                Nuestra Historia

              </ScrollFloat>

              <div className="feature-card-2">
                <h3>Quienes Somos</h3>
                <p>
                  Restaurante familiar dedicado a ofrecer la auténtica
                  experiencia culinaria china en Guatemala.
                </p>
              </div>
              <div className="feature-card-imagen history-images">
                <img
                  src="/images/camarones _fritos.jpg"
                  alt="Camarones fritos al estilo chino"
                />
              </div>
              <div className="feature-card-2">
                <h3>Nuestra Misión</h3>
                <p>
                  Brindar a nuestros clientes una experiencia gastronómica
                  excepcional con sabores auténticos e ingredientes frescos.
                </p>
              </div>

              <div className="feature-card-imagen history-images">
                <img
                  src="/images/spareribs.png"
                  alt="spareribs al estilo chino"
                />
              </div>
              <div className="feature-card-2">
                <h3>Nuestra Visión</h3>
                <p>
                  Ser el restaurante de comida china líder en Guatemala,
                  reconocido por la calidad de nuestros platillos y excelencia en
                  el servicio.
                </p>
              </div>
              <div className="feature-card-imagen history-images">
                <img src="/images/gado_gado.jpg" alt="Interior del restaurante" />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="cta">
        <h2>¿Listo para una experiencia única?</h2>
        <p>
          Reserva tu mesa hoy y disfruta de los auténticos sabores de la cocina
          china en un ambiente elegante.
        </p>
        <Link to="/reservas" className="btn btn-primary">
          Hacer Reserva Ahora
        </Link>
      </section>
    </main>
  );
}