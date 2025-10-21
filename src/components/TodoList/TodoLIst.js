import React, { useState } from 'react';
import { FaTrash, FaCheck} from 'react-icons/fa';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Aprender React' },
    { id: 2, text: 'Construir una App' },
    { id: 3, text: 'Modularizar componentes' }
  ]);

  // Nuevo estado para el campo de texto
  const [inputValue, setInputValue] = useState('');

  // Función para manejar el envío del formulario
  const handleAddTask = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (inputValue.trim() === '') return; // No añadir tareas vacías

    const newTask = {
      id: Date.now(), // ID único basado en la fecha actual
      text: inputValue,
      completed: false
    };

    setTasks([...tasks, newTask]); // Añadimos la nueva tarea a la lista
    setInputValue(''); // Limpiamos el campo de texto
  };

    // Función para eliminar una tarea
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleCompleteTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    console.log(`Tarea con ID ${taskId} completada.`);
  };

  return (
    <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>

      {/* Formulario para añadir nuevas tareas */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Añade una nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div class={`task-item ${task.completed ? 'completed' : ''}`}>
                <span class="task-text">{task.text}</span>
                <div class="spacer">
                    <button class={`button-complete ${task.completed ? 'completed' : ''}`} disabled={task.completed} onClick={() => handleCompleteTask(task.id)}><FaCheck /> </button>
                    <button class = "button-delete" onClick={() => handleDeleteTask(task.id)}><FaTrash /></button>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;