import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaRocket, FaCog, FaGlobe } from "react-icons/fa";
import "./NotFound.css";

const NotFound = () => {
    const goBack = () => {
        window.history.back();
    };

    return (
        <div className="not-found-container">
            <div className="floating-elements">
                <FaRocket className="floating-element" size={60} />
                <FaCog className="floating-element" size={40} />
                <FaGlobe className="floating-element" size={50} />
            </div>
            
            <div className="error-code">404</div>
            
            <h1 className="error-title">¡Oops! Página no encontrada</h1>
            
            <div className="error-actions">
                <Link to="/" className="btn-primary">
                    <FaHome />
                    Ir al Inicio
                </Link>
            </div>
        </div>
    );
};

export default NotFound;