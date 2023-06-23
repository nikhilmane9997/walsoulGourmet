import _get from "lodash/get";
import axios from "axios";
import qs from "qs";
import * as PRODUCT_CONSTANTS from "../constants/products";
import dynamicActionWrapper, { generateFns } from "../utils/actionHelper";

export const recievedRelatedProducts = (data) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_RELATED_PRODUCT,
  data,
  receivedAt: Date.now(),
});
export const recievedRelatedProductsError = (err) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_RELATED_PRODUCT_ERROR,
  errorCode: err,
});

export const fetchRelatedProducts = (data) => {
  console.log(data);
  return (dispatch) => {
    axios
      .get(PRODUCT_CONSTANTS.RELATED_PRODUCTS_URL + data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(recievedRelatedProducts(res.data)))
      .catch((err) => dispatch(recievedRelatedProductsError(err)));
  };
};

export const recievedSlot = (data) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_SLOT,
  data,
  receivedAt: Date.now(),
});
export const recievedSlotError = (err) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_SLOT_ERROR,
  errorCode: err,
});

export const fetchSlot = (data) => {
  console.log(data);
  return (dispatch) => {
    axios
      .post(
        "https://uat.mediversal.tech/index.php/api/product/timeslots?" +
          qs.stringify(data)
      )
      .then((res) => dispatch(recievedSlot(res.data)))
      .catch((err) => dispatch(recievedSlotError(err)));
  };
};

export const requestProductDetails = () => ({
  type: PRODUCT_CONSTANTS.REQUEST_PRODUCT_DETAIL,
});

export const recievedProductDetails = (data) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL,
  data,
  receivedAt: Date.now(),
});
export const recievedProductDetailsError = (err) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL_ERROR,
  errorCode: err,
});

export const fetchProductDetails = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestProductDetails());
    axios
      .get(
        PRODUCT_CONSTANTS.PRODUCTS_DETAIL_URL +
          "?searchCriteria[filter_groups][0][filters][0][field]=sku&searchCriteria[filter_groups][0][filters][0][value]=" +
          data +
          "&searchCriteria[filter_groups][0][filters][0][condition_type]=eq",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
          },
        }
      )
      .then((res) => dispatch(recievedProductDetails(res.data)))
      .catch((err) => dispatch(recievedProductDetailsError(err)));
  };
};

/*export const requestProductDetails = subreddit => ({
    type: PRODUCT_CONSTANTS.REQUEST_PRODUCT_DETAIL,
    subreddit,
});

export const recievedProductDetails = (subreddit, json) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const recievedProductDetailsError = (subreddit, err, errCode) => ({
    type: PRODUCT_CONSTANTS.RECEIVED_PRODUCT_DETAIL_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchProductDetails = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: PRODUCT_CONSTANTS.PRODUCTS_DETAIL_URL,
        method: 'POST',
        body: data,
        initCb: requestProductDetails,
        successCb: recievedProductDetails,
        failureCb: recievedProductDetailsError,
        subreddit,
        wrapperActionType: 'FETCH_PRODUCT_DETAIL_WRAPPER',
        redirect: 'follow',
    }));
};
*/

//export const fetchRelatedProducts = (data, subreddit) => (dispatch) => {
//  return dispatch(dynamicActionWrapper({
//    path: PRODUCT_CONSTANTS.RELATED_PRODUCTS_URL,
//  method: 'POST',
//body: data,
// initCb: requestRelatedProducts,
//successCb: recievedRelatedProducts,
//failureCb: recievedRelatedProductsError,
//subreddit,
//wrapperActionType: 'FETCH_RELATED_PRODUCT_WRAPPER',
//redirect: 'follow',
//}));
//};

export const requestAddProductTags = (subreddit) => ({
  type: PRODUCT_CONSTANTS.REQUEST_ADD_PRODUCT_TAGS,
  subreddit,
});

export const recievedAddProductTags = (subreddit, json) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_ADD_PRODUCT_TAGS,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const recievedAddProductTagsError = (subreddit, err, errCode) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_ADD_PRODUCT_TAGS_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const postTags = (data, subreddit) => (dispatch) => {
  return dispatch(
    dynamicActionWrapper({
      path: PRODUCT_CONSTANTS.ADD_PRODUCT_TAGS_URL,
      method: "POST",
      body: data,
      initCb: requestAddProductTags,
      successCb: recievedAddProductTags,
      failureCb: recievedAddProductTagsError,
      subreddit,
      wrapperActionType: "ADD_PRODUCT_TAGS_WRAPPER",
      redirect: "follow",
    })
  );
};

export const fetchProductReviews = (data, subreddit) => (dispatch) => {
  const constants = _get(
    PRODUCT_CONSTANTS,
    "PRODUCT_REVIEWS_LIST_URL_CONSTANTS"
  );
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "PRODUCT_REVIEWS_LIST_WRAPPER",
      redirect: "follow",
    })
  );
};

export const fetchHoverProductReviews = (data, subreddit) => (dispatch) => {
  const constants = _get(
    PRODUCT_CONSTANTS,
    "HOVER_PRODUCT_REVIEWS_LIST_URL_CONSTANTS"
  );
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "PRODUCT_HOVER_REVIEWS_LIST_WRAPPER",
      redirect: "follow",
    })
  );
};

export const fetchProductTags = (data, subreddit) => (dispatch) => {
  const constants = _get(PRODUCT_CONSTANTS, "PRODUCT_TAGS_LIST_URL_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "PRODUCT_TAGS_LIST_WRAPPER",
      redirect: "follow",
    })
  );
};

