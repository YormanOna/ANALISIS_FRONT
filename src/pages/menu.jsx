import React, { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useNavigate } from 'react-router-dom';
import '../styles/menu.css';
import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Catering } from '../components/catering';

import Page1 from '../images/Menu/1.png';
import Page2 from '../images/Menu/2.png';
import Page3 from '../images/Menu/3.png';
import Page4 from '../images/Menu/4.png';
import Page5 from '../images/Menu/5.png';
import Page6 from '../images/Menu/6.png';
import Inicio from '../images/Menu/inicio.jpg';
import Fin from '../images/Menu/Fin.png';

export function Menu() {
    const book = useRef();
    const navigate = useNavigate(); // Hook para la navegación
    const [showBartender, setShowBartender] = useState(true);
    const [showCatering, setShowCatering] = useState(false);

    const nextPage = () => {
        book.current.pageFlip().flipNext();
    };

    const prevPage = () => {
        book.current.pageFlip().flipPrev();
    };

    const handleBartenderClick = () => {
        setShowBartender(true);
        setShowCatering(false);
    };

    const handleCateringClick = () => {
        setShowBartender(false);
        setShowCatering(true);
    };

    const handleQuotationClick = () => {
        navigate('/cotizacion'); 
    };

    return (
        <div className="menu-container">
            <Header />
            <div className="button-container">
                <button className={`menu-button ${showBartender ? 'active' : ''}`} onClick={handleBartenderClick}>
                    Servicio de Bartender
                </button>
                <button className={`menu-button ${showCatering ? 'active' : ''}`} onClick={handleCateringClick}>
                    Servicio de Catering
                </button>
            </div>

            {showBartender && (
                <div className="bartender-section">
                    <button className="nav-button left" onClick={prevPage}>&lt;</button>
                    <HTMLFlipBook width={500} height={700} className="flip-book" ref={book} showCover={true}>
                        <div className="single-page">
                            <div className="page-content">
                                <img src={Inicio} alt="Inicio" className="menu-image" />
                            </div>
                        </div>
                        <div className="page">
                            <div className="page-content">
                                <img src={Page1} alt="Coctel 1" className="menu-image" />
                            </div>
                        </div>
                        <div className="page">
                            <div className="page-content">
                                <img src={Page2} alt="Coctel 2" className="menu-image" />
                            </div>
                        </div>
                        <div className="page">
                            <div className="page-content">
                                <img src={Page3} alt="Coctel 3" className="menu-image" />
                            </div>
                        </div>
                        <div className="page">
                            <div className="page-content">
                                <img src={Page4} alt="Coctel 4" className="menu-image" />
                            </div>
                        </div>
                        <div className="page">
                            <div className="page-content">
                                <img src={Page5} alt="Coctel 5" className="menu-image" />
                            </div>
                        </div>
                        <div className="page">
                            <div className="page-content">
                                <img src={Page6} alt="Coctel 6" className="menu-image" />
                            </div>
                        </div>
                        <div className="single-page2">
                            <div className="page-content">
                                <img src={Fin} alt="Fin" className="menu-image" />
                            </div>
                        </div>
                    </HTMLFlipBook>
                    <button className="nav-button right" onClick={nextPage}>&gt;</button>
                </div>
            )}

            {showCatering && (
                <div className="catering-section">
                    <Catering />
                </div>
            )}
            
            <button className="quotation-button" onClick={handleQuotationClick}>
                ¡Realiza tu cotización ahora!
            </button>

            <Footer />
        </div>
    );
}
