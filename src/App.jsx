import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history"></ul>
        <nav>
          <a>https://rodzenpiotr.com</a>
        </nav>
      </section>
      <section className="main">
        <h1>Tech Pietrek GPT</h1>
        <ul className="feed"></ul>
      </section>
      <div className="bottom-section">
        <div className="input-container">
          <input />
          <div id="submit">-a</div>
          <p className="info">
            ChatGPT may produce inaccurate information about people, places, or
            facts. ChatGPT August 3 Version
          </p>
        </div>
      </div>
      <div>
        <button onClick={toggleTheme}>Toggle Mode</button>
      </div>
    </div>
  );
}

export default App;