export const fetchProductTagDetails = (data, subreddit) => (dispatch) => {
  const constants = _get(
    PRODUCT_CONSTANTS,
    "PRODUCT_TAG_DETAILS_URL_CONSTANTS"
  );
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "POST",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "PRODUCT_TAG_DETAILS_WRAPPER",
      redirect: "follow",
    })
  );
};

export const removeProductTagDetails = (data, subreddit) => (dispatch) => {
  const constants = _get(PRODUCT_CONSTANTS, "REMOVE_TAG_URL_CONSTANTS");
  return dispatch(
    dynamicActionWrapper({
      path: _get(constants, "URL"),
      method: "DELETE",
      body: data,
      initCb: _get(generateFns({ constants }), "request"),
      successCb: _get(generateFns({ constants }), "recieved"),
      failureCb: _get(generateFns({ constants }), "recievedErr"),
      subreddit,
      wrapperActionType: "REMOVE_TAG_WRAPPER",
      redirect: "follow",
    })
  );
};

/*export const fetchUpsellingProducts = (data, subreddit) => (dispatch) => {
    const constants = _get(PRODUCT_CONSTANTS, 'UPSELL_PRODUCTS_URL_CONSTANTS');
    return dispatch(dynamicActionWrapper({
        path: _get(constants, 'URL'),
        method: 'POST',
        body: data,
        initCb: _get(generateFns({ constants }), 'request'),
        successCb: _get(generateFns({ constants }), 'recieved'),
        failureCb: _get(generateFns({ constants }), 'recievedErr'),
        subreddit,
        wrapperActionType: 'FETCH_UPSELL_PRODUCTS_WRAPPER',
        redirect: 'follow',
    }));
};*/

export const recievedUpsellDetails = (data) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_UPSELL_PRODUCTS,
  data,
  receivedAt: Date.now(),
});
export const recievedUpsellDetailsError = (err) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_UPSELL_PRODUCTS_ERROR,
  errorCode: err,
});

export const fetchUpsellingProducts = (data) => {
  console.log("UpsellProduct" + data);
  return (dispatch) => {
    axios
      .get(PRODUCT_CONSTANTS.UPSELL_PRODUCTS_URL + data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(recievedUpsellDetails(res.data)))
      .catch((err) => dispatch(recievedUpsellDetailsError(err)));
  };
};

export const recievedProductListingDetails = (data) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_LISTING_DATA,
  data,
  receivedAt: Date.now(),
});
export const recievedProductListingError = (err) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_LISTING_DATA_ERROR,
  errorCode: err,
});

export const fetchProductListingData = (data) => {
  console.log("######", data);
  return (dispatch) => {
    axios
      .post(
        "https://uat.mediversal.tech/index.php/api/product/List",
        qs.stringify(data)
      )
      .then((res) =>
        dispatch(recievedProductListingDetails(res.data), console.log(res))
      )
      .catch((err) => dispatch(recievedProductListingError(err)));
  };
};

export const requestProductReviews = () => ({
  type: PRODUCT_CONSTANTS.REQUEST_POST_PRODUCT_REVIEW,
});

export const recievedPostSuccess = (data) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_POST_PRODUCT_REVIEW_SUCCESS,
  data,
  receivedAt: Date.now(),
});
export const recievedPostError = (err) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_POST_PRODUCT_REVIEW_ERROR,
  errorCode: err,
});

export const postReviews = (data, data1) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestProductReviews());
    axios
      .post(PRODUCT_CONSTANTS.PRODUCTS_REVIEW_URL, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(recievedPostSuccess(res.data)))
      .catch((err) => dispatch(recievedPostError(err)));
  };
};

export const requestProductDates = () => ({
  type: PRODUCT_CONSTANTS.GET_PRODUCT_DATES.REQUEST,
});

export const recievedProductDates = (data) => ({
  type: PRODUCT_CONSTANTS.GET_PRODUCT_DATES.RECEIVED,
  data,
  receivedAt: Date.now(),
});
export const recievedProductDatesError = (err) => ({
  type: PRODUCT_CONSTANTS.GET_PRODUCT_DATES.RECEIVED_ERROR,
  errorCode: err,
});

export const fetchProductDates = (data, data1) => {
  console.log(data, data1);
  var url =
    PRODUCT_CONSTANTS.GET_PRODUCT_DATES.URL + data + "?zip_code=" + data1;
  console.log(url);
  return (dispatch) => {
    dispatch(requestProductDates());
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
        },
      })
      .then((res) => dispatch(recievedProductDates(res.data)))
      .catch((err) => dispatch(recievedProductDatesError(err)));
  };
};

export const requestReviewDetails = () => ({
  type: PRODUCT_CONSTANTS.REQUEST_PRODUCTS_REVIEW_DATA,
});

export const recievedReviewDetails = (data) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_REVIEW_DATA,
  data,
  receivedAt: Date.now(),
});
export const recievedReviewDetailsError = (err) => ({
  type: PRODUCT_CONSTANTS.RECEIVED_PRODUCTS_REVIEW_DATA_ERROR,
  errorCode: err,
});

export const fetchReviewData = (data) => {
  console.log(data);
  return (dispatch) => {
    dispatch(requestReviewDetails());
    axios
      .get(
        PRODUCT_CONSTANTS.PRODUCTS_REVIEW_DATA_URL +
          "?searchCriteria[filter_groups][0][filters][0][field]=entity_pk_value&searchCriteria[filter_groups][0][filters][0][value]=" +
          data +
          "&searchCriteria[filter_groups][0][filters][0][condition_type]=eq",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer wd13s50dpgkgpqypko4v64om79v4pjfe",
          },
        }
      )
      .then((res) => dispatch(recievedReviewDetails(res.data)))
      .catch((err) => dispatch(recievedReviewDetailsError(err)));
  };
};
