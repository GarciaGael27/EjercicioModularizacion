import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import './CompletedTasks.css';

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const collectionRef = collection(db, "completedTasks");
    const q = query(collectionRef, orderBy("completedAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newCompletedTasks = [];
      querySnapshot.forEach((doc) => {
        newCompletedTasks.push({ 
          ...doc.data(), 
          id: doc.id 
        });
      });
      setCompletedTasks(newCompletedTasks);
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
      <div className="completed-tasks-container">
        <div className="loading">Cargando tareas completadas...</div>
      </div>
    );
  }

  return (
    <div className="completed-tasks-container">
      <h2>Historial de Tareas Completadas</h2>
      
      {completedTasks.length === 0 ? (
        <div className="empty-state">
          <p>No hay tareas completadas aún.</p>
          <p>¡Cuando completes tareas aparecerán aquí!</p>
        </div>
      ) : (
        <div className="completed-tasks-list">
          <p className="tasks-count">
            Total de tareas completadas: <strong>{completedTasks.length}</strong>
          </p>
          
          {completedTasks.map(task => (
            <div key={task.id} className="completed-task-item">
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                <div className="task-metadata">
                  <div className="dates-container">
                    <span className="creation-date">
                      Creada el: {formatDate(task.createdAt)}
                    </span>
                    <span className="completion-date">
                      Completada el: {formatDate(task.completedAt)}
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

export default CompletedTasks;