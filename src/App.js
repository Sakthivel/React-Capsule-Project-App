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
    super(props)
    this.state = {
      username: ''
    }
    this.onUserEntry = this.onUserEntry.bind(this)
  }

  onUserEntry(username) {

    this.props.dispatch({
      type: 'GET_USERNAME',
      username
    });

  }

  render() {
    const screen_ = this.props.screen || '';
    const username_ = this.props.username || '';
    if (screen_ === '') {
      return <Login onSubmit={this.onUserEntry} />
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
