import React, { useState, useEffect } from 'react'; // <-- Añade useEffect
import { db } from '../../firebaseConfig'; // <-- Importa nuestra config
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore"; // <-- Importa funciones de Firestore
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
  // El estado 'tasks' ahora empieza vacío
  const [tasks, setTasks] = useState([]); 
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

  // --- AÑADIR TAREA (CREATE) ---
  const handleAddTask = async (e) => { // La hacemos 'async'
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // ¡En lugar de solo 'setTasks', escribimos en la BD!
    await addDoc(collection(db, "tasks"), {
      text: inputValue,
      isComplete: false,
      createdAt: serverTimestamp() // Marca de tiempo de Firebase
    });

    setInputValue('');
    // NOTA: No necesitamos 'setTasks' aquí.
    // ¡'onSnapshot' detectará el nuevo documento y actualizará el estado por nosotros!
  };

  // --- MARCAR TAREA (UPDATE) ---
  const handleToggleComplete = async (task) => { // Pasamos el objeto 'task' entero
    // 1. Creamos una referencia al documento específico por su ID
    const taskRef = doc(db, "tasks", task.id);

    // 2. Actualizamos ese documento
    await updateDoc(taskRef, {
      isComplete: !task.isComplete // Invertimos el valor
    });
    // De nuevo, ¡onSnapshot se encarga de actualizar la UI!
  };

  // --- BORRAR TAREA (DELETE) ---
  const handleDeleteTask = async (idToDelete) => {
    // 1. Creamos una referencia al documento
    const taskRef = doc(db, "tasks", idToDelete);

    // 2. Borramos el documento
    await deleteDoc(taskRef);
    // ¡onSnapshot se encarga del resto!
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

      {/* Lista de tareas */}
      <ul>
        {tasks.map(task => (
          <TodoItem 
            key={task.id}
            task={task}
            // ¡Pasa la función correctamente!
            onToggleComplete={() => handleToggleComplete(task)} // Pasa el objeto 'task'
            onDeleteTask={handleDeleteTask} // Esta ya pasaba solo el ID
          />
        ))}
      </ul>

      {/* Mensaje cuando no hay tareas */}
      {tasks.length === 0 && (
        <p>No tienes tareas. ¡Añade una nueva!</p>
      )}
    </div>
  );
};

export default TodoList;