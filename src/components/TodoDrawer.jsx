// TodoDrawer.jsx
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

const TodoDrawer = ({ isOpen, onClose, todo, onSave, isCreateMode }) => {
  const [formData, setFormData] = useState({
    description: '',
    category: '',
    deadline: '',
    priority: 'Low',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from the API
    fetch('http://localhost:8083/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories', error));
  }, []);

  useEffect(() => {
    if (!isCreateMode) {
      setFormData({
        description: todo.description,
        category: todo.category,
        deadline: todo.deadline,
        priority: todo.priority,
        completed: todo.completed
      });
    }
  }, [todo, isCreateMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      userid: todo.userid,
      category: formData.category,
      deadline: formData.deadline,
      priority: formData.priority,
      description: formData.description,
      completed: isCreateMode? false:formData.completed,
    };
    setFormData({
        description: '',
        category: '',
        deadline: '',
        priority: 'Low',
      });
    onSave(newTodo);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div
        className={`fixed bg-white z-50 shadow-lg p-4 overflow-y-auto transition-transform transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } right-0 top-0 bottom-0 w-full sm:w-1/3`}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-bold">{isCreateMode ? 'Create Todo' : 'Edit Todo'}</h2>
          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label>
            Description
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Deadline
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>
          <label>
            Priority
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          {!isCreateMode && (
            <label className="flex items-center">
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                className="mr-2"
              />
              Completed
            </label>
          )}
          <button type="submit" className="bg-yellow-500 text-white p-2 rounded">
            {isCreateMode ? 'Create Todo' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TodoDrawer;
