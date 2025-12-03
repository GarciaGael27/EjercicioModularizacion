import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDirectory from './UserDirectory';

global.fetch = jest.fn();

describe('Componente UserDirectory', () => {

  test('debe mostrar mensaje de carga inicialmente', () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    
    render(<UserDirectory />);
    
    expect(screen.getByText('Cargando usuarios...')).toBeInTheDocument();
  });

  test('debe llamar a la API correcta', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    render(<UserDirectory />);
    
    expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  test('debe renderizar la lista de usuarios', async () => {
    const Users = [
      {
        id: 1,
        name: 'Usuario Test',
        email: 'test@example.com',
        website: 'test.com'
      }
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => Users
    });

    render(<UserDirectory />);

    await waitFor(() => {
      expect(screen.getByText('Usuario Test')).toBeInTheDocument();
    });

    expect(screen.getByText('📧 test@example.com')).toBeInTheDocument();
    expect(screen.getByText('🌐 test.com')).toBeInTheDocument();
  });

  test('debe manejar errores de la API', async () => {
    fetch.mockRejectedValueOnce(new Error('Error de red'));

    render(<UserDirectory />);

    await waitFor(() => {
      expect(screen.getByText('Error: Error de red')).toBeInTheDocument();
    });
  });

});
