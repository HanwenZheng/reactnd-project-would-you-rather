import React, { Component } from "react";
import { connect } from "react-redux";
import * as Actions from "../Actions/Home";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.home.curUser,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: Object.values(this.props.home.users).find((user) => user.name === event.target.value),
    });
  }

  handleSubmit(event) {
    this.props.dispatch(Actions.setUser(this.state.value));
    event.preventDefault();
  }

  render() {
    let { users } = this.props.home;
    const options = users ? Object.values(users) : [];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            signIn:
            <select
              value={this.state.value ? this.state.value.name : ""}
              onChange={this.handleChange}
            >
              <option value="" disabled>
                Select your user
              </option>
              {options.map((user) => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <input type="submit" value="signIn" disabled={this.state.value === ""} />
        </form>
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
