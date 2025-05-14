import { createContext, useState } from 'react';
import { generateContent, generateContentWithImage } from '../config/gemini';

export const GeminiContext = createContext();

export const GeminiProvider = ({ children }) => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [history, setHistory] = useState([]); // <-- Add this
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeOption, setActiveOption] = useState('chat');

  const onSent = async (prompt, imageFile = null) => {
    setConversation(prev => [...prev, { prompt, response: '' }]);
    setInput('');
    setLoading(true);
    setError('');
    try {
      let response;
      if (imageFile) {
        response = await generateContentWithImage(prompt, imageFile);
      } else {
        response = await generateContent(prompt);
      }
      setConversation(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { prompt, response };
        return updated;
      });
      // Add to history OUTSIDE of setConversation
      setHistory(h =>
        h.find(item => item.prompt === prompt) ? h : [...h, { prompt, response }]
      );
    } catch (err) {
      setError('An error occurred while generating a response. Please try again.');
      setConversation(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { prompt, response: 'Error: Could not get a response.' };
        return updated;
      });
      setHistory(h =>
        h.find(item => item.prompt === prompt)
          ? h
          : [...h, { prompt, response: 'Error: Could not get a response.' }]
      );
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setConversation([]);
    setInput('');
    setError('');
  };

  const contextValue = {
    input,
    setInput,
    conversation,
    setConversation,
    history,
    setHistory,
    loading,
    error,
    onSent,
    startNewChat,
    activeOption,
    setActiveOption,
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {children}
    </GeminiContext.Provider>
  );
};