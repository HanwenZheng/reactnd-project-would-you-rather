import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { Card } from "react-card-component";
import { Line } from "rc-progress";
import RippleButton from "./RippleButton/RippleButton";
import * as Actions from "../Actions/Home";
import styles from "./scss/Question.module.scss";

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

    if (!home.curUser) {
      return <Redirect to="/home" />;
    }

    const id = this.props.location ? this.props.location.pathname.split("/")[2] : null;
    let type;
    if (question) {
      type = "general";
    } else {
      type = "detail";
      question = home.questions ? home.questions[id] : null;
      if (Object.keys(home.curUser.answers).includes(id)) {
        type = "answered";
      }
    }
    const user = question ? home.users[question.author] : home.users[home.questions[id].author];

    let card = (prefix, children) => (
      <Fragment>
        <div className={styles.corner}>
          <div className={styles.arrow}>{prefix}</div>
        </div>
        <div className={styles.title}>{user.name} asks:</div>
        <div className={styles.card}>
          <div className={styles.avatar}>{<img src={user.avatarURL} alt="avatarURL" />}</div>
          <div className={styles.details}>{children}</div>
        </div>
      </Fragment>
    );

    return (
      <div className={styles.Question}>
        {(() => {
          switch (type) {
            case "general":
              return (
                <Card bordered outlined hoverType={"up"}>
                  {card(
                    `#${number + 1}`,
                    <Fragment>
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
                    </Fragment>
                  )}
                </Card>
              );
            case "detail":
              return (
                <Card bordered outlined>
                  {card(
                    "?",
                    <Fragment>
                      <div className={styles.wyr}>Would you rather</div>
                      <div className={styles.options}>
                        <div>
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
                        </div>
                        <div>
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
                                  history: this.props.history,
                                })
                              );
                            }}
                          >
                            {this.state.buttonText}
                          </RippleButton>
                        </div>
                      </div>
                    </Fragment>
                  )}
                </Card>
              );
            case "answered":
              let oneVotes = question.optionOne.votes.length;
              let twoVotes = question.optionTwo.votes.length;
              let totalVotes = oneVotes + twoVotes;
              let onePercent = (oneVotes / totalVotes) * 100;
              let twoPercent = (twoVotes / totalVotes) * 100;
              let chosenOne = home.curUser.answers[id] === "optionOne";
              return (
                <Card bordered outlined className={styles.resCard}>
                  {card(
                    "!",
                    <Fragment>
                      <div className={styles.res}>Results:</div>
                      <div className={styles.results}>
                        <Card
                          outlined={false}
                          style={chosenOne ? { color: "orange" } : null}
                          className={chosenOne ? styles.chosen : null}
                        >
                          {chosenOne && <p>Your Choice: </p>}
                          {this.capitalizeFirstLetter(question.optionOne.text)}
                          <Line
                            percent={onePercent}
                            strokeWidth="4"
                            strokeColor={chosenOne ? "orange" : "rgb(49,190,166)"}
                          />
                          <div className={styles.votes}>
                            {`${oneVotes} out of ${totalVotes} votes`}
                          </div>
                        </Card>
                        <Card
                          outlined={false}
                          style={!chosenOne ? { color: "orange" } : null}
                          className={!chosenOne ? styles.chosen : null}
                        >
                          {!chosenOne && <p>Your Choice: </p>}
                          {this.capitalizeFirstLetter(question.optionTwo.text)}
                          <Line
                            percent={twoPercent}
                            strokeWidth="4"
                            strokeColor={!chosenOne ? "orange" : "rgb(49,190,166)"}
                          />
                          <div className={styles.votes}>
                            {`${twoVotes} out of ${totalVotes} votes`}
                          </div>
                        </Card>
                      </div>
                    </Fragment>
                  )}
                </Card>
              );
            default:
              return <Redirect to="/home" />;
          }
        })()}
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
