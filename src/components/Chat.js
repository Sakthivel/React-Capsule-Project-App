import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import SendMessageForm from './SendMessageForm';
import UsersList from './UsersList';
import ChatBox from './ChatBox';
import JoinableRooms from './JoinableRooms';
import MyRooms from './MyRooms';

const styles = {
  chatBox: {
    background: 'aliceblue',
    height: '515px',
    overflowY: 'auto',
    border: '2px solid #007bb2',
    padding: '12px',
  },
  modal: {
    background: 'white',
    marginTop: '15%',
    width: '395px',
    marginLeft: '33%',
    padding: '20px',
  },
  userModal: {
    marginTop: '15px',
  },
};

class Chat extends Component {
    static propTypes = {
      dispatch: PropTypes.func.isRequired,
      currentUser: PropTypes.object,
      currentRoom: PropTypes.object,
      messages: PropTypes.array,
    };

    constructor(props) {
      super(props);
      const localRoomId = props.roomId ? props.roomId : 15456697;
      this.state = {
        currentUser: {},
        currentRoom: {},
        messages: [],
        roomId: localRoomId,
        update: true,
        newRoom: true,
        openModal: false,
        openUserModal: false,
        newRoomName: '',
        newUserName: '',
        joinableRooms: [],
      };

      this.sendMessage = this.sendMessage.bind(this);
      // console.log("constructor");
      // console.log(this.props.currentUser);
      // console.log("End -- constructor");
    }

    loadMyRoomMessages() {
      this.props.dispatch({
        type: 'GET_MESSAGE',
        roomId: this.state.roomId || 15456697,
        currentUser: this.props.currentUser,
      });
    }

    sendMessage(text) {
      this.props.currentUser.sendMessage({
        text,
        roomId: this.state.roomId || 15456697,
      });

      this.props.dispatch({
        type: 'GET_MESSAGE',
        roomId: this.state.roomId || 15456697,
        currentUser: this.props.currentUser,
      });

      this.setState({
        update: true,
      });
    }

    componentDidMount() {
      this.props.dispatch({
        type: 'GET_CURRENT_USER',
        currentUser: this.props.username,
      });

      this.setState({
        newRoom: true,
      });
    }

    newRoomName(e) {
      this.setState({ newRoomName: e.target.value });
    }

    addRoom(e) {
      e.preventDefault();
      if (this.state.newRoomName !== '') {
        this.props.dispatch({
          type: 'GET_NEW_ROOM',
          currentUser: this.props.currentUser,
          roomName: this.state.newRoomName,
        });
        this.handleClose();
      }

      this.setState({
        update: true,
      });

      this.loadMyRoomMessages();
    }

    handleOpen() {
      this.setState({ openModal: true });
    }

    handleClose() {
      this.setState({ openModal: false });
    }

    newUserName(e) {
      this.setState({ newUserName: e.target.value });
    }

    addUser(e) {
      e.preventDefault();
      if (this.state.newUserName !== '') {
        this.props.dispatch({
          type: 'GET_NEW_USER',
          currentUser: this.props.currentUser,
          roomId: this.state.roomId || 15456697,
          user: this.state.newUserName,
        });
        this.handleCloseUser();
      }

      this.setState({
        update: true,
      });

      this.loadMyRoomMessages();
    }

    removeUserFromRoom(e) {
      e.preventDefault();
      this.props.dispatch({
        type: 'GET_REMOVE_USER',
        currentUser: this.props.currentUser,
        roomId: this.state.roomId || 15456697,
      });

      this.setState({
        update: true,
        roomId: 15456697,
      });

      this.loadMyRoomMessages();
    }

    handleOpenUser() {
      this.setState({ openUserModal: true });
    }

    handleCloseUser() {
      this.setState({ openUserModal: false });
    }

    logout() {
      localStorage.setItem('loggedInUser', '');
      window.location.reload();
    }

    onAddMember(id) {
      this.props.currentUser.joinRoom({
        roomId: id,
      });

      this.setState({
        update: true,
        roomId: 15456697,
      });
    }

    onChangeMyRoom(id) {
      this.setState({
        update: true,
        roomId: id,
      });
    }

    updateState() {
      this.setState({
        update: false,
        newRoom: false,
      });
    }

    render() {
      const currentUser = this.props.currentUser || {};
      const users = currentUser ? currentUser.users : [];
      const messages = this.props.messages || [];
      const joinableRooms = this.props.joinableRooms || [];
      const rooms = currentUser ? currentUser.rooms : [];

      console.log('render', this.props.currentUser);

      if (users && users.length && (this.state.update === true || this.state.newRoom === true)) {
        this.props.dispatch({
          type: 'GET_JOINABLE_ROOM',
          currentUser: this.props.currentUser,
          roomId: this.state.roomId || 15456697,
        });
        this.props.dispatch({
          type: 'GET_MESSAGE',
          roomId: this.state.roomId || 15456697,
          currentUser: this.props.currentUser,
        });

        this.setState({
          update: false,
          newRoom: false,
        });

        localStorage.setItem('loggedInUserRoomId', this.state.roomId);
      }

      return (
        <Fragment>
          <Grid container spacing={24}>
            <Grid item xs={4}>
              <UsersList currentUser={currentUser} users={users} />

              <JoinableRooms joinableRooms={joinableRooms} onAdd={this.onAddMember.bind(this)} />
            </Grid>
            <Grid item xs={4}>
              <div ref="scroll" style={styles.chatBox}>
                <ChatBox
                  messages={messages}
                />
              </div>
              <SendMessageForm
                onSubmit={this.sendMessage}
              />

            </Grid>
            <Grid item xs={4}>
              <h2>List Of Actions</h2>
              <Button variant="contained" fullWidth color="primary" onClick={this.handleOpen.bind(this)} aria-label="Create Room">
                            Create Room
              </Button>
              <br />
              <Button style={styles.userModal} variant="contained" fullWidth color="primary" onClick={this.handleOpenUser.bind(this)} aria-label="Add User">
                            Add User into Room
              </Button>

              <Button style={styles.userModal} variant="contained" fullWidth color="primary" onClick={this.removeUserFromRoom.bind(this)} aria-label="Remove User">
                            Leave From Room
              </Button>

              <Button style={styles.userModal} variant="contained" fullWidth color="secondary" onClick={this.logout.bind(this)} aria-label="User Logout">
                            Sign Out
              </Button>

              <MyRooms myRooms={rooms} currentRoomId={this.state.roomId} myRoom={this.onChangeMyRoom.bind(this)} />

              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.openModal}
                onClose={this.handleClose.bind(this)}
              >
                <div style={styles.modal}>
                  <Typography variant="title" id="modal-title">
                                  New Chat Room Name
                  </Typography>
                  <TextField
                    id="newRoom"
                    label="New Chat Room Name"
                    onChange={this.newRoomName.bind(this)}
                    margin="normal"
                    fullWidth
                  />
                  <Button
                    onClick={this.addRoom.bind(this)}
                    variant="raised"
                    fullWidth
                    color="primary"
                  >
                                    Submit
                  </Button>
                </div>
              </Modal>

              <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={this.state.openUserModal}
                onClose={this.handleCloseUser.bind(this)}
              >
                <div style={styles.modal}>
                  <Typography variant="title" id="modal-title">
                                  Add User into Room
                  </Typography>
                  <TextField
                    id="newUser"
                    label="Add User into Room"
                    onChange={this.newUserName.bind(this)}
                    margin="normal"
                    fullWidth
                  />
                  <Button
                    onClick={this.addUser.bind(this)}
                    variant="raised"
                    fullWidth
                    color="primary"
                  >
                                    Submit
                  </Button>
                </div>
              </Modal>
            </Grid>

          </Grid>
        </Fragment>
      );
    }
}

const mapStateToProps = state => ({
  messages: state.messages,
  currentUser: state.currentUser,
  roomId: state.roomId,
  joinableRooms: state.joinableRooms,
});

export default connect(mapStateToProps)(Chat);
