import React, { Component } from "react";

class PersonSummary extends Component {
  render() {
    return (
      <div>
        <div>
          Personal Summary: {this.props.place} {this.props.user.name}
        </div>
      </div>
    );
  }
}

export default PersonSummary;
