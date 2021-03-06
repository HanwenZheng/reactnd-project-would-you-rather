import React, { Component } from "react";
import NavBar from "./Components/NavBar";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Views/Home";
import styles from "./Components/scss/App.module.scss";
import LeaderBoard from "./Views/LeaderBoard";
import NewQuestion from "./Components/NewQuestion";
import Question from "./Components/Question";
import page404 from "./Views/page404";
import LoadingBarContainer from "react-redux-loading";
import { connect } from "react-redux";
import * as Actions from "./Actions/Home";
import { Scrollbars } from "react-custom-scrollbars-2";

class App extends Component {
  async componentDidMount() {
    await this.props.dispatch(Actions.handleInitialData());
    await this.props.dispatch(Actions.setUser(this.props.home.users["johndoe"]));
  }

  render() {
    return (
      <div className={styles.App}>
        <Scrollbars
          autoHeight
          autoHeightMax="100vh"
          autoHide
          autoHideTimeout={500}
          autoHideDuration={500}
        >
          <div>
            <LoadingBarContainer style={{ position: "fixed" }} />
            <NavBar />
            <Switch>
              <Route path="/" exact>
                <Redirect to="/home" />
              </Route>
              <Route path="/home" exact component={Home} />
              <Route path="/newQuestion" component={NewQuestion} />
              <Route path="/leaderBoard" component={LeaderBoard} />
              <Route path="/questions" component={Question} />
              <Route path="/" component={page404} />
            </Switch>
          </div>
        </Scrollbars>
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
