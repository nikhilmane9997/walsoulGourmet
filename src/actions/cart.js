import _get from "lodash/get";
import axios from "axios";
import * as CART_CONSTANTS from "../constants/cart";
import dynamicActionWrapper, { generateFns } from "../utils/actionHelper";

export const requestFirstCartData = (subreddit) => ({
  type: CART_CONSTANTS.REQUEST_FIRST_CART_SEARCH,
  subreddit,
});

export const receiveFirstCartData = (subreddit, json) => ({
  type: CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const receiveFirstCartDataError = (subreddit, err, errCode) => ({
  type: CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchFirstCartData = (data, subreddit) => (dispatch) => {
  return dispatch(
    dynamicActionWrapper({
      path: CART_CONSTANTS.FIRST_CART_URL,
      method: "POST",
      body: data,
      initCb: requestFirstCartData,
      successCb: receiveFirstCartData,
      failureCb: receiveFirstCartDataError,
      subreddit,
      wrapperActionType: "FETCH_FIRST_CART_SEARCH_RESULT_WRAPPER",
      redirect: "follow",
    })
  );
};

export const fetchMoveToWishlistData =
  (data, type, subreddit) => (dispatch) => {
    const constants = _get(CART_CONSTANTS, "MOVE_TO_WISHLIST_CONSTANTS");
    return dispatch(
      dynamicActionWrapper({
        path: _get(constants, "URL"),
        method: "POST",
        body: data,
        initCb: _get(generateFns({ constants }), "request"),
        successCb: _get(generateFns({ constants }), "recieved"),
        failureCb: _get(generateFns({ constants }), "recievedErr"),
        subreddit,
        wrapperActionType: "MOVE_TO_WISHLIST_WRAPPER",
        redirect: "follow",
      })
    );
  };

export const fetchRemoveExpiredProductData =
  (data, type, subreddit) => (dispatch) => {
    const constants = _get(CART_CONSTANTS, "REMOVE_EXPIRED_PRODUCTS_CONSTANTS");
    return dispatch(
      dynamicActionWrapper({
        path: _get(constants, "URL"),
        method: "DELETE",
        body: data,
        initCb: _get(generateFns({ constants }), "request"),
        successCb: _get(generateFns({ constants }), "recieved"),
        failureCb: _get(generateFns({ constants }), "recievedErr"),
        subreddit,
        wrapperActionType: "REMOVE_EXPIRED_PRODUCTS_WRAPPER",
        redirect: "follow",
      })
    );
  };

export const clearCartReducer = (subreddit) => ({
  type: CART_CONSTANTS.CLEAR_CART_DATA,
  subreddit,
});

export const setCartTypeData = (data, subreddit) => ({
  type: CART_CONSTANTS.SET_CART_TYPE,
  subreddit,
  data,
  receivedAt: Date.now(),
});

// Bulk Add to cart action
export const bulkAddToCartData = (data, subreddit) => (dispatch) => {
  const constants = _get(CART_CONSTANTS, "BULK_ADD_TO_CART_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "FETCH_BULK_ADD_TO_CART_WRAPPER",
      redirect: "follow",
    })
  );
};

export const flushCartViewData = (subreddit) => ({
  type: CART_CONSTANTS.FLUSH_CART_VIEW_DATA,
  subreddit,
  receivedAt: Date.now(),
});

// Clear cart action
export const clearCartData = (data, subreddit) => (dispatch) => {
  const constants = _get(CART_CONSTANTS, "CLEAR_CART_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "DELETE",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "FETCH_CLEAR_CART_WRAPPER",
      redirect: "follow",
    })
  );
};

export const requestCartItemsByCustomerDetails = () => ({
  type: CART_CONSTANTS.REQUEST_CART_ITEMS_BY_CUSTOMER,
});

export const recievedCartItemsByCustomerDetails = (data) => ({
  type: CART_CONSTANTS.RECEIVED_CART_ITEMS_BY_CUSTOMER,
  data,
  receivedAt: Date.now(),
});
export const recievedCartItemsByCustomerDetailsError = (err) => ({
  type: CART_CONSTANTS.RECEIVED_CART_ITEMS_BY_CUSTOMER_ERROR,
  errorCode: err,
});

export const fetchCartItemsByCustomer = (data) => {
  console.log(data);
  var token = data;
  return (dispatch) => {
    dispatch(requestCartItemsByCustomerDetails());
    axios
      .get(CART_CONSTANTS.CART_ITEMS_BY_CUSTOMER, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => dispatch(recievedCartItemsByCustomerDetails(res.data)))
      .catch((err) => dispatch(recievedCartItemsByCustomerDetailsError(err)));
  };
};

export const requestQuoteIdDetails = () => ({
  type: CART_CONSTANTS.REQUEST_QUOTE,
});

export const recievedQuoteIdDetails = (data) => ({
  type: CART_CONSTANTS.RECEIVED_QUOTE,
  data,
  receivedAt: Date.now(),
});
export const recievedQuoteIdError = (err) => ({
  type: CART_CONSTANTS.RECEIVED_QUOTE_ERROR,
  errorCode: err,
});

export const fetchQuoteId = (data) => {
  console.log(data);
  var token = data;
  var bTok = "Bearer " + data;
  console.log(bTok);
  return (dispatch) => {
    dispatch(requestQuoteIdDetails());
    axios
      .post(CART_CONSTANTS.QUOTE_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: bTok,
        },
      })
      .then((res) => dispatch(recievedQuoteIdDetails(res.data)))
      .catch((err) => dispatch(recievedQuoteIdError(err)));
  };
};

export const requestAddToCart = () => ({
  type: CART_CONSTANTS.REQUEST_ADD_TO_CART,
});

export const receiveAddToCart = (data) => ({
  type: CART_CONSTANTS.RECEIVED_ADD_TO_CART,
  data,
  receivedAt: Date.now(),
});
export const receiveAddToCartError = (err) => ({
  type: CART_CONSTANTS.RECEIVED_ADD_TO_CART_ERROR,
  errorCode: err,
});

export const postAddToCartData = (data, data1) => {
  console.log(data);
  console.log(data1);
  var token = data1;
  return (dispatch) => {
    dispatch(requestAddToCart());
    axios
      .post(CART_CONSTANTS.ADD_TO_CART_URL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => dispatch(receiveAddToCart(res.data)))
      .catch((err) => dispatch(receiveAddToCartError(err)));
  };
};

export const updateCartValue = (data) => ({
  type: CART_CONSTANTS.RECEIVED_CART_DATA,
  data,
  receivedAt: Date.now(),
});

export const requestRequestRemoveToCart = () => ({
  type: CART_CONSTANTS.REMOVE_FROM_CART_URL_CONSTANTS.REQUEST,
});

