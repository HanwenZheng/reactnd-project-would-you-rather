import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import { Route } from "react-router-dom";
import Home from "./Views/Home";
import styles from "./Components/scss/App.module.scss";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <NavBar />
        <Route path="/" exact component={Home} />
      </div>
    );
  }
}

export default App;
