import {getApiConfig} from '../apiConfig';
var config = getApiConfig();
var socket; 
export function createSocketConn()
{
    socket = io(config.dev.base);
}
//authenticate by using JWT
export function authenticate()
{
    //will send JWT
    socket.emit('authenticate', );
}