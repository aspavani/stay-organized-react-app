// Todos.jsx
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TodoCard from '../components/TodoCard';
import TodoDrawer from '../components/TodoDrawer';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [filterOption, setFilterOption] = useState('all'); // Default filter option


  useEffect(() => {
    fetch('http://localhost:8083/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    if(!selectedUser) return;
    const fetchTodos = () => {
      let url = 'http://localhost:8083/api/todos';
      if (selectedUser) {
        url = `http://localhost:8083/api/todos/byuser/${selectedUser}`;
      }
    
      fetch(url)
        .then(response => response.json())
        .then(data => setTodos(data));
    };

    fetchTodos();
  }, [selectedUser]);

  const addTodo = (todo) => {
    fetch('http://localhost:8083/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(data => setTodos([...todos, data]));

    setIsDrawerOpen(false);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)));
  };

  const handleCreateNewTodo = () => {
    const userId = selectedUser ? parseInt(selectedUser, 10) : (users.length > 0 ? users[0].id : 0);
    
    setCurrentTodo({
      description: '',
      category: '',
      deadline: '',
      priority: 'Low',
      userid: userId
    });
    setIsCreateMode(true);
    setIsDrawerOpen(true);
  };
  

  const handleEditTodo = (todo) => {
    setCurrentTodo(todo);
    setIsCreateMode(false);
    setIsDrawerOpen(true);
  };

  const handleSave = (todo) => {
    if (isCreateMode) {
      addTodo(todo);
    } else {
      fetch(`http://localhost:8083/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
        .then(response => response.json())
        .then(savedTodo => {
          updateTodo(savedTodo);
          setIsDrawerOpen(false);
        });
    }
  };

  const deleteTodo = (todoId) => {
    fetch(`http://localhost:8083/api/todos/${todoId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== todoId));
        console.log('Todo deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const filteredTodos = todos.filter(todo => {
    if (filterOption === 'pending') {
      return !todo.completed;
    } else if (filterOption === 'completed') {
      return todo.completed;
    } else {
      return true; // show all
    }
  });
  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl text-yellow-500 font-bold mb-2 mt-6 text-center">Manage Todos</h1>
        <p className="text-lg text-gray-500 mb-2 text-center">Because even genies need to stay organized! 🧞‍♂️✨</p>
        {/* &#129502;&#8205;&#9794;&#65039; */}
        {/* &#10024 */}
        {/* <p className="text-md mb-8 text-center">Keep your tasks under control, one click at a time!</p> */}
        <div className="mb-4 flex justify-between items-center">
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {selectedUser && (
            <>
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="pending">Show Pending</option>
            <option value="completed">Show Completed</option>
            <option value="all">Show All</option>
          </select>
       
            <button
              onClick={handleCreateNewTodo}
              className="p-2 bg-yellow-500 text-white rounded"
            >
              Add New Todo
            </button>
            </>
          )}
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

          {selectedUser && filteredTodos.map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              user={users.find(user => user.id === todo.userid)}
              updateTodo={updateTodo}
              onEdit={() => handleEditTodo(todo)}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
      {currentTodo && (
        <TodoDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          todo={currentTodo}
          onSave={handleSave}
          isCreateMode={isCreateMode}
        />
      )}
    </Layout>
  );
};

export default Todos;
