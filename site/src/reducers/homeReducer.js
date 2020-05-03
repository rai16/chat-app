const initialState = {
    title: 'Home',
    requestUsers: false,
    users: [],
    fetchError: null,
    favoriteUsers: [],
    requestAllMessages: false,
    allMessages: [],
    unreadMessages: [],
    isDataLoading: false
};
//TODO : Create wrapper functions to update user online status and message read status
export default function homeReducer(state = initialState, action){
    switch(action.type){
        case 'REQUEST_USER_LIST':    return Object.assign({}, state, {requestUsers: true, fetchError: null});

        case 'SET_USER_LIST':{
            var userList = action.users.map(item => {
                var newItem = Object.assign({}, item);
                //two new keys added to track whether user is online or not and is typing or not
                newItem.online = false;
                newItem.typing = false;
                return newItem;
            });
            return Object.assign({}, state, {requestUsers: false, users: userList});
        }

        case 'ERROR_USER_LIST':      return Object.assign({}, state, {fetchError: action.error, requestUsers: false});

        case 'USER_CONNECTED': {
              let userList = state.users.map(item => {
                  if(item._id === action.userid)
                      item.online = true;
                  return item;
              });
              return Object.assign({}, state, {users: userList});
        }

        case 'USER_DISCONNECTED': {
          let userList = state.users.map(item => {
              if(item._id === action.userid)
                  item.online = false;
              return item;
          });
          return Object.assign({}, state, {users: userList});
        }

        case 'REQUEST_ALL_MESSAGES': return Object.assign({}, state, {requestAllMessages: true, fetchError: null});
        case 'SET_ALL_MESSAGES':     return Object.assign({}, state, {requestAllMessages: false, allMessages: action.allMessages});
        case 'ERROR_ALL_MESSAGES':   return Object.assign({}, state, {fetchError: action.error, requestAllMessages: false});

        default: return state;
    }
}
