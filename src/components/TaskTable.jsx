import React from 'react';
import { Link } from 'react-router-dom';

export default function TaskTable({ tasks = [], onDelete, onToggleStatus }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="no-tasks-fallback">
        <p>🎉 No tasks found! Click "+ Add New Task" to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="task-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td><strong>{task.title}</strong></td>
              <td>{task.description || '-'}</td>
              <td>
                <span className={`badge priority-${task.priority?.toLowerCase()}`}>
                  {task.priority}
                </span>
              </td>
              <td>
                <span className={`badge status-${task.status?.replace(/\s+/g, '-').toLowerCase()}`}>
                  {task.status}
                </span>
              </td>
              <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}</td>
              <td>
                <div className="action-buttons">
                  <Link to={`/edit/${task.id}`} className="btn-edit">✏️ Edit</Link>
                  <button onClick={() => onDelete(task.id)} className="btn-delete">🗑️ Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}