import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <h1 className="home-text">Let's play...</h1>
        <span className="home-buttons">
          <Link to="/questions/1" className="submit-button">New Game</Link>
          <Link to="/instructions" className="submit-button">How to Play</Link>
        </span>
      </div>
    </>
  );
};

export default Home;