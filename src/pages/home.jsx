import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../styles/home.css";

import Cocteles1 from '../images/Cocteles1.jpg';
import Cocteles2 from '../images/Cocteles2.jpg';
import Cocteles3 from '../images/Cocteles3.jpg';
import Cocteles4 from '../images/Cocteles4.jpg';
import Cocteles5 from '../images/Cocteles5.jpg';
import logo from '../images/logo.png';

export function Home() {
  return (
    <div className="home-container">
      <header className="header">
        
        <img src={logo} alt="logo 1" />
        <div>
          <h1 className='titulo1'>Banana's Cocktails</h1>
          <p className='subtitle'>Servicio de Bartender y Catering</p>
        </div>
        <div className="button-container">
          <Link to="/contact" className="register-button">Contáctanos</Link>
          <Link to="/login" className="register-button">Iniciar sesión</Link>
        </div>
      </header>
      <div className="content">
        <div className="carousel">
          <Carousel
            autoPlay
            interval={2000}
            infiniteLoop
            showThumbs={false}
            showStatus={false}
          >
            <div>
              <img src={Cocteles1} alt="Imagen 1" />
            </div>
            <div>
              <img src={Cocteles2} alt="Imagen 2" />
            </div>
            <div>
              <img src={Cocteles3} alt="Imagen 3" />
            </div>
            <div>
              <img src={Cocteles4} alt="Imagen 4" />
            </div>
            <div>
              <img src={Cocteles5} alt="Imagen 5" />
            </div>
          </Carousel>
        </div>
        <div className="info">
          <h2>¿Quiénes somos?</h2>
          <p>Banana's Cocktails es un servicio de barra móvil y coctelería clásica con más de 6 años de experiencia. Ofrecemos un enfoque innovador con iluminación LED para todo tipo de eventos.</p>

          <h3>Servicio de Bartender</h3>
          <p>Ofrecemos bartenders calificados que preparan y sirven una variedad de cócteles, con o sin alcohol. Proporcionamos insumos necesarios como licor, fruta, hielo y cristalería, con transporte dentro del Distrito Metropolitano de Quito y valles cercanos. Trabajamos con los mejores licores y ofrecemos un servicio ilimitado de horas para garantizar un evento inolvidable.</p>

          <h3>Servicio de Catering</h3>
          <p>Además de nuestros servicios de coctelería, ofrecemos un servicio de catering que incluye mini hamburguesas, mini pinchos, mini empanadas, shawarmas, hot dogs y chili dogs.</p>
        </div>
      </div>
      <footer className='footer'>
        <p>&copy; 2024 Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
