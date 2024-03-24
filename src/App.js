import React from 'react';
import LobbyPage from './LobbyPage';
import './App.css'

function App() {
  const handleGo = (username, roomID) => {
    // Implement navigation or further processing here
    console.log('Username:', username);
    console.log('Room ID:', roomID);
  };

  return (
    <div className="App">
      <LobbyPage onGo={handleGo} />
    </div>
  );
}

export default App;

