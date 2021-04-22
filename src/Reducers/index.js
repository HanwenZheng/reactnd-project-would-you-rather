import { combineReducers } from "redux";
import home from "./Home";
import { loadingBarReducer } from "react-redux-loading";

export default combineReducers({
  home,
  loadingBar: loadingBarReducer,
});
