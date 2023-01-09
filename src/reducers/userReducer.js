import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store";
import api from "../actions/api";
import { USER, USER_TOKEN } from "../Constants/appconstants";

const defaultState = {
    fetching: false,
    data: {},
    vitals: {},
    serverError: [],
    isRegistered: "NOT_REGISTERED",
    authCheck: '',
    response: {}
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

        case "FETCH_VITALS_PENDING": {
            return {
                ...state,
                fetching: true,
                vitals: {},
                serverError: [],
            }
        }

        case "FETCH_VITALS_FULFILLED": {
            let response = action.payload.data[0];
            return {
                ...state,
                fetching: false,
                vitals: response,
            }
        }

        case "FETCH_VITALS_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }

        case "UPDATE_VITALS_PENDING": {
            return {
                ...state,
                fetching: true,
                serverError: [],
            }
        }

        case "UPDATE_VITALS_FULFILLED": {
            let payload = action.payload
            let oldVitals = payload.data.vital;
            let updatedData = action.meta.data;
            let updatedVitals = { ...oldVitals, ...updatedData }
            return {
                ...state,
                fetching: false,
                vitals: updatedVitals,
                response: payload
            }
        }

        case "UPDATE_VITALS_REJECTED": {
            return {
                ...state,
                fetching: false,
            }
        }

        case "SET_TOKEN": {
            RNSecureKeyStore.set(USER_TOKEN, action.payload.data, {
                accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
            });
            RNSecureKeyStore.set(USER, action.payload.user, {
                accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
            });
            api.defaults.headers.common["Authorization"] = `Bearer ${action.payload.data}`;
            return {
                ...state,
                token: action.payload.data,
                data: {
                    user: { userId: action.payload.user }
                }
            };
        }

        case "CHECK_REGISTERED": {
            return {
                ...state,
                isRegistered: action.payload,
            };
        }

        case "CLEAR_RESPONSE": {
            return {
                ...state,
                response: {},
            };
        }

        case "GOOGLE_AUTH_PENDING": {
            return {
                ...state,
                fetching: true,
                authCheck: '',
                serverError: []
            }
        }

        case "GOOGLE_AUTH_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                authCheck: response
            }
        }

        case "GOOGLE_AUTH_REJECTED": {
            let response = action.payload.response.data;
            return {
                ...state,
                fetching: false,
                authCheck: response
            }
        }

        case "GOOGLE_AUTH_CHECK_PENDING": {
            return {
                ...state,
                fetching: true,
                data: '',
                serverError: []
            }
        }

        case "GOOGLE_AUTH_CHECK_FULFILLED": {
            let response = action.payload.data;
            return {
                ...state,
                fetching: false,
                data: response
            }
        }

        case "GOOGLE_AUTH_CHECK_REJECTED": {
            return {
                ...state,
                data: false,
            }
        }
    }
    return state;
}