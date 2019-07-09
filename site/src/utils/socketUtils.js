import getApiConfig from '../apiConfig';
import * as constant from '../constants.js';
import * as homeActions from '../actions/homeActions';
var io = require('socket.io-client');
var config = getApiConfig();

export var socket; 

export function initSocketConn(token, userid, dispatch)
{
    socket = io(config.dev.base, {
        query: {
            Token: token,
            userid
        }
    });
    registerListeners(socket, dispatch);
}

function registerListeners(socket, dispatch){
    socket.on(constant.SOCKET_USER_CONNECTED, payload => dispatch(homeActions.onUserConnected(payload)));
    socket.on(constant.SOCKET_MESSAGE_RECEIVED, payload => dispatch(homeActions.onMessageReceived(payload)));
    socket.on(constant.SOCKET_MESSAGE_TYPING, payload => dispatch(homeActions.onMessageTyping(payload)));
    socket.on(constant.SOCKET_MESSAGE_SENT, payload => dispatch(homeActions.onMessageSent(payload)));
    socket.on(constant.SOCKET_MESSAGE_UNREAD, payload => dispatch(homeActions.onMessageUnread(payload)));
    socket.on(constant.SOCKET_MESSAGE_READ, payload => dispatch(homeActions.onMessageRead(payload)));
}

export function getSocketConn(){
    return socket;
}