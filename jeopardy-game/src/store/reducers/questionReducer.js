import {GET_QUESTIONS} from "../getQuestions";

const initialState = {
  category: "",
  category2: "",
  category3: "",
  category4: "",
  category5: "",
  category6: "",
  questions: [],
  questions2: [],
  questions3: [],
  questions4: [],
  questions5: [],
  questions6: [],
  loading: true,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        category: action.payload[0],
        category1: action.payload[1],
        category2: action.payload[2],
        category3: action.payload[3],
        category4: action.payload[4],
        category5: action.payload[5],
        category6: action.payload[6],
        questions: action.payload[0],
        questions2: action.payload[1],
        questions3: action.payload[2],
        questions4: action.payload[3],
        questions5: action.payload[4],
        questions6: action.payload[5],
        loading: false,
      };
    default:
      return state;
  }
}
