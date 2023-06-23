import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import { ToastContainer, toast } from 'react-toastify';
import LoginComponent from '../components/BKMComponent/LoginComponent.jsx';
import { getPlaceOrder } from '../actions/placeOrder';
import { fetchCustomerToken, fetchCustomerDetails, resetForgotPassword } from '../actions/login';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';
//import flower from '../assets/img/top-flower.jpg';
import logLoader from '../assets/img/loader.gif';
import { stubTrue } from 'lodash';

class PaytmPaymentContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword:'',
      email: '',
      redirectToHome: false,
      errors: {},
      showError: false,
      tokenId: undefined,
      emailData: undefined,
      resetLoader: false, 
      goToHomePage: false,
      placeStatus: true,
      showCheckoutSuccess: false,
      orderId: undefined,
    };
  }

  componentDidMount() {
    document.title = 'Paytm successful';
    console.log(this.props.apiToken);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('order_id');
    const myParam1 = urlParams.get('txn_id');
    const myParam2 = urlParams.get('method');
    console.log(myParam);
    console.log(myParam1);
    console.log(myParam2);
    var reqObj={ 
      method: myParam2,
      paytm_order_id: myParam,
      txn_id: myParam1
      };
      console.log(reqObj);
      var ddd={payment:reqObj};
      console.log(ddd);
      this.setState({
        placeStatus: true,
      });
      console.log(reqObj);
      this.props.placeOrder({payment: reqObj },this.props.apiToken);
   
    
   
  }

  loginData = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.handleValidation()) {
        this.props.getAccessToken({ username: this.state.email, password: this.state.password });
      }
    }
  };

  loginDataclick = () => {
    console.log(this.state.email);
    console.log(this.state.password);
    
    console.log(this.handleValidation());
    if(this.handleValidation()) {
      this.setState({
        resetLoader: true
      });
      var reqObj={
           email: this.state.emailData,
           resetToken: this.state.tokenId,
           newPassword: this.state.password
      }
      this.props.resetData(reqObj);

      this.setState({
        password: '',
        confirmPassword: '',
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log(event);
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;
  

    if (this.state.password === '') {
      formIsValid = false;
      errors.password = 'This is a required field';
    }

    if (typeof this.state.password !== 'undefined' && this.state.password !== '') {
      if ((this.state.password).length < 6) {
        formIsValid = false;
        errors.password = 'Please enter 6 or more characters.';
      }
    }

    if (this.state.confirmPassword === '') {
      formIsValid = false;
      errors.confirmPassword = 'This is a required field';
    }

    if (typeof this.state.confirmPassword !== 'undefined' && this.state.confirmPassword !== '') {
      if ((this.state.confirmPassword).length < 6) {
        formIsValid = false;
        errors.confirmPassword = 'Please enter 6 or more characters.';
      }
    }

    if (this.state.password !== this.state.confirmPassword) {
      alert('Password do not match');
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (
      !_isEmpty(_get(nextProps, "placeOrderSuccess")) &&
      this.state.placeStatus
    ) {
     // data = nextProps.placeOrderSuccess;
      if (nextProps.placeOrderSuccess[0].status === true) {
        this.setState({
          showCheckoutSuccess: true,
          placeSuccess: false,
          checkOutLoader: false,
          orderId: nextProps.placeOrderSuccess[0].order_number,
        });
      } else {
        this.setState({
          showCheckoutSuccess: true,
          placeSuccess: false,
          checkOutLoader: false,
        });
        swal("", nextProps.placeOrderSuccess[0].message, "error");
      }
    }
  }

  render() {
    console.log(this.props);
    if (_get(this.state, 'showCheckoutSuccess')) {
      return <Redirect push to={{
          pathname: '/checkout/onepage/success',
          state: { orderId: this.state.orderId },
      }} />;
    }
    if (this.state.redirectToHome) {
      return <Redirect push to="/customer/account" />;
    }
    if (this.state.goToHomePage) {
      this.setState({
        goToHomePage: false,
      });
     
      return (
        <Redirect push to={{
          pathname: '/' 
      }} />
       );    
    }
    let forgotPasswordId; let forgotPasswordRes;
    if (this.props.location.state !== undefined) {
      forgotPasswordRes = this.props.location.state.msg;
      forgotPasswordId = this.props.location.state.id;
    }
    return (
      <div>
      
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAccessToken: data => dispatch(fetchCustomerToken(data)),
  getLoginData: () => dispatch(fetchCustomerDetails()),
  resetData: data => dispatch(resetForgotPassword(data)),
  placeOrder: (data,data1) => dispatch(getPlaceOrder(data,data1)),
});

const mapStateToProps = (state) => {
  const { loginReducer,placeOrderReducer } = state;

  const {
    placeOrderSuccess,
} = placeOrderReducer || [];

  const {
    loginResponseData,
    apiToken,
    isFetching: isLoading,
    accessToken,
    resetPasswordData,
    resetPasswordStatus,
   // error: loginError,
  } = loginReducer || [];

 // const error = !_isEmpty(loginError) || _isError(loginError);

  return {
    loginResponseData,
    accessToken,
    isLoading,
    //error,
    resetPasswordData,
    resetPasswordStatus,
    apiToken,
    placeOrderSuccess,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(PaytmPaymentContainer));
