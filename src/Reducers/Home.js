import * as Actions from "../Actions";

const HomeReducer = (state = { curUser: "Alex" }, action) => {
  switch (action.type) {
    case Actions.SET_TEXT:
      return {
        ...state,
        curUser: action.text,
      };
    default:
      return state;
  }
};

export default HomeReducer;
