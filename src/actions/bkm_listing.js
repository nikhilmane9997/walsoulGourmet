import _get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';
import * as BKM_CONSTANTS from '../constants/bkmList';
import dynsamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const requestBkmListSearchData = subreddit => ({
  type: BKM_CONSTANTS.REQUEST_BKM_LIST_SEARCH,
  subreddit,
});

export const receiveBkmListSearchData = (subreddit, json) => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_LIST_SEARCH,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const receiveBkmListSearchDataError = (subreddit, err, errCode) => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_LIST_SEARCH_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchBKMListingData = (data, subreddit) => (dispatch) => {
  return dispatch(dynamicActionWrapper({
    path: BKM_CONSTANTS.PRODUCTS_DATA_URL,
    method: 'POST',
    body: data,
    initCb: requestBkmListSearchData,
    successCb: receiveBkmListSearchData,
    failureCb: receiveBkmListSearchDataError,
    subreddit,
    wrapperActionType: 'FETCH_BKM_LIST_SEARCH_RESULT_WRAPPER',
    redirect: 'follow',
  }));
};

export const requestBkmCartData = subreddit => ({
  type: BKM_CONSTANTS.REQUEST_CART_LIST_SEARCH,
  subreddit,
});

export const receiveBkmCartData = (subreddit, json) => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_CART_SEARCH,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const receiveBkmCartDataError = (subreddit, err, errCode) => ({
  type: BKM_CONSTANTS.RECEIVED_BKM_CART_SEARCH_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchCartData = (data, subreddit) => (dispatch) => {
  return dispatch(dynamicActionWrapper({
    path: BKM_CONSTANTS.CART_URL,
    method: 'POST',
    body: data,
    initCb: requestBkmCartData,
    successCb: receiveBkmCartData,
    failureCb: receiveBkmCartDataError,
    subreddit,
    wrapperActionType: 'FETCH_BKM_CART_SEARCH_RESULT_WRAPPER',
    redirect: 'follow',
  }),
  );
};

export const requestFilterCategoryData = subreddit => ({
  type: BKM_CONSTANTS.REQUEST_FILTER_CATEGORY_DATA,
  subreddit,
});

export const receiveFilterCategoryData = (subreddit, json) => ({
  type: BKM_CONSTANTS.RECEIVED_FILTER_CATEGORY_DATA,
  subreddit,
  data: json,
  receivedAt: Date.now(),
});

const receiveFilterCategoryDataError = (subreddit, err, errCode) => ({
  type: BKM_CONSTANTS.RECEIVED_FILTER_CATEGORY_DATA_ERROR,
  subreddit,
  error: err,
  errorCode: errCode,
});

export const fetchFilterCategoryData = (data, subreddit) => (dispatch) => {
  return dispatch(dynamicActionWrapper({
    path: BKM_CONSTANTS.CATEGORY_DATA_URL,
    method: 'POST',
    body: data,
    initCb: requestFilterCategoryData,
    successCb: receiveFilterCategoryData,
    failureCb: receiveFilterCategoryDataError,
    subreddit,
    wrapperActionType: 'FETCH_FILTER_CATEGORY_WRAPPER',
    redirect: 'follow',
  }));
};


/* FOR HEADER FINAL RESULT SEARCH DATA */
export const requestHeaderFinalResultData = (text, subreddit) => {
  // const constants = _get(BKM_CONSTANTS, 'HEADER_CATEGORIES_FINALRESULT_CONSTANTS');
  return ({
    type: 'REQUEST_CATEGORY_FINALRESULT_RESULT',
    // type: _get(generateFns({ constants }), 'request'),
    subreddit,
    text,
    receivedAt: Date.now(),
  });
};
export const fetchCategoriesfinalSearchResult = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HEADER_CATEGORIES_FINALRESULT_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HEADER_CATEGORIES_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE FRESH DEALS PRODUCTS
export const fetchHomePageFreshDealsProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_FRESH_DEALS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_FRESH_DEALS_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE BEST SELLER PRODUCTS
export const fetchHomePageBestSellerProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_BEST_SELLER_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_BEST_SELLER_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

export const fetchHomePageNewArrivalsProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_NEW_ARRIVALS_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE NEW ARRIVALS SECOND PAGE PRODUCTS
export const fetchHomePageNewArrivalsSPProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_NEW_ARRIVALS_SP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_SP_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE FRESH DEALS SECOND PAGE PRODUCTS
export const fetchHomePageFreshDealsSPProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_FRESH_DEALS_SP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_SP_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR HOME PAGE BEST SELLER SECOND PAGE PRODUCTS
export const fetchHomePageBestSellerSPProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'HOMEPAGE_BEST_SELLER_SP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    // initCb: requestHeaderFinalResultData,
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'HOMEPAGE_NEW_ARRIVALS_SP_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};

// FOR Premium PAGE PRODUCTS
export const fetchPrimePageProducts = (data, subreddit) => (dispatch) => {
  const constants = _get(BKM_CONSTANTS, 'PRIME_MEMBERSHIP_CONSTANTS');
  return dispatch(dynamicActionWrapper({
    path: _get(constants, 'URL'),
    method: 'POST',
    body: data,
    initCb: _get(generateFns({ constants }), 'request'),
    successCb: _get(generateFns({ constants }), 'recieved'),
    failureCb: _get(generateFns({ constants }), 'recievedErr'),
    subreddit,
    wrapperActionType: 'PRIME_MEMBERSHIP_CONSTANTS_FINALRESULT_WRAPPER',
    redirect: 'follow',
  }));
};
export const requestProductListingDetails = () => ({
  type: BKM_CONSTANTS.PRODUCTS_LISTING_DATA.REQUEST,
});


export const recievedProductListingData = data => ({
  type: BKM_CONSTANTS.PRODUCTS_LISTING_DATA.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedProductListingError = (err) => ({
  type: BKM_CONSTANTS.PRODUCTS_LISTING_DATA.RECEIVED_ERROR,
  errorCode: err,
}) 

export const fetchProductListing = (data,data1) => {
  console.log(data);
  console.log(data1);
  //var url=BKM_CONSTANTS.PRODUCTS_LISTING_DATA.URL+qs.stringify(data);
  if(data1 === undefined)
  {
  var url=BKM_CONSTANTS.PRODUCTS_LISTING_DATA.URL+ "searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]="+data+"&searchCriteria[filterGroups][0][filters][0][condition_type]=eq";
  }
  else{
    var url=BKM_CONSTANTS.PRODUCTS_LISTING_DATA.URL+ "searchCriteria[filterGroups][0][filters][0][field]=category_id&searchCriteria[filterGroups][0][filters][0][value]="+data+"&searchCriteria[filterGroups][0][filters][0][condition_type]=eq&"+data1.join('&');
  }
  console.log(url);
return dispatch => {
  dispatch(requestProductListingDetails());
  axios.get(url,
  {  
      headers: 
      {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
  
  } })
    .then(res => dispatch(recievedProductListingData(res.data)))
    .catch(err => dispatch(recievedProductListingError(err)))
}
}

/* FOR HEADER SUGGETION SEARCH DATA */
export const requestCategoriesAutoCompleteResult = () => ({
  type: BKM_CONSTANTS.HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS.REQUEST,
});


export const recievedCategoriesAutoCompleteResult = data => ({
  type: BKM_CONSTANTS.HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedCategoriesAutoCompleteResultError = (err) => ({
  type: BKM_CONSTANTS.HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
}) 

export const fetchCategoriesAutoCompleteResult = (data) => {
  console.log(data);
  var input=data;
  var url =
    BKM_CONSTANTS.HEADER_CATEGORIES_AUTOCOMPLETE_CONSTANTS.URL +
    "?searchCriteria[requestName]=quick_search_container&searchCriteria[filter_groups][0][filters][0][field]=search_term&searchCriteria[filter_groups][0][filters][0][value]=" +
    data;
 console.log(url);
return dispatch => {
  dispatch(requestCategoriesAutoCompleteResult());
  axios.get(url,
  {  
      headers: 
      {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
  
  } })
    .then(res => dispatch(recievedCategoriesAutoCompleteResult(res.data)))
    .catch(err => dispatch(recievedCategoriesAutoCompleteResultError(err)))
}
}






export const requestAllHeaderSearch = () => ({
  type: BKM_CONSTANTS.HEADER_SEARCH_NEW_SEARCH.REQUEST,
});


export const recievedAllHeaderSearch = data => ({
  type: BKM_CONSTANTS.HEADER_SEARCH_NEW_SEARCH.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedAllHeaderSearchError = (err) => ({
  type: BKM_CONSTANTS.HEADER_SEARCH_NEW_SEARCH.RECEIVED_ERROR,
  errorCode: err,
}) 

export const fetchAllHeaderSearch = (data) => {
  console.log(data);
  var input=data;
  var url =
    BKM_CONSTANTS.HEADER_SEARCH_NEW_SEARCH.URL +
    "?searchCriteria[requestName]=quick_search_container&searchCriteria[filter_groups][0][filters][0][field]=search_term&searchCriteria[filter_groups][0][filters][0][value]="+data+"&searchCriteria[currentPage]=1&searchCriteria[pageSize]=9&fields=items[id,name,sku,price]";
 console.log(url);
return dispatch => {
  dispatch(requestAllHeaderSearch());
  axios.get(url,
  {  
      headers:  
      {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
  
  } })
    .then(res => dispatch(recievedAllHeaderSearch(res.data)))
    .catch(err => dispatch(recievedAllHeaderSearchError(err)))
}
}

// listing image

export const requestListingBanner = () => ({
  type: BKM_CONSTANTS.LISTING_BANNER.REQUEST,
});


export const recievedListingBanner = data => ({
  type: BKM_CONSTANTS.LISTING_BANNER.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedListingBannerError = (err) => ({
  type: BKM_CONSTANTS.LISTING_BANNER.RECEIVED_ERROR,
  errorCode: err,
}) 

export const fetchListingBanner = (data) => {
  console.log(data);
  var url =
    BKM_CONSTANTS.LISTING_BANNER.URL + data;
 console.log(url);
return dispatch => {
  dispatch(requestListingBanner());
  axios.get(url,
  {  
      headers:  
      {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
  
  } })
    .then(res => dispatch(recievedListingBanner(res.data)))
    .catch(err => dispatch(recievedListingBannerError(err)))
}
}

