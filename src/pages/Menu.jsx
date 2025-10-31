import { Link } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

export default function Menu() {
  return (
      <main>
        <section className="menu-section">
          <h2>Nuestro Menú</h2>
          <p className="sub">
            Descubre nuestra selección de platillos auténticos de la cocina
            china, preparados con ingredientes frescos y técnicas tradicionales.
          </p>
          <div className="menu-grid">
            {/* Dumplings */}
            <div className="menu-card">
              <OptimizedImage src="/images/dompli.png" alt="Dumplings" />
              <div className="menu-content">
                <div className="category">Especialidades</div>
                <h3>Dumplings</h3>
                <p className="desc">
                  Delicados saquitos de masa rellenos de jugosa carne de cerdo y
                  un exquisito caldo caliente. Servidos al vapor y acompañados
                  de nuestra salsa especial de jengibre y vinagre.
                </p>
                <div className="price">Q45</div>
                <div className="rating">★★★★★</div>
              </div>
            </div>

            {/* Sho Fan */}
            <div className="menu-card">
              <OptimizedImage src="/images/ho_fan.jpg" alt="Sho Fan" />
              <div className="menu-content">
                <div className="category">Acompañamiento</div>
                <h3>Sho Fan</h3>
                <p className="desc">
                  Fideos anchos salteados con verduras de hoja verde y brotes de
                  soja, un estilo clásico de la cocina china y malasia.
                </p>
                <div className="price">Q110</div>
                <div className="rating">★★★★★</div>
              </div>
            </div>

            {/* Gado Gado */}
            <div className="menu-card">
              <OptimizedImage src="/images/gado_gado.jpg" alt="Gado Gado" />
              <div className="menu-content">
                <div className="category">Especialidades</div>
                <h3>Gado Gado</h3>
                <p className="desc">
                  Un abundante plato con verduras frescas, tofu, huevo duro y
                  arroz, todo bañado en nuestra cremosa salsa de maní hecha en
                  casa. Un clásico vegetariano.
                </p>
                <div className="price">Q150</div>
                <div className="rating">★★★★★</div>
              </div>
            </div>

            {/* Ebi Tempura */}
            <div className="menu-card">
              <OptimizedImage src="/images/camarones _fritos.jpg" alt="Ebi Tempura" />
              <div className="menu-content">
                <div className="category">Entradas</div>
                <h3>Ebi Tempura</h3>
                <p className="desc">
                  Camarones frescos y crujientes, rebozados en fina masa japonesa
                  y fritos a la perfección. Servidos con salsa Tentsuyu.
                </p>
                <div className="price">Q95</div>
                <div className="rating">★★★★★</div>
              </div>
            </div>

            {/* Spareribs */}
            <div className="menu-card">
              <OptimizedImage src="/images/spareribs.png" alt="Spareribs" />
              <div className="menu-content">
                <div className="category">Especialidades</div>
                <h3>Spareribs</h3>
                <p className="desc">
                  Guiso aromático con carne y verduras de temporada, cocinado
                  lentamente en cazuela de barro para máxima ternura y sabor.
                </p>
                <div className="price">Q87</div>
                <div className="rating">★★★★★</div>
              </div>
            </div>

            {/* Spring Rolls */}
            <div className="menu-card">
              <OptimizedImage src="/images/spring_rolls.png" alt="Spring Rolls" />
              <div className="menu-content">
                <div className="category">Entradas</div>
                <h3>Spring Rolls</h3>
                <p className="desc">
                  Rollos rellenos de cerdo picado y noodles transparentes, fritos
                  hasta dorarse. Perfectos para mojar en salsa de ciruela o soya.
                </p>
                <div className="price">Q55</div>
                <div className="rating">★★★★★</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta">
          <h2>¿Listo para probar nuestros platillos?</h2>
          <p>Haz tu reserva ahora y disfruta de una experiencia culinaria única.</p>
          <Link to="/reservas" className="btn btn-primary">
            Hacer Reserva
          </Link>
        </section>
      </main>
  );
}
