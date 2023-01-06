import api from "../actions/api";

const defaultState = {
    fetching: false,
    chat: [],
    serverError: [],
    isRegistered: "NOT_REGISTERED",
    msgStatus: false
}

export default function chatReducer(state = defaultState, action) {
    switch (action.type) {
        case "CREATE_CHAT_PENDING": {
            return {
                ...state,
                fetching: true,
                // chat: {},
                serverError: []
            }
        }
        case "CREATE_CHAT_FULFILLED": {
            console.log(state.chat, 'state.chat.chat')
            let olddata = state.chat;
            let response = action.payload.data.data;
            let newResponse = olddata.concat(response);
            // console.log(state.chat, 'oldResponse')
            return {
                ...state,
                fetching: false,
                chat: newResponse,
            }
        }
        case "CREATE_CHAT_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
        case "GET_CHAT_PENDING": {
            return {
                ...state,
                fetching: true,
                chat: {},
                serverError: []
            }
        }
        case "GET_CHAT_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                // chat: response
                chat: response
            }
        }
        case "GET_CHAT_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
        case "MSG_STATUS_PENDING": {
            return {
                ...state,
                fetching: true,
                chat: {},
                serverError: [],
                msgStatus: false
            }
        }
        case "MSG_STATUS_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                msgStatus: true
            }
        }
        case "MSG_STATUS_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
    }
    return state;
}