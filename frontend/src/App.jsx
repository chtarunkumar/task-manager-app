import { useEffect, useMemo, useState } from 'react';

const API_URL = 'http://localhost:5000';

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (fetchError) {
      setError('Failed to load tasks. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (statusFilter === 'All') {
      return tasks;
    }

    return tasks.filter((task) => task.status === statusFilter);
  }, [tasks, statusFilter]);

  const addTask = async (event) => {
    event.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Task title cannot be empty.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) {
        throw new Error('Unable to create task.');
      }

      const newTask = await response.json();
      setTasks((previous) => [newTask, ...previous]);
      setTitle('');
      setDescription('');
    } catch (createError) {
      setError('Unable to create task. Please try again.');
    }
  };

  const completeTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT'
      });

      if (!response.ok) {
        throw new Error('Unable to complete task.');
      }

      const updatedTask = await response.json();
      setTasks((previous) =>
        previous.map((task) => (task.id === taskId ? updatedTask : task))
      );
    } catch (updateError) {
      setError('Unable to update task status.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Unable to delete task.');
      }

      setTasks((previous) => previous.filter((task) => task.id !== taskId));
    } catch (deleteError) {
      setError('Unable to delete task.');
    }
  };

  return (
    <main className="container">
      <h1>Simple Task Management</h1>

      <form className="task-form" onSubmit={addTask}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
          rows={3}
        />

        <button type="submit">Add Task</button>
      </form>

      <section className="toolbar">
        <label htmlFor="statusFilter">Filter</label>
        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </section>

      {error && <p className="error">{error}</p>}
      {loading && <p>Loading tasks...</p>}

      <ul className="task-list">
        {!loading && filteredTasks.length === 0 ? (
          <li className="empty">No tasks found.</li>
        ) : (
          filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <div>
                <h3>
                  {task.title}{' '}
                  <span className={task.status === 'Completed' ? 'completed' : 'pending'}>
                    {task.status}
                  </span>
                </h3>
                <p>{task.description || 'No description provided.'}</p>
                <small>{new Date(task.created_at).toLocaleString()}</small>
              </div>
              <div className="actions">
                <button
                  type="button"
                  onClick={() => completeTask(task.id)}
                  disabled={task.status === 'Completed'}
                >
                  Mark Completed
                </button>
                <button type="button" className="danger" onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}

export default App;
