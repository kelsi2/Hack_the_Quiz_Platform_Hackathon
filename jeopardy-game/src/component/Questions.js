import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../store/actions/questionsActions";
import Modal from "./Modal";
import { AppContext, AnswerContext } from "../App";
import { useHistory } from "react-router-dom";

const Questions = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [qpoints, setQPoints] = useState(0);
  const [score, setScore] = useContext(AppContext);
  const { userAnswer, setUserAnswer } = useContext(AnswerContext);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [roundTime, setRoundTime] = useState(1000);
  const [correct, setCorrect] = useState("");
  const [answeredQuetions, setAnsweredQuestions] = useState(0);
  let userInput = document.getElementById("answer");
  const correctAnswer = document.getElementById("correctAnswer");

  const usersQuestionData = useSelector((state) => state.questionsList);
  const {
    questions,
    questions2,
    questions3,
    questions4,
    questions5,
    questions6,
    category,
    category1,
    category2,
    category3,
    category4,
    category5,
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
      history.push("/results/1");
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
      setScore(qpoints + score);
      setCorrect("+");
    }
    if (answerText !== userInput.innerText && userInput.innerText !== "") {
      setScore(score - qpoints);
      setCorrect("-");
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

  const resetAnswer = () => {
    setHasAnswered(false);
  };

  const checkNumberAnsweredQuestions = () => {
    if (answeredQuetions === 30) {
      history.push("/results/1");
    }
    return;
  };

  //When the Modal opens
  const toggleModal = (event) => {
    correctAnswer.classList.add("hide");
    event.target.disabled = true;
    setUserAnswer("");
    setAnsweredQuestions(answeredQuetions + 1);
    countDown();
    setQuestionText(event.target.attributes[2].nodeValue);
    setCategoryText(event.target.attributes[4].nodeValue);
    setQPoints(parseInt(event.target.attributes[3].nodeValue));
    setAnswerText(event.target.attributes[5].nodeValue.replace(/<[^>]+>/g, ""));
    setOpen(true);
  };

  //When the modal closes
  const handleClose = (event) => {
    if (event) {
      event.target.disabled = true;
    }
    setHasAnswered(!hasAnswered);
    resetTimer();
    checkNumberAnsweredQuestions();
    setOpen(false);
    correctAnswer.classList.remove("hide");
  };

  return category !== "" ? (
    <>
      <div id="jeopardy-board-1">
        <table>
          <Modal
            open={open}
            onClose={handleClose}
            questionText={questionText}
            category={categoryText}
            qpoints={qpoints}
            userAnswer={userAnswer}
            timer={seconds}
          />

          <td>
            <th className="question title">{`${category.title}`}</th>
            {questions.clues.slice(0, 5).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category1.title}`}</th>
            {questions2.clues.slice(0, 5).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category1.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category2.title}`}</th>
            {questions3.clues.slice(0, 5).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category2.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category3.title}`}</th>
            {questions4.clues.slice(0, 5).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category3.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category4.title}`}</th>
            {questions5.clues.slice(0, 5).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category4.title}
                  qanswer={q.answer}
                >
                  {q.value}
                </button>
              </tr>
            ))}
          </td>

          <td>
            <th className="question title">{`${category5.title}`}</th>
            {questions6.clues.slice(9, 14).map((q) => (
              <tr className="question">
                <button
                  type="button"
                  onClick={toggleModal}
                  id={q.id}
                  qtext={q.question}
                  qPoints={q.value}
                  qcategory={category5.title}
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
            <div className="margin">
              <p>What is</p>
            </div>
            <div id="answer">
              <p>{userAnswer}</p>
            </div>
            <div>
              <p>?</p>
            </div>
          </div>
          <div id="correctAnswer" className="hide">
            The correct answer was: {answerText}
          </div>
          <br />
          Score: ${`${score}`}
        </h2>
      </div>
    </>
  ) : (
    <tr>Loading...</tr>
  );
};

export default Questions;
