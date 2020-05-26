import React from 'react';
import Login from './auth/Login';
import OrganizationsList from './OrganizationsList';

function App() {
  return (
    <div className="App">
      <h2>My first Apollo app 🚀</h2>
      <Login />
      <OrganizationsList />
    </div>
  );
}

export default App;
