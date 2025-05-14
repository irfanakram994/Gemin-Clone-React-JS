import { useState, useContext } from 'react';
import { GeminiContext } from '../../context/context';
import './Sidebar.css';

import geminiIcon from '../../assets/gemini_icon.png';
import messageIcon from '../../assets/message_icon.png';
import plusIcon from '../../assets/plus_icon.png';
import historyIcon from '../../assets/history_icon.png';
import settingIcon from '../../assets/setting_icon.png';
import menuIcon from '../../assets/menu_icon.png';

const Sidebar = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const { 
    input,
    setInput,
    conversation,
    history,
    onSent, 
    activeOption,
    setActiveOption,
    startNewChat
  } = useContext(GeminiContext);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const navOptions = [
    { name: 'chat', icon: messageIcon, label: 'Chat' }
  ];

  return (
    <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={geminiIcon} alt="Gemini Logo" className="gemini-sidebar-logo" />
          {isSidebarExpanded && <span className="logo-text">Gemini</span>}
        </div>
        <button onClick={toggleSidebar} className="toggle-button">
          <img src={menuIcon} alt="Toggle sidebar" />
        </button>
      </div>
      
      <div className="new-chat-button-container">
        <button onClick={startNewChat} className="new-chat-button">
          <img src={plusIcon} alt="New chat" />
          {isSidebarExpanded && <span>New chat</span>}
        </button>
      </div>
      
      <div className="nav-options">
        {navOptions.map((option) => (
          <div 
            key={option.name}
            className={`nav-option ${activeOption === option.name ? 'active' : ''}`}
            onClick={() => setActiveOption(option.name)}
          >
            <img src={option.icon} alt={option.label} />
            {isSidebarExpanded && <span>{option.label}</span>}
          </div>
        ))}
      </div>
      
      {isSidebarExpanded && history.length > 0 && (
        <div className="recent-activity">
          <div className="recent-header">
            <img src={historyIcon} alt="Recent activity" />
            <span>Recent activity</span>
          </div>
          <div className="prompts-list">
            {history.slice().reverse().slice(0, 10).map((msg, index) => (
              <div 
                key={index} 
                className="prompt-item"
                onClick={() => onSent(msg.prompt)}
              >
                <span className="prompt-text">
                  {msg.prompt.length > 25 ? msg.prompt.substring(0, 25) + '...' : msg.prompt}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sidebar-footer">
        <div className="settings">
          <img src={settingIcon} alt="Settings" />
          {isSidebarExpanded && <span>Settings</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;