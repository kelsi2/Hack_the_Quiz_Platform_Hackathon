import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../store/actions/questionsActions";
// import {getScore} from "../store/actions/scoreActions";
import Modal from "./Modal";
import { AppContext, AnswerContext } from "../App";

const Questions = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [categoryText, setCategoryText] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [qpoints, setQPoints] = useState(0);
  const [score, setScore] = useContext(AppContext);
  const [usersAnswer, setUsersAnswer] = useContext(AnswerContext);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  let userInput = document.getElementById("answer");

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

  //useEffect that makes the timer tick
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
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

  useEffect(() => {
    if (hasAnswered) {
      checkAnswer();
      resetAnswer();
    }
  }, [hasAnswered]);

  const checkAnswer = () => {
    if (answerText === userInput.innerText) {
      setScore(qpoints + score);
    }
  };
  const resetAnswer = () => {
    setHasAnswered(false);
    //we need a way to reset our answer once checked
  };

  //When the Modal opens
  const toggleModal = (event) => {
    countDown();
    setQuestionText(event.target.attributes[2].nodeValue);
    setCategoryText(event.target.attributes[4].nodeValue);
    setQPoints(parseInt(event.target.attributes[3].nodeValue));
    setAnswerText(event.target.attributes[5].nodeValue);
    console.log(answerText);
    setOpen(true);
    // setTimeout(() => {
    //   handleClose();
    // }, 30000);
  };

  //When the modal closes
  const handleClose = () => {
    setHasAnswered(!hasAnswered);
    resetTimer();
    setOpen(false);
  };

  return category !== "" ? (
    <div id="jeopardy-board">
      <table>
        <Modal
          open={open}
          onClose={handleClose}
          questionText={questionText}
          category={categoryText}
          qpoints={qpoints}
          userAnswer={usersAnswer}
          timer={seconds}
          // onBackdropClick={onBackdropClick}
          // onEscapeKeyDown={onEscapeKeyDown}
        />

        <td>
          <th className="question">{`${category.title}`}</th>
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
          <th className="question">{`${category1.title}`}</th>
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
          <th className="question">{`${category2.title}`}</th>
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
          <th className="question">{`${category3.title}`}</th>
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
          <th className="question">{`${category4.title}`}</th>
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
          <th className="question">{`${category5.title}`}</th>
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
        Your Answer: <span id="answer">{`${usersAnswer}`}</span>
        <br />
        Score: {`${score}`}
      </h2>
    </div>
  ) : (
    <tr>Loading...</tr>
  );
};

export default Questions;
