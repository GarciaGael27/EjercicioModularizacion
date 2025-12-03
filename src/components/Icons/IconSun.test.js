import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconSun from './IconSun';

describe('Componente IconSun', () => {
  test('debe renderizar sin errores', () => {
    render(<IconSun />);
  });

  test('debe renderizar con tamaño por defecto', () => {
    render(<IconSun />);
  });

  test('debe renderizar con tamaño personalizado', () => {
    render(<IconSun size={32} />);
  });

});
