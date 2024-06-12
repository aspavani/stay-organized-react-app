// Todos.jsx
import React from 'react';
import Layout from '../components/Layout';
import TodoCard from '../components/TodoCard';
import { users, todos } from '../dataStore'; // Import users and todos from data store

const Todos = () => {
  return (
    <Layout>
      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold mb-4">Manage Todos</h2>
        <p className="text-xl mb-8">Because even genies need to stay organized! 🧞‍♂️✨</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.map(todo => (
            <TodoCard key={todo.id} todo={todo} user={users.find(user => user.id === todo.userid)} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Todos;
