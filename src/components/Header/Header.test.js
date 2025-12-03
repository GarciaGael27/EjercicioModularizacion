import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock del ThemeSwitcher para evitar dependencias
jest.mock('../ThemeSwitcher/ThemeSwitcher', () => {
  return function MockThemeSwitcher() {
    return <div data-testid="theme-switcher">Theme Switcher Mock</div>;
  };
});

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Componente Header', () => {
  test('debe renderizar el logo', () => {
    renderWithRouter(<Header />);
    
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveClass('logo');
  });

  
  test('debe renderizar el componente ThemeSwitcher', () => {
    renderWithRouter(<Header />);
    
    const themeSwitcher = screen.getByTestId('theme-switcher');
    expect(themeSwitcher).toBeInTheDocument();
  });

  test('debe tener la clase CSS correcta', () => {
    renderWithRouter(<Header />);
    
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('app-header');
  });

});