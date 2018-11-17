import homeReducer from './homeReducer';
import loginReducer from './loginReducer';
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    home: homeReducer,
    login: loginReducer
});

export default rootReducer;