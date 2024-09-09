// frontend/src/components/DepositList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';  // Correct import for ethers@5

const DepositList = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch deposits from the backend
  const fetchDeposits = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/deposits');
      setDeposits(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching deposits:', error);
      setLoading(false);
    }
  };

  // Fetch deposits when the component mounts
  useEffect(() => {
    fetchDeposits();
  }, []);

  // If loading is true, display a loading message
  if (loading) return <p>Loading deposits...</p>;

  return (
    <div>
      <h3>Recent Deposits</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Transaction Hash</th>
            <th>Block Number</th>
            <th>Timestamp</th>
            <th>Fee (ETH)</th>
            <th>PubKey</th>
          </tr>
        </thead>
        <tbody>
          {deposits.map(deposit => (
            <tr key={deposit._id}>
              <td>
                <a href={`https://etherscan.io/tx/${deposit.hash}`} target="_blank" rel="noopener noreferrer">
                  {deposit.hash.substring(0, 10)}...
                </a>
              </td>
              <td>{deposit.blockNumber}</td>
              <td>{new Date(deposit.blockTimestamp * 1000).toLocaleString()}</td>
              <td>{ethers.utils.formatEther(deposit.fee)}</td> {/* Corrected ethers.utils usage */}
              <td>{deposit.pubkey}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
};

export default DepositList;
