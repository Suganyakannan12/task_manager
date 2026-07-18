import React from 'react';
import { Link } from 'react-router-dom';
import TaskTable from '../components/TaskTable';

export default function Home({ tasks = [], onDelete, onToggleStatus }) {
  return (
    <div className="app-container" style={{ padding: '1rem 0' }}>
      {/* Clean Navigation Bar Area */}
      <nav style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '1.5rem', 
        marginBottom: '2.5rem', 
        borderBottom: '1px solid var(--border-color)', 
        paddingBottom: '1rem' 
      }}>
        <Link to="/" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>
          🎯 TaskManager Studio
        </Link>
        <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.95rem' }}>
          Workspace Home
        </Link>
      </nav>

      {/* Dynamic Content Header Row - Keeps spacing perfectly split */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>
            📋 Workspace Task Dashboard
          </h2>
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
            Track, modify, and optimize your sprint items.
          </p>
        </div>
        
        <Link to="/add" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Add New Task</span>
        </Link>
      </header>

      {/* Main Data Elements table */}
      <TaskTable 
        tasks={tasks} 
        onDelete={onDelete} 
        onToggleStatus={onToggleStatus} 
      />
    </div>
  );
}