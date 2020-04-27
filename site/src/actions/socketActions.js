import * as constants from '../constants';

//action triggered when socket to be connected, passing token and user id to be passed in connection
export function socketConnect(token, userid){
    return{
        type: constants.ACTION_SOCKET_CONNECT,
        token,
        userid
    }
}
//action triggered to close the socket connection
export function socketClose(){
    return{
        type: constants.ACTION_SOCKET_CLOSE
    }
}
