import React, { Component } from "react";
import moment from "moment";
// import JsPDF from 'jspdf';
import html2canvas from "html2canvas";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isError from "lodash/isError";
import _find from "lodash/find";
import _pull from "lodash/pull";
import _minBy from "lodash/minBy";
import _maxBy from "lodash/maxBy";
import Redirect from "react-router/Redirect";
import connect from "react-redux/lib/connect/connect";
import JsSHA from "jssha";
import { ToastContainer, toast } from "react-toastify";

import MyOrderComponent from "../../components/MyAccount/MyOrderComponent.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import {
  fetchMyOrderData,
  fetchMyInvoiceData,
  fetchOpenTermData,
  fetchViewOrderData,
  fetchDownloadInvoiceData,
  setOrderId,
  fetchMultipleOrderPaymentOpenTermsData,
  cancelSubscriptionOrder,
  userFirstName,
  postReviews,
} from "../../actions/myOrder";
import TrackTableComponent from "../../components/BKMComponent/TrackTableComponent.jsx";
import BreadCrumbs from "../../components/Common/BreadCrumbs.jsx";
import PDFComponent from "../../components/MyAccount/PDFComponent.jsx";
import { setFirstDataRedirection } from "../../actions/placeOrder";
import { fetchAllAddressData } from "../../actions/address";
import ErrorBoundary from "../ErrorBoundary.jsx";
import ErrorHandler from "../../components/Hoc/ErrorHandler.jsx";
import lazyLoader from "../../assets/img/loader.gif";
import MaModal from "../../components/Common/MaterialUIModal.jsx";
import StarRatings from "react-star-ratings";
const selected = [];
const unselected = [];

class MyOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewOrder: false,
      viewOpenTerm: false,
      viewMyOrder: false,
      viewInvoice: false,
      back: false,
      downloadPdf: undefined,
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
      fromDate: moment().subtract(1, "week").format("YYYY-MM-DD"),
      toDate: moment().format("YYYY-MM-DD"),
      pdfData: undefined,
      showPdf: false,
      pageid: "WSP-KABLO-cgrpBAB55g",
      key: "JeY9Kv7_vVuMuQPLFYyV",
      sequence: Math.floor(Math.random() * 10000),
      timestamp: moment(new Date()).unix(),
      getHashValue: undefined,
      selectedTotal: 0,
      filtDateFrom: undefined,
      filtDateTo: undefined,
      myOrderRes: undefined,
      showReviewModal: false,
      rating: 0,
      fields: {},
      errors: {},
      userFirstName: undefined,
      reviewPostLoader: false,
      productDetailsId: undefined,
    };
  }

  getHash = () => {
    const string = [
      this.state.pageid,
      this.state.sequence,
      this.state.timestamp,
      this.state.selectedTotal,
      this.props.currencyCode,
    ].join("^");
    const shaObj = new JsSHA("SHA-1", "TEXT");
    shaObj.setHMACKey(this.state.key, "TEXT");
    shaObj.update(string);
    const hmac = shaObj.getHMAC("HEX");
    return hmac;
  };

  componentDidMount() {
    document.title = "My Orders";
    console.log(this.props);
    this.setState({
      viewMyOrder: true,
    });
    this.props.getMyOrderData(this.props.custId);
    // this.props.getMyOrderData({
    //   api_token: _get(this.props, "apiToken"),
    // });
  }

  myOrderFun = () => {
    this.setState({
      viewMyOrder: true,
      viewInvoice: false,
      viewOpenTerm: false,
    });
    this.props.getMyOrderData({ apiToken: _get(this.props, "apiToken") });
  };
  toggleReviewModalFn = () => {
    console.log("test ee");
    this.setState({
      showReviewModal: !this.state.showReviewModal,
    });
  };
  changeRating = (newRating) => {
    console.log(newRating);
    this.setState({
      rating: newRating,
    });
  };
  handleChange = (event) => {
    console.log(event.target.value);
    const { fields } = this.state;
    fields[event.target.name] = event.target.value;
    this.setState({ fields });
    console.log(this.state.fields);
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
        entity_pk_value: this.state.productDetailsId,
      };
      console.log(reqBody);
      this.setState({
        rating: 0,
        reviewPostLoader: true,
      });
      this.props.submitReviewsData({ review: reqBody }, this.props.apiToken);
    }
  };

  myInvoiceFun = () => {
    this.setState({
      viewInvoice: true,
      viewMyOrder: false,
      viewOpenTerm: false,
    });
    this.props.getMyInvoiceData({ apiToken: _get(this.props, "apiToken") });
  };

  downloadConsolidatedInvoices = () => {
    this.setState({
      downloadPdf: true,
    });
    const reqBody = {
      isConsolidated: true,
      apiToken: _get(this.props, "apiToken"),
      fromDate: this.state.fromDate,
      toDate: this.state.toDate,
    };
    this.props.getPdfData(reqBody);
  };

  openTermFun = () => {
    this.setState({
      viewOpenTerm: true,
      viewInvoice: false,
      viewMyOrder: false,
    });
    this.props.getOpenTermData({ apiToken: _get(this.props, "apiToken") });
    this.props.getFirstDataRedirection({ showFirstDataRedirection: "myOrder" });
    this.props.getAllAddressData({ apiToken: this.props.apiToken });
  };

  handleViewOrder = (orderId) => {
    console.log(orderId);
    this.setState({
      viewOrder: true,
      orderId,
    });
    this.props.setOrderId(orderId);
  };

  handleViewInvoiceOrder = (orderId) => {
    this.setState({
      viewOrder: true,
      // orderId,
    });
    this.props.setOrderId(orderId);
  };

  handleDownload = (orderId, incrementId) => {
    this.setState({
      downloadPdf: true,
    });
    const reqBody = {
      apiToken: this.props.apiToken,
      isConsolidated: false,
      invoiceNumber: incrementId,
      incrementId: orderId,
    };
    this.props.getPdfData(reqBody);
  };

  handleBackClick = () => {
    this.setState({ back: true });
  };
  handleDateChange = (e, dateKey) => {
    const tempDt = moment(e).format("YYYY-MM-DD");
    const typeToset = dateKey.type;
    this.setState({
      [typeToset]: tempDt,
    });
  };

  handleFilterOrders = () => {
    const myOrderRes = this.state.myOrderResData.filter(
      (each) =>
        moment(each.created_at).format("YYYY-MM-DD") >=
          this.state.filtDateFrom &&
        moment(each.created_at).format("YYYY-MM-DD") <= this.state.filtDateTo
    );
    this.setState({ myOrderRes });
  };

  onRowSelect = (row, isSelected, e) => {
    let Total = Number(this.state.selectedTotal);
    if (`${isSelected}` === "false") {
      Total -= Number(`${row.price}`);
      _pull(selected, row.invoice_increment_id);
      this.setState({
        selectedTotal: Total.toFixed(2),
        selected,
      });
    } else {
      Total += Number(`${row.price}`);
      selected.push(row.invoice_increment_id);
      this.setState({
        selectedTotal: Total.toFixed(2),
      });
    }
  };

  onSelectAll = (isSelected, rows) => {
    let Total = Number(this.state.selectedTotal);
    if (isSelected) {
      rows.map((thisData) => {
        Total += Number(thisData.price);
        selected.push(thisData.invoice_increment_id);
      });
      this.setState({
        selectedTotal: Total.toFixed(2),
      });
    } else {
      rows.map((thisData) => {
        Total -= Number(thisData.price);
        _pull(selected, thisData.invoice_increment_id);
      });
      this.setState({
        selectedTotal: Total.toFixed(2),
        selected,
      });
    }
  };

  getCheckedInvoice = () => {
    this.setState({
      getHashValue: this.getHash(),
    });
  };

  processDownLoadPdf = (req) => {
    // this.setState({
    //     pdfData: req,
    // });
    // if (this.state.downloadPdf && _get(req, ['result', 'table_data'])) {
    //     const invoiceNo = _get(req, ['result, inv_number']);
    //     const input = document.getElementById('pdfPage');
    //     input.setAttribute('style', 'display: block;');
    //     html2canvas(input)
    //         .then((canvas) => {
    //             const imgData = canvas.toDataURL('image/png');
    //             const pdf = new JsPDF(); // 'p', 'px', 'a4');
    //             const width = pdf.internal.pageSize.getWidth();
    //             const height = pdf.internal.pageSize.getHeight();
    //             pdf.addImage(imgData, 'PNG', 5, 10, width, (100));
    //             if (this.state.showPdf) {
    //                 pdf.save('Consolidated_Statement.pdf');
    //             } else {
    //                 pdf.save(`${_get(req, 'result.inv_number')}.pdf`);
    //             }
    //             input.setAttribute('style', 'display: none;');
    //         });
    // }
  };

  handleCancelSubscriptionOrder = (boxCount, entityId) => {
    const confirmation = window.confirm(
      `$${
        boxCount * 10
      } will be charged against ${boxCount} boxes for canceling this order. Are you sure you want to cancel?`
    );
    if (confirmation) {
      this.props.cancelSubscriptionOrder({
        apiToken: this.props.apiToken,
        entityId,
      });
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    let selectedTotal = 0;
    if (!_isEmpty(_get(nextProps, "myOrderData"))) {
      console.log(nextProps.myOrderData);
      const myOrderRes = _get(nextProps, "myOrderData.items");
      this.setState({
        myOrderRes: _get(nextProps, "myOrderData.items"),
        //myOrderResData: _get(nextProps, 'myOrderData[0].result'),
        //filtDateFrom: moment(_get(_minBy(myOrderRes, 'created_at'), 'created_at')).format('YYYY-MM-DD'),
        //filtDateTo: moment(_get(_maxBy(myOrderRes, 'created_at'), 'created_at')).format('YYYY-MM-DD'),
      });
    }
    if (!_isEmpty(_get(nextProps, "myInvoiceData"))) {
      this.setState({ myInvoiceRes: _get(nextProps, "myInvoiceData.data") });
    }
    if (!_isEmpty(_get(nextProps, "openTermData"))) {
      Object.entries(_get(nextProps, "openTermData.data")).map(([key, val]) => {
        if (val.status === "outstanding") {
          selected.push(val.invoice_increment_id);
          selectedTotal += Number(val.price);
        } else {
          unselected.push(val.invoice_increment_id);
        }
      });
      this.setState({
        openTermRes: _get(nextProps, "openTermData.data"),
        selected,
        unselected,
        selectedTotal: selectedTotal.toFixed(2),
      });
    }
    if (!_isEmpty(_get(nextProps, "viewOrderData"))) {
      if (_get(nextProps, ["viewOrderData", 0, "code"]) === 1) {
        this.setState({
          tableResult: _get(nextProps, ["viewOrderData", 0]),
          showOurTable: _get(nextProps.viewOrderData, [0, "has_map"]),
        });
      }
      if (_get(nextProps.viewOrderData, [0, "has_map"]) === "yes") {
        this.setState({
          showMap: true,
          showTable: true,
        });
      } else {
        this.setState({
          showMap: false,
          showTable: false,
        });
      }
    }
    if (!_isEmpty(_get(nextProps, "invoicePdfData"))) {
      if (_get(nextProps, ["invoicePdfData", 0, "code"]) === 1) {
        const result = _get(nextProps, ["invoicePdfData", 0, "result"]);
        if (result.hasOwnProperty("shipping_address")) {
          this.setState({ showPdf: false });
          this.processDownLoadPdf(_get(nextProps, ["invoicePdfData", 0]));
        } else if (
          !_isEmpty(
            _get(nextProps, ["invoicePdfData", 0, "result", "table_data"])
          )
        ) {
          // && this.state.downloadPdf) {
          this.setState({ showPdf: true });
          this.processDownLoadPdf(_get(nextProps, ["invoicePdfData", 0]));
        }
      }
      // if (_get(nextProps, ['invoicePdfData', 0, 'code']) === 1 && !_isEmpty(_get(nextProps, ['invoicePdfData', 0, 'result', 'table_data']))) { // && this.state.downloadPdf) {
      //     this.processDownLoadPdf(_get(nextProps, ['invoicePdfData', 0]));
      // }
    }
    if (!_isEmpty(_get(nextProps, "multipleOrderPaymentData"))) {
      // console.log('multipleorderPyamnetOpentermsData', _get(nextProps, 'multipleOrderPaymentData'));
    }

    if (!_isEmpty(_get(nextProps, "allAddressData"))) {
      const defaultBillInfo = _find(
        _get(nextProps, ["allAddressData", "result", 0], []),
        { entity_id: _get(nextProps, "allAddressData.billingAddressId") }
      );
      this.setState({ defaultBillInfo });
    }
    if (!_isEmpty(_get(nextProps, "cancelSubscriptionData"))) {
      alert("Canceled Successfully.");
      this.props.getMyOrderData({ apiToken: _get(this.props, "apiToken") });
    }
    if (!_isEmpty(nextProps.postPRSuccess) && this.state.reviewPostLoader) {
      //console.log(nextProps.postPRSuccess);

      toast.success("Your review has been accepted for moderation.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.setState({
        reviewPostLoader: false,
        showReviewModal: false,
        // listReviewLoader: true,
      });
    }
    // if (!_isEmpty(nextProps.userFirstName)) {
    //   this.setState({userFirstName:nextProps.userFirstName});
    // }
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    // if (_get(this, 'props.isLoading')) {
    //     return (
    //         <div id="cover-spin">

    //         <center>
    //             <img
    //             src={lazyLoader}
    //             style={{ height: "126px", marginTop: "300px" }}
    //             alt="lazy-loader"
    //             />
    //         </center>
    //         </div>
    //     );
    // }
    if (this.state.viewOrder) {
      return (
        <Redirect
          push
          to={{
            pathname: "/data-account/view-order",
            state: { orderId: this.state.orderId },
          }}
        />
      );
    }
    if (this.state.back) {
      return <Redirect push to="/customer/account" />;
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
    console.log(this.state.productDetailsId);
    return (
      <div>
        <div class="u-s-p-b-60" style={{ marginTop: "100px" }}>
          <div class="section__content">
            <div class="dash">
              <div class="container">
                <div class="row">
                  <div class="col-lg-3 col-md-12">
                    <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                      <div class="dash__pad-1">
                        <span class="dash__text u-s-m-b-16">
                          Hello, {this.props.userFirstName}
                        </span>
                        <ul class="dash__f-list">
                          <li>
                            <a href="/customer/account">My Profile</a>
                          </li>
                          <li>
                            <a href="/customer/account/address">Address Book</a>
                          </li>

                          <li>
                            <a
                              class="dash-active"
                              href="/customer/account/orders"
                            >
                              My Orders
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-9 col-md-12">
                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                      <div className="dash__pad-2">
                        <h1 className="dash__h1 u-s-m-b-14">My Orders</h1>

                        {this.state.myOrderRes !== undefined ? (
                          <div className="m-order__list">
                            {this.state.myOrderRes !== undefined &&
                              this.state.myOrderRes.map((key) => (
                                <div className="m-order__get">
                                  <div className="manage-o__header u-s-m-b-30">
                                    <div className="dash-l-r">
                                      <div>
                                        <div className="manage-o__text-2 u-c-secondary">
                                          Order #{key.increment_id}
                                        </div>
                                        <div className="manage-o__text u-c-silver">
                                          Placed on {key.created_at}
                                        </div>
                                        <div className="manage-o__text u-c-silver">
                                          Grand Total : &#8377;
                                          {key.base_grand_total}
                                        </div>
                                      </div>
                                      <div>
                                        <div className="dash__link dash__link--brand">
                                          <a
                                            onClick={() =>
                                              this.handleViewOrder(
                                                key.increment_id
                                              )
                                            }
                                          >
                                            VIEW
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {key.items.map((key1) => (
                                    <div
                                      className="manage-o__description"
                                      style={{ paddingTop: "5px" }}
                                    >
                                      <div className="description__container">
                                        <div className="description__img-wrap">
                                          <img
                                            className=""
                                            style={{
                                              width: "90px",
                                              height: "90px",
                                            }}
                                            src={
                                              key1.extension_attributes
                                                .image_url
                                            }
                                            alt={key1.name}
                                          />
                                        </div>
                                        <div className="description-title">
                                          {key1.name}
                                        </div>
                                      </div>
                                      <div className="description__info-wrap">
                                        <div>
                                          <span className="manage-o__badge badge--processing">
                                            {
                                              key1.extension_attributes
                                                .custom_item_attributes
                                                .order_item_status
                                            }
                                          </span>
                                        </div>
                                        <div>
                                          <span className="manage-o__text-2 u-c-silver">
                                            Quantity:
                                            <span className="manage-o__text-2 u-c-secondary">
                                              {key1.qty_ordered}
                                            </span>
                                          </span>
                                        </div>
                                        <div>
                                          <span className="manage-o__text-2 u-c-silver">
                                            Total:
                                            <span className="manage-o__text-2 u-c-secondary">
                                              &#8377;{key1.row_total}
                                            </span>
                                          </span>
                                          <button
                                            onClick={() => {
                                              this.setState({
                                                productDetailsId:
                                                  key1.product_id,
                                              }),
                                                this.toggleReviewModalFn();
                                            }}
                                            className="writet-ratings"
                                          >
                                            Write A Review
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div class="empty" style={{ paddingTop: "100px" }}>
                            <div class="empty__wrap">
                              <span class="empty__big-text">EMPTY</span>

                              <span class="empty__text-1">No Order found.</span>

                              <a
                                class="empty__redirect-link btn--e-brand"
                                href="/"
                              >
                                <i class="fas fa-plus u-s-m-r-8"></i>

                                <span>Add Product</span>
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.showReviewModal && (
          <MaModal
            open={this.state.showReviewModal}
            handleCloseModal={() => this.toggleReviewModalFn()}
          >
            <div className="mkSty-pr2" id="mk-styl">
              <div id="mkstyle45">
                <div
                  className="row rate-roow2"
                  id="rate_row3"
                  style={{
                    backgroundColor: "#633974",
                    marginTop: "-20px",
                    height: "64px",
                    marginRight: "0px",
                  }}
                >
                  <div className="col-md-3"></div>
                  <div className="col-md-6">
                    {" "}
                    <center>
                      <h3
                        id="rate5"
                        style={{ color: "white", paddingTop: "16px" }}
                      >
                        Rate and Review
                      </h3>
                    </center>
                  </div>
                  <div className="col-md-3" id="cross-md">
                    <a
                      style={{
                        padding: "20px",
                        cursor: "pointer",
                        float: "right",
                        color: "white",
                      }}
                      onClick={() => this.toggleReviewModalFn()}
                    >
                      X
                    </a>
                  </div>
                </div>
                <br />

                <div>
                  <center>
                    {" "}
                    <p
                      style={{
                        color: "black",
                        fontSize: "18px",
                        fontWeight: "400",
                      }}
                    >
                      Your Review Will Be Publically Posted On Walsoul Gourmet
                    </p>
                    <br />
                    <StarRatings
                      rating={this.state.rating}
                      starRatedColor="#633974"
                      starDimension="25px"
                      starSpacing="1px"
                      changeRating={(e) => {
                        this.changeRating(e);
                      }}
                      numberOfStars={5}
                      name="rating"
                      className="field-input"
                    />
                    <br />
                    <span style={{ color: "red" }}>
                      {this.state.errors.rating}
                    </span>
                    <br />
                    {this.props.userFirstName ? (
                      <div></div>
                    ) : (
                      <h3 style={{ textTransform: "none" }}>
                        {this.props.userFirstName}{" "}
                      </h3>
                    )}
                    <div className="cointainer">
                      <center>
                        <div className="row">
                          <div className="col-md-9 col-9">
                            <input
                              style={{
                                borderTopStyle: "hidden",
                                borderRightStyle: "hidden",
                                borderLeftStyle: "hidden",
                                borderBottomStyle: "groove",
                                marginTop: "20px",
                                marginRight: "-135px",
                              }}
                              type="text"
                              maxLength="50"
                              className="no-outline Werty123"
                              placeholder="Enter Title"
                              onChange={(e) => {
                                this.handleChange(e);
                              }}
                              name="review_title"
                              id="ent-tlt"
                            />
                          </div>
                          <div className="col-md-3 col-3">
                            <p className="char_lft" id="inpt_chr_lt">
                              {/* {props.chars_left1} */}
                            </p>
                          </div>
                        </div>
                      </center>
                      <br />
                      <span style={{ color: "red" }}>
                        {this.state.errors.review_title}
                      </span>
                    </div>
                    <br />
                    <br />
                    <div className="container">
                      <div className="row">
                        <div className="col-md-9 col-9">
                          <textarea
                            rows={4}
                            style={{
                              borderTopStyle: "hidden",
                              borderRightStyle: "hidden",
                              borderLeftStyle: "hidden",
                              borderBottomStyle: "groove",
                              marginRight: "-135px",
                            }}
                            type="text"
                            maxLength="120"
                            // onChange={this.handleWordCount}
                            className="no-outline Werty123"
                            placeholder="Tell us about your experience!"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                            name="review_details"
                            id="exp-area"
                          ></textarea>
                        </div>
                        <div className="col-md-3 col-3">
                          <p className="char_lft2" id="int_chr_lt2">
                            {/* {props.chars_left} */}
                          </p>
                        </div>
                      </div>
                      <br />
                      <span style={{ color: "red" }}>
                        {this.state.errors.review_details}
                      </span>
                    </div>
                    <br />
                    {this.state.reviewPostLoader ? (
                      <img
                        src={lazyLoader}
                        style={{ height: "60px", width: "60px" }}
                        alt="lazy-loader"
                      />
                    ) : (
                      <button
                        type="button"
                        style={{
                          height: "50px",
                          width: "200px",
                          backgroundColor: "#633974",
                          border: "1px solid",
                          borderRadius: "35px",
                          color: "white",
                          fontSize: "20px",
                          marginBottom: "60px",
                        }}
                        className=""
                        onClick={() => this.submitReviews()}
                      >
                        Post
                      </button>
                    )}
                  </center>
                </div>
              </div>
            </div>
          </MaModal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMyOrderData: (data) => dispatch(fetchMyOrderData(data)),
  getMyInvoiceData: (data) => dispatch(fetchMyInvoiceData(data)),
  getOpenTermData: (data) => dispatch(fetchOpenTermData(data)),
  getViewOrderData: (data) => dispatch(fetchViewOrderData(data)),
  getPdfData: (data) => dispatch(fetchDownloadInvoiceData(data)),
  setOrderId: (data) => dispatch(setOrderId(data)),
  submitReviewsData: (data, data1) => dispatch(postReviews(data, data1)),

  getFirstDataRedirection: (data) => dispatch(setFirstDataRedirection(data)),
  getMultipleOrderPaymentFirstData: (data) =>
    dispatch(fetchMultipleOrderPaymentOpenTermsData(data)),
  getAllAddressData: (data) => dispatch(fetchAllAddressData(data)),
  cancelSubscriptionOrder: (data) => dispatch(cancelSubscriptionOrder(data)),
});

const mapStateToProps = (state) => {
  const { loginReducer, myOrderReducer, allAddressReducer } = state;

  const {
    apiToken,
    currencyCode,
    salesRepUser,
    // error: loginError,
    primeUser,
    userProfileData,
    custId,
    custEmail,
    userFirstName,
    userLastName,
  } = loginReducer || [];

  const {
    allAddressData,
    //   error: allAddressError,
  } = allAddressReducer || [];

  const {
    myOrderData,
    myInvoiceData,
    openTermData,
    viewOrderData,
    invoicePdfData,
    orderId,
    multipleOrderPaymentData,
    isFetching: isLoading,
    postPRSuccess,
    //  error: myOrderError,
    cancelSubscriptionData,
  } = myOrderReducer || [];

  //const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(allAddressError) || _isError(allAddressError) || !_isEmpty(myOrderError) || _isError(myOrderError);

  return {
    apiToken,
    myOrderData,
    myInvoiceData,
    openTermData,
    currencyCode,
    viewOrderData,
    isLoading,
    invoicePdfData,
    orderId,
    multipleOrderPaymentData,
    salesRepUser,
    allAddressData,
    // error,
    primeUser,
    cancelSubscriptionData,
    userProfileData,
    custId,
    custEmail,
    userFirstName,
    userLastName,
    postPRSuccess,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(MyOrderContainer));
