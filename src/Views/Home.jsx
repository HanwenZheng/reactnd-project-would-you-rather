import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SignIn from "../Components/SignIn";

class Home extends Component {
  render() {
    const { curUser } = this.props;
    return <Fragment>{!curUser && <SignIn />}</Fragment>;
  }
}

const mapStateToProps = (state) => {
  return {
    curUser: state.home.curUser,
  };
};

export default connect(mapStateToProps)(Home);
