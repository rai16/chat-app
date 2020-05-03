export function requestUserList(){
    return{
        type: 'REQUEST_USER_LIST'
    }
}

export function setUserList(users){
    return{
        type: 'SET_USER_LIST',
        users
    }
}

export function errorUserList(error){
    return{
        type: 'ERROR_USER_LIST',
        error
    }
}

export function onUserConnected(payload){
    var userid = payload.userid;
    return{
        type: 'USER_CONNECTED',
        userid
    }
}

export function onUserDisconnected(payload){
    var userid = payload.userid;
    return{
        type: 'USER_DISCONNECTED',
        userid
    }
}
