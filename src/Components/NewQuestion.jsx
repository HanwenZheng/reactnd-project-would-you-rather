import React, { Component } from "react";
import SignIn from "./SignIn";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Actions from "../Actions/Home";
import { Card } from "react-card-component";
import styles from "./scss/NewQuestion.module.scss";

class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionOneText: "",
      optionTwoText: "",
      needMore: false,
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ needMore: false });
  };

  handleSubmit = (event) => {
    if (!this.state.optionOneText || !this.state.optionTwoText) {
      this.setState({ needMore: true });
    }

    if (this.state.optionOneText && this.state.optionTwoText) {
      this.props.dispatch(
        Actions.newQuestion(
          { ...this.state, author: this.props.home.curUser.id },
          this.props.history
        )
      );
    }
    event.preventDefault();
  };

  render() {
    const { curUser } = this.props.home;
    let needMore = this.state.needMore ? "Enter both options~" : "Submit";

    return (
      <div>
        {!curUser && <SignIn />}
        {curUser && (
          <div className={styles.NewQuestion}>
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <Card bordered outlined className={styles.Card}>
                <div className={styles.title}>Create Your Question</div>
                <div>
                  <label>Option 1: </label>
                  <input
                    type="text"
                    value={this.state.optionOneText}
                    name="optionOneText"
                    onChange={this.handleChange}
                    autoFocus={true}
                  />
                </div>
                <div>
                  <label>Option 2: </label>
                  <input
                    type="text"
                    value={this.state.optionTwoText}
                    name="optionTwoText"
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <button type="submit">{needMore}</button>
                </div>
              </Card>
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