export const receiveRemoveToCart = (data) => ({
  type: CART_CONSTANTS.REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const receiveRemoveToCartError = (err) => ({
  type: CART_CONSTANTS.REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchRemoveFromCartData = (data, data1) => {
  console.log(data, data1);
  var token = data1;
  var url = CART_CONSTANTS.REMOVE_FROM_CART_URL_CONSTANTS.URL + data;
  console.log(url);
  return (dispatch) => {
    dispatch(requestRequestRemoveToCart());
    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => dispatch(receiveRemoveToCart(res.data)))
      .catch((err) => dispatch(receiveRemoveToCartError(err)));
  };
};

export const requestUpdateToCart = () => ({
  type: CART_CONSTANTS.UPDATE_CART_URL_CONSTANTS.REQUEST,
});

export const receiveUpdateToCart = (data) => ({
  type: CART_CONSTANTS.UPDATE_CART_URL_CONSTANTS.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const receiveUpdateToCartError = (err) => ({
  type: CART_CONSTANTS.UPDATE_CART_URL_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchUpdateCartData = (data, data1, data2) => {
  console.log(data);
  console.log(data2);
  var token = data1;
  return (dispatch) => {
    dispatch(requestUpdateToCart());
    axios
      .put(
        CART_CONSTANTS.UPDATE_CART_URL_CONSTANTS.URL + data2,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => dispatch(receiveUpdateToCart(res.data)))
      .catch((err) => dispatch(receiveUpdateToCartError(err)));
  };
};

export const requestGrandTotal = () => ({
  type: CART_CONSTANTS.SETTING_BILLING_AND_SHIPPING.REQUEST,
});

export const receiveGrandTotal = (data) => ({
  type: CART_CONSTANTS.SETTING_BILLING_AND_SHIPPING.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const receiveGrandTotalError = (err) => ({
  type: CART_CONSTANTS.SETTING_BILLING_AND_SHIPPING.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchGrandTotal = (data, data1) => {
  console.log(data);
  console.log(data1);
  var url =
    CART_CONSTANTS.SETTING_BILLING_AND_SHIPPING.URL +
    data +
    "/shipping-information";
  return (dispatch) => {
    dispatch(requestGrandTotal());
    axios
      .post(url, JSON.stringify(data1), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveGrandTotal(res.data)))
      .catch((err) => dispatch(receiveGrandTotalError(err)));
  };
};

export const requestCancelDiscountCouponData = () => ({
  type: CART_CONSTANTS.REQUEST_CANCEL_DISCOUNT_COUPON_SEARCH,
});

export const receiveCancelDiscountCouponData = (data) => ({
  type: CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH,
  data,
  receivedAt: Date.now(),
});
export const receiveCancelDiscountCouponDataError = (err) => ({
  type: CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH_ERROR,
  errorCode: err,
});

export const fetchCancelDiscountCouponData = (data) => {
  console.log(data);
  var url = CART_CONSTANTS.CANCEL_DISCOUNT_COUPON_URL;
  return (dispatch) => {
    dispatch(requestCancelDiscountCouponData());
    axios
      .delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data,
        },
      })
      .then((res) => dispatch(receiveCancelDiscountCouponData(res.data)))
      .catch((err) => dispatch(receiveCancelDiscountCouponDataError(err)));
  };
};

export const requestFilter = () => ({
  type: CART_CONSTANTS.REQUEST_FILTER,
});

export const receiveFilter = (data) => ({
  type: CART_CONSTANTS.RECEIVED_FILTER,
  data,
  receivedAt: Date.now(),
});
export const receiveFilterError = (err) => ({
  type: CART_CONSTANTS.RECEIVED_FILTER_ERROR,
  errorCode: err,
});

export const fetchFilterData = (data) => {
  console.log(data);
  var url = CART_CONSTANTS.FILTER_URL + data;
  console.log(url);
  return (dispatch) => {
    dispatch(requestFilter());
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveFilter(res.data)))
      .catch((err) => dispatch(receiveFilterError(err)));
  };
};

export const requestDiscountCouponData = () => ({
  type: CART_CONSTANTS.REQUEST_DISCOUNT_COUPON_SEARCH,
});

export const receiveDiscountCouponData = (data) => ({
  type: CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH,
  data,
  receivedAt: Date.now(),
});
export const receiveDiscountCouponDataError = (err) => ({
  type: CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH_ERROR,
  errorCode: err,
});

export const fetchDiscountCouponData = (data, data1) => {
  console.log(data);
  console.log(data1);
  var url = CART_CONSTANTS.DISCOUNT_COUPON_URL + data1;
  console.log(url);
  // var dd='https://m2.arabellabouquets.com/rest/arabella/V1/cart/coupon/PH7DB0WOGHOW9PSC';
  return (dispatch) => {
    dispatch(requestDiscountCouponData());
    axios
      .put(url, "", {
        headers: {
          Authorization: "Bearer " + data,
        },
      })
      .then((res) => dispatch(receiveDiscountCouponData(res.data)))
      .catch((err) => dispatch(receiveDiscountCouponDataError(err)));
  };
};

export const requestGetCartData = () => ({
  type: CART_CONSTANTS.GET_CART_REQUEST,
});

export const receiveGetCartData = (data) => ({
  type: CART_CONSTANTS.GET_CART_RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const receiveGetCartDataError = (err) => ({
  type: CART_CONSTANTS.GET_CART_ERROR,
  errorCode: err,
});

export const fetchGetCartData = (data) => {
  console.log(data);
  var url = CART_CONSTANTS.GET_CART_URL;
  console.log(url);
  return (dispatch) => {
    dispatch(requestGetCartData());
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data,
        },
      })
      .then((res) => dispatch(receiveGetCartData(res.data)))
      .catch((err) => dispatch(receiveGetCartDataError(err)));
  };
};

export const requestGuestAddToCart = (data) => ({
  type: CART_CONSTANTS.GUEST_REQUEST_ADD_TO_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestAddToCart = (data) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_ADD_TO_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestAddToCartError = (err) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_ADD_TO_CART_ERROR,
  errorCode: err,
});

export const postGuestAddToCartData = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestGuestAddToCart());
    axios
      .post(CART_CONSTANTS.GUEST_ADD_TO_CART_URL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveGuestAddToCart(res.data)))
      .catch((err) => dispatch(receiveGuestAddToCartError(err)));
  };
};

