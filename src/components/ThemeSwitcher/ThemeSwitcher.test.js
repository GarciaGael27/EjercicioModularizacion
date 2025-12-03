import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeSwitcher from './ThemeSwitcher';
import ThemeContext from '../../context/ThemeContext';

const renderWithTheme = (theme = 'light', toggleTheme = jest.fn()) => {
  return render(
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeSwitcher />
    </ThemeContext.Provider>
  );
};

describe('Componente ThemeSwitcher', () => {
  test('debe renderizar correctamente con tema light', () => {
    renderWithTheme('light');
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('debe renderizar correctamente con tema dark', () => {
    renderWithTheme('dark');
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('debe tener la clase CSS correcta', () => {
    renderWithTheme('light');
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('theme-switcher');
  });
});
