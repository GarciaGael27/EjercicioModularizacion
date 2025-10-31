import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import './DeletedTasks.css';

const DeletedTasks = () => {
  const [deletedTasks, setDeletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, "deletedTasks");
    const q = query(collectionRef, orderBy("deletedAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newDeletedTasks = [];
      querySnapshot.forEach((doc) => {
        newDeletedTasks.push({ 
          ...doc.data(), 
          id: doc.id 
        });
      });
      setDeletedTasks(newDeletedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Fecha no disponible';
    
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="deleted-tasks-container">
        <div className="loading">Cargando tareas eliminadas...</div>
      </div>
    );
  }

  return (
    <div className="deleted-tasks-container">
      <h2>Historial de Tareas Eliminadas</h2>
      
      {deletedTasks.length === 0 ? (
        <div className="empty-state">
          <p>No hay tareas eliminadas.</p>
          <p>¡Las tareas que elimines aparecerán aquí!</p>
        </div>
      ) : (
        <div className="deleted-tasks-list">
          <p className="tasks-count">
            Total de tareas eliminadas: <strong>{deletedTasks.length}</strong>
          </p>
          
          {deletedTasks.map(task => (
            <div key={task.id} className="deleted-task-item">
              <div className="task-content">
                <span className="task-text">
                   {task.text}
                  {task.isComplete && <span className="was-completed"> (estaba completada)</span>}
                </span>
                <div className="task-metadata">
                  <div className="dates-container">
                    <span className="creation-date">
                      Creada el: {formatDate(task.createdAt)}
                    </span>
                    <span className="deletion-date">
                      Eliminada el: {formatDate(task.deletedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeletedTasks;