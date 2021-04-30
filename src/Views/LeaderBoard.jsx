import React, { Component } from "react";
import PersonSummary from "../Components/PersonSummary";
import { connect } from "react-redux";
import SignIn from "../Components/SignIn";

class LeaderBoard extends Component {
  render() {
    const { users, curUser } = this.props.home;
    let rankedUsers = null;
    if (users) {
      for (const user in users) {
        users[user].score = Object.keys(users[user].answers).length + users[user].questions.length;
      }
      rankedUsers = Object.values(users)
        .sort((a, b) => b.score - a.score)
        .filter((user, i) => i + 1 <= 3); // get top 3
    }
    return (
      <div>
        {!curUser && <SignIn />}
        {curUser &&
          rankedUsers &&
          rankedUsers.map((user, i) => <PersonSummary place={i + 1} user={user} key={user.id} />)}
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => {
  return {
    home,
  };
};

export default connect(mapStateToProps)(LeaderBoard);
