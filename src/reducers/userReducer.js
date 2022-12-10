import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import api from "../actions/api";
import { USER_TOKEN } from "../Constants/appconstants";

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

        case "SET_TOKEN": {
            RNSecureKeyStore.set(USER_TOKEN, action.payload, {
                accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
            });
            api.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`;
            return {
                ...state,
                token: action.payload,
            };
        }

        case "CHECK_REGISTERED": {
            return {
                ...state,
                isRegistered: action.payload,
            };
        }

        case "GOOGLE_AUTH_PENDING": {
            return {
                ...state,
                fetching: true,
                data: {},
                serverError: []
            }
        }

        case "GOOGLE_AUTH_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                data: response
            }
        }

        case "GOOGLE_AUTH_REJECTED": {
            let response = action.payload;
            return {
                ...state,
                fetching: false,
                data: response
            }
        }
    }
    return state;
}