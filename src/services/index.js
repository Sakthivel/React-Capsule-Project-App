import axios from 'axios';
import Chatkit from '@pusher/chatkit';

const hostName = 'http://' + window.location.hostname + ':3001';

export function getUserName(username) {
    return axios.post(hostName + '/users',{ username }).then(result => new Promise((resolve, reject) => {
        resolve(username);
    })).catch(error => {return username})
}

export function getCurrentUser(username) {
    return new Chatkit.ChatManager({
        instanceLocator: 'v1:us1:f3b4d9d2-eb2b-412a-9fba-b5885cebb3b8',
        userId: username,
        tokenProvider: new Chatkit.TokenProvider({
            url: hostName + '/authenticate'
        })
    }).connect().then(currentUser => new Promise((resolve, reject) => {
        resolve(currentUser)
    })).catch(error => console.error('Error in getCurrentUser', error))
}

export function userMessage(action) {
    return action.currentUser.fetchMessages({
        roomId: action.roomId,
        direction: 'older',
        limit: 100,
    })
    .then(messages => new Promise((resolve, reject) => {
        resolve(messages)
    })
    .catch(err => {
        console.error(`Error in userMessage: ${err}`)
    }))
}

export function newChatRoom(action) {
    return action.currentUser.createRoom({
        name: action.roomName,
        private: true,
        user_ids: action.currentUser.id
    })
    .then(room => new Promise((resolve, reject) => {
        resolve(room)
    })
    .catch(err => {
        console.error(`Error in newChatRoom: ${err}`)
    }))
}

export function addNewUser(action) {
    return action.currentUser.addUserToRoom({
        userId: action.user,
        roomId: action.roomId
    })
    .then(() => {
        console.log(`Added ${action.user} to room 123`)
    })
    .catch(err => {
        console.log(`Error adding ${action.user} to room: ${err}`)
    })
}

export function leaveUserFromRoom(action) {
    action.currentUser.leaveRoom({ roomId: action.roomId })
      .then(room => {
        console.log(`Left room with ID: ${action.roomId}`)
      })
      .catch(err => {
        console.log(`Error leaving room ${action.roomId}: ${err}`)
      })

    action.currentUser.disconnect();

    return true;
}
