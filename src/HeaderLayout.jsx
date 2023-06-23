import React from "react";
// import Modal from 'react-bootstrap/lib/Modal';
// import Modal from 'react-bootstrap-modal';
// import Button from 'react-bootstrap/lib/Button';
import connect from "react-redux/lib/connect/connect";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isError from "lodash/isError";
import _groupBy from "lodash/groupBy";
import Redirect from "react-router/Redirect";
//import MediaQuery from "react-responsive";
import { ToastContainer, toast } from "react-toastify";
//import { animateScroll } from "react-scroll";
//import Image from "react-image-resizer";
import "react-toastify/dist/ReactToastify.css";
//import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
// import Link from "react-router-dom/Link";
// import logoIcon from "./assets/images/LOGO.png";
// import navBarIcon from "./assets/images/navbar-icon-three.png";
// import axios from "axios";
import * as emailjs from "emailjs-com";
import swal from "sweetalert";
import ScrollApp from "./components/ScrollTopComponent/scroll.jsx";
//import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from "./components/Hoc/ErrorHandler.jsx";
//import { LoginLoader } from "./components/Loader/Loader.jsx";
import {
  fetchHomePage,
  fetchCustomerToken,
  fetchCustomerDetails,
  fetchZipCode,
  receiveHideLoginModalData,
  fetchForgotPassword,
  setZipcodeData,
  setCatName,
  setCatDesc,
} from "./actions/login";
import {
  fetchCustomerRegisterData,
  clearRegisterData,
  fetchStateListData,
  fetchBillingStateListData,
  registerMessage,
} from "./actions/register";
import {
  fetchCategoriesAutoCompleteResult,
  fetchAllHeaderSearch,
} from "./actions/bkm_listing";
import { mapCustomerRegisterData } from "./utils/commonMapper";
import {
  fetchCartItemsByCustomer,
  getGuestConvertCartList,
  fetchGetCartData,
  deleteGuestCartData,
  fetchRemoveFromCartData,
  getGuestCartList,
} from "./actions/cart";
import {
  fetchAllAddressData,
  getBillingAddress,
  getShippingAddress,
} from "./actions/address";
import twentysix from "./assets/images1.0/26.png";
import twentyseven7 from "./assets/images1.0/272.png";
import twentyeight8 from "./assets/img/instagram.png";
import twentynine from "./assets/images1.0/29.png";
import purelogo from "./assets/images1.0/roundLogo.png";
import textLogo from "./assets/images1.0/textLogo.png";
import Suggetion from "./components/Header/SuggetionComponent.jsx";
import loaderRoll from "./assets/img/Rolling.gif";
import loginLogo from "./assets/img/login.jpg";
// import PaypalImage from "./assets/images/Paypal_BKM.png";
// import SecureImage from "./assets/images/security_BKM.png";
// import GodaddyImage from "./assets/images/godaddy-seal.jpg";
// import headerImage from "./assets/img/2.png";
// import email from "./assets/img/h.png";
// import login from "./assets/img/20.png";
// import search from "./assets/img/21.png";
// import flower from "./assets/img/top-flower.jpg";
import MaModal from "./components/Common/MaterialUIModal.jsx";
import MaModalOne from "./components/Common/MaterialUIModalOne.jsx";
import MaModalSerch from "./components/Common/MaterialUIModalSearch.jsx";
import MaModalContact from "./components/Common/MaterialUIContact.jsx";
import MaterialUIHeaderSlider from "./components/Common/MaterialUIHeaderSlider.jsx";
import MaterialUIHeaderCartSlider from "./components/Common/MaterialUIHeaderCartSlider.jsx";
//import facebook from "./assets/img/facebook.jpg";
//import google from "./assets/img/google.jpg";
//import cart from "./assets/img/1.png";
//import lazyLoader from "./assets/img/loader.gif";
// import logLoader from "./assets/img/25.gif";
// import flowerback from "./assets/img/f1.jpg";
// import Visa from "./assets/img/visa_2.jpg";
// import Mastercard from "./assets/img/mastercard_2.jpg";
// import Amex from "./assets/img/amex_2.jpg";
// import Ssl from "./assets/img/ssl_2.jpg";
// import Discover from "./assets/img/discover_2.jpg";
// import AuthImage from "./assets/img/authImage.gif";
import CottinFabLogo from "./assets/images/logo/cottinfab.png";
import instaLogo from "./assets/images/logo/insta.png";
import signin from "./assets/img/signin.jpg";

function myFunction(x) {
  return x.classList.toggle("change");
}

