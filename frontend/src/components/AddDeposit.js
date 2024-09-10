// frontend/src/components/AddDeposit.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress } from '@mui/material';


const AddDeposit = () => {
  const [depositData, setDepositData] = useState({
    blockNumber: '',
    blockTimestamp: '',
    fee: '',
    hash: '',
    pubkey: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDepositData({
      ...depositData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!depositData.blockNumber || !depositData.blockTimestamp || !depositData.fee || !depositData.hash || !depositData.pubkey) {
      // toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5001/api/deposits', depositData);
      setLoading(false);
      // toast.success('Deposit successfully sent!');
      console.log('Deposit successfully sent:', res.data);
      setDepositData({
        blockNumber: '',
        blockTimestamp: '',
        fee: '',
        hash: '',
        pubkey: '',
      });
    } catch (error) {
      setLoading(false);
      // toast.error('Error sending deposit.');
      console.error('Error sending deposit:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
      <TextField 
        label="Block Number" 
        name="blockNumber" 
        value={depositData.blockNumber} 
        onChange={handleChange} 
        fullWidth 
        variant="outlined"
        required
      />
      <TextField 
        label="Block Timestamp" 
        name="blockTimestamp" 
        value={depositData.blockTimestamp} 
        onChange={handleChange} 
        fullWidth 
        variant="outlined"
        required
      />
      <TextField 
        label="Fee" 
        name="fee" 
        value={depositData.fee} 
        onChange={handleChange} 
        fullWidth 
        variant="outlined"
        required
      />
      <TextField 
        label="Transaction Hash" 
        name="hash" 
        value={depositData.hash} 
        onChange={handleChange} 
        fullWidth 
        variant="outlined"
        required
      />
      <TextField 
        label="Public Key" 
        name="pubkey" 
        value={depositData.pubkey} 
        onChange={handleChange} 
        fullWidth 
        variant="outlined"
        required
      />
      <Button 
        variant="contained" 
        color="primary" 
        type="submit" 
        disabled={loading}
        startIcon={loading && <CircularProgress size="20px" />}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};

export default AddDeposit;
