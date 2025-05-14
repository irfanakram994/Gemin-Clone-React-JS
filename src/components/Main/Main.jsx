import { useContext, useRef, useEffect, useState } from 'react';
import { GeminiContext } from '../../context/context';
import './Main.css';

import geminiIcon from '../../assets/gemini_icon.png';
import sendIcon from '../../assets/send_icon.png';
import micIcon from '../../assets/mic_icon.png';
import galleryIcon from '../../assets/gallery_icon.png';
import bulbIcon from '../../assets/bulb_icon.png';
import userIcon from '../../assets/user_icon.png'; // <-- Import user icon

const Main = () => {
  const {
    input,
    setInput,
    conversation,
    loading,
    error,
    onSent,
  } = useContext(GeminiContext);

  const inputRef = useRef(null);
  const resultRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSent(input);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    // Shift+Enter will allow a new line (default behavior)
  };

  // Handle image icon click
  const handleImageIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      onSent(input, file);
    }
  };

  // Microphone logic
  const handleMicClick = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (!isListening) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } else {
      recognitionRef.current && recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="main">
      {/* User icon in upper right */}
      <div className="user-icon-container">
        <img src={userIcon} alt="User" className="user-icon" />
      </div>
      <div className="main-container">
        {conversation.length === 0 ? (
          <div className="welcome-section">
            <div className="gemini-intro">
              <img src={geminiIcon} alt="Gemini Logo" className="gemini-logo" />
              <h1 className="gradient-text">How can I help you today?</h1>
            </div>
            <div className="quick-suggestions">
              <div className="suggestion-row">
                <div className="suggestion-card" onClick={() => onSent("Write a story about a space explorer")}>
                  <img src={bulbIcon} alt="Idea" />
                  <p>Write a story about a space explorer</p>
                </div>
                <div className="suggestion-card" onClick={() => onSent("Create a weekly workout plan")}>
                  <img src={bulbIcon} alt="Idea" />
                  <p>Create a weekly workout plan</p>
                </div>
              </div>
              <div className="suggestion-row">
                <div className="suggestion-card" onClick={() => onSent("Explain quantum computing")}>
                  <img src={bulbIcon} alt="Idea" />
                  <p>Explain quantum computing</p>
                </div>
                <div className="suggestion-card" onClick={() => onSent("Brainstorm gift ideas for a friend")}>
                  <img src={bulbIcon} alt="Idea" />
                  <p>Brainstorm gift ideas for a friend</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="result-section" ref={resultRef}>
            {conversation.map((msg, idx) => (
              <div key={idx}>
                <div className="prompt-container">
                  <p>{msg.prompt}</p>
                </div>
                <div className="result-container">
                  <img src={geminiIcon} alt="Gemini" className="result-icon" />
                  <div className="result-content">
                    <div className="result-text">
                      {msg.response
                        ? msg.response.split('\n').map((text, i) => (
                            <p key={i}>{text}</p>
                          ))
                        : (idx === conversation.length - 1 && loading) ? (
                            <div className="loading-indicator">
                              <div className="loading-dots">
                                <span></span>
                                <span></span>
                                <span></span>
                              </div>
                            </div>
                          ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {error && <div className="error-message">{error}</div>}
          </div>
        )}
      </div>
      <div className="input-container">
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input
              type="text"
              value={input}
              ref={inputRef}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Gemini..."
              className="prompt-input"
            />
            <div className="input-actions">
              <button type="button" className="action-button" onClick={handleMicClick}>
                <img src={micIcon} alt="Voice input" style={{ filter: isListening ? 'invert(34%) sepia(99%) saturate(7492%) hue-rotate(201deg) brightness(99%) contrast(92%)' : undefined }} />
              </button>
              <button type="button" className="action-button" onClick={handleImageIconClick}>
                <img src={galleryIcon} alt="Upload image" />
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <button 
                type="submit" 
                className={`send-button ${input.trim() ? 'active' : ''}`}
                disabled={!input.trim()}
              >
                <img src={sendIcon} alt="Send" />
              </button>
            </div>
          </div>
        </form>
        <div className="disclaimer">
          <p>Gemini may display inaccurate info, including about people, so double-check its responses.</p>
        </div>
      </div>
    </div>
  );
};

export default Main;