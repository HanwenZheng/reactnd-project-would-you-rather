import React, { Component } from "react";
import { connect } from "react-redux";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class SignIn extends Component {
  render() {
    let { users } = this.props.home;
    console.log(users);
    const options = ["one", "two", "three"];

    return (
      <div>
        <div>signIn</div>
        <Dropdown options={options} onChange={() => {}} placeholder="Select an option" />
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => {
  return {
    home,
  };
};

export default connect(mapStateToProps)(SignIn);
