import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const GenerateCoordinates = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/panorama/openai', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userInput: prompt })
      });

       // Check if the response is OK (status code 200-299)
    if (response.ok) {
      const data = await response.json();
      const { lat, lng } = data;

      navigate(`/individual/${lat}/${lng}`);
  } else {
      // If the status code is not in the range 200-299, 
      // it means there's some error.
      alert('chatGPT was unable to generate coordinates from that prompt');
  }

} catch (error) {
    console.error("Error fetching coordinates: ", error);
}
};


  return (
    <div style={styles.container}>
      <h2>Generate Coordinates</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <label htmlFor="promptInput" style={styles.label}>Enter your prompt:</label>
          <textarea 
            id="promptInput"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        <button type="submit" style={styles.button}>Generate</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    boxShadow: '0px 0px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
  },
  inputContainer: {
    margin: '20px 0',
  },
  label: {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '100px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  }
}

export default GenerateCoordinates;
