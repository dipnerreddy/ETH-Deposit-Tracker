// frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={styles.nav}>
    <h2>ETH Deposit Tracker</h2>
    <div>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/addDeposit" style={styles.link}>Add Deposit</Link>
    </div>
  </nav>
);

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#282c34',
    color: 'white',
  },
  link: {
    margin: '0 1rem',
    color: 'white',
    textDecoration: 'none',
  },
};

export default Navbar;
