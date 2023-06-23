// eslint-disable-next-line no-unused-vars
import React, { Component } from "react";
import Redirect from "react-router/Redirect";
import connect from "react-redux/lib/connect/connect";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _isError from "lodash/isError";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Loader from '../../../components/Loader/Loader.jsx';
import {
  fetchAddAddressData,
  fetchEditAddress,
} from "../../../actions/address";
import AddNewAddressComponent from "../../../components/MyAccount/AddNewAddressComponent.jsx";
import OneColumLeft from "../../../components/MyAccount/OneColumnLeftMyAccount.jsx";
import ErrorBoundary from "../../ErrorBoundary.jsx";
import ErrorHandler from "../../../components/Hoc/ErrorHandler.jsx";
import { fetchStateListData } from "../../../actions/register";

class AddNewAddressContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      errors: {},
      country: "",
      region: "",
      isShipping: undefined,
      isBilling: undefined,
      sucessMsg: undefined,
      redirect: false,
      selectedAddress: undefined,
      isEdit: false,
      isBillingFlag: false,
      isShippingFlag: false,
      showStates: true,
      selectStateValue: "",
      stateListRes: undefined,
      isDefaultChange: false,
      stateId: "",
      order: false,
      myAccount: false,
      addressLoader: false,
    };
  }

  selectCountry = (val) => {
    this.setState({ country: val });
    if (val === "IN") {
      this.setState({
        showStates: true,
      });
    } else {
      this.setState({
        showStates: false,
      });
    }
  };

  handleStateChange = (event) => {
    this.setState({
      selectStateValue: event.target.value,
    });
  };

  handleUSStateChange = (event) => {
    console.log(event);
    const { options, selectedIndex } = event.target;
    this.setState({
      selectStateValue: event.target.value,
      stateId: options[selectedIndex].id,
    });
  };

  selectRegion = (val) => {
    this.setState({ region: val });
  };

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    console.log(fields);

    if (!this.state.selectStateValue) {
      formIsValid = false;
      errors.selectStateValue = "true";
    }

    if (!fields.firstName || fields.firstName === "") {
      formIsValid = false;
      errors.firstName = "true";
    }
    // if (typeof fields.firstName !== "undefined") {
    //   if (!fields.firstName.match(/^[a-zA-Z]+$/)) {
    //     formIsValid = false;
    //     errors.firstName = "true";
    //   }
    // }

    if (!fields.lastName) {
      formIsValid = false;
      errors.lastName = "true";
    }
    if (typeof fields.lastName !== "undefined") {
      if (!fields.lastName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors.lastName = "true";
      }
    }

    if (!fields.telephone) {
      formIsValid = false;
      errors.telephone = "true";
    } else if (!fields.telephone.match(/^[0-9]+$/)) {
      formIsValid = false;
      errors.telephone = "true";
    }
    if (!fields.streetAddress1) {
      formIsValid = false;
      errors.streetAddress1 = "true";
    }
    if (!fields.city) {
      formIsValid = false;
      errors.city = "true";
    }
    if (!fields.postalCode) {
      formIsValid = false;
      errors.postalCode = "true";
    }

    if (!fields.defaultBilling) {
      this.setState({ isBilling: false });
    } else {
      this.setState({ isBilling: true });
    }

    if (!fields.defaultShipping) {
      this.setState({ isShipping: false });
    } else {
      this.setState({ isShipping: true });
    }

    this.setState({ errors });
    return formIsValid;
  };
  maxLengthCheck = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };
  handleChange = (event) => {
    let { fields } = this.state;
    switch (event.target.id) {
      case "defaultBilling":
      case "defaultShipping":
        fields[event.target.id] = event.target.checked ? 1 : 0;
        break;
      default:
        fields[event.target.id] = event.target.value;
    }
    this.setState({ fields });
  };

  handleSaveAddress = () => {
    console.log("edit outside", this.handleValidation());
    if (this.handleValidation()) {
      console.log("edit inside");
      console.log(this.state.fields);
      var data = undefined;
      this.setState({
        addressLoader: true,
      });
      if (
        this.state.fields.streetAddress2 === undefined ||
        this.state.fields.streetAddress2 === ""
      ) {
        data = [this.state.fields.streetAddress1];
      } else {
        data = [
          this.state.fields.streetAddress1,
          this.state.fields.streetAddress2,
        ];
      }
      const addressObj = {
        address_id: this.state.fields.addressId,
        firstname: this.state.fields.firstName,
        lastname: this.state.fields.lastName,
        company: null,
        street: data,
        city: this.state.fields.city,
        country_id: "IN",
        region_id: this.state.selectStateValue,
        postcode: this.state.fields.postalCode,
        telephone: this.state.fields.telephone,
        default_shipping:
          _get(this.state, "fields.defaultShipping", false) === 1
            ? true
            : false,
        default_billing:
          _get(this.state, "fields.defaultBilling", false) === 1 ? true : false,
      };
      console.log(this.state.isEdit);
      console.log(addressObj);
      if (this.state.isEdit) {
        this.props.saveAddress(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
      } else {
        this.props.getAddAddressData(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
      }
    }
  };

  componentDidMount() {
    console.log(this.mapDispatchToProps);
    this.props.getStateListData();
    if (this.props.history.location.state !== undefined) {
      const object = this.props.history.location.state.selectedAddress;

      const selectedAddress = {
        addressId: _get(object, "id", ""),
        firstName: _get(object, "firstname", ""),
        middleName: _get(object, "middlename", ""),
        lastName: _get(object, "lastname", ""),
        company: _get(object, "company", ""),
        telephone: _get(object, "telephone", ""),
        // fax: _get(object, 'fax', ''),
        streetAddress1: _get(object, "street[0]", ""),
        streetAddress2:
          _get(object.street.length) <= 1 ? "" : _get(object, "street[1]", ""),
        city: _get(object, "city", ""),
        postalCode: _get(object, "postcode", ""),
        defaultBilling: undefined,
        defaultShipping: undefined,
        stateId: _get(object, "region_id", ""),
        //selectStateValue: object.region_id,
      };

      this.selectCountry(_get(object, "country_id", ""));
      this.selectRegion(_get(object, "state", ""));

      this.setState({
        fields: selectedAddress,
        stateId: selectedAddress.stateId,
        selectStateValue: _get(
          this.props,
          "history.location.state.selectedAddress.region_id"
        ),
        isEdit: true,
        isBillingFlag: _get(
          this.props,
          "history.location.state.selectedAddress.default_billing",
          false
        ),
        isShippingFlag: _get(
          this.props,
          "history.location.state.selectedAddress.default_shipping",
          false
        ),
        isDefaultChange: _get(
          this.props,
          "history.location.state.selectedAddress.isDefaultChange",
          false
        ),
      });
    }
    if (_get(this.props, "history.location.state.isDefaultChange", false)) {
      window.scrollTo(
        0,
        document.body.scrollHeight || document.documentElement.scrollHeight
      );
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (!_isEmpty(_get(nextProps, "addAddressData"))) {
      console.log(_get(nextProps, "addAddressData"));
      const message =
        _get(nextProps.addAddressData[0], "status") === true
          ? "Address Added Successfully."
          : "Add Address Failed.";
      if (_get(nextProps.addAddressData[0], "status") === true) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      this.setState({
        sucessMsg: message,
        redirect: true,
        addressLoader: false,
      });
    }

    if (!_isEmpty(_get(nextProps, "editAddressData"))) {
      if (_get(nextProps.editAddressData, 0)) {
        const message =
          _get(nextProps.editAddressData[0], "status") === true
            ? "Address Updated Successfully."
            : "Address Update Failed.";
        if (_get(nextProps.editAddressData[0], "status") === true) {
          toast.success(message);
        } else {
          toast.error(message);
        }
        this.setState({
          sucessMsg: message,
          redirect: true,
          addressLoader: false,
        });
      }
    }

    if (!_isEmpty(_get(nextProps, "stateListData"))) {
      const { stateId } = this.state;
      const stateListRes = nextProps.stateListData.available_regions;
      console.log(nextProps.stateListData.available_regions);
      const tempValue =
        stateListRes &&
        stateListRes.length &&
        stateListRes.filter((each) => each.id === stateId);
      this.setState({
        stateListRes: nextProps.stateListData.available_regions,
        // selectStateValue: tempValue && tempValue[0].code,
      });
    }
  }

  handleBackClick = () => {
    this.props.history.push("/customer/account/address");
  };

  getOrderData = () => {
    console.log();
    this.setState({
      order: true,
    });
  };

  getMyAccount = () => {
    console.log();
    this.setState({
      addressLink: true,
    });
  };

  render() {
    // console.log(this.state.stateListRes);
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/customer/account/address",
            state: { sucessMsg: this.state.sucessMsg },
          }}
        />
      );
    }

    if (this.state.myAccount) {
      this.setState({
        myAccount: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname: "/customer/account",
          }}
        />
      );
    }

    if (this.state.order) {
      this.setState({
        order: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname: "/customer/account/orders",
          }}
        />
      );
    }

    return (
      <div>
        <ToastContainer autoClose={1000} position={toast.POSITION.TOP_RIGHT} />
        <div class="u-s-p-b-60" style={{ marginTop: "100px" }}>
          <div class="section__content">
            <div class="dash">
              <div class="container">
                <div class="row">
                  <div class="col-lg-3 col-md-12">
                    <div
                      class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30"
                      id="dh_pd34"
                    >
                      <div class="dash__pad-1">
                        <span class="dash__text u-s-m-b-16">
                          Hello, {this.props.loginResponseData.firstname}&nbsp;
                          {this.props.loginResponseData.lastname}
                        </span>
                        <ul class="dash__f-list">
                          <li>
                            <a href="/customer/account">My Profile</a>
                          </li>
                          <li>
                            <a
                              class="dash-active"
                              href="/customer/account/address"
                            >
                              Address Book
                            </a>
                          </li>

                          <li>
                            <a href="/customer/account/orders">My Orders</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <div className="dash__box dash__box--bg-white dash__box--shadow dash__box--w">
                                        <div className="dash__pad-1">
                                            <ul className="dash__w-list">
                                                <li>
                                                    <div className="dash__w-wrap">

                                                        <span className="dash__w-icon dash__w-icon-style-1"><i className="fas fa-cart-arrow-down"></i></span>

                                                        <span className="dash__w-text">4</span>

                                                        <span className="dash__w-name">Orders Placed</span></div>
                                                </li>
                                                <li>
                                                    <div className="dash__w-wrap">

                                                        <span className="dash__w-icon dash__w-icon-style-2"><i className="fas fa-times"></i></span>

                                                        <span className="dash__w-text">0</span>

                                                        <span className="dash__w-name">Cancel Orders</span></div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div> */}
                  </div>
                  <div className="col-lg-9 col-md-12">
                    <ErrorBoundary>
                      <AddNewAddressComponent
                        handleBackClick={this.handleBackClick}
                        handleSaveAddress={this.handleSaveAddress}
                        handleChange={this.handleChange}
                        errors={this.state.errors}
                        fields={this.state.fields}
                        selectCountry={this.selectCountry}
                        selectRegion={this.selectRegion}
                        country={this.state.country}
                        region={this.state.region}
                        maxLengthCheck={this.maxLengthCheck}
                        // fields={this.state.selectedAddress}
                        pageTitle={
                          this.state.isEdit ? "Edit Address" : "Add New Address"
                        }
                        isBillingFlag={this.state.isBillingFlag}
                        isShippingFlag={this.state.isShippingFlag}
                        showStates={this.state.showStates}
                        stateListRes={this.state.stateListRes}
                        handleStateChange={this.handleStateChange}
                        selectStateValue={this.state.selectStateValue}
                        handleUSStateChange={this.handleUSStateChange}
                        addressLoader={this.state.addressLoader}
                      />
                    </ErrorBoundary>
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
  getAddAddressData: (data, data1) =>
    dispatch(fetchAddAddressData(data, data1)),
  saveAddress: (data, data1) => dispatch(fetchEditAddress(data, data1)),
  getStateListData: () => dispatch(fetchStateListData()),
});

const mapStateToProps = (state) => {
  const { allAddressReducer, loginReducer, registerReducer } = state;

  const {
    loginResponseData,
    apiToken,
    salesRepUser,
    //   error: loginError,
    primeUser,
    userProfileData,
    custId,
  } = loginReducer || [];

  const {
    addAddressData,
    editAddressData,
    isFetching: isLoading,
    //  error: allAddressError,
  } = allAddressReducer || [];

  const {
    stateListData,
    //  error: registerError,
  } = registerReducer || [];

  // const error = !_isEmpty(registerError) || _isError(registerError) || !_isEmpty(allAddressError) || _isError(allAddressError) || !_isEmpty(loginError) || _isError(loginError);

  return {
    addAddressData,
    editAddressData,
    stateListData,
    isLoading,
    apiToken,
    salesRepUser,
    //  error,
    primeUser,
    userProfileData,
    custId,
    loginResponseData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(AddNewAddressContainer));
