// frontend/src/App.js

// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddDeposit from './components/AddDeposit'; // Import AddDeposit component
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS


function App() {
  return (
    
    <Router>
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addDeposit" element={<AddDeposit />} />
      </Routes>
    </Router>

  );
}

export default App;
