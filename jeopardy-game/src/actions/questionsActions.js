import { GET_QUESTIONS, QUESTIONS_ERROR } from "../store/getQuestions";
import axios from "axios";

export const getQuestions = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://jservice.io/api/category?id=117`);
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: QUESTIONS_ERROR,
      payload: console.log(e),
    });
  }
};
