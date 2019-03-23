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

export function requestAllMessages(){
    return{
        type: 'REQUEST_ALL_MESSAGES'
    }
}

export function setAllMessages(allMessages){
    return{
        type: 'SET_ALL_MESSAGES',
        allMessages
    }
}

export function errorAllMessages(error){
    return{
        type: 'ERROR_ALL_MESSAGES',
        error
    }
}