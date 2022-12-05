import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import hearingReducer from './hearingReducer';
import tellusReducer from './tellusReducer';
import userReducer from './userReducer';
import chatReducer from './chatReducer';

const appReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    tellus: tellusReducer,
    hearing: hearingReducer,
    chat: chatReducer
});

const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;