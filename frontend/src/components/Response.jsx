import { useState, useEffect } from 'react';
import '../styles/Response.css';

const Response = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error:', err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="form-area">
      <h3>Saved Data:</h3>
      {error && <p className="error">Error: {error}</p>}
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.name} <br />
            <strong>Email:</strong> {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Response;
