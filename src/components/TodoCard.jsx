// TodoCard.jsx
import React, { useState, useEffect } from 'react';
import { FaEdit, FaCheck, FaUser, FaCalendarAlt, FaTag, FaExclamationCircle, FaTrash } from 'react-icons/fa';
import TodoDrawer from './TodoDrawer';


const TodoCard = ({ todo, user, updateTodo, deleteTodo }) => {
    console.log("in todocard prop");
    console.log(todo);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  console.log("iscomplted is " + Boolean(todo.completed) + "direct" + todo.completed + isCompleted);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    setIsCompleted(todo.completed);
  }, [todo.completed]);

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
        console.log("In todocard");
        console.log(savedTodo);
        updateTodo(savedTodo);
        
      })
      .catch(error => {
        console.error('Error saving todo:', error);
      });
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${todo.description}"?`)) {
      deleteTodo(todo.id);
    }
  };

  return (
    <>
      <div className={`border rounded-lg  shadow p-4 flex flex-col justify-between text-black ${isCompleted ? 'bg-gray-300' : 'bg-yellow-100'}`}
             onMouseEnter={() => setIsHovered(true)}
             onMouseLeave={() => setIsHovered(false)}>
        <div>
          <h3 className="text-lg font-semibold mb-2">{todo.description}</h3>
          {/* <p className="flex items-center text-md text-gray-400"><FaUser className="mr-1" />{user.name}</p> */}
          <p className="flex items-center text-md"><FaTag className="mr-1" />{todo.category}</p>
          <p className="flex items-center text-md"><FaCalendarAlt className="mr-1" />{todo.deadline}</p>
          <p className="flex items-center text-md"><FaExclamationCircle className="mr-1" />{todo.priority}</p>
          {/* <p><strong>Status:</strong> {isCompleted ? 'Completed' : 'Incomplete'}</p> */}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => setIsDrawerOpen(true)}
          >
            <FaEdit className="text-yellow-500"/>
          </button>

          {isHovered && (
            <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
              <FaTrash />
            </button>
          )}

          {isCompleted ? (
            <FaCheck className="text-yellow-500" />
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
