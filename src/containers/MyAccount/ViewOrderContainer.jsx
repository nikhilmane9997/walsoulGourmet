import React, { Component } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isError from "lodash/isError";
import Redirect from "react-router/Redirect";
import connect from "react-redux/lib/connect/connect";
import moment from "moment";
// import JsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import MyViewOrderComponent from "../../components/MyAccount/ViewOrderComponent.jsx";
import {
  fetchViewOrderData,
  fetchMyOrderDataById,
  // fetchDownloadInvoiceData
} from "../../actions/myOrder";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorBoundary from "../ErrorBoundary.jsx";
import PDFComponent from "../../components/MyAccount/PDFComponent.jsx";
import ErrorHandler from "../../components/Hoc/ErrorHandler.jsx";

class ViewOrderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewOrder: false,
      showMap: false,
      isMarkerShown: false,
      toShowPop: undefined,
      showTable: false,
      isOpen: false,
      show: false,
      trackDetails: undefined,
      productMoreData: undefined,
      showMoreData: false,
      showProd: false,
      urlKey: undefined,
      showPrintOrder: false,
      orderId: _get(this.props, "location.state.orderId", this.props.orderId),
      showLeftTabAndMoreDetails: false,
      showReorder: false,
      downloadPdf: undefined,
      pdfData: undefined,
      showPdf: false,
      subTotal: undefined,
      grandTotal: undefined,
      orderDetails: undefined,
      orderDate: undefined,
      orderNumber: undefined,
      status: undefined,
      shippingAddress: undefined,
      billingAddress: undefined,
      paymentMethod: undefined,
    };
  }

  handlePrintOrder = () => {
    this.setState({ showPrintOrder: true });
  };

  onToggleOpen = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleMoreProductClose = () => {
    this.setState({ showMoreData: false });
  };

  handleTrackDetails = (trackDetails) => {
    this.setState({
      show: true,
      trackDetails,
    });
  };

  handleMoreProductDetail = (productMoreData) => {
    this.setState({
      productMoreData,
      showMoreData: true,
    });
  };

  handleWriteReview = (pid, urlKey) => {
    this.setState({
      productId: pid,
      showProd: true,
      urlKey,
    });
  };

  handleBack = () => {
    this.props.history.go(-1);
  };

  handleReorder = () => {
    this.setState({ showReorder: true });
  };

  // handleDownload = (orderId, incrementId) => {
  //     this.setState({
  //         downloadPdf: true,
  //     });
  //     const reqBody = {
  //         apiToken: this.props.apiToken,
  //         isConsolidated: false,
  //         invoiceNumber: incrementId,
  //         incrementId: orderId,
  //     };
  //     this.props.getPdfData(reqBody);
  // }

  // processDownLoadPdf = (req) => {
  //     this.setState({
  //         pdfData: req,
  //     });
  //     if (this.state.downloadPdf && _get(req, ['result', 'table_data'])) {
  //         const invoiceNo = _get(req, ['result, inv_number']);
  //         const input = document.getElementById('pdfPage');
  //         input.setAttribute('style', 'display: block;');
  //         html2canvas(input)
  //             .then((canvas) => {
  //                 const imgData = canvas.toDataURL('image/png');
  //                 const pdf = new JsPDF(); // 'p', 'px', 'a4');
  //                 const width = pdf.internal.pageSize.getWidth();
  //                 const height = pdf.internal.pageSize.getHeight();
  //                 pdf.addImage(imgData, 'PNG', 5, 10, width, 200);
  //                 pdf.save(`${_get(req, 'result.inv_number')}.pdf`);
  //                 input.setAttribute('style', 'display: none;');
  //             });
  //     }
  // }

  componentDidMount() {
    document.title = "My ViewOrder";
    this.props.getViewOrderData(this.props.orderId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(">>>>>>>>>>>", nextProps.orderDetails.items);
    if (!_isEmpty(_get(nextProps, "viewOrderData"))) {
      console.log(nextProps.viewOrderData);
    }
    if (!_isEmpty(_get(nextProps, "orderDetails"))) {
      const orderDate = moment(
        _get(nextProps.orderDetails.items[0].created_at)
      ).format("MMMM Do YYYY");
      console.log(nextProps.orderDetails.items[0]);
      this.setState({
        //shippingAndHandling: _get(nextProps.orderDetails, [0, 'shipping_and_handling']),
        grandTotal: nextProps.orderDetails.items[0].grand_total,
        subTotal: nextProps.orderDetails.items[0].subtotal,
        orderDetails: nextProps.orderDetails.items,
        orderDate,
        orderNumber: nextProps.orderDetails.items[0].increment_id,
        //mapDetails: _get(nextProps.viewOrderData, [0, 'map_details']),
        status: nextProps.orderDetails.items[0].status,
        shippingAddress:
          nextProps.orderDetails.items[0].extension_attributes
            .shipping_assignments[0].shipping,
        billingAddress: nextProps.orderDetails.items[0].billing_address,
        paymentMethod:
          nextProps.orderDetails.items[0].extension_attributes.payment_details,
        //soUrl: _get(nextProps.orderDetails, [0, 'so']),
      });

      if (_get(nextProps.viewOrderData, [0, "has_map"]) === "yes") {
        this.setState({
          showMap: true,
          showTable: true,
          showLeftTabAndMoreDetails: true,
        });
      } else {
        this.setState({
          showMap: false,
          showTable: false,
          showLeftTabAndMoreDetails: false,
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
  }

  render() {
    if (this.state.showProd) {
      return (
        <Redirect
          push
          to={{
            pathname: `/${this.state.urlKey}.html`,
            state: { productId: this.state.productId },
          }}
        />
      );
    }

    if (this.state.showReorder) {
      return (
        <Redirect
          push
          to={{
            pathname: "/customer/account/re-order",
            state: { orderNumber: this.state.orderNumber },
          }}
        />
      );
    }

    if (_get(this, "props.isLoading")) {
      return (
        <div className="container" style={{ minHeight: "500px" }}>
          <Loader />
        </div>
      );
    }
    if (this.state.viewOrder) {
      return (
        <Redirect
          push
          to={{
            pathname: "/viewOrder",
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
    console.log(this.state);
    console.log(this.props.history.location.state.orderId, this.props.apiToken);
    return (
      <div>
        {/*<div className="">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div class="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                        <div class="dash__pad-1">
                            <h2>Your Order Confirmed!</h2>
                            <h3>Hii {this.props.userFirstName},</h3>
                            <p>Your Order has been confirmed and will be shipping soon.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
        </div>    */}

        <div className="container" style={{ minHeight: "450px" }}>
          <ErrorBoundary>
            <MyViewOrderComponent
              state={this.state}
              onToggleOpen={this.onToggleOpen}
              handleClose={this.handleClose}
              handleTrackDetails={this.handleTrackDetails}
              handleMoreProductDetail={this.handleMoreProductDetail}
              handleMoreProductClose={this.handleMoreProductClose}
              handleWriteReview={this.handleWriteReview}
              handleBack={this.handleBack}
              handleReorder={this.handleReorder}
              // handleDownload={this.handleDownload}
            />
          </ErrorBoundary>
        </div>
        {/* <PDFComponent
          pdfData={this.state.pdfData}
          showPdf={this.state.showPdf}
        /> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getViewOrderData: (data) => dispatch(fetchMyOrderDataById(data)),
  // getPdfData: data => dispatch(fetchDownloadInvoiceData(data)),
});

const mapStateToProps = (state) => {
  const { loginReducer, myOrderReducer } = state;

  const {
    apiToken,
    currencyCode,
    userFirstName,
    //error: loginError,
  } = loginReducer || [];

  const {
    viewOrderData,
    orderId,
    orderDetails,
    isFetching: isLoading,
    //error: myOrderError,
    // invoicePdfData,
  } = myOrderReducer || [];

  //const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(myOrderError) || _isError(myOrderError);

  return {
    apiToken,
    userFirstName,
    viewOrderData,
    currencyCode,
    orderId,
    isLoading,
    //error,
    orderDetails,
    // invoicePdfData,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(ViewOrderContainer));
