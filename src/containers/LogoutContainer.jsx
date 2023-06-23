// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import connect from 'react-redux/lib/connect/connect';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import { Redirect } from 'react-router';
import { logoutFunction } from '../actions/login';
import { clearCartReducer } from '../actions/cart';
import { deleleAddressFunction } from '../actions/address';
import { clearWishlistReducer } from '../actions/wishList';
import ErrorHandler from '../components/Hoc/ErrorHandler.jsx';

class LogoutContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
        };
    }

    componentDidMount() {
        this.props.getLogoutData();
       // this.props.clearCartData();
       setTimeout(() => {
            this.setState({ render: true });
        }, 5000);
    }

    render() {
        if (this.state.render) {
            return (<Redirect to='/' />);
        }
        return (
            <div>
                <section>
                <center>
                <div><h1 style={{paddingTop:'250px'}}>You are now Logged out</h1>
                <p>You have logged out and will be redirected to our home page in 5 seconds.</p></div>
                </center>
                </section>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getLogoutData: () => {
        dispatch(logoutFunction()),
        dispatch(clearCartReducer())
        dispatch(deleleAddressFunction())
},
    // clearCartData: () => dispatch(clearCartReducer()),
});

const mapStateToProps = (state) => {
    const { loginReducer } = state;

    const {
        loginData,
        isFetching: isLoading,
        error: loginError,
        apiToken,
    } = loginReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError);

    return {
        loginData,
        isLoading,
        error,
        apiToken,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(LogoutContainer));
