import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { collection, onSnapshot } from "firebase/firestore";
import './Home.css';

const Home = () => {
  const [stats, setStats] = useState({
    activeTasks: 0,
    completedTasks: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeActive = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      const activeTasks = tasks.filter(task => !task.isComplete).length;
      
      setStats(prev => ({ ...prev, activeTasks }));
    });

    const unsubscribeCompleted = onSnapshot(collection(db, "completedTasks"), (snapshot) => {
      setStats(prev => ({ ...prev, completedTasks: snapshot.size }));
      setLoading(false);
    });

    return () => {
      unsubscribeActive();
      unsubscribeCompleted();
    };
  }, []);

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Gestión de Tareas</h1>
        <p>Organiza tu día de manera simple y efectiva</p>
      </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <div className="stat-item">
          <span className="stat-number">{stats.activeTasks}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.completedTasks}</span>
          <span className="stat-label">Completadas</span>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="nav-section">
        <Link to="/tareas" className="nav-link primary">
          Gestionar Tareas
        </Link>
        <Link to="/completadas" className="nav-link secondary">
          Ver Historial
        </Link>
      </section>
    </div>
  );
};

export default Home;