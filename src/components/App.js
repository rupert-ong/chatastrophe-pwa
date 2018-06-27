import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import LoginContainer from './LoginContainer'
import ChatContainer from './ChatContainer';
import UserContainer from './UserContainer';

import NotificationResource from '../resources/NotificationResource';

import './App.css';

class App extends Component {
  state = { user: null, messages: [], areMessagesLoaded: false }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      } else {
        this.props.history.push('/login');
      }
    });

    // Listen to all updates to firebase DB /messages ref
    firebase
      .database()
      .ref('/messages')
      .on('value', snapshot => {
        this.onGetAllMessages(snapshot);
        if (!this.state.areMessagesLoaded) {
          this.setState({
            areMessagesLoaded: true
          })
        }
      });
    
    this.notifications = new NotificationResource(firebase.messaging());
  }

  componentWillUnmount() {
    firebase
      .database()
      .ref()
      .off();
  }

  onGetAllMessages = snapshot => {
    // Get an array of message objects, with message id added
    const messages = Object.keys(snapshot.val()).map(key => {
      const msg = snapshot.val()[key];
      msg.id = key;
      return msg;
    });
    this.setState({ messages });
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
    const { messages, user, areMessagesLoaded } = this.state;
    return (
      <div id="container" className="inner-container">
        <Route
          exact path="/"
          render={() => <ChatContainer
            messages={messages}
            areMessagesLoaded={areMessagesLoaded}
            user={user}
            onSubmit={this.handleSubmitMessage}
          />}
        />
        <Route path="/login" component={LoginContainer} />
        <Route
          path="/users/:id"
          render={({ history, match }) => <UserContainer
            messages={messages}
            areMessagesLoaded={areMessagesLoaded}
            userId={match.params.id}
          />}
        />
      </div>
    );
  }
}

// withRouter gives component access to history, etc. props. 
// See componentDidMount lifecycle
export default withRouter(App);