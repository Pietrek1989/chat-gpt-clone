import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

function App() {
  const [theme, setTheme] = useState("dark");
  const [message, setMessage] = useState(null);
  const [value, setValue] = useState("");
  const [currentTitle, setCurrentTitle] = useState(null);
  const [previousChats, setPreviousChats] = useState({});

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:3001/chatgpt/completions",
        options
      );
      const data = await response.json();
      const botMessage = data.choices[0].message;

      // Add the user message first
      setPreviousChats((prevChats) => {
        const newChats = { ...prevChats };
        const title = currentTitle || value; // Use currentTitle if it exists; otherwise, use user input
        newChats[title] = [
          ...(newChats[title] || []),
          {
            title,
            role: "user",
            content: value,
          },
        ];
        return newChats;
      });

      // Then add the bot message
      setPreviousChats((prevChats) => {
        const newChats = { ...prevChats };
        const title = currentTitle || value; // Use currentTitle if it exists; otherwise, use user input
        newChats[title] = [
          ...(newChats[title] || []),
          {
            title,
            role: botMessage.role,
            content: botMessage.content,
          },
        ];
        return newChats;
      });

      // Set currentTitle only if it's not set
      if (!currentTitle) {
        setCurrentTitle(value);
      }

      setMessage(botMessage);
    } catch (error) {
      console.error(error);
    }
  };

  const createNewChat = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };
  const currentChat = previousChats[currentTitle] || [];

  const uniqueTitles = Object.keys(previousChats);

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  console.log(message);
  console.log(uniqueTitles);
  console.log(previousChats);
  console.log("curent", currentChat);

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => (
            <li key={index} onClick={() => handleClick(uniqueTitle)}>
              {uniqueTitle}
            </li>
          ))}
        </ul>
        <nav>
          <a href="https://rodzenpiotr.com">https://rodzenpiotr.com</a>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>Tech Pietrek GPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li key={index}>
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>{" "}
            </li>
          ))}
        </ul>

        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <div id="submit" onClick={getMessages}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="none"
                className="h-4 w-4 m-1 md:m-0"
                strokeWidth="2"
              >
                <path
                  d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <p className="info">
              ChatGPT may produce inaccurate information about people, places,
              or facts. ChatGPT August 3 Version
            </p>
          </div>
        </div>
      </section>
      <div>
        <button onClick={toggleTheme}>Toggle</button>
      </div>
    </div>
  );
}

export default App;
