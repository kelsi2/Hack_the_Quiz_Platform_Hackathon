import React, {useContext} from "react";
import {AppContext, AnswerContext, WagerContext} from "../App";
import {Link} from "react-router-dom";

const Results3 = () => {
  const [score, setScore] = useContext(AppContext);
  const {userAnswer, setUserAnswer} = useContext(AnswerContext);
  const {wager, setWager} = useContext(WagerContext);

  const resetGameState = () => {
    setScore(0);
    setUserAnswer("");
    setWager(0);
  };

  return (
    <div className="results-container">
      <div className="text-block">
        <h1>Final Results</h1>

        <h3 className="score-display">Your final score is: ${score}</h3>

        <Link onClick={resetGameState} to="/questions/1" className="submit-button results-button">Play again?</Link>
      </div>
    </div>
  );
};

export default Results3;