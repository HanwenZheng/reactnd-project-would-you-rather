import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import { Route } from "react-router-dom";
import Home from "./Views/Home";
import styles from "./Components/scss/App.module.scss";
import LeaderBoard from "./Views/LeaderBoard";
import NewQuestion from "./Components/NewQuestion";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/newQuestion" component={NewQuestion} />
        <Route path="/leaderBoard" component={LeaderBoard} />
      </div>
    );
  }
}

export default App;
