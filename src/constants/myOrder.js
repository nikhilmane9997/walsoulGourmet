// My Order Constants
export const MY_ORDER_URL = `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/orders`;
export const REQUEST_MY_ORDER_SEARCH = "REQUEST_MY_ORDER_SEARCH";
export const RECEIVED_MY_ORDER_SEARCH = "RECEIVED_MY_ORDER_SEARCH";
export const RECEIVED_MY_ORDER_SEARCH_ERROR = "RECEIVED_MY_ORDER_SEARCH_ERROR";

// My Order Constants From  OrderId
export const ORDER_ID_URL = `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/orders`;
export const REQUEST_MY_ORDER_BY_ID = "REQUEST_MY_ORDER_BY_ID";
export const RECEIVED_MY_ORDER_BY_ID = "RECEIVED_MY_ORDER_BY_ID";
export const RECEIVED_MY_ORDER_BY_ID_ERROR = "RECEIVED_MY_ORDER_BY_ID_ERROR";

// My Invoice Constants
export const MY_INVOICE_URL = `${process.env.APPLICATION_BFF_URL}/info/invoices/list`;
export const REQUEST_MY_INVOICE_SEARCH = "REQUEST_MY_INVOICE_SEARCH";
export const RECEIVED_MY_INVOICE_SEARCH = "RECEIVED_MY_INVOICE_SEARCH";
export const RECEIVED_MY_INVOICE_SEARCH_ERROR =
  "RECEIVED_MY_INVOICE_SEARCH_ERROR";

// Open term Constants
export const MY_OPEN_TERM_URL = `${process.env.APPLICATION_BFF_URL}/info/openterms/list`;
export const REQUEST_OPEN_TERM_SEARCH = "REQUEST_OPEN_TERM_SEARCH";
export const RECEIVED_OPEN_TERM_SEARCH = "RECEIVED_OPEN_TERM_SEARCH";
export const RECEIVED_OPEN_TERM_SEARCH_ERROR =
  "RECEIVED_OPEN_TERM_SEARCH_ERROR";

// View Order Constants
export const VIEW_ORDER_URL_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/order`,
  REQUEST: "REQUEST_VIEW_ORDER",
  RECEIVED: "RECEIVED_VIEW_ORDER",
  RECEIVED_ERROR: "RECEIVED_VIEW_ORDER_ERROR",
};

// download pdf
export const DOWNLOAD_INVOICES_URL_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/invoices/download`,
  REQUEST: "REQUEST_PDF_DOWNLOAD",
  RECEIVED: "RECEIVED_PDF_DOWNLOAD",
  RECEIVED_ERROR: "RECEIVED_PDF_DOWNLOAD_ERROR",
};

// order Id
export const SET_ORDER_ID = "SET_ORDER_ID";

// multiple orders payments in openterms
export const MULTIPLE_ORDER_PAYMENT_OPENTERMS_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/order/openterms`,
  REQUEST: "REQUEST_MULTIPLE_ORDER_PAYMENT_OPENTERMS",
  RECEIVED: "RECEIVED_MULTIPLE_ORDER_PAYMENT_OPENTERMS",
  RECEIVED_ERROR: "RECEIVED_MULTIPLE_ORDER_PAYMENT_OPENTERMS_ERROR",
};

// Re-order
export const REORDER_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/info/reorder`,
  REQUEST: "REQUEST_REORDER_DATA",
  RECEIVED: "RECEIVED_REORDER_DATA",
  RECEIVED_ERROR: "RECEIVED_REORDER_DATA_ERROR",
};

// Premium-order
export const PRIME_ORDER_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/order/prime`,
  REQUEST: "REQUEST_PRIME_ORDER_DATA",
  RECEIVED: "RECEIVED_PRIME_ORDER_DATA",
  RECEIVED_ERROR: "RECEIVED_PRIME_ORDER_DATA_ERROR",
};

// Cancel Premium-Membership
export const CANCEL_PRIME_MEMBERSHIP_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/order/prime/cancel`,
  REQUEST: "REQUEST_CANCEL_PRIME_MEMBERSHIP_DATA",
  RECEIVED: "RECEIVED_CANCEL_PRIME_MEMBERSHIP_DATA",
  RECEIVED_ERROR: "RECEIVED_CANCEL_PRIME_MEMBERSHIP_DATA_ERROR",
};

// Auto Renewal Premium-Membership
export const RENEW_PRIME_MEMBERSHIP_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/order/prime/renewal`,
  REQUEST: "REQUEST_RENEW_PRIME_MEMBERSHIP_DATA",
  RECEIVED: "RECEIVED_RENEW_PRIME_MEMBERSHIP_DATA",
  RECEIVED_ERROR: "RECEIVED_RENEW_PRIME_MEMBERSHIP_DATA_ERROR",
};

// Upgrade/Downgrade Premium-Membership
export const UPGRADE_PRIME_MEMBERSHIP_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/order/prime/upgrade`,
  REQUEST: "REQUEST_UPGRADE_PRIME_MEMBERSHIP_DATA",
  RECEIVED: "RECEIVED_UPGRADE_PRIME_MEMBERSHIP_DATA",
  RECEIVED_ERROR: "RECEIVED_UPGRADE_PRIME_MEMBERSHIP_DATA_ERROR",
};

// Cancel subscription order
export const CANCEL_SUBSCRIPTION_ORDER_CONSTANTS = {
  URL: `${process.env.APPLICATION_BFF_URL}/orders/subscription/cancel`,
  REQUEST: "REQUEST_CANCEL_SUBSCRIPTION_ORDER_DATA",
  RECEIVED: "RECEIVED_CANCEL_SUBSCRIPTION_ORDER_DATA",
  RECEIVED_ERROR: "RECEIVED_CANCEL_SUBSCRIPTION_ORDER_ERROR",
};
export const PRODUCTS_REVIEW_URL = `${process.env.APPLICATION_BFF_URL}/rest/WG/V1/reviews`;
export const REQUEST_POST_PRODUCT_REVIEW = "REQUEST_POST_PRODUCT_REVIEW";
export const RECEIVED_POST_PRODUCT_REVIEW_SUCCESS =
  "RECEIVED_POST_PRODUCT_REVIEW_SUCCESS";
export const RECEIVED_POST_PRODUCT_REVIEW_ERROR =
  "RECEIVED_POST_PRODUCT_REVIEW_ERROR";
