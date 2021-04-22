import * as Actions from "../actions";

const HomeReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.SET_TEXT:
      return {
        ...state,
        ...action.text,
      };
    default:
      return state;
  }
};

export default HomeReducer;
