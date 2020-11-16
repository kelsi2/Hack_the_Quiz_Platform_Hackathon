import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuestions} from "../store/actions/questionsActions";
import Modal from "./Modal";

const Questions = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [categoryText, setCategoryText] = useState("");
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

  const toggleModal = (event) => {
    setQuestionText(event.target.attributes[2].nodeValue);
    setCategoryText(event.target.attributes[3].nodeValue);
    setOpen(true);
  };

  const handleClose = () => {
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
                qcategory={category.title}
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
                qcategory={category1.title}
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
                qcategory={category2.title}
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
                qcategory={category3.title}
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
                qcategory={category4.title}
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
                qcategory={category5.title}
              >
                {q.value}
              </button>
            </tr>
          ))}
        </td>
      </table>
    </div>
  ) : (
      <tr>Loading...</tr>
    );
};

export default Questions;
