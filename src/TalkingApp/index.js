function TalkingApp(currState, action) {
  switch (action.type) {
    case 'GET_USERNAME':
      return Object.assign({}, {
        username: action.username,
        roomId: currState.roomId,
      });

    case 'SET_USERNAME':
      return Object.assign({}, {
        screen: 'Chat',
        username: action.username,
        messages: [],
        roomId: currState.roomId,
        currentUser: {},
        joinableRooms: [],
      });

    case 'SET_MESSAGE':
      return Object.assign({}, {
        screen: 'Chat',
        username: currState.username,
        currentUser: currState.currentUser,
        roomId: currState.roomId,
        messages: action.messages,
        joinableRooms: currState.joinableRooms,
      });

    case 'SET_CURRENT_USER':
      return Object.assign({}, {
        screen: 'Chat',
        username: currState.username,
        messages: currState.messages,
        roomId: currState.roomId,
        currentUser: action.currentUser,
        joinableRooms: currState.joinableRooms,
      });

    case 'SET_NEW_ROOM':
      return Object.assign({}, {
        screen: 'Chat',
        username: currState.username,
        currentUser: currState.currentUser,
        messages: [{
          text: 'NEW ROOM HAS CREATED!!',
          senderId: currState.username,
        }],
        roomId: action.room.id,
        joinableRooms: currState.joinableRooms,
      });

    case 'SET_NEW_USER':
      return Object.assign({}, {
        screen: 'Chat',
        username: currState.username,
        currentUser: currState.currentUser,
        messages: [{
          text: 'NEW USER HAS ADDED HERE!!',
          senderId: currState.username,
        }],
        roomId: currState.roomId,
        joinableRooms: currState.joinableRooms,
      });

    case 'SET_REMOVE_USER':
      return Object.assign({}, {
        screen: 'Chat',
        username: currState.username,
        currentUser: currState.currentUser,
        messages: [{
          text: 'YOU ARE LEFT THE ROOM!!',
          senderId: '',
        }],
        roomId: currState.roomId,
        joinableRooms: currState.joinableRooms,
      });
    case 'SET_JOINABLE_ROOM':
      return Object.assign({}, {
        screen: 'Chat',
        joinableRooms: action.room,
        username: currState.username,
        currentUser: currState.currentUser,
        roomId: currState.roomId,
        messages: currState.messages,
      });

    case 'SET_INTO_ROOM':
      return Object.assign({}, {
        screen: 'Chat',
        username: currState.username,
        currentUser: currState.currentUser,
        messages: [{
          text: 'You Have Joined into Room!!',
          senderId: '',
        }],
        roomId: action.currentRoomId,
        joinableRooms: currState.joinableRooms,
      });

    default:
      return currState;
  }
}

module.exports = TalkingApp;
