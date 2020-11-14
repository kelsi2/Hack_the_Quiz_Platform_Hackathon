import { GET_QUESTIONS } from "../getQuestions";

const initialState = {
  questions: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
