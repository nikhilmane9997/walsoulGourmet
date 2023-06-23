import * as REGISTER_CONSTANTS from '../constants/register';

const registerReducer = (state = {
    type: '',
    error: '',
    registerStatus:'',
    registerMessage:'',
    isFetching: false,
    registerData: [],
    trackUrl: '',
    registerError: '',
    stateListData: undefined,
    billStateData: undefined,
}, action) => {
    switch (action.type) {
        case REGISTER_CONSTANTS.CLEAR_REGISTER_DATA:
            return Object.assign({}, state, {
                type: '',
                error: '',
                isFetching: false,
                registerData: [],
                registerMessage: '',
                registerStatus: '',
            });
        case REGISTER_CONSTANTS.REQUEST_REGISTER_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                registerData: [],
                registerMessage: '',
                registerStatus: '',
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_REGISTER_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                registerData: action.data,
                registerStatus: action.status,
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_REGISTER_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                registerMessage: action.errorCode.data.message,
                registerStatus: action.errorCode.status,
                error: action.errorCode,
            });

        case REGISTER_CONSTANTS.REQUEST_STATE_LIST_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                stateListData: undefined,
                registerData: [],
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_STATE_LIST_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                stateListData: action.data,
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_STATE_LIST_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case REGISTER_CONSTANTS.REQUEST_TRACK_URL:
            return Object.assign({}, state, {
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_TRACK_URL:
            return Object.assign({}, state, {
                stateListData: action.data,
                trackUrl: action.data,
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_TRACK_URL_ERROR:
            return Object.assign({}, state, {
                error: action.error,
            });


            case REGISTER_CONSTANTS.REQUEST_BILLING_STATE_LIST_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                billStateData: undefined,
                registerData: [],
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_BILLING_STATE_LIST_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                billStateData: action.data,
                lastUpdated: action.receivedAt,
            });

        case REGISTER_CONSTANTS.RECEIVED_BILLING_STATE_LIST_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        default:
            return state;
    }
};

export default registerReducer;
