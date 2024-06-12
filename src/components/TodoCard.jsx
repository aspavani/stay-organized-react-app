// TodoCard.jsx
import React, { useState } from 'react';
import { FaEdit, FaCheck } from 'react-icons/fa';
import TodoDrawer from './TodoDrawer';

const TodoCard = ({ todo, user, updateTodo }) => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  console.log("In todocard");
  console.log(user);
  console.log(todo);
  const handleCheckboxChange = () => {
    fetch(`http://localhost:8083/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, completed: true }),
    })
      .then(response => response.json())
      .then(updatedTodo => {
        setIsCompleted(true);
        updateTodo(updatedTodo);
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  const handleSave = (updatedTodo) => {
    fetch(`http://localhost:8083/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(response => response.json())
      .then(savedTodo => {
        setIsDrawerOpen(false);
        updateTodo(savedTodo);
        
      })
      .catch(error => {
        console.error('Error saving todo:', error);
      });
  };

  return (
    <>
      <div className="border rounded shadow p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">{todo.description}</h3>
          <p><strong>User:</strong> {user.name} ({user.username})</p>
          <p><strong>Category:</strong> {todo.category}</p>
          <p><strong>Deadline:</strong> {todo.deadline}</p>
          <p><strong>Priority:</strong> {todo.priority}</p>
          <p><strong>Status:</strong> {isCompleted ? 'Completed' : 'Incomplete'}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaEdit />
          </button>
          {isCompleted ? (
            <FaCheck className="text-green-500" />
          ) : (
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" onChange={handleCheckboxChange} />
              <span>Complete</span>
            </label>
          )}
        </div>
      </div>
      <TodoDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        todo={todo}
        onSave={handleSave}
      />
    </>
  );
};

export default TodoCard;
