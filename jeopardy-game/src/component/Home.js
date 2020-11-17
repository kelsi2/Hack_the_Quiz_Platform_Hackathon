import React from "react";
import {Link} from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <h1 className="home-text">Let's play...</h1>

        <Link to="/questions/1" className="submit-button" id="play-button">New Game</Link>
      </div>
    </>
  );
};

export default Home;