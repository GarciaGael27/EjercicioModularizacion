import React, { useState, useEffect } from 'react'; 
import { db } from '../../firebaseConfig'; 
import { collection, query, orderBy, onSnapshot, addDoc, doc, updateDoc, deleteDoc, serverTimestamp, getDoc, where, getDocs } from "firebase/firestore";
import './TodoList.css';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
  const [tasks, setTasks] = useState([]); 
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const collectionRef = collection(db, "tasks");

    const q = query(collectionRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTasks = [];
      querySnapshot.forEach((doc) => {
        newTasks.push({ 
          ...doc.data(), 
          id: doc.id 
        });
      });
      setTasks(newTasks); 
    });


    return () => unsubscribe();

  }, []); 

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    await addDoc(collection(db, "tasks"), {
      text: inputValue,
      isComplete: false,
      createdAt: serverTimestamp() 
    });

    setInputValue('');

  };

  const handleToggleComplete = async (task) => { 
    const taskRef = doc(db, "tasks", task.id);

    await updateDoc(taskRef, {
      isComplete: !task.isComplete 
    });

    if (!task.isComplete) {
      await addDoc(collection(db, "completedTasks"), {
        text: task.text,
        isComplete: true,
        createdAt: task.createdAt,
        completedAt: serverTimestamp(),
        originalTaskId: task.id 
      });
    } else {
      try {
        const completedTasksRef = collection(db, "completedTasks");
        const q = query(completedTasksRef, where("originalTaskId", "==", task.id));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(doc(db, "completedTasks", docSnapshot.id));
        });
      } catch (error) {
        console.error("Error eliminando tarea de completadas:", error);
      }
    }
  };

  const handleDeleteTask = async (idToDelete) => {
    const taskRef = doc(db, "tasks", idToDelete);

    await addDoc(collection(db, "deletedTasks"), {
      text: (await getDoc(taskRef)).data().text,
      isComplete: (await getDoc(taskRef)).data().isComplete,
      createdAt: (await getDoc(taskRef)).data().createdAt, 
      deletedAt: serverTimestamp()
    });

    await deleteDoc(taskRef);
  };

  return (
    <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>

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
          <TodoItem 
            key={task.id}
            task={task}
            onToggleComplete={() => handleToggleComplete(task)} 
            onDeleteTask={handleDeleteTask} 
          />
        ))}
      </ul>

      {tasks.length === 0 && (
        <p>No tienes tareas. ¡Añade una nueva!</p>
      )}
    </div>
  );
};

export default TodoList;