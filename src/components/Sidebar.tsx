import React from "react";

const Sidebar = ({ createNewChat, uniqueTitles, handleClick }) => {
  return (
    <section className="side-bar">
      <button onClick={createNewChat}>+ New chat</button>
      <ul className="history">
        {uniqueTitles?.map((uniqueTitle, index) => (
          <li key={index} onClick={() => handleClick(uniqueTitle)}>
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>

            <span>{uniqueTitle}</span>
          </li>
        ))}
      </ul>
      <nav>
        <a href="https://rodzenpiotr.com">https://rodzenpiotr.com</a>
      </nav>
    </section>
  );
};

export default Sidebar;
