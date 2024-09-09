// backend/index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ethers } = require('ethers');
const Deposit = require('./models/Deposit');
const logger = require('./config/logger');
// const logger = require('./config/logger');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => logger.info('MongoDB connected'))
.catch(err => logger.error('MongoDB connection error:', err));

// Setup Ethereum Provider
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

// Beacon Deposit Contract Address
const BEACON_DEPOSIT_CONTRACT = process.env.BEACON_CONTRACT_ADDRESS;

// Function to monitor deposits
const monitorDeposits = async () => {
  provider.on('pending', async (txHash) => {
    try {
      const tx = await provider.getTransaction(txHash);
      if (tx && tx.to && tx.to.toLowerCase() === BEACON_DEPOSIT_CONTRACT.toLowerCase()) {
        // Fetch transaction receipt to get more details
        const receipt = await provider.getTransactionReceipt(txHash);
        if (receipt && receipt.status === 1) { // 1 means success
          const depositData = {
            blockNumber: receipt.blockNumber,
            blockTimestamp: (await provider.getBlock(receipt.blockNumber)).timestamp,
            fee: tx.gasPrice.mul(receipt.gasUsed).toString(),
            hash: txHash,
            pubkey: 'Extracted_PubKey_If_Applicable', // Replace with actual extraction logic
          };
          const deposit = new Deposit(depositData);
          await deposit.save();
          logger.info(`Deposit saved: ${txHash}`);
        }
      }
    } catch (error) {
      logger.error('Error processing transaction:', error);
    }
  });
};

monitorDeposits();

// Define Routes
app.get('/api/deposits', async (req, res) => {
  try {
    const deposits = await Deposit.find().sort({ blockNumber: -1 });
    res.json(deposits);
  } catch (error) {
    logger.error('Error fetching deposits:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});


// backend/index.js (Add this after setting up the provider)

const contractABI = [
    // Minimal ABI to listen to Deposit events
    "event Deposit(address indexed sender, uint256 amount, bytes pubkey)"
  ];
  
  // Initialize Contract
  const contract = new ethers.Contract(BEACON_DEPOSIT_CONTRACT, contractABI, provider);
  
  // Listen to Deposit Events
  contract.on('Deposit', async (sender, amount, pubkey, event) => {
    try {
      const depositData = {
        blockNumber: event.blockNumber,
        blockTimestamp: (await provider.getBlock(event.blockNumber)).timestamp,
        fee: event.gasPrice.mul(event.gasUsed).toString(),
        hash: event.transactionHash,
        pubkey: pubkey,
      };
      const deposit = new Deposit(depositData);
      await deposit.save();
      logger.info(`Deposit saved from event: ${event.transactionHash}`);
    } catch (error) {
      logger.error('Error processing deposit event:', error);
    }
});
  

// Fetch Deposit by ID
app.get('/api/deposits/:id', async (req, res) => {
    try {
      const deposit = await Deposit.findById(req.params.id);
      if (!deposit) return res.status(404).json({ error: 'Deposit not found' });
      res.json(deposit);
    } catch (error) {
      logger.error('Error fetching deposit:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Delete All Deposits
  app.delete('/api/deposits', async (req, res) => {
    try {
      await Deposit.deleteMany({});
      res.json({ message: 'All deposits deleted' });
    } catch (error) {
      logger.error('Error deleting deposits:', error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

  // Global Error Handler
app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });