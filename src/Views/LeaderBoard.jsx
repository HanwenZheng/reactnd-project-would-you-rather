import React, { Component } from "react";
import PersonSummary from "../Components/PersonSummary";

class LeaderBoard extends Component {
  render() {
    return (
      <div>
        <PersonSummary />
        <PersonSummary />
        <PersonSummary />
      </div>
    );
  }
}

export default LeaderBoard;
