import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginContainer from './LoginContainer'
import ChatContainer from './ChatContainer';

import './App.css';

export default class App extends Component {
  state = { user: null }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    })
  }

  render() {
    return (
      <div id="container" className="inner-container">
        <Route path="/login"  component={LoginContainer} />
        <Route exact path="/" component={ChatContainer} />
      </div>
    );
  }
}