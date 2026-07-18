import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TaskFormPage from './pages/TaskFormPage';
import NotFound from './pages/NotFound';

// Define the fallback default 10 tasks outside the component
const initialTenTasks = [
  {
    id: '1',
    title: 'Plan Application Architecture',
    description: 'Deconstruct structural routes and input fields.',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-07-20'
  },
  {
    id: '2',
    title: 'Verify Sorting Hook Assertions',
    description: 'Test memory array boundaries on multi-column changes.',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: '2026-07-28'
  },
  {
    id: '3',
    title: 'Configure Tailwind Theme Tokens',
    description: 'Align color variables with standard production specs.',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2026-07-22'
  },
  {
    id: '4',
    title: 'Implement Vercel Routing Configuration',
    description: 'Verify SPA route rewrites for deeper entry paths.',
    priority: 'High',
    status: 'Completed',
    dueDate: '2026-07-19'
  },
  {
    id: '5',
    title: 'Review React 19 Peer Dependencies',
    description: 'Audit strict installation rules against workspace tools.',
    priority: 'High',
    status: 'In Progress',
    dueDate: '2026-07-25'
  },
  {
    id: '6',
    title: 'Design Task Status Toggle Logic',
    description: 'Map dynamic updates through unified handler sequences.',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '2026-07-30'
  },
  {
    id: '7',
    title: 'Optimize Responsive Layout Containers',
    description: 'Adjust max-widths and flex properties for desktop grid items.',
    priority: 'Low',
    status: 'To Do',
    dueDate: '2026-08-02'
  },
  {
    id: '8',
    title: 'Audit Custom Custom Form Hooks',
    description: 'Validate key-value bindings and input field resetting triggers.',
    priority: 'Medium',
    status: 'To Do',
    dueDate: '2026-07-29'
  },
  {
    id: '9',
    title: 'Build Fallback Error Pages',
    description: 'Create standardized NotFound layout configurations.',
    priority: 'Low',
    status: 'Completed',
    dueDate: '2026-07-15'
  },
  {
    id: '10',
    title: 'Prepare Final Deployment Branch',
    description: 'Clean console checks and verify server entry variables.',
    priority: 'High',
    status: 'To Do',
    dueDate: '2026-07-27'
  }
];

export default function App() {
  // 1. Initialize from localStorage safely if it exists, otherwise use defaults
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studio_tasks');
    return saved ? JSON.parse(saved) : initialTenTasks;
  });

  // 2. Automatically synchronize updates to local storage whenever state updates
  useEffect(() => {
    localStorage.setItem('studio_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (savedTask) => {
    setTasks((prevTasks) => {
      const exists = prevTasks.some((t) => String(t.id) === String(savedTask.id));
      if (exists) {
        return prevTasks.map((t) => (String(t.id) === String(savedTask.id) ? savedTask : t));
      }
      return [...prevTasks, savedTask];
    });
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((t) => String(t.id) !== String(id)));
  };

  const handleToggleStatus = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (String(t.id) === String(id)) {
          const nextStatus = t.status === 'To Do' ? 'In Progress' : t.status === 'In Progress' ? 'Completed' : 'To Do';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              tasks={tasks} 
              onDelete={handleDeleteTask} 
              onToggleStatus={handleToggleStatus} 
            />
          } 
        />
        <Route 
          path="/add" 
          element={<TaskFormPage tasks={tasks} onSaveTask={handleSaveTask} />} 
        />
        <Route 
          path="/edit/:id" 
          element={<TaskFormPage tasks={tasks} onSaveTask={handleSaveTask} />} 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}