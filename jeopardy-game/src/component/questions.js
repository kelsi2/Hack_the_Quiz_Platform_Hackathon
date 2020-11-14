import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getQuestions} from "../store/actions/questionsActions";

const Questions = () => {
  const dispatch = useDispatch();
  const usersQuestionData = useSelector((state) => state.questionsList);
  const {loading, error, questions, questions2, questions3, questions4, questions5, questions6, category, category1, category2, category3, category4, category5, category6} = usersQuestionData;
  console.log(usersQuestionData);
  console.log(questions);
  console.log(questions2);
  useEffect(() => {
    dispatch(getQuestions());
  }, [dispatch]);
  return (
    // const items = this.state.toDoList.map(function(item){
    //   return <li> {item} </li>;
    // });
    usersQuestionData ? (
      <div>
        <h1>{`${category.title}`}</h1>
        {questions2.clues.map((q => <h3>{q.question}</h3>))}
      </div>
    ) :

      (<h3>Loading...</h3>)
    // <div>
    //   <div>
    //     {loading
    //       ? "Loading..."
    //       : error
    //         ? error.message
    //         : questions.clues.map((q) => {return (<> <h4>{`${q.category.title}`}</h4> <h3>{`${q.question}`}</h3>)</>)
    //   </div>

    //   <div>
    //     {loading
    //       ? "Loading..."
    //       : error
    //         ? error.message
    //         : questions2.clues.map((q) => <h3>{q.question}</h3>)}
    //   </div>

    // </div>
  );
};

export default Questions;
