//bring all reducer in same place like auth reducer
import { combineReducers } from "redux";
import itemReducer from "./itemReducer";

export default combineReducers({
  item: itemReducer,
  //auth:authREducer
});
