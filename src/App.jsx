import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import Sidebar from "./components/Sidebar";
import BottomSection from "./components/BottomSection";

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
        const title = currentTitle || value;
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
      <Sidebar
        createNewChat={createNewChat}
        uniqueTitles={uniqueTitles}
        handleClick={handleClick}
      ></Sidebar>
      <section className="main">
        {!currentTitle && <h1>Tech Pietrek GPT</h1>}
        <ul className="feed">
          {currentChat?.map((chatMessage, index) => (
            <li
              key={index}
              className={chatMessage.role === "user" ? "user" : "bot"}
            >
              {" "}
              <p className="role">{chatMessage.role}</p>
              <p>{chatMessage.content}</p>{" "}
            </li>
          ))}
        </ul>

        <BottomSection
          value={value}
          setValue={setValue}
          getMessages={getMessages}
        ></BottomSection>
      </section>
      <div className="toggle">
        <label className="switch">
          <input type="checkbox" onClick={toggleTheme} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
}

export default App;
