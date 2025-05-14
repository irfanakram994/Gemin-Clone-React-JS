import { useContext } from 'react';
import { GeminiContext } from './context/context';
import Main from './components/Main/Main.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import './index.css';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export async function listModels() {
  const models = await genAI.listModels();
  console.log('Available models:', models);
}

function App() {
  const { activeOption } = useContext(GeminiContext);

  return (
    <div className="app-container">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;