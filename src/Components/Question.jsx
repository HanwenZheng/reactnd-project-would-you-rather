import React, { Component } from "react";

class Question extends Component {
  render() {
    const { question, number } = this.props;
    return (
      <div>
        <div>
          Question{number + 1}: {question.id}
        </div>
      </div>
    );
  }
}

export default Question;
