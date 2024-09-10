// frontend/src/components/DepositList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';

const DepositList = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeposits = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/deposits');
      setDeposits(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deposits:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction Hash</TableCell>
            <TableCell>Block Number</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Fee (ETH)</TableCell>
            <TableCell>PubKey</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deposits.map((deposit) => (
            <TableRow key={deposit._id}>
              <TableCell>
                <a href={`https://etherscan.io/tx/${deposit.hash}`} target="_blank" rel="noopener noreferrer">
                  {deposit.hash.substring(0, 10)}...
                </a>
              </TableCell>
              <TableCell>{deposit.blockNumber}</TableCell>
              <TableCell>{new Date(deposit.blockTimestamp * 1000).toLocaleString()}</TableCell>
              <TableCell>{ethers.utils.formatEther(deposit.fee)}</TableCell>
              <TableCell>{deposit.pubkey}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DepositList;
