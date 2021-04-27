import React, { Component } from "react";
import styles from "./scss/Question.module.scss";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Card } from "react-card-component";
import RippleButton from "./RippleButton/RippleButton";
import * as Actions from "../Actions/Home";

class Question extends Component {
  state = {
    option: "",
    submit: false,
    buttonText: "Submit",
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  handleSubmit = (e) => {
    console.log(e.target.value);
  };

  render() {
    let { home, question, number } = this.props;
    if (!home.questions || this.state.submit) {
      return <Redirect to="/home" />;
    }

    const id = this.props.location ? this.props.location.pathname.split("/")[2] : null;
    let general;
    if (question) {
      general = true;
    } else {
      general = false;
      question = home.questions ? home.questions[id] : null;
    }
    const user = question ? home.users[question.author] : home.users[home.questions[id].author];

    return (
      <div className={styles.Question}>
        {general && ( // general version question
          <Card bordered outlined hoverType={"up"}>
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
          </Card>
        )}
        {!general && (
          <Card bordered outlined>
            <div className={styles.corner}>
              <div className={styles.arrow}>#{number + 1}</div>
            </div>
            <div className={styles.title}>{user.name} asks:</div>
            <div className={styles.card}>
              <div className={styles.avatar}>{<img src={user.avatarURL} alt="avatarURL" />}</div>

              <div className={styles.details}>
                <div className={styles.wyr}>Would you rather</div>
                <div className={styles.options}>
                  <input
                    type="radio"
                    id="optionOne"
                    value="optionOne"
                    name="group1"
                    onClick={(e) => {
                      this.setState({ option: e.target.value, buttonText: "Submit" });
                    }}
                  />
                  <label htmlFor="optionOne">
                    {this.capitalizeFirstLetter(question.optionOne.text)}
                  </label>
                  <br />
                  <input
                    type="radio"
                    id="optionTwo"
                    value="optionTwo"
                    name="group1"
                    onClick={(e) => {
                      this.setState({ option: e.target.value, buttonText: "Submit" });
                    }}
                  />
                  <label htmlFor="optionTwo">
                    {this.capitalizeFirstLetter(question.optionTwo.text)}
                  </label>
                </div>
                <div className={styles.view}>
                  <div>
                    <RippleButton
                      disabled={this.state.buttonText === "Choose one!"}
                      variant="blue"
                      onClick={() => {
                        if (!this.state.option) {
                          this.setState({ buttonText: "Choose one!" });
                          return;
                        }
                        this.props.dispatch(
                          Actions.saveQuestion({
                            authedUser: home.curUser.id,
                            qid: id,
                            answer: this.state.option,
                          })
                        );
                        setTimeout(() => {
                          this.setState({ submit: true });
                        }, 800);
                      }}
                    >
                      {this.state.buttonText}
                    </RippleButton>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
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
