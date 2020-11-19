import React from "react";
import {Link} from "react-router-dom";

const Instructions = () => {
  return (
    <>
      <div className="results-container">
        <div className="text-block">
          <h1>How to play Jeopardy:</h1>
          <h3>1. Pick a category and points value (the questionss increase in difficulty as the point values go up). Round 1 has values from $100-$500 (incrementing by $100), Round 2 from $200-$1000 (incrementing by $200).</h3>
          <h3>2. Click the chosen box to display the question. You will be given 30 seconds to enter your answer in the text box and click submit.</h3>
          <h3>3. If your answer is correct you will be awarded the value of the question, if incorrect the same amount will be deducted from your current points (this includes going into negative values, be careful!)</h3>
          <h3>4. Round 3 is a final Jeopardy round where you will be asked to enter a wager based on the current value of your points. You can bet as much or as little of your earnings as you want, if you answer correctly you will win this amount, if you are incorrect you will lose this amount. Once you've answered the game is complete!</h3>
          <Link to="/questions/1" className="submit-button">Start a new game</Link>
        </div>
      </div>
    </>
  );
};

export default Instructions;