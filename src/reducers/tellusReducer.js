import api from "../actions/api";

const defaultState = {
    fetching: false,
    questions: {},
    serverError: [],
    isRegistered: "NOT_REGISTERED"
}

export default function tellusReducer(state = defaultState, action) {
    switch (action.type) {
        case "TELLUS_LIST_PENDING": {
            return {
                ...state,
                fetching: true,
                questions: {},
                serverError: []
            }
        }
        case "TELLUS_LIST_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                questions: response
            }
        }
        case "TELLUS_LIST_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
    }
    return state;
}