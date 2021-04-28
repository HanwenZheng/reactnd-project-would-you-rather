import React, { Component } from "react";
import SignIn from "./SignIn";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Actions from "../Actions/Home";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: "",
      optionTwoText: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    this.props.dispatch(
      Actions.newQuestion({ ...this.state, author: this.props.home.curUser.id }, this.props.history)
    );
    event.preventDefault();
  };

  render() {
    const { curUser } = this.props.home;
    return (
      <div>
        {!curUser && <SignIn />}
        {curUser && (
          <div>
            <p>New Question</p>
            <form onSubmit={this.handleSubmit}>
              <label>Q1:</label>
              <input
                type="text"
                value={this.state.optionOneText}
                name="optionOneText"
                onChange={this.handleChange}
              />
              <label>Q2:</label>
              <input
                type="text"
                value={this.state.optionTwoText}
                name="optionTwoText"
                onChange={this.handleChange}
              />
              <input type="submit" value="Submit" />
            </form>
          </div>
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

export default withRouter(connect(mapStateToProps)(NewQuestion));
