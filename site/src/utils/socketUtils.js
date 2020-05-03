import getApiConfig from '../apiConfig';
import * as constant from '../constants.js';
import * as userActions from '../actions/userActions';
import * as messageActions from '../actions/messageActions';
var io = require('socket.io-client');
var config = getApiConfig();

var socket = null;

export function initSocketConn(token, userid, store)
{
    if(socket !== null)
      socket.close();

    socket = io(config.dev.base, {
        query: {
            Token: token,
            userid
        }
    });
    registerListeners(socket, store);
}

export function closeSocketConn()
{
  socket.close();
}

function registerListeners(socket, store)
{
    socket.on(constant.SOCKET_USER_CONNECTED,   payload => store.dispatch(userActions.onUserConnected(payload)));
    socket.on(constant.SOCKET_USER_DISCONNECTED,payload => store.dispatch(userActions.onUserDisconnected(payload)));
    socket.on(constant.SOCKET_MESSAGE_RECEIVED, payload => store.dispatch(messageActions.onMessageReceived(payload)));
    socket.on(constant.SOCKET_MESSAGE_TYPING,   payload => store.dispatch(messageActions.onMessageTyping(payload)));
    socket.on(constant.SOCKET_MESSAGE_SENT,     payload => store.dispatch(messageActions.onMessageSent(payload)));
    socket.on(constant.SOCKET_MESSAGE_UNREAD,   payload => store.dispatch(messageActions.onMessageUnread(payload)));
    socket.on(constant.SOCKET_MESSAGE_READ,     payload => store.dispatch(messageActions.onMessageRead(payload)));
}

export function sendMessage(payload)
{
  socket.emit(constant.SOCKET_MESSAGE, payload);
}

export function getSocketConn()
{
    return socket;
}
