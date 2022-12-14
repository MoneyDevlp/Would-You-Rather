import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import handleInitialData from "../actions/util";
import ListPollComponent from "./ListPollComponent";
import NewPollComponent from "./NewPollComponent";
import LeaderBoardComponent from "./LeaderBoardComponent";
import PollComponent from "./PollComponent";
import LoginComponent from "./LoginComponent";
import NavComponent from "./NavComponent"
import Page404Component from './Page404Component';


class App extends React.Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <NavComponent />
        <hr></hr>
        {this.props.authed === null ? (
          <LoginComponent />
          
        ): (
          <Routes>
            <Route exact path="/" element={<ListPollComponent />} />
            <Route exact path="/add" element={<NewPollComponent />} />
            <Route exact path="/leaderboard" element={<LeaderBoardComponent />} />
            <Route exact path="/questions/:question_id" element={<PollComponent />} />
            <Route component={Page404Component} />
          </Routes>
        )} 
        
      </Router>
    )
  }
}

function mapStateToProps({authed}) {
  return {authed}
}

export default connect(mapStateToProps)(App);
