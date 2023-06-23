import {
    ALL_ADDRESS_CONSTANTS,
    ADD_ADDRESS_CONSTANTS,
    DELETE_ADDRESS_CONSTANTS,
    EDIT_ADDRESS_CONSTANTS,
    SET_ADDR_ID_CONSTANTS,
    SHIPPING_ADDRESS_CONSTANTS,
    BILLING_ADDRESS_CONSTANTS,
    REQUEST_DELETE_ADDRESS,
    EDIT_BILL_ADDRESS_CONSTANTS,
    ADD_BILL_ADDRESS_CONSTANTS,
} from '../constants/address';

const allAddressReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    allAddressData: [],
    addAddressData: [],
    editAddressData: [],
    deleteAddressData: [],
    addrId: '',
    shippingAddressData: undefined,
    billingAddressData: undefined,
    editBillAddressData:[],
    addBillAdddressData: [],
}, action) => {
    switch (action.type) {
        case REQUEST_DELETE_ADDRESS.URL:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                allAddressData: [],
                addAddressData: [],
                editAddressData: [],
                deleteAddressData: [],
                addrId: '',
                shippingAddressData: undefined,
                billingAddressData: undefined,
                lastUpdated: action.receivedAt,
            });
        case ALL_ADDRESS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                allAddressData: [],
                addAddressData: [],
                editAddressData: [],
                deleteAddressData: [],
                lastUpdated: action.receivedAt,
            });
        case ALL_ADDRESS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                addAddressData: [],
                editAddressData: [],
                allAddressData: action.data,
                lastUpdated: action.receivedAt,
            });

        case ALL_ADDRESS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case ADD_ADDRESS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                addAddressData: [],
                editAddressData: [],
                deleteAddressData: [],
                editBillAddressData:[],
                addBillAdddressData: [],
                lastUpdated: action.receivedAt,
            });
        case ADD_ADDRESS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                addAddressData: action.data,
                lastUpdated: action.receivedAt,
            });

        case ADD_ADDRESS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case DELETE_ADDRESS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                addAddressData: [],
                allAddressData: [],
                lastUpdated: action.receivedAt,
            });
        case DELETE_ADDRESS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                deleteAddressData: action.data,
                lastUpdated: action.receivedAt,
            });

        case DELETE_ADDRESS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case EDIT_ADDRESS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                editAddressData: [],
                allAddressData: [],
                lastUpdated: action.receivedAt,
            });
        case EDIT_ADDRESS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                editAddressData: action.data,
                lastUpdated: action.receivedAt,
            });

        case EDIT_ADDRESS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case SET_ADDR_ID_CONSTANTS:
            return Object.assign({}, state, {
                type: action.type,
                allAddressData: [],
                addrId: action.data,
            });
            case SHIPPING_ADDRESS_CONSTANTS.REQUEST:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    shippingAddressData: undefined,
                    lastUpdated: action.receivedAt,
                });
            case SHIPPING_ADDRESS_CONSTANTS.RECEIVED:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    didInvalidate: false,
                    shippingAddressData: action.data,
                    lastUpdated: action.receivedAt,
                });    
            case SHIPPING_ADDRESS_CONSTANTS.RECEIVED_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
                case BILLING_ADDRESS_CONSTANTS.REQUEST:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    billingAddressData: undefined,
                    lastUpdated: action.receivedAt,
                });
            case BILLING_ADDRESS_CONSTANTS.RECEIVED:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    didInvalidate: false, 
                    billingAddressData: action.data,
                    lastUpdated: action.receivedAt,
                });    
            case BILLING_ADDRESS_CONSTANTS.RECEIVED_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
                case EDIT_BILL_ADDRESS_CONSTANTS.REQUEST:
                    return Object.assign({}, state, {
                        isFetching: true,
                        type: action.type,
                        editBillAddressData: [],
                        //allAddressData: [],
                        lastUpdated: action.receivedAt,
                    });
                case EDIT_BILL_ADDRESS_CONSTANTS.RECEIVED:
                    return Object.assign({}, state, {
                        isFetching: false,
                        type: action.type,
                        didInvalidate: false,
                        editBillAddressData: action.data,
                        lastUpdated: action.receivedAt,
                    });
        
                case EDIT_BILL_ADDRESS_CONSTANTS.RECEIVED_ERROR:
                    return Object.assign({}, state, {
                        isFetching: false,
                        type: action.type,
                        error: action.error,
                    });

                    case ADD_BILL_ADDRESS_CONSTANTS.REQUEST:
                        return Object.assign({}, state, {
                            isFetching: true,
                            type: action.type,
                            addAddressData: [],
                            editAddressData: [],
                            deleteAddressData: [],
                            editBillAddressData:[],
                            addBillAdddressData: [],
                            lastUpdated: action.receivedAt,
                        });
                    case ADD_BILL_ADDRESS_CONSTANTS.RECEIVED:
                        return Object.assign({}, state, {
                            isFetching: false,
                            type: action.type,
                            didInvalidate: false,
                            addBillAdddressData: action.data,
                            lastUpdated: action.receivedAt,
                        });
            
                    case ADD_BILL_ADDRESS_CONSTANTS.RECEIVED_ERROR:
                        return Object.assign({}, state, {
                            isFetching: false,
                            type: action.type,
                            error: action.error,
                        });
            
        default:
            return state;
    }
};

export default allAddressReducer;
