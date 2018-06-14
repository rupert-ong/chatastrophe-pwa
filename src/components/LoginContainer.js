import React, { Component } from 'react';

import Header from './Header';

class LoginContainer extends Component {

  state = { email: '', password: '' };

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit =  e => {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div id="LoginContainer" className="inner-container">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <p>Sign in or sign up by entering your email and password.</p>
          <input
            type="text"
            onChange={this.handleEmailChange} 
            value={this.state.email} 
            placeholder="Your email" />
          <input
            type="password"
            onChange={this.handlePasswordChange} 
            value={this.state.password} 
            placeholder="Your password" />
          <button className="red light" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;