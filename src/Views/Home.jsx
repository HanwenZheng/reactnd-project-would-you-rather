import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SignIn from "../Components/SignIn";
import Question from "../Components/Question";

class Home extends Component {
  render() {
    const { users, curUser, questions } = this.props.home;
    return (
      <Fragment>
        {!curUser && <SignIn />}
        {curUser && questions && (
          <Tabs>
            <TabList>
              <Tab>Unanswered</Tab>
              <Tab>Answered</Tab>
            </TabList>
            <TabPanel>
              {Object.values(questions)
                .filter((question) => !Object.keys(users[curUser.id].answers).includes(question.id))
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((question, index) => (
                  <Question question={question} key={question.id} number={index} />
                ))}
            </TabPanel>
            <TabPanel>
              {Object.values(questions)
                .filter((question) => Object.keys(users[curUser.id].answers).includes(question.id))
                .sort((a, b) => b.timestamp - a.timestamp)
                .map((question, index) => (
                  <Question question={question} key={question.id} number={index} />
                ))}
            </TabPanel>
          </Tabs>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = ({ home }) => {
  return {
    home,
  };
};

export default connect(mapStateToProps)(Home);
