import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import NotFound from './NotFound';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Componente NotFound', () => {
  test('debe renderizar el código de error 404', () => {
    renderWithRouter(<NotFound />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('debe renderizar el título de error', () => {
    renderWithRouter(<NotFound />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toHaveTextContent('¡Oops! Página no encontrada');
  });

  test('debe renderizar un enlace al inicio', () => {
    renderWithRouter(<NotFound />);
    
    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('Ir al Inicio');
  });

  test('debe renderizar correctamente', () => {
    renderWithRouter(<NotFound />);

  });
});
