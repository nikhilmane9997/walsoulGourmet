import _get from "lodash/get";
import axios from "axios";
import qs from "qs";
import * as LOGIN_CONSTANTS from "../constants/login";
import dynamicActionWrapper, { generateFns } from "../utils/actionHelper";
import * as SALESREP_CONSTANTS from "../constants/salesRep";

export const requestLoginData = (subreddit) => ({
  type: LOGIN_CONSTANTS.REQUEST_LOGIN_DATA,
  subreddit,
});

export const receiveLoginData = (subreddit, json) => ({
  type: LOGIN_CONSTANTS.RECEIVED_LOGIN_DATA,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const receiveLoginDataError = (subreddit, err, errCode) => ({
  type: LOGIN_CONSTANTS.RECEIVED_LOGIN_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const logoutFunction = (subreddit) => ({
  type: LOGIN_CONSTANTS.REQUEST_LOGOUT,
  subreddit,
});

export const clearSalesRepFlag = (subreddit) => ({
  type: LOGIN_CONSTANTS.CLEAR_SALES_REP_FLAG,
  subreddit,
});

export const fetchLoginData = (data, subreddit) => (dispatch) => {
  return dispatch(
    dynamicActionWrapper({
      path: LOGIN_CONSTANTS.LOGIN_URL,
      method: "POST",
      body: data,
      initCb: requestLoginData,
      successCb: receiveLoginData,
      failureCb: receiveLoginDataError,
      subreddit,
      wrapperActionType: "FETCH_LOGIN_RESULT_WRAPPER",
      redirect: "follow",
    })
  );
};

export const receiveShowLoginModalData = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.SHOW_LOGIN_MODAL,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const receiveHideLoginModalData = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.HIDE_LOGIN_MODAL,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const updateCartData = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.UPDATE_CART,
  subreddit,
  data,
  receivedAt: Date.now(),
});
export const fetchProfileData = (data, subreddit) => (dispatch) => {
  const constants = _get(LOGIN_CONSTANTS, "PROFILE_DATA_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      successCb: _get(
        generateFns({
          initCb: _get(generateFns({ constants }), "request"),
          constants,
        }),
        "recieved"
      ),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "PROFILE_DATA_WRAPPER",
      redirect: "follow",
    })
  );
};

export const fetchCategoriesList = (data, subreddit) => (dispatch) => {
  const constants = _get(LOGIN_CONSTANTS, "CATEGORIES_LIST_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "CATEGORIES_LIST_WRAPPER",
      redirect: "follow",
    })
  );
};

export const setStoreId = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.SET_STORE_ID,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const setCartId = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.SET_CART_ID,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const flushCartData = (subreddit) => ({
  type: LOGIN_CONSTANTS.FLUSH_CART_DATA,
  subreddit,
  receivedAt: Date.now(),
});

export const clearForgotReducerData = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.RESET_FORGOT_PASSWORD_DATA,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const requestSalesrepData = (subreddit) => ({
  type: SALESREP_CONSTANTS.REQUEST_SALESREP_LOGIN,
  subreddit,
});

export const receiveSalesrepData = (subreddit, json) => ({
  type: SALESREP_CONSTANTS.RECEIVED_SALESREP_LOGIN,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const receiveSalesrepDataError = (subreddit, err, errCode) => ({
  type: SALESREP_CONSTANTS.RECEIVED_SALESREP_LOGIN_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchSalesRepLoginData = (data, subreddit) => (dispatch) => {
  return dispatch(
    dynamicActionWrapper({
      path: SALESREP_CONSTANTS.SALESREP_LOGIN_URL,
      method: "POST",
      body: data,
      initCb: requestSalesrepData,
      successCb: receiveSalesrepData,
      failureCb: receiveSalesrepDataError,
      subreddit,
      wrapperActionType: "FETCH_SALESREP_SEARCH_RESULT_WRAPPER",
      redirect: "follow",
    })
  );
};

export const postNewsletterSubscription = (data, subreddit) => (dispatch) => {
  const constants = _get(LOGIN_CONSTANTS, "NEWSLETTER_SUBSCRIPTION_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "POST_NEWSLETTER_SUBSCRIPTION_WRAPPER",
      redirect: "follow",
    })
  );
};

export const clearNewsletterSubscription = (subreddit) => ({
  type: LOGIN_CONSTANTS.NEWSLETTER_SUBSCRIPTION_DATA,
  subreddit,
  receivedAt: Date.now(),
});

export const requestUserLogout = (data, subreddit) => (dispatch) => {
  const constants = _get(LOGIN_CONSTANTS, "USER_LOGOUT_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "REQUEST_USER_LOGOUT_WRAPPER",
      redirect: "follow",
    })
  );
};

// update Premium flag enable/disable
export const updatePrimeValue = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.UPDATE_PRIME_ID,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const verifyEmailId = (data, subreddit) => (dispatch) => {
  const constants = _get(LOGIN_CONSTANTS, "ARTIST_EMAIL_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: `${_get(constants, "URL")}${data.email}`,
      method: "GET",
      // body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "REQUEST_ARTIST_EMAIL_WRAPPER",
      redirect: "follow",
    })
  );
};

export const requestHomePage = () => ({
  type: LOGIN_CONSTANTS.HOME_CONSTANTS.REQUEST,
});

export const recievedHomePage = (data) => ({
  type: LOGIN_CONSTANTS.HOME_CONSTANTS.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const recievedHomePageError = (err) => ({
  type: LOGIN_CONSTANTS.HOME_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchHomePage = () => {
  console.log("fafaf", LOGIN_CONSTANTS.HOME_CONSTANTS.URL);
  return (dispatch) => {
    dispatch(requestHomePage());
    axios
      .get(LOGIN_CONSTANTS.HOME_CONSTANTS.URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => dispatch(recievedHomePage(res.data)))
      .catch((err) => dispatch(recievedHomePageError(err)));
  };
};

export const requestNewHomePage = () => ({
  type: LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.REQUEST,
});

export const recievedNewHomePage = (data) => ({
  type: LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const recievedNewHomePageError = (err) => ({
  type: LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchNewHomePage = () => {
  console.log("fafaf", LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.URL);
  return (dispatch) => {
    dispatch(requestNewHomePage());
    axios
      .get(LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => dispatch(recievedNewHomePage(res.data)))
      .catch((err) => dispatch(recievedNewHomePageError(err)));
  };
};

export const requestCustomerToken = () => ({
  type: LOGIN_CONSTANTS.TOKEN_CONTANTS.REQUEST,
});

export const recievedCustomerToken = (data) => ({
  type: LOGIN_CONSTANTS.TOKEN_CONTANTS.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const recievedCustomerTokenError = (err) => ({
  type: LOGIN_CONSTANTS.TOKEN_CONTANTS.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchCustomerToken = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestCustomerToken());
    axios
      .post(LOGIN_CONSTANTS.TOKEN_CONTANTS.URL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(recievedCustomerToken(res.data)))
      .catch((err) => dispatch(recievedCustomerTokenError(err)));
  };
};

export const requestCustomerDetails = () => ({
  type: LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.REQUEST,
});

export const recievedCustomerDetailsPage = (data) => ({
  type: LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const recievedCustomerError = (err) => ({
  type: LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchCustomerDetails = (data) => {
  var token = data;
  console.log(token);
  console.log("fafaf", LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.URL);
  return (dispatch) => {
    dispatch(requestCustomerDetails());
    axios
      .get(LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => dispatch(recievedCustomerDetailsPage(res.data)))
      .catch((err) => dispatch(recievedCustomerError(err)));
  };
};

export const requestZipCode = () => ({
  type: LOGIN_CONSTANTS.CUSTOMER_ZIPCODE.REQUEST,
});

export const receiveZipCode = (data) => ({
  type: LOGIN_CONSTANTS.CUSTOMER_ZIPCODE.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const receiveZipCodeError = (err) => ({
  type: LOGIN_CONSTANTS.CUSTOMER_ZIPCODE.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchZipCode = (data) => {
  console.log(data);
  var url = LOGIN_CONSTANTS.CUSTOMER_ZIPCODE.URL + data;
  console.log(url);
  return (dispatch) => {
    dispatch(requestZipCode());
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveZipCode(res.data)))
      .catch((err) => dispatch(receiveZipCodeError(err)));
  };
};

export const setZipcodeData = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.SET_ZIPCODE,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const requestForgotPasswordData = () => ({
  type: LOGIN_CONSTANTS.REQUEST_FORGOT_PASSWORD_DATA,
});

export const receiveForgotPasswordData = (data) => ({
  type: LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_DATA,
  data,
  receivedAt: Date.now(),
});
export const receiveForgotPasswordError = (err) => ({
  type: LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_ERROR,
  errorCode: err,
});

export const fetchForgotPassword = (data) => {
  console.log(data);
  var url = LOGIN_CONSTANTS.FORGOT_PASSWORD_URL;
  console.log(url);
  return (dispatch) => {
    dispatch(requestForgotPasswordData());
    axios
      .put(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveForgotPasswordData(res.data)))
      .catch((err) => dispatch(receiveForgotPasswordError(err)));
  };
};

export const requestUpdateCustomer = () => ({
  type: LOGIN_CONSTANTS.UPDATE_CUSTOMER_DETAIL.REQUEST,
});

export const receiveUpdateCustomer = (data) => ({
  type: LOGIN_CONSTANTS.UPDATE_CUSTOMER_DETAIL.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const receiveUpdateCustomerError = (err) => ({
  type: LOGIN_CONSTANTS.UPDATE_CUSTOMER_DETAIL.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchUpdateCustomerDetails = (data, data1) => {
  console.log(data, data1);
  var url = LOGIN_CONSTANTS.UPDATE_CUSTOMER_DETAIL.URL + data;
  console.log(url);
  return (dispatch) => {
    dispatch(requestUpdateCustomer());
    axios
      .put(url, JSON.stringify(data1), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveUpdateCustomer(res.data)))
      .catch((err) => dispatch(receiveUpdateCustomerError(err)));
  };
};

export const setCatName = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.SET_CATNAME,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const setCatDesc = (data, subreddit) => ({
  type: LOGIN_CONSTANTS.SET_CATDESC,
  subreddit,
  data,
  receivedAt: Date.now(),
});

export const requestResetPasswordData = () => ({
  type: LOGIN_CONSTANTS.UPDATE_RESET_CUSTOMER_PASSWORD.REQUEST,
});

export const receiveResetPasswordData = (data) => ({
  type: LOGIN_CONSTANTS.UPDATE_RESET_CUSTOMER_PASSWORD.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const receiveResetPasswordError = (err) => ({
  type: LOGIN_CONSTANTS.UPDATE_RESET_CUSTOMER_PASSWORD.RECEIVED_ERROR,
  errorCode: err,
});

export const resetForgotPassword = (data) => {
  console.log(data);
  var url = LOGIN_CONSTANTS.UPDATE_RESET_CUSTOMER_PASSWORD.URL;
  console.log(url);
  return (dispatch) => {
    dispatch(requestResetPasswordData());
    axios
      .post(url, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveResetPasswordData(res.data)))
      .catch((err) => dispatch(receiveResetPasswordError(err)));
  };
};
