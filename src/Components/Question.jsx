import React, { Component } from "react";
import styles from "./scss/Question.module.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from "react-card-component";

class Question extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    const { home, question, number } = this.props;
    const id = this.props.location ? this.props.location.pathname.split("/")[2] : null;
    const user = question ? home.users[question.author] : home.users[home.questions[id].author];

    return (
      <div className={styles.Question}>
        <Card bordered outlined hoverType={"up"}>
          {question && ( // general version question
            <div>
              #{number + 1}: <div className={styles.title}>{user.name} asks:</div>
              <div className={styles.card}>
                <div className={styles.avatar}>{<img src={user.avatarURL} alt="avatarURL" />}</div>

                <div className={styles.details}>
                  <div className={styles.wyr}>Would you rather</div>
                  <div className={styles.options}>
                    <p>{this.capitalizeFirstLetter(question.optionOne.text)} or...</p>
                  </div>
                  <div className={styles.view}>
                    <NavLink to={`/questions/${question.id}`} exact activeClassName={styles.active}>
                      View Poll
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!question && (
            <div>
              <div className={styles.title}>{user.name} asks:</div>
              Detailed Question:{" "}
              {
                id // detailed version question
              }
            </div>
          )}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => {
  return {
    home,
  };
};

export default connect(mapStateToProps)(Question);
