import React, {useEffect, useState, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuestions} from "../store/actions/questionsActions";
// import {getScore} from "../store/actions/scoreActions";
import Modal from "./Modal";
import {AppContext, AnswerContext} from "../App";
import {Link, useHistory} from "react-router-dom";

const Questions2 = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [qpoints, setQPoints] = useState(0);
  const [score, setScore] = useContext(AppContext);
  const {userAnswer, setUserAnswer} = useContext(AnswerContext);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [roundTime, setRoundTime] = useState(1000);
  const [answeredQuetions, setAnsweredQuestions] = useState(0);
  let userInput = document.getElementById("answer");
  const correctAnswer = document.getElementById("correctAnswer");

  const usersQuestionData = useSelector((state) => state.questionsList);
  const {
    questions7,
    questions8,
    questions9,
    questions10,
    questions11,
    questions12,
    category6,
    category7,
    category8,
    category9,
    category10,
    category11,
  } = usersQuestionData;
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
      history.push("/results/2");
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
    console.log(answerText);
    console.log(userInput.innerText);
    if (answerText === userInput.innerText) {
      setScore(qpoints + score);
    }
    if (answerText !== userInput.innerText && userInput.innerText !== "") {
      setScore(score - qpoints);
    }
    if (userInput.innerText === "") {
      return;
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
      history.push("/results/2");
    }
    return;
  };

  //When the Modal opens
  const toggleModal = (event) => {
    correctAnswer.classList.add("hide");
    event.target.disabled = true;
    setAnsweredQuestions(answeredQuetions + 1);
    countDown();
    setQuestionText(event.target.attributes[2].nodeValue);
    setCategoryText(event.target.attributes[4].nodeValue);
    setQPoints(parseInt(event.target.attributes[3].nodeValue));
    setAnswerText(event.target.attributes[5].nodeValue.replace(/<[^>]+>/g, ""));
    console.log(answerText);
    setOpen(true);
  };

  //When the modal closes
  const handleClose = (event) => {
    event.target.disabled = true;
    setHasAnswered(!hasAnswered);
    resetTimer();
    checkNumberAnsweredQuestions();
    setOpen(false);
    correctAnswer.classList.remove("hide");
  };

  return category6 !== "" ? (
    <>
      <div id="jeopardy-board">
        <table>
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

          <td>
            <th className="question title">{`${category6.title}`}</th>
            {questions7.clues.slice(4, 9).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category6.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category7.title}`}</th>
            {questions8.clues.slice(14, 19).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category7.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category8.title}`}</th>
            {questions9.clues.slice(30, 35).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category8.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category9.title}`}</th>
            {questions10.clues.slice(5, 10).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category9.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category10.title}`}</th>
            {questions11.clues.slice(10, 15).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category10.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category11.title}`}</th>
            {questions12.clues.slice(5, 10).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category11.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>
        </table>
        <h2 className="scoreboard">
          <div className="answerContainer">
            <p>Your Answer:</p>
            <div className="margin"><p>What is</p> </div>
            <div id="answer"><p>{userAnswer}</p></div>
            <div><p>?</p></div>
          </div>
          <div id="correctAnswer" className="hide">
            The correct answer was: {answerText}
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

export default Questions2;
