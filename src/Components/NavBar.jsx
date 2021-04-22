import React, { Component } from "react";
import styles from "./scss/NavBar.module.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as Actions from "../Actions/Home";

class NavBar extends Component {
  render() {
    const { curUser, dispatch } = this.props;

    return (
      <div className={styles.NavBar}>
        <div className={styles.tabs}>
          <NavLink to="/" exact activeClassName={styles.active}>
            <div className={styles.tab}>Home</div>
          </NavLink>
          <NavLink to="/newQuestion" exact activeClassName={styles.active}>
            <div className={styles.tab}>New Question</div>
          </NavLink>
          <NavLink to="/leaderBoard" exact activeClassName={styles.active}>
            <div className={styles.tab}>Leader Board</div>
          </NavLink>
        </div>
        {curUser && (
          <div className={styles.info}>
            Hello, {curUser + " "}
            <button
              type="submit"
              onClick={() => {
                dispatch(Actions.setText(null));
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    curUser: state.home.curUser,
  };
};

export default connect(mapStateToProps)(NavBar);
