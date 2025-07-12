import React from 'react'
import Sidebar from "./components/Sidebar/Sidebar"
import Main from "./Components/Main/Main"
import "./index.css"

const App = () => {
  return (
    <div className="h-screen flex font-outfit" style={{
      animation: "fadeIn 1.5s ease-in-out",
      animationFillMode: "forwards",
    }}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;
