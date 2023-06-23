
import * as REGISTER_CONSTANTS from '../constants/register';
import dynamicActionWrapper from '../utils/actionHelper';
import axios from 'axios';
import qs from 'qs';

export const clearRegisterData = subreddit => ({
  type: REGISTER_CONSTANTS.CLEAR_REGISTER_DATA,
  subreddit,
});


export const requestRegisterDetails = () => ({
    type: REGISTER_CONSTANTS.REQUEST_REGISTER_SEARCH,
  });
  

export const recievedRegisterDetails = data => ({
    type: REGISTER_CONSTANTS.RECEIVED_REGISTER_SEARCH,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedRegisterError = (err) => ({
    type: REGISTER_CONSTANTS.RECEIVED_REGISTER_SEARCH_ERROR,
    errorCode: err.response,
  })

export const fetchCustomerRegisterData = (data) => {
    console.log(JSON.stringify(data));      
    console.log(qs.stringify(data)); 
  return dispatch => {
      dispatch(requestRegisterDetails());
    axios.post(REGISTER_CONSTANTS.REGISTER_URL,JSON.stringify(data),
    {  
        headers: 
        {
            'Content-Type': 'application/json',
           'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
    
    } })
      .then(res => dispatch(recievedRegisterDetails(res.data)))
      .catch(err => dispatch(recievedRegisterError(err)))
  }
}


export const requestStateListData = () => ({
    type:  REGISTER_CONSTANTS.REQUEST_STATE_LIST_SEARCH,
  });
  

export const receiveStateListData = data => ({
    type:  REGISTER_CONSTANTS.RECEIVED_STATE_LIST_SEARCH,
     data,
     receivedAt: Date.now(),
  })  
  export const receiveStateListDataError = (err) => ({
    type: REGISTER_CONSTANTS.RECEIVED_STATE_LIST_SEARCH_ERROR,
    errorCode: err,
  })

export const fetchStateListData = () => {
  console.log('state');
  return dispatch => {
      dispatch(requestStateListData());
    axios.get(REGISTER_CONSTANTS.STATE_LIST_URL,
    {  
        headers: 
        {
            'Content-Type': 'application/json',
           'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
    
    } })
      .then(res => dispatch(receiveStateListData(res.data)))
      .catch(err => dispatch(receiveStateListDataError(err)))
  }
}


export const requestTrackUrlData = subreddit => ({
    type: REGISTER_CONSTANTS.REQUEST_TRACK_URL,
    subreddit,
});

export const receiveTrackUrlData = (subreddit, json) => ({
    type: REGISTER_CONSTANTS.RECEIVED_TRACK_URL,
    subreddit,
    data: json,
    receivedAt: Date.now(),
});

const receiveTrackUrlDataError = (subreddit, err, errCode) => ({
    type: REGISTER_CONSTANTS.RECEIVED_TRACK_URL_ERROR,
    subreddit,
    error: err,
    errorCode: errCode,
});

export const fetchTrackUrlData = (data, subreddit) => (dispatch) => {
    return dispatch(dynamicActionWrapper({
        path: REGISTER_CONSTANTS.TRACK_URL,
        method: 'POST',
        body: data,
        initCb: requestTrackUrlData,
        successCb: receiveTrackUrlData,
        failureCb: receiveTrackUrlDataError,
        subreddit,
        wrapperActionType: 'FETCH_TRACK_URL_WRAPPER',
        redirect: 'follow',
    }));
};


export const requestBillingStateListData = () => ({
  type:  REGISTER_CONSTANTS.REQUEST_BILLING_STATE_LIST_SEARCH,
});


export const receiveBillingStateListData = data => ({
  type:  REGISTER_CONSTANTS.RECEIVED_BILLING_STATE_LIST_SEARCH,
   data,
   receivedAt: Date.now(),
})  
export const receiveBillingStateListDataError = (err) => ({
  type: REGISTER_CONSTANTS.RECEIVED_BILLING_STATE_LIST_SEARCH_ERROR,
  errorCode: err,
})

export const fetchBillingStateListData = (data) => {
console.log('state',data);
var url=REGISTER_CONSTANTS.BILLING_STATE_LIST_URL+data;
console.log(url);
return dispatch => {
    dispatch(requestBillingStateListData());
  axios.get(url,
  {  
      headers: 
      {
          'Content-Type': 'application/json',
         'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
  
  } })
    .then(res => dispatch(receiveBillingStateListData(res.data)))
    .catch(err => dispatch(receiveBillingStateListDataError(err)))
}
}
