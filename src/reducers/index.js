import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import tellusReducer from './tellusReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    tellus: tellusReducer,
});

const rootReducer = (state, action) => {
    if (action.type === "LOGOUT") {
        state = undefined;
    }
    return appReducer(state, action);
}

export default rootReducer;