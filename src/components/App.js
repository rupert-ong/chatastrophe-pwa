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

  handleSubmitMessage = msg => {
    const { user } = this.state;
    const data = {
      msg,
      author: user.email,
      user_id: user.uid,
      timestamp: Date.now()
    }

    /*
      Set rules of Firebase DB to require authentication
      {
        "rules": {
          ".read": "auth != null",
          ".write": "auth != null"
        }
      }
    */
    firebase
      .database()
      .ref('messages/')
      .push(data);
  }

  render() {
    return (
      <div id="container" className="inner-container">
        <Route
          exact path="/"
          render={() => <ChatContainer onSubmit={this.handleSubmitMessage} />}
        />
        <Route path="/login" component={LoginContainer} />
        <Route path="/users/:id" component={UserContainer} />
      </div>
    );
  }
}

// withRouter gives component access to history, etc. props. 
// See componentDidMount lifecycle
export default withRouter(App);