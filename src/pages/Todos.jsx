// Todos.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TodoCard from '../components/TodoCard';

const Todos = () => {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users and todos concurrently
    Promise.all([
      fetch('http://localhost:8083/api/users/').then(response => response.json()),
      fetch('http://localhost:8083/api/todos').then(response => response.json())
    ])
      .then(([usersData, todosData]) => {
        setUsers(usersData);
        setTodos(todosData);
        setSelectedUser(usersData[0]?.id || ''); // Select the first user by default
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4">Manage Todos</h2>
        <p className="text-xl mb-2">Because even genies need to stay organized! 🧞‍♂️✨</p>
        <div className="flex items-center mb-4">
          <label htmlFor="user" className="mr-2">Select User:</label>
          <select
            id="user"
            className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none"
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.filter(todo => todo.userid === parseInt(selectedUser)).map(todo => (
              <TodoCard key={todo.id} todo={todo} user={users.find(user => user.id === todo.userid)} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Todos;
