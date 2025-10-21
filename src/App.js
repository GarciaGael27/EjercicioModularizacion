import React from 'react';
// import imagen from './esferasdg.png';
import './App.css';
import Header from './components/Header/Header';
import UserDirectory from './components/UserDirectory/UserDirectory';
import TodoList from './components/TodoList/TodoLIst'; // Importamos el nuevo componente
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher'; // Importamos el ThemeSwitcher
import { useContext } from 'react';
import ThemeContext from './context/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme}`}>
      <Header />
      {/* <img src={imagen} className="App-logo" alt="logo" /> */}
      <main>
        <TodoList />
        <UserDirectory />
      </main>
    </div>
  );
}

export default App;
