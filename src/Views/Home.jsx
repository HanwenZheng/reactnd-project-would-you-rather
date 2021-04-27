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
        {curUser &&
          questions &&
          Object.values(questions).map((question, index) => (
            <Question question={question} key={question.id} number={index} />
          ))}
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
