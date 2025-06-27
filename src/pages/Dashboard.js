import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newNote, setNewNote] = useState('');
  const [activeTab, setActiveTab] = useState('tasks');

  const navigate = useNavigate();

  // 🧠 Load user and their data
  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('users'))?.find(
    user => user.email === localStorage.getItem('currentUser')
  );
  const email = storedUser?.email;

  if (storedUser) {
    setUser(storedUser);

    // Load tasks/notes for this user only
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          Welcome, {user.name || 'User'}! 🌟
        </h1>
        <p className="text-lg text-gray-700 mb-6">📧 {user.email}</p>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {['tasks', 'notes', 'upload'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl font-semibold capitalize transition ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-purple-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
          {activeTab === 'tasks' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-purple-800">Your Tasks 📋</h2>
              <div className="flex mb-4 gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task"
                  className="w-full p-2 border border-gray-300 rounded-xl"
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
                      task.done ? 'bg-green-100' : 'bg-gray-100'
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
                          task.done ? 'line-through text-gray-500' : 'text-gray-800'
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
              <h2 className="text-2xl font-semibold mb-4 text-purple-800">Your Notes 📝</h2>
              <div className="flex mb-4 gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note"
                  className="w-full p-2 border border-gray-300 rounded-xl"
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
                    className="flex justify-between items-center p-4 bg-yellow-100 rounded-xl shadow-sm"
                  >
                    <span className="text-gray-800">{note.content}</span>
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
              <h2 className="text-2xl font-semibold mb-4 text-purple-800">File Upload 📁</h2>
              <p className="text-gray-500">Coming up next...</p>
            </div>
          )}
        </div>

        {/* Logout */}
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
