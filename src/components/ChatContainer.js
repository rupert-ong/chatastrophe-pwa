import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

export default class ChatContainer extends Component {
  state = {
    newMessage: ''
  }

  handleInputChange = e => {
    this.setState({
      newMessage: e.target.value
    });
  }

  handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.newMessage);
    this.setState({ newMessage: '' });
  }

  handleLogout = () => {
    firebase.auth().signOut();
  }

  render() {
    const { newMessage } = this.state;
    const { messages } = this.props;
    return (
      <div id="ChatContainer" className="inner-container">
        <Header>
          <button className="red" onClick={this.handleLogout}>Logout</button>
        </Header>
        <div id="message-container">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${this.props.user.email === msg.author && 'mine'}`}>
              <p>{msg.msg}</p>
              <p className="author"><Link to={`/users/${msg.user_id}`}>{msg.author}</Link></p>
            </div>
          ))}
        </div>
        <div id="chat-input">
          <textarea
            placholder="Add your message"
            onChange={this.handleInputChange}
            onKeyDown={this.handleKeyDown}
            value={newMessage} />
          <button onClick={this.handleSubmit}>
            <svg viewBox="0 0 24 24">
              <path fill="#424242" d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
}