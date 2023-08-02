import { useState } from "react";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New chat</button>
        <ul className="history"></ul>
        <nav>
          <a>https://www.rodzenpiotr.com</a>
        </nav>
      </section>
    </div>
  );
};

export default App;
