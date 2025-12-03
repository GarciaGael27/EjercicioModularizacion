import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconMoon from './IconMoon';

describe('Componente IconMoon', () => {
  test('debe renderizar sin errores', () => {
    render(<IconMoon />);
  });

  test('debe renderizar con tamaño por defecto', () => {
    render(<IconMoon />);
  });

  test('debe renderizar con tamaño personalizado', () => {
    render(<IconMoon size={32} />);
  });

});
