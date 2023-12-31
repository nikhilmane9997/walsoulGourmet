export const ALL_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/customers/`,
    REQUEST: 'REQUEST_ALL_ADDRESS_DATA',
    RECEIVED: 'RECEIVED_ALL_ADDRESS_DATA',
    RECEIVED_ERROR: 'RECEIVED_ALL_ADDRESS_ERROR',
});

export const ADD_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/address/`,
    REQUEST: 'REQUEST_ADD_ADDRESS_DATA',
    RECEIVED: 'RECEIVED_ADD_ADDRESS_DATA',
    RECEIVED_ERROR: 'RECEIVED_ADD_ADDRESS_ERROR',
});

export const DELETE_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/addresses/`,
    REQUEST: 'REQUEST_DELETE_ADDRESS_DATA',
    RECEIVED: 'RECEIVED_DELETE_ADDRESS_DATA',
    RECEIVED_ERROR: 'RECEIVED_DELETE_ADDRESS_ERROR',
});

export const EDIT_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/address`,
    REQUEST: 'REQUEST_EDIT_ADDRESS_DATA',
    RECEIVED: 'RECEIVED_EDIT_ADDRESS_DATA',
    RECEIVED_ERROR: 'RECEIVED_EDIT_ADDRESS_ERROR',
});

export const EDIT_BILL_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/address`,
    REQUEST: 'REQUEST_BILL_EDIT_ADDRESS_DATA',
    RECEIVED: 'RECEIVED_BILL_EDIT_ADDRESS_DATA',
    RECEIVED_ERROR: 'RECEIVED_BILL_EDIT_ADDRESS_ERROR',
});


export const SET_ADDR_ID_CONSTANTS = 'SET_ADDR_ID';

export const SHIPPING_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/customers/`,
    REQUEST: 'REQUEST_SHIPPING_ADDRESS',
    RECEIVED: 'RECEIVED_SHIPPING_ADDRESS',
    RECEIVED_ERROR: 'RECEIVED_SHIPPING_ADDRESS_ERROR',
});

export const BILLING_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/customers/`,
    REQUEST: 'REQUEST_BILLING_ADDRESS',
    RECEIVED: 'RECEIVED_BILLING_ADDRESS',
    RECEIVED_ERROR: 'RECEIVED_BILLING_ADDRESS_ERROR',
});

export const REQUEST_DELETE_ADDRESS = ({
    URL: 'REQUEST_DELETE_ADDRESS',
});

export const ADD_BILL_ADDRESS_CONSTANTS = ({
    URL: `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/address/`,
    REQUEST: 'REQUEST_ADD_BILL_ADDRESS_DATA',
    RECEIVED: 'RECEIVED_ADD_BILL_ADDRESS_DATA',
    RECEIVED_ERROR: 'RECEIVED_ADD_BILL_ADDRESS_ERROR',
});
