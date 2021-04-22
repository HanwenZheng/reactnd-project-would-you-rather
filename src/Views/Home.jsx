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
          Object.values(questions).map((question) => (
            <Question question={question} key={question.id} />
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
