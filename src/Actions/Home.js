import { showLoading, hideLoading } from "react-redux-loading";
import * as DATA from "../utils/_DATA";

export const SET_TEXT = "SET_TEXT";
export const setText = (text) => ({
  type: SET_TEXT,
  text,
});

export const RECEIVE_USERS = "RECEIVE_USERS";
export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users,
});

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const handleInitialData = () => async (dispatch) => {
  dispatch(showLoading());
  let users = await DATA._getUsers();
  dispatch(receiveUsers(users));
  let questions = await DATA._getQuestions();
  dispatch(receiveQuestions(questions));
  dispatch(hideLoading());
};
