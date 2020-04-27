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
    console.log(payload);
    return{
        type: 'USER_CONNECTED',
        payload
    }
}
