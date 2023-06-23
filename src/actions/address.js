import _get from 'lodash/get';
import axios from 'axios';
import qs from 'qs';
import * as ADDRESS_CONSTANTS from '../constants/address';
// import * as ALL_ADDRESS_CONSTANTS from '../constants/address';
import dynamicActionWrapper, { generateFns } from '../utils/actionHelper';

export const requestAllAddressDetails = () => ({
    type: ADDRESS_CONSTANTS.ALL_ADDRESS_CONSTANTS.REQUEST,
  });

export const recievedAllAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.ALL_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedAllAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.ALL_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })
  
  
  
  export const fetchAllAddressData = (data) => {
      console.log(data);
    return dispatch => {
      dispatch(requestAllAddressDetails());
      axios.get(ADDRESS_CONSTANTS.ALL_ADDRESS_CONSTANTS.URL+data,
      {  
          headers: 
          {
              'Content-Type': 'application/json',
             'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
      
      } })
        .then(res => dispatch(recievedAllAddressDetails(res.data)))
        .catch(err => dispatch(recievedAllAddressError(err)))
    }
  }

  export const requestAddAddressData = () => ({
    type: ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.REQUEST,
});

  export const recievedAddAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedAddAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })
  
  
  
  export const fetchAddAddressData = (data,data1) => {
      console.log(data);
      console.log(data1);
    return dispatch => {
     // axios.post(ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.URL,qs.stringify(data))
     dispatch(requestAddAddressData());
     axios.post(ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.URL,JSON.stringify(data),
     {  
         headers: 
         {
             'Content-Type': 'application/json',
            'Authorization': 'Bearer '+data1
     
     } })
        .then(res => dispatch(recievedAddAddressDetails(res.data)))
        .catch(err => dispatch(recievedAddAddressError(err)))
    }
  }

  
  export const requestDeleteAddressData = () => ({
    type: ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.REQUEST,
});

  export const recievedDeleteAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedDeleteAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })


    
  export const fetchDeleteAddress = (data) => {
    //requestDeleteAddressData();
      console.log(data);
    return dispatch => {
     // axios.post(ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.URL,qs.stringify(data))
     dispatch(requestDeleteAddressData());
     axios.post(ADDRESS_CONSTANTS.DELETE_ADDRESS_CONSTANTS.URL,JSON.stringify(data),
     {  
         headers: 
         {
             'Content-Type': 'application/json',
            'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe'
     
     } })
        .then(res => dispatch(recievedDeleteAddressDetails(res.data)))
        .catch(err => dispatch(recievedDeleteAddressError(err)))
    }
  }

   
  export const requestEditAddressData = () => ({
    type: ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.REQUEST,
});

  export const recievedEditAddressDetails = data => ({
    type: ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  
  export const recievedEditAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })
  
  
  
  export const fetchEditAddress = (data, data1) => {
    //requestEditAddressData();
      console.log(data,data1);
      console.log(JSON.stringify(data));
    return dispatch => {
      //axios.post(ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.URL,qs.stringify(data))
      dispatch(requestEditAddressData());
      axios.put(ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.URL,JSON.stringify(data),
      {  
          headers: 
          { 
              'Content-Type': 'application/json',
             'Authorization': 'Bearer '+ data1,
      
      } })
        .then(res => dispatch(recievedEditAddressDetails(res.data)))
        .catch(err => dispatch(recievedEditAddressError(err)))
    }
  }

