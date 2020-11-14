import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../actions/questionsActions";

const Questions = () => {
  const dispatch = useDispatch();
  const usersQuestionData = useSelector((state) => state.questionsList);
  const { loading, error, questions } = usersQuestionData;
  console.log(usersQuestionData);
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  return (
    <div>
      {loading
        ? "Loading..."
        : error
        ? error.message
        : questions.clues.map((q) => <h3>{q.question}</h3>)}
    </div>
  );
};

export default Questions;
