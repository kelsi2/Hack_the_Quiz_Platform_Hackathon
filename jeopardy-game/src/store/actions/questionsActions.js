import { GET_QUESTIONS, QUESTIONS_ERROR } from "../getQuestions";
import axios from "axios";

const one = `http://jservice.io/api/category?id=117`;
const two = `http://jservice.io/api/category?id=26`;
const three = `http://jservice.io/api/category?id=217`;
const four = `http://jservice.io/api/category?id=400`;
const five = `http://jservice.io/api/category?id=780`;
const six = `http://jservice.io/api/category?id=65`;

const requestOne = axios.get(one);
const requestTwo = axios.get(two);
const requestThree = axios.get(three);
const requestFour = axios.get(four);
const requestFive = axios.get(five);
const requestSix = axios.get(six);

export const getQuestions = () => async (dispatch) => {
  try {
    let promiseArray = [];

    promiseArray.push(requestOne);
    promiseArray.push(requestTwo);
    promiseArray.push(requestThree);
    promiseArray.push(requestFour);
    promiseArray.push(requestFive);
    promiseArray.push(requestSix);

    const responses = await Promise.all(promiseArray);
    const responseData = responses.map((response) => response.data);

    dispatch({
      type: GET_QUESTIONS,
      payload: responseData,
    });
  } catch (e) {
    dispatch({
      type: QUESTIONS_ERROR,
      payload: console.log(e),
    });
  }
};
