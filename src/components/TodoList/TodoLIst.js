import React, { useState } from 'react';
import { FaTrash, FaCheck} from 'react-icons/fa';
import {db} from '../../firebase';
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"; 
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);

  // Nuevo estado para el campo de texto
  const [inputValue, setInputValue] = useState('');
  // --- LEER TAREAS (GET) ---
  // useEffect se ejecutará cuando el componente se monte
  useEffect(() => {
    // 1. Creamos una referencia a nuestra colección "tasks" en Firestore
    const collectionRef = collection(db, "tasks");

    // 2. Creamos una consulta (query) para ordenar las tareas por fecha
    const q = query(collectionRef, orderBy("createdAt", "asc"));

    // 3. onSnapshot es el ¡ESCUCHADOR EN TIEMPO REAL!
    // Se dispara una vez al inicio y luego CADA VEZ que los datos cambian
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTasks = [];
      querySnapshot.forEach((doc) => {
        newTasks.push({ 
          ...doc.data(), 
          id: doc.id // El ID del documento es importante
        });
      });
      setTasks(newTasks); // Actualizamos nuestro estado de React
    });

    // Esta función de limpieza se ejecuta cuando el componente se "desmonta"
    // Evita fugas de memoria
    return () => unsubscribe();

  }, []); // El '[]' asegura que esto se ejecute solo una vez

  // Función para manejar el envío del formulario
  const handleAddTask = async (e) => {
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