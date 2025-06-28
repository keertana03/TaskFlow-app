import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('users'))?.find(
      user => user.email === localStorage.getItem('currentUser')
    );
    const email = storedUser?.email;

    if (storedUser) {
      setUser(storedUser);
      const savedTasks = JSON.parse(localStorage.getItem(`tasks-${email}`)) || [];
      const savedNotes = JSON.parse(localStorage.getItem(`notes-${email}`)) || [];
      setTasks(savedTasks);
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    if (user.email) {
      localStorage.setItem(`tasks-${user.email}`, JSON.stringify(tasks));
    }
  }, [tasks, user.email]);

  useEffect(() => {
    if (user.email) {
      localStorage.setItem(`notes-${user.email}`, JSON.stringify(notes));
    }
  }, [notes, user.email]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const addNote = () => {
    if (newNote.trim()) {
      setNotes([...notes, { id: Date.now(), content: newNote.trim() }]);
      setNewNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-8 transition-all">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-10 transition duration-300">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-700 dark:text-purple-300 mb-1">
              Welcome! 
            </h1>
            <p className="text-lg text-gray-700 mb-6">📧 {user.email}</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded-xl shadow hover:shadow-lg transition"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto no-scrollbar">
          {['tasks', 'notes', 'upload'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200 hover:bg-purple-200 dark:hover:bg-purple-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Animated Tab content */}
        <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-inner transition-all duration-500">
          {activeTab === 'tasks' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-purple-300">Your Tasks 📋</h2>
              <div className="flex mb-4 gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  onClick={addTask}
                  className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className={`flex items-center justify-between p-4 rounded-xl shadow-sm ${
                      task.done
                        ? 'bg-green-100 dark:bg-green-700'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(task.id)}
                        className="w-5 h-5 text-purple-600"
                      />
                      <span
                        className={`text-lg ${
                          task.done
                            ? 'line-through text-gray-500 dark:text-gray-400'
                            : 'text-gray-800 dark:text-white'
                        }`}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'notes' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-purple-300">Your Notes 📝</h2>
              <div className="flex mb-4 gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note"
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <button
                  onClick={addNote}
                  className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600"
                >
                  Add
                </button>
              </div>
              <ul className="space-y-3">
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="flex justify-between items-center p-4 bg-yellow-100 dark:bg-yellow-600 rounded-xl shadow-sm"
                  >
                    <span className="text-gray-800 dark:text-gray-100">{note.content}</span>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-purple-300">File Upload 📁</h2>
              <p className="text-gray-500 dark:text-gray-300">Coming soon...</p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