export const setAddrId = (data, subreddit) => ({
    type: ADDRESS_CONSTANTS.SET_ADDR_ID_CONSTANTS,
    subreddit,
    data,
    receivedAt: Date.now(),
  });


  export const requestBillingAddress = data => ({
    type: ADDRESS_CONSTANTS.BILLING_ADDRESS_CONSTANTS.REQUEST,
     data,
     receivedAt: Date.now(),

  }) 
  
  export const receivedBillingAddress = data => ({
    type: ADDRESS_CONSTANTS.BILLING_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  

  export const receiveBillingAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.BILLING_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })               
  
  export const getBillingAddress = (data) => {
      console.log(data);
      var url=ADDRESS_CONSTANTS.BILLING_ADDRESS_CONSTANTS.URL + data + '/billingAddress';
      console.log(url);
    return dispatch => {
      dispatch(requestBillingAddress());
      axios.get(url,
        {  
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe',
        
        } })
        .then(res => dispatch(receivedBillingAddress(res.data)))
        .catch(err => dispatch(receiveBillingAddressError(err)))
    }
  }

  export const requestShippingAddress = data => ({
    type: ADDRESS_CONSTANTS.SHIPPING_ADDRESS_CONSTANTS.REQUEST,
     data,
     receivedAt: Date.now(),

  }) 
  
  export const receivedShippingAddress = data => ({
    type: ADDRESS_CONSTANTS.SHIPPING_ADDRESS_CONSTANTS.RECEIVED,
     data,
     receivedAt: Date.now(),
  })  

  export const receiveShippingAddressError = (err) => ({
    type: ADDRESS_CONSTANTS.SHIPPING_ADDRESS_CONSTANTS.RECEIVED_ERROR,
    errorCode: err,
  })               
  
  export const getShippingAddress = (data) => {
      console.log(data);
      console.log(ADDRESS_CONSTANTS.SHIPPING_ADDRESS_CONSTANTS);
      var url = ADDRESS_CONSTANTS.SHIPPING_ADDRESS_CONSTANTS.URL+data+'/shippingAddress';
      console.log(url);
    return dispatch => {
      dispatch(requestShippingAddress());
      axios.get(url,
        {  
            headers: 
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer wd13s50dpgkgpqypko4v64om79v4pjfe',
        
        } })
        .then(res => dispatch(receivedShippingAddress(res.data)))
        .catch(err => dispatch(receiveShippingAddressError(err)))
    }
  }


  export const deleleAddressFunction = subreddit => ({
    type: ADDRESS_CONSTANTS.REQUEST_DELETE_ADDRESS.URL,
    subreddit,
});


export const requestEditBillAddressData = () => ({
  type: ADDRESS_CONSTANTS.EDIT_BILL_ADDRESS_CONSTANTS.REQUEST,
});

export const recievedEditBillAddressDetails = data => ({
  type: ADDRESS_CONSTANTS.EDIT_BILL_ADDRESS_CONSTANTS.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedEditBillAddressError = (err) => ({
  type: ADDRESS_CONSTANTS.EDIT_BILL_ADDRESS_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
})



export const fetchEditBillAddress = (data, data1) => {
  //requestEditAddressData();
    console.log(data,data1);
    console.log(JSON.stringify(data));
  return dispatch => {
    //axios.post(ADDRESS_CONSTANTS.EDIT_ADDRESS_CONSTANTS.URL,qs.stringify(data))
    dispatch(requestEditBillAddressData());
    axios.put(ADDRESS_CONSTANTS.EDIT_BILL_ADDRESS_CONSTANTS.URL,JSON.stringify(data),
    {  
        headers: 
        { 
            'Content-Type': 'application/json',
           'Authorization': 'Bearer '+ data1,
    
    } })
      .then(res => dispatch(recievedEditBillAddressDetails(res.data)))
      .catch(err => dispatch(recievedEditBillAddressError(err)))
  }
}

export const requestAddBillAddressData = () => ({
  type: ADDRESS_CONSTANTS.ADD_BILL_ADDRESS_CONSTANTS.REQUEST,
});

export const recievedAddBillAddressDetails = data => ({
  type: ADDRESS_CONSTANTS.ADD_BILL_ADDRESS_CONSTANTS.RECEIVED,
   data,
   receivedAt: Date.now(),
})  
export const recievedAddBillAddressError = (err) => ({
  type: ADDRESS_CONSTANTS.ADD_BILL_ADDRESS_CONSTANTS.RECEIVED_ERROR,
  errorCode: err,
})



export const fetchAddBillAddressData = (data,data1) => {
    console.log(data);
    console.log(data1);
  return dispatch => {
   // axios.post(ADDRESS_CONSTANTS.ADD_ADDRESS_CONSTANTS.URL,qs.stringify(data))
   dispatch(requestAddBillAddressData());
   axios.post(ADDRESS_CONSTANTS.ADD_BILL_ADDRESS_CONSTANTS.URL,JSON.stringify(data),
   {  
       headers: 
       {
           'Content-Type': 'application/json',
          'Authorization': 'Bearer '+data1
   
   } })
      .then(res => dispatch(recievedAddBillAddressDetails(res.data)))
      .catch(err => dispatch(recievedAddBillAddressError(err)))
  }
}

 