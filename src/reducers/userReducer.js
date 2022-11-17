const defaultState = {
    fetching: false,
    data: {},
    serverError: [],
    isRegistered: "NOT_REGISTERED"
}

export default function userReducer(state = defaultState, action) {
    switch (action.type) {
        case "SIGNUP_PENDING": {
            return {
                ...state,
                fetching: true,
                data: {},
                serverError: []
            }
        }

        case "SIGNUP_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                data: response
            }
        }

        case "SIGNUP_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
        case "LOGIN_PENDING": {
            return {
                ...state,
                fetching: true,
                data: {},
                serverError: []
            }
        }

        case "LOGIN_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                data: response
            }
        }

        case "LOGIN_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
    }
    return state;
}