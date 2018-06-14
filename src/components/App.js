import React, { Component } from 'react';
import './App.css';

import LoginContainer from './LoginContainer'

export default class App extends Component {
  render() {
    return (
      <div id="container" className="inner-container">
        <LoginContainer />
      </div>
    );
  }
}