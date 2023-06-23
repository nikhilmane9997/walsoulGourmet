import _get from "lodash/get";
import _set from "lodash/set";
import _isEmpty from "lodash/isEmpty";
import * as LOGIN_CONSTANTS from "../constants/login";
import * as SALESREP_CONSTANTS from "../constants/salesRep";

const loginReducer = (
  state = {
    type: "",
    tokenType: "",
    error: "",
    isFetching: false,
    loginData: [],
    loginResponseData: [],
    forgotPasswordData: "",
    showLoginModal: {},
    hideLoginModal: {},
    apiToken: "",
    cartId: "",
    currencyCode: "",
    salesRepUser: "",
    salesRepToken: "",
    salesRepFlag: false,
    storeId: "",
    user: "",
    updateCartDetails: {},
    firstName: "",
    localeId: "",
    userProfileData: {},
    categoriesListData: [],
    storeName: "",
    zipcode: "",
    zipcodeInit: "",
    lastUpdatedToken: undefined,
    newsletterData: "",
    logoutData: "",
    primeUser: "",
    demoExpired: "",
    cartCount: 0,
    cartProducts: [],
    cartTotal: 0,
    artistReg: {},
    homePageData: [],
    newHomePageData: [],
    accessToken: "",
    custId: "",
    custEmail: "",
    userFirstName: "",
    userLastName: "",
    customerAddress: [],
    loginMessage: "",
    loginStatus: "",
    homePage: [],
    categoryData: [],
    bannerWeb: [],
    bannerMobile: [],
    infographics: [],
    categoryBlocks: [],
    testimonials: [],
    featuredProducts: [],
    zipcodeData: [],
    isHomeLoading: false,
    forgotPasswordStatus: "",
    updateCustomerDetails: undefined,
    catNameData: undefined,
    catDescData: undefined,
    resetPasswordData: undefined,
    resetPasswordStatus: undefined,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_CONSTANTS.REQUEST_LOGIN_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        loginData: [],
        apiToken: "",
        cartId: "",
        currencyCode: "",
        storeId: "",
        user: "",
        firstName: "",
        localeId: "",
        storeName: "",
        lastUpdatedToken: "",
        lastUpdated: action.receivedAt,
        newsletterData: "",
        logoutData: "",
      });
    case LOGIN_CONSTANTS.RECEIVED_LOGIN_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        loginData: action.data,
        apiToken: _get(action.data[0], "result.api_token", ""),
        salesRepUser: _get(action.data[0], "result.sales_rep_customer", ""),
        primeUser: _get(action.data[0], "result.prime", ""),
        demoExpired: _get(action.data[0], "result.prime_demo", ""),
        salesRepToken:
          _get(action.data[0], "result.sales_rep_customer", "") === "yes"
            ? _get(action.data[0], "result.api_token", "")
            : "",
        cartId: _get(action.data[0], "result.cart_id", ""),
        currencyCode: _get(action.data[0], "result.currency_code", ""),
        storeId: _get(action.data[0], "result.default_store_id", ""),
        user: _get(action.data[0], "result.cust_name", ""),
        firstName: _get(action.data[0], "result.fname", ""),
        localeId: _get(action.data[0], "result.store_id", ""),
        storeName: _get(action.data[0], "result.default_store_name", ""),
        lastUpdatedToken: action.receivedAt,
        showLoginModal: !_isEmpty(action.data[0], "result.api_token"),
        zipcode: undefined,
        cartCount: _get(
          action.data,
          [0, "cartDetails", "total_products_in_cart"],
          0
        ),
        cartProducts: _get(action.data, [0, "cartDetails", "result"], []),
        cartTotal: _get(action.data, [0, "cartDetails", "grandtotal"], 0),
      });
    case LOGIN_CONSTANTS.RECEIVED_LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });

    case LOGIN_CONSTANTS.REQUEST_FORGOT_PASSWORD_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        forgotPasswordData: "",
        forgotPasswordStatus: "",
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        forgotPasswordData: action.data,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
        forgotPasswordStatus: action.errorCode.response.status,
      });
    case LOGIN_CONSTANTS.SHOW_LOGIN_MODAL:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        showLoginModal: action.data,
        forgotPasswordData: [],
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.HIDE_LOGIN_MODAL:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        showLoginModal: {},
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.USER_LOGOUT_CONSTANTS.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        loginData: [],
        apiToken: "",
        currencyCode: "",
        storeId: "",
        firstName: "",
        localeId: "",
        lastUpdatedToken: "",
        zipcode: state.zipcodeInit,
        newsletterData: "",
        salesRepFlag: false,
        salesRepToken: "",
        cartId: "",
        user: "",
        salesRepUser: "",
        primeUser: "",
        demoExpired: "",
        userProfileData: [],
        storeName: "",
        cartCount: 0,
        cartProducts: [],
        cartTotal: 0,
      });
    case LOGIN_CONSTANTS.USER_LOGOUT_CONSTANTS.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        logoutData: action.data,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.USER_LOGOUT_CONSTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });
    case LOGIN_CONSTANTS.REQUEST_LOGOUT:
      return Object.assign({}, state, {
        loginData: [],
        showLoginModal: {},
        apiToken: "",
        currencyCode: "",
        storeId: "",
        firstName: "",
        localeId: "",
        lastUpdatedToken: "",
        zipcode: state.zipcodeInit,
        newsletterData: "",
        salesRepFlag: false,
        salesRepToken: "",
        accessToken: "",
        custId: "",
        custEmail: "",
        userFirstName: "",
        userLastName: "",
        customerAddress: [],
        loginMessage: "",
        loginStatus: "",
      });

    case LOGIN_CONSTANTS.CLEAR_SALES_REP_FLAG:
      return Object.assign({}, state, {
        salesRepFlag: false,
      });
    case LOGIN_CONSTANTS.SET_ZIPCODE:
      return Object.assign({}, state, {
        zipcode: action.data,
        zipcodeInit: action.data,
        newsletterData: "",
      });
    case LOGIN_CONSTANTS.SET_STORE_ID:
      return Object.assign({}, state, {
        storeName: _get(action.data, "storeName"),
        storeId: _get(action.data, "storeId"),
        newsletterData: "",
      });
    case LOGIN_CONSTANTS.SET_CART_ID:
      return Object.assign({}, state, {
        cartId: action.data,
        newsletterData: "",
      });
    case LOGIN_CONSTANTS.FLUSH_CART_DATA:
      const loginData = { ...state.loginData };
      _set(loginData, [0, "cartDetails"], {});
      _set(loginData, [0, "total_product_in_cart"], 0);
      return Object.assign({}, state, {
        // loginData: {...state.loginData, [0]}
        type: action.type,
        newsletterData: "",
        type: action.type,
        cartCount: 0,
        cartProducts: [],
        cartTotal: 0,
      });
    case LOGIN_CONSTANTS.UPDATE_CART:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        updateCartDetails: action.data,
        cartCount: _get(action.data, "cartCount", state.cartCount),
        cartProducts: _get(action.data, "cartProducts", state.cartProducts),
        cartTotal: _get(action.data, "cartTotal", state.cartTotal),
        lastUpdated: action.receivedAt,
        newsletterData: "",
      });
    case LOGIN_CONSTANTS.PROFILE_DATA_CONSTANTS.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt,
        userProfileData: [],
        newsletterData: "",
      });
    case LOGIN_CONSTANTS.PROFILE_DATA_CONSTANTS.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        userProfileData: action.data,
        lastUpdated: action.receivedAt,
      });

    case LOGIN_CONSTANTS.PROFILE_DATA_CONSTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });
    case LOGIN_CONSTANTS.CATEGORIES_LIST_CONSTANTS.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt,
        // categoriesListData: [],
        newsletterData: "",
      });
    case LOGIN_CONSTANTS.CATEGORIES_LIST_CONSTANTS.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        categoriesListData: action.data,
        lastUpdated: action.receivedAt,
      });

    case LOGIN_CONSTANTS.CATEGORIES_LIST_CONSTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });

    case LOGIN_CONSTANTS.RESET_FORGOT_PASSWORD_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        forgotPasswordData: [],
        lastUpdated: action.receivedAt,
        newsletterData: "",
      });

    case LOGIN_CONSTANTS.NEWSLETTER_SUBSCRIPTION_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        newsletterData: "",
      });

    case SALESREP_CONSTANTS.REQUEST_SALESREP_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        salesRepInfo: [],
        lastUpdated: action.receivedAt,
        newsletterData: "",
      });
    case SALESREP_CONSTANTS.RECEIVED_SALESREP_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        loginData: action.data,
        apiToken: _get(action.data[0], "result.api_token", ""),
        cartId: _get(action.data[0], "result.cart_id", ""),
        currencyCode: _get(action.data[0], "result.currency_code", ""),
        storeId: _get(action.data[0], "result.default_store_id", ""),
        user: _get(action.data[0], "result.cust_name", ""),
        firstName: _get(action.data[0], "result.fname", ""),
        salesRepUser: _get(action.data[0], "result.sales_rep_customer", ""),
        // primeUser: _get(action.data[0], 'result.prime', ''),
        salesRepFlag:
          _get(action.data[0], "result.sales_rep_customer", "") === "no",
        localeId: _get(action.data[0], "result.store_id", ""),
        storeName: _get(action.data[0], "result.default_store_name", ""),
        lastUpdatedToken: action.receivedAt,
        showLoginModal: !_isEmpty(action.data[0], "result.api_token"),
        zipcode: undefined,
        lastUpdated: action.receivedAt,
        cartCount: _get(
          action.data,
          [0, "cartDetails", "total_products_in_cart"],
          0
        ),
        cartProducts: _get(action.data, [0, "cartDetails", "result"], []),
        cartTotal: _get(action.data, [0, "cartDetails", "grandtotal"], 0),
      });

    case SALESREP_CONSTANTS.RECEIVED_SALESREP_LOGIN_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });

    case LOGIN_CONSTANTS.NEWSLETTER_SUBSCRIPTION_CONSTANTS.REQUEST:
      return Object.assign({}, state, {
        // isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.NEWSLETTER_SUBSCRIPTION_CONSTANTS.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        newsletterData: action.data,
        lastUpdated: action.receivedAt,
      });

    case LOGIN_CONSTANTS.NEWSLETTER_SUBSCRIPTION_CONSTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });

    case LOGIN_CONSTANTS.UPDATE_PRIME_ID:
      return Object.assign({}, state, {
        primeUser: action.data,
      });

    case LOGIN_CONSTANTS.ARTIST_EMAIL_CONSTANTS.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.ARTIST_EMAIL_CONSTANTS.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        artistReg: action.data,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.ARTIST_EMAIL_CONSTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });
    case LOGIN_CONSTANTS.HOME_CONSTANTS.REQUEST:
      return Object.assign({}, state, {
        isHomeLoading: true,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.HOME_CONSTANTS.RECEIVED:
      return Object.assign({}, state, {
        isHomeLoading: false,
        type: action.type,
        didInvalidate: false,
        homePageData: action.data,
        header: action.data[0].response.categoryList.header.top_menu,
        // homePageData: action.data[0].homePageData[0].response.categoryList.home_page_block,
        homePage: action.data[0].response.categoryList.home_page_block,
        categoryData: action.data[0].response.categoryList,
        bannerWeb:
          action.data[0].response.categoryList.home_page_block[0]
            .home_slider_block.gallery_images,
        bannerMobile:
          action.data[0].response.categoryList.home_page_block[0]
            .home_slider_block.mobile_gallery_images,
        infographics: action.data[0].response.categoryList.home_page_block[1],
        categoryBlocks: action.data[0].response.categoryList.home_page_block[2],
        testimonials: action.data[0].response.categoryList.home_page_block[3],
        featuredProducts:
          action.data[0].response.categoryList.home_page_block[4],
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.HOME_CONSTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isHomeLoading: false,
        type: action.type,
        error: action.error,
      });

    case LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.REQUEST:
      return Object.assign({}, state, {
        isHomeLoading: true,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.RECEIVED:
      return Object.assign({}, state, {
        isHomeLoading: false,
        type: action.type,
        didInvalidate: false,
        newHomePageData: action.data,
        // header: action.data[0].response.categoryList.header.top_menu,
        // homePage: action.data[0].response.categoryList.home_page_block,
        // categoryData: action.data[0].response.categoryList,
        // bannerWeb:
        //   action.data[0].response.categoryList.home_page_block[0]
        //     .home_slider_block.gallery_images,
        // bannerMobile:
        //   action.data[0].response.categoryList.home_page_block[0]
        //     .home_slider_block.mobile_gallery_images,
        // infographics: action.data[0].response.categoryList.home_page_block[1],
        // categoryBlocks: action.data[0].response.categoryList.home_page_block[2],
        // testimonials: action.data[0].response.categoryList.home_page_block[3],
        // featuredProducts:
        //   action.data[0].response.categoryList.home_page_block[4],
        // lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.NEW_HOME_CONSTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isHomeLoading: false,
        type: action.type,
        error: action.error,
      });

    case LOGIN_CONSTANTS.TOKEN_CONTANTS.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        tokenType: action.type,
        lastUpdated: action.receivedAt,
        apiToken: "",
      });
    case LOGIN_CONSTANTS.TOKEN_CONTANTS.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        tokenType: action.type,
        didInvalidate: false,
        apiToken: action.data,
        showLoginModal: {},
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.TOKEN_CONTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        tokenType: action.type,
        loginMessage: action.errorCode,
        loginStatus: action.errorCode.status,
        error: action.errorCode,
      });
    case LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        tokenType: action.type,
        lastUpdated: action.receivedAt,
        loginResponseData: "",
      });
    case LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        tokenType: action.type,
        didInvalidate: false,
        loginResponseData: action.data,
        custId: action.data.id,
        custEmail: action.data.email,
        userFirstName: action.data.firstname,
        userLastName: action.data.lastname,
        customerAddress: action.data.addresses,
        defaultBilling: action.data.default_billing,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.CUSTOMER_DETAILS_CONTANTS.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        tokenType: action.type,
        error: action.error,
      });
    case LOGIN_CONSTANTS.CUSTOMER_ZIPCODE.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
      });
    case LOGIN_CONSTANTS.CUSTOMER_ZIPCODE.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        zipcode: action.data[0].data.zipcode,
        zipcodeInit: action.data[0].data.zipcode,
        zipcodeData: action.data,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.CUSTOMER_ZIPCODE.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });
    case LOGIN_CONSTANTS.UPDATE_CUSTOMER_DETAIL.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        updateCustomerDetails: undefined,
      });
    case LOGIN_CONSTANTS.UPDATE_CUSTOMER_DETAIL.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        updateCustomerDetails: action.data,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.UPDATE_CUSTOMER_DETAIL.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
      });
    case LOGIN_CONSTANTS.SET_CATNAME:
      return Object.assign({}, state, {
        catNameData: action.data,
      });
    case LOGIN_CONSTANTS.SET_CATDESC:
      return Object.assign({}, state, {
        catDescData: action.data,
      });

    case LOGIN_CONSTANTS.UPDATE_RESET_CUSTOMER_PASSWORD.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        resetPasswordData: undefined,
        resetPasswordStatus: undefined,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.UPDATE_RESET_CUSTOMER_PASSWORD.RECEIVED:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        resetPasswordData: action,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.UPDATE_RESET_CUSTOMER_PASSWORD.RECEIVED_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        resetPasswordStatus: action.errorCode.response.data,
        type: action.type,
        error: action.error,
      });
    case LOGIN_CONSTANTS.REQUEST_FORGOT_PASSWORD_DATA:
      return Object.assign({}, state, {
        isFetching: true,
        type: action.type,
        forgotPasswordData: "",
        forgotPasswordStatus: "",
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_DATA:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        didInvalidate: false,
        forgotPasswordData: action.data,
        lastUpdated: action.receivedAt,
      });
    case LOGIN_CONSTANTS.RECEIVED_FORGOT_PASSWORD_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        type: action.type,
        error: action.error,
        forgotPasswordStatus: action.errorCode.response.status,
      });

    default:
      return state;
  }
};

export default loginReducer;
