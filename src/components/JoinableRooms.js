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
        background: '#52b202',
        cursor: 'default'
    }
}

class JoinableRooms extends Component {

    addMeRoom(id) {
        if(typeof(id) === 'number') {
            this.props.onAdd(id);
        }
    }

    render() {
        if (this.props.joinableRooms) {
            return  <Fragment>
                    <h2>Public Joinable Rooms</h2>
                    <List component="nav" style={styles.wrapper}>
                    {this.props.joinableRooms.map((room, index) => {
                        return (
                                    <ListItem style={styles.list} onClick={this.addMeRoom.bind(this, room.id)} key={room.id} button>
                                        <ListItemText primary={room.name}/>
                                    </ListItem>
                                )
                        })
                    }
                    </List>
                    </Fragment>
        } else {
            return (<div>Loading Rooms...</div>)
        }
    }
}

export default JoinableRooms;
