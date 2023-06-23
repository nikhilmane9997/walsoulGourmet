import React from 'react';
import connect from 'react-redux/lib/connect/connect';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import Redirect from 'react-router/Redirect';
import { ToastContainer, toast } from 'react-toastify';
import LoginComponent from './../components/BKMComponent/LoginComponent.jsx';
import { fetchCustomerToken, fetchCustomerDetails, resetForgotPassword } from '../actions/login';
import ErrorBoundary from './ErrorBoundary.jsx';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';
//import flower from '../assets/img/top-flower.jpg';
//import logLoader from '../assets/img/loader.gif';
//import { stubTrue } from 'lodash';

class LoginContainer extends React.Component {
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
    };
  }

  componentDidMount() {
    document.title = 'Reset Password';
    console.log(this.state.tokenId);
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('email');
    const myParam1 = urlParams.get('token');
    this.setState({
      tokenId: myParam1,
      emailData: myParam,
    })
    
   
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
    if (nextProps.resetPasswordData !== undefined && this.state.resetLoader) 
    {
      if(nextProps.resetPasswordData.data === true)
      {
      console.log(nextProps.resetForgotPassword);
      toast.success("Password Updated Successfully!");
      }
      
      this.setState({
        resetLoader: false,
       goToHomePage: true,
      })
    }
    if (nextProps.resetPasswordStatus !== undefined && this.state.resetLoader) 
    {
      alert(nextProps.resetPasswordStatus.message);
      this.setState({
        resetLoader: false,
        // goToHomePage: true,
      })
    }
    if (!_isEmpty(_get(nextProps, 'loginData'))) {
      this.setState({
        loginResult: _get(nextProps.loginData, [0, 'message']),
      });
      if (_get(nextProps.loginData, [0, 'message']) === 'success') {
        this.setState({
          loginShow: true,
          redirectToHome: true,
          totalProd: _get(nextProps.loginData, [0, 'cartDetails', 'result']),
          totalProdInCart: _get(nextProps.loginData, [0, 'cartDetails', 'total_products_in_cart']),
          subtotal: _get(nextProps.loginData, [0, 'cartDetails', 'subtotal']),
        });
      } else {
        this.setState({
          showError: true,
        });
      }
    }
  }

  render() {
    console.log(this.props);
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
        <ToastContainer autoClose={1000} position={toast.POSITION.TOP_RIGHT}/>
        <section>
          <div>
          {/*<img src={flower} alt="#" style={{width:'100%',marginTop:'0px'}} />*/}
          </div>
          </section>
        <section>
            <div className="text-center" style={{marginTop: '50px'}}>
            <center><h1 style={{fontSize:'45px' , fontWeight: 'bold'}}>Reset Password</h1></center>
            </div>
        </section>
        <ErrorBoundary>
          <LoginComponent
            forgotPasswordRes={forgotPasswordRes}
            forgotPasswordId={forgotPasswordId}
            handleInputChange={this.handleInputChange}
            loginData={this.loginData}
            loginDataclick={this.loginDataclick}
            state={this.state}
            resetLoader={this.state.resetLoader}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getAccessToken: data => dispatch(fetchCustomerToken(data)),
  getLoginData: () => dispatch(fetchCustomerDetails()),
  resetData: data => dispatch(resetForgotPassword(data)),
});

const mapStateToProps = (state) => {
  const { loginReducer } = state;

  const {
    loginResponseData,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(LoginContainer));
