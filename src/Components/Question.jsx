import React, { Component } from "react";

class Question extends Component {
  render() {
    const { question } = this.props;
    return (
      <div>
        <div>Question: {question.id}</div>
      </div>
    );
  }
}

export default Question;
