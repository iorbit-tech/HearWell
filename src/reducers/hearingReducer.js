import api from "../actions/api";

const defaultState = {
    fetching: false,
    questions: {},
    serverError: [],
    isRegistered: "NOT_REGISTERED"
}

export default function hearingReducer(state = defaultState, action) {
    switch (action.type) {
        case "HEARING_LIST_PENDING": {
            return {
                ...state,
                fetching: true,
                questions: {},
                serverError: []
            }
        }
        case "HEARING_LIST_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                questions: response
            }
        }
        case "HEARING_LIST_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
    }
    return state;
}