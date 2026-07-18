import React, { useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from '../hooks/useForm';

export default function TaskFormPage({ tasks = [], onSaveTask }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  // Setup simple validation rules
  const validateFields = (values) => {
    const errors = {};
    if (!values.title?.trim()) {
      errors.title = 'Task title is required.';
    }
    return errors;
  };

  // Initialize our custom hook engine
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    setValues
  } = useForm({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'To Do',
    dueDate: ''
  }, validateFields);

  // If editing, find the existing task item and load it into the form state
  useEffect(() => {
    if (isEditMode && tasks.length > 0) {
      const existingTask = tasks.find((t) => String(t.id) === String(id));
      if (existingTask) {
        setValues(existingTask);
      }
    }
  }, [id, isEditMode, tasks, setValues]);

  const handleFormSubmit = (formData) => {
    onSaveTask({
      ...formData,
      id: isEditMode ? id : Date.now().toString()
    });
    navigate('/');
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h2>{isEditMode ? '✏️ Edit Task' : '➕ Add New Task'}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          {isEditMode ? 'Modify your task settings below.' : 'Create a new item for your workspace.'}
        </p>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={values.title || ''}
              onChange={handleChange}
              placeholder="e.g., Fix Navigation Bug"
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={values.description || ''}
              onChange={handleChange}
              placeholder="Provide a brief context..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={values.priority || 'Medium'} onChange={handleChange}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" value={values.status || 'To Do'} onChange={handleChange}>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={values.dueDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none', textAlign: 'center' }}>
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}