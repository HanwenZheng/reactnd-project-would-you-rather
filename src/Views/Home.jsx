import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SignIn from "../Components/SignIn";
import Question from "../Components/Question";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

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
                .map((question, index) => (
                  <Question question={question} key={question.id} number={index} />
                ))}
            </TabPanel>
            <TabPanel>
              {Object.values(questions)
                .filter((question) => Object.keys(users[curUser.id].answers).includes(question.id))
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
