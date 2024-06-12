// TodoCard.jsx
import React from 'react';

const TodoCard = ({ todo, user }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{todo.description}</h3>
        <p className="text-sm text-gray-600 mb-1">User: {user.name}</p>
        <p className="text-sm text-gray-600 mb-1">Category: {todo.category}</p>
        <p className="text-sm text-gray-600 mb-1">Priority: {todo.priority}</p>
        <p className="text-sm text-gray-600 mb-1">Deadline: {todo.deadline}</p>
        <p className="text-sm text-gray-600 mb-1">Status: {todo.completed ? 'Completed' : 'Incomplete'}</p>
      </div>
    </div>
  );
};

export default TodoCard;