export const requestGuestUpdateToCart = (data) => ({
  type: CART_CONSTANTS.GUEST_REQUEST_EDIT_TO_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestUpdateToCart = (data) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_EDIT_TO_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestUpdateToCartError = (err) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_EDIT_TO_CART_ERROR,
  errorCode: err,
});

export const updateGuestCartData = (data, data1) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestGuestUpdateToCart());
    axios
      .put(
        CART_CONSTANTS.GUEST_EDIT_TO_CART_URL + data1,
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
          },
        }
      )
      .then((res) => dispatch(receiveGuestUpdateToCart(res.data)))
      .catch((err) => dispatch(receiveGuestUpdateToCartError(err)));
  };
};

export const requestGuestDeleteToCart = (data) => ({
  type: CART_CONSTANTS.GUEST_REQUEST_DELETE_TO_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestDeleteToCart = (data) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_DELETE_TO_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestDeleteToCartError = (err) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_DELETE_TO_CART_ERROR,
  errorCode: err,
});

export const deleteGuestCartData = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestGuestDeleteToCart());
    axios
      .delete(CART_CONSTANTS.GUEST_DELETE_TO_CART_URL + data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveGuestDeleteToCart(res.data)))
      .catch((err) => dispatch(receiveGuestDeleteToCartError(err)));
  };
};

export const requestGuestCartList = (data) => ({
  type: CART_CONSTANTS.GUEST_REQUEST_CART_LIST_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestCartList = (data) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_CART_LIST_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestCartListError = (err) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_CART_LIST_ERROR,
  errorCode: err,
});

export const getGuestCartList = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestGuestCartList());
    axios
      .get(CART_CONSTANTS.GUEST_CART_LIST_URL + data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveGuestCartList(res.data)))
      .catch((err) => dispatch(receiveGuestCartListError(err)));
  };
};

export const requestGuestConvertCartList = (data) => ({
  type: CART_CONSTANTS.GUEST_REQUEST_CONVERT_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestConvertCartList = (data) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_CONVERT_CART,
  data,
  receivedAt: Date.now(),
});

export const receiveGuestConvertCartError = (err) => ({
  type: CART_CONSTANTS.GUEST_RECEIVED_CONVERT_ERROR,
  errorCode: err,
});

export const getGuestConvertCartList = (data, data1) => {
  console.log(data, data1);
  return (dispatch) => {
    dispatch(requestGuestConvertCartList());
    axios
      .post(CART_CONSTANTS.GUEST_CONVERT_URL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + data1,
        },
      })
      .then((res) => dispatch(receiveGuestConvertCartList(res.data)))
      .catch((err) => dispatch(receiveGuestConvertCartError(err)));
  };
};

export const removeCartValue = (data) => ({
  type: CART_CONSTANTS.REMOVE_CART_VALUE_DATA,
  data,
  receivedAt: Date.now(),
});

export const requestGiftMessage = (data) => ({
  type: CART_CONSTANTS.REQUEST_GIFT_MESSAGE,
  data,
  receivedAt: Date.now(),
});

export const receiveGiftMessage = (data) => ({
  type: CART_CONSTANTS.RECEIVED_GIFT_MESSAGE,
  data,
  receivedAt: Date.now(),
});

export const receiveGiftMessageError = (err) => ({
  type: CART_CONSTANTS.RECEIVED_GIFT_MESSAGE_ERROR,
  errorCode: err,
});

export const getGiftMessage = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestGiftMessage());
    axios
      .post(CART_CONSTANTS.GIFT_MESSAGE, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(receiveGiftMessage(res.data)))
      .catch((err) => dispatch(receiveGiftMessageError(err)));
  };
};
