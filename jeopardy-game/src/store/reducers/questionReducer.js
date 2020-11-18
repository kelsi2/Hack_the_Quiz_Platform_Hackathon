import {GET_QUESTIONS} from "../getQuestions";

const initialState = {
  category: "",
  category2: "",
  category3: "",
  category4: "",
  category5: "",
  category6: "",
  category7: "",
  category8: "",
  category9: "",
  category10: "",
  category11: "",
  category12: "",
  questions: [],
  questions2: [],
  questions3: [],
  questions4: [],
  questions5: [],
  questions6: [],
  questions7: [],
  questions8: [],
  questions9: [],
  questions10: [],
  questions11: [],
  questions12: [],
  questions13: [],
  loading: true,
};

const questionReducer = (state = initialState, action) => {
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
        category7: action.payload[7],
        category8: action.payload[8],
        category9: action.payload[9],
        category10: action.payload[10],
        category11: action.payload[11],
        category12: action.payload[12],

        questions: action.payload[0],
        questions2: action.payload[1],
        questions3: action.payload[2],
        questions4: action.payload[3],
        questions5: action.payload[4],
        questions6: action.payload[5],
        questions7: action.payload[6],
        questions8: action.payload[7],
        questions9: action.payload[8],
        questions10: action.payload[9],
        questions11: action.payload[10],
        questions12: action.payload[11],
        questions13: action.payload[12],
        loading: false,
      };
    default:
      return state;
  }
};

export default questionReducer;