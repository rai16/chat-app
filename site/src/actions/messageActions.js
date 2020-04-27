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


export function onMessageReceived(payload){
    return{
        type: 'MESSAGE_RECEIVED',
        payload
    }
}

export function onMessageTyping(payload){
    return{
        type: 'MESSAGE_TYPING',
        payload
    }
}

export function onMessageSent(payload){
    return{
        type: 'MESSAGE_',
        payload
    }
}

export function onMessageUnread(payload){
    return{
        type: 'MESSAGE_UNREAD',
        payload
    }
}

export function onMessageRead(payload){
    return{
        type: 'MESSAGE_READ',
        payload
    }
}
