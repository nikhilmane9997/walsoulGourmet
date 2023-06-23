import React, { Component } from "react";
import _get from "lodash/get";
import _isError from "lodash/isError";
import _isEmpty from "lodash/isEmpty";
import Redirect from "react-router/Redirect";
import connect from "react-redux/lib/connect/connect";
// import '../../assets/stylesheets/checkout.css';
import {
  fetchPlaceOrderData,
  clearPlaceOrderReducer,
  updateProductQty,
} from "../../actions/placeOrder";
import ErrorHandler from "../../components/Hoc/ErrorHandler.jsx";
import {
  flushCartViewData,
  removeCartValue,
  clearCartReducer,
} from "../../actions/cart";
import { flushCartData, updatePrimeValue } from "../../actions/login";

const reduceObject = (data) => {
  const abc =
    data &&
    data.map((each) => ({
      name: each.name,
      price: each.product_price,
      quantity: each.qty,
      sku: each.sku,
    }));
  return abc;
};

class CheckOutSuccessContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHome: false,
      amount: _get(this.props.placeOrderData, "amount"),
    };
  }

  handleContinueClick = () => {
    this.setState({ showHome: true });
  };

  componentDidMount() {
    this.props.clearPlaceOrderData();
  }

  render() {
    if (_get(this.state, "showHome")) {
      return <Redirect push to="/" />;
    }

    if (_get(this.state, "showViewOrder")) {
      return (
        <Redirect
          push
          to={{
            pathname: "/customer/account/viewOrder",
            state: { orderId: this.state.orderId },
          }}
        />
      );
    }
    if (!this.props.apiToken) {
      return (
        <Redirect
          push
          to={{
            pathname: "/login",
          }}
        />
      );
    }

    return (
      <div className="container">
        <div className="checkout-success row1">
          <center>
            <h1 style={{ paddingTop: "100px" }}>
              Your order has been received.
            </h1>
            <br />
            <h2 className="sub-title">Thank you for your purchase!</h2>
            <br />
            <p>
              Your order # is:{" "}
              {_get(this.props.history, "location.state.orderId")}.{" "}
            </p>
          </center>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlaceOrder: (data) => dispatch(fetchPlaceOrderData(data)),
  clearPlaceOrderData: () => {
    dispatch(clearCartReducer());
  },
  flushCartViewData: () => dispatch(flushCartViewData()),
  flushCartData: () => dispatch(flushCartData()),
  updateProductQty: (data) => dispatch(updateProductQty(data)),
  updatePrimeValue: (data) => dispatch(updatePrimeValue(data)),
  deleteCartValue: () => dispatch(removeCartValue()),
});

const mapStateToProps = (state) => {
  const { loginReducer, placeOrderReducer, cartReducer } = state;

  const {
    apiToken,
    currencyCode,
    cartId,
   // error: loginError,
  } = loginReducer || [];

  const {
    placeOrderData,
    firstData,
  //  error: placeOrderError,
  } = placeOrderReducer || [];

  const { cartType, productInfo } = cartReducer || [];

  // const error =
  //   !_isEmpty(placeOrderError) ||
  //   _isError(placeOrderError) ||
  //   !_isEmpty(loginError) ||
  //   _isError(loginError);

  return {
    apiToken,
    currencyCode,
    cartId,
    placeOrderData,
    firstData,
    //error,
    cartType,
    productInfo,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(CheckOutSuccessContainer));


