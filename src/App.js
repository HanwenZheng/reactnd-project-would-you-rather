import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import { Route, Switch } from "react-router-dom";
import Home from "./Views/Home";
import styles from "./Components/scss/App.module.scss";
import LeaderBoard from "./Views/LeaderBoard";
import NewQuestion from "./Components/NewQuestion";
import Question from "./Components/Question";
import page404 from "./Views/page404";
import LoadingBarContainer from "react-redux-loading";
import { connect } from "react-redux";
import * as Actions from "./Actions/Home";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(Actions.handleInitialData());
  }

  render() {
    return (
      <div className={styles.App}>
        <LoadingBarContainer style={{ position: "fixed" }} />
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/newQuestion" component={NewQuestion} />
          <Route path="/leaderBoard" component={LeaderBoard} />
          <Route path="/question" component={Question} />
          <Route path="/" component={page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ home }) => {
  return {
    home,
  };
};

export default connect(mapStateToProps)(App);
