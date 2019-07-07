import getApiConfig from '../apiConfig';
var io = require('socket.io-client');
var config = getApiConfig();

export var socket; 

export function createSocketConn(token, userid)
{
    socket = io(config.dev.base, {
        query: {
            Token: token,
            userid
        }
    });
}

export function getSocketConn(){
    return socket;
}