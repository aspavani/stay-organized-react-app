import React, { useState } from 'react';
import Layout from '../components/Layout';


const Register = () => {
  const initialFormData = {
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '', // success or error
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (formData.password !== formData.confirmPassword) {
      setFormStatus({ message: 'Passwords do not match', type: 'error' });
      setFormData(initialFormData);
      return;
    }

    // Perform API request to create user
    fetch('http://localhost:8083/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        username: formData.username,
        password: formData.password,
      }),
    })
      .then(response => {
        if (response.ok) {
          setFormStatus({ message: 'User created successfully!', type: 'success' });
          setFormData(initialFormData);
        } else {
          throw new Error('Failed to create user');
        }
      })
      .catch(error => {
        console.error('Error creating user:', error);
        setFormStatus({ message: 'Failed to create user', type: 'error' });
        setFormData(initialFormData);
      });
  };

  return (
    <Layout>
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4 text-center mt-6">Register</h1>
      {formStatus.message && (
        <div className={`p-4 mb-4 ${formStatus.type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
          {formStatus.message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-2">
          Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Username
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Confirm Password
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Register
        </button>
      </form>
    </div>
    </Layout>
  );
};

export default Register;
