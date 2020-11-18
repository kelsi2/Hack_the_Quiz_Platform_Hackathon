import {GET_QUESTIONS, QUESTIONS_ERROR} from "../getQuestions";
import axios from "axios";

// ROUND ONE
const requestOne = axios.get("http://jservice.io/api/category?id=117");
const requestTwo = axios.get("http://jservice.io/api/category?id=26");
const requestThree = axios.get("http://jservice.io/api/category?id=217");
const requestFour = axios.get("http://jservice.io/api/category?id=400");
const requestFive = axios.get("http://jservice.io/api/category?id=780");
const requestSix = axios.get("http://jservice.io/api/category?id=65");

// ROUND TWO
const requestSeven = axios.get("http://jservice.io/api/category?id=1");
const requestEight = axios.get("http://jservice.io/api/category?id=5");
const requestNine = axios.get("http://jservice.io/api/category?id=625");
const requestTen = axios.get("http://jservice.io/api/category?id=1013");
const requestEleven = axios.get("http://jservice.io/api/category?id=2658");
const requestTwelve = axios.get("http://jservice.io/api/category?id=3591");

export const getQuestions = () => async (dispatch) => {
  try {
    let promiseArray = [];

    // ROUND ONE
    promiseArray.push(requestOne);
    promiseArray.push(requestTwo);
    promiseArray.push(requestThree);
    promiseArray.push(requestFour);
    promiseArray.push(requestFive);
    promiseArray.push(requestSix);

    // ROUND TWO
    promiseArray.push(requestSeven);
    promiseArray.push(requestEight);
    promiseArray.push(requestNine);
    promiseArray.push(requestTen);
    promiseArray.push(requestEleven);
    promiseArray.push(requestTwelve);

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
