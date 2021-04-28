import * as Actions from "../Actions/Home";

const HomeReducer = (state = { curUser: null }, action) => {
  switch (action.type) {
    case Actions.SET_USER:
      return {
        ...state,
        curUser: action.curUser,
      };
    case Actions.RECEIVE_USERS:
      if (!state.curUser) {
        return {
          ...state,
          users: action.users,
        };
      } else {
        {
          return {
            ...state,
            users: action.users,
            curUser: action.users[state.curUser.id],
          };
        }
      }

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
