const initialState = {
    title: 'Home',
    allUsers: [],
    favoriteUsers: [],
    allMessages: [],
    unreadMessages: [],
    isDataLoading: false
};

export default function homeReducer(state = initialState, action){
    switch(action.type){
        default: return state;
    }
}