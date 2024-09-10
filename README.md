# Ethereum Deposit Tracker

## Overview

The **Ethereum Deposit Tracker** is a full-stack application built using the **MERN stack** (MongoDB, Express, React, Node.js) and **ethers.js** for interacting with the Ethereum blockchain. It monitors ETH deposits made to the **Beacon Chain Deposit Contract** on the Ethereum 2.0 network. The application retrieves deposit information such as block number, transaction hash, fee, and the public key (`pubkey`) of the depositor, stores it in a database, and displays it via a user-friendly interface.

### Key Features:
- **Real-time Ethereum deposit tracking** from the Beacon Chain Deposit Contract.
- **MongoDB** for storing deposit information.
- **React**-based frontend to display deposits and submit new deposit data.
- **REST API** for managing deposits (fetch, add, delete).

---

## Project Structure

    ```bash
    ethereum-deposit-tracker/
    ├── backend/
    │   ├── config/           # Contains logger configurations
    │   ├── models/           # Mongoose models for Deposit schema
    │   ├── index.js          # Main backend entry point
    │   ├── package.json      # Backend dependencies and scripts
    ├── frontend/
    │   ├── src/
    │   │   ├── components/   # Contains React components like Navbar, AddDeposit
    │   │   ├── pages/        # Contains page components like Home
    │   ├── App.js            # Main React App component
    │   ├── index.js          # Frontend entry point
    │   ├── package.json      # Frontend dependencies and scripts
    ├── README.md             # Project documentation
    ├── .env                  # Environment variables
    └── docker-compose.yml    # Docker setup (optional)

---

## Installation and Setup

### Prerequisites
Ensure that you have the following installed:
- **Node.js** (v16 or above)
- **MongoDB** (Local or MongoDB Atlas)
- **Ethereum RPC Provider** (e.g., [Alchemy](https://www.alchemy.com/) or [Infura](https://infura.io/))

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ethereum-deposit-tracker.git
   cd ethereum-deposit-tracker
2. Install dependencies for the backend:

    ```bash
    cd backend
    npm install

3. Set up your environment variables: Create a .env file in the backend directory with the following content:

    ```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    RPC_URL=your_ethereum_rpc_url
    BEACON_CONTRACT_ADDRESS=0x00000000219ab540356cBB839Cbe05303d7705Fa

4. Start the backend server:

    ```bash
    npm run dev
    Frontend Setup

5. Install dependencies for the frontend:

    ```bash
    cd frontend
    npm install

6. Start the frontend development server:

    ```bash
    npm start

## How It Works

### Backend (Node.js, Express, MongoDB)

The backend is responsible for:
- Connecting to the Ethereum network via **ethers.js** and monitoring deposits on the **Beacon Chain Deposit Contract**.
- Storing the deposit data in **MongoDB** using **Mongoose**.
- Providing a REST API to the frontend for retrieving and adding deposits.

Key functionalities:
- **Monitor Deposits**: Uses the Ethereum JSON-RPC provider to listen for transactions directed to the deposit contract. Valid transactions are stored in MongoDB.
- **REST API Endpoints**:
  - `GET /api/deposits`: Fetch all tracked deposits.
  - `POST /api/deposits`: Submit a new deposit (useful for testing or manual entries).
  - `DELETE /api/deposits`: Remove all deposits from the database.

### Frontend (React)

The frontend allows users to:
- View all Ethereum deposits that have been tracked by the backend.
- Manually submit deposit data using a form (useful for testing).

#### Key Components:
- **DepositList**: Displays the list of tracked deposits.
- **AddDeposit**: A form that allows users to submit a new deposit manually.

### Flow of Data
1. **Monitoring Deposits**:
   - The backend listens for new Ethereum deposits using the `ethers.js` library.
   - When a deposit is detected, the backend saves the deposit data (block number, transaction hash, fee, and public key) to MongoDB.

2. **Displaying Deposits**:
   - The frontend fetches deposit data from the backend and displays it in a table.
   - Users can see details like the transaction hash, block number, fee, and public key.

3. **Manual Deposit Submission**:
   - The frontend includes a form for manually adding deposits.
   - Upon form submission, the frontend sends the data to the backend via a `POST` request, and the new deposit is stored in MongoDB.

---

## API Documentation

### Endpoints

#### `GET /api/deposits`
Fetch all tracked deposits from the database.

- **Response**:
  ```json
  [
    {
      "_id": "60f85d5b8f98762f2c8b4567",
      "blockNumber": 0x900C787FB3c82895637144A77e0C41dAeb3a8D99,
      "blockTimestamp": 1620918734,
      "fee": "0.0002808855 ETH",
      "hash": "0x1391be19259f10e01336a383217cf35344dd7aa157e95030f46235448ef5e5d6",
      "pubkey": "0xa102..."
    },
    ...
  ]

## Environment Variables

Ensure that the following environment variables are set in your `.env` file:

- `PORT`: Port for the backend server (default is 5000).
- `MONGO_URI`: MongoDB connection string (can be local or cloud-based like MongoDB Atlas).
- `RPC_URL`: Ethereum RPC provider URL (from services like Infura or Alchemy).
- `BEACON_CONTRACT_ADDRESS`: The Beacon Chain deposit contract address (`0x00000000219ab540356cBB839Cbe05303d7705Fa` for the mainnet).

---

## Future Enhancements
- Real-time Notifications: Add support for real-time notifications (e.g., via WebSocket or Telegram) when a new deposit is detected.
- Grafana Dashboard: Visualize deposit metrics and statistics using Grafana.
- Advanced Deposit Parsing: Implement support for tracking deposits across internal Ethereum transactions

## Contributing
Feel free to contribute to this project by opening issues or submitting pull requests. Here are some areas where contributions are welcome:

- Enhancing the UI/UX of the frontend.
- Optimizing backend performance for monitoring deposits.
- Adding support for more Ethereum networks (e.g., Ropsten or Goerli testnets).
