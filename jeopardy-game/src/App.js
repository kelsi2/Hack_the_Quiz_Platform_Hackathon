import React, { createContext, useState } from "react";
import Questions from "./component/questions";

export const AppContext = createContext([{}, () => {}]);
export const AnswerContext = createContext([{}, () => {}]);
// export const TimerContext = createContext([{}, () => {}]);

function App() {
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  // const [time, setTime] = useState(30)

  return (
    <AppContext.Provider value={[score, setScore]}>
      <AnswerContext.Provider value={[userAnswer, setUserAnswer]}>
        <div className="App">
          <h1>Jeopardy</h1>
          <Questions />
        </div>
      </AnswerContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