class HeaderLayout extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handlePopupShow = this.handlePopupShow.bind(this);
    this.handlePopupClose = this.handlePopupClose.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.showCart = this.showCart.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showLoginData = this.showLoginData.bind(this);
    this.toggleCartDropdown = this.toggleCartDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.mblMenu = this.mblMenu.bind(this);
    this.state = {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      telephone: undefined,
      password: undefined,
      confirmPassword: undefined,
      company: "NA",
      streetAddress: "NA",
      city: "NA",
      zipCode: "NA",
      country: "NA",
      state: "NA",
      taxId: "NA",
      newsletSub: "NA",
      showLogin: false,
      zipcode: undefined,
      homePage: undefined,
      zipcodeInit: undefined,
      redirectRegister: false,
      loginEmail: undefined,
      loginPassword: undefined,
      lastUrl: this.props.match.params, // this.props.location.hash && this.props.location.hash.substring(1),
      loginResult: !_isEmpty(props.loginData)
        ? _get(props.loginData, [0, "message"])
        : undefined,
      hover: false,
      totalProd: [],
      // totalProd: props.showCartResult ? _get(props, 'showCartResult', 0) : _get(props.loginData, [0, 'cartDetails', 'result'], 0),
      wishListProduct: _get(
        props,
        "showWishListData",
        _get(props.loginData, [0, "wishListDetails", "result"])
      ),
      wishListTotalProduct: _get(
        props,
        "addToWishlist.totalCount",
        _get(props.loginData, [0, "wishListDetails", "totalCount"])
      ),
      favouriteProducts: undefined,
      favouriteTotalProduct: _get(
        props.addToFavs,
        "product_count",
        _get(props.loginData, [0, "favrtDetails", "product_count"])
      ),
      showError: false,
      // showCartData: false,
      handleCartClick: false,
      showMsg: true,
      showPopup: false,
      errors: {},
      totalProdInCart: 0,
      subtotal: 0,
      // totalProdInCart: _isEmpty(props.firstCartData) ? _get(props.loginData, [0, 'cartDetails', 'total_products_in_cart'], 0) : _get(props.firstCartData, ['cart', 0, 'total_products_in_cart'], 0),
      // subtotal: _isEmpty(props.firstCartData) ? _get(props.loginData, [0, 'cartDetails', 'subtotal']) : _get(props.firstCartData, ['cart', 0, 'subtotal']),
      cateGoriesList: undefined,
      headerSearchRedirect: false,
      searchText: "",
      searchedData: {},
      searchData: [],
      categoryData: [],
      homePageData: [],
      newHomePageData: [],
      header: undefined,
      banner: {},
      infographics: {},
      testimonials: {},
      categoryBlocks: {},
      featuredProducts: {},
      mouseEvent: false,
      popupCall: false,
      callLogin: false,
      redirectToDetailsPage: false,
      url: undefined,
      productId: undefined,
      condition: false,
      isOpen: false,
      isOpen1: false,
      isOpen2: false,
      isOpen3: false,
      showRemoveIcon: true,
      navbarFixedTop: "",
      subscribeEmail: "",
      newsletterSubscriptionMessage: "",
      newsletterSubscriptionStatus: "",
      showLargeDropDowns: "",
      width: window.innerWidth,
      loginForm: false,

      showChangeAddress: false,
      registerCall: false,
      cartDataShow: null,
      cartResult: undefined,
      productDetails: [],
      cartDataId: undefined,
      itemCount: 0,
      showAddress: false,
      allAddresses: undefined,
      billingAddressId: undefined,
      shippingAddressId: undefined,
      billingAddress: undefined,
      shippingAddress: undefined,
      otherAddress: [],
      responsive: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 2 } },
      children: [],
      addressData: [],
      catName: undefined,
      catDesc: undefined,
      catImage: undefined,
      catData: undefined,
      catAllData: undefined,
      seoDetails: undefined,
      link: false,
      showConvert: false,
      homeLoading: true,
      loginLoaderData: false,
      loginResponse: false,
      regEmail: "",
      regPassword: "",
      showForgot: false,
      forgotEmail: undefined,
      forgotData: false,
      removeLoader: false,
      postalCode: "",
      shipAddressPopupData: undefined,
      showFullLoader: true,
      loginError: undefined,
      loginLoader: false,
      showSearch: false,
      showContact: false,
      myAccountLink: false,
      viewCartLink: false,
      homeLink: false,
      contactForm: {},
      contactFirstName: undefined,
      contactLastName: undefined,
      contactEmail: undefined,
      contactPhone: undefined,
      contactMessage: undefined,
      errors5: {},
      headerFooter: undefined,
      footer: false,
      footerData: undefined,
      stateUrl: false,
      showData74: false,
      showData63: false,
      headeCartSlider: false,
      showSearchLoader: false,
      itemGuestDeleteShow: false,
      showToggle: false,
      showToggle2: false,
      enableDrawer: false,
      errorList: false,
      searchHandle: false,
      ratings: undefined,
      guestCartCount: 0,
      loginUserCartCount: undefined,
      existEmail: "",
      contactUsLink: false,
    };

    //this.props.hideLoginModal({ show: false });
  }

  handleContactValidation() {
    const errors5 = {};
    let formIsValid = true;
    console.log("test");

    // Email
    if (this.state.contactFirstName === undefined) {
      formIsValid = false;
      errors5.contactFirstName = "This is a required field.";
    }

    if (this.state.contactLastName === undefined) {
      formIsValid = false;
      errors5.contactLastName = "This is a required field";
    }

    if (this.state.contactEmail === undefined) {
      formIsValid = false;
      errors5.contactEmail = "This is a required field";
    }

    if (this.state.contactPhone === undefined) {
      formIsValid = false;
      errors5.contactPhone = "This is a required field";
    }

    if (this.state.contactMessage === undefined) {
      formIsValid = false;
      errors5.contactMessage = "This is a required field";
    }

    this.setState({ errors5 });
    console.log(this.state);
    return formIsValid;
  }

  componentDidUpdate(prevProps, prevState) {
    //  console.log(this.props.apiToken);

    if (this.props.apiToken != prevProps.apiToken) {
      if (this.props.apiToken !== "") {
        this.showHeaderSlider();
      }
    }
    //console.log('test');
    //console.log('test Data',prevProps);
  }

  loginDataFun = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (this.handleValidation()) {
        this.setState({
          popupCall: true,
          callLogin: true,
        });
        this.props.getLoginData({
          username: this.state.loginEmail,
          password: this.state.loginPassword,
        });
      }
    }
  };

  loginclickFun = () => {
    if (this.handleValidation()) {
      this.setState({
        popupCall: true,
        callLogin: true,
        loginLoaderData: true,
        loginError: undefined,
      });
      this.props.getAccessToken({
        username: this.state.loginEmail,
        password: this.state.loginPassword,
      });
    }
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleInputChange1 = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleInputContact = (event) => {
    console.log(event.target.id);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleContactUs = () => {
    this.setState({
      contactUsLink: true,
    });
  };
  addContact = () => {
    console.log(this.state.contactEmail);
    console.log(this.state.contactFirstName);
    console.log(this.state.contactLastName);
    console.log(this.state.contactPhone);
    console.log(this.state.contactMessage);
    if (this.handleContactValidation()) {
      var templateId = "template_Z5qdH6o5";
      var userId = "user_ITiNbOrT2K92w7Hhr2P61";
      var message =
        "First Name  : - " +
        this.state.contactFirstName +
        " " +
        "," +
        "Last Name : - " +
        this.state.contactLastName +
        " " +
        "," +
        "Email : - " +
        this.state.contactEmail +
        " " +
        "," +
        "Phone No : - " +
        this.state.contactPhone +
        " " +
        "," +
        "Message : - " +
        this.state.contactMessage +
        " " +
        ",";
      let templateParams = {
        from_name: this.state.contactFirstName,
        to_name: "customerservice@arabellabouquets.com",
        subject: "subject",
        message_html: message,
      };
      emailjs.send("gmail", templateId, templateParams, userId);
      this.setState({
        showContact: false,
        contactFirstName: undefined,
        contactLastName: undefined,
        contactEmail: undefined,
        contactPhone: undefined,
        contactMessage: undefined,
        errors5: {},
      });
      swal(
        "",
        "Thank you for contacting us, we will revert back to you withing 24 hours",
        "success"
      );
    }
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  handleChangeZip() {
    if (this.state.zipcode === "") {
      this.setState({
        zipcode: this.state.zipcodeInit,
        showPopup: false,
      });
      !this.props.apiToken && this.props.setZipcodeData(this.state.zipcodeInit);
    } else {
      this.setState({ showPopup: false });
      !this.props.apiToken && this.props.setZipcodeData(this.state.zipcode);
    }
  }

  handleValidation() {
    const errors = {};
    let formIsValid = true;
    console.log("test");
    console.log(this.state);

    // Email
    if (this.state.loginEmail === undefined) {
      formIsValid = false;
      errors.loginEmail = true;
    } else {
      errors.loginEmail = false;
    }

    if (
      typeof this.state.loginEmail !== "undefined" &&
      this.state.loginEmail !== ""
    ) {
      const lastAtPos = this.state.loginEmail.lastIndexOf("@");
      const lastDotPos = this.state.loginEmail.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.loginEmail.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state.loginEmail.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.loginEmail = true;
      } else {
        errors.loginEmail = false;
      }
    }

    if (this.state.loginPassword === undefined) {
      formIsValid = false;
      errors.loginPassword = true;
      console.log("true");
    } else {
      errors.loginPassword = false;
      console.log("false");
    }

    if (
      typeof this.state.loginPassword !== "undefined" &&
      this.state.loginPassword !== ""
    ) {
      if (this.state.loginPassword.length < 6) {
        formIsValid = false;
        errors.loginPassword = true;
        toast.error("Password length should be more than 6 character");
      } else {
        errors.loginPassword = false;
      }
    }
    this.setState({ errors });
    console.log(this.state);
    return formIsValid;
  }

  handleValidationRegister() {
    console.log(this.props.registerStatus);
    const errors = {};
    let formIsValid = true;

    //  FirstName
    if (this.state.firstName === undefined || this.state.firstName === "") {
      formIsValid = false;
      errors.firstName = "Please fill out this field";
    }

    // lastName
    if (this.state.lastName === undefined || this.state.lastName === "") {
      formIsValid = false;
      errors.lastName = "Please fill out this field";
    }
    // Email
    if (this.state.email === undefined || this.state.email === "") {
      formIsValid = false;
      errors.email = "Please fill out this field";
    }
    if (this.state.email !== undefined && this.state.email !== "") {
      const lastAtPos = this.state.email.lastIndexOf("@");
      const lastDotPos = this.state.email.lastIndexOf(".");
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.email = "Email is not valid";
      }
    }
    // telephone
    if (
      this.state.telephone === undefined ||
      this.state.telephone === "" ||
      this.state.telephone.length < 10
    ) {
      formIsValid = false;
      errors.telephone = "Please fill out this field";
    }

    // if (
    //   this.state.telephone === undefined ||
    //   this.state.telephone === "" ||
    //   this.state.telephone.length < 10
    // ) {
    //   formIsValid = false;
    //   errors.telephone = "Please Lengthen this text to 10 Numbers";
    //   // else {

    //   //   if (re.test(this.state.telephone)) {
    //   //     // formIsValid = true;
    //   //   } else {
    //   //     formIsValid = false;
    //   //     errors.telephone = "Please Provide Numeric value";
    //   //   }
    //   // }
    // }

    // password
    const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    if (
      this.state.password === undefined ||
      this.state.password === "" ||
      this.state.password.length < 6 ||
      !re.test(this.state.password)
    ) {
      console.log("error in password");
      formIsValid = false;
      errors.password = "Please fill out this field";
    }

    // if (this.state.password !== undefined) {
    //   if (this.state.password.length < 6) {
    //     formIsValid = false;
    //     errors.password = "Please enter 6 characters or more";
    //   }
    // }

    // confirm password
    if (
      this.state.confirmPassword === undefined ||
      this.state.confirmPassword === "" ||
      this.state.confirmPassword.length < 6 ||
      !re.test(this.state.confirmPassword)
    ) {
      console.log("error in password");
      formIsValid = false;
      errors.confirmPassword = "Please fill out this field";
    }

    // if (this.state.confirmPassword !== undefined) {
    //   if (this.state.confirmPassword.length < 6) {
    //     formIsValid = false;
    //     errors.confirmPassword = "Please enter 6 characters or more";
    //   }
    // }

    // match password
    if (
      this.state.password !== this.state.confirmPassword ||
      !re.test(this.state.password) ||
      !re.test(this.state.confirmPassword)
    ) {
      errors.confirmPassword = "Password and confirmPassword do not match";
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  handleCheck = () => {
    this.setState({ checked: !this.state.checked });
  };

  changeZipCodeData = () => {
    console.log(this.state.postalCode);
    this.props.setZipcodeData(this.state.postalCode);
    this.setState({
      showChangeAddress: false,
    });
  };

  maxLengthCheck = (e) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
  };

  customerRegisterData = () => {
    console.log(this.handleValidationRegister());
    if (this.handleValidationRegister()) {
      const reqBody = mapCustomerRegisterData(this.state);
      this.setState({
        regEmail: this.state.email,
        regPassword: this.state.password,
        // loginLoaderData: true,
      });
      console.log(reqBody);
      this.props.getRegisterData({
        customer: reqBody,
        password: this.state.password,
      });
      this.setState({
        isLoading: false,
        addLoginFromHere: true,
        registerCall: true,
      });
      //this.showLoginModal();
    }
  };

  handlePopupShow() {
    this.setState({ showPopup: true });
  }

  handlePopupClose() {
    this.setState({ showPopup: false });
  }

  handleExit() {
    this.setState({
      showLogin: false,
    });
    if (_isEmpty(this.props.apiToken)) {
      this.props.clearLoginData();
      this.props.hideLoginModal({ show: false });
    }
  }

  // showCart = () => {
  //   this.setState({
  //     showCartData: true,
  //     handleCartClick: true,
  //   });
  //   this.props.getCartData({ quoteId: this.state.cart_id });
  // };

  //showRegister = () => {
  //this.setState({
  // showLogin: false,
  //redirectRegister: true,
  //});
  //this.props.hideLoginModal({ show: false });
  //};

  showRegister = () => {
    this.setState({
      loginForm: false,
    });
  };

  forgotPassword = () => {
    this.setState({
      showLogin: false,
    });
    this.props.hideLoginModal({ show: false });
  };

  handleValidationForgot() {
    const errors = {};
    let formIsValid = true;
    console.log("test");
    console.log(this.state.forgotEmail);

    // Email
    if (this.state.forgotEmail === undefined) {
      formIsValid = false;
      errors.forgotEmail = "Required field.";
    }

    if (
      typeof this.state.forgotEmail !== "undefined" &&
      this.state.forgotEmail !== ""
    ) {
      const lastAtPos = this.state.forgotEmail.lastIndexOf("@");
      const lastDotPos = this.state.forgotEmail.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.forgotEmail.indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          this.state.forgotEmail.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors.forgotEmail = "Email is not valid";
      }
    }
    this.setState({ errors });
    return formIsValid;
  }

  customerForgotPassword = () => {
    console.log(this.state.forgotEmail);
    console.log(this.handleValidationForgot());
    if (this.handleValidationForgot()) {
      var reqObj = {
        email: this.state.forgotEmail,
        template: "email_reset",
        websiteId: 1,
      };
      this.setState({
        removeLoader: true,
        forgotEmail: "",
      });
      console.log(reqObj);
      this.props.getForgotPassword(reqObj);
    }
  };
  toggleCartDropdown = (elementId, menuElementId) => {
    const ele = document.getElementById(elementId);
    const eleMenu = menuElementId && document.getElementById(menuElementId);
    let claerClass;
    let clearClass;
    if (ele != null) {
      switch (elementId) {
        // eslint-disable-next-line no-case-declarations
        case "wishlistCart":
          ele.classList.toggle("hover-Menu-Class");
          eleMenu.classList.toggle("hover-Wishlist-cart");
          claerClass = () => {
            ele.classList.toggle("hover-Menu-Class");
          };
          setTimeout(claerClass, 1000);
          clearClass = () => {
            eleMenu.classList.toggle("hover-Wishlist-cart");
          };
          setTimeout(clearClass, 1000);
          this.props.updateCart({ showFavsCart: false });
          break;
        // eslint-disable-next-line no-case-declarations
        case "favouritesCart":
          ele.classList.toggle("hover-Menu-Class");
          eleMenu.classList.toggle("hover-Wishlist-cart");
          claerClass = () => {
            ele.classList.toggle("hover-Menu-Class");
          };
          setTimeout(claerClass, 1000);
          clearClass = () => {
            eleMenu.classList.toggle("hover-Wishlist-cart");
          };
          setTimeout(clearClass, 1000);
          this.props.updateCart({ showFavsCart: false });
          break;
        default:
          ele.classList.toggle("hoverClass");
          claerClass = () => {
            // alert('Hello');
            ele.classList.toggle("hoverClass");
          };
          setTimeout(claerClass, 1000);
          this.props.updateCart({ show: false });
      }
    }
  };

  populateAddress = (addressObj) => ({
    entity_id: _get(addressObj, "id", ""),
    customerId: _get(addressObj, "customer_id", ""),
    firstName: _get(addressObj, "firstname"),
    lastName: _get(addressObj, "lastname"),
    company: _get(addressObj, "company", ""),
    street1: _get(addressObj, "street[0]", ""),
    street2:
      _get(addressObj.street.length) <= 1
        ? ""
        : _get(addressObj, "street[1]", ""),
    //  street2: _get(addressObj.street) !== 1 ? '' : _get(addressObj, 'street[1]', ''),
    city: _get(addressObj, "city"),
    //region: _get(addressObj, 'region'),
    postcode: _get(addressObj, "postcode"),
    country_name: _get(addressObj, "country_id"),
    telephone: _get(addressObj, "telephone"),
    regionId: _get(addressObj, "region_id"),
  });

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ existEmail: nextProps.registerMessage });
    let data = [];
    let ratings = [];
    console.log(nextProps.forgotPasswordData);
    console.log(this.state.removeLoader);
    if (!_isEmpty(_get(nextProps, "newCartData"))) {
      console.log("abc", nextProps.newCartData[0]);
      if (nextProps.newCartData[0].status === true) {
        this.setState({
          loginUserCartCount: nextProps.newCartData[0].items.length,
        });
      } else {
        this.setState({
          loginUserCartCount: 0,
        });
      }
    }
    if (!_isEmpty(_get(nextProps, "newHomePageData"))) {
      if (_get(nextProps, "newHomePageData[0].status") === 200) {
        ratings = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[7].home_category_block.592"
        );
      }

      this.setState({
        ratings: ratings,
      });
    }
    if (!_isEmpty(_get(nextProps, "guestCartList"))) {
      console.log(nextProps.guestCartItems);
      // if (this.props.apiToken === "") {
      //   this.setState({ guestCartCount: nextProps.guestCartItems.length || 0 });
      // }
    }

    if (
      !_isEmpty(_get(nextProps, "RemoveFromCartData")) &&
      this.state.itemShow
    ) {
      toast.success("Cart Product deleted Successfully!", {
        className: "toast_style",
      });
      this.props.getCart(this.props.apiToken);
      this.setState({
        //shipShow: false,
        itemShow: false,
      });
    }

    if (nextProps.forgotPasswordStatus === 404 && this.state.removeLoader) {
      this.setState({
        removeLoader: false,
      });
      toast.error("EmailId does not Exist");
    }

    if (nextProps.forgotPasswordData === true && this.state.removeLoader) {
      console.log(nextProps.forgotPasswordData);
      this.setState({
        removeLoader: false,
        showForgot: false,
        forgotEmail: "",
      });
      toast.success("Email sent for change password");
    }
    console.log(this.props.registerStatus);
    console.log(this.props.registerMessage);
    if (nextProps.custId !== "" && this.state.showAddress) {
      this.props.getAllAddressData(nextProps.custId);
      this.props.fetchShippingAddress(nextProps.custId);
      this.props.fetchBillingAddress(nextProps.custId);
      this.setState({
        showAddress: false,
      });
    }
    if (!_isEmpty(nextProps.allAddressData)) {
      data = nextProps.allAddressData.addresses;
      const allAddresses = nextProps.allAddressData.addresses;
      const billingAddressId = nextProps.allAddressData.default_billing;
      const shippingAddressId = nextProps.allAddressData.default_shipping;
      let billingAddress = "";
      let shippingAddress = "";
      console.log(allAddresses);
      console.log(billingAddressId);
      console.log(shippingAddressId);

      const otherAddress =
        allAddresses.length &&
        allAddresses
          .map((eachAddress) => {
            console.log("same", eachAddress);
            console.log("sameb", eachAddress.id);
            console.log("samebb", billingAddressId);
            console.log("same1", eachAddress.id === parseInt(billingAddressId));
            console.log(
              "same2",
              eachAddress.id === parseInt(shippingAddressId)
            );
            if (
              eachAddress.id === parseInt(billingAddressId) &&
              eachAddress.id === parseInt(shippingAddressId)
            ) {
              console.log("same3");
              billingAddress = this.populateAddress(eachAddress);
              shippingAddress = billingAddress;
            } else if (eachAddress.id === parseInt(billingAddressId)) {
              billingAddress = this.populateAddress(eachAddress);
            } else if (eachAddress.id === parseInt(shippingAddressId)) {
              shippingAddress = this.populateAddress(eachAddress);
            } else return this.populateAddress(eachAddress);
          })
          .filter((o) => o);
      console.log(billingAddress);
      console.log(shippingAddress);

      this.setState({
        allAddresses,
        billingAddressId,
        shippingAddressId,
        billingAddress,
        shippingAddress,
        otherAddress,
        addressData: this.createChildren({ data }),
      });
    }
    if (this.state.registerCall) {
      console.log(nextProps.registerData);
      console.log(this.props.registerStatus);
      if (!_isEmpty(nextProps.registerData)) {
        this.showLoginModal();
        console.log("test 200");
        toast.success("You Registered Successfully.");
        //swal("", "You Registered Successfully.", "success");
        console.log("email", this.state.regEmail);
        console.log("password", this.state.regPassword);
        this.props.getAccessToken({
          username: this.state.regEmail,
          password: this.state.regPassword,
        });
        this.setState({
          popupCall: true,
          callLogin: true,
          registerCall: false,
        });
        this.props.clearRegData();
        this.setState({
          firstName: undefined,
          lastName: undefined,
          email: undefined,
          telephone: undefined,
          password: undefined,
          confirmPassword: undefined,
          company: "NA",
          streetAddress: "NA",
          city: "NA",
          zipCode: "NA",
          country: "NA",
          state: "NA",
          taxId: "NA",
          newsletSub: "NA",
          registerCall: true,
        });
      }

      if (nextProps.registerStatus === 400) {
        console.log(this.state.existEmail);
        this.setState({
          registerCall: false,
          errors: { email: "Email is not valid" },
        });
        console.log("test 300", nextProps.registerMessage);

        toast.error(nextProps.registerMessage);

        // this.props.clearRegData();
      }
    }
    console.log(this.state.existEmail);
    if (
      nextProps.tokenType === "RECEIVED_TOKEN_CONSTANTS" &&
      this.state.callLogin
    ) {
      console.log(this.state.callLogin);
      console.log(this.props.apiToken);
      console.log(this.props.maskId);
      if (this.props.maskId !== undefined) {
        this.props.getGuestConvertCartList(
          { mask_id: this.props.maskId },
          nextProps.apiToken
        );
        setTimeout(() => {
          console.log("getCart");
          //this.props.getCart(nextProps.apiToken);
        }, 2000);

        this.setState({
          showConvert: true,
          headeSlider: false,
        });
      } else {
        //this.props.getCartData(nextProps.apiToken);
        this.props.getCart(nextProps.apiToken);
      }

      this.props.getLoginData(nextProps.apiToken);

      this.setState({
        callLogin: false,
        showLogin: false,
        showAddress: true,
        loginResponse: true,
        loginError: undefined,
        loginLoaderData: false,
        headeSlider: false,
      });
    }

    if (!_isEmpty(nextProps.loginResponseData) && this.state.loginResponse) {
      this.setState({
        loginLoaderData: false,
        loginResponse: false,
        headeSlider: false,
      });
    }
    if (this.state.showConvert && nextProps.cartConvertResponse !== undefined) {
      //this.props.getCartData(this.props.apiToken);
      console.log(nextProps.cartConvertResponse);
      this.props.getCart(this.props.apiToken);
      //this.props.getBillState('US');
      this.setState({
        showConvert: false,
      });
    }
    if (
      !_isEmpty(_get(nextProps, "firstCartData")) &&
      this.state.shipShow === false
    ) {
      console.log(nextProps.firstCartData);
      this.setState({
        cartResult: nextProps.firstCartData,
        productDetails: nextProps.firstCartData.items,
        cartDataId: nextProps.firstCartData.id,
        itemCount: nextProps.firstCartData.items_count,
      });
    }

    if (
      nextProps.tokenType === "REQUEST_TOKEN_CONSTANTS_ERROR" &&
      this.state.callLogin
    ) {
      //alert("Invalid EmailId & password!");
      this.setState({
        loginLoaderData: false,
        loginError: "Invalid EmailId & password!",
        callLogin: false,
        errorList: true,
        loginLoader: false,
      });
    }
    if (!_isEmpty(_get(nextProps, "newHomePageData"))) {
      // console.log(_get(nextProps, 'homePageData[0].status'));
      //console.log(_get(nextProps, 'homePageData[0].response.categoryList'));
      if (_get(nextProps, "newHomePageData[0].status") === 200) {
        //  console.log('test sdsh');
        var topData = [];
        for (
          var i = 0;
          i <
          nextProps.newHomePageData[0].response.categoryList.header.top_menu
            .length;
          i++
        ) {
          topData.push(
            nextProps.newHomePageData[0].response.categoryList.header.top_menu[
              i
            ]
          );
        }
        this.setState({
          header: topData,
          homeLoading: false,
        });
      }
      //  console.log(this.state.categoryData);
    }

    console.log("**********");

    /* getting autocomplete data from header searched  */
    /*if (
      !_isEmpty(_get(nextProps, "headerSearchList")) &&
      this.state.showSearchLoader
    ) {
      console.log(nextProps.headerSearchList);
      console.log(this.state.searchText);
      let data = [];
      if(nextProps.headerSearchList.items !== null)
      {
      for (var i = 0; i < nextProps.headerSearchList.items.length; i++) {
        // if(nextProps.autoCompleteData.items[i].qty > 0)
        //{
        data.push(nextProps.headerSearchList.items[i]);
        // }
      }
    }
      this.setState(() => ({
        searchData: data,
        mouseEvent: true,
        showSearchLoader: false,
      }));
      if (this.state.searchText) {
        this.setState(() => ({
          searchData: data,
          mouseEvent: true,
        }));
      }
    }*/

    if (
      !_isEmpty(_get(nextProps, "autoCompleteData")) &&
      this.state.showSearchLoader
    ) {
      console.log(nextProps.autoCompleteData);
      console.log(this.state.searchText);
      let data = [];
      for (var i = 0; i < nextProps.autoCompleteData.items.length; i++) {
        // if(nextProps.autoCompleteData.items[i].qty > 0)
        //{
        data.push(nextProps.autoCompleteData.items[i]);
        // }
      }
      this.setState(() => ({
        searchData: data,
        mouseEvent: true,
        showSearchLoader: false,
        //enableDrawer: false,
      }));
      if (this.state.searchText) {
        this.setState(() => ({
          searchData: data,
          mouseEvent: true,
          // enableDrawer: false,
        }));
      }
    }

    if (
      !_isEmpty(_get(nextProps, "guestDeleteCartResponse")) &&
      this.state.itemGuestDeleteShow
    ) {
      // alert("Cart delete");
      toast.success("Cart Product deleted Successfully!", {
        className: "toast_style",
      });
      console.log(this.props.maskId);
      this.props.getGuestList(this.props.maskId);
      this.setState({
        // shipGuestShow: true,
        itemGuestDeleteShow: false,
      });
    }

    if (
      !_isEmpty(_get(nextProps, "showLoginModal")) &&
      _get(nextProps, "showLoginModal.show")
    ) {
      this.handleShow("login");
    }
  }

  addShow = (e) => {
    console.log(e);
    const selectedAddress = {
      addressId: e.id,
      firstName: e.firstname,
      middleName: e.middlename,
      lastName: e.lastname,
      company: e.company,
      telephone: e.telephone,
      streetAddress1: e.street[0],
      streetAddress2: e.street.length <= 1 ? "" : e.street[1],
      city: e.city,
      postalCode: e.postcode,
      stateId: e.region_id,
    };
    this.setState({
      shipAddressPopupData: selectedAddress,
    });
    console.log(e);
    this.props.setZipcodeData(e.postcode);
    this.setState({
      showChangeAddress: false,
    });
  };

  createChildren = ({ data }) =>
    Object.keys(data).map((i) => (
      <div onClick={() => this.addShow(data[i])}>
        <center>
          <div
            style={{
              border: "1px solid #f96495",
              height: "175",
              width: "200px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                border: "1px solid #f96495",
                backgroundColor: "rgb(245, 245, 245)",
                textTransform: "none",
                padding: "10px",
              }}
            >
              Address
            </div>
            <address>
              <br />
              {_get(data[i], "firstname")}
              <br />
              {_get(data[i], "lastname")}
              <br />
              {_get(data[i], "company")}
              <br />
              {_get(data[i], "street[0]")}
              <br />
              {_get(data[i], "city")}, {_get(data[i], "region.region")},{" "}
              {_get(data[i], "postcode")}
              <br />
              {_get(data[i], "country_id")}
              <br />
            </address>
          </div>
        </center>
      </div>
    ));

  handleEmailChange = (event) => {
    // console.log('event:', event.target.value);
    this.setState({ subscribeEmail: event.target.value });
  };

  handleSubscribe = () => {
    this.props.postNewsletterSubscription({
      emailId: this.state.subscribeEmail,
    });
  };

  UNSAFE_componentWillMount() {
    //this.props.getLoginData();
    if (this.props.stateListData !== undefined) {
      this.props.getStateListData();
    }
    // if (this.props.zipcode === "") {
    //   fetch("https://geoip-db.com/json/")
    //     .then((response) => response.json())
    //     .then((json) => {
    //       const ipAddress = json.IPv4;
    //       console.log(ipAddress);
    //       this.props.getZipcodeData(ipAddress);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    // }
    // this.props.getCategoriesData({
    //   currencyCode: this.props.currencyCode,
    //   apiToken: this.props.apiToken,
    //   storeId: this.props.storeId,
    //   // sort: this.state.sortValue,
    //   // pageNo: 1,
    // });
    if (this.props.cartCount) {
      this.setState({
        totalProdInCart: this.props.cartCount,
        subtotal: this.props.cartTotal,
        totalProd: this.props.cartProducts,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  componentDidMount() {
    console.log(this.state);
    var dat = this.props.location.pathname.substr(
      this.props.location.pathname.length - 4
    );
    if (dat === "html") {
      this.setState({
        stateUrl: true,
      });
    }
    console.log(this.props);
    setTimeout(() => {
      this.setState({
        showFullLoader: false,
      });
    }, 2000);
    this.props.receiveHideLoginModalData();
    //const copyCartObj = JSON.parse(localStorage.getItem("cart"));
    //console.log(copyCartObj);
    //this.setState({ cartDataShow : copyCartObj });
    this.props.clearRegData();
    //localStorage.removeItem("cart");
    // console.log(window.orientation);
    //if(this.props.apiToken)
    //{
    // this.props.getCartData(this.props.apiToken);
    //}
    window.addEventListener("resize", this.handleWindowSizeChange);
    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };

    document.addEventListener("click", this.handleClickOutside, true);
    this.setState(() => ({
      searchedData: {},
      loginForm: true,
    }));

    window.addEventListener("scroll", () => {
      const element = document.getElementById("slideNav");
      const elementWantclassName1 = document.getElementById("bkmLogo");
      const elementWantclassName2 = document.getElementById("desktopOnly");
      const h = window.innerHeight;
      if (h > 80) {
        if (window.scrollY > 30) {
          this.setState({ navbarFixedTop: "navbar-fixed-top" });
          element && element.classList.add("animated");
          elementWantclassName1 &&
            elementWantclassName1.classList.add("scroll");
          elementWantclassName2 &&
            elementWantclassName2.classList.add("scroll");
        } else {
          this.setState({ navbarFixedTop: "" });
          element && element.classList.remove("animated");
          elementWantclassName1 &&
            elementWantclassName1.classList.remove("scroll");
          elementWantclassName2 &&
            elementWantclassName2.classList.remove("scroll");
        }
      }

      // if (this.props.zipcode === "") {
      //   fetch("https://geoip-db.com/json/")
      //     .then((response) => response.json())
      //     .then((json) => {
      //       const ipAddress = json.IPv4;
      //       console.log(ipAddress);
      //       this.props.getZipcodeData(ipAddress);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
      // }
    });

    //console.log("data123", "test Data");

    this.props.getHomePage();
    //  console.log(this.props);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillUnmount() {
    console.log("test 22");
    window.removeEventListener("resize", this.handleWindowSizeChange);
    document.removeEventListener("click", this.handleClickOutside, true);
    this.setState(() => ({
      isOpen: false,
      mouseEvent: false,
      searchText: "",
    }));
  }

  showLoginData = () => {
    this.setState({
      loginForm: true,
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      telephone: undefined,
      password: undefined,
      confirmPassword: undefined,
      company: "NA",
      streetAddress: "NA",
      city: "NA",
      zipCode: "NA",
      country: "NA",
      state: "NA",
      taxId: "NA",
      newsletSub: "NA",
    });
  };

  showHomePage = () => {
    this.setState({
      homeLink: true,
    });
  };

  showLoginFromPass = () => {
    this.setState({
      showLogin: true,
      loginForm: true,
    });
  };

  showRegisterData = () => {
    this.setState({
      showLogin: true,
      loginForm: false,
    });
  };

  /* for Header Search Box. */
  handleClickSearch = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.
      mouseEvent: false,
    });
  };
  keyPress = (e) => {
    let inputValue = null;

    console.log(e.key);
    inputValue = e.target.value;
    console.log(inputValue);
    this.setState({
      searchHandle: true,
    });
    if (e.key === "Enter") {
      console.log(inputValue);
      this.setState({
        showSearch: false,
        mouseEvent: false,
        headerSearchRedirect: true,
        searchHandle: false, // uncheck for redirection.
        searchText: inputValue,
        showSearchLoader: true,
        enableDrawer: false,
        //searchData:[],
      });
    } else {
      // eslint-disable-next-line no-lonely-if
      if (inputValue.length > 1) {
        console.log("inside");
        this.setState({
          showSearchLoader: true,
        });
        // this.props.fetchAllHeaderSearch(inputValue);
        this.props.getCategoryAutoCompleteData(inputValue);
      } else {
        console.log("outside");
        this.setState(() => ({
          searchedData: {},
        }));
        return null;
      }
    }
    return false;
  };
  // show autocomplete if data is already there.
  handleMouseEvent = (event) => {
    if (!event.target.value) {
      this.setState(() => ({
        searchedData: {},
      }));
    } else {
      this.setState(() => ({ mouseEvent: true }));
    }
  };
  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleAllResultRedirection = () => {
    this.setState({
      headerSearchRedirect: true, // uncheck for redirection.

      mouseEvent: false,
    });
  };

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside = (event) => {
    console.log(event);
    this.setState(() => ({ mouseEvent: false, searchText: "" }));
  };
  handleClose() {
    this.setState({ showLogin: false });
  }

  handleShow = (id) => {
    // if (window.screen.width >= 768) {
    this.setState({ showLogin: true });
    // } else {
    //   this.state.condition && this.setState({ condition: !this.state.condition });
    //   this.props.history.push(id === 'login' ? '/login' : '/register');
    // }
  };
  mblMenu() {
    this.setState({ condition: !this.state.condition });
  }

  toggleOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  toggleOpen1 = () => {
    this.setState({ isOpen1: !this.state.isOpen1 });
  };
  toggleOpen2 = () => {
    this.setState({ isOpen2: !this.state.isOpen2 });
  };
  toggleOpen3 = () => {
    this.setState({ isOpen3: !this.state.isOpen3 });
  };
  onSearchTextChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ searchText: value }));
  };
  handleClick = () => {
    this.props.history.push("/view-cart");
  };
  handleClickForMyAccount = () => {
    this.props.history.push("/customer/account");
  };
  showProductDetailPage = (productId, urlKey) => {
    this.setState(() => ({
      url: urlKey,
      productId,
      mouseEvent: false,
    }));
  };

  removeProduct = (cartRid) => {
    console.log(cartRid);
    this.props.getaddRemoveUpdateProduct(cartRid, this.props.apiToken);
    this.setState({
      itemShow: true,
    });
  };

  removeGuestProduct = (cartRid) => {
    console.log(cartRid);
    this.props.guestRemove(cartRid);
    this.setState({
      itemGuestDeleteShow: true,
    });
  };

  handleMouseEnter = () => {
    this.setState({ showLargeDropDowns: "custom-class-trail" });
  };

  handleMouseLeave = () => {
    this.setState({ showLargeDropDowns: "" });
  };

  showLoginModal = () =>
    this.setState((prevState) => ({
      loginForm: true,
      enableDrawer: false,
      showLogin: !prevState.showLogin,
    }));

  showDrawer = () =>
    this.setState((prevState) => ({
      enableDrawer: !prevState.enableDrawer,
    }));

  showSearchModal = () =>
    this.setState((prevState) => ({
      showSearch: !prevState.showSearch,
    }));

  showContactModal = () =>
    this.setState((prevState) => ({
      showContact: !prevState.showContact,
      enableDrawer: false,
      headeSlider: false,
    }));

  showForgotModal = () =>
    this.setState((prevState) => ({
      showLogin: false,
      showForgot: !prevState.showForgot,
    }));

  showDataModal = () => {
    console.log("close modal");
    this.setState((prevState) => ({
      showLogin: !prevState.showLogin,
    }));
  };

  showAddressModal = () =>
    this.setState((prevState) => ({
      showChangeAddress: !prevState.showChangeAddress,
    }));

  onSlideChange(e) {
    console.debug("Item`s position during a change: ", e.item);
    console.debug("Slide`s position during a change: ", e.slide);
  }

  onSlideChanged(e) {
    console.debug("Item`s position after changes: ", e.item);
    console.debug("Slide`s position after changes: ", e.slide);
  }

  getData = (data) => {
    console.log(data);
    this.props.setCatDesc(data.description);
    this.props.setCatName(data.name);
    this.setState({
      enableDrawer: false,
      catData: data,
      link: true,
      headeSlider: false,
    });
  };

  getAccountData = () => {
    console.log();
    this.setState({
      enableDrawer: false,
      myAccountLink: true,
      headeSlider: false,
    });
  };

  getCartData = () => {
    console.log();
    this.setState({
      enableDrawer: false,
      viewCartLink: true,
      headeCartSlider: false,
    });
  };

  handleAddAddress = () => {
    this.setState({
      showChangeAddress: false,
    });
    // setTimeout(() => {
    this.props.history.push("/customer/account/address/new");
    // }, 2000);
  };

  changeBillingAddress = (d) => {
    console.log(d);
    this.props.setZipcodeData(d);
    this.setState({
      showChangeAddress: false,
    });
  };

  headerFoot = () => {
    console.log(this.state.headerFooter);
    this.setState({
      footer: true,
    });
  };

  showHeaderSlider = () =>
    this.setState((prevState) => ({
      headeSlider: !prevState.headeSlider,
    }));

  showHeaderCartSlider = () =>
    this.setState((prevState) => ({
      headeCartSlider: !prevState.headeCartSlider,
    }));

  /*showBelowData = (d) => {
    console.log(d);
    //var data="showData"+d;
    // console.log(data);
    if (d === "74") {
      this.setState({
        showData74: this.state.showData74 === true ? false : true,
      });
    }
    if (d === "63") {
      this.setState({
        showData63: this.state.showData63 === true ? false : true,
      });
    }
  };*/

  showBelowData = (d) => {
    console.log(d);
    //console.log(showToggle);
    //console.log(showData74);

    if (this.state.showToggle) {
      this.setState({
        showToggle: false,
        showData74: d,
      });
    } else {
      this.setState({
        showToggle: true,
        showData74: d,
      });
    }
  };

  showBelowData2 = (g) => {
    console.log(g);
    //console.log(showToggle);
    //console.log(showData74);

    if (this.state.showToggle2) {
      this.setState({
        showToggle2: false,
        showData88: g,
      });
    } else {
      this.setState({
        showToggle2: true,
        showData88: g,
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    //  console.log(this.state);
    // console.log(this.props);
    const { width } = this.state;
    const isMobile = width <= 500;
    // console.log(isMobile);
    if (isMobile) {
      //console.log('mobile');
    } else {
      //console.log('web');
    }

    if (this.state.footer) {
      this.setState({
        footer: false,
      });

      return (
        <Redirect
          push
          to={{
            pathname: "/Shop-By-City",
            state: { footerData: this.state.headerFooter.child_data },
          }}
        />
      );
    }

    if (this.state.redirectRegister) {
      return (
        <Redirect
          to={{
            pathname: "/register",
          }}
        />
      );
    }

    if (this.state.viewCartLink) {
      this.setState({
        viewCartLink: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname: "/view-cart",
          }}
        />
      );
    }
    if (this.state.contactUsLink) {
      this.setState({
        contactUsLink: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname: "/contactus",
          }}
        />
      );
    }
    if (this.state.homeLink) {
      this.setState({
        homeLink: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname: "/",
          }}
        />
      );
    }

    if (this.state.myAccountLink) {
      this.setState({
        myAccountLink: false,
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

    if (this.state.stateUrl) {
      this.setState({
        stateUrl: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname: "/",
          }}
        />
      );
    }

    if (this.state.link) {
      this.setState({
        link: false,
      });
      if (this.state.catData.name === "ABOUT US") {
        return (
          <Redirect
            push
            to={{
              pathname: "/about-us",
            }}
          />
        );
      } else {
        return (
          <Redirect
            push
            to={{
              pathname:
                "/catalog/category/view/s/" +
                this.state.catData.seo_details.url_key +
                "/id/" +
                this.state.catData.id,
              state: {
                catName: this.state.catData.name,
                catDesc: this.state.catData.short_description,
                catImage: this.state.catData.image,
                seoDetails: this.state.catData.seo_details,
                catAllData: this.state.catData,
              },
            }}
          />
        );
      }
    }

    if (this.state.showFullLoader) {
      return (
        <div>
          {/* <center>
            <img
              src={lazyLoader}
              style={{ height: "126px", marginTop: "300px" }}
              alt="lazy-loader"
            />
          </center> */}
        </div>
      );
    }

    const menuClass = `dropdown-menu ${this.state.isOpen ? "show" : ""}`;
    const menuClass1 = `dropdown-menu ${this.state.isOpen1 ? "show" : ""}`;
    const menuClass2 = `dropdown-menu ${this.state.isOpen2 ? "show" : ""}`;
    const menuClass3 = `dropdown-menu ${this.state.isOpen3 ? "show" : ""}`;
    const { searchText, searchedData, mouseEvent } = this.state;
    const prodList = _get(searchedData, "productIdlist");
    const prodListData = _get(searchedData, "searchProdResult");
    //console.log(this.state.headerSearchRedirect)
    console.log(this.state.searchData);
    if (this.state.headerSearchRedirect) {
      this.setState({
        headerSearchRedirect: false,
        searchHandle: false,
        enableDrawer: false,
        mouseEvent: false,
      });
      return (
        <Redirect
          to={{
            pathname: "/catalogsearch/result/",
            search: "",
            state: { searchedData, searchText },
          }}
        />
      );
    }

    let deliverToZip;
    if (this.state.showMsg) {
      deliverToZip = (
        <div className="deliver-pincode-link-div">
          <a
            className="link-account"
            id="link-Register"
            onClick={this.handlePopupShow}
            title=""
          >
            Deliver to <strong>{this.state.zipcode}</strong>
          </a>
        </div>
      );
    }

    console.log(
      this.state.firstName,
      this.state.lastName,
      this.state.email,
      this.state.telephone,
      this.state.password,
      this.state.confirmPassword
    );
    return (
      <div className="App">
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />

        <div
          id="app"
          style={{ position: "relative", minHeight: "100vh" }}
          onClick={() => {
            this.setState({ searchHandle: false });
          }}
        >
          <div>
            <header className="header--style-1" id="header--style1">
              <nav className="secondary-nav-wrapper">
                <div className="header-items">
                  <div className="menu-init main-logo-margin header-logo purelogo2">
                    <img
                      className="header-logo"
                      onClick={this.showHomePage}
                      src={purelogo}
                      alt="purelogo"
                    />
                    <img
                      src={textLogo}
                      alt="purelogo"
                      className="header-logo-text"
                      onClick={this.showHomePage}
                    />
                  </div>
                  <div className="menu-init">
                    <div className="header-cart-section">
                      <button
                        onClick={this.showDrawer}
                        className="btn--icon toggle-button toggle-button--secondary drw_icon"
                        type="button"
                      >
                        &#9776;
                      </button>
                      <div className="top-cart">
                        {this.props.apiToken !== "" ? (
                          <a className="mini-cart-shop-link">
                            <i
                              className="fa fa-shopping-cart"
                              onClick={() => {
                                this.getCartData();
                              }}
                            ></i>

                            <span className="total-item-round1">
                              {this.state.loginUserCartCount || 0}
                            </span>
                            <br />
                          </a>
                        ) : (
                          <a className="mini-cart-shop-link">
                            <i
                              className="fa fa-shopping-cart"
                              onClick={() => this.getCartData()}
                            ></i>

                            {
                              this.props.guestCartList.length !== 0 &&
                                this.props.guestCartList[0].status !==
                                  false && (
                                  <span className="total-item-round1">
                                    {0 || this.state.guestCartCount}
                                  </span>
                                )
                              // : (
                              //   <span
                              //     className="total-item-round1"

                              //   >
                              //     {this.props.newCartData.length !== 0 &&
                              //     this.props.cartStatus &&
                              //       <span className="total-item-round1">{this.props.newCartData[0].items.length}</span>
                              //     }
                              //   </span>
                              // )
                            }
                            <br />
                          </a>
                        )}
                      </div>
                      <div
                        className={
                          this.state.enableDrawer
                            ? "ah-lg-mode-1 slider-margin"
                            : "ah-lg-mode slider-margin"
                        }
                      >
                        <span className="ah-close">
                          {this.props.apiToken === "" ? (
                            <span
                              style={{ float: "left", marginLeft: "10px" }}
                              onClick={(this.showDrawer, this.showLoginModal)}
                            >
                              Sign In
                            </span>
                          ) : (
                            <span
                              style={{
                                float: "left",
                                marginLeft: "10px",
                                textTransform: "capitalize",
                              }}
                              onClick={() => this.getAccountData()}
                            >
                              Hi,{this.props.userFirstName}
                            </span>
                          )}

                          <a onClick={this.showDrawer}>✕</a>
                        </span>

                        {this.state.enableDrawer ? (
                          <div>
                            <form
                              className="main-form mn_frm34"
                              autoComplete="off"
                            >
                              <label for="main-search"></label>
                              <div
                                style={{
                                  display: "flex",
                                  position: "relative",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  onKeyPress={this.keyPress}
                                  autoComplete="off"
                                  className="input-text input-text-margin-20p"
                                  type="text"
                                  id="main-search"
                                  name="searchData"
                                  placeholder="Search"
                                />
                                {this.state.showSearchLoader === false ? (
                                  <div className="min-search-mob">
                                    <button className="btn--icon fas fa-search main-search-button-icon"></button>
                                  </div>
                                ) : (
                                  <div className="min-search-mob">
                                    <div
                                      className="min-spinner-border btn--icon"
                                      style={{}}
                                    ></div>
                                  </div>
                                )}
                              </div>

                              {this.state.searchData.length !== 0 &&
                                this.state.searchHandle === true && (
                                  <Suggetion
                                    searchedData={this.state.searchData}
                                    searchText={this.state.searchText}
                                  />
                                )}
                            </form>

                            <ul
                              className="ah-list ah-list--design2 ah-list--link-color-secondary"
                              style={{ marginTop: "-10px" }}
                            >
                              <li
                                className="has-dropdown"
                                style={{ marginLeft: "-5px" }}
                              >
                                <a
                                  onClick={this.showHomePage}
                                  style={{ color: "#fff" }}
                                >
                                  <span>Home</span>
                                </a>
                              </li>
                              {this.state.header !== undefined &&
                                this.state.header.map((contact) => (
                                  <li
                                    className="has-slide-dropdown"
                                    style={{ marginLeft: "-5px" }}
                                  >
                                    <a
                                      style={{ color: "white" }}
                                      onClick={() => this.getData(contact)}
                                    >
                                      {contact.name}
                                      {contact.child_data.length !== 0 && (
                                        <i className="fas fa-angle-down u-s-m-l-6"></i>
                                      )}
                                    </a>
                                    {contact.child_data.length !== 0 && (
                                      <a
                                        onClick={() =>
                                          this.showBelowData(contact.id)
                                        }
                                      >
                                        {this.state.showToggle &&
                                        contact.id === this.state.showData74 ? (
                                          <span className="js-menu-toggle js-toggle-mark"></span>
                                        ) : (
                                          <span className="js-menu-toggle"></span>
                                        )}
                                      </a>
                                    )}
                                    {contact.child_data.length !== 0 &&
                                      contact.id === this.state.showData74 &&
                                      this.state.showToggle && (
                                        <ul>
                                          {contact.child_data.map(
                                            (contact1) => (
                                              <li className="has-slide-dropdown">
                                                <a
                                                  style={{ color: "white" }}
                                                  onClick={() =>
                                                    this.getData(contact1)
                                                  }
                                                >
                                                  {contact1.name}

                                                  {contact1.child_data
                                                    .length !== 0 && (
                                                    <i className="fas fa-angle-down u-s-m-l-6"></i>
                                                  )}
                                                </a>
                                                {contact1.child_data.length !==
                                                  0 && (
                                                  <a
                                                    onClick={() =>
                                                      this.showBelowData2(
                                                        contact1.id
                                                      )
                                                    }
                                                  >
                                                    {this.state.showToggle2 &&
                                                    contact1.id ===
                                                      this.state.showData88 ? (
                                                      <span className="js-menu-toggle2 js-toggle-mark2"></span>
                                                    ) : (
                                                      <span className="js-menu-toggle2"></span>
                                                    )}
                                                  </a>
                                                )}
                                                {contact1.child_data.length !==
                                                  0 &&
                                                  contact1.id ===
                                                    this.state.showData88 &&
                                                  this.state.showToggle2 && (
                                                    <ul>
                                                      {contact1.child_data.map(
                                                        (contact2) => (
                                                          <li className="has-slide-dropdown">
                                                            <a
                                                              style={{
                                                                color: "white",
                                                              }}
                                                              onClick={() =>
                                                                this.getData(
                                                                  contact2
                                                                )
                                                              }
                                                            >
                                                              {contact2.name}
                                                            </a>
                                                          </li>
                                                        )
                                                      )}
                                                    </ul>
                                                  )}
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                  </li>
                                ))}
                              <li
                                className="has-dropdown"
                                style={{ marginLeft: "-5px" }}
                              >
                                <a href="" style={{ color: "#fff" }}>
                                  <span>Blog</span>
                                </a>
                              </li>
                              <li
                                className="has-dropdown"
                                style={{ marginLeft: "-5px" }}
                              >
                                <a href="" style={{ color: "#fff" }}>
                                  <span>Our Story</span>
                                </a>
                              </li>
                              <li
                                className="has-dropdown"
                                style={{ marginLeft: "-5px" }}
                              >
                                <a
                                  style={{ color: "#fff" }}
                                  onClick={this.handleContactUs}
                                >
                                  <span>Contact Us</span>
                                </a>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "100%",
                            }}
                          >
                            <form className="main-form" autoComplete="off">
                              <label htmlFor="main-search"></label>
                              <div>
                                <input
                                  type="text"
                                  name="searchData"
                                  placeholder="Search for products"
                                  onKeyPress={this.keyPress}
                                  autoComplete="off"
                                  className="input-text input-text--border-radius input-text--style-1 search-input-style"
                                />
                                {this.state.showSearchLoader === false ? (
                                  <div className="search-btn-div">
                                    <button className="btn--icon fas fa-search main-search-button"></button>
                                  </div>
                                ) : (
                                  <div className="search-btn-div">
                                    <div
                                      className="spinner-border btn--icon"
                                      style={{}}
                                    ></div>
                                  </div>
                                )}
                              </div>

                              {this.state.searchData.length !== 0 &&
                                this.state.searchHandle === true && (
                                  <Suggetion
                                    searchedData={this.state.searchData}
                                    searchText={this.state.searchText}
                                    //open={this.state.showSearch}
                                    //handleCloseModal={this.showSearchModal}
                                  />
                                )}
                            </form>
                            {/*   </ul>  */}

                            <ul
                              className="ah-list ah-list--design2 ah-list--link-color-secondary ah-lst-sec2"
                              style={{
                                display: "flex",

                                columnGap: "20px",
                              }}
                            >
                              {/* <li
                                class="has-dropdown"
                                style={{ marginLeft: "-5px" }}
                              >
                                <a onClick={this.showHomePage}>
                                  <span>Home</span>
                                </a>
                              </li> */}
                              {this.state.header !== undefined &&
                                this.state.header.map((contact) => (
                                  <li
                                    className="has-dropdown"
                                    style={{ padding: "5px" }}
                                  >
                                    <a onClick={() => this.getData(contact)}>
                                      {contact.name}
                                      {contact.child_data.length !== 0 && (
                                        <i className="fas fa-angle-down u-s-m-l-6"></i>
                                      )}
                                    </a>
                                    {contact.child_data.length !== 0 && (
                                      <span className="js-menu-toggle"></span>
                                    )}
                                    {contact.child_data.length !== 0 && (
                                      <ul
                                        style={{
                                          maxWidth: "205px",
                                          marginLeft: "-1%",
                                          marginTop: "-315px",
                                        }}
                                      >
                                        {contact.child_data.map((contact1) => (
                                          <li className="has-dropdown has-dropdown--ul-left-100">
                                            <a
                                              onClick={() =>
                                                this.getData(contact1)
                                              }
                                            >
                                              {contact1.name}

                                              {contact1.child_data.length !==
                                                0 && (
                                                <i className="fas fa-angle-right u-s-m-l-6"></i>
                                              )}
                                            </a>
                                            {contact1.child_data.length !==
                                              0 && (
                                              <span className="js-menu-toggle"></span>
                                            )}
                                            {contact1.child_data.length !==
                                              0 && (
                                              <ul
                                                style={{
                                                  width: "180px",
                                                  marginTop: "13px",
                                                  marginLeft: "18px",
                                                  display: "block",
                                                }}
                                              >
                                                {contact1.child_data.map(
                                                  (contact2) => (
                                                    <li className="has-dropdown has-dropdown--ul-left-100">
                                                      <a
                                                        onClick={() =>
                                                          this.getData(contact2)
                                                        }
                                                      >
                                                        {contact2.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            )}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              {/* <li class="has-dropdown" style={{ padding: "5px" }}>
                                <a href="">
                                  <span>Blog</span>
                                </a>
                              </li>
                              <li class="has-dropdown" style={{ padding: "5px" }}>
                                <a href="">
                                  <span>Our Story</span>
                                </a>
                              </li>
                              <li class="has-dropdown" style={{ padding: "5px" }}>
                                <a onClick={this.showContactModal}>
                                  <span>Contact Us</span>
                                </a>
                              </li> */}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div
                      className="ah-lg-mode"
                      style={{ marginRight: "-30px" }}
                    >
                      <span className="ah-close">✕ Close</span>
                      <ul
                        className="ah-list ah-list--design1 ah-list--link-color-secondary"
                        style={{ marginLeft: "-6%" }}
                      >
                        <li
                          className="has-dropdown"
                          onClick={() => this.handleClick()}
                        >
                          {this.props.apiToken !== "" ? (
                            <a className="mini-cart-shop-link">
                              <i
                                className="fa fa-shopping-cart"
                                onClick={() => {
                                  this.getCartData();
                                }}
                              ></i>
                              &nbsp;&nbsp;
                              {/* <span
                                style={{ fontWeight: "700", color: "white" }}
                              >
                                Cart
                              </span> */}
                              <span className="total-item-round1">
                                {this.state.loginUserCartCount || 0}
                              </span>
                              <br />
                            </a>
                          ) : (
                            <a className="mini-cart-shop-link">
                              <i
                                className="fa fa-shopping-cart"
                                onClick={() => this.getCartData()}
                              ></i>
                              &nbsp;&nbsp;{" "}
                              {/* <span
                                style={{ fontWeight: "700", color: "white" }}
                              >
                                Cart
                              </span> */}
                              {
                                this.props.guestCartList.length !== 0 &&
                                  this.props.guestCartList[0].status !==
                                    false && (
                                    <span className="total-item-round1">
                                      {0 || this.state.guestCartCount}
                                    </span>
                                  )
                                // : (
                                //   <span
                                //     className="total-item-round1"

                                //   >
                                //     {this.props.newCartData.length !== 0 &&
                                //     this.props.cartStatus &&
                                //       <span className="total-item-round1">{this.props.newCartData[0].items.length}</span>
                                //     }
                                //   </span>
                                // )
                              }
                              <br />
                            </a>
                          )}

                          {/*  <span className="js-menu-toggle"></span>
                                  <div className="mini-cart">

                                  {this.props.apiToken === '' ?
                                    <div className="mini-product-container gl-scroll u-s-m-b-15">
                                      

                                   </div>   




                                      :

                                      <div className="mini-product-container gl-scroll u-s-m-b-15">

                                                    
                                                                 <div className="section__intro">
                                                                     <div className="container">
                                                                         <div className="row">
                                                                             <div className="col-lg-12">
                                                                                 <div className="section__text-wrap">
                                                                                     <h1 className="section__heading u-c-secondary" style={{color:'#4B817B !important'}}>YOUR SHOPPING CART</h1>
                                                                                 </div>
                                                                             </div>
                                                                         </div>
                                                                     </div>
                                                                 </div>
                                                    <div className="section__content" style={{marginTop:'15px'}}>
                                                       <div className="container">
                                                         <div className="row">
                                                             <div className="col-lg-12 col-md-12 col-sm-12">
                                                                 <div className="table-responsive">
                                                                     <table class="table-p">
                                                                                <tbody>

                                                                                   
                         {this.props.newCartData.length !== 0  && this.props.cartStatus && this.props.newCartData[0].items.length !== 0 && this.props.newCartData[0].items.map((thisCart, index) => {
                                       return (  
                                         <tr key={index} >
                                             <td>
                                                 <div className="table-p__box">
                                                    
                                                     <div style={{border: '1px solid #CCCCCC',marginLeft:'10px'}}>
                                                        <Image src={thisCart.image} width={100}
                                                        height={150}/>
                                                          
                                                        
                                                     </div>
                                                     <div className="table-p__info" style={{marginTop:'-10px'}}>

                                                         <span className="table-p__name">

                                                             <a style={{fontSize:'16px',lineHeight:'29px'}}>{thisCart.name}</a></span>

                                                        
                                                     </div>
                                                 </div>
                                             </td>
                                           
                                             <td>

                                               <center> <b style={{color:'black'}}>Quantity</b>
                                                 <br/>
                                                 <div className="table-p__input-counter-wrap">

                                                   
                                                     <div className="input-counter">

                                                    {thisCart.qty}
                                                    </div>
                                                    
                                                 </div>
                                                 </center>
                                             </td>
                                             <td>
                                                <center> <b style={{color:'black'}}>Price</b>
                                                 <br/>
                                                 <span className="table-p__price">Rs{thisCart.price}</span>
                                                 </center>
                                             </td>
                                             <td>
                                             <center> <b style={{color:'black'}}>Total</b>
                                                 <br/>
                                                 <span className="table-p__price">Rs{thisCart.row_total}</span>
                                                 </center>
                                             </td>
                                         </tr>
                                        )})}  

                                                                                 </tbody>

                                                                    </table>
                                                                 </div>
                                                               </div>    
                                                             </div>                
                                                             </div>    
                                                         </div> 




                                      </div>

                                      }


                           {this.props.apiToken !== '' ?
                                    <div className="mini-product-stat">
                                        <div className="mini-action">                                                
                                        {this.props.newCartData.length !== 0 ?
                                            <a  className="mini-link btn--e-transparent-secondary-b-2" style={{width:'260px',color:'white',fontSize:'15px',backgroundColor:'#1d708a',border:'none'}}  onClick={() => this.getCartData()} >View Cart</a>
                                            :
                                            <a  className="mini-link btn--e-transparent-secondary-b-2" style={{width:'260px',color:'white',fontSize:'15px',backgroundColor:'##1d708a',border:'none'}}  onClick={() => this.getCartData()} >View Cart</a>
                                        }
                                            </div>
                                    </div>
                                    :
                                    <div className="mini-product-stat">
                                    
                                    </div>}
                                </div> */}

                          <span className="js-menu-toggle"></span>
                          {/* <div className="mini-cart">
                            {this.props.apiToken === "" ? (
                              <div className="mini-product-container gl-scroll u-s-m-b-15">
                                {this.props.guestCartList.length !== 0 &&
                                  this.props.guestCartList[0].status !==
                                    false &&
                                  this.props.guestCartList[0].items.map(
                                    (contact) => (
                                      <div className="card-mini-product">
                                        <div className="mini-product">
                                          <div className="mini-product__image-wrapper">
                                            <a
                                              className="mini-product__link"
                                              href=""
                                            >
                                              <img
                                                style={{
                                                  width: "100%",
                                                  maxWidth: "100%",
                                                  height: "80px",
                                                }}
                                                // src={contact.image}
                                                // alt={contact.image}
                                              />
                                            </a>
                                          </div>
                                          <div className="mini-product__info-wrapper">
                                            <span className="mini-product__name">
                                              <a href="">
                                                {contact.name.substring(0, 25)}
                                              </a>
                                            </span>

                                            <span className="mini-product__quantity">
                                              {contact.qty} x
                                            </span>

                                            <span className="mini-product__price">
                                              &#8377; {contact.row_total}
                                            </span>
                                          </div>
                                        </div>

                                        <a
                                          className="mini-product__delete-link far fa-trash-alt"
                                          style={{ color: "black" }}
                                          onClick={() =>
                                            this.removeGuestProduct(
                                              contact.item_id
                                            )
                                          }
                                        ></a>
                                      </div>
                                    )
                                  )}
                              </div>
                            ) : (
                              <div className="mini-product-container gl-scroll u-s-m-b-15">
                                {this.props.newCartData.length !== 0 &&
                                  this.props.cartStatus &&
                                  this.props.newCartData[0].items.map(
                                    (contact) => (
                                      <div className="card-mini-product">
                                        <div className="mini-product">
                                          <div className="mini-product__image-wrapper">
                                            <a
                                              className="mini-product__link"
                                              href=""
                                            >
                                              <img
                                                className="u-img-fluid-mini-cart"
                                                // src={contact.image}
                                                // alt={contact.image}
                                              />
                                            </a>
                                          </div>
                                          <div className="mini-product__info-wrapper">
                                            <span className="mini-product__name">
                                              <a href="">
                                                {contact.name.substring(0, 25)}
                                              </a>
                                            </span>

                                            <span className="mini-product__quantity">
                                              {contact.qty} x
                                            </span>

                                            <span className="mini-product__price">
                                              &#8377; {contact.price}
                                            </span>
                                          </div>
                                        </div>

                                        <a
                                          className="mini-product__delete-link far fa-trash-alt"
                                          style={{ color: "black" }}
                                          onClick={() =>
                                            this.removeProduct(contact.item_id)
                                          }
                                        ></a>
                                      </div>
                                    )
                                  )}
                              </div>
                            )}

                            {this.props.apiToken !== "" ? (
                              <div className="mini-product-stat">
                                <div className="mini-total">
                                  <span className="subtotal-text">
                                    SUBTOTAL
                                  </span>
                                  {this.props.newCartData.length !== 0 &&
                                  this.props.cartStatus ? (
                                    <span className="subtotal-value">
                                      &#8377;{" "}
                                      {
                                        this.props.newCartData[0].totals
                                          .subtotal
                                      }
                                    </span>
                                  ) : (
                                    <span className="subtotal-value">
                                      &#8377; 0
                                    </span>
                                  )}
                                </div>
                                <div className="mini-action">
                                  <a
                                    className="mini-link btn--e-transparent-secondary-b-2"
                                    onClick={() => this.getCartData()}
                                    style={{
                                      color: "#fff",
                                      backgroundColor: "#5a4744",
                                    }}
                                  >
                                    VIEW CART
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <div className="mini-product-stat">
                                <div className="mini-total">
                                  <span className="subtotal-text">
                                    SUBTOTAL
                                  </span>
                                  {this.props.guestCartList.length !== 0 &&
                                  this.props.guestCartList[0].status !==
                                    false ? (
                                    <span className="subtotal-value">
                                      &#8377;{" "}
                                      {
                                        this.props.guestCartList[0].totals
                                          .subtotal
                                      }
                                    </span>
                                  ) : (
                                    <span className="subtotal-value">
                                      &#8377; 0
                                    </span>
                                  )}
                                </div>
                                <div className="mini-action">
                                  <a
                                    className="mini-link btn--e-transparent-secondary-b-2"
                                    onClick={() => this.getCartData()}
                                    style={{ color: "#fff" }}
                                  >
                                    VIEW CART
                                  </a>
                                </div>
                              </div>
                            )}
                          </div> */}
                        </li>

                        {this.props.userFirstName !== "" ? (
                          <li
                            className="has-dropdown"
                            data-tooltip="tooltip"
                            data-placement="left"
                            title=""
                          >
                            <a>
                              <div className="header-profile">
                                {/* <i className="fa fa-user"></i> &nbsp;&nbsp; */}
                                <span>
                                  {this.props.userFirstName.slice(0, 1)}
                                </span>
                                <span className="profile-dot"></span>
                              </div>
                            </a>

                            <ul
                              style={{
                                maxWidth: "100%",
                                right: "0px",
                              }}
                            >
                              {this.props.apiToken !== "" && (
                                <li>
                                  <a onClick={() => this.getAccountData()}>
                                    <i className="fa fa-user u-s-m-r-6 "></i>
                                    <span
                                      style={{
                                        display: "flex",
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      Welcome {this.props.userFirstName}!
                                    </span>
                                  </a>
                                </li>
                              )}
                              {/* {this.props.apiToken !== '' && 
                                       <li>

                                           <a onClick={() => this.getAccountData()}><i className="fa fa-user u-s-m-r-6"></i>

                                               <span>Account</span></a></li>
                                       } */}
                              {this.props.apiToken === "" && (
                                <li>
                                  <a onClick={this.showLoginModal}>
                                    <i className="fas fa-lock u-s-m-r-6"></i>

                                    <span>Signin</span>
                                  </a>
                                </li>
                              )}
                              {this.props.apiToken !== "" && (
                                <li>
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
                                </li>
                              )}
                            </ul>
                          </li>
                        ) : (
                          <li
                            data-tooltip="tooltip"
                            data-placement="left"
                            title="SignIn"
                          >
                            <a onClick={this.showLoginModal}>
                              <i className="fa fa-user"></i> &nbsp;
                              {/* <span
                                className="header-text"
                                style={{ color: "white" }}
                              >
                                Login
                              </span>{" "} */}
                            </a>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </nav>
            </header>
          </div>

          {/* <header className="header--style-1" id="header--style1">
            <div className="container">
              <nav className="secondary-nav-wrapper">
                <div className="menu-init" id="navigation2">
                  <button
                    onClick={this.showDrawer}
                    className="btn--icon toggle-button toggle-button--secondary drw_icon"
                    id="btn_776"
                    type="button"
                  >
                    &#9776;
                  </button>

                  <div
                    className={
                      this.state.enableDrawer
                        ? "ah-lg-mode-1 slider-margin"
                        : "ah-lg-mode slider-margin"
                    }
                  >
                    <span className="ah-close">
                      <a onClick={this.showDrawer}>✕</a>
                    </span>

                    {this.state.enableDrawer ? (
                      <div>
                        <form className="main-form mn_frm34" autocomplete="off">
                          <label for="main-search"></label>

                          <input
                            onKeyPress={this.keyPress}
                            autocomplete="off"
                            className="input-text input-text-margin-20p"
                            type="text"
                            id="main-search"
                            name="searchData"
                            placeholder="Search"
                          />
                          {this.state.showSearchLoader === false ? (
                            <button
                              className="btn--icon fas fa-search main-search-button"
                              id="search_top5"
                              style={{ top: "44px", marginLeft: "35px" }}
                            ></button>
                          ) : (
                            <div
                              class="spinner-border btn--icon"
                              style={{
                                marginTop: "-30px",
                                marginLeft: "86%",
                              }}
                            ></div>
                          )}
                          {this.state.searchData.length !== 0 &&
                            this.state.searchHandle === true && (
                              <Suggetion
                                searchedData={this.state.searchData}
                                searchText={this.state.searchText}
                              />
                            )}
                        </form>

                        <ul
                          className="ah-list ah-list--design2 ah-list--link-color-secondary"
                          style={{ marginTop: "-10px" }}
                        >
                          <li
                            class="has-dropdown"
                            style={{ marginLeft: "-5px" }}
                          >
                            <a
                              onClick={this.showHomePage}
                              style={{ color: "#fff" }}
                            >
                              <span>Home</span>
                            </a>
                          </li>
                          {this.state.header !== undefined &&
                            this.state.header.map((contact) => (
                              <li
                                class="has-slide-dropdown"
                                style={{ marginLeft: "-5px" }}
                              >
                                <a
                                  style={{ color: "white" }}
                                  onClick={() => this.getData(contact)}
                                >
                                  {contact.name}
                                  {contact.child_data.length !== 0 && (
                                    <i class="fas fa-angle-down u-s-m-l-6"></i>
                                  )}
                                </a>
                                {contact.child_data.length !== 0 && (
                                  <a
                                    onClick={() =>
                                      this.showBelowData(contact.id)
                                    }
                                  >
                                    {this.state.showToggle &&
                                      contact.id === this.state.showData74 ? (
                                      <span className="js-menu-toggle js-toggle-mark"></span>
                                    ) : (
                                      <span className="js-menu-toggle"></span>
                                    )}
                                  </a>
                                )}
                                {contact.child_data.length !== 0 &&
                                  contact.id === this.state.showData74 &&
                                  this.state.showToggle && (
                                    <ul>
                                      {contact.child_data.map((contact1) => (
                                        <li className="has-slide-dropdown">
                                          <a
                                            style={{ color: "white" }}
                                            onClick={() =>
                                              this.getData(contact1)
                                            }
                                          >
                                            {contact1.name}

                                            {contact1.child_data.length !==
                                              0 && (
                                                <i class="fas fa-angle-down u-s-m-l-6"></i>
                                              )}
                                          </a>
                                          {contact1.child_data.length !== 0 && (
                                            <a
                                              onClick={() =>
                                                this.showBelowData2(contact1.id)
                                              }
                                            >
                                              {this.state.showToggle2 &&
                                                contact1.id ===
                                                this.state.showData88 ? (
                                                <span className="js-menu-toggle2 js-toggle-mark2"></span>
                                              ) : (
                                                <span className="js-menu-toggle2"></span>
                                              )}
                                            </a>
                                          )}
                                          {contact1.child_data.length !== 0 &&
                                            contact1.id ===
                                            this.state.showData88 &&
                                            this.state.showToggle2 && (
                                              <ul>
                                                {contact1.child_data.map(
                                                  (contact2) => (
                                                    <li className="has-slide-dropdown">
                                                      <a
                                                        style={{
                                                          color: "white",
                                                        }}
                                                        onClick={() =>
                                                          this.getData(contact2)
                                                        }
                                                      >
                                                        {contact2.name}
                                                      </a>
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                              </li>
                            ))}
                          <li
                            class="has-dropdown"
                            style={{ marginLeft: "-5px" }}
                          >
                            <a href="" style={{ color: "#fff" }}>
                              <span>Blog</span>
                            </a>
                          </li>
                          <li
                            class="has-dropdown"
                            style={{ marginLeft: "-5px" }}
                          >
                            <a href="" style={{ color: "#fff" }}>
                              <span>Our Story</span>
                            </a>
                          </li>
                          <li
                            class="has-dropdown"
                            style={{ marginLeft: "-5px" }}
                          >
                            <a
                              style={{ color: "#fff" }}
                              onClick={this.showContactModal}
                            >
                              <span>Contact Us</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <div className="top-bottom-border">
                        <center>
                          <ul className="ah-list ah-list--design2 ah-list--link-color-secondary ah-lst-sec2">
                            <li
                              class="has-dropdown"
                              style={{ marginLeft: "-5px" }}
                            >
                              <a onClick={this.showHomePage}>
                                <span>Home</span>
                              </a>
                            </li>
                            {this.state.header !== undefined &&
                              this.state.header.map((contact) => (
                                <li
                                  class="has-dropdown"
                                  style={{ padding: "5px" }}
                                >
                                  <a onClick={() => this.getData(contact)}>
                                    {contact.name}
                                    {contact.child_data.length !== 0 && (
                                      <i class="fas fa-angle-down u-s-m-l-6"></i>
                                    )}
                                  </a>
                                  {contact.child_data.length !== 0 && (
                                    <span className="js-menu-toggle"></span>
                                  )}
                                  {contact.child_data.length !== 0 && (
                                    <ul
                                      style={{
                                        maxWidth: "205px",
                                        marginLeft: "-1%",
                                        marginTop: "-315px",
                                      }}
                                    >
                                      {contact.child_data.map((contact1) => (
                                        <li className="has-dropdown has-dropdown--ul-left-100">
                                          <a
                                            onClick={() =>
                                              this.getData(contact1)
                                            }
                                          >
                                            {contact1.name}

                                            {contact1.child_data.length !==
                                              0 && (
                                                <i class="fas fa-angle-right u-s-m-l-6"></i>
                                              )}
                                          </a>
                                          {contact1.child_data.length !== 0 && (
                                            <span className="js-menu-toggle"></span>
                                          )}
                                          {contact1.child_data.length !== 0 && (
                                            <ul
                                              style={{
                                                width: "180px",
                                                marginTop: "13px",
                                                marginLeft: "18px",
                                                display: "block",
                                              }}
                                            >
                                              {contact1.child_data.map(
                                                (contact2) => (
                                                  <li className="has-dropdown has-dropdown--ul-left-100">
                                                    <a
                                                      onClick={() =>
                                                        this.getData(contact2)
                                                      }
                                                    >
                                                      {contact2.name}
                                                    </a>
                                                  </li>
                                                )
                                              )}
                                            </ul>
                                          )}
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </li>
                              ))}
                            <li class="has-dropdown" style={{ padding: "5px" }}>
                              <a href="">
                                <span>Blog</span>
                              </a>
                            </li>
                            <li class="has-dropdown" style={{ padding: "5px" }}>
                              <a href="">
                                <span>Our Story</span>
                              </a>
                            </li>
                            <li class="has-dropdown" style={{ padding: "5px" }}>
                              <a onClick={this.showContactModal}>
                                <span>Contact Us</span>
                              </a>
                            </li>
                          </ul>
                        </center>
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          </header> */}

          <div className="app-content">{this.props.children}</div>

          <Modal
            open={this.state.showLogin}
            onClose={this.showLoginModal}
            autoComplete="off"
          >
            <div className="modaal" id="mdl_pop">
              {this.state.loginForm ? (
                <div className="row u-s-m-x-0 margin-18">
                  <div
                    className="col-lg-6 new-l__col-1 u-s-p-x-0"
                    style={{ paddingRight: "25px" }}
                  >
                    <a className="new-l__img-wrap u-d-block new_img_ud">
                      <div>
                        <img
                          className="u-img-fluid-signin u-d-block"
                          style={{
                            objectFit: "contain",
                            backgroundColor: "black",
                          }}
                          src={loginLogo}
                          alt=""
                        />
                        <img
                          className="u-img-fluid-signin u-d-block"
                          src={textLogo}
                          style={{
                            objectFit: "contain",
                            backgroundColor: "black",
                          }}
                          alt=""
                        />
                      </div>
                    </a>
                  </div>
                  <div className="col-lg-6 new-l__col-2">
                    <div
                      className=" login-right-section"
                      // style={{
                      //   paddingLeft: "1.2rem"
                      //   paddingRight: "1.2rem",
                      //   marginTop: "7px",
                      // }}
                    >
                      <div className="u-s-m-b-8 new-l--center">
                        <h3 className="new-l__h3">SignIn</h3>
                      </div>
                      <div className="u-s-m-b-30 new-l--center">
                        <p className="new-l__p1">
                          If you have an account with us, please log in.
                        </p>
                      </div>
                      <br />

                      <div className="l-f-o">
                        <div className="l-f-o__form">
                          <div className="u-s-m-b-30">
                            <label className="gl-label" for="login-email">
                              E-MAIL *
                            </label>

                            <input
                              className={
                                this.state.errors.loginEmail
                                  ? "input-text input-text--primary-style input-error"
                                  : "input-text input-text--primary-style"
                              }
                              type="text"
                              name="loginEmail"
                              onChange={this.handleInputChange}
                              id="loginEmail"
                              placeholder="Enter E-mail"
                              autoComplete="off"
                              value={this.state.email}
                            />
                          </div>
                          <br />

                          <div className="u-s-m-b-30">
                            <label className="gl-label" for="login-password">
                              PASSWORD *
                            </label>

                            <input
                              className={
                                this.state.errors.loginPassword
                                  ? "input-text input-text--primary-style input-error"
                                  : "input-text input-text--primary-style"
                              }
                              type="password"
                              id="loginPassword"
                              name="loginPassword"
                              onChange={this.handleInputChange}
                              placeholder="Enter Password"
                              value={this.state.password}
                            />
                          </div>

                          {this.state.errorList === true && (
                            <p
                              style={{
                                marginLeft: "5px",
                                marginTop: "-4px",
                                color: "red",
                                fontSize: "15px",
                              }}
                            >
                              Invalid EmailId & Password
                            </p>
                          )}

                          <br />

                          <div className="gl-inline">
                            <div className="u-s-m-b-30">
                              {this.state.loginLoaderData === false ? (
                                <button
                                  className="login-btn"
                                  onClick={this.loginclickFun}
                                >
                                  LOGIN
                                </button>
                              ) : (
                                <img
                                  src={loaderRoll}
                                  style={{ height: "30px", width: "30px" }}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="u-s-m-b-30">
                              <a
                                className="gl-link"
                                onClick={this.showForgotModal}
                              >
                                Lost Your Password?
                              </a>
                              &nbsp;&nbsp;|&nbsp;&nbsp;
                              <a
                                className="gl-link"
                                onClick={this.showRegister}
                              >
                                Register Here
                              </a>
                            </div>
                          </div>
                          <br />
                          <div className="u-s-m-b-30">
                            <div className="check-box">
                              <input type="checkbox" id="remember-me" />
                              <div className="check-box__state check-box__state--primary">
                                <label
                                  className="check-box__label"
                                  for="remember-me"
                                >
                                  Remember Me
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div id="usmx0" autoComplete="off">
                  <div className="row u-s-m-x-0 margin-18" id="regt_pop">
                    <div
                      className="col-lg-6 new-l__col-1 u-s-p-x-0"
                      style={{ paddingRight: "25px" }}
                    >
                      <a className="new-l__img-wrap u-d-block new_img_ud">
                        <img
                          className="u-img-fluid-signin u-d-block"
                          src={signin}
                          alt=""
                        />
                      </a>
                    </div>
                    <div className="col-lg-6 new-l__col-2">
                      <div className="new-l__section u-s-m-t-30 login-right-section">
                        <div className="u-s-m-b-8 new-l--center">
                          <h3 className="new-l__h3">Register Here</h3>
                        </div>
                        <br />

                        <div
                          className="dash-address-manipulation"
                          style={{ marginTop: "0px" }}
                          autoComplete="off"
                        >
                          <div className="gl-inline">
                            <div className="u-s-m-b-30">
                              <label className="gl-label" for="address-fname">
                                FIRST NAME *
                              </label>

                              <input
                                className={
                                  this.state.errors.firstName
                                    ? "input-text input-text--primary-style input-error"
                                    : "input-text input-text--primary-style"
                                }
                                type="text"
                                id="firstName"
                                placeholder="First Name"
                                name="firstName"
                                autoComplete="new-password"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="u-s-m-b-30">
                              <label className="gl-label" for="address-lname">
                                LAST NAME *
                              </label>

                              <input
                                className={
                                  this.state.errors.lastName
                                    ? "input-text input-text--primary-style input-error"
                                    : "input-text input-text--primary-style"
                                }
                                type="text"
                                placeholder="Last Name"
                                id="lastName"
                                name="lastName"
                                autoComplete="new-password"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <div className="gl-inline">
                            <div className="u-s-m-b-30">
                              <label className="gl-label" for="address-fname">
                                EMAIL *
                              </label>

                              <input
                                className={
                                  this.state.errors.email
                                    ? "input-text input-text--primary-style input-error"
                                    : "input-text input-text--primary-style"
                                }
                                type="text"
                                id="email"
                                name="email"
                                autoComplete="new-password"
                                value={this.state.email}
                                placeholder="Email Address"
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="u-s-m-b-30">
                              <label className="gl-label" for="address-lname">
                                PHONE NO *
                              </label>

                              <input
                                className={
                                  this.state.errors.telephone
                                    ? "input-text input-text--primary-style input-error"
                                    : "input-text input-text--primary-style"
                                }
                                type="number"
                                id="telephone"
                                name="telephone"
                                autoComplete="new-password"
                                maxlength="10"
                                min="0"
                                placeholder="Phone No"
                                value={this.state.telephone}
                                onChange={this.handleInputChange}
                                onInput={this.maxLengthCheck}
                              />
                            </div>
                          </div>
                          <div className="gl-inline">
                            <div className="u-s-m-b-30">
                              <label className="gl-label" for="address-fname">
                                PASSWORD *
                              </label>

                              <input
                                className={
                                  this.state.errors.password
                                    ? "input-text input-text--primary-style input-error"
                                    : "input-text input-text--primary-style"
                                }
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                              />
                            </div>
                            <div className="u-s-m-b-30">
                              <label className="gl-label" for="address-lname">
                                CONFIRM PASSWORD *
                              </label>

                              <input
                                className={
                                  this.state.errors.confirmPassword
                                    ? "input-text input-text--primary-style input-error"
                                    : "input-text input-text--primary-style"
                                }
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={this.state.confirmPassword}
                                onChange={this.handleInputChange}
                              />
                            </div>
                          </div>
                          <br />
                          <div className="gl-inline">
                            <div className="u-s-m-b-30">
                              {this.state.registerCall === false ? (
                                <button
                                  className="login-btn"
                                  onClick={this.customerRegisterData}
                                >
                                  REGISTER{" "}
                                </button>
                              ) : (
                                <img
                                  src={loaderRoll}
                                  style={{ height: "30px", width: "30px" }}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="u-s-m-b-30">
                              <a
                                className="gl-link"
                                onClick={this.showForgotModal}
                              >
                                Lost Your Password?
                              </a>
                              &nbsp;&nbsp;|&nbsp;&nbsp;
                              <a
                                className="gl-link"
                                onClick={() => {
                                  this.showLoginData();
                                }}
                              >
                                Signin
                              </a>
                            </div>
                          </div>
                          {/* <div>
                            <ul className="gl-label">Password Required</ul>
                            <li>one lower case,[a-z]</li>
                            <li>one upper case,[A-Z]</li>
                            <li>one special characters,[@,%]</li>
                            <li>one number,[0-9] </li>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Modal>

          <Modal open={this.state.showForgot} onClose={this.showForgotModal}>
            <div className="modaal" id="mdl_pop">
              <div className="row u-s-m-x-0">
                <div
                  className="col-lg-6 new-l__col-1 u-s-p-x-0"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                >
                  <a
                    className="new-l__img-wrap u-d-block new-img-wrap_1"
                    style={{ height: "116.3%", marginTop: "-18px" }}
                  >
                    <img
                      className="u-img-fluid-signin u-d-block"
                      src={signin}
                      alt=""
                      style={{ width: "96%", height: "95%" }}
                    />
                  </a>
                </div>

                <div className="col-lg-6 new-l__col-2">
                  <br />
                  <br />
                  {/* <div className="closeButton" style={{marginLeft: '93%', marginTop: '-37px'}}>
                      <a onClick={this.showForgotModal}>X</a>
                    </div> */}
                  <div
                    className="new-l__section u-s-m-t-30"
                    style={{ paddingLeft: "1.2rem", paddingRight: "1.2rem" }}
                  >
                    <div className="u-s-m-b-8 new-l--center">
                      <h3 className="new-l__h3">Please Enter Email</h3>
                    </div>
                    <br />
                    <br />

                    <div
                      className="u-s-m-b-30"
                      id="fgteml"
                      style={{ marginTop: "-15px" }}
                    >
                      <label className="gl-label" for="forgotEmail">
                        E-MAIL *
                      </label>

                      <input
                        style={{ width: "100%" }}
                        className={
                          this.state.errors.forgotEmail
                            ? "input-text input-text--primary-style input-error"
                            : "input-text input-text--primary-style"
                        }
                        type="text"
                        name="forgotEmail"
                        onChange={this.handleInputChange}
                        id="forgotEmail"
                        placeholder="Enter E-mail"
                      />
                    </div>

                    <div className="gl-inline">
                      <center>
                        <div
                          className="u-s-m-b-30"
                          style={{ marginTop: "15px" }}
                        >
                          {this.state.removeLoader === false ? (
                            <button
                              className="btn--e-transparent-brand-b-2 btn-etpt"
                              onClick={this.customerForgotPassword}
                            >
                              Send Link
                            </button>
                          ) : (
                            <div className="spinner-border btn--icon"></div>
                          )}
                        </div>
                        <br />
                        <div className="u-s-m-b-30">
                          <a
                            className="gl-link"
                            onClick={this.showLoginFromPass}
                          >
                            Signin
                          </a>
                          &nbsp;&nbsp;|&nbsp;&nbsp;
                          <a
                            className="gl-link"
                            onClick={this.showRegisterData}
                          >
                            Signup
                          </a>
                        </div>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          {/* <MaModal
            open={this.state.showContact}
            onClose={this.showContactModal}
          >
            <div className="contact_mdl3" id="cont_modll5">
              <div
                className="row u-s-m-x-0 margin-18"
                style={{ marginBottom: "3%" }}
              >
                <div
                  className="col-lg-6 new-l__col-1 u-s-p-x-0"
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                >
                  <a
                    className="new-l__img-wrap u-d-block udblock2"
                    id="new-2_wrp"
                  >
                    <img
                      className="u-img-fluid-signin u-d-block"
                      id="img_fld3"
                      src={signin}
                      alt=""
                    />
                  </a>
                </div>

                <div className="col-lg-6 new-l__col-2" id="_992btn">
                  <div className="closeButton" style={{ marginLeft: "93%" }}>
                    <a onClick={this.showContactModal}>X</a>
                  </div>
                  <div
                    className="new-l__section u-s-m-t-30"
                    style={{ paddingLeft: "1.2rem", paddingRight: "1.2rem" }}
                  >
                    <div className="u-s-m-b-8 new-l--center" id="usmb8">
                      <h3 className="new-l__h3" style={{ marginTop: "38px" }}>
                        Contact Us
                      </h3>
                    </div>
                    <br />

                    <div className="dash-address-manipulation">
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <label className="gl-label" for="contact-name">
                            FIRST NAME *
                          </label>

                          <input
                            className={
                              this.state.errors5.contactFirstName
                                ? "input-text input-text--primary-style input-error"
                                : "input-text input-text--primary-style"
                            }
                            name="contactFirstName"
                            placeholder="FIRST NAME"
                            required=""
                            value={this.state.contactFirstName}
                            onChange={this.handleInputContact}
                          />
                        </div>
                        <div className="u-s-m-b-30">
                          <label className="gl-label" for="contact-lname">
                            LAST NAME *
                          </label>

                          <input
                            className={
                              this.state.errors5.contactLastName
                                ? "input-text input-text--primary-style input-error"
                                : "input-text input-text--primary-style"
                            }
                            name="contactLastName"
                            value={this.state.contactLastName}
                            placeholder="LAST NAME"
                            required=""
                            onChange={this.handleInputContact}
                          />
                        </div>
                      </div>
                      <div className="gl-inline">
                        <div className="u-s-m-b-30">
                          <label className="gl-label" for="contact-email">
                            EMAIL *
                          </label>

                          <input
                            className={
                              this.state.errors5.contactEmail
                                ? "input-text input-text--primary-style input-error"
                                : "input-text input-text--primary-style"
                            }
                            name="contactEmail"
                            placeholder="EMAIL"
                            required=""
                            value={this.state.contactEmail}
                            onChange={this.handleInputContact}
                          />
                        </div>
                        <div className="u-s-m-b-30">
                          <label className="gl-label" for="contact-phone">
                            PHONE NO *
                          </label>

                          <input
                            className={
                              this.state.errors5.contactPhone
                                ? "input-text input-text--primary-style input-error"
                                : "input-text input-text--primary-style"
                            }
                            name="contactPhone"
                            value={this.state.contactPhone}
                            placeholder="PHONE NO"
                            required=""
                            onChange={this.handleInputContact}
                          />
                        </div>
                      </div>

                      <div className="">
                        <div className="u-s-m-b-30">
                          <label className="gl-label" for="contact-message">
                            MESSAGE *
                          </label>

                          <input
                            style={{ width: "100%" }}
                            className={
                              this.state.errors5.contactMessage
                                ? "input-text input-text--primary-style input-error"
                                : "input-text input-text--primary-style"
                            }
                            name="contactMessage"
                            placeholder="MESSAGE"
                            required=""
                            value={this.state.contactMessage}
                            onChange={this.handleInputContact}
                          />
                        </div>
                      </div>

                      <div className="gl-inline">
                        <center>
                          <div className="u-s-m-b-30" id="btn_id3">
                            <button
                              className="btn--e-transparent-brand-b-2 btn-etpt"
                              style={{ marginTop: "20px" }}
                              onClick={this.addContact}
                            >
                              SUBMIT
                            </button>
                          </div>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MaModal> */}

          {/* footer section */}
          <div style={{ position: "absolute", bottom: "0px", width: "100%" }}>
            {this.state.header === undefined ? (
              ""
            ) : (
              <div className="footer-container">
                <div className="footer-items">
                  <div className="footer-top-container">
                    <div className="footer-top-left">
                      <span
                        className="footer-content"
                        onClick={() => {
                          this.props.history.push("/about-us");
                        }}
                      >
                        About Us
                      </span>
                      <span
                        className="footer-content"
                        onClick={() => {
                          this.props.history.push("/privacy-policy");
                        }}
                      >
                        Privacy Policy
                      </span>
                      <span
                        className="footer-content"
                        onClick={() => {
                          this.props.history.push("/terms-of-service");
                        }}
                      >
                        Terms
                      </span>
                      <span
                        className="footer-content"
                        onClick={this.handleContactUs}
                      >
                        Contact Us
                      </span>
                    </div>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      Copy Right &#169;2023,&nbsp;Walsoul Consulting Private
                      Limited
                    </span>
                    <div
                      className="footer-img-icon"
                      style={{ marginTop: "10px" }}
                    >
                      <div className="footer-img-icon">
                        <span className="footer-follow">FollowUs</span>
                        <img
                          src={twentysix}
                          alt="twentysix"
                          className="footer-img-icons"
                        />
                        <a href="https://www.facebook.com/people/Walsoul-Gourmet/100091741402816/">
                          <img
                            src={twentyseven7}
                            alt="twentyseven7"
                            className="footer-img-icons"
                          />
                        </a>
                        <a href="https://www.instagram.com/walsoul_gourmet/">
                          <img
                            src={twentyeight8}
                            alt="twentyeight8"
                            className="footer-img-icons"
                          />
                        </a>

                        <img
                          src={twentynine}
                          alt="twentynine"
                          className="footer-img-icons"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="footer-second-items">
                    <span>
                      Company Name: Walsoul Consulting Private Limited | CIN:
                      U72900KA2021PTC144076 | Regd. Office Address: 688, 3rd
                      Floor, 7th Main , BTM 2nd Stage, BTM Layout, Bengaluru,
                      Karnataka 560076
                    </span>
                    <span>
                      Telephone No.: +91-80-41737691 | E-mail:
                      customerservice@walsoulgourmet.in | Grievance Resolution
                      Officer Name: Mr. Shiva Kumar | Contact No.: +91
                      9110469843 / 9591-983-960
                    </span>
                  </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRegisterData: (data) => dispatch(fetchCustomerRegisterData(data)),
  getAccessToken: (data) => dispatch(fetchCustomerToken(data)),
  getLoginData: (data) => dispatch(fetchCustomerDetails(data)),
  getHomePage: () => dispatch(fetchHomePage()),
  clearRegData: () => dispatch(clearRegisterData()),
  getCategoryAutoCompleteData: (data) =>
    dispatch(fetchCategoriesAutoCompleteResult(data)),
  fetchAllHeaderSearch: (data) => dispatch(fetchAllHeaderSearch(data)),
  getZipcodeData: (data) => dispatch(fetchZipCode(data)),
  getCartData: (data) => dispatch(fetchCartItemsByCustomer(data)),
  getAllAddressData: (data) => dispatch(fetchAllAddressData(data)),
  receiveHideLoginModalData: () => dispatch(receiveHideLoginModalData()),
  getGuestConvertCartList: (data, data1) =>
    dispatch(getGuestConvertCartList(data, data1)),
  getCart: (data) => dispatch(fetchGetCartData(data)),
  fetchShippingAddress: (data) => dispatch(getShippingAddress(data)),
  fetchBillingAddress: (data) => dispatch(getBillingAddress(data)),
  getStateListData: () => dispatch(fetchStateListData()),
  getForgotPassword: (data) => dispatch(fetchForgotPassword(data)),
  setZipcodeData: (data) => dispatch(setZipcodeData(data)),
  setCatName: (data) => dispatch(setCatName(data)),
  setCatDesc: (data) => dispatch(setCatDesc(data)),
  getBillState: (data) => dispatch(fetchBillingStateListData(data)),
  guestRemove: (data) => dispatch(deleteGuestCartData(data)),
  getGuestList: (data) => dispatch(getGuestCartList(data)),
  getaddRemoveUpdateProduct: (data, data1) =>
    dispatch(fetchRemoveFromCartData(data, data1)),
});

const mapStateToProps = (state) => {
  const {
    loginReducer,
    bkmReducer,
    registerReducer,
    cartReducer,
    allAddressReducer,
  } = state;

  const {
    registerStatus,
    registerMessage,
    registerData,
    stateListData,
    isFetching: isLoading,
    error: registerError,
  } = registerReducer || [];

  const {
    showLoginModal,
    showForgotModal,
    hideLoginModal,
    homePageData,
    newHomePageData,
    apiToken,
    localData,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    tokenType,
    loginMessage,
    loginStatus,
    zipcode,
    zipcodeInit,
    loginResponseData,
    defaultBilling,
    isFetching,
    isHomeLoading,
    forgotPasswordStatus,
    forgotPasswordData,
    catNameData,
    catDescData,
  } = loginReducer || [];

  const {
    cartId,
    cartData,
    firstCartData,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
    newCartData,
    cartDatNew,
    cartStatus,
    cartConvertResponse,
    RemoveFromCartData,
    guestDeleteCartResponse,
  } = cartReducer || [];

  const { allAddressData, shippingAddressData, billingAddressData } =
    allAddressReducer || [];

  const { autoCompleteData, headerSearchList } = bkmReducer || [];

  const error = !_isEmpty(registerError);

  return {
    isFetching,
    tokenType,
    homePageData,
    newHomePageData,
    autoCompleteData,
    apiToken,
    localData,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    registerData,
    registerStatus,
    registerMessage,
    loginMessage,
    loginStatus,
    showForgotModal,
    cartId,
    cartData,
    firstCartData,
    zipcode,
    zipcodeInit,
    loginResponseData,
    defaultBilling,
    allAddressData,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
    showLoginModal,
    hideLoginModal,
    shippingAddressData,
    billingAddressData,
    stateListData,
    newCartData,
    cartDatNew,
    isHomeLoading,
    cartStatus,
    forgotPasswordStatus,
    forgotPasswordData,
    catNameData,
    catDescData,
    cartConvertResponse,
    RemoveFromCartData,
    guestDeleteCartResponse,
    headerSearchList,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(HeaderLayout));

// export default HeaderLayout;
