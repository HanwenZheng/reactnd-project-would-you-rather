import React, { Component } from "react";
import styles from "./scss/Question.module.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from "react-card-component";
import RippleButton from "./RippleButton/RippleButton";
import * as Actions from "../Actions/Home";

class Question extends Component {
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  handleSubmit = (e) => {
    console.log(e.target.value);
  };

  render() {
    let { home, question, number } = this.props;
    const id = this.props.location ? this.props.location.pathname.split("/")[2] : null;
    let general;
    if (question) {
      general = true;
    } else {
      general = false;
      question = home.questions[id];
    }
    const user = question ? home.users[question.author] : home.users[home.questions[id].author];

    return (
      <div className={styles.Question}>
        <Card bordered outlined hoverType={"up"}>
          {general && ( // general version question
            <div>
              <div className={styles.corner}>
                <div className={styles.arrow}>#{number + 1}</div>
              </div>
              <div className={styles.title}>{user.name} asks:</div>
              <div className={styles.card}>
                <div className={styles.avatar}>{<img src={user.avatarURL} alt="avatarURL" />}</div>

                <div className={styles.details}>
                  <div className={styles.wyr}>Would you rather</div>
                  <div className={styles.options}>
                    <p>{this.capitalizeFirstLetter(question.optionOne.text)} or ...</p>
                  </div>
                  <div className={styles.view}>
                    <div>
                      <RippleButton
                        variant="blue"
                        to={`/questions/${question.id}`}
                        history={this.props.history}
                        onClick={() => {
                          this.props.dispatch(Actions.msLoading(800));
                        }}
                      >
                        View Poll
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!general && (
            <div>
              <div className={styles.corner}>
                <div className={styles.arrow}>#{number + 1}</div>
              </div>
              <div className={styles.title}>{user.name} asks:</div>
              <div className={styles.card}>
                <div className={styles.avatar}>{<img src={user.avatarURL} alt="avatarURL" />}</div>

                <div className={styles.details}>
                  <div className={styles.wyr}>Would you rather</div>
                  <div className={styles.options}>
                    <form onSubmit={this.handleSubmit}>
                      <label>
                        <input type="radio" name="choice" value="one" />
                        {this.capitalizeFirstLetter(question.optionOne.text)}
                      </label>
                      <br />
                      <label>
                        <input type="radio" name="choice" value="two" />
                        {this.capitalizeFirstLetter(question.optionTwo.text)}
                      </label>
                      <button>submit</button>
                    </form>
                  </div>
                  <div className={styles.view}>
                    <div>
                      <RippleButton
                        variant="blue"
                        to={`/questions/${question.id}`}
                        history={this.props.history}
                        onClick={() => {
                          this.props.dispatch(Actions.msLoading(800));
                        }}
                      >
                        Submit
                      </RippleButton>
                    </div>
                  </div>
                </div>
              </div>
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

export default withRouter(connect(mapStateToProps)(Question));
