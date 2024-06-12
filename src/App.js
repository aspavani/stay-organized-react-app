// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos'; // Import the Todos page component
import Register from './pages/Register';
import Layout from './components/Layout'; // Import the Layout component

function App() {
  return (
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    
  );
}

export default App;
