import React, { Component } from "react";
import styles from "./scss/NavBar.module.scss";
import { NavLink } from "react-router-dom";

class Question extends Component {
  render() {
    const { question, number } = this.props;
    const id = this.props.location ? this.props.location.pathname.split("/")[2] : null;

    return (
      <div>
        {question && (
          <div>
            Question{number + 1}:
            <NavLink to={`/questions/${question.id}`} exact activeClassName={styles.active}>
              {question.id}
            </NavLink>
          </div>
        )}
        {!question && <div>Detailed Question: {id}</div>}
      </div>
    );
  }
}

export default Question;
