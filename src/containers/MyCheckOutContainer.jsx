import React from "react";
import connect from "react-redux/lib/connect/connect";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import axios from "axios";
import _isError from "lodash/isError";
import _findIndex from "lodash/findIndex";
//import { animateScroll } from "react-scroll";
import Redirect from "react-router/Redirect";
import swal from "sweetalert";
import MetaTags from "react-meta-tags";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyCheckoutComponent from "../components/BKMComponent/MyCheckoutComponent.jsx";
import Loader from "../components/Loader/Loader.jsx";
import {
  fetchDiscountCouponData,
  fetchCancelDiscountCouponData,
  fetchCartItemsByCustomer,
  fetchRemoveFromCartData,
  fetchUpdateCartData,
  fetchMoveToWishlistData,
  fetchRemoveExpiredProductData,
  setCartTypeData,
  clearCartReducer,
  clearCartData,
  fetchGrandTotal,
  fetchGetCartData,
  deleteGuestCartData,
  updateGuestCartData,
  getGuestCartList,
  getGiftMessage,
} from "../actions/cart";
import {
  fetchStateListData,
  fetchBillingStateListData,
} from "../actions/register";
import { getPlaceOrder } from "../actions/placeOrder";
import {
  getShippingAddress,
  getBillingAddress,
  fetchEditAddress,
  fetchAddAddressData,
} from "../actions/address";
import {
  setCartId,
  updateCartData as updateLoginCartData,
  receiveShowLoginModalData,
} from "../actions/login";
import BreadCrumbs from "../components/Common/BreadCrumbs.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import ErrorHandler from "../components/Hoc/ErrorHandler.jsx";
import logLoader from "../assets/img/loader.gif";

class MyCheckOutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.applyDiscountCoupon = this.applyDiscountCoupon.bind(this);
    this.cancelDiscountCoupon = this.cancelDiscountCoupon.bind(this);
    this.source = "";
    this.state = {
      discountCouponValue: undefined,
      couponRes: false,
      showCouponRes: false,
      coupCode: undefined,
      showCouponData: undefined,
      cartResult: undefined,
      code: undefined,
      subTotal: undefined,
      grandTotal: undefined,
      result: undefined,
      cancelCouponVal: undefined,
      sucessClassName: undefined,
      discountVal: undefined,
      errors: "",
      cartErrors: {},
      showCartErrors: false,
      blinkText: false,
      productDetails: {},
      productId: undefined,
      move: false,
      productName: undefined,
      qty: undefined,
      pid: [],
      showCheckOut: false,
      billingAddress: undefined,
      shippingAddress: undefined,
      breadCrumbsList: [
        {
          link: "/",
          name: "HOME",
        },
        {
          link: undefined,
          name: "SHOPPING CART",
        },
      ],
      errQty: {},
      cartObj: undefined,
      shipShow: false,
      itemShow: false,
      priceData: undefined,
      cartDataId: "",
      paymentMethod: undefined,
      totalAmount: undefined,
      paymentType: undefined,
      showCards: false,
      totalCartItems: [],
      cartDataShow: undefined,
      guestStateItems: [],
      guestStateList: [],
      shipGuestShow: false,
      itemGuestShow: false,
      itemGuestDeleteShow: false,
      fields: {},
      errors1: {},
      fields1: {},
      errors2: {},
      fields2: {},
      selectStateValueBilling: "",
      selectStateValueShipping: "",
      selectCountryValueBilling: "US",
      showAdModal: false,
      custAddress: [],
      addData: undefined,
      responsive: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 2 } },
      shipAddress: undefined,
      billAddress: undefined,
      addTerm: undefined,
      showBillingAllAddress: false,
      showShippingAllAddress: false,
      //showReserve: true,
      showCheckoutSuccess: false,
      placeStatus: false,
      placeSuccess: false,
      newAdd: false,
      defBillAdd: false,
      billAddressCame: false,
      shipAddressCame: false,
      cartGift: [],
      showGF: false,
      giffyLoader: false,
      shipTotalAmount: 0,
      grandTotalAmount: 0,
      showShippingLoader: false,
      showBillingLoader: false,
      pageLoader: true,
      billStateResponse: [],
      billState: false,
      cadeImageShow: undefined,
      goToCheckOut: false,
      breadCrumbsList: [
        {
          link: "/",
          name: "Home",
        },
        {
          link: "/view-cart",
          name: "My Cart",
        },
        {
          link: undefined,
          name: "Checkout",
        },
      ],
      countryData: [
        {
          Code: "AF",
          Name: "Afghanistan",
        },
        {
          Code: "AX",
          Name: "Aland Islands",
        },
        {
          Code: "AL",
          Name: "Albania",
        },
        {
          Code: "DZ",
          Name: "Algeria",
        },
        {
          Code: "AS",
          Name: "American Samoa",
        },
        {
          Code: "AD",
          Name: "Andorra",
        },
        {
          Code: "AO",
          Name: "Angola",
        },
        {
          Code: "AI",
          Name: "Anguilla",
        },
        {
          Code: "AQ",
          Name: "Antarctica",
        },
        {
          Code: "AG",
          Name: "Antigua and Barbuda",
        },
        {
          Code: "AR",
          Name: "Argentina",
        },
        {
          Code: "AM",
          Name: "Armenia",
        },
        {
          Code: "AW",
          Name: "Aruba",
        },
        {
          Code: "AU",
          Name: "Australia",
        },
        {
          Code: "AT",
          Name: "Austria",
        },
        {
          Code: "AZ",
          Name: "Azerbaijan",
        },
        {
          Code: "BS",
          Name: "Bahamas",
        },
        {
          Code: "BH",
          Name: "Bahrain",
        },
        {
          Code: "BD",
          Name: "Bangladesh",
        },
        {
          Code: "BB",
          Name: "Barbados",
        },
        {
          Code: "BY",
          Name: "Belarus",
        },
        {
          Code: "BE",
          Name: "Belgium",
        },
        {
          Code: "BZ",
          Name: "Belize",
        },
        {
          Code: "BJ",
          Name: "Benin",
        },
        {
          Code: "BM",
          Name: "Bermuda",
        },
        {
          Code: "BT",
          Name: "Bhutan",
        },
        {
          Code: "BO",
          Name: "Bolivia, Plurinational State of",
        },
        {
          Code: "BQ",
          Name: "Bonaire, Sint Eustatius and Saba",
        },
        {
          Code: "BA",
          Name: "Bosnia and Herzegovina",
        },
        {
          Code: "BW",
          Name: "Botswana",
        },
        {
          Code: "BV",
          Name: "Bouvet Island",
        },
        {
          Code: "BR",
          Name: "Brazil",
        },
        {
          Code: "IO",
          Name: "British Indian Ocean Territory",
        },
        {
          Code: "BN",
          Name: "Brunei Darussalam",
        },
        {
          Code: "BG",
          Name: "Bulgaria",
        },
        {
          Code: "BF",
          Name: "Burkina Faso",
        },
        {
          Code: "BI",
          Name: "Burundi",
        },
        {
          Code: "KH",
          Name: "Cambodia",
        },
        {
          Code: "CM",
          Name: "Cameroon",
        },
        {
          Code: "CA",
          Name: "Canada",
        },
        {
          Code: "CV",
          Name: "Cape Verde",
        },
        {
          Code: "KY",
          Name: "Cayman Islands",
        },
        {
          Code: "CF",
          Name: "Central African Republic",
        },
        {
          Code: "TD",
          Name: "Chad",
        },
        {
          Code: "CL",
          Name: "Chile",
        },
        {
          Code: "CN",
          Name: "China",
        },
        {
          Code: "CX",
          Name: "Christmas Island",
        },
        {
          Code: "CC",
          Name: "Cocos (Keeling) Islands",
        },
        {
          Code: "CO",
          Name: "Colombia",
        },
        {
          Code: "KM",
          Name: "Comoros",
        },
        {
          Code: "CG",
          Name: "Congo",
        },
        {
          Code: "CD",
          Name: "Congo, the Democratic Republic of the",
        },
        {
          Code: "CK",
          Name: "Cook Islands",
        },
        {
          Code: "CR",
          Name: "Costa Rica",
        },
        {
          Code: "CI",
          Name: "C\u00f4te d'Ivoire",
        },
        {
          Code: "HR",
          Name: "Croatia",
        },
        {
          Code: "CU",
          Name: "Cuba",
        },
        {
          Code: "CW",
          Name: "Cura\u00e7ao",
        },
        {
          Code: "CY",
          Name: "Cyprus",
        },
        {
          Code: "CZ",
          Name: "Czech Republic",
        },
        {
          Code: "DK",
          Name: "Denmark",
        },
        {
          Code: "DJ",
          Name: "Djibouti",
        },
        {
          Code: "DM",
          Name: "Dominica",
        },
        {
          Code: "DO",
          Name: "Dominican Republic",
        },
        {
          Code: "EC",
          Name: "Ecuador",
        },
        {
          Code: "EG",
          Name: "Egypt",
        },
        {
          Code: "SV",
          Name: "El Salvador",
        },
        {
          Code: "GQ",
          Name: "Equatorial Guinea",
        },
        {
          Code: "ER",
          Name: "Eritrea",
        },
        {
          Code: "EE",
          Name: "Estonia",
        },
        {
          Code: "ET",
          Name: "Ethiopia",
        },
        {
          Code: "FK",
          Name: "Falkland Islands (Malvinas)",
        },
        {
          Code: "FO",
          Name: "Faroe Islands",
        },
        {
          Code: "FJ",
          Name: "Fiji",
        },
        {
          Code: "FI",
          Name: "Finland",
        },
        {
          Code: "FR",
          Name: "France",
        },
        {
          Code: "GF",
          Name: "French Guiana",
        },
        {
          Code: "PF",
          Name: "French Polynesia",
        },
        {
          Code: "TF",
          Name: "French Southern Territories",
        },
        {
          Code: "GA",
          Name: "Gabon",
        },
        {
          Code: "GM",
          Name: "Gambia",
        },
        {
          Code: "GE",
          Name: "Georgia",
        },
        {
          Code: "DE",
          Name: "Germany",
        },
        {
          Code: "GH",
          Name: "Ghana",
        },
        {
          Code: "GI",
          Name: "Gibraltar",
        },
        {
          Code: "GR",
          Name: "Greece",
        },
        {
          Code: "GL",
          Name: "Greenland",
        },
        {
          Code: "GD",
          Name: "Grenada",
        },
        {
          Code: "GP",
          Name: "Guadeloupe",
        },
        {
          Code: "GU",
          Name: "Guam",
        },
        {
          Code: "GT",
          Name: "Guatemala",
        },
        {
          Code: "GG",
          Name: "Guernsey",
        },
        {
          Code: "GN",
          Name: "Guinea",
        },
        {
          Code: "GW",
          Name: "Guinea-Bissau",
        },
        {
          Code: "GY",
          Name: "Guyana",
        },
        {
          Code: "HT",
          Name: "Haiti",
        },
        {
          Code: "HM",
          Name: "Heard Island and McDonald Islands",
        },
        {
          Code: "VA",
          Name: "Holy See (Vatican City State)",
        },
        {
          Code: "HN",
          Name: "Honduras",
        },
        {
          Code: "HK",
          Name: "Hong Kong",
        },
        {
          Code: "HU",
          Name: "Hungary",
        },
        {
          Code: "IS",
          Name: "Iceland",
        },
        {
          Code: "IN",
          Name: "India",
        },
        {
          Code: "ID",
          Name: "Indonesia",
        },
        {
          Code: "IR",
          Name: "Iran, Islamic Republic of",
        },
        {
          Code: "IQ",
          Name: "Iraq",
        },
        {
          Code: "IE",
          Name: "Ireland",
        },
        {
          Code: "IM",
          Name: "Isle of Man",
        },
        {
          Code: "IL",
          Name: "Israel",
        },
        {
          Code: "IT",
          Name: "Italy",
        },
        {
          Code: "JM",
          Name: "Jamaica",
        },
        {
          Code: "JP",
          Name: "Japan",
        },
        {
          Code: "JE",
          Name: "Jersey",
        },
        {
          Code: "JO",
          Name: "Jordan",
        },
        {
          Code: "KZ",
          Name: "Kazakhstan",
        },
        {
          Code: "KE",
          Name: "Kenya",
        },
        {
          Code: "KI",
          Name: "Kiribati",
        },
        {
          Code: "KP",
          Name: "Korea, Democratic People's Republic of",
        },
        {
          Code: "KR",
          Name: "Korea, Republic of",
        },
        {
          Code: "KW",
          Name: "Kuwait",
        },
        {
          Code: "KG",
          Name: "Kyrgyzstan",
        },
        {
          Code: "LA",
          Name: "Lao People's Democratic Republic",
        },
        {
          Code: "LV",
          Name: "Latvia",
        },
        {
          Code: "LB",
          Name: "Lebanon",
        },
        {
          Code: "LS",
          Name: "Lesotho",
        },
        {
          Code: "LR",
          Name: "Liberia",
        },
        {
          Code: "LY",
          Name: "Libya",
        },
        {
          Code: "LI",
          Name: "Liechtenstein",
        },
        {
          Code: "LT",
          Name: "Lithuania",
        },
        {
          Code: "LU",
          Name: "Luxembourg",
        },
        {
          Code: "MO",
          Name: "Macao",
        },
        {
          Code: "MK",
          Name: "Macedonia, the Former Yugoslav Republic of",
        },
        {
          Code: "MG",
          Name: "Madagascar",
        },
        {
          Code: "MW",
          Name: "Malawi",
        },
        {
          Code: "MY",
          Name: "Malaysia",
        },
        {
          Code: "MV",
          Name: "Maldives",
        },
        {
          Code: "ML",
          Name: "Mali",
        },
        {
          Code: "MT",
          Name: "Malta",
        },
        {
          Code: "MH",
          Name: "Marshall Islands",
        },
        {
          Code: "MQ",
          Name: "Martinique",
        },
        {
          Code: "MR",
          Name: "Mauritania",
        },
        {
          Code: "MU",
          Name: "Mauritius",
        },
        {
          Code: "YT",
          Name: "Mayotte",
        },
        {
          Code: "MX",
          Name: "Mexico",
        },
        {
          Code: "FM",
          Name: "Micronesia, Federated States of",
        },
        {
          Code: "MD",
          Name: "Moldova, Republic of",
        },
        {
          Code: "MC",
          Name: "Monaco",
        },
        {
          Code: "MN",
          Name: "Mongolia",
        },
        {
          Code: "ME",
          Name: "Montenegro",
        },
        {
          Code: "MS",
          Name: "Montserrat",
        },
        {
          Code: "MA",
          Name: "Morocco",
        },
        {
          Code: "MZ",
          Name: "Mozambique",
        },
        {
          Code: "MM",
          Name: "Myanmar",
        },
        {
          Code: "NA",
          Name: "Namibia",
        },
        {
          Code: "NR",
          Name: "Nauru",
        },
        {
          Code: "NP",
          Name: "Nepal",
        },
        {
          Code: "NL",
          Name: "Netherlands",
        },
        {
          Code: "NC",
          Name: "New Caledonia",
        },
        {
          Code: "NZ",
          Name: "New Zealand",
        },
        {
          Code: "NI",
          Name: "Nicaragua",
        },
        {
          Code: "NE",
          Name: "Niger",
        },
        {
          Code: "NG",
          Name: "Nigeria",
        },
        {
          Code: "NU",
          Name: "Niue",
        },
        {
          Code: "NF",
          Name: "Norfolk Island",
        },
        {
          Code: "MP",
          Name: "Northern Mariana Islands",
        },
        {
          Code: "NO",
          Name: "Norway",
        },
        {
          Code: "OM",
          Name: "Oman",
        },
        {
          Code: "PK",
          Name: "Pakistan",
        },
        {
          Code: "PW",
          Name: "Palau",
        },
        {
          Code: "PS",
          Name: "Palestine, State of",
        },
        {
          Code: "PA",
          Name: "Panama",
        },
        {
          Code: "PG",
          Name: "Papua New Guinea",
        },
        {
          Code: "PY",
          Name: "Paraguay",
        },
        {
          Code: "PE",
          Name: "Peru",
        },
        {
          Code: "PH",
          Name: "Philippines",
        },
        {
          Code: "PN",
          Name: "Pitcairn",
        },
        {
          Code: "PL",
          Name: "Poland",
        },
        {
          Code: "PT",
          Name: "Portugal",
        },
        {
          Code: "PR",
          Name: "Puerto Rico",
        },
        {
          Code: "QA",
          Name: "Qatar",
        },
        {
          Code: "RE",
          Name: "R\u00e9union",
        },
        {
          Code: "RO",
          Name: "Romania",
        },
        {
          Code: "RU",
          Name: "Russian Federation",
        },
        {
          Code: "RW",
          Name: "Rwanda",
        },
        {
          Code: "BL",
          Name: "Saint Barth\u00e9lemy",
        },
        {
          Code: "SH",
          Name: "Saint Helena, Ascension and Tristan da Cunha",
        },
        {
          Code: "KN",
          Name: "Saint Kitts and Nevis",
        },
        {
          Code: "LC",
          Name: "Saint Lucia",
        },
        {
          Code: "MF",
          Name: "Saint Martin (French part)",
        },
        {
          Code: "PM",
          Name: "Saint Pierre and Miquelon",
        },
        {
          Code: "VC",
          Name: "Saint Vincent and the Grenadines",
        },
        {
          Code: "WS",
          Name: "Samoa",
        },
        {
          Code: "SM",
          Name: "San Marino",
        },
        {
          Code: "ST",
          Name: "Sao Tome and Principe",
        },
        {
          Code: "SA",
          Name: "Saudi Arabia",
        },
        {
          Code: "SN",
          Name: "Senegal",
        },
        {
          Code: "RS",
          Name: "Serbia",
        },
        {
          Code: "SC",
          Name: "Seychelles",
        },
        {
          Code: "SL",
          Name: "Sierra Leone",
        },
        {
          Code: "SG",
          Name: "Singapore",
        },
        {
          Code: "SX",
          Name: "Sint Maarten (Dutch part)",
        },
        {
          Code: "SK",
          Name: "Slovakia",
        },
        {
          Code: "SI",
          Name: "Slovenia",
        },
        {
          Code: "SB",
          Name: "Solomon Islands",
        },
        {
          Code: "SO",
          Name: "Somalia",
        },
        {
          Code: "ZA",
          Name: "South Africa",
        },
        {
          Code: "GS",
          Name: "South Georgia and the South Sandwich Islands",
        },
        {
          Code: "SS",
          Name: "South Sudan",
        },
        {
          Code: "ES",
          Name: "Spain",
        },
        {
          Code: "LK",
          Name: "Sri Lanka",
        },
        {
          Code: "SD",
          Name: "Sudan",
        },
        {
          Code: "SR",
          Name: "Suriname",
        },
        {
          Code: "SJ",
          Name: "Svalbard and Jan Mayen",
        },
        {
          Code: "SZ",
          Name: "Swaziland",
        },
        {
          Code: "SE",
          Name: "Sweden",
        },
        {
          Code: "CH",
          Name: "Switzerland",
        },
        {
          Code: "SY",
          Name: "Syrian Arab Republic",
        },
        {
          Code: "TW",
          Name: "Taiwan, Province of China",
        },
        {
          Code: "TJ",
          Name: "Tajikistan",
        },
        {
          Code: "TZ",
          Name: "Tanzania, United Republic of",
        },
        {
          Code: "TH",
          Name: "Thailand",
        },
        {
          Code: "TL",
          Name: "Timor-Leste",
        },
        {
          Code: "TG",
          Name: "Togo",
        },
        {
          Code: "TK",
          Name: "Tokelau",
        },
        {
          Code: "TO",
          Name: "Tonga",
        },
        {
          Code: "TT",
          Name: "Trinidad and Tobago",
        },
        {
          Code: "TN",
          Name: "Tunisia",
        },
        {
          Code: "TR",
          Name: "Turkey",
        },
        {
          Code: "TM",
          Name: "Turkmenistan",
        },
        {
          Code: "TC",
          Name: "Turks and Caicos Islands",
        },
        {
          Code: "TV",
          Name: "Tuvalu",
        },
        {
          Code: "UG",
          Name: "Uganda",
        },
        {
          Code: "UA",
          Name: "Ukraine",
        },
        {
          Code: "AE",
          Name: "United Arab Emirates",
        },
        {
          Code: "GB",
          Name: "United Kingdom",
        },
        {
          Code: "US",
          Name: "United States",
        },
        {
          Code: "UM",
          Name: "United States Minor Outlying Islands",
        },
        {
          Code: "UY",
          Name: "Uruguay",
        },
        {
          Code: "UZ",
          Name: "Uzbekistan",
        },
        {
          Code: "VU",
          Name: "Vanuatu",
        },
        {
          Code: "VE",
          Name: "Venezuela, Bolivarian Republic of",
        },
        {
          Code: "VN",
          Name: "Viet Nam",
        },
        {
          Code: "VG",
          Name: "Virgin Islands, British",
        },
        {
          Code: "VI",
          Name: "Virgin Islands, U.S.",
        },
        {
          Code: "WF",
          Name: "Wallis and Futuna",
        },
        {
          Code: "EH",
          Name: "Western Sahara",
        },
        {
          Code: "YE",
          Name: "Yemen",
        },
        {
          Code: "ZM",
          Name: "Zambia",
        },
        {
          Code: "ZW",
          Name: "Zimbabwe",
        },
      ],
    };
  }

  clearShoppingCart = () => {
    // this.props.clearShoppingCartData({ apiToken: this.props.apiToken, cartId: this.props.cartId });
  };

  getPaymentType = (event) => {
    if (event.target.name === "checkmo") {
      console.log("checkmo");
      this.setState({
        paymentType: event.target.name,
        showCards: false,
        showCredit: false,
      });
    } else if (event.target.name === "authorizenet_acceptjs") {
      this.setState({
        paymentType: event.target.name,
        showCards: true,
      });
    }
  };

  handleInputQty = (qtyPerBox, cartRid, event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value) {
      if (re.test(event.target.value)) {
        if (event.target.value % qtyPerBox !== 0) {
          /* qty exchange issue */

          const resultRes = [..._get(this.state, ["cartResult", 0, "result"])];

          const cartRidObj = _findIndex(resultRes, ["cart_rid", cartRid]);

          resultRes[cartRidObj].qty = event.target.value / qtyPerBox;

          const cartResult = [...this.state.cartResult];

          cartResult[0].result = resultRes;

          /* qty exchange issue */

          this.setState({
            showCartErrors: false,
            blinkText: true,
            cartErrors: { ...this.state.cartErrors, [cartRid]: true },
            cartResult,
          });
        } else {
          const { productDetails, cartErrors } = this.state;
          delete cartErrors[cartRid];
          productDetails[cartRid] = {
            ...productDetails[cartRid],
            quantity: event.target.value / qtyPerBox,
          };

          /* qty exchange issue */

          const resultRes = [..._get(this.state, ["cartResult", 0, "result"])];

          const cartRidObj = _findIndex(resultRes, ["cart_rid", cartRid]);

          resultRes[cartRidObj].qty = event.target.value / qtyPerBox;

          const cartResult = [...this.state.cartResult];

          cartResult[0].result = resultRes;

          /* qty exchange issue */

          this.setState({
            blinkText: false,
            showCartErrors: false,
            productDetails,
            cartErrors,
            cartResult,
          });
        }
      } else {
        this.setState({
          showCartErrors: false,
          cartErrors: {
            ...this.state.cartErrors,
            [cartRid]: "Please Provide Numeric value",
          },
        });
      }
    } else {
      this.setState({
        showCartErrors: false,
        cartErrors: {
          ...this.state.cartErrors,
          [cartRid]: "This is a required field",
        },
      });
    }
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  continueShopping = () => {
    this.props.history.go(-1);
  };

  //updateCart = () => {
  //if (!_isEmpty(this.state.cartErrors)) {
  ///this.setState({ showCartErrors: true });
  //} else {
  //this.props.getUpdateProduct({
  //apiToken: this.props.apiToken,
  //productDetails: this.state.productDetails,
  //}, 'PATCH');
  // }
  //}

  updateCart = (item, data, qty) => {
    console.log(item);
    console.log(data);
    console.log(qty);
    console.log(this.state.cartResult);
    console.log(this.state.totalCartItems);
    var qtyData = 0;
    if (data === "add") {
      //const { productDetails } = this.state;
      //productDetails[item.item_id] = {
      //qty: qty + 1,
      //};
      const { totalCartItems } = this.state;
      for (var i = 0; i < totalCartItems.length; i++) {
        console.log(totalCartItems[i].item_id === item.item_id);
        if (totalCartItems[i].item_id === item.item_id) {
          console.log(totalCartItems[i]);
          totalCartItems[i].qty = totalCartItems[i].qty + 1;
          qtyData = totalCartItems[i].qty;
        }
      }
      this.setState({
        totalCartItems,
        itemShow: true,
      });
      console.log(this.state.totalCartItems);
    }

    if (data === "sub") {
      //const { productDetails } = this.state;
      //productDetails[item.item_id] = {
      ///qty: qty - 1,
      //};

      const { totalCartItems } = this.state;
      for (var i = 0; i < totalCartItems.length; i++) {
        console.log(totalCartItems[i].item_id === item.item_id);
        if (totalCartItems[i].item_id === item.item_id) {
          console.log(totalCartItems[i]);
          totalCartItems[i].qty = totalCartItems[i].qty - 1;
          qtyData = totalCartItems[i].qty;
        }
      }
      this.setState({
        totalCartItems,
        itemShow: true,
      });
      console.log(this.state.totalCartItems);
    }

    console.log(qtyData);

    const reqBody = {
      sku: item.sku,
      qty: qtyData,
      custom_attributes: item.custom_attributes,
    };
    console.log(reqBody);
    this.props.getUpdateProduct(
      { cartItem: reqBody },
      this.props.apiToken,
      item.item_id
    );
  };

  updateGuestCart = (item, data, qty) => {
    console.log(item);
    console.log(data);
    console.log(qty);
    console.log(this.state.guestStateItems);
    var qtyData = 0;
    if (data === "add") {
      const { guestStateItems } = this.state;
      for (var i = 0; i < guestStateItems.length; i++) {
        console.log(guestStateItems[i].item_id === item.item_id);
        if (guestStateItems[i].item_id === item.item_id) {
          console.log(guestStateItems[i]);
          guestStateItems[i].qty = guestStateItems[i].qty + 1;
          qtyData = guestStateItems[i].qty;
        }
      }
      this.setState({
        guestStateItems,
        itemGuestShow: true,
      });
      console.log(this.state.guestStateItems);
    }

    if (data === "sub") {
      const { guestStateItems } = this.state;
      for (var i = 0; i < guestStateItems.length; i++) {
        console.log(guestStateItems[i].item_id === item.item_id);
        if (guestStateItems[i].item_id === item.item_id) {
          console.log(guestStateItems[i]);
          guestStateItems[i].qty = guestStateItems[i].qty - 1;
          qtyData = guestStateItems[i].qty;
        }
      }
      this.setState({
        guestStateItems,
        itemGuestShow: true,
      });
      console.log(this.state.guestStateItems);
    }

    console.log(qtyData);

    const reqBody = {
      mask_id: this.props.maskId,
      sku: item.sku,
      qty: qtyData,
      custom_attributes: item.custom_attributes,
    };
    console.log(reqBody);
    this.props.updateGuest({ cartItem: reqBody }, item.item_id);
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

  showWithoutLogin = () => {
    this.props.showLoginModal({ show: true });
  };

  handleMoveToWishlist = (productId) => {
    this.props.moveToWishlist({
      apiToken: this.props.apiToken,
      productId,
      cartId: this.props.cartId,
    });
  };

  handleInputChange = (event) => {
    this.setState({
      discountCouponValue: event.target.value,
    });
  };

  handleStateChange = (event) => {
    this.setState({
      selectStateValueShipping: event.target.value,
    });
  };

  handleStateChange1 = (event) => {
    this.setState({
      selectStateValueBilling: event.target.value,
    });
  };

  handleCountryChange = (event) => {
    this.setState({
      selectCountryValueBilling: event.target.value,
      billState: true,
    });
    this.props.getBillState(event.target.value);
  };

  applyDiscountCoupon = () => {
    console.log(this.state.cartDataId);
    console.log(this.state.discountCouponValue);
    if (this.handleValidation()) {
      this.props.getDiscountCouponData(
        this.props.apiToken,
        this.state.discountCouponValue
      );
    }
  };

  handleValidation() {
    const errors = {};
    let formIsValid = true;

    //  FirstName
    if (
      this.state.discountCouponValue === undefined ||
      this.state.discountCouponValue === ""
    ) {
      formIsValid = false;
      errors.discountCouponValue = "This is a required field";
    }

    this.setState({ errors });
    return formIsValid;
  }

  cancelDiscountCoupon = () => {
    this.props.getCancelDiscountCouponData(this.props.apiToken);
  };

  handleCheckOut = () => {
    this.props.removeExpiredProducts({
      apiToken: this.props.apiToken,
      cartId: this.props.cartId,
    });
    this.source = "checkout";
  };

  componentDidMount() {
    document.title = "Shopping Cart";
    //window.scrollTo({bottom: 0, behavior: 'smooth'});
    // window.scrollTo(100, 100);
    //this.scrollToBottom();
    window.scrollTo(0, 500);
    //var elmnt = document.getElementById("content");
    //elmnt.scrollIntoView({ behavior: "smooth",  });
    //document.getElementById('headerData').scrollIntoView();
    this.state.fields.postalCode = this.props.zipcode;
    //localStorage.removeItem("cart");
    const copyCartObj = JSON.parse(localStorage.getItem("cart"));
    console.log(copyCartObj);
    //this.setState({ cartObj: copyCartObj });
    // this.props.clearCartData();
    console.log(this.props.apiToken);
    console.log(this.state.categoryId);
    console.log(this.state.stateListData);
    if (this.props.stateListData === undefined) {
      this.props.getStateListData();
    }
    this.props.getBillState("IN");
    if (this.props.apiToken !== "") {
      this.props.getCart(this.props.apiToken);
      //this.props.getCartData(this.props.apiToken);
      this.props.fetchBillingAddress(this.props.custId);
      this.props.fetchShippingAddress(this.props.custId);
      this.setState({
        showShippingAllAddress: true,
        showBillingAllAddress: true,
        billState: true,
      });
    }
    console.log(this.props.maskId);
    if (this.props.apiToken === "") {
      if (this.props.maskId === undefined) {
        this.setState({
          pageLoader: false,
          guestStateItems: this.props.guestCartItems,
          guestStateList: this.props.guestCartList,
        });
      } else {
        this.props.getGuestList(this.props.maskId);

        this.setState({
          //pageLoader: false,
          shipGuestShow: true,
        });
      }
    }
  }

  handleSaveAddress = () => {
    console.log(this.state.selectStateValueShipping);
    console.log("edit outside", this.handleValidationData());
    console.log(this.state.fields);
    if (this.handleValidationData()) {
      this.setState({
        showShippingLoader: true,
      });
      var data = undefined;
      var data1 = undefined;
      if (this.state.fields.streetAddress2 === "") {
        data = [this.state.fields.streetAddress1];
      } else {
        data = [
          this.state.fields.streetAddress1,
          this.state.fields.streetAddress2,
        ];
      }
      if (this.state.fields.company === undefined) {
        data1 = null;
      } else {
        data1 = this.state.fields.company;
      }
      console.log("edit inside");
      const addressObj = {
        address_id: this.state.fields.addressId,
        firstname: this.state.fields.firstName,
        lastname: this.state.fields.lastName,
        company: data1,
        street: data,
        city: this.state.fields.city,
        country_id: "IN",
        region_id: parseInt(this.state.selectStateValueShipping),
        postcode: this.state.fields.postalCode,
        telephone: this.state.fields.telephone,
        default_shipping: true,
        default_billing:
          _get(this.state, "fields.defaultBilling", false) === 1 ? true : false,
      };
      console.log(addressObj);
      if (this.state.fields.addressId !== undefined) {
        console.log("edit");
        this.props.saveAddress(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
        this.setState({
          addTerm: "shipping",
          showEdit: true,
        });
      } else {
        console.log("insert");
        this.props.getAddAddressData(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
        this.setState({
          addTerm: "shipping",
          newAdd: true,
        });
      }
    }
  };

  handleSaveBillingAddress = () => {
    console.log("edit outside", this.handleValidationBillingData());
    console.log(this.state.fields1);
    if (this.handleValidationBillingData()) {
      this.setState({
        showBillingLoader: true,
      });
      var data = undefined;
      var data1 = undefined;
      if (this.state.fields1.streetAddress2 === "") {
        data = [this.state.fields1.streetAddress1];
      } else {
        data = [
          this.state.fields1.streetAddress1,
          this.state.fields1.streetAddress2,
        ];
      }
      if (this.state.fields1.company === undefined) {
        data1 = null;
      } else {
        data1 = this.state.fields1.company;
      }
      console.log("edit inside");
      const addressObj = {
        address_id: this.state.fields1.addressId,
        firstname: this.state.fields1.firstName,
        lastname: this.state.fields1.lastName,
        company: data1,
        street: data,
        city: this.state.fields1.city,
        country_id: this.state.selectCountryValueBilling,
        region_id: parseInt(this.state.selectStateValueBilling),
        postcode: this.state.fields1.postalCode,
        telephone: this.state.fields1.telephone,
        default_shipping: false,
        default_billing: true,
      };
      console.log(addressObj);
      if (this.state.fields1.addressId !== undefined) {
        console.log("edit");
        this.props.saveAddress(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
        this.setState({
          addTerm: "billing",
          showEdit: true,
        });
      } else {
        console.log("insert");
        this.props.getAddAddressData(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
        this.setState({
          addTerm: "billing",
          newAdd: true,
        });
      }
    }
  };

  handleValidationBillingData = () => {
    let fields1 = this.state.fields1;
    let errors1 = {};
    let formIsValid = true;

    console.log(fields1);

    if (!fields1.firstName) {
      formIsValid = false;
      errors1.firstName = "This is required fields";
    }
    if (typeof fields1.firstName !== "undefined") {
      if (!fields1.firstName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors1.firstName = "First Name is not valid";
      }
    }

    if (!fields1.lastName) {
      formIsValid = false;
      errors1.lastName = "This is required fields";
    }
    if (typeof fields1.lastName !== "undefined") {
      if (!fields1.lastName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors1.lastName = "Last Name is not valid";
      }
    }

    if (!fields1.telephone) {
      formIsValid = false;
      errors1.telephone = "This is required fields";
    } else if (!fields1.telephone.match(/^[0-9]+$/)) {
      formIsValid = false;
      errors1.telephone = "Telephone is not valid";
    }
    if (!fields1.streetAddress1) {
      formIsValid = false;
      errors1.streetAddress1 = "This is required fields";
    }
    if (!fields1.city) {
      formIsValid = false;
      errors1.city = "This is required fields";
    }
    if (!fields1.postalCode) {
      formIsValid = false;
      errors1.postalCode = "This is required fields";
    }
    if (!this.state.selectStateValueBilling) {
      formIsValid = false;
      errors1.selectStateValueBilling = "This is required fields";
    }

    this.setState({ errors1 });
    return formIsValid;
  };

  handleValidationData = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    console.log(fields);

    if (!fields.firstName) {
      formIsValid = false;
      errors.firstName = "This is required fields";
    }
    if (typeof fields.firstName !== "undefined") {
      if (!fields.firstName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors.firstName = "First Name is not valid";
      }
    }

    if (!fields.lastName) {
      formIsValid = false;
      errors.lastName = "This is required fields";
    }
    if (typeof fields.lastName !== "undefined") {
      if (!fields.lastName.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors.lastName = "Last Name is not valid";
      }
    }

    if (!fields.telephone) {
      formIsValid = false;
      errors.telephone = "This is required fields";
    } else if (!fields.telephone.match(/^[0-9]+$/)) {
      formIsValid = false;
      errors.telephone = "Telephone is not valid";
    }
    if (!fields.streetAddress1) {
      formIsValid = false;
      errors.streetAddress1 = "This is required fields";
    }
    if (!fields.city) {
      formIsValid = false;
      errors.city = "This is required fields";
    }

    if (!this.state.selectStateValueShipping) {
      formIsValid = false;
      errors.selectStateValueShipping = "This is required fields";
    }

    this.setState({ errors });
    return formIsValid;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let data = [];
    if (
      !_isEmpty(_get(nextProps, "billingAddressData")) &&
      this.state.showBillingAllAddress
    ) {
      console.log(nextProps.billingAddressData);
      const selectedAddress = {
        addressId: _get(nextProps.billingAddressData, "id", ""),
        firstName: _get(nextProps.billingAddressData, "firstname", ""),
        middleName: _get(nextProps.billingAddressData, "middlename", ""),
        lastName: _get(nextProps.billingAddressData, "lastname", ""),
        company: _get(nextProps.billingAddressData, "company", ""),
        telephone: _get(nextProps.billingAddressData, "telephone", ""),
        streetAddress1: _get(nextProps.billingAddressData, "street[0]", ""),
        streetAddress2:
          _get(nextProps.billingAddressData.street.length) <= 1
            ? ""
            : _get(nextProps.billingAddressData, "street[1]", ""),
        city: _get(nextProps.billingAddressData, "city", ""),
        postalCode: _get(nextProps.billingAddressData, "postcode", ""),
        stateId: _get(nextProps.billingAddressData, "region_id", ""),
        region: nextProps.billingAddressData.region.region,
      };
      this.setState({
        fields1: selectedAddress,
        billAddress: selectedAddress,
        selectStateValueBilling: nextProps.billingAddressData.region.region_id,
        selectCountryValueBilling: nextProps.billingAddressData.country_id,
        showBillingAllAddress: false,
        showReserve: true,
        billAddressCame: true,
        billState: true,
      });
      this.props.getBillState(nextProps.billingAddressData.country_id);
    }

    if (
      !_isEmpty(_get(nextProps, "shippingAddressData")) &&
      this.state.showShippingAllAddress
    ) {
      console.log(nextProps.shippingAddressData);
      const selectedAddress1 = {
        addressId: _get(nextProps.shippingAddressData, "id", ""),
        firstName: _get(nextProps.shippingAddressData, "firstname", ""),
        middleName: _get(nextProps.shippingAddressData, "middlename", ""),
        lastName: _get(nextProps.shippingAddressData, "lastname", ""),
        company: _get(nextProps.shippingAddressData, "company", ""),
        telephone: _get(nextProps.shippingAddressData, "telephone", ""),
        streetAddress1: _get(nextProps.shippingAddressData, "street[0]", ""),
        streetAddress2:
          _get(nextProps.shippingAddressData.street.length) <= 1
            ? ""
            : _get(nextProps.shippingAddressData, "street[1]", ""),
        city: _get(nextProps.shippingAddressData, "city", ""),
        postalCode: _get(nextProps.shippingAddressData, "postcode", ""),
        stateId: _get(nextProps.shippingAddressData, "region_id", ""),
        region: nextProps.shippingAddressData.region.region,
      };
      this.setState({
        fields: selectedAddress1,
        shipAddress: selectedAddress1,
        selectStateValueShipping:
          nextProps.shippingAddressData.region.region_id,
        showShippingAllAddress: false,
        showReserve: true,
        shipAddressCame: true,
        //selectCountryValueBilling: nextProps.shippingAddressData.country_id,
      });
    }
    //console.log((!_isEmpty(_get(nextProps, 'shippingAddressData')) || !_isEmpty(this.props.shippingAddressData)));
    //console.log((!_isEmpty(_get(nextProps, 'billingAddressData')) || !_isEmpty(this.props.billingAddressData)));
    // console.log(this.state.showReserve);
    // console.log(this.state.billAddress);
    // console.log(this.state.shipAddress);
    if (
      !_isEmpty(_get(nextProps, "shippingAddressData")) &&
      !_isEmpty(_get(nextProps, "billingAddressData")) &&
      this.state.showReserve
    ) {
      //console.lo
      this.setState({
        showReserve: false,
      });
      console.log(nextProps.billingAddressData);
      console.log(nextProps.shippingAddressData);
      var billAdd = {
        customerAddressId: nextProps.billingAddressData.id,
        region: nextProps.billingAddressData.region.region,
        region_id: nextProps.billingAddressData.region_id,
        country_id: "IN",
        street: nextProps.billingAddressData.street,
        company: nextProps.billingAddressData.company,
        telephone: nextProps.billingAddressData.telephone,
        postcode: nextProps.billingAddressData.postcode,
        city: nextProps.billingAddressData.city,
        firstname: nextProps.billingAddressData.firstname,
        lastname: nextProps.billingAddressData.lastName,
      };
      var shipAdd = {
        customerAddressId: nextProps.shippingAddressData.id,
        region: nextProps.shippingAddressData.region.region,
        region_id: nextProps.shippingAddressData.region_id,
        country_id: "IN",
        street: nextProps.shippingAddressData.street,
        company: nextProps.shippingAddressData.company,
        telephone: nextProps.shippingAddressData.telephone,
        postcode: nextProps.shippingAddressData.postcode,
        city: nextProps.shippingAddressData.city,
        firstname: nextProps.shippingAddressData.firstname,
        lastname: nextProps.shippingAddressData.lastName,
      };
      var reqObj = {
        shipping_address: shipAdd,
        billing_address: billAdd,
        shipping_carrier_code: "flatrate",
        shipping_method_code: "flatrate",
      };

      this.props.getGrandTotal(this.props.cartId, {
        addressInformation: reqObj,
      });
    }
    //let cartGift=[];
    let dc = [];
    let shipAmm = 0;
    let grandTotal = 0;
    let dd = 0;
    if (!_isEmpty(_get(nextProps, "newCartData"))) {
      console.log(nextProps.newCartData);
      if (nextProps.newCartData[0].status === true) {
        for (var i = 0; i < nextProps.newCartData[0].items.length; i++) {
          dc.push({
            item_id: nextProps.newCartData[0].items[i].item_id,
            gift_message:
              nextProps.newCartData[0].items[i].custom_attributes.gift_message,
          });
        }
        // console.log(nextProps.newCartData[0].totals.items_qty);
        // console.log(nextProps.newCartData[0].totals.shipping_amount_per_item.toString());
        if (nextProps.newCartData[0].totals.length !== 0) {
          shipAmm =
            nextProps.newCartData[0].totals.items_qty *
            nextProps.newCartData[0].totals.shipping_amount_per_item.toString();
          console.log(shipAmm);
          // console.log(nextProps.newCartData[0].totals.subtotal.toString());
          grandTotal =
            shipAmm + parseFloat(nextProps.newCartData[0].totals.subtotal);
          dd = shipAmm.toFixed(2);
        }
        this.setState({
          totalCartItems: nextProps.newCartData[0].items,
          cartDataShow: nextProps.newCartData[0],
          cartGift: dc,
          shipTotalAmount: dd,
          grandTotalAmount: grandTotal,
          pageLoader: false,
        });
      }
    }
    if (!_isEmpty(_get(nextProps, "customerAddress"))) {
      data = nextProps.customerAddress;
      this.setState({
        addData: this.createChildren({ data }),
      });
    }
    console.log(nextProps.giftMessage);
    console.log(this.state.giffyLoader);
    if (!_isEmpty(_get(nextProps, "giftMessage")) && this.state.giffyLoader) {
      console.log(nextProps.giftMessage);
      toast.success("Gift Message Added Successfully!");
      this.setState({
        giffyLoader: false,
      });
      this.props.getCart(this.props.apiToken);
    }

    if (!_isEmpty(_get(nextProps, "billStateData")) && this.state.billState) {
      console.log(nextProps.billStateData);
      this.setState({
        billStateResponse: nextProps.billStateData,
        billState: false,
      });
    }

    if (
      !_isEmpty(_get(nextProps, "placeOrderSuccess")) &&
      this.state.placeStatus
    ) {
      data = nextProps.placeOrderSuccess;
      if (nextProps.placeOrderSuccess[0].status === true) {
        this.setState({
          showCheckoutSuccess: true,
          placeSuccess: false,
          orderId: nextProps.placeOrderSuccess[0].order_number,
        });
      } else {
        this.setState({
          showCheckoutSuccess: false,
          placeSuccess: false,
        });
        swal("", nextProps.placeOrderSuccess[0].message, "error");
      }
    }

    if (
      !_isEmpty(_get(nextProps, "firstCartData")) &&
      this.state.shipShow === false
    ) {
      {
        /* console.log(nextProps.firstCartData);
        this.setState({
          cartResult: nextProps.firstCartData,
          productDetails: nextProps.firstCartData.items,
          billingAddress: nextProps.firstCartData.billing_address,
          shippingAddress: nextProps.firstCartData.extension_attributes.shipping_assignments[0].shipping.address,
          shipShow: true,
          cartDataId: nextProps.firstCartData.id,
         

        });
        var reqObj =
        { shipping_address : nextProps.firstCartData.extension_attributes.shipping_assignments[0].shipping.address,
          billing_address:nextProps.firstCartData.billing_address,shipping_carrier_code:'flatrate',shipping_method_code:'flatrate'
          };

        this.props.getGrandTotal( nextProps.firstCartData.id, {addressInformation : reqObj});*/
      }
    }
    console.log(this.state.shipShow);
    if (!_isEmpty(_get(nextProps, "updateCartData")) && this.state.itemShow) {
      toast.success("Cart updated Successfully!");
      this.props.getCart(this.props.apiToken);
      this.setState({
        shipShow: false,
        itemShow: false,
      });
    }

    if (
      !_isEmpty(_get(nextProps, "RemoveFromCartData")) &&
      this.state.itemShow
    ) {
      this.props.getCart(this.props.apiToken);
      this.setState({
        shipShow: false,
        itemShow: false,
      });
    }

    if (!_isEmpty(_get(nextProps, "grandTotalData"))) {
      console.log(nextProps.grandTotalData);
      this.setState({
        //shipShow: true,
        priceData: nextProps.grandTotalData,
        paymentMethod: nextProps.grandTotalData.payment_methods,
        totalAmount: nextProps.grandTotalData.totals,
      });
    }

    if (
      !_isEmpty(_get(nextProps, "guestUpdateCartResponse")) &&
      this.state.itemGuestShow
    ) {
      toast.success("Cart updated Successfully!");
      console.log(this.props.maskId);
      this.props.getGuestList(this.props.maskId);
      this.setState({
        shipGuestShow: true,
        itemGuestShow: false,
      });
    }

    if (
      !_isEmpty(_get(nextProps, "guestDeleteCartResponse")) &&
      this.state.itemGuestDeleteShow
    ) {
      toast.success("Cart Product deleted Successfully!");
      console.log(this.props.maskId);
      this.props.getGuestList(this.props.maskId);
      this.setState({
        shipGuestShow: true,
        itemGuestDeleteShow: false,
      });
    }
    console.log(nextProps.guestCartItems);
    console.log(this.props.guestCartItems);
    if (
      !_isEmpty(_get(nextProps, "guestCartList")) &&
      this.state.shipGuestShow
    ) {
      console.log("test", nextProps.guestCartItems);
      this.setState({
        shipGuestShow: false,
        guestStateItems: nextProps.guestCartItems,
        guestStateList: nextProps.guestCartList,
        pageLoader: false,
      });
    }

    if (!_isEmpty(_get(nextProps, "editAddressData")) && this.state.showEdit) {
      console.log(nextProps.editAddressData);
      if (this.state.addTerm === "shipping") {
        this.setState({
          showShippingAllAddress: true,
          showEdit: false,
          showReserve: true,
          showShippingLoader: false,
        });
        toast.success("Shipping address Updated Successfully!");
        this.props.fetchShippingAddress(this.props.custId);
        //this.props.fetchBillingAddress(this.props.custId);
      } else {
        this.setState({
          showBillingAllAddress: true,
          showEdit: false,
          showReserve: true,
          showShippingLoader: false,
          showBillingLoader: false,
        });
        toast.success("Billing address Updated Successfully!");
        this.props.fetchBillingAddress(this.props.custId);
        // this.props.fetchShippingAddress(this.props.custId);
      }
    }

    if (!_isEmpty(_get(nextProps, "addAddressData")) && this.state.newAdd) {
      console.log(nextProps.addAddressData);
      if (this.state.addTerm === "shipping") {
        this.setState({
          showShippingAllAddress: true,
          showBillingAllAddress: true,
          newAdd: false,
          showReserve: true,
          showShippingLoader: false,
        });
        toast.success("Shipping address Added Successfully!");
        this.props.fetchShippingAddress(this.props.custId);
        this.props.fetchBillingAddress(this.props.custId);
      } else {
        this.setState({
          showBillingAllAddress: true,
          newAdd: false,
          showReserve: true,
          showShippingLoader: false,
          showBillingLoader: false,
        });
        toast.success("Billing address Added Successfully!");
        this.props.fetchShippingAddress(this.props.custId);
        this.props.fetchBillingAddress(this.props.custId);
      }
    }
  }

  handleCardData = () => {
    let fields2 = this.state.fields2;
    let errors2 = {};
    let formIsValid = true;

    console.log(fields2);

    if (!fields2.cardNumber) {
      formIsValid = false;
      errors2.cardNumber = "This is required fields";
    }

    if (!fields2.expirationDate) {
      formIsValid = false;
      errors2.expirationDate = "This is required fields";
    }

    if (!fields2.cardCode) {
      formIsValid = false;
      errors2.cardCode = "This is required fields";
    }
    this.setState({ errors2 });
    return formIsValid;
  };

  placeShoppingOrder = () => {
    console.log(this.state.grandTotalAmount);
    console.log(this.state.shipTotalAmount);
    if (this.handleCardData()) {
      if (
        this.state.billAddress !== undefined &&
        this.state.shipAddress !== undefined
      ) {
        console.log("place order", this.state.fields2);
        var credit = {
          cardNumber: this.state.fields2.cardNumber,
          expirationDate: this.state.fields2.expirationDate,
          cardCode: this.state.fields2.cardCode,
        };
        var dataList = [];
        for (var i = 0; i < this.props.newCartData[0].items.length; i++) {
          var data = {
            itemId: this.props.newCartData[0].items[i].item_id,
            name: this.props.newCartData[0].items[i].name.substring(0, 15),
            description: this.props.newCartData[0].items[i].name.substring(
              0,
              15
            ),
            quantity: this.props.newCartData[0].items[i].qty,
            unitPrice: this.props.newCartData[0].items[i].row_total,
          };

          dataList.push(data);
        }
        console.log(dataList);
        var billToData = {
          firstName: this.props.billingAddressData.firstname,
          lastName: this.props.billingAddressData.lastname,
          company: this.props.billingAddressData.company,
          address: this.props.billingAddressData.street[0],
          city: this.props.billingAddressData.city,
          state: this.props.billingAddressData.region.region,
          zip: this.props.billingAddressData.postcode,
          country: this.props.billingAddressData.country_id,
        };
        var shipToData = {
          firstName: this.props.shippingAddressData.firstname,
          lastName: this.props.shippingAddressData.lastname,
          company: this.props.shippingAddressData.company,
          address: this.props.shippingAddressData.street[0],
          city: this.props.shippingAddressData.city,
          state: this.props.shippingAddressData.region.region,
          zip: this.props.shippingAddressData.postcode,
          country: this.props.shippingAddressData.country_id,
        };

        var transReq = {
          transactionType: "authCaptureTransaction",
          amount: this.state.cartDataShow.totals.grand_total,
          payment: {
            creditCard: credit,
          },
          lineItems: {
            lineItem: dataList,
          },
          shipping: {
            amount: this.state.shipTotalAmount,
            name: "level2 tax name",
            description: "level2 tax",
          },
          poNumber: this.props.reserveId,
          customer: {
            id: this.props.custId,
          },
          billTo: billToData,
          shipTo: shipToData,
          transactionSettings: {
            setting: {
              settingName: "testRequest",
              settingValue: "false",
            },
          },
          userFields: {
            userField: [
              {
                name: "MerchantDefinedFieldName1",
                value: "MerchantDefinedFieldValue1",
              },
              {
                name: "favorite_color",
                value: "blue",
              },
            ],
          },
        };
        var merAuth = {
          name: "9q9STf9z",
          transactionKey: "4pm92QFsSB44mf4A",
        };

        var reqObj = {
          createTransactionRequest: {
            merchantAuthentication: merAuth,
            refId: this.props.reserveId,
            transactionRequest: transReq,
          },
        };

        console.log(reqObj);
        this.setState({
          placeSuccess: true,
        });

        axios
          .post(
            "https://api.authorize.net/xml/v1/request.api",
            JSON.stringify(reqObj)
          )
          .then((data) => {
            console.log("data", data);
            if (data.data.messages.resultCode === "Ok") {
              if (data.data.transactionResponse.responseCode === "1") {
                var dataObj = {
                  authCode: data.data.transactionResponse.authCode,
                  avsResultCode: data.data.transactionResponse.avsResultCode,
                  cvvResultCode: data.data.transactionResponse.cvvResultCode,
                  cavvResultCode: data.data.transactionResponse.cavvResultCode,
                  transId: data.data.transactionResponse.transId,
                  refTransID: data.data.transactionResponse.refTransID,
                  transHash: data.data.transactionResponse.transHash,
                  testRequest: data.data.transactionResponse.testRequest,
                  accountNumber: data.data.transactionResponse.accountNumber,
                  accountType: data.data.transactionResponse.accountType,
                  refId: data.data.refId,
                };
                var reqObjData = {
                  method: "authorizenet_acceptjs",
                  transactionResponse: dataObj,
                };
                this.setState({
                  placeStatus: true,
                });
                this.props.placeOrder(
                  { payment: reqObjData },
                  this.props.apiToken
                );
              } else {
                this.setState({
                  placeSuccess: false,
                });
                alert("Wrong CVV No or Expiry Date");
              }
            } else {
              this.setState({
                placeSuccess: false,
              });
              alert("Wrong card number");
            }
          })
          .catch((err) => {
            console.error("err", err);
          });
      }
    }
  };

  placeZeroShoppingOrder = () => {
    this.setState({
      placeStatus: true,
      placeSuccess: true,
    });

    var reqObjData = {
      method: "cashondelivery",
    };
    this.props.placeOrder({ payment: reqObjData }, this.props.apiToken);
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

  handleChange1 = (event) => {
    let { fields1 } = this.state;
    fields1[event.target.id] = event.target.value;
    this.setState({ fields1 });
    console.log(this.fields1);
  };

  handleChange2 = (event) => {
    let { fields2 } = this.state;
    fields2[event.target.id] = event.target.value;
    this.setState({ fields2 });
    console.log(this.fields2);

    if (event.target.id === "cardNumber") {
      var res = event.target.value.charAt(0);
      console.log(res);
      if (res === "3") {
        var d = "amex";
        this.setState({
          cadeImageShow: d,
        });
      }
      if (res === "4") {
        var d = "visa";
        this.setState({
          cadeImageShow: d,
        });
      }
      if (res === "5") {
        var d = "master";
        this.setState({
          cadeImageShow: d,
        });
      }
      if (res === "6") {
        var d = "discover";
        this.setState({
          cadeImageShow: d,
        });
      }
    }
  };

  handleChange4 = (event, data) => {
    console.log(event);
    console.log(data);
    this.setState({
      showGF: true,
    });
    const { cartGift } = this.state;
    for (var i = 0; i < cartGift.length; i++) {
      if (data.item_id === cartGift[i].item_id) {
        cartGift[i].gift_message = event;
      }
    }
    // console.log(this.state.cartGift);
    this.setState({
      cartGift,
    });
  };

  handleSaveGift = (data) => {
    console.log(data);
    this.setState({
      giffyLoader: true,
      showGF: false,
    });
    this.props.getGiftMessage(data);
  };

  handleChangeBill = () => {
    this.setState({
      defBillAdd: !this.state.defBillAdd,
    });
    console.log(this.state.defBillAdd);
    console.log(this.state.fields);

    if (this.state.defBillAdd === false) {
      const selectedAddress = {
        addressId: this.state.fields.addressId,
        firstName: this.state.fields.firstName,
        middleName: this.state.fields.middleName,
        lastName: this.state.fields.lastName,
        company: this.state.fields.company,
        telephone: this.state.fields.telephone,
        streetAddress1: this.state.fields.streetAddress1,
        streetAddress2: this.state.fields.streetAddress2,
        city: this.state.fields.city,
        postalCode: this.state.fields.postalCode,
        stateId: this.state.fields.stateId,
      };
      this.setState({
        fields1: selectedAddress,
        billAddress: selectedAddress,
        selectStateValueBilling: this.state.selectStateValueShipping,
      });
      const addressObj = {
        address_id: this.state.fields.addressId,
        firstname: this.state.fields.firstName,
        lastname: this.state.fields.lastName,
        company: this.state.fields.company,
        street: [
          this.state.fields.streetAddress1,
          this.state.fields.streetAddress2,
        ],
        city: this.state.fields.city,
        country_id: "IN",
        region_id: this.state.selectStateValueShipping,
        postcode: this.props.zipcode,
        telephone: this.state.fields.telephone,
        default_shipping: true,
        default_billing: true,
      };
      console.log(addressObj);
      this.props.saveAddress(
        { customer: { id: this.props.custId, address: addressObj } },
        this.props.apiToken
      );
      this.setState({
        addTerm: "billing",
        showEdit: true,
      });
    } else {
      const selectedAddress = {
        addressId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        company: "",
        telephone: "",
        streetAddress1: "",
        streetAddress2: "",
        city: "",
        postalCode: "",
        stateId: "",
      };
      this.setState({
        fields1: selectedAddress,
        billAddress: undefined,
        selectStateValueBilling: "",
      });
      const addressObj = {
        address_id: this.state.fields1.addressId,
        firstname: this.state.fields.firstName,
        lastname: this.state.fields.lastName,
        company: this.state.fields.company,
        street: [
          this.state.fields.streetAddress1,
          this.state.fields.streetAddress2,
        ],
        city: this.state.fields.city,
        country_id: "IN",
        region_id: this.state.selectStateValueShipping,
        postcode: this.props.zipcode,
        telephone: this.state.fields.telephone,
        default_shipping: true,
        default_billing: false,
      };
      console.log(addressObj);
      this.props.saveAddress(
        { customer: { id: this.props.custId, address: addressObj } },
        this.props.apiToken
      );
      this.setState({
        addTerm: "billing",
        showEdit: true,
      });
    }
  };

  onErrorHandler = (response) => {
    this.setState({
      status: ["failure", response.messages.message.map((err) => err.text)],
    });
  };

  onSuccessHandler = (response) => {
    // Process API response on your backend...
    console.log(response);
    alert(response);
    this.setState({ status: ["failure", []] });
  };

  showAddressModal = (d) => {
    console.log("test ee", d);
    this.setState({
      addTerm: d,
      showAdModal: !this.state.showAdModal,
    });
  };

  changeShippingAddress = (d) => {
    console.log(d);
    for (var i = 0; i < this.props.customerAddress.length; i++) {
      if (this.props.customerAddress[i].id === d.addressId) {
        console.log(this.props.customerAddress[i]);
        const addressObj = {
          address_id: this.props.customerAddress[i].id,
          firstname: this.props.customerAddress[i].firstname,
          lastname: this.props.customerAddress[i].lastname,
          company: this.props.customerAddress[i].company,
          street: this.props.customerAddress[i].street,
          city: this.props.customerAddress[i].city,
          country_id: "IN",
          region_id: this.props.customerAddress[i].region_id,
          postcode: this.props.customerAddress[i].postcode,
          telephone: this.props.customerAddress[i].telephone,
          default_shipping: true,
          default_billing: false,
        };
        this.setState({
          showEdit: true,
          // showShippingAllAddress: true,
        });
        this.props.saveAddress(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
      }
    }
  };

  changeBillingAddress = (d) => {
    console.log(d);
    for (var i = 0; i < this.props.customerAddress.length; i++) {
      if (this.props.customerAddress[i].id === d.addressId) {
        console.log(this.props.customerAddress[i]);
        const addressObj = {
          address_id: this.props.customerAddress[i].id,
          firstname: this.props.customerAddress[i].firstname,
          lastname: this.props.customerAddress[i].lastname,
          company: this.props.customerAddress[i].company,
          street: this.props.customerAddress[i].street,
          city: this.props.customerAddress[i].city,
          country_id: "IN",
          region_id: this.props.customerAddress[i].region_id,
          postcode: this.props.customerAddress[i].postcode,
          telephone: this.props.customerAddress[i].telephone,
          default_billing: true,
          default_shipping: false,
        };
        this.setState({
          showEdit: true,
          //showBillingAllAddress: true,
        });

        this.props.saveAddress(
          { customer: { id: this.props.custId, address: addressObj } },
          this.props.apiToken
        );
      }
    }
  };

  addShow = (e) => {
    console.log(e);
    if (this.state.addTerm !== undefined) {
      if (this.state.addTerm === "shipping") {
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
          shipAddress: selectedAddress,
        });
      } else {
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
          billAddress: selectedAddress,
        });
      }
    }
  };

  handleAddAddress = () => {
    this.props.history.push("/customer/account/address/new");
  };

  createChildren = ({ data }) =>
    Object.keys(data).map((i) => (
      <div>
        <a onClick={() => this.addShow(data[i])}>
          <center>
            <div
              style={{
                border: "1px solid rgb(47, 175, 204)",
                height: "170px",
                width: "200px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  border: "1px solid rgb(47, 175, 204)",
                  backgroundColor: "rgb(245, 245, 245)",
                  textTransform: "none",
                  padding: "10px",
                }}
              >
                Address
              </div>
              <address>
                {_get(data[i], "firstname")}&nbsp;{_get(data[i], "lastname")}
                <br />
                {_get(data[i], "company")}&nbsp;{_get(data[i], "street[0]")}
                <br />
                {_get(data[i], "city")}, {_get(data[i], "region.region")},{" "}
                {_get(data[i], "postcode")}
                <br />
                {_get(data[i], "country_id")}
              </address>
            </div>
          </center>
        </a>
      </div>
    ));

  onSlideChange(e) {
    console.debug("Item`s position during a change: ", e.item);
    console.debug("Slide`s position during a change: ", e.slide);
  }

  onSlideChanged(e) {
    console.debug("Item`s position after changes: ", e.item);
    console.debug("Slide`s position after changes: ", e.slide);
  }

  backToCart = () => {
    this.setState({
      goToCheckOut: true,
    });
  };

  // onChange = () => {

  // }
  render() {
    if (this.state.pageLoader) {
      return (
        <div id="cover-spin">
          <center>
            <img
              src={logLoader}
              style={{ height: "126px", marginTop: "300px" }}
              alt="lazy-loader"
            />
          </center>
        </div>
      );
    }

    if (this.state.goToCheckOut) {
      this.setState({
        goToCheckOut: false,
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

    if (_get(this.state, "showCheckoutSuccess")) {
      return (
        <Redirect
          push
          to={{
            pathname: "/checkout/onepage/success",
            state: { orderId: this.state.orderId },
          }}
        />
      );
    }
    console.log(this.state.productDetails);
    return (
      <div>
        <MetaTags>
          <title>CheckOut | Buy Flowers | Arabella Bouquets</title>
          <meta
            name="keywords"
            content="Fresh flowers, send flowers, online delivery, roses, sunflower, daisies, gerbera, aster, solidago, lilies, best florist in USA"
          />
          <meta
            name="description"
            content="Send fresh flowers direct from farm for your loved ones, celebrate Birthday wises, surprises gifts and more with our colorful and vibrant flowers."
          />
        </MetaTags>
        <div style={{ display: "none" }}>
          <h1>flowers for all seasons, winter, fall, summer, spring</h1>
          <h2>
            best florist delivering in any city in USA, order online for next
            day delivery
          </h2>
          <h3>
            flowers of all type, red roses, rose, lilies, sunflowers, daisies,
            gerbera, tulips{" "}
          </h3>
          <h4>send flowers anywhere in USA to your loved ones</h4>
          <h5>
            bulk roses,wedding flowers from farm, fastest delivery, flowers
            shipped with water
          </h5>
          <h6>
            flowers for all occasion Christmas, mother’s day, valentines day,
            birthday, wedding flowers, anniversary
          </h6>
        </div>

        <br />
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
        <div className="container" style={{ paddingTop: "100px" }}>
          <BreadCrumbs list={this.state.breadCrumbsList} />
          <br />
          <div className="container-block" style={{ paddingTop: "15px" }}>
            <ErrorBoundary>
              <MyCheckoutComponent
                {...this.state}
                applyDiscountCoupon={this.applyDiscountCoupon}
                cancelDiscountCoupon={this.cancelDiscountCoupon}
                cartResult={this.state.cartResult}
                primeUser={this.props.primeUser}
                cartType={this.props.cartType}
                handleInputChange={this.handleInputChange}
                continueShopping={this.continueShopping}
                handleMoveToWishlist={this.handleMoveToWishlist}
                removeProduct={this.removeProduct}
                handleInputQty={this.handleInputQty}
                updateCart={this.updateCart}
                handleCheckOut={this.handleCheckOut}
                clearShoppingCart={this.clearShoppingCart}
                cycles={_get(this.props, [
                  "firstCartData",
                  "cart",
                  0,
                  "result",
                  0,
                  "cycles",
                ])}
                onErrorHandler={this.onErrorHandler}
                onSuccessHandler={this.onSuccessHandler}
                cartObj={this.state.cartObj}
                cartValueData={this.props.cartData}
                priceData={this.state.priceData}
                paymentMethod={this.state.paymentMethod}
                totalAmount={this.state.totalAmount}
                getPaymentType={this.getPaymentType}
                showCards={this.state.showCards}
                totalCartItems={this.state.totalCartItems}
                cartDataShow={this.state.cartDataShow}
                guestCartData={this.state.guestStateItems}
                guestList={this.state.guestStateList}
                maskId={this.props.maskId}
                apiToken={this.props.apiToken}
                updateGuestCart={this.updateGuestCart}
                removeGuestProduct={this.removeGuestProduct}
                showWithoutLogin={this.showWithoutLogin}
                stateListRes={this.props.stateListData}
                fields={this.state.fields}
                fields1={this.state.fields1}
                handleChange={this.handleChange}
                handleStateChange={this.handleStateChange}
                handleStateChange1={this.handleStateChange1}
                selectStateValueShipping={this.state.selectStateValueShipping}
                showAddressModal={this.showAddressModal}
                custAddress={this.state.custAddress}
                addData={this.state.addData}
                responsive={this.state.responsive}
                onSlideChange={this.onSlideChange}
                onSlideChanged={this.onSlideChanged}
                billAddress={this.state.billAddress}
                shipAddress={this.state.shipAddress}
                addTerm={this.state.addTerm}
                changeShippingAddress={this.changeShippingAddress}
                changeBillingAddress={this.changeBillingAddress}
                handleAddAddress={this.handleAddAddress}
                placeShoppingOrder={this.placeShoppingOrder}
                handleChange1={this.handleChange1}
                placeSuccess={this.state.placeSuccess}
                handleSaveAddress={this.handleSaveAddress}
                handleSaveBillingAddress={this.handleSaveBillingAddress}
                zipCode={this.props.zipcode}
                shippingAddressData={this.props.shippingAddressData}
                handleChange2={this.handleChange2}
                defBillAdd={this.state.defBillAdd}
                handleChangeBill={this.handleChangeBill}
                cartGift={this.state.cartGift}
                handleChange4={this.handleChange4}
                showGF={this.state.showGF}
                handleSaveGift={this.handleSaveGift}
                giffyLoader={this.state.giffyLoader}
                grandTotalAmount={this.state.grandTotalAmount}
                shipTotalAmount={this.state.shipTotalAmount}
                errors={this.state.errors}
                showShippingLoader={this.state.showShippingLoader}
                errors1={this.state.errors1}
                showBillingLoader={this.state.showBillingLoader}
                countryData={this.state.countryData}
                handleCountryChange={this.handleCountryChange}
                selectCountryValueBilling={this.state.selectCountryValueBilling}
                billStateRes={this.state.billStateResponse}
                cadeImageShow={this.state.cadeImageShow}
                backToCart={this.backToCart}
                placeZeroShoppingOrder={this.placeZeroShoppingOrder}
              />
            </ErrorBoundary>
          </div>
        </div>
        <div id="ContainerElementID"></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearCartData: () => dispatch(clearCartReducer()),
  getCartData: (data) => dispatch(fetchCartItemsByCustomer(data)),
  getCart: (data) => dispatch(fetchGetCartData(data)),
  getDiscountCouponData: (data, data1) =>
    dispatch(fetchDiscountCouponData(data, data1)),
  getCancelDiscountCouponData: (data) =>
    dispatch(fetchCancelDiscountCouponData(data)),
  moveToWishlist: (data) => dispatch(fetchMoveToWishlistData(data)),
  getaddRemoveUpdateProduct: (data, data1) =>
    dispatch(fetchRemoveFromCartData(data, data1)),
  getUpdateProduct: (data, data1, data2) =>
    dispatch(fetchUpdateCartData(data, data1, data2)),
  removeExpiredProducts: (data) =>
    dispatch(fetchRemoveExpiredProductData(data)),
  setCartType: (data) => dispatch(setCartTypeData(data)),
  setCartId: (data) => dispatch(setCartId(data)),
  clearShoppingCartData: (data) => dispatch(clearCartData(data)),
  updateCart: (data, data1) => dispatch(updateLoginCartData(data, data1)),
  getGrandTotal: (data, data1) => dispatch(fetchGrandTotal(data, data1)),
  updateGuest: (data, data1) => dispatch(updateGuestCartData(data, data1)),
  guestRemove: (data) => dispatch(deleteGuestCartData(data)),
  getGuestList: (data) => dispatch(getGuestCartList(data)),
  showLoginModal: (data) => dispatch(receiveShowLoginModalData(data)),
  fetchShippingAddress: (data) => dispatch(getShippingAddress(data)),
  fetchBillingAddress: (data) => dispatch(getBillingAddress(data)),
  getStateListData: () => dispatch(fetchStateListData()),
  saveAddress: (data, data1) => dispatch(fetchEditAddress(data, data1)),
  placeOrder: (data, data1) => dispatch(getPlaceOrder(data, data1)),
  getAddAddressData: (data, data1) =>
    dispatch(fetchAddAddressData(data, data1)),
  getGiftMessage: (data) => dispatch(getGiftMessage(data)),
  getBillState: (data) => dispatch(fetchBillingStateListData(data)),
});

const mapStateToProps = (state) => {
  const {
    loginReducer,
    cartReducer,
    allAddressReducer,
    registerReducer,
    placeOrderReducer,
  } = state;

  const {
    loginData,
    apiToken,
    error: loginError,
    primeUser,
    custId,
    customerAddress,
    zipcode,
  } = loginReducer || [];

  const { stateListData, billStateData } = registerReducer || [];

  const { placeOrderSuccess } = placeOrderReducer || [];

  const {
    allAddressData,
    shippingAddressData,
    billingAddressData,
    editAddressData,
    addAddressData,
  } = allAddressReducer || [];

  const {
    firstCartData,
    discountCouponData,
    cancelDiscountCouponData,
    totalAmount,
    RemoveFromCartData,
    updateCartData,
    moveToWishListData,
    removeExpiredProductsData,
    isFetching: isLoading,
    error: cartError,
    clearedCartData,
    type,
    cartType,
    cartData,
    grandTotalData,
    newCartData,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
    guestUpdateCartResponse,
    guestDeleteCartResponse,
    cartId,
    reserveId,
    giftMessage,
  } = cartReducer || [];

  const error =
    !_isEmpty(loginError) ||
    _isError(loginError) ||
    !_isEmpty(cartError) ||
    _isError(cartError);

  return {
    custId,
    loginData,
    apiToken,
    cartId,
    firstCartData,
    discountCouponData,
    cancelDiscountCouponData,
    totalAmount,
    RemoveFromCartData,
    moveToWishListData,
    updateCartData,
    removeExpiredProductsData,
    isLoading,
    error,
    clearedCartData,
    type,
    primeUser,
    cartType,
    cartData,
    grandTotalData,
    newCartData,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
    guestUpdateCartResponse,
    guestDeleteCartResponse,
    shippingAddressData,
    billingAddressData,
    stateListData,
    allAddressData,
    customerAddress,
    editAddressData,
    reserveId,
    placeOrderSuccess,
    zipcode,
    addAddressData,
    giftMessage,
    billStateData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(MyCheckOutContainer));
