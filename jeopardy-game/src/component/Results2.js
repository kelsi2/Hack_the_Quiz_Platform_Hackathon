import React, {useContext} from "react";
import {AppContext} from "../App";
import {Link} from "react-router-dom";

const Results1 = () => {
  const [score, setScore] = useContext(AppContext);

  return (
    <div className="results-container">
      <div className="text-block">
        <h1>Round 2 Results</h1>

        <h3 className="score-display">Your current score is: ${score}</h3>

        <Link to="/questions/3" className="submit-button results-button">Begin Final Jeopardy!</Link>
      </div>
    </div>
  );
};

export default Results1;