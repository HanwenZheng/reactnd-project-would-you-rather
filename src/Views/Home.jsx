import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SignIn from "../Components/SignIn";
import Question from "../Components/Question";

class Home extends Component {
  render() {
    const { curUser, questions } = this.props.home;
    return (
      <Fragment>
        {!curUser && <SignIn />}
        {curUser && questions && (
          <div>
            <p>Unanswered</p>
            {Object.values(questions)
              .filter((question) => !(question.id in curUser.answers))
              .map((question, index) => (
                <Question question={question} key={question.id} number={index} />
              ))}
            <p>Answered</p>
            {Object.values(questions)
              .filter((question) => question.id in curUser.answers)
              .map((question, index) => (
                <Question question={question} key={question.id} number={index} />
              ))}
          </div>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ home }) => {
  return {
    home,
  };
};

export default connect(mapStateToProps)(Home);
