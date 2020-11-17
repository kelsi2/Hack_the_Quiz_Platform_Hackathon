import React, {createContext, useState} from "react";
import Questions from "./component/questions";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export const AppContext = createContext([{}, () => { }]);
export const AnswerContext = createContext([{}, () => { }]);
// export const TimerContext = createContext([{}, () => {}]);

function App() {
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  // const [time, setTime] = useState(30)
  console.log(userAnswer);
  return (
    <Router>
      <AppContext.Provider value={[score, setScore]}>
        <AnswerContext.Provider value={{userAnswer, setUserAnswer}}>
          <Switch className="App">
            {/* <Route exact path="/" component={Home} /> */}
            <Route path="/questions/:round" component={Questions} />
            {/* <Route path="/results" component={Results} /> */}
          </Switch>
        </AnswerContext.Provider>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
