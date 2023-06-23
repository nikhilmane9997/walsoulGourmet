/* eslint-disable class-methods-use-this */
import React from "react";
import connect from "react-redux/lib/connect/connect";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isError from "lodash/isError";
import Redirect from "react-router/Redirect";
import OneColumLeft from "../../components/MyAccount/OneColumnLeftMyAccount.jsx";
import Dashboard from "../../components/MyAccount/MyAccountDashboard.jsx";
import {
  fetchCustomerDetails,
  fetchUpdateCustomerDetails,
  loginResponseData,
} from "../../actions/login";
import BreadCrumbs from "../../components/Common/BreadCrumbs.jsx";
import ErrorBoundary from "../ErrorBoundary.jsx";
import ErrorHandler from "../../components/Hoc/ErrorHandler.jsx";
import lazyLoader from "../../assets/images/lazy-loader.gif";

class MyAccountDashBoardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breadCrumbsList: [
        {
          link: "/",
          name: "home",
        },
        {
          link: undefined,
          name: "MY ACCOUNT",
        },
      ],
      firstName: "",
      lastName: "",
      email: "",
      telephone: "",
    };
  }

  componentDidMount() {
    document.title = "My Account";
    console.log(this.props);

    console.log(this.state);
    this.props.getuserProfileData(this.props.apiToken);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!_isEmpty(nextProps.loginResponseData)) {
      console.log(nextProps.loginResponseData);
      this.setState({
        firstName: nextProps.loginResponseData.firstname,
        lastName: nextProps.loginResponseData.lastname,
        email: nextProps.loginResponseData.email,
        telephone:
          nextProps.loginResponseData.custom_attributes[0].value == undefined
            ? 0
            : nextProps.loginResponseData.custom_attributes[0].value,
      });
    }
  }

  updateDetails = () => {
    console.log(this.state);
    var reqObj = {
      id: this.props.loginResponseData.id,
      email: this.state.email,
      firstname: this.state.firstName,
      lastname: this.state.lastName,
      store_id: 4,
      website_id: 1,
      custom_attributes: [
        {
          attribute_code: "customer_mobile_number",
          value: this.state.telephone,
        },
      ],
    };
    console.log(reqObj);
    this.props.updateCustomerDetails(this.props.loginResponseData.id, {
      customer: reqObj,
    });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  render() {
    console.log(this.props.loginResponseData);
    return (
      <div>
        <div className="u-s-p-b-60" style={{ marginTop: "100px" }}>
          <div className="section__content">
            <div className="dash" style={{ marginTop: "50px" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-3">
                    <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                      <div className="dash__pad-1">
                        <span
                          className="dash__text u-s-m-b-16"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <span>Hello, {this.props.userFirstName}</span>
                          <span className="signout">
                            {this.props.apiToken !== "" && (
                              <a
                                href="/logoutSuccess"
                                style={{
                                  display: "flex",
                                  width: "100%",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <i
                                  className="fas fa-lock-open u-s-m-r-6"
                                  style={{ color: "#e54040" }}
                                ></i>

                                <span style={{ color: "#e54040" }}>
                                  Signout
                                </span>
                              </a>
                            )}
                          </span>
                        </span>
                        <ul className="dash__f-list">
                          <li>
                            <a
                              className="dash-active"
                              style={{ color: "#800000" }}
                            >
                              My Profile
                            </a>
                          </li>
                          <li>
                            <a href="/customer/account/address">Address Book</a>
                          </li>

                          <li>
                            <a href="/customer/account/orders">My Orders</a>
                          </li>

                          {/*<li>

                                                    <a href="/view-cart">My Cart</a></li>

                                                <li>

                                                    <a href="/checkout/onepage">My CheckOut</a></li>*/}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9 col-md-9">
                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white dash-box-pad">
                      <div className="dash__pad-2" id="dash__pad-23">
                        <h1 className="dash__h1 u-s-m-b-14">Edit Profile</h1>

                        <div className="dash__link dash__link--secondary u-s-m-b-30"></div>

                        <div className="row">
                          <div className="col-lg-12">
                            <form className="dash-edit-p">
                              <div className="gl-inline-t">
                                <div className="u-s-m-b-30">
                                  <label
                                    className="gl-label"
                                    htmlFor="firstName"
                                  >
                                    FIRST NAME *
                                  </label>

                                  <input
                                    className="input-text input-text--primary-style"
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={this.state.firstName}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="gl-inline-t">
                                <div className="u-s-m-b-30">
                                  <label
                                    className="gl-label"
                                    htmlFor="lastName"
                                  >
                                    LAST NAME *
                                  </label>

                                  <input
                                    className="input-text input-text--primary-style"
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={this.state.lastName}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="gl-inline-t">
                                <div className="u-s-m-b-30">
                                  <label
                                    className="gl-label"
                                    htmlFor="emailAddress"
                                  >
                                    EMAIL *
                                  </label>

                                  <input
                                    className="input-text input-text--primary-style"
                                    type="text"
                                    name="email"
                                    id="emailAddress"
                                    value={this.state.email}
                                    placeholder="Email Address"
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="gl-inline-t">
                                <div className="u-s-m-b-30">
                                  <label
                                    className="gl-label"
                                    htmlFor="telephone"
                                  >
                                    PHONE NO *
                                  </label>

                                  <input
                                    className="input-text input-text--primary-style"
                                    type="text"
                                    placeholder="Phone No"
                                    name="telephone"
                                    id="telephone"
                                    defaultValue={this.state.telephone}
                                    onChange={this.handleInputChange}
                                  />
                                </div>
                              </div>

                              <div
                                style={{ marginTop: "20px" }}
                                onClick={this.updateDetails}
                              >
                                <a className="btn btn--e-brand-b-2 dash_btn3">
                                  SAVE
                                </a>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  getuserProfileData: (data) => dispatch(fetchCustomerDetails(data)),
  updateCustomerDetails: (data, data1) =>
    dispatch(fetchUpdateCustomerDetails(data, data1)),
});
const mapStateToProps = (state) => {
  const { loginReducer } = state;

  const {
    loginResponseData,
    salesRepUser,
    userProfileData,
    // error: loginError,
    apiToken,
    primeUser,
    updateCustomerDetails,
    custEmail,
    userFirstName,
    userLastName,
  } = loginReducer || [];

  //const error = !_isEmpty(loginError) || _isError(loginError);

  return {
    loginResponseData,
    salesRepUser,
    userProfileData,
    apiToken,
    primeUser,
    updateCustomerDetails,
    custEmail,
    userFirstName,
    userLastName,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(MyAccountDashBoardContainer));
