/* eslint-disable quotes */
/* eslint-disable quote-props */
import React from "react";
import Redirect from "react-router/Redirect";
//import SweetAlert from 'react-bootstrap-sweetalert';
import connect from "react-redux/lib/connect/connect";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isError from "lodash/isError";
import _filter from "lodash/filter";
import _minBy from "lodash/minBy";
import _maxBy from "lodash/maxBy";
import _find from "lodash/find";
import _sortBy from "lodash/sortBy";
import _endsWith from "lodash/endsWith";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "react-image-resizer";
import moment from "moment";
import axios from "axios";
import StarRatings from "react-star-ratings";
import HrCommon from "../../components/Common/HrCommon.jsx";
import ProductDetailComponent from "../../components/ProductComponent/ProductDetailComponent.jsx";
import Loader from "../../components/Loader/Loader.jsx";

import {
  fetchProductDetails,
  fetchRelatedProducts,
  fetchUpsellingProducts,
  postReviews,
  fetchProductDates,
  fetchReviewData,
} from "../../actions/products";
import {
  getShippingAddress,
  getBillingAddress,
  fetchEditAddress,
  fetchAddAddressData,
  fetchEditBillAddress,
  fetchAllAddressData,
} from "../../actions/address";
import { mapAddToCartApiData } from "../../utils/commonMapper";
import {
  postProductAddToCartData,
  clearCartData,
  flushCartViewData,
  fetchQuoteId,
  updateCartValue,
  postAddToCartData,
  fetchCartItemsByCustomer,
  postGuestAddToCartData,
  getGuestCartList,
  fetchGetCartData,
} from "../../actions/cart";
// import { receiveShowLoginModalData } from '../../actions/login';
import ChangeStoreModal from "../../components/Common/ChangeStoreModal.jsx";
import { fetchAddToFavsData } from "../../actions/myfavourites";
import { fetchAddToWishlistData } from "../../actions/wishList";
// import { download } from '../../actions/download';
import {
  receiveShowLoginModalData,
  updateCartData,
  setStoreId,
  flushCartData,
  setCartId,
  setZipcodeData,
} from "../../actions/login";
// import jsPDF from 'jspdf';
import BreadCrumbs from "../../components/Common/BreadCrumbs.jsx";
import updateRecentViewsData from "../../actions/recentViews";
import ErrorHandler from "../../components/Hoc/ErrorHandler.jsx";
import ErrorBoundary from "../ErrorBoundary.jsx";
import ReviewComponent from "../../components/ProductComponent/reviewComponent.jsx";
import CustomerReviewComponent from "../../components/ProductComponent/CustomerReviewComponent.jsx";
import { fetchProductVendorReviews } from "../../actions/vendorReviews";
import { KeyboardArrowLeft } from "material-ui-icons";
import lazyLoader from "../../assets/img/loader.gif";
import { isUndefined } from "lodash";

