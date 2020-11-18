import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../store/actions/questionsActions";
// import {getScore} from "../store/actions/scoreActions";
import Modal from "./Modal";
import WagerModal from "./WagerModal";
import { AppContext, AnswerContext, WagerContext } from "../App";
import { Link, useHistory } from "react-router-dom";

const Questions3 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [wagerModalOpen, setWagerModalOpen] = useState(true);
  const [questionText, setQuestionText] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [qpoints, setQPoints] = useState(0);
  const [score, setScore] = useContext(AppContext);
  const { userAnswer, setUserAnswer } = useContext(AnswerContext);
  const { wager, setWager } = useContext(WagerContext);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [roundTime, setRoundTime] = useState(1000);
  const [answeredQuetions, setAnsweredQuestions] = useState(0);
  let userInput = document.getElementById("answer");
  const correctAnswer = document.getElementById("correctAnswer");

  const usersQuestionData = useSelector((state) => state.questionsList);
  const { questions13, category12 } = usersQuestionData;
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  //global round timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRoundTime((roundTime) => roundTime - 1);
      checkRoundTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [roundTime]);

  //checkRoundTimer
  const checkRoundTime = () => {
    if (roundTime < 1) {
      //TODO REMAP TO 3RD ROUND
      history.push("/results/3");
    }
  };

  //useEffect that makes the timer tick
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        checkTime();
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  //makes the timer start
  const countDown = () => {
    setIsActive(!isActive);
  };
  //resets our timer
  const resetTimer = () => {
    setSeconds(30);
    setIsActive(false);
  };
  //checkTime
  const checkTime = () => {
    if (seconds < 1) {
      handleClose();
    }
  };

  const checkAnswer = () => {
    if (answerText === userInput.innerText) {
      setScore(score + parseInt(wager));
    }
    if (answerText !== userInput.innerText && userInput.innerText !== "") {
      setScore(score - parseInt(wager));
    }
  };

  useEffect(() => {
    if (hasAnswered) {
      checkAnswer();
      resetAnswer();
    }
  }, [hasAnswered]);
  // console.log("UsersAnswer:", userAnswer);

  const resetAnswer = () => {
    setHasAnswered(false);
    //we need a way to reset our answer once checked
  };

  const checkNumberAnsweredQuestions = () => {
    if (answeredQuetions === 30) {
      //TODO REMAP TO 3RD ROUND
      history.push("/results/3");
    }
    return;
  };

  //When the Modal opens
  const toggleModal = () => {
    console.log(questions13);
    // console.log(event.target);
    // event.target.disabled = true;
    setAnsweredQuestions(answeredQuetions + 1);
    countDown();
    setQuestionText(questions13.clues[3].question);
    setCategoryText(category12.title);
    setQPoints(wager);
    setAnswerText(questions13.clues[3].answer.replace(/<[^>]+>/g, ""));
    console.log(answerText);
    setOpen(true);
  };

  //seperate close function for wager modal
  const handleWagerClose = () => {
    setWagerModalOpen(false);
    setTimeout(() => {
      toggleModal();
    }, 3000);
    //maybe put some more logic in here to make the question pop up
  };

  //When the modal closes
  const handleClose = (event) => {
    console.log(correctAnswer);
    event.target.disabled = true;
    setHasAnswered(!hasAnswered);
    resetTimer();
    checkNumberAnsweredQuestions();
    setOpen(false);
    correctAnswer.classList.remove("hide");
    setTimeout(() => {
      history.push("/results/3");
    }, 5000);
  };

  return category12 !== "" ? (
    <>
      <div id="jeopardy-board">
        <div className="final-jeopardy">
          <WagerModal open={wagerModalOpen} onClose={handleWagerClose} />

          <Modal
            open={open}
            onClose={handleClose}
            questionText={questionText}
            category={categoryText}
            qpoints={qpoints}
            userAnswer={userAnswer}
            timer={seconds}
            // onBackdropClick={onBackdropClick}
            // onEscapeKeyDown={onEscapeKeyDown}
          />

          <div className="question">
            <h2>{`${category12.title}`}</h2>
            {questions13.clues.slice(3, 4).map((q) => (
              <button
                type="button"
                onClick={toggleModal}
                id={q.id}
                qtext={q.question}
                qPoints={q.value}
                qcategory={category12.title}
                qanswer={q.answer}
                className="final-jeopardy-button"
              >
                <div>Final</div>
                <div>Jeopardy</div>
              </button>
            ))}
          </div>
        </div>
        <h2 className="scoreboard">
          <div>
            Your Wager: <span id="wager">{wager}</span>
          </div>
          <div>
            Your Answer: <span id="answer">{userAnswer}</span>
            <div id="correctAnswer" className="hide">
              The correct answer was: {answerText}
            </div>
          </div>
          <br />
          Score: {`${score}`}
        </h2>
      </div>
    </>
  ) : (
    <tr>Loading...</tr>
  );
};

export default Questions3;
