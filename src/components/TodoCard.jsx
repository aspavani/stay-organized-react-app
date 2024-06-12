// TodoCard.jsx
import React from 'react';
import { FaEdit } from 'react-icons/fa';

const TodoCard = ({ todo, user }) => {
  return (
    <div className="border rounded shadow p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold mb-2">{todo.description}</h3>
        <p><strong>User:</strong> {user.name} ({user.username})</p>
        <p><strong>Category:</strong> {todo.category}</p>
        <p><strong>Deadline:</strong> {todo.deadline}</p>
        <p><strong>Priority:</strong> {todo.priority}</p>
        <p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Incomplete'}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button className="text-blue-500 hover:text-blue-700">
          <FaEdit />
        </button>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" checked={todo.completed} readOnly />
          <span>Complete</span>
        </label>
      </div>
    </div>
  );
};

export default TodoCard;
