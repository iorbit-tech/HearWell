const defaultState = {
    fetching: false,
    data: {},
    vitals: {},
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
            let response = action.payload;
            return {
                ...state,
                fetching: false,
                data: response
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
            let response = action.payload;
            return {
                ...state,
                fetching: false,
                data: response
            }
        }
        case "CREATE_VITALS_PENDING": {
            return {
                ...state,
                fetching: true,
                vitals: {},
                serverError: []
            }
        }

        case "CREATE_VITALS_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                vitals: response
            }
        }

        case "CREATE_VITALS_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }
    }
    return state;
}