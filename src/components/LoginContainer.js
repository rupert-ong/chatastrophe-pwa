import React, { Component } from 'react';

import Header from './Header';

class LoginContainer extends Component {

  state = { email: '', password: '', error: '' };

  login = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => {
        if (err.code === 'auth/user-not-found') {
          this.signUp(email, password);
        } else {
          this.setState({ error: err.message });
        }
      });
  }

  signUp = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => {
        console.log(err);
        this.setState({ error: err.message });
      });
  }

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

  handleSubmit = e => {
    const { email, password } = this.state;
    e.preventDefault();

    if (email && password) {
      this.setState({ error: '' });
      this.login(email, password);
    } else {
      this.setState({ error: 'Please fill in both fields' });
    }
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <div id="LoginContainer" className="inner-container">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <p>Sign in or sign up by entering your email and password.</p>
          <input
            type="text"
            onChange={this.handleEmailChange}
            value={email}
            placeholder="Your email" />
          <input
            type="password"
            onChange={this.handlePasswordChange}
            value={password}
            placeholder="Your password" />
          {error && (
            <p className="error">{error}</p>
          )}
          <button className="red light" type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginContainer;