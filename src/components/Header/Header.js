import React from  'react';
import './Header.css';
import Welcome from '../Welcome/Welcome';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
const Header = () => {
    return (
        <header className="app-header">
            <div>
            <h1>My TodoList</h1>
            <Welcome nombre="Desarrollador"/>
            </div>
            <div>
                <ThemeSwitcher/>
            </div>

        </header>
    );
};

export default Header;