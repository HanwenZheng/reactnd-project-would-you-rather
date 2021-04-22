import React, { Component } from "react";
import SignIn from "./SignIn";
import { connect } from "react-redux";

class NewQuestion extends Component {
  render() {
    const { curUser } = this.props;
    return (
      <div>
        {!curUser && <SignIn />}
        {curUser && <div>New Question</div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    curUser: state.home.curUser,
  };
};

export default connect(mapStateToProps)(NewQuestion);
