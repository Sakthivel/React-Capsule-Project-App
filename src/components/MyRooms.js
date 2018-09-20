import React, { Component, Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  wrapper: {
    padding: '10px',
    bottom: '0',
  },
  list: {
    background: '#ff9100',
    cursor: 'default',
  },
  active: {
    background: '#b26500',
    cursor: 'default',
  },
};

class MyRooms extends Component {
  changeRoom(id) {
    if (typeof (id) === 'number') {
      this.props.myRoom(id);
    }
  }

  render() {
    if (this.props.myRooms) {
      return (
        <Fragment>
          <h2>My Rooms</h2>
          <List component="nav" style={styles.wrapper}>
            {this.props.myRooms.map((room, index) => {
              if (this.props.currentRoomId === room.id) {
                return (
                  <ListItem style={styles.active} onClick={this.changeRoom.bind(this, room.id)} key={room.id} button>
                    <ListItemText primary={room.name} />
                  </ListItem>
                );
              }
              return (
                <ListItem style={styles.list} onClick={this.changeRoom.bind(this, room.id)} key={room.id} button>
                  <ListItemText primary={room.name} />
                </ListItem>
              );
            })
                    }
          </List>
        </Fragment>
      );
    }
    return (<div>Loading Rooms...</div>);
  }
}

export default MyRooms;
