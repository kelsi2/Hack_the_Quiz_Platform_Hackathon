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
  // const [usersAnswer, setUsersAnswer] = useState("");
  const [time, setTime] = useState(30000);
  const [qpoints, setQPoints] = useState(0);
  const [score, setScore] = useContext(AppContext);
  const [usersAnswer, setUsersAnswer] = useContext(AnswerContext);

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

  // const usersScoreData = useSelector((state) => state.scoreList);
  // const {
  //   points
  // } = usersScoreData;
  // useEffect(() => {
  //   dispatch(getScore());
  // }, [dispatch]);

  const toggleModal = (event) => {
    setQuestionText(event.target.attributes[2].nodeValue);
    setCategoryText(event.target.attributes[4].nodeValue);
    setQPoints(parseInt(event.target.attributes[3].nodeValue));
    setAnswerText(event.target.attributes[5].nodeValue);
    console.log(answerText);
    setOpen(true);
    setTimeout(() => {
      handleClose();
    }, time);

    setInterval(() => {
      setTime(time - 1000);
    }, 1000);
    return () => {
      clearInterval(1000);
    };
  };

  // const usePrevious = (usersAnswer) => {
  //   const ref = useRef();
  //   useEffect(() => {
  //     ref.current = usersAnswer;
  //   });
  //   return ref.current;
  // };

  const handleClose = () => {
    console.log(usersAnswer);
    if (answerText === usersAnswer) {
      setScore(qpoints + score);
      // setUsersAnswer(usersAnswer);

      console.log(usersAnswer);
    }
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
          timer={time}
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
        Your Answer: {`${usersAnswer}`}
        <br />
        Score: {`${score}`}
      </h2>
    </div>
  ) : (
    <tr>Loading...</tr>
  );
};

export default Questions;
