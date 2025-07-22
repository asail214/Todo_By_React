import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <div className="app-wrapper d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <h1>
      <i className="bi bi-journal-check"></i> تطبيق قائمة المهام</h1>
    <Home />
    </div>
  );
}

export default App;