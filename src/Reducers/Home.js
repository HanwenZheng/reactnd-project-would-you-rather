import * as Actions from "../Actions/Home";

const HomeReducer = (state = { curUser: "Alex" }, action) => {
  switch (action.type) {
    case Actions.SET_CUR_USER:
      return {
        ...state,
        curUser: action.curUser,
      };
    case Actions.RECEIVE_USERS:
      return {
        ...state,
        users: action.users,
      };
    case Actions.RECEIVE_QUESTIONS:
      return {
        ...state,
        questions: action.questions,
      };
    default:
      return state;
  }
};

export default HomeReducer;
