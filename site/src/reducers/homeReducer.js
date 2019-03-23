const initialState = {
    title: 'Home',
    requestUsers: false,
    users: [],
    errorUsers: null,
    favoriteUsers: [],
    requestAllMessages: false,
    allMessages: [],
    errorAllMessages: null,
    unreadMessages: [],
    isDataLoading: false
};

export default function homeReducer(state = initialState, action){
    switch(action.type){
        case 'REQUEST_USER_LIST':    return Object.assign({}, state, {requestUsers: true, errorUsers: null});
        case 'SET_USER_LIST':        return Object.assign({}, state, {requestUsers: false, users: action.users});  
        case 'ERROR_USER_LIST':      return Object.assign({}, state, {errorUsers: action.error, requestUsers: false});
        
        case 'REQUEST_ALL_MESSAGES': return Object.assign({}, state, {requestAllMessages: true, errorAllMessages: null});
        case 'SET_ALL_MESSAGES':     return Object.assign({}, state, {requestAllMessages: false, allMessages: action.allMessages});
        case 'ERROR_ALL_MESSAGES':   return Object.assign({}, state, {errorAllMessages: action.error, requestAllMessages: false});
        default: return state;
    }
}