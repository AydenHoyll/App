import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [message, setMessage] = useState('')

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error(error));
  }, []);


  return (
    <div className="App">
   {message ? (<div style={{fontSize: 50}}>{message}</div>) : 'hello world'}
    </div>
  );
}

export default App;
