import {combineReducers} from "redux";
import questionReducer from "./questionReducer";
// import scoreReducer from "./scoreReducer";

export default combineReducers({
  questionsList: questionReducer,
  // scoresList: scoreReducer
});
