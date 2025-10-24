import React from  'react';
import './Header.css';
import { Link } from 'react-router-dom';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import logo from '../../firebase-icon.svg';

const Header = () => {
    return (
        //npx vercel --prod
        <header className="app-header">

        <div className="logo-nav">
            <img src={logo} alt="Logo" className="logo" />
            <nav>
                {/* Usamos <Link> en lugar de <a href=""> */}
                <Link to="/">Inicio</Link>
                <Link to="/tareas">Tareas</Link>
                <Link to="/directorio">Directorio</Link>
            </nav>
        </div>
        <div>
            <ThemeSwitcher/>
        </div>

        </header>
    );
};

export default Header;