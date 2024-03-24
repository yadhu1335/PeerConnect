// LobbyPage.js

import React, { useState, useEffect, useRef } from 'react';

const LobbyPage = ({ onGo }) => {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');
  const [stream, setStream] = useState(null);
  const [isCameraMuted, setIsCameraMuted] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const videoRef = useRef(null); // Create a ref for the video element

  const handleGoClick = () => {
    // Perform any validation here before proceeding
    if (username.trim() !== '' && roomID.trim() !== '') {
      onGo(username, roomID);
    } else {
      alert('Please enter a valid username and room ID.');
    }
  };

  const handleToggleCamera = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !isCameraMuted;
      setIsCameraMuted(!isCameraMuted);
    }
  };

  const handleToggleMic = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !isMicMuted;
      setIsMicMuted(!isMicMuted);
    }
  };

  useEffect(() => {
    const getMediaStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    getMediaStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream; // Set the srcObject directly on the video element
    }
  }, [stream]);

  return (
    <div className="lobby-container sky-blue">
      <div className="centered-content">
        <div className="left-section">
          <div className="input-section">
            <input
              type="text"
              placeholder="Enter Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Room ID"
              className="input-field"
              value={roomID}
              onChange={(e) => setRoomID(e.target.value)}
            />
          </div>
          <div className="button-section">
            <button onClick={handleGoClick} className="go-button">Go</button>
          </div>
        </div>
        <div className="right-section">
          {/* Camera Feed */}
          <div className="camera-feed">
            <video className="camera-feed" ref={videoRef} autoPlay muted />
          </div>
          {/* Control Buttons */}
          <div className="control-buttons">
            <button onClick={handleToggleCamera} className="control-button">{isCameraMuted ? 'Unmute Camera' : 'Mute Camera'}</button>
            <button onClick={handleToggleMic} className="control-button">{isMicMuted ? 'Unmute Mic' : 'Mute Mic'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
