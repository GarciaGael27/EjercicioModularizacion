import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from './TodoItem';

const Task = {
  id: '1',
  text: 'Tarea de prueba',
  isComplete: false
};

const OnToggleComplete = jest.fn();
const OnDeleteTask = jest.fn();

const defaultProps = {
  task: Task,
  onToggleComplete: OnToggleComplete,
  onDeleteTask: OnDeleteTask
};

describe('Componente TodoItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('debe renderizar el texto de la tarea', () => {
    render(<TodoItem {...defaultProps} />);
    
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
  });

  test('debe renderizar un checkbox', () => {
    render(<TodoItem {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('debe mostrar el checkbox marcado si la tarea está completa', () => {
    const completedTask = { ...Task, isComplete: true };
    render(<TodoItem {...defaultProps} task={completedTask} />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('debe renderizar el botón de eliminar', () => {
    render(<TodoItem {...defaultProps} />);
    
    const deleteButton = screen.getByRole('button');
    expect(deleteButton).toBeInTheDocument();
  });

  test('debe llamar a onToggleComplete cuando se hace clic en el checkbox', () => {
    render(<TodoItem {...defaultProps} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(OnToggleComplete).toHaveBeenCalledTimes(1);
  });

  test('debe llamar a onDeleteTask con el id correcto cuando se hace clic en eliminar', () => {
    render(<TodoItem {...defaultProps} />);
    
    const deleteButton = screen.getByRole('button');
    fireEvent.click(deleteButton);
    
    expect(OnDeleteTask).toHaveBeenCalledTimes(1);
    expect(OnDeleteTask).toHaveBeenCalledWith('1');
  });

});
