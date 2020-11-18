import React, {createContext, useState} from "react";
import Questions from "./component/Questions";
import Questions2 from "./component/Questions2";
import Home from "./component/Home";
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
            <Route exact path="/" component={Home} />
            <Route path="/questions/1" component={Questions} />
            <Route path="/questions/2" component={Questions2} />
            {/* <Route path="/results" component={Results} /> */}
          </Switch>
        </AnswerContext.Provider>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
