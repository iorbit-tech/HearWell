import api from "../actions/api";

const defaultState = {
    fetching: false,
    data: {},
    serverError: [],
    isRegistered: "NOT_REGISTERED"
}

export default function tellusReducer(state = defaultState, action) {
    switch (action.type) {
        case "TELLUS_LIST_PENDING": {
            return {
                ...state,
                fetching: true,
                data: {},
                serverError: []
            }
        }
        case "TELLUS_LIST_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                data: response
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