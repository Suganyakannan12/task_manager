import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TaskTable from '../components/TaskTable';

export default function Home({ tasks = [], onDelete, onToggleStatus }) {
  // Search, Filter, Sort, and Pagination States
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // 1. Filter Logic (Search + Priority Select)
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  // 2. Sort Logic (By Due Date)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate);
    const dateB = new Date(b.dueDate);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // 3. Pagination Logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  return (
    <div className="app-container" style={{ padding: '1rem 0' }}>
      {/* Navigation Bar */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', paddingBottom: '1rem' }}>
        <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
          🎯 TaskManager Studio
        </Link>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>
          Workspace Home
        </Link>
      </nav>

      {/* Header Row */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>📋 Workspace Task Dashboard</h2>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>Track, modify, and optimize your sprint items.</p>
        </div>
        <Link to="/add" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Add New Task
        </Link>
      </header>

      {/* 🔍 Controls Toolbar (Search, Filter, Sort) */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder="Search tasks..." 
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          style={{ flex: '2', minWidth: '200px' }}
        />
        
        <select 
          value={priorityFilter} 
          onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
          style={{ flex: '1', minWidth: '150px' }}
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button 
          className="btn" 
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
        >
          Sort Date: {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
      </div>

      {/* Main Table View */}
      <TaskTable 
        tasks={currentTasks} 
        onDelete={onDelete} 
        onToggleStatus={onToggleStatus} 
      />

      {/* 📄 Pagination Navigation Footer */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            className="btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            style={{ padding: '0.4rem 0.8rem', opacity: currentPage === 1 ? 0.5 : 1 }}
          >
            Previous
          </button>
          <span style={{ color: 'var(--text-muted)' }}>Page {currentPage} of {totalPages}</span>
          <button 
            className="btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            style={{ padding: '0.4rem 0.8rem', opacity: currentPage === totalPages ? 0.5 : 1 }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}