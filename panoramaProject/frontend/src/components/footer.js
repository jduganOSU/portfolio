import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footerContainer}>
      <div style={styles.linkContainer}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/favorites" style={styles.link}>Favorites</Link>
        <Link to="/generate" style={styles.link}>ChatGPT Generation</Link>
        < a href="/" style={styles.link}>Main Portfolio Homepage</a>
      </div>
      <p style={styles.copyright}>© {currentYear} Jack Dugan. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footerContainer: {
    padding: '20px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#f4f4f4',
  },
  linkContainer: {
    marginBottom: '10px',
  },
  link: {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#333',
    transition: 'color 0.3s',

    '&:hover': {
      color: '#007bff',
    }
  },
  copyright: {
    fontSize: '0.9em',
    color: '#666',
  }
}

export default Footer;
