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
          <a>https://www.rodzenpiotr.com</a>
        </nav>
      </section>

      <div>
        <button onClick={toggleTheme}>Toggle Mode</button>
      </div>
    </div>
  );
}

export default App;
