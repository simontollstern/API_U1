import React from 'react';
import './App.css';

function getAll(){
  fetch('http://localhost:3001/')
    .then(res => res.json())
    .then(data => console.log(data));
}

function App() {
  getAll();

  return (
    <div className="App">

    </div>
  );
}

export default App;