class ProductDetailContainer extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.custrev = React.createRef();
    this.toggleImgModalFn = this.toggleImgModalFn.bind(this);
    this.state = {
      handleProductDetailClick: false,
      listData: {},
      productDetails: [],
      moreData: [],
      productId:
        this.props.match.params &&
        this.props.match.params.id &&
        this.props.match.params.id.split("/").pop().split(".").shift(), // this.props.location.hash && this.props.location.hash.substring(1),
      showMoreDetails: false,
      submitReviewAlert: false,
      submitTagAlert: false,
      selectedDate: undefined,
      dispalyMoreAvails: false,
      totalPriceToPay: "",
      disableCartBtn: "disableBtn",
      showAlertDiv: false,
      rating: 0,
      alertData: false,
      fields: {},
      // blinkText: {},
      isAuthenticated: false,
      errors: {},
      showChangeStoreModal: false,
      storeName: this.props.storeName,
      showImageModal: false,
      showReviewModal: false,
      showAllReviewModal: false,
      productImageUrl: undefined,
      url: undefined,
      currentIndex: 0,
      itemsInSlide: 1,
      currentIndex1: 0,
      itemsInSlide1: 1,
      breadCrumbsList: [
        {
          link: "/",
          name: "HOME",
        },
        {
          link: undefined,
          name: "BUY ARTIFACTS",
        },
      ],
      currentUrl: undefined,
      freshdeal: false,
      responsive: { 480: { items: 2 }, 760: { items: 2 }, 900: { items: 4 } },
      productReviewData: [],
      testData: [],
      blinkText: "",
      redirectToVendorRevPage: false,
      vendorId: "",
      vendorName: "",
      children: undefined,
      upsellChildrens: undefined,
      quantity: undefined,
      redirectNotFound: false,
      showCustReview: false,
      showData: 3,
      valueData: 1,
      reviewShow: true,
      dataToShow: undefined,
      imageSrc: "",
      sideImages: [],
      cartShow: false,
      cartData: [],
      showCartValue: false,
      showGuestCartValue: false,
      startDate: undefined,
      dateObjectArray: [],
      vendorDetails: [],
      reviewPostLoader: false,
      listReviewLoader: false,
      showProdDetailLoader: true,
      minDateShow: "",
      maxDateShow: "",
      showChangeAddress: false,
      createChildren2: undefined,
      addressData: [],
      cartLoader: false,
      vendorData: undefined,
      vendorStartDate: undefined,
      pageLoader: true,
      proLink: false,
      proData: undefined,
      image0: undefined,
      image1: undefined,
      image2: undefined,
      image3: undefined,
      image4: undefined,
      scrollToDiv: true,
      doNotShowAdd: false,
      swatchData: undefined,
      relatedData: undefined,
      prodChildData: undefined,
      prodChildSku: undefined,
      zipCodeData: undefined,
      deliveryStatus: "",
      totatlReviewCount: undefined,
      otherDetails: [],
    };
  }

  handleDateValueChange = (date) => {
    this.setState({
      startDate: date,
    });
    console.log(date);
    ///let dateData=date.getFullYear() +"-0"+parseInt(date.getMonth()+1) + "-"+date.getDate() ;

    //console.log(dateData);
    //Object.entries(this.state.vendorDetails).map(([key, val]) => {

    //console.log(key);
    //console.log(dateData);
    //if(key === dateData)
    // {
    // console.log(val);
    // }
    //});
  };
  dateChanged = (d) => {
    console.log(d);
    //console.log();
    this.setState({
      startDate: d,
    });
    const NewDate = moment(d).format("YYYY-MM-DD");
    console.log(NewDate);
    this.setState({
      vendorStartDate: NewDate,
    });

    console.log(this.state);
    console.log(this.state.vendorDetails);
    Object.entries(this.state.vendorDetails).map(([key, val]) => {
      console.log(key);
      console.log(NewDate);
      if (key === NewDate) {
        console.log(val);
        this.setState({
          vendorData: val,
        });
      }
    });
  };

  handleChange = (event) => {
    console.log(event.target.value);
    const { fields } = this.state;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
    console.log(this.state.fields);
  };
  handleChange1 = (event) => {
    console.log(event.target.value);
    const { fields } = this.state;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
    console.log(this.state.fields);

    const charCount = event.target.value.length;
    const maxChar = this.state.max_char1;
    const charLength = maxChar - charCount;
    this.setState({ chars_left1: charLength });
  };

  IncrementItem = () => {
    console.log("surya");
    this.setState({ valueData: this.state.valueData + 1 });
    console.log(this.state.valueData);
  };
  DecreaseItem = () => {
    console.log("data");
    this.setState({ valueData: this.state.valueData - 1 });
    console.log(this.state.valueData);
  };

  addProductToCart = () => {
    console.log(this.state.vendorStartDate);
    console.log(this.state.vendorData);
    console.log(this.state.vendorDetails);
    console.log(this.state.startDate);
    const data = [];
    this.setState({
      cartLoader: true,
    });
    console.log(this.props.apiToken);
    if (this.props.apiToken !== "") {
      const reqBody1 = {
        vendor: this.state.vendorData.vendor,
        vendor_farm: this.state.vendorData.vendor_farm,
        delivery_date: this.state.vendorStartDate,
        pickup_date: this.state.vendorData.pickup_date,
        shipping_method: this.state.vendorData.shipping_front_name,
        time_slot_from: "2:00",
        time_slot_to: "5:00",
      };
      const reqBody = {
        sku:
          this.state.prodChildData === undefined
            ? this.state.productDetails.children_products[0].sku
            : this.state.prodChildData.sku,
        // sku: "WPS001-250 ML",
        qty: this.state.valueData,
        custom_attributes: reqBody1,
      };
      console.log(reqBody);
      this.props.addCartData({ cartItem: reqBody }, this.props.apiToken);

      this.setState({
        valueData: 1,
        showCartValue: true,
      });
    } else {
      console.log(this.props.mask_id);
      const reqBody1 = {
        vendor: this.state.vendorData.vendor,
        vendor_farm: this.state.vendorData.vendor_farm,
        delivery_date: this.state.vendorStartDate,
        pickup_date: this.state.vendorData.pickup_date,
        shipping_method: this.state.vendorData.shipping_front_name,
        time_slot_from: "2:00",
        time_slot_to: "5:00",
      };
      const reqBody = {
        mask_id: this.props.maskId === undefined ? "" : this.props.maskId,
        sku: this.state.prodChildSku,
        qty: this.state.valueData,
        custom_attributes: reqBody1,
      };
      console.log(reqBody);
      this.props.guestAddToCart({ cartItem: reqBody });

      this.setState({
        valueData: 1,
        showGuestCartValue: true,
      });
    }
  };
  changeRating = (newRating) => {
    console.log(newRating);
    this.setState({
      rating: newRating,
    });
  };
  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    console.log(fields);
    console.log(errors);
    console.log(this.state.rating);
    if (!fields.review_title) {
      formIsValid = false;
      errors.review_title = "This is a required field.";
    }
    if (!fields.review_details) {
      formIsValid = false;
      errors.review_details = "This is a required field.";
    }
    if (this.state.rating == 0) {
      formIsValid = false;
      errors.rating = "This is a required field.";
    }

    this.setState({ errors });
    return formIsValid;
  }
  submitReviews = () => {
    console.log(this.state.fields);
    console.log(this.handleValidation());
    if (_isEmpty(this.props.apiToken)) {
      toast.error("login please");
    } else if (this.handleValidation()) {
      console.log("test");
      const reqBody = {
        title: this.state.fields.review_title,
        detail: this.state.fields.review_details,
        nickname: this.props.userFirstName,
        customer_id: this.props.custId,
        review_date: this.state.reviewDate,
        vendor_id: 0,
        order_id: null,
        ratings: [
          {
            rating_name: "Rating",
            value: _get(this.state, "rating"),
          },
        ],
        review_entity: "product",
        review_status: 1,
        entity_pk_value: this.state.productDetails.id,
      };
      console.log(reqBody);
      this.setState({
        rating: 0,
        reviewPostLoader: true,
      });
      this.props.submitReviewsData({ review: reqBody }, this.props.apiToken);
    }
  };

  // showReviewModal = () => this.setState(prevState =>
  // ({
  // showReview: !prevState.showReview,
  // }));

  showReviewModal = () => {
    console.log("test");
    this.setState({
      showData: !this.state.showData,
    });
  };

  showLoginPopup = () => {
    this.props.showLoginModal({ show: true });
  };

  toggleMoreDetail = () => {
    this.setState({
      showMoreDetails: !this.state.showMoreDetails,
      dispalyMoreAvails: false,
    });
  };

  toggleMoreAvail = () => {
    this.setState({
      dispalyMoreAvails: !this.state.dispalyMoreAvails,
      showMoreDetails: false,
    });
  };

  resetMoreDetails = (event) => {
    const dataTempAvail = _filter(this.state.productDetails.delivery, [
      "delivery_date",
      event,
    ])[0];
    this.setState({
      dataToShow: { ...this.state.dataToShow, ...dataTempAvail, newKey: event },
    });
  };

  ProductSwatch = (event) => {
    const datesArr = {};
    const dataTempAvail = _get(
      this.state.productDetails,
      `more_avail.${[event]}`
    );
    dataTempAvail.forEach((o) => {
      datesArr[_get(o, "delivery_date")] = _get(o, "total_price_format");
    });
    this.setState({
      dataToShow: {
        ...this.state.productDetails.info[event],
        ...dataTempAvail[0],
        newKey: event,
      },
      datesArr,
    });
  };

  toggleImgModalFn = (url, length, ind) => {
    this.setState({
      showImageModal: !this.state.showImageModal,
      productImageUrl: { url, length, ind },
    });
  };

  toggleReviewModalFn = () => {
    console.log("test ee");
    this.setState({
      showReviewModal: !this.state.showReviewModal,
    });
  };
  toggleAllReviewModalFn = () => {
    console.log("test ee");
    this.setState({
      showAllReviewModal: !this.state.showAllReviewModal,
    });
  };

  handleAddToWishlist = () => {
    this.props.addToWhishlist({
      apiToken: this.props.apiToken,
      productId: this.state.productId,
    });
  };

  handleAddToFavorites = () => {
    this.props.addToFavorites({
      apiToken: this.props.apiToken,
      productId: this.state.productId,
      storeId: this.state.selectedStoreId
        ? this.state.selectedStoreId
        : this.props.storeId,
    });
  };

  focusReview = (d) => {
    this.setState({ showData: d });
    this.setState({ reviewShow: false });
  };

  vendorRatingsHover = (vendorId) => {
    this.props.getProductReviews({ vendorId });
  };

  componentDidMount() {
    console.log(this.props.zipcode);
    this.props.getProductDetails(this.state.productId);

    this.props.getRelatedProducts(this.state.productId);

    this.props.getUpsellProducts(this.state.productId);

    if (this.props.apiToken !== "") {
      this.props.getCart(this.props.apiToken);
    }
    // this.props.getReview
    // this.props.getReview(this.state.productDetails.children_products[0].id);
  }

  scrollToBottom = (ref) => {
    console.log(ref);
    this.refs[ref].scrollIntoView({ behavior: "smooth" });
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

  shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let data = [];
    let data2 = [];

    this.setState({
      zipCodeData: this.props.zipcode,
    });

    if (!_isEmpty(nextProps.zipcode)) {
      this.setState({
        zipCodeData: nextProps.zipcode,
      });
    }

    if (!_isEmpty(nextProps.allAddressData)) {
      data = nextProps.allAddressData.addresses;
      const allAddresses = nextProps.allAddressData.addresses;
      const billingAddressId = nextProps.allAddressData.default_billing;
      const shippingAddressId = nextProps.allAddressData.default_shipping;
      let billingAddress = "";
      let shippingAddress = "";
      // console.log(allAddresses);
      // console.log(billingAddressId);
      // console.log(shippingAddressId);

      const otherAddress =
        allAddresses.length &&
        allAddresses
          .map((eachAddress) => {
            //   console.log('same',eachAddress);
            // console.log('sameb',eachAddress.id);
            //console.log('samebb',billingAddressId);
            //console.log('same1',eachAddress.id === parseInt(billingAddressId));
            //console.log('same2',eachAddress.id === parseInt(shippingAddressId));
            if (
              eachAddress.id === parseInt(billingAddressId) &&
              eachAddress.id === parseInt(shippingAddressId)
            ) {
              //  console.log('same3');
              billingAddress = this.populateAddress(eachAddress);
              shippingAddress = billingAddress;
            } else if (eachAddress.id === parseInt(billingAddressId)) {
              billingAddress = this.populateAddress(eachAddress);
            } else if (eachAddress.id === parseInt(shippingAddressId)) {
              shippingAddress = this.populateAddress(eachAddress);
            } else return this.populateAddress(eachAddress);
          })
          .filter((o) => o);
      //console.log(billingAddress);
      //console.log(shippingAddress);

      this.setState({
        allAddresses,
        billingAddressId,
        shippingAddressId,
        billingAddress,
        shippingAddress,
        otherAddress,
        addressData: this.createChildren2({ data }),
      });
    }
    // if (!_isEmpty(nextProps.postPRSuccess) && this.state.reviewPostLoader) {
    //   //console.log(nextProps.postPRSuccess);
    //   this.props.getReview(this.state.productDetails.id);
    //   toast.success("Your review has been accepted for moderation.", {
    //     position: "top-right",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   this.setState({
    //     reviewPostLoader: false,
    //     showReviewModal: false,
    //     listReviewLoader: true,
    //   });
    // }
    if (
      !_isEmpty(nextProps.productDetailsData) &&
      this.state.showProdDetailLoader
    ) {
      console.log(nextProps.productDetailsData.items[0]);
      if (nextProps.productDetailsData) {
        this.props.getReview(
          nextProps.productDetailsData.items[0].children_products[0].id
        );
        this.setState({
          deliveryStatus: this.props.getDates(
            nextProps.productDetailsData.items[0].children_products[0].sku,
            this.props.zipcode
          ),
          otherDetails:
            nextProps.productDetailsData.items[0].children_products[0]
              .custom_fields,
          imageSrc:
            nextProps.productDetailsData.items[0].children_products[0]
              .images[0],
          sideImages:
            nextProps.productDetailsData.items[0].children_products[0].images,
        });
      }
      if (nextProps.productDetailsData.items.length !== 0) {
        const data = nextProps.productDetailsData.items[0];

        data.rating_details[0].avgRating = parseFloat(
          (parseInt(data.rating_details[0].global_percent) * 5) / 100
        );
        data.rating_details[0].new_rating = [];
        data.rating_details[0].new_rating.push(
          _get(data, "rating_details[0].rating.1")
        );
        data.rating_details[0].new_rating.push(
          _get(data, "rating_details[0].rating.2")
        );
        data.rating_details[0].new_rating.push(
          _get(data, "rating_details[0].rating.3")
        );
        data.rating_details[0].new_rating.push(
          _get(data, "rating_details[0].rating.4")
        );
        data.rating_details[0].new_rating.push(
          _get(data, "rating_details[0].rating.5")
        );
        const data1 = nextProps.productDetailsData.items[0].images[0];

        var img0 = undefined;
        var img1 = undefined;
        var img2 = undefined;
        var img3 = undefined;
        var img4 = undefined;
        for (
          var i = 0;
          i < nextProps.productDetailsData.items[0].images.length;
          i++
        ) {
          if (i === 0) {
            img0 = nextProps.productDetailsData.items[0].images[i];
          }
          if (i === 1) {
            img1 = nextProps.productDetailsData.items[0].images[i];
          }
          if (i === 2) {
            img2 = nextProps.productDetailsData.items[0].images[i];
          }
          if (i === 3) {
            img3 = nextProps.productDetailsData.items[0].images[i];
          }
          if (i === 4) {
            img4 = nextProps.productDetailsData.items[0].images[i];
          }
        }
        var jsonC = JSON.parse(
          nextProps.productDetailsData.items[0].json_config
        );
        {
          /*for (var i = 0; i < data.children_products.length; i++) {
          data.children_products[i].size = data.children_products[i].sku
            .split("-")
            .pop();
        }*/
        }
        {
          /* for (var i = 0; i < data.children_products.length; i++) {
          if (data.children_products[i].qty !== 0) {
            data.children_products[i].percentage = parseFloat(
              (
                ((data.children_products[i].special_price -
                  data.children_products[i].price) *
                  100) /
                data.children_products[i].special_price
              ).toFixed(2)
            );
            this.setState({
              prodChildData: data.children_products[i],
              prodChildSku: data.children_products[i].sku,
            });
            this.props.getDates(
              data.children_products[i].sku,
              this.props.zipcode
            );
            break;
          }
        }*/
        }

        //this.props.getDates(this.state.productId,'08003');

        this.setState({
          productDetails: data,
          listReviewLoader: true,
          showProdDetailLoader: false,
          pageLoader: false,
          image0: img0,
          image1: img1,
          image2: img2,
          image3: img3,
          image4: img4,
          swatchData: jsonC,
        });
        // this.props.getReview(nextProps.productDetailsData.items[0].id);
      }
    }

    if (!_isEmpty(nextProps.reviewData) && this.state.listReviewLoader) {
      console.log(nextProps.reviewData.total_count);
      var reviewSort = nextProps.reviewData.items;
      var de1 = [];
      var de2 = [];
      var de3 = undefined;
      // reviewSort.items.sort(function (a, b) {
      //   var nameA = a.ratings[0].value,
      //     nameB = b.ratings[0].value;
      //   return nameB - nameA;
      // });
      // if (reviewSort.items.length > 10) {
      //   for (var i = 0; i < reviewSort.items.length; i++) {
      //     if (i > 9) {
      //       de2.push(reviewSort.items[i]);
      //     } else {
      //       de1.push(reviewSort.items[i]);
      //     }
      //   }

      //   for (var i = de2.length - 1; i > 0; i--) {
      //     var j = Math.floor(Math.random() * (i + 1));
      //     var temp = de2[i];
      //     de2[i] = de2[j];
      //     de2[j] = temp;
      //   }

      //   console.log(de1);
      //   console.log(de2);
      //   reviewSort.items1 = [];
      //   for (var i = 0; i < de1.length; i++) {
      //     reviewSort.items1.push(de1[i]);
      //   }
      //   for (var i = 0; i < de2.length; i++) {
      //     reviewSort.items1.push(de2[i]);
      //   }
      // } else {
      //   reviewSort.items1 = [];
      //   reviewSort.items1 = reviewSort.items;
      // }
      console.log(reviewSort);

      this.setState({
        listReviewLoader: false,
        productReviewData: nextProps.reviewData.items,
        totatlReviewCount: nextProps.reviewData.total_count,
      });
    }

    if (!_isEmpty(nextProps.productDates)) {
      if (nextProps.productDates[0]["response"]) {
        this.setState({
          deliveryStatus: nextProps.productDates[0]["response"].status,
        });
      }
      if (nextProps.productDates[0]["response"]) {
        if (nextProps.productDates[0].response.status === true) {
          for (
            var i = 0;
            i < nextProps.productDates[0].response.delivery_dates.length;
            i++
          ) {
            this.setState({
              startDate: moment(
                nextProps.productDates[0].response.delivery_dates[0]
              ),
            });
            data2.push(
              moment(nextProps.productDates[0].response.delivery_dates[i])
            );
          }
          //console.log(nextProps.productDates[0].response.delivery_dates[0]);
          if (
            nextProps.productDates[0].response.delivery_details.length !== 0
          ) {
            Object.entries(
              nextProps.productDates[0].response.delivery_details
            ).map(([key, val]) => {
              //console.log(key);
              //console.log(nextProps.productDates[0].response.delivery_dates[0]);
              if (
                key === nextProps.productDates[0].response.delivery_dates[0]
              ) {
                console.log(val);
                this.setState({
                  vendorData: val,
                });
              }
            });
          }

          this.setState({
            vendorStartDate:
              nextProps.productDates[0].response.delivery_dates[0],
            minDateShow: nextProps.productDates[0].response.delivery_dates[0],
            maxDateShow:
              nextProps.productDates[0].response.delivery_dates[
                nextProps.productDates[0].response.delivery_dates.length - 1
              ],
            dateObjectArray: data2,
            vendorDetails: nextProps.productDates[0].response.delivery_details,
          });
        }
      } else {
      }
    }

    if (
      !_isEmpty(nextProps.addCartResponseDetails) &&
      this.state.showCartValue
    ) {
      //console.log(nextProps.addCartResponseDetails);
      this.props.getCart(this.props.apiToken);
      toast.success("Product Added to cart");
      this.setState({
        showCartValue: false,
        cartLoader: false,
      });
    }
    if (
      !_isEmpty(nextProps.guestAddCartResponse) &&
      this.state.showGuestCartValue
    ) {
      //console.log(nextProps.guestAddCartResponse);
      //this.props.getData(this.props.apiToken);
      //console.log(this.props.maskId);
      this.props.getGuestList(nextProps.guestAddCartResponse[0].mask_id);
      // console.log(nextProps.guestAddCartResponse[0].mask_id);
      toast.success("Product Added to cart");
      this.setState({
        showGuestCartValue: false,
        cartLoader: false,
      });
    }

    if (!_isEmpty(nextProps.relatedProductsData)) {
      const relatedProducts = nextProps.relatedProductsData;
      // console.log(relatedProducts);
      if (relatedProducts !== undefined) {
        for (var i = 0; i < relatedProducts.length; i++) {
          relatedProducts[i].rating_details[0].avgRating = parseFloat(
            (parseInt(relatedProducts[i].rating_details[0].global_percent) *
              5) /
              100
          );
        }
        for (var i = 0; i < relatedProducts.length; i++) {
          for (var j = 0; j < relatedProducts[i].length; j++) {
            relatedProducts[i].children_products[j].size = relatedProducts[
              i
            ].children_products[j].sku
              .split("-")
              .pop();
          }
        }
        for (var i = 0; i < relatedProducts.length; i++) {
          relatedProducts[i].images_data = [];
          if (relatedProducts[i].images.length != 0) {
            for (var j = 0; j < relatedProducts[i].images.length; j++) {
              relatedProducts[i].images_data.push({
                url: relatedProducts[i].images[j],
              });
            }
          } else {
            relatedProducts[i].images_data.push({
              url: relatedProducts[i].image,
            });
          }
        }
        console.log("related Products", relatedProducts);

        this.setState({
          relatedData: relatedProducts,
          children: this.createChildren({ relatedProducts }),
        });
      }
    }

    if (!_isEmpty(nextProps.upsellProductsData)) {
      const upsellProducts = nextProps.upsellProductsData;
      if (upsellProducts !== undefined) {
        for (var i = 0; i < upsellProducts.length; i++) {
          upsellProducts[i].rating_details[0].avgRating = parseFloat(
            (parseInt(upsellProducts[i].rating_details[0].global_percent) * 5) /
              100
          );
        }
        this.setState({
          upsellChildrens: this.createUpsellChildrens({ upsellProducts }),
        });
      }
    }
  }

  addShow = (e) => {
    console.log(e);
    console.log(this.state.shipAddress);
    this.props.setZipcodeData(e.postcode);
    //if()
    const addressObj = {
      address_id: e.id,
      firstname: e.firstname,
      lastname: e.lastname,
      company: e.company,
      street: e.street,
      city: e.city,
      country_id: "IN",
      region_id: e.region_id,
      postcode: e.postcode,
      telephone: e.telephone,
      default_shipping: true,
      default_billing: false,
    };
    this.props.saveAddress(
      { customer: { id: this.props.custId, address: addressObj } },
      this.props.apiToken
    );
  };

  createChildren2 = ({ data }) =>
    Object.keys(data).map((i) => (
      <div onClick={() => this.addShow(data[i])}>
        <center>
          <div
            style={{
              border: "1px solid #8AB77D",
              height: "175",
              width: "200px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
                border: "1px solid #8AB77D",
                backgroundColor: "rgb(245, 245, 245)",
                textTransform: "none",
                padding: "10px",
              }}
            >
              Address &nbsp;&nbsp;
              {this.props.zipcode === data[i].postcode && (
                <i
                  class="fa fa-check-circle"
                  style={{ color: "green" }}
                  aria-hidden="true"
                ></i>
              )}
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

  handleRedirectClick = () => {
    this.setState({
      handleProductDetailClick: true,
      showData: true,
    });
  };

  handleShowChangeStore = () => {
    this.setState({
      showChangeStoreModal: true,
    });
  };
  handleCloseModal = () => {
    this.setState({
      showChangeStoreModal: false,
    });
  };
  // carousel settings
  UNSAFE_componentWillMount() {
    this.setState({
      children: [],

      // activeItemIndex: 0,
    });

    // setTimeout(() => {
    //   this.setState({
    //     children: this.createChildren(20),
    //   });
    // }, 100);
    if (
      this.state.productId &&
      this.props.match &&
      !isNaN(this.state.productId)
    ) {
      const pdtUrl = this.props.match.params && this.props.match.params.id;
      if (pdtUrl && _endsWith(pdtUrl, ".html")) {
        this.props.getRelatedProducts({
          product_id: this.state.productId,
        });
        this.props.getUpsellProducts({
          productId: this.state.productId,
          apiToken: _get(this.props, "apiToken"),
        });
      } else {
        this.setState({
          redirectNotFound: true,
        });
      }
    }
  }

  reloadProductsData = (data) => {
    this.setState(
      {
        productId: data,
      },
      () => {
        this.props.getProductDetails({
          currencyCode: _get(this.props, "currencyCode"),
          apiToken: _get(this.props, "apiToken"),
          storeId: _get(this.props, "storeId"),
          pageNo: 1,
          productId: this.state.productId,
        });
        this.props.getRelatedProducts({
          productId: this.state.productId,
        });
        this.props.getUpsellProducts({
          productId: this.state.productId,
          apiToken: _get(this.props, "apiToken"),
        });
      }
    );
  };

  slidePrevPage = () => {
    const currentIndex = this.state.currentIndex - this.state.itemsInSlide;
    this.setState({ currentIndex });
  };

  slideNextPage = () => {
    const {
      itemsInSlide,
      children: { length },
    } = this.state;
    let currentIndex = this.state.currentIndex + itemsInSlide;
    if (currentIndex > length) currentIndex = length;

    this.setState({ currentIndex });
  };

  slidePrevPage1 = () => {
    const currentIndex1 = this.state.currentIndex1 - this.state.itemsInSlide;
    this.setState({ currentIndex1 });
  };

  slideNextPage1 = () => {
    const {
      itemsInSlide,
      upsellChildrens: { length },
    } = this.state;
    let currentIndex1 = this.state.currentIndex1 + itemsInSlide;
    if (currentIndex1 > length) currentIndex1 = length;

    this.setState({ currentIndex1 });
  };

  onSlideChange(e) {
    console.debug("Item`s position during a change: ", e.item);
    console.debug("Slide`s position during a change: ", e.slide);
  }

  onSlideChanged(e) {
    console.debug("Item`s position after changes: ", e.item);
    console.debug("Slide`s position after changes: ", e.slide);
  }

  // createChildren = n => _range(n).map(i => <div key={i} style={{
  //   height: 200, background: '#309087', width: 200, borderRadius: '50%', textAlign: 'center', verticalAlign: 'middle',
  // }}>{i}</div>);
  /* createChildren = ({ relatedProducts }) =>
     Object.keys(relatedProducts).map((i) => (
       <div style={{ height: "400px", width: "300px", marginLeft: "50px" }}>
         <center>
           <div
             id="surround"
             style={{
               height: "285px",
               width: "300px",
               border: "1px solid #eaeaea",
             }}
           >
             <a
               id="initial"
               href={`/product/${_get(relatedProducts[i], "sku")}`}
             >
               <Image
                 width={232}
                 height={280}
                 alt={_get(relatedProducts[i], "images[0]")}
                 src={_get(relatedProducts[i], "images[0]")}
                 resizeMode="contain"
               />
             </a>
             <a
               id="onhover"
               href={`/product/${_get(relatedProducts[i], "sku")}`}
             >
               <Image
                 width={232}
                 height={280}
                 alt={_get(relatedProducts[i], "images[1]")}
                 src={_get(relatedProducts[i], "images[1]")}
                 resizeMode="contain"
               />
             </a>
           </div>
         </center>
         <br />
         <div className="row" style={{ width: "300px", marginLeft: "-17px" }}>
           <div className="col-sm-12">
             <p>
               <a
                 href={`/product/${_get(relatedProducts[i], "sku")}`}
                 style={{
                   color: "black",
                   fontFamily: "Quintessential",
                   fontSize: "17px",
                   cursor: "pointer",
                 }}
               >
                 {_get(relatedProducts[i], "name")}
               </a>
             </p>
           </div>
         </div>
         <div
           className="row dropdown8"
           style={{ width: "300px", marginLeft: "0px" }}
         >
           <div className="col-md-12">
             <StarRatings
               rating={_get(relatedProducts[i], "rating_details[0].avgRating")}
               starDimension="20px"
               starSpacing="1px"
               starEmptyColor="#434343"
               starRatedColor="#fdb927"
             />
             &nbsp;
             <a className="dropdown8">
               <i class="fa fa-angle-down" aria-hidden="true"></i>
             </a>
             &nbsp;
             <span style={{ color: "#007185" }}>
               {relatedProducts[i].rating_details[0].global_review}
             </span>
             <div className="dropdown-content8">
               <div
                 className="row"
                 style={{ width: "305px", paddingLeft: "10px" }}
               >
                 <StarRatings
                   rating={relatedProducts[i].rating_details[0].avgRating}
                   starDimension="15px"
                   starSpacing="1px"
                   starEmptyColor="#434343"
                   starRatedColor="#fdb927"
                 />
                 &nbsp;&nbsp;&nbsp;&nbsp;
                 <span style={{ color: "black", fontSize: "20px" }}>
                   {relatedProducts[i].rating_details[0].avgRating} Out Of 5
                 </span>
                 <br />
               </div>
               <br />
               <div className="row">
                 <div className="col-md-12">
                   <center>
                     <span style={{ color: "black", fontSize: "13px" }}>
                       {relatedProducts[i].rating_details[0].global_review}{" "}
                       global review
                     </span>
                   </center>
                 </div>
               </div>
               <br />
               <div className="row">
                 <div className="col-md-3">
                   <center>
                     <span style={{ color: "#fdb927", fontSize: "13px" }}>
                       <a id="data">5 Star</a>
                     </span>
                   </center>
                 </div>
                 <div className="col-md-7">
                   <div class="progress" style={{ width: "150px !important" }}>
                     <div
                       class="progress-bar"
                       role="progressbar"
                       aria-valuenow={
                         relatedProducts[i].rating_details[0].rating[5].percent
                       }
                       aria-valuemin="0"
                       aria-valuemax="100"
                       style={{
                         width: `${relatedProducts[i].rating_details[0].rating[5].percent}%`,
                       }}
                     >
                       <span class="sr-only">
                         {relatedProducts[i].rating_details[0].rating[5].percent}
                         % Complete
                       </span>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-2">
                   <center>
                     <span
                       style={{
                         color: "#fdb927",
                         fontSize: "13px",
                         marginLeft: "-20px",
                       }}
                     >
                       {relatedProducts[i].rating_details[0].rating[5].percent}%
                     </span>
                   </center>
                 </div>
               </div>
 
               <div className="row">
                 <div className="col-md-3">
                   <center>
                     <span style={{ color: "#fdb927", fontSize: "13px" }}>
                       4 Star
                     </span>
                   </center>
                 </div>
                 <div className="col-md-7">
                   <div class="progress" style={{ width: "150px !important" }}>
                     <div
                       class="progress-bar"
                       role="progressbar"
                       aria-valuenow={
                         relatedProducts[i].rating_details[0].rating[4].percent
                       }
                       aria-valuemin="0"
                       aria-valuemax="100"
                       style={{
                         width: `${relatedProducts[i].rating_details[0].rating[4].percent}%`,
                       }}
                     >
                       <span class="sr-only">
                         {relatedProducts[i].rating_details[0].rating[4].percent}
                         % Complete
                       </span>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-2">
                   <center>
                     <span
                       style={{
                         color: "#fdb927",
                         fontSize: "13px",
                         marginLeft: "-20px",
                       }}
                     >
                       {relatedProducts[i].rating_details[0].rating[4].percent}%
                     </span>
                   </center>
                 </div>
               </div>
 
               <div className="row">
                 <div className="col-md-3">
                   <center>
                     <span style={{ color: "#fdb927", fontSize: "13px" }}>
                       3 Star
                     </span>
                   </center>
                 </div>
                 <div className="col-md-7">
                   <div class="progress" style={{ width: "150px !important" }}>
                     <div
                       class="progress-bar"
                       role="progressbar"
                       aria-valuenow={
                         relatedProducts[i].rating_details[0].rating[3].percent
                       }
                       aria-valuemin="0"
                       aria-valuemax="100"
                       style={{
                         width: `${relatedProducts[i].rating_details[0].rating[3].percent}%`,
                       }}
                     >
                       <span class="sr-only">
                         {relatedProducts[i].rating_details[0].rating[3].percent}
                         % Complete
                       </span>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-2">
                   <center>
                     <span
                       style={{
                         color: "#fdb927",
                         fontSize: "13px",
                         marginLeft: "-20px",
                       }}
                     >
                       {relatedProducts[i].rating_details[0].rating[3].percent}%
                     </span>
                   </center>
                 </div>
               </div>
 
               <div className="row">
                 <div className="col-md-3">
                   <center>
                     <span style={{ color: "#fdb927", fontSize: "13px" }}>
                       2 Star
                     </span>
                   </center>
                 </div>
                 <div className="col-md-7">
                   <div class="progress" style={{ width: "150px !important" }}>
                     <div
                       class="progress-bar"
                       role="progressbar"
                       aria-valuenow={
                         relatedProducts[i].rating_details[0].rating[2].percent
                       }
                       aria-valuemin="0"
                       aria-valuemax="100"
                       style={{
                         width: `${relatedProducts[i].rating_details[0].rating[2].percent}%`,
                       }}
                     >
                       <span class="sr-only">
                         {relatedProducts[i].rating_details[0].rating[2].percent}
                         % Complete
                       </span>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-2">
                   <center>
                     <span
                       style={{
                         color: "#fdb927",
                         fontSize: "13px",
                         marginLeft: "-20px",
                       }}
                     >
                       {relatedProducts[i].rating_details[0].rating[2].percent}%
                     </span>
                   </center>
                 </div>
               </div>
 
               <div className="row">
                 <div className="col-md-3">
                   <center>
                     <span style={{ color: "#fdb927", fontSize: "13px" }}>
                       1 Star
                     </span>
                   </center>
                 </div>
                 <div className="col-md-7">
                   <div class="progress" style={{ width: "150px !important" }}>
                     <div
                       class="progress-bar"
                       role="progressbar"
                       aria-valuenow={
                         relatedProducts[i].rating_details[0].rating[1].percent
                       }
                       aria-valuemin="0"
                       aria-valuemax="100"
                       style={{
                         width: `${relatedProducts[i].rating_details[0].rating[1].percent}%`,
                       }}
                     >
                       <span class="sr-only">
                         {relatedProducts[i].rating_details[0].rating[1].percent}
                         % Complete
                       </span>
                     </div>
                   </div>
                 </div>
                 <div className="col-md-2">
                   <center>
                     <span
                       style={{
                         color: "#fdb927",
                         fontSize: "13px",
                         marginLeft: "-20px",
                       }}
                     >
                       {relatedProducts[i].rating_details[0].rating[1].percent}%
                     </span>
                   </center>
                 </div>
               </div>
             </div>
           </div>
         </div>
         <div className="row" style={{ width: "300px", marginLeft: "0px" }}>
           <div className="col-sm-12">
             <p>
               <a
                 style={{
                   color: "black",
                   fontFamily: "Quintessential",
                   fontSize: "17px",
                   marginLeft: "-19px",
                   cursor: "pointer",
                 }}
               >
                 ${_get(relatedProducts[i], "price")}
               </a>
             </p>
           </div>
         </div>
         <div className="row" style={{ width: "300px", marginLeft: "0px" }}>
           <div className="col-md-12">
             <p>
               <a
                 style={{
                   color: "black",
                   fontFamily: "Quintessential",
                   fontSize: "13px",
                   marginLeft: "-19px",
                   cursor: "pointer",
                   color: "grey",
                 }}
               >
                 $14.95 Shipping
               </a>
             </p>
           </div>
         </div>
       </div>
     ));*/

  createChildren = ({ relatedProducts }) =>
    Object.keys(relatedProducts).map((i) => (
      <div
        id="relate_prd"
        style={{ height: "400px", width: "300px", marginLeft: "-15px" }}
      >
        <center>
          <div
            className="product_relt"
            id="surround"
            style={{
              height: "250px",
              width: "250px",
              border: "1px solid black",
            }}
          >
            <a
              id="initial"
              href={`/product/${_get(relatedProducts[i], "sku")}`}
            >
              <Image
                width={232}
                height={280}
                alt={_get(relatedProducts[i], "images[0]")}
                src={_get(relatedProducts[i], "images[0]")}
                resizeMode="contain"
              />
            </a>
            <a
              id="onhover"
              href={`/product/${_get(relatedProducts[i], "sku")}`}
            >
              <Image
                width={232}
                height={280}
                alt={_get(relatedProducts[i], "images[1]")}
                src={_get(relatedProducts[i], "images[1]")}
                resizeMode="contain"
              />
            </a>
          </div>
        </center>
        <br />
        <div className="row" style={{ width: "300px", marginLeft: "-17px" }}>
          <div className="col-sm-12" id="name_coll5">
            <p className="pdts_name2" id="name_row2">
              <a
                href={`/product/${_get(relatedProducts[i], "sku")}`}
                style={{
                  color: "black",
                  fontFamily: "Quintessential",
                  fontSize: "17px",
                  cursor: "pointer",
                }}
              >
                {_get(relatedProducts[i], "name")}
              </a>
            </p>
          </div>
        </div>
        <div className="row dropdown8 dpdown2" id="star_coll5">
          <div className="col-md-12" id="star_row2">
            <StarRatings
              rating={_get(relatedProducts[i], "rating_details[0].avgRating")}
              starDimension="20px"
              starSpacing="1px"
              starEmptyColor="#434343"
              starRatedColor="#fdb927"
            />
            &nbsp;
            {/*<a className="dropdown8"><i class="fa fa-angle-down" aria-hidden="true"></i></a> 
                                &nbsp;
                                <span style={{color:'#007185'}}>{relatedProducts[i].rating_details[0].global_review}</span>                     
                                        <div className="dropdown-content8"> 
                                        
                                           <div className="row" style={{width:'305px',paddingLeft:'10px'}}>
                                           
                                             <StarRatings
                                                          rating={relatedProducts[i].rating_details[0].avgRating}
                                                          starDimension="15px"
                                                          starSpacing="1px"
                                                          starEmptyColor="#434343"
                                                          starRatedColor="#fdb927"
                                                      />
                                              &nbsp;&nbsp;&nbsp;&nbsp;
                                              <span style={{color:'black',fontSize:'20px'}}>{relatedProducts[i].rating_details[0].avgRating} Out Of 5</span>
                                             <br/>

                                            
                                          </div>     
                                              <br/>
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <center>
                                                  <span style={{color:'black',fontSize:'13px'}}>{relatedProducts[i].rating_details[0].global_review} global review</span>
                                                  </center>
                                               </div> 
                                              </div> 
                                            <br/>
                                             <div className="row">
                                                  <div className="col-md-3 col-3"><center><span style={{color:'#fdb927',fontSize:'13px'}}><a id="data">5 Star</a></span></center></div>
                                                  <div className="col-md-7 col-7">
                                                            <div class="progress" style={{width:'150px !important'}}>
                                                                    <div class="progress-bar" role="progressbar" aria-valuenow={relatedProducts[i].rating_details[0].rating[5].percent} aria-valuemin="0" aria-valuemax="100" style={{width:`${relatedProducts[i].rating_details[0].rating[5].percent}%`}}>
                                                                      <span class="sr-only">{relatedProducts[i].rating_details[0].rating[5].percent}% Complete</span>
                                                                    </div>
                                                                  </div>

                                                  </div>
                                                  <div className="col-md-2 col-2"><center><span style={{color:'#fdb927',fontSize:'13px',marginLeft:'-20px'}}>{relatedProducts[i].rating_details[0].rating[5].percent}%</span></center></div>
                                              </div> 


                                              <div className="row">
                                                  <div className="col-md-3 col-3"><center><span style={{color:'#fdb927',fontSize:'13px'}}>4 Star</span></center></div>
                                                  <div className="col-md-7 col-7">
                                                            <div class="progress" style={{width:'150px !important'}}>
                                                                    <div class="progress-bar" role="progressbar" aria-valuenow={relatedProducts[i].rating_details[0].rating[4].percent} aria-valuemin="0" aria-valuemax="100" style={{width:`${relatedProducts[i].rating_details[0].rating[4].percent}%`}}>
                                                                      <span class="sr-only">{relatedProducts[i].rating_details[0].rating[4].percent}% Complete</span>
                                                                    </div>
                                                                  </div>

                                                  </div>
                                                  <div className="col-md-2 col-2"><center><span style={{color:'#fdb927',fontSize:'13px',marginLeft:'-20px'}}>{relatedProducts[i].rating_details[0].rating[4].percent}%</span></center></div>
                                              </div> 
                                        

                                              <div className="row">
                                                  <div className="col-md-3 col-3"><center><span style={{color:'#fdb927',fontSize:'13px'}}>3 Star</span></center></div>
                                                  <div className="col-md-7 col-7">
                                                            <div class="progress" style={{width:'150px !important'}}>
                                                                    <div class="progress-bar" role="progressbar" aria-valuenow={relatedProducts[i].rating_details[0].rating[3].percent} aria-valuemin="0" aria-valuemax="100" style={{width:`${relatedProducts[i].rating_details[0].rating[3].percent}%`}}>
                                                                      <span class="sr-only">{relatedProducts[i].rating_details[0].rating[3].percent}% Complete</span>
                                                                    </div>
                                                                  </div>

                                                  </div>
                                                  <div className="col-md-2 col-2"><center><span style={{color:'#fdb927',fontSize:'13px',marginLeft:'-20px'}}>{relatedProducts[i].rating_details[0].rating[3].percent}%</span></center></div>
                                              </div> 
                                        

                                              <div className="row">
                                                  <div className="col-md-3 col-3"><center><span style={{color:'#fdb927',fontSize:'13px'}}>2 Star</span></center></div>
                                                  <div className="col-md-7 col-7">
                                                            <div class="progress" style={{width:'150px !important'}}>
                                                                    <div class="progress-bar" role="progressbar" aria-valuenow={relatedProducts[i].rating_details[0].rating[2].percent} aria-valuemin="0" aria-valuemax="100" style={{width:`${relatedProducts[i].rating_details[0].rating[2].percent}%`}}>
                                                                      <span class="sr-only">{relatedProducts[i].rating_details[0].rating[2].percent}% Complete</span>
                                                                    </div>
                                                                  </div>

                                                  </div>
                                                  <div className="col-md-2 col-2"><center><span style={{color:'#fdb927',fontSize:'13px',marginLeft:'-20px'}}>{relatedProducts[i].rating_details[0].rating[2].percent}%</span></center></div>
                                              </div> 
                                        

                                              <div className="row">
                                                  <div className="col-md-3 col-3"><center><span style={{color:'#fdb927',fontSize:'13px'}}>1 Star</span></center></div>
                                                  <div className="col-md-7 col-7">
                                                            <div class="progress" style={{width:'150px !important'}}>
                                                                    <div class="progress-bar" role="progressbar" aria-valuenow={relatedProducts[i].rating_details[0].rating[1].percent} aria-valuemin="0" aria-valuemax="100" style={{width:`${relatedProducts[i].rating_details[0].rating[1].percent}%`}}>
                                                                      <span class="sr-only">{relatedProducts[i].rating_details[0].rating[1].percent}% Complete</span>
                                                                    </div>
                                                                  </div>

                                                  </div>
                                                  <div className="col-md-2 col-2"><center><span style={{color:'#fdb927',fontSize:'13px',marginLeft:'-20px'}}>{relatedProducts[i].rating_details[0].rating[1].percent}%</span></center></div>
                                              </div> 
                                        </div>*/}
          </div>
        </div>

        <div
          className="row"
          style={{
            width: "300px",
            marginLeft: "7px",
            marginTop: "5px",
            textAlign: "center",
          }}
        >
          <div className="col-sm-12" id="price_coll5">
            <p id="price_row2">
              <a
                style={{
                  color: "black",
                  fontFamily: "Quintessential",
                  fontSize: "17px",
                  marginLeft: "-19px",
                  cursor: "pointer",
                }}
              >
                &#8377; {_get(relatedProducts[i], "price")}
              </a>
            </p>
          </div>
        </div>
        {/*<div className="row" style={{width:'300px',marginLeft:'0px'}}>                                  
                  <div className="col-md-12"><p><a style={{color:'black',fontFamily: 'Quintessential',fontSize:'13px',marginLeft:'-19px',cursor:'pointer',color:'grey'}}>$14.95 Shipping</a></p></div>                                               
                </div>*/}
      </div>
    ));

  createUpsellChildrens = ({ upsellProducts }) =>
    Object.keys(upsellProducts).map((i) => (
      <div style={{ height: "400px", width: "300px", marginLeft: "50px" }}>
        <center>
          <div
            id="surround"
            style={{
              height: "285px",
              width: "300px",
              border: "1px solid #eaeaea",
            }}
          >
            <a id="initial" href={`/product/${_get(upsellProducts[i], "sku")}`}>
              <Image
                width={232}
                height={280}
                alt={_get(upsellProducts[i], "images[0]")}
                src={_get(upsellProducts[i], "images[0]")}
                resizeMode="contain"
              />
            </a>
            <a id="onhover" href={`/product/${_get(upsellProducts[i], "sku")}`}>
              <Image
                width={232}
                height={280}
                alt={_get(upsellProducts[i], "images[1]")}
                src={_get(upsellProducts[i], "images[1]")}
                resizeMode="contain"
              />
            </a>
          </div>
        </center>
        <br />
        <div className="row" style={{ width: "300px", marginLeft: "-17px" }}>
          <div className="col-sm-12">
            <p>
              <a
                href={`/product/${_get(upsellProducts[i], "sku")}`}
                style={{ color: "black", fontSize: "17px", cursor: "pointer" }}
              >
                {_get(upsellProducts[i], "name")}
              </a>
            </p>
          </div>
        </div>
        <div
          className="row dropdown8"
          style={{ width: "300px", marginLeft: "-20px" }}
        >
          <div className="col-md-12">
            <StarRatings
              rating={_get(upsellProducts[i], "rating_details[0].avgRating")}
              starDimension="20px"
              starSpacing="1px"
              starEmptyColor="#434343"
              starRatedColor="#fdb927"
            />
            &nbsp;
            <a className="dropdown8">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            &nbsp;
            <span style={{ color: "#007185" }}>
              {upsellProducts[i].rating_details[0].global_review}
            </span>
            <div className="dropdown-content8">
              <div
                className="row"
                style={{ width: "305px", paddingLeft: "10px" }}
              >
                <StarRatings
                  rating={upsellProducts[i].rating_details[0].avgRating}
                  starDimension="15px"
                  starSpacing="1px"
                  starEmptyColor="#434343"
                  starRatedColor="#fdb927"
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span style={{ color: "black", fontSize: "20px" }}>
                  {upsellProducts[i].rating_details[0].avgRating} Out Of 5
                </span>
                <br />
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <center>
                    <span style={{ color: "black", fontSize: "13px" }}>
                      {upsellProducts[i].rating_details[0].global_review} global
                      review
                    </span>
                  </center>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-3">
                  <center>
                    <span style={{ color: "#fdb927", fontSize: "13px" }}>
                      5 Star
                    </span>
                  </center>
                </div>
                <div className="col-md-7">
                  <div class="progress" style={{ width: "150px !important" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow={
                        upsellProducts[i].rating_details[0].rating[5].percent
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${upsellProducts[i].rating_details[0].rating[5].percent}%`,
                      }}
                    >
                      <span class="sr-only">
                        {upsellProducts[i].rating_details[0].rating[5].percent}%
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <center>
                    <span
                      style={{
                        color: "#fdb927",
                        fontSize: "13px",
                        marginLeft: "-20px",
                      }}
                    >
                      {upsellProducts[i].rating_details[0].rating[5].percent}%
                    </span>
                  </center>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <center>
                    <span style={{ color: "#fdb927", fontSize: "13px" }}>
                      4 Star
                    </span>
                  </center>
                </div>
                <div className="col-md-7">
                  <div class="progress" style={{ width: "150px !important" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow={
                        upsellProducts[i].rating_details[0].rating[4].percent
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${upsellProducts[i].rating_details[0].rating[4].percent}%`,
                      }}
                    >
                      <span class="sr-only">
                        {upsellProducts[i].rating_details[0].rating[4].percent}%
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <center>
                    <span
                      style={{
                        color: "#fdb927",
                        fontSize: "13px",
                        marginLeft: "-20px",
                      }}
                    >
                      {upsellProducts[i].rating_details[0].rating[4].percent}%
                    </span>
                  </center>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <center>
                    <span style={{ color: "#fdb927", fontSize: "13px" }}>
                      3 Star
                    </span>
                  </center>
                </div>
                <div className="col-md-7">
                  <div class="progress" style={{ width: "150px !important" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow={
                        upsellProducts[i].rating_details[0].rating[3].percent
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${upsellProducts[i].rating_details[0].rating[3].percent}%`,
                      }}
                    >
                      <span class="sr-only">
                        {upsellProducts[i].rating_details[0].rating[3].percent}%
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <center>
                    <span
                      style={{
                        color: "#fdb927",
                        fontSize: "13px",
                        marginLeft: "-20px",
                      }}
                    >
                      {upsellProducts[i].rating_details[0].rating[3].percent}%
                    </span>
                  </center>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <center>
                    <span style={{ color: "#fdb927", fontSize: "13px" }}>
                      2 Star
                    </span>
                  </center>
                </div>
                <div className="col-md-7">
                  <div class="progress" style={{ width: "150px !important" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow={
                        upsellProducts[i].rating_details[0].rating[2].percent
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${upsellProducts[i].rating_details[0].rating[2].percent}%`,
                      }}
                    >
                      <span class="sr-only">
                        {upsellProducts[i].rating_details[0].rating[2].percent}%
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <center>
                    <span
                      style={{
                        color: "#fdb927",
                        fontSize: "13px",
                        marginLeft: "-20px",
                      }}
                    >
                      {upsellProducts[i].rating_details[0].rating[2].percent}%
                    </span>
                  </center>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <center>
                    <span style={{ color: "#fdb927", fontSize: "13px" }}>
                      1 Star
                    </span>
                  </center>
                </div>
                <div className="col-md-7">
                  <div class="progress" style={{ width: "150px !important" }}>
                    <div
                      class="progress-bar"
                      role="progressbar"
                      aria-valuenow={
                        upsellProducts[i].rating_details[0].rating[1].percent
                      }
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{
                        width: `${upsellProducts[i].rating_details[0].rating[1].percent}%`,
                      }}
                    >
                      <span class="sr-only">
                        {upsellProducts[i].rating_details[0].rating[1].percent}%
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <center>
                    <span
                      style={{
                        color: "#fdb927",
                        fontSize: "13px",
                        marginLeft: "-20px",
                      }}
                    >
                      {upsellProducts[i].rating_details[0].rating[1].percent}%
                    </span>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ width: "300px", marginLeft: "0px" }}>
          <div className="col-sm-6">
            <p>
              <a
                style={{
                  color: "black",
                  fontSize: "17px",
                  marginLeft: "-19px",
                  cursor: "pointer",
                }}
              >
                ${_get(upsellProducts[i], "price")}
              </a>
            </p>
          </div>
          <div className="col-sm-6">
            <p className="ship_name">Free Shipping</p>
          </div>
        </div>
      </div>
    ));

  handleMethodChange = (event) => {
    if (event.target.name === "store") {
      const x = _find(_get(this.props.loginData, "0.result.store_list", []), {
        store_id: event.target.value,
      });
      const selectedStoreName = _get(x, "store_name");
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.setStoreId({
        storeId: event.target.value,
        storeName: selectedStoreName,
      });
      this.props.flushCartData();
      this.props.flushCartViewData();
      this.props.clearCart({
        apiToken: this.props.apiToken,
        cartId: this.props.cartId,
      });
      this.props.getProductDetails({
        currencyCode: _get(this.props, "currencyCode"),
        apiToken: _get(this.props, "apiToken"),
        storeId: this.state.selectedStoreId
          ? this.state.selectedStoreId
          : this.props.storeId,
        pageNo: 1,
        productId: this.state.productId,
      });
    }
  };
  // input validation

  handleInuputChange = (event, deliData) => {
    let totalTemp = 0;
    let totalPriceToPay, inputQty, blinkText;

    inputQty = event.target.value;

    // const { blinkText, totalAmount, inputValid } = this.state;

    let disableCartBtn = "disableBtn";
    const flag = inputQty >= _get(deliData, "floorallowed");
    if (!flag) {
      totalTemp = inputQty * _get(deliData, "total_price");
      const reminder = inputQty % _get(deliData, "qty_per_box");

      totalPriceToPay =
        inputQty > 0 && reminder === 0
          ? `Total amount payable $${totalTemp.toFixed(2)}`
          : "";
      disableCartBtn = inputQty > 0 && reminder === 0 ? "" : "disableBtn";
      blinkText = inputQty > 0 && reminder === 0 ? "" : " blink";
    }
    // if (event.target.value % _get(deliData, 'qty_per_box') !== 0) {
    //   blinkText[_get(this.props, 'productId')] = 'blink';
    // } else {
    //   blinkText[_get(this.props, 'productId')] = '';
    // }

    // totalAmount[_get(this.props, 'productId')] = totalTemp;
    this.setState({
      unitQty: inputQty,
      totalAmount: totalTemp,
      // totalAmount,
      showMaxQtyAlert: flag,
      totalPriceToPay,
      disableCartBtn,
      blinkText,
      quantity: inputQty,
    });
  };
  // end of input validation

  // handle tags related fn
  handleTagInputChange = (event) => {
    this.setState({
      tagsInput: event.target.value,
    });
  };

  handleDataDate = (event) => {
    console.log(event.target.value);
    this.setState({
      startDate: event.target.value,
    });
  };

  addTags = () => {
    const reqBody = {
      productId: this.state.productId,
      apiToken: _get(this.props, "apiToken"),
      tags: this.state.tagsInput,
    };
    this.props.addTagsData(reqBody);
    this.setState({
      submitTagAlert: true,
    });
  };

  handleVendorReviewClick = (vendorId, vendorName) => {
    this.setState({
      redirectToVendorRevPage: true,
      vendorId,
      vendorName,
    });
  };

  handleProdReviewClick = () => {
    window.scrollTo(0, 1300);
  };

  handleChangeData = () => {
    console.log("test");
  };

  handleMouseEnter = (data) => {
    console.log("Image", data);
    this.setState({
      imageSrc: data,
    });
  };

  handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    this.setState({ backgroundPosition: `${x}% ${y}%` });
  };

  showAddressModal = () =>
    this.setState((prevState) => ({
      showChangeAddress: !prevState.showChangeAddress,
    }));

  handleInputChange1 = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  changeZipCodeData = () => {
    console.log(this.state.postalCode);
    this.props.setZipcodeData(this.state.postalCode);
    this.setState({
      showChangeAddress: false,
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
  isWeekday = (date) => {
    console.log(date);
    const day = getDay(date);
    return day !== 0 && day !== 6;
  };

  getStoreData = (data) => {
    console.log(data);
    this.setState({
      proData: data,
      proLink: true,
    });
  };

  handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  createMarkup = (content) => ({ __html: content });

  sizeSelectData = (d) => {
    console.log(d);
    d.percentage = parseFloat(
      (((d.special_price - d.price) * 100) / d.special_price).toFixed(2)
    );
    this.setState({
      prodChildData: d,
      prodChildSku: d.sku,
      otherDetails: d.custom_fields,
      deliveryStatus: this.props.getDates(d.sku),
    });

    this.props.getReview(d.id);
  };

  sideImageSelection = (name) => {
    console.log(name.sku);
    this.state.productDetails.children_products.map((items) => {
      if (items.sku === name.sku) {
        this.setState({ imageSrc: items.images[0], sideImages: items.images });
      }
    });
  };
  defaultDates = (dates) => {
    this.setState({
      deliveryStatus: this.props.getDates(dates),
    });
  };

  changeZipCode = () => {
    console.log(this.state.zipCodeData.length);
    if (this.state.zipCodeData.length === 6) {
      this.props.setZipcodeData(this.state.zipCodeData);
      this.setState({
        deliveryStatus: this.props.getDates(
          this.state.prodChildData.sku,
          this.state.zipCodeData
        ),
      });
    } else {
      toast.error("Please Enter ZipCode!");
    }
  };

  handleChangeZip = (event) => {
    const limitChar = 6;

    if (event.target.value.toString().length <= limitChar) {
      this.setState({
        [event.target.id]: event.target.value,
      });
    }

    console.log(event.target.value.length);
    // if(event.target.value.length > 6)
    // {
    //   this.props.setZipcodeData(event.target.value);
    // }
  };

  render() {
    console.log(this.state);
    if (this.state.pageLoader) {
      return (
        <div id="cover-spin">
          <center>
            <img
              src={lazyLoader}
              style={{ height: "126px", marginTop: "300px" }}
              alt="lazy-loader"
            />
          </center>
        </div>
      );
    }

    if (this.state.proLink) {
      this.setState({
        proLink: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname: "/product/" + this.state.proData.sku,
          }}
        />
      );
    }
    console.log(this.props);
    return (
      <div>
        {/* <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        <section>
          <div className="text-center"></div>
        </section>
        {
          <ErrorBoundary>
            <ProductDetailComponent
              slidePrevPage={this.slidePrevPage}
              slideNextPage={this.slideNextPage}
              slidePrevPage1={this.slidePrevPage1}
              slideNextPage1={this.slideNextPage1}
              currentIndex={this.state.currentIndex}
              currentIndex1={this.state.currentIndex1}
              productDetails={this.state.productDetails}
              otherDetails={this.state.otherDetails}
              children={this.state.children}
              upsellChildrens={this.state.upsellChildrens}
              moreData={this.state.moreData}
              toggleReviewModalFn={this.toggleReviewModalFn}
              showReviewModal={this.state.showReviewModal}
              toggleAllReviewModalFn={this.toggleAllReviewModalFn}
              showAllReviewModal={this.state.showAllReviewModal}
              handleMouseEnter={this.handleMouseEnter}
              imageSrc={this.state.imageSrc}
              sideImages={this.state.sideImages}
              onMouseMove={this.onMouseMove}
              errors={this.state.errors}
              valueData={this.state.valueData}
              IncreaseItem={this.IncrementItem}
              DecreaseItem={this.DecreaseItem}
              addProductToCart={this.addProductToCart}
              onSlideChange={this.onSlideChange}
              onSlideChanged={this.onSlideChanged}
              changeRating={this.changeRating}
              rating={this.state.rating}
              submitReviews={this.submitReviews}
              handleDateValueChange={this.handleDateValueChange}
              startDate={this.state.startDate}
              userFirstName={this.props.userFirstName}
              zipCode={this.props.zipcode}
              handleChangeData={this.handleChangeData}
              dateObjectArray={this.state.dateObjectArray}
              vendorDetails={this.state.vendorDetails}
              handleChange={this.handleChange}
              reviewPostLoader={this.state.reviewPostLoader}
              productReviewData={this.state.productReviewData}
              showData={this.state.showData}
              focusReview={this.focusReview}
              reviewShow={this.state.reviewShow}
              handleDataDate={this.handleDataDate}
              minDateShow={this.state.minDateShow}
              maxDateShow={this.state.maxDateShow}
              showChangeAddress={this.state.showChangeAddress}
              apiToken={this.props.apiToken}
              handleInputChange1={this.handleInputChange1}
              changeZipCodeData={this.changeZipCodeData}
              addressData={this.state.addressData}
              handleAddAddress={this.handleAddAddress}
              responsive={this.state.responsive}
              showAddressModal={this.showAddressModal}
              disableWeekends={this.disableWeekends}
              cartLoader={this.state.cartLoader}
              isWeekday={this.isWeekday}
              dateChanged={this.dateChanged}
              image0={this.state.image0}
              image1={this.state.image1}
              image2={this.state.image2}
              image3={this.state.image3}
              image4={this.state.image4}
              handleScroll={this.handleScroll}
              doNotShowAdd={this.state.doNotShowAdd}
              swatchData={this.state.swatchData}
              createMarkup={this.createMarkup}
              relatedData={this.state.relatedData}
              prodChildData={this.state.prodChildData}
              prodChildSku={this.state.prodChildSku}
              sizeSelectData={this.sizeSelectData}
              handleChangeZip={this.handleChangeZip}
              zipCodeData={this.state.zipCodeData}
              getStoreData={this.getStoreData}
              changeZipCode={this.changeZipCode}
              deliveryStatus={this.state.deliveryStatus}
              totatlReviewCount={this.state.totatlReviewCount}
              sideImageSelection={this.sideImageSelection}
              defaultDates={this.defaultDates}
            />
          </ErrorBoundary>
        }
        <div href="#data"></div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProductDetails: (data) => dispatch(fetchProductDetails(data)),
  getRelatedProducts: (data) => dispatch(fetchRelatedProducts(data)),
  getUpsellProducts: (data) => dispatch(fetchUpsellingProducts(data)),
  getQuoteId: (data) => dispatch(fetchQuoteId(data)),
  getCartData: (data) => dispatch(updateCartValue(data)),
  addCartData: (data, data1) => dispatch(postAddToCartData(data, data1)),
  getData: (data) => dispatch(fetchCartItemsByCustomer(data)),
  submitReviewsData: (data, data1) => dispatch(postReviews(data, data1)),
  guestAddToCart: (data) => dispatch(postGuestAddToCartData(data)),
  getGuestList: (data) => dispatch(getGuestCartList(data)),
  getCart: (data) => dispatch(fetchGetCartData(data)),
  getDates: (data, data1) => dispatch(fetchProductDates(data, data1)),
  getReview: (data) => dispatch(fetchReviewData(data)),
  setZipcodeData: (data) => dispatch(setZipcodeData(data)),
  saveAddress: (data, data1) => dispatch(fetchEditAddress(data, data1)),
});

const mapStateToProps = (state) => {
  const {
    productDetailReducer,
    loginReducer,
    cartReducer,
    allAddressReducer,
  } = state;

  const {
    productDetailsData,
    relatedProductsData,
    upsellProductsData,
    productDates,
    postPRSuccess,
    reviewData,
    error: PDTerror,
  } = productDetailReducer || [];

  const {
    apiToken,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    zipcode,
  } = loginReducer || [];

  const {
    cartId,
    cartData,
    addCartResponseDetails,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
  } = cartReducer || [];

  const { allAddressData, shippingAddressData, billingAddressData } =
    allAddressReducer || [];

  const error = !_isEmpty(PDTerror) || undefined;

  return {
    productDetailsData,
    relatedProductsData,
    upsellProductsData,
    error,
    apiToken,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    customerAddress,
    cartId,
    cartData,
    addCartResponseDetails,
    maskId,
    guestAddCartResponse,
    guestCartList,
    guestCartItems,
    productDates,
    zipcode,
    postPRSuccess,
    reviewData,
    allAddressData,
    shippingAddressData,
    billingAddressData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(ProductDetailContainer));
