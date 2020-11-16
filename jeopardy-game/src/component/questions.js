import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../store/actions/questionsActions";
import "../questionStyle.css";
import Modal from "./Modal";

const Questions = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
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
  console.log(usersQuestionData);
  console.log(questions);
  console.log(questions2);
  console.log(questions6);
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);

  // const handleClick = (props) => {
  //   //find some way to carry the question clicked on as props
  //   console.log(questions6.clues[5].question);
  //   return <Modal open={props.handleOpen} />;
  // };

  const toggleModal = (event) => {
    console.log(event.target.attributes[2].nodeValue);
    console.log("triggered modal");
    setQuestionText(event.target.attributes[2].nodeValue);
    // console.log(questionID);
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close triggered");
    setOpen(false);
  };

  return (
    // const items = this.state.toDoList.map(function(item){
    //   return <li> {item} </li>;
    // });
    category !== "" ? (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          questionID={questionText}
          category={category5.title}
          // question={q.question}
        />

        <td>
          <th>{`${category.title}`}</th>
          {questions.clues.map((q) => (
            <tr>{q.value}</tr>
          ))}
        </td>

        <td>
          <th>{`${category1.title}`}</th>
          {questions2.clues.map((q) => (
            <tr>{q.value}</tr>
          ))}
        </td>

        <td>
          <th>{`${category2.title}`}</th>
          {questions3.clues.map((q) => (
            <tr>{q.value}</tr>
          ))}
        </td>

        <td>
          <th>{`${category3.title}`}</th>
          {questions4.clues.map((q) => (
            <tr>{q.value}</tr>
          ))}
        </td>

        <td>
          <th>{`${category4.title}`}</th>
          {questions5.clues.slice(0, 5).map((q) => (
            <tr>{q.value}</tr>
          ))}
        </td>

        <td>
          <th>{`${category5.title}`}</th>
          {questions6.clues.slice(5, 10).map((q) => (
            <tr className="question">
              <button
                type="button"
                onClick={toggleModal}
                id={q.id}
                qtext={q.question}
              >
                react-spring
              </button>
              {q.value}
            </tr>
          ))}
        </td>
      </div>
    ) : (
      <tr>Loading...</tr>
    )
  );
  // <div>
  //   <div>
  //     {loading
  //       ? "Loading..."
  //       : error
  //         ? error.message
  //         : questions.clues.map((q) => {return (<> <h4>{`${q.category.title}`}</h4> <tr>{`${q.question}`}</tr>)</>)
  //   </div>

  //   <div>
  //     {loading
  //       ? "Loading..."
  //       : error
  //         ? error.message
  //         : questions2.clues.map((q) => <tr>{q.question}</tr>)}
  //   </div>

  // </div>
};

export default Questions;
