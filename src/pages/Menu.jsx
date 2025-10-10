import { Link } from 'react-router-dom';


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
            <img src="/images/dompli.png" alt="Dumplings" />
            <div className="menu-content">
              <div className="category">Especialidades</div>
              <h3>Dumplings</h3>
              <p className="desc">
                Delicados saquitos de masa rellenos de jugosa carne de cerdo y
                un exquisito caldo caliente.  Servidos al vapor y acompañados
                de nuestra salsa especial de jengibre y vinagre.
              </p>
              <div className="price">Q45</div>
              <div className="rating">★★★★★</div>
            </div>
          </div>
          {/* Sho Fan */}
          <div className="menu-card">
            <img src="/images/ho_fan.jpg" alt="SHo Fan" />
            <div className="menu-content">
              <div className="category">Acompañamiento</div>
              <h3>SHo Fan</h3>
              <p className="desc">
                La tercera imagen muestra un plato de fideos anchos, salteados
                con verduras de hoja verde y brotes de soja, lo que apunta a
                un estilo de fideo salteado chino o malasio.
              </p>
              <div className="price">Q110</div>
              <div className="rating">★★★★★</div>
            </div>
          </div>
          {/* Gado Gado */}
          <div className="menu-card">
            <img src="/images/gado_gado.jpg" alt="Gado Gado" />
            <div className="menu-content">
              <div className="category">Especialidades</div>
              <h3>Gado Gado</h3>
              <p className="desc">
                Un abundante y nutritivo plato con una base de verduras
                frescas, cubierto con tofu, huevo duro en rodajas, y un toque
                de arroz o lontong.  Todo bañado en nuestra cremosa y sabrosa
                salsa de cacahuete (maní) hecha en casa.  Un clásico completo
                y vegetariano.
              </p>
              <div className="price">Q150</div>
              <div className="rating">★★★★★</div>
            </div>
          </div>
          {/* Ebi Tempura */}
          <div className="menu-card">
            <img src="/images/camarones _fritos.jpg" alt="Ebi Tempura" />
            <div className="menu-content">
              <div className="category">Entradas</div>
              <h3>Ebi Tempura</h3>
              <p className="desc">
                Camarones frescos y crujientes, ligeramente rebozados en una
                fina masa japonesa.  Fritos a la perfección para lograr una
                textura delicada y dorada.  Servidos con nuestra salsa
                Tentsuyu dulce y salada para mojar.
              </p>
              <div className="price">Q95</div>
              <div className="rating">★★★★★</div>
            </div>
          </div>
          {/* Spareribs */}
          <div className="menu-card">
            <img src="/images/spareribs.png" alt="Spareribs" />
            <div className="menu-content">
              <div className="category">Especialidades</div>
              <h3>Spareribs</h3>
              <p className="desc">
                Un guiso aromático y rústico con trozos de carne y verduras de
                temporada.  La cocción lenta en la cazuela de barro
                garantiza que la carne esté extra tierna y que cada
                ingrediente absorba la profunda y sabrosa salsa.  Ideal para
                acompañar con arroz blanco.
              </p>
              <div className="price">Q87</div>
              <div className="rating">★★★★★</div>
            </div>
          </div>
          {/* Spring Rolls */}
          <div className="menu-card">
            <img src="/images/spring_rolls.png" alt="Spring Rolls" />
            <div className="menu-content">
              <div className="category">Entradas</div>
              <h3>Spring Rolls</h3>
              <p className="desc">
                Unidades de finos rollos rellenos de una combinación de cerdo
                picado y noodles transparentes.  Fritos hasta conseguir un
                color dorado perfecto.  Ideales para mojar en la salsa de
                ciruela o soya.
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