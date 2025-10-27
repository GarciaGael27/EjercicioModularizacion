import React from 'react';
import { FaTrash, FaCheck } from 'react-icons/fa';
import './TodoItem.css';

const TodoItem = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    <li>
      <div className={`task-item ${task.isComplete ? 'completed' : ''}`}>
        <div className="task-checkbox">
          <input
            type="checkbox"
            checked={task.isComplete}
            onChange={onToggleComplete} // Ya no pasamos el ID aquí según el tutorial
          />
        </div>
        <span className="task-text">{task.text}</span>
        <div className="spacer">
          <button 
            className={`button-complete ${task.isComplete ? 'completed' : ''}`} 
            disabled={task.isComplete} 
            onClick={onToggleComplete}
          >
            <FaCheck />
          </button>
          <button 
            className="button-delete" 
            onClick={() => onDeleteTask(task.id)}
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;