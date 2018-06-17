import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import LoginContainer from './LoginContainer'
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

import './App.css';

class App extends Component {
  state = { user: null }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
    })
  }

  render() {
    return (
      <div id="container" className="inner-container">
        <Route exact path="/" component={ChatContainer} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/users/:id" component={UserContainer} />
      </div>
    );
  }
}

// withRouter gives component access to history, etc. props. 
// See componentDidMount lifecycle
export default withRouter(App);