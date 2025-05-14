

# 💫 Gemini Clone using React.js & Gemini API

A modern and responsive Gemini clone built with **React.js**, integrating **Google's Generative AI API (`@google/generative-ai`)**. This project simulates the functionality of a chatbot powered by Google's Gemini model, offering a sleek interface and fast response times—ideal for experimentation, learning, or extending with new features.

---

## 📁 Project Structure

```plaintext
GEMINI-CLONE/
│
├── public/
│   └── index.html                # Root HTML file
│
├── src/
│   ├── assets/                   # For images, fonts, etc. (currently unused)
│   ├── components/
│   │   ├── Main/
│   │   │   ├── Main.jsx          # Handles main chat UI
│   │   │   └── Main.css
│   │   └── Sidebar/
│   │       ├── Sidebar.jsx      # Sidebar for navigation or history
│   │       └── Sidebar.css
│   ├── config/
│   │   └── gemini.js             # Handles configuration & Gemini API calls
│   ├── context/
│   │   └── context.jsx           # Global context (React Context API)
│   ├── App.jsx                   # Root component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # ReactDOM render logic
│
├── .env                          # API keys and environment variables
├── .gitignore
├── eslint.config.js              # ESLint configuration
├── package.json
├── package-lock.json
```

---

## 🚀 Features

* ✅ Real-time AI-powered chat interface using **Gemini API**
* ✅ Modern, responsive UI built with React components
* ✅ Context API for state management
* ✅ Code-split and well-organized folder structure
* ✅ Environment-based API key management
* ✅ Styled with CSS modules

---

## 🔌 Dependencies

Here are the main dependencies used in the project:

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "@google/generative-ai": "^0.2.x",
  "eslint": "^8.x",
  "vite": "^4.x" // if Vite was used for the build
}
```

Install all dependencies with:

```bash
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory and add your Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

---

## 🧠 How It Works

* **Main.jsx**: The primary interface where user inputs are taken and responses are rendered.
* **Sidebar.jsx**: Optional component for history, categories, or custom logic.
* **gemini.js**: API configuration file where the Gemini model is initialized using `@google/generative-ai`.
* **context.jsx**: Uses React's Context API to manage and pass chat state/data throughout components.

---

## ▶️ Running the Project

Make sure you have Node.js installed. Then run:

```bash
npm install
npm run dev
```

Visit the app at `http://localhost:5173` (or wherever your dev server runs).

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📄 License

This project is for educational and experimental use. Refer to the [Google Gemini API usage policy](https://ai.google.dev/gemini-api/docs/usage) before deploying commercially.

---

## 💬 Acknowledgments

* Thanks to Google for the [Generative AI](https://ai.google.dev) APIs
* Inspired by the design and functionality of **Gemini**

---
                                                          ## Developed by:   Irfan Ali
