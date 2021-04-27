import React, { Component } from "react";

class PersonSummary extends Component {
  render() {
    const { place, user } = this.props;

    return (
      <div>
        <div>
          Personal Summary: {place} {user.name} score:{user.score}
        </div>
      </div>
    );
  }
}

export default PersonSummary;
