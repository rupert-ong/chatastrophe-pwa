import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

export default class ChatContainer extends Component {
  myRef = React.createRef();

  state = {
    newMessage: ''
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.scrollToBottom();
    }
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

  scrollToBottom = () => {
    const node = this.myRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }

  showMessageAuthor = (currentMsg, nextMsg) => {
    if (!nextMsg || nextMsg.author !== currentMsg.author) {
      return (
        <p className="author"><Link to={`/users/${currentMsg.user_id}`}>{currentMsg.author}</Link></p>
      );
    }
  }

  render() {
    const { newMessage } = this.state;
    const { messages, areMessagesLoaded } = this.props;
    return (
      <div id="ChatContainer" className="inner-container">
        <Header>
          <button className="red" onClick={this.handleLogout}>Logout</button>
        </Header>
        {!areMessagesLoaded && (
          <div id="loading-container">
            <img src="/assets/icon.png" alt="logo" id="loader" />
          </div>
        )}
        <div id="message-container" ref={this.myRef}>
          {messages.map((msg, i) => (
            <div key={msg.id} className={`message ${this.props.user.email === msg.author && 'mine'}`}>
              <p>{msg.msg}</p>
              {this.showMessageAuthor(msg, messages[i + 1])}
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