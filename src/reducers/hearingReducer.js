import api from "../actions/api";

const defaultState = {
    fetching: false,
    questions: {},
    answers: {},
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
        case "SUBMIT_ANSWER_PENDING": {
            return {
                ...state,
                fetching: true,
                answers: {},
                serverError: []
            }
        }
        case "SUBMIT_ANSWER_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                answers: response
            }
        }
        case "SUBMIT_ANSWER_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
    }
    return state;
}