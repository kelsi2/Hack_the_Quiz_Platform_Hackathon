import React, {createContext, useState} from "react";
import Questions from "./component/Questions";
import Questions2 from "./component/Questions2";
import Questions3 from "./component/Questions3";
import Results1 from "./component/Results1";
import Results2 from "./component/Results2";
import Results3 from "./component/Results3";
import Home from "./component/Home";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

export const AppContext = createContext([{}, () => { }]);
export const AnswerContext = createContext([{}, () => { }]);
export const WagerContext = createContext([{}, () => { }]);
// export const TimerContext = createContext([{}, () => {}]);

function App() {
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [wager, setWager] = useState(0);
  return (
    <Router>
      <AppContext.Provider value={[score, setScore]}>
        <AnswerContext.Provider value={{userAnswer, setUserAnswer}}>
          <WagerContext.Provider value={{wager, setWager}}>
            <Switch className="App">
              <Route exact path="/" component={Home} />
              <Route path="/questions/1" component={Questions} />
              <Route path="/questions/2" component={Questions2} />
              <Route path="/questions/3" component={Questions3} />
              <Route path="/results/1" component={Results1} />
              <Route path="/results/2" component={Results2} />
              <Route path="/results/3" component={Results3} />
            </Switch>
          </WagerContext.Provider>
        </AnswerContext.Provider>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
