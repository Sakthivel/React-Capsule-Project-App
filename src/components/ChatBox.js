import React, { Component } from 'react';

const styles = {
  li: {
    border: '1px solid #007bb2',
    backgroundColor: 'lemonchiffon',
    listStyle: 'none',
    marginBottom: '15px',
    padding: '10px',
    borderRadius: '25px',
  },
  username: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  message: {
    fontSize: '12px',
  },
};

class ChatBox extends Component {
  render() {
    if (this.props.messages) {
      return (
        <div>
          <ul>
            {this.props.messages.map((message, index) => (
              <li style={styles.li} key={index}>
                            ~
                {' '}
                <span style={styles.username}>{message.senderId}</span>
                <p style={styles.message}>{message.text}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return (<div>Loading message...</div>);
  }
}

export default ChatBox;
