import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Login from './components/Login';
import Chat from './components/Chat';
import {connect} from 'react-redux';

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    screen: PropTypes.string,
  };

  constructor(props) {
    super();
    let loggedInUser = localStorage.getItem('loggedInUser');
    this.state = {
      username: loggedInUser ? loggedInUser : '',
      screen: loggedInUser ? 'Chat' : ''
    }
  }
  
  onSignIn(username) {
    this.props.dispatch({
      type: 'GET_USERNAME',
      username
    });
  }

  render() {
    const screen_ = this.props.screen || this.state.screen;
    const username_ = this.props.username || this.state.username;
    if (screen_ === '') {
      return <Login onSubmit={this.onSignIn.bind(this)} />
    }
    if (screen_ === 'Chat') {
      return <Chat username={username_} />
    }
  }
}

const mapStateToProps = (state) => ({
  screen: state.screen,
  username : state.username
});

export default connect(mapStateToProps) (App)
