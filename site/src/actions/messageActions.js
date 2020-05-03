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
    var message = payload.message;
    return{
        type: 'MESSAGE_RECEIVED',
        message
    }
}

export function onMessageTyping(payload){
    var user = payload.user;
    return{
        type: 'MESSAGE_TYPING',
        user
    }
}

export function onMessageStopTyping(payload){
    var user = payload.user;
    return{
      type: 'MESSAGE_STOP_TYPING',
      user
    }
}

export function onMessageSent(payload){
   var message = payload.message;
    return{
        type: 'MESSAGE_SENT',
        message
    }
}

export function onMessageUnread(payload){
    var messageId = payload.messageId;
    return{
        type: 'MESSAGE_UNREAD',
        messageId
    }
}

export function onMessageRead(payload){
    var userId = payload.userId;
    return{
        type: 'MESSAGE_READ',
        userId
    }
}
