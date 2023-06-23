import React from "react";
import connect from "react-redux/lib/connect/connect";
import _isEmpty from "lodash/isEmpty";
import _get from "lodash/get";
import _isError from "lodash/isError";
//import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Redirect from "react-router/Redirect";
//import MediaQuery from "react-responsive";
import { useMediaQuery } from "react-responsive";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SimpleImageSlider from "react-simple-image-slider";
//import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
//import MetaTags from "react-meta-tags";
import Image from "react-image-resizer";
import "../../assets/stylesheets/style.css";
import "react-responsive-modal/styles.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import {
  fetchHomePage,
  fetchNewHomePage,
  setZipcodeData,
} from "../../actions/login";

import ErrorHandler from "../../components/Hoc/ErrorHandler.jsx";

import lazyLoader from "../../assets/img/loader.gif";
import { lastIndexOf } from "lodash";

const style = {
  image: {
    border: "1px solid #ccc",
    background: "#fefefe",
  },
};

class HomeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortValue: "index",
      childrenNA: [],
      childrenBS: [],
      childrenFD: [],
      newHomePageData: [],
      activeItemIndexNA: 0,
      activeItemIndexBS: 0,
      activeItemIndexFD: 0,
      responsive: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 3 } },
      responsive1: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 2 } },
      responsive2: { 480: { items: 1 }, 760: { items: 1 }, 900: { items: 1 } },
      responsive4: { 480: { items: 1 }, 760: { items: 1 }, 900: { items: 2 } },
      redirectToRegistration: false,
      redirectToListing: false,
      categoryData: [],
      homePageData: [],
      header: [],
      banner: {},
      infographics: [],
      testimonials: {},
      categoryBlocks: [],
      featuredProducts: undefined,
      featProd: undefined,
      testMonial: undefined,
      bannerDetails: undefined,
      mobileBanner1: undefined,
      mobileBanner2: undefined,
      mobileBanner3: undefined,
      mobileInfoShow: undefined,
      infoCatName: undefined,
      popCatName: undefined,
      clientCatName: undefined,
      shopCatName: undefined,
      summerFlowersCatName: undefined,
      summerFlowersCatData: undefined,
      showChangeAddress: false,
      showAddress: false,
      allAddresses: undefined,
      billingAddressId: undefined,
      shippingAddressId: undefined,
      billingAddress: undefined,
      shippingAddress: undefined,
      otherAddress: [],
      responsive3: { 480: { items: 1 }, 760: { items: 2 }, 900: { items: 2 } },
      createChildrenData: [],
      addressData: [],
      postalCode: "",
      shipAddressPopupData: undefined,
      link: false,
      viewAll: undefined,
      pageLoader: true,
      proData: undefined,
      proLink: false,
      seoData: undefined,
      deliveryDate: undefined,
      open: false,
      section1: undefined,
      section2: undefined,
      section3: undefined,
      section4: undefined,
      imgSrc: "http://demo.sodhanalibrary.com/images/twitter_blue.png",
      // popoverOpen:false,

      carouselBanner: undefined,
      qualityBanner: undefined,
      coconutOil: undefined,
      labels: undefined,
      giftBasket: undefined,
      modernStory: undefined,
      betelNut: undefined,
      naturallyGrown: undefined,
      botanicals: undefined,
      desiGhee: undefined,
      rating: undefined,
      top_picks: undefined,
      carouselData: undefined,
      ratings: undefined,
      ratingsline: undefined,
    };
  }

  componentDidMount() {
    //document.title = 'Arabella Bouquets';
    var d = new Date();
    var yesterday = new Date();
    yesterday.setDate(d.getDate() + 1);
    const NewDate = moment(yesterday).format("YYYY-MM-DD");
    console.log(NewDate);

    this.setState({
      deliveryDate: moment(NewDate),
    });
    // console.log(this.state.isDesktopOrLaptop)

    window.addEventListener("resize", this.handleWindowSizeChange);
    // this.props.getHomePage();
    this.props.getNewHomePage();
    const lessThanOneDayAgo = (date) => {
      const DAY = 1000 * 60 * 60 * 24; // 24 hours login time
      const oneDayBefore = Date.now() - DAY;
      return date < oneDayBefore;
    };
    if (
      this.props.apiToken &&
      this.props.lastUpdatedToken &&
      lessThanOneDayAgo(this.props.lastUpdatedToken)
    ) {
      this.props.getLogoutData();
    }
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

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

  populateArray = (nextProps, type, childrenProducts) => {
    const products = [...childrenProducts];

    if (!_isEmpty(_get(nextProps, type))) {
      const bkmSearchData = _get(nextProps, type);

      if (_get(bkmSearchData, "products.status")) {
        const bkmSearchResult = _get(bkmSearchData, "products.result");

        // eslint-disable-next-line no-restricted-syntax
        for (let productKey in bkmSearchResult) {
          if (bkmSearchResult.hasOwnProperty(productKey)) {
            products.push({
              name: bkmSearchResult[productKey]["info"]["name"],
              image: bkmSearchResult[productKey]["info"]["image"],
              url_key: bkmSearchResult[productKey]["info"]["url_key"],
              productId: bkmSearchResult[productKey]["info"]["pid"],
            });
          }
        }
      }
    }

    return products;
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);

    let data = [];
    let monials = [];
    let featData = [];
    let bannerData = [];
    let mobileData = [];
    let mobileInfo = [];
    let a2 = [];
    let a2New = [];
    let a3 = [];
    let a4 = [];
    let a5 = [];
    let a6 = [];
    let a7 = [];
    let a8 = [];
    let a9 = [];
    let a10 = [];
    let a11 = [];
    let qualityBanner = [];
    let carouselData = [];
    let topPicks = [];
    let ratings = [];

    if (!_isEmpty(_get(nextProps, "newHomePageData"))) {
      console.log(nextProps.newHomePageData);

      if (_get(nextProps, "newHomePageData[0].status") === 200) {
        a2 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[0].home_slider_block.gallery_images"
        );
        for (var i = 0; i < a2.length; i++) {
          if (a2[i] !== false) {
            a2New.push(a2[i]);
          }
        }
        a3 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[1].home_category_block.438"
        );
        qualityBanner = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[2].home_category_block.473"
        );
        a5 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[3].home_category_block.441"
        );

        a6 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[4].home_product_block.440"
        );
        a7 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[5].home_product_block.442"
        );
        a8 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[6].home_slider_block.image_url"
        );
        a9 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[7].home_product_block.443"
        );
        a10 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[8].home_product_block.444"
        );
        a11 = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[9].home_category_block.227"
        );
        topPicks = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[5].home_product_block.590"
        );
        carouselData = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[1].home_category_block.589"
        );
        ratings = _get(
          nextProps,
          "newHomePageData[0].response.categoryList.home_page_block[7].home_category_block.592"
        );
        console.log();
        this.setState({
          carouselBanner: a2New,
          qualityBanner: qualityBanner.sub_category,
          carouselData: carouselData.sub_category,
          coconutOil: a3,
          labels: a4,
          giftBasket: a5,
          modernStory: a6,
          betelNut: a7,
          naturallyGrown: a8,
          botanicals: a9,
          desiGhee: a10,
          rating: a11,
          pageLoader: false,
          //seoData: nextProps.homePageData[0].response.seo_details,
          seoData: nextProps.newHomePageData[0].response.seo_details,
          top_picks: topPicks.products,
          ratings: ratings.sub_category,
          ratingsline: Object.keys(ratings.sub_category).length - 1,
        });
      }
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
        addressData: this.createChildrenData({ data }),
      });
    }
  }

  handleAddAddress = () => {
    this.setState({
      showChangeAddress: false,
    });
    // setTimeout(() => {
    this.props.history.push("/customer/account/address/new");
    // }, 2000);
  };

  handleMoveToCategory = () => {
    this.props.history.push("/catalog/category/view/s/Roses/id/68");
  };

  createChildrenData = ({ data }) =>
    Object.keys(data).map((i) => (
      <div onClick={() => this.addShow(data[i])}>
        <center>
          <div
            style={{
              border: "1px solid #8AB77D",
              height: "165",
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
              Address
            </div>
            <address>
              <br />
              {_get(data[i], "firstname")}&nbsp;{_get(data[i], "lastname")}
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

  createChildren = ({ bannerData }) =>
    Object.keys(bannerData).map((i) => (
      <div>
        <img
          src={bannerData[i]}
          alt="#"
          style={{ width: "100%", height: "500px" }}
        />
      </div>
    ));

  createChildren3 = ({ mobileData }) =>
    Object.keys(mobileData).map((i) => (
      <div>
        <img
          src={mobileData[i]}
          alt="#"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    ));

  createChildren4 = ({ mobileInfo }) =>
    Object.keys(mobileInfo).map((i) => (
      <div className="pad">
        <div className="information_blogs flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <div className="imf_icon">
                <img
                  style={{ height: "125px", width: "125px" }}
                  src={mobileInfo[i].gallery_images[0]}
                  alt="#"
                />
              </div>
              <div className="imf_head">
                <h3>{mobileInfo[i].name}</h3>
              </div>
              <div className="imf_cont">
                <p>{mobileInfo[i].short_description}</p>
              </div>
            </div>
            <div className="flip-card-back">
              <div className="imf_icon">
                <img
                  style={{ height: "125px", width: "125px" }}
                  src={mobileInfo[i].gallery_images[0]}
                  alt="#"
                />
              </div>
              <div className="imf_cont">
                <span style={{ color: "#000000", fontSize: "18px !important" }}>
                  {mobileInfo[i].name}
                </span>
                <p
                  style={{ color: "#000000", fontSize: "14px !important" }}
                ></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));

  createChildren1 = ({ data }) =>
    Object.keys(data).map((i) => (
      <div>
        <div>
          <center>
            <a
              style={{ cursor: "pointer" }}
              href={`/product/${_get(data[i], "sku")}`}
            >
              <Image
                width={300}
                height={300}
                alt={_get(data[i], "name")}
                src={_get(data[i], "image[0]")}
                resizemode="contain"
              />
            </a>
          </center>
          <br />
          <br />
          <div className="row">
            <div className="col-md-12">
              <center>
                <p>
                  <a
                    href={`/product/${_get(data[i], "sku")}`}
                    style={{ color: "black" }}
                  >
                    {_get(data[i], "name")}
                  </a>
                </p>
              </center>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <center>
                <p>
                  <a
                    href={`/product/${_get(data[i], "sku")}`}
                    style={{ marginLeft: "29px", color: "black" }}
                  >
                    {_get(data[i], "price")}
                  </a>
                </p>
              </center>
            </div>
          </div>
        </div>
      </div>
    ));

  createMarkup = (content) => ({ __html: content });

  createChildren2 = ({ monials }) =>
    Object.keys(monials).map((i) => (
      <div className="information_blogs_white_left">
        <div className="imf_icon">
          <img
            src={_get(monials[i], "image_url")}
            style={{ borderRadius: "50%", height: "125px", width: "125px" }}
            alt={_get(monials[i], "name")}
          />
        </div>
        <div className="imf_head">
          <h3
            style={{ fontFamily: "proxima-nova,sans-serif", fontSize: "19px" }}
          >
            {_get(monials[i], "name")}
          </h3>
        </div>
        <div>
          <p
            className="monial_content"
            dangerouslySetInnerHTML={this.createMarkup(monials[i].description)}
          ></p>
        </div>
      </div>
    ));

  createChildren6 = ({ featOriginalData }) =>
    Object.keys(featOriginalData).map((i) => (
      <div>
        <center>
          <div
            style={{
              height: "240px",
              width: "240px",
              border: "1px solid #eaeaea",
            }}
          >
            <a
              style={{ cursor: "pointer" }}
              onClick={() => this.getStoreData(featOriginalData[i])}
            >
              <Image
                width={230}
                height={230}
                alt={featOriginalData[i].name}
                src={featOriginalData[i].image[0]}
                resizemode="contain"
              />
            </a>
          </div>
        </center>

        <div className="row" style={{ width: "255px", marginTop: "5px" }}>
          <div className="col-md-10">
            <p>
              <a
                onClick={() => this.getStoreData(featOriginalData[i])}
                style={{
                  color: "black",
                  fontFamily: "proxima-nova,sans-serif",
                  fontSize: "17px",
                  marginLeft: "-6px",
                  float: "left",
                  cursor: "pointer",
                }}
              >
                {featOriginalData[i].name}
              </a>
            </p>
          </div>
          <div className="col-md-2">
            <p>
              <a
                onClick={() => this.getStoreData(featOriginalData[i])}
                style={{
                  color: "black",
                  fontSize: "14px",
                  marginLeft: "-36px",
                  cursor: "pointer",
                }}
              >
                {featOriginalData[i].price}
              </a>
            </p>
          </div>
        </div>
      </div>
    ));

  createChildren7 = ({ s2 }) =>
    Object.keys(s2).map((i) => (
      <center>
        {" "}
        <a style={{ cursor: "pointer" }} onClick={() => this.getData(s2[i])}>
          <Image
            width={150}
            height={150}
            alt={s2[i].name}
            src={s2[i].image_url}
            resizemode="contain"
          />
        </a>
        <br />
        <h4
          style={{
            fontFamily: "proxima-nova,sans-serif",
            textTransform: "none",
          }}
        >
          <a style={{ cursor: "pointer" }} onClick={() => this.getData(s2[i])}>
            {s2[i].name}
          </a>
        </h4>
      </center>
    ));

  createChildren8 = ({ s3 }) =>
    Object.keys(s3).map((i) => (
      <center>
        <div style={{ height: "240px", width: "240px" }}>
          <a style={{ cursor: "pointer" }} onClick={() => this.getData(s3[i])}>
            <Image
              width={240}
              height={240}
              alt={s3[i].name}
              src={s3[i].image_url}
              resizemode="contain"
            />
          </a>
        </div>

        <div className="row" style={{ width: "240px" }}>
          <div className="col-md-12">
            <h3>
              <a
                onClick={() => this.getData(s3[i])}
                style={{
                  color: "black",
                  cursor: "pointer",
                  fontFamily: "proxima-nova,sans-serif",
                  textTransform: "none",
                }}
              >
                {s3[i].name}
              </a>
            </h3>
          </div>
        </div>
      </center>
    ));

  createChildren9 = ({ s4 }) =>
    Object.keys(s4).map((i) => (
      <center>
        <div
          style={{
            height: "290px",
            width: "200px",
            backgroundColor: "#f3f4ef",
            borderRadius: "25px",
            border: "1px solid #636161",
          }}
        >
          <div className="info_div_top">
            <br />
            <center
              className={s4[i].name === "Quality" ? "image_left_align" : ""}
            >
              <Image
                width={80}
                height={80}
                alt={s4[i].name}
                src={s4[i].thumbnail}
                resizemode="contain"
              />
            </center>
            <br />
            <center>
              <p
                style={{
                  color: "#636161",
                  fontWeight: "bold",
                  fontSize: "18px",
                }}
              >
                {s4[i].name}
              </p>
            </center>
            <br />
          </div>
          <div className="info_div_bottom">
            <br />
            <p className="pl-40" style={{ color: "black" }}>
              {s4[i].short_description}
            </p>
          </div>
        </div>
      </center>
    ));

  onSlideChange(e) {
    console.debug("Item`s position during a change: ", e.item);
    console.debug("Slide`s position during a change: ", e.slide);
  }

  onSlideChanged(e) {
    console.debug("Item`s position after changes: ", e.item);
    console.debug("Slide`s position after changes: ", e.slide);
  }

  handleSignUp = () => this.setState({ redirectToRegistration: true });

  handleListingRedirect = () => this.setState({ redirectToListing: true });

  showAddressModal = () =>
    this.setState((prevState) => ({
      showChangeAddress: !prevState.showChangeAddress,
    }));

  changeZipCodeData = () => {
    console.log(this.state.postalCode);
    this.props.setZipcodeData(this.state.postalCode);
    this.setState({
      showChangeAddress: false,
    });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleInputDateChange = (event) => {
    console.log(event.target.value);
    this.setState({
      deliveryDate: event.target.value,
    });
  };

  handleInputChange1 = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleChange = (event) => {
    this.setState({ zipcode: event.target.value });
  };

  getData = (data) => {
    console.log(data);
    this.setState({
      catData: data,
      link: true,
    });
  };

  getStoreData = (data) => {
    console.log(data);
    this.setState({
      proData: data,
      proLink: true,
    });
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  handleMouseOver = () => {
    this.setState({
      imgSrc: "http://demo.sodhanalibrary.com/images/twitter_brown.png",
    });
  };

  handleMouseOut = () => {
    this.setState({
      imgSrc: "http://demo.sodhanalibrary.com/images/twitter_blue.png",
    });
  };

  dateChanged = (d) => {
    console.log(d);
    //console.log();
    this.setState({
      deliveryDate: d,
    });
  };

  createMarkup = (content) => ({ __html: content });

  render() {
    const Desktop = ({ children }) => {
      const isDesktop = useMediaQuery({ minWidth: 992 });
      return isDesktop ? children : null;
    };
    const Tablet = ({ children }) => {
      const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
      return isTablet ? children : null;
    };
    const Mobile = ({ children }) => {
      const isMobile = useMediaQuery({ maxWidth: 767 });
      return isMobile ? children : null;
    };

    const handleRedirectTopPicks = (skudata) => {
      if (skudata.sku !== "") {
        console.log(skudata);
        return (
          <Redirect
            push
            to={{
              pathname: "/product/" + skudata.sku,
            }}
          />
        );
      }
    };
    const properties = {
      duration: 2000,
      infinite: true,
      indicators: true,
      arrows: false,
    };

    console.log(this.state);
    const { width } = this.state;
    const isMobile = width <= 500;
    console.log(isMobile);

    if (this.state.redirectToRegistration) {
      return <Redirect to="/vendor-registration" />;
    }

    if (this.state.redirectToListing) {
      return <Redirect to="/listing-products" />;
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

    if (this.state.link) {
      this.setState({
        link: false,
      });
      return (
        <Redirect
          push
          to={{
            pathname:
              "/catalog/category/view/s/" +
              this.state.catData.name +
              "/id/" +
              this.state.catData.id,
            state: {
              catName: this.state.catData.name,
              catDesc: this.state.catData.short_description,
              catImage: false,
              seoDetails: this.state.catData.seo_details,
            },
          }}
        />
      );
    }
    console.log(this.state.carouselData);

    return (
      <div style={{ marginTop: "80px" }}>
        <div className="banner-container">
          {this.state.carouselBanner !== undefined && (
            <div>
              {/* <div id="hero-slider1">
              <div id="s-h">
                <div className="skelet" id="bottom-img">
                  <center>
                    <img
                      className="img-fluid"
                      id="crousl_sh2"
                      alt={this.state.carouselBanner}
                      src={this.state.carouselBanner[1]}
                      resizemode="contain"
                    />
                  </center>
                </div>
              </div>
            </div> */}
              <Slide {...properties}>
                {this.state.carouselBanner.map((car, id) => (
                  <div id="hero-slider1" key={id}>
                    <div id="s-h">
                      <div className="skelet" id="bottom-img"></div>
                      <div>
                        <img className="img-fluid" src={car} alt="" />
                      </div>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
          )}
        </div>
        {/* slider-section */}
        <div>
          {this.state.carouselData !== undefined && (
            <div>
              <div className="slider-container">
                <Slide>
                  {this.state.carouselData.map((coarouselInfo, id) => (
                    <div className="each-slide-effect" key={id}>
                      <div className="slider-items">
                        <div>
                          <img
                            className="slide-img"
                            onClick={() => {
                              this.getData(coarouselInfo);
                            }}
                            src={coarouselInfo.image_url}
                            alt=""
                          />
                        </div>

                        <div className="slider-right-items">
                          <p
                            onClick={() => {
                              this.getData(coarouselInfo);
                            }}
                          >
                            {coarouselInfo.name}
                          </p>
                          <span
                            onClick={() => {
                              this.getData(coarouselInfo);
                            }}
                          >
                            &#8377; {coarouselInfo.price}
                          </span>
                          <button className="foorter-info-btn1">
                            KNOW MORE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slide>
              </div>

              <div className="slider-section-desk">
                <div className="slider-data">
                  <div className="category-header">
                    <span className="category-name">Categories</span>
                  </div>

                  <div className="slider-card-container">
                    {this.state.carouselData.map((coarouselInfo, id) => (
                      <div className="slider-card" key={id}>
                        <div className="slider-card-header">
                          <img
                            src={coarouselInfo.image_url}
                            onClick={() => {
                              this.getData(coarouselInfo);
                            }}
                            alt="ballons"
                          />
                        </div>
                        <div className="slider-card-body">
                          <span
                            className="tag tag-purple"
                            onClick={() => {
                              this.getData(coarouselInfo);
                            }}
                          >
                            {coarouselInfo.name}
                          </span>
                          <div className="card-footer"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="know-more">
                  <div>KNOW MORE&#62;&#62;</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* quality trust */}

        <div className="trust-container-main">
          {this.state.qualityBanner !== undefined && (
            // <div className="container" style={{ backgroundColor: "#a87048", height: "200px" }}>
            //   <div className="row">
            //     {this.state.qualityBanner.sub_category.map((contact) => (
            //       <div className="col-md-2" style={{ paddingTop: "35px" }}>
            //         <center>
            //           <img
            //             className="img-fluidNew conut_col12"
            //             id="coco_oil"
            //             alt={contact.image_url}
            //             src={contact.image_url}
            //             resizemode="contain"
            //           />
            //           <p
            //             className="loreum2"
            //             // onClick={() => this.getStoreData(contact)}
            //             style={{ color: "#ffffff" }}
            //           >
            //             {contact.name}
            //           </p>
            //         </center>

            //       </div>
            //     ))}
            //   </div>
            // </div>
            <div className="trust-container">
              <div className="container-trust">
                <div className="trust-img">
                  {this.state.qualityBanner.map((contact, id) => (
                    <div key={id}>
                      <span className="text-data">
                        <img
                          className="trust-img-items"
                          // id="coco_oil"
                          alt={contact.image_url}
                          src={contact.image_url}
                          resizemode="contain"
                        />
                        <p className="trust-text">{contact.name}</p>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="toppicks-main">
          {this.state.top_picks !== undefined && (
            <div className="category-main">
              <div className="category-header">
                <span className="category-name">Best Sellers</span>
              </div>
              <div>
                <div className="product-container">
                  <div
                    className=" is-grid-active product-draw"
                    // style={{
                    //   display: "grid",
                    //   gridTemplateColumns: "25% 25% 25% 25%",
                    // }}
                  >
                    {this.state.top_picks.map((topPicksData, id) => (
                      <div className="col-lg-12 col-md-12">
                        <div className="col-lg-4 col-md-6 col-sm-6" key={id}>
                          <div className="product-m1">
                            <div className="product-m__thumb">
                              <img
                                src={topPicksData.image[0]}
                                alt="ballons"
                                className="aspect u-d-block"
                              />
                            </div>
                            <div className="product-m__content1">
                              <div className="product-m__category">
                                <div
                                  className="listing-card-name"
                                  onClick={() => {
                                    this.getStoreData(topPicksData);
                                  }}
                                >
                                  {" "}
                                  {topPicksData.name}
                                </div>
                              </div>

                              {/* <p className="short_descriprion">
                          {topPicksData.short_description}
                        </p> */}
                              {/* <div className="card-footer1">
                            <div className="footer-info">
                              <button className="addCart-btn2 ">
                                ADD CART
                              </button>
                            </div>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* {this.state.modernStory !== undefined && (
 
           <div className="container">
             <div id="hero-slider2">
               <div id="s-h">
                 <div className="skelet" id="bottom-img">
                   <center className="img-fluidBann">
                     <img
                       // className="img-fluid2"
                       style={{ width: "1251px", height: "514px" }}
                       id="crousl_sh27"
                       alt={this.state.modernStory.image}
                       src={this.state.modernStory.image}
                       resizeMode="contain"
                     />
                   </center>
                 </div>
               </div>
             </div>
           </div>
 
         )} */}
                {/* {this.state.betelNut !== undefined && (
           <div className="container">
             <div className="u-s-p-b-60" style={{ paddingTop: "2.5rem" }}>
               <div className="container">
                 <div className="row sub_content">
                   <div className="col-md-12">
                     <div className="row products">
                       <div
                         className="col-lg-6 col-md-6 col-sm-12 u-s-m-b-30"
                         id="coco_oil56"
                       >
                         <center>
                           <img
                             className="img-fluid2 conut_col12"
                             id="coco_oil"
                             alt={this.state.betelNut.image_url}
                             src={this.state.betelNut.image_url}
                             resizeMode="contain"
                           />
                         </center>
                       </div>
                       {this.state.betelNut.products.map((contact) => (
                         <div
                           className="col-lg-3 col-md-3 col-6 u-s-m-b-30"
                           id="coco_aspt_img"
                         >
                           <div className="product-o u-h-100" id="newari_prd">
 
                             <a
                               className=""
                               id="home_bg_aspt"
                               onClick={() => this.getStoreData(contact)}
                             >
                               <img
                                 className="aspect__img conut_aspt_img"
                                 id="asp-img2"
                                 src={contact.image}
                                 alt=""
                               />
                             </a>
                           </div>
                           <center>
                             <div className="store_para2" id="oil_lit">
                               <div id="oil_store2">
                                 <p
                                   onClick={() => this.getStoreData(contact)}
                                   id="newarrivals_name"
                                   className="arri_name"
                                 >
                                   {contact.name}
                                 </p>
                                 <p
                                   className="loreum2"
                                   onClick={() => this.getStoreData(contact)}
                                   style={{ color: "#48C9B0" }}
                                 >
                                   Loreum ipsum dolor sit amet,consectetuer
                                   adipiscing elit
                                 </p>
                                 <p id="decimal-prc">
                                   &#8377; {contact.decimal_price}
                                 </p>
 
                                 <div>
                                   <center>
                                     <button
                                       className="btn--e-transparent-brand-b-2"
                                       onClick={() => this.getStoreData(contact)}
                                     >
                                       Shop Now
                                     </button>
                                   </center>
                                 </div>
                               </div>
                             </div>
                           </center>
 
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}
         <br /> */}

                {/* {this.state.naturallyGrown !== undefined && (
           <div className="container">
             <div className="natural_grwn" id="hero-slider2">
               <div id="s-h">
                 <div className="skelet1" id="bottom-img">
                   <center>
                     <img
                       className="img-fluid"
                       id="crousl_sh27"
                       alt={this.state.naturallyGrown}
                       src={this.state.naturallyGrown}
                       resizeMode="contain"
                     />
                   </center>
                 </div>
               </div>
             </div>
           </div>
         )}
         <br /> */}
                {/* 
         {this.state.botanicals !== undefined && (
           <div className="container">
             <div className="u-s-p-b-60" style={{ paddingTop: "2rem" }}>
               <div className="container" id="bont_cont">
                 <div className="row sub_content">
                   <div className="col-md-12">
                     <div className="row">
                       {this.state.botanicals.products.map((contact) => (
                         <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
                           <a onClick={() => this.getStoreData(contact)}>
                             <div className="hover001" id="pic5">
                               <center>
                                
                                 <img
                                   className="bonti_img"
                                   id="bonti52"
                                   src={contact.image}
                                   alt=""
                                 />
                               </center>
                             </div>
 
                             <div className="" id="bonti_arriv">
                               <center>
                                 <p
                                   onClick={() => this.getStoreData(contact)}
                                   id="newarrivals_name"
                                   className="arri_name"
                                 >
                                   {contact.name}
                                 </p>
                                 <p
                                   className="loreum21 bonti_loreum"
                                   id="bonti_lorem"
                                   onClick={() => this.getStoreData(contact)}
                                 >
                                   Loreum ipsum dolor sit amet,consectetuer
                                   adipiscing elit
                                 </p>
                                 <p id="decimal-prc">
                                   &#8377; {contact.decimal_price}
                                 </p>
                               </center>
                             </div>
 
                             <div>
                               <center>
                                 <button
                                   className="btn--e-transparent-brand-b-2 btn_shop"
                                   id="btn_brand28"
                                   onClick={() => this.getStoreData(contact)}
                                 >
                                   Shop Now
                                 </button>
                               </center>
                             </div>
                           </a>
                         </div>
                       ))}
                       <br />
                       <br />
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}
         <br /> */}
                {/* 
         {this.state.desiGhee !== undefined && (
           <div className="container">
             <div className="u-s-p-b-60" style={{ marginTop: "1rem" }}>
               <div className="container">
                 <div className="row sub_content">
                   <div className="col-md-12">
                     <div className="row products">
                       <div
                         className="col-lg-6 col-md-6 col-sm-12 u-s-m-b-30"
                         id="coco_oil567"
                       >
                         <center>
                           <img
                             className="img-fluid2 conut_col123"
                             id="coco_oil"
                             alt={this.state.desiGhee.image}
                             src={this.state.desiGhee.image}
                             resizeMode="contain"
                           />
                         </center>
                       </div>
                       {this.state.desiGhee.products.map((contact) => (
                         <div
                           className="col-lg-3 col-md-3 col-6 u-s-m-b-30"
                           id="coco_aspt_img"
                         >
                           <div className="product-o u-h-100" id="newari_prd">
                             
                             <a
                               className=""
                               id="home_bg_aspt"
                               onClick={() => this.getStoreData(contact)}
                             >
                               <img
                                 className="aspect__img conut_aspt_img"
                                 id="asp-img2"
                                 src={contact.image}
                                 alt=""
                               />
                             </a>
                           </div>
                           <center>
                             <div className="store_para2" id="oil_lit">
                               <div id="oil_store2">
                                 <p
                                   onClick={() => this.getStoreData(contact)}
                                   id="newarrivals_name"
                                   className="arri_name"
                                 >
                                   {contact.name}
                                 </p>
                                 <p
                                   className="loreum2"
                                   onClick={() => this.getStoreData(contact)}
                                   style={{ color: "#48C9B0" }}
                                 >
                                   Loreum ipsum dolor sit amet,consectetuer
                                   adipiscing elit
                                 </p>
                                 <p id="decimal-prc">
                                   &#8377; {contact.decimal_price}
                                 </p>
 
                                 <div>
                                   <center>
                                     <button
                                       className="btn--e-transparent-brand-b-2"
                                       onClick={() => this.getStoreData(contact)}
                                     >
                                       Shop Now
                                     </button>
                                   </center>
                                 </div>
                               </div>
                             </div>
                           </center>
                       
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}
         <br /> */}
                {/* 
         {this.state.rating !== undefined && (
           <div className="u-s-p-b-60 rating_soul" id="eleventh-container">
             <div className="container" id="rate_alev">
               <div className="row sub_content">
                 <div className="col-md-12">
                   <div className="row">
                     {this.state.rating.sub_category.map((contact) => (
                       <div className="col-lg-3 col-md-6 col-sm-6 u-s-m-b-30">
                         <div>
                           <div className="hover001 hover_ratting" id="pic_rate">
                             <center>
                               <div>
                                 <StarRatings
                                   starDimension="20px"
                                   starSpacing="1px"
                                   starEmptyColor="#fdb927"
                                   starRatedColor="#fdb927"
                                   starDimension="22px"
                                 />
                                 <h3 className="">{contact.name}</h3>
                                 <h3>10/3/21</h3>
                               </div>
                               <br />
                               <div>
                                 <p className="short_desp" id="short_pgh">
                                   {contact.short_description}
                                 </p>
                               </div>
                               <br />
                               <div style={{ marginTop: "5px" }}>
                                 <img
                                   className="img_soul_rate"
                                   id="soul_rt2"
                                   src={contact.image_url}
                                   alt=""
                                 />
                               </div>
                             </center>
                           </div>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )} */}
              </div>
            </div>
          )}
        </div>

        <div className="toppicks-main1">
          {this.state.ratings !== undefined && (
            <div className="category-main">
              <div className="category-header">
                <span className="rating-name1">Our Happy Customers</span>
              </div>

              <div className="raitng-card-container">
                {this.state.ratings.map((ratings, id) => (
                  <div className="rating-items" key={id}>
                    <div className="rating-card">
                      <div className="rating-header">
                        <img
                          className="rating-img"
                          src={ratings.image_url}
                          alt="ratings.image_url"
                        />
                        <span className="rating-footer-name">
                          -{ratings.name}
                        </span>
                        <div className="header-subsection">
                          <span className="rating-star">
                            {[...Array(5)].map((_, id) => {
                              if (id <= 4) {
                                return (
                                  <span key={id}>
                                    <svg
                                      key={id}
                                      aria-hidden="true"
                                      className="raing-stars"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                  </span>
                                );
                              }
                            })}
                            {/* <span className="vertical-line1"></span>
                            <span>01 January 2023</span> */}
                          </span>
                        </div>
                      </div>
                      <div className="rating-desc">
                        {ratings.short_description}
                      </div>
                    </div>
                    {id < this.state.ratingsline && (
                      <span className="vertical-line-rating"></span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* top picks */}

        {/* {this.state.modernStory !== undefined && (

          <div className="container">
            <div id="hero-slider2">
              <div id="s-h">
                <div className="skelet" id="bottom-img">
                  <center className="img-fluidBann">
                    <img
                      // className="img-fluid2"
                      style={{ width: "1251px", height: "514px" }}
                      id="crousl_sh27"
                      alt={this.state.modernStory.image}
                      src={this.state.modernStory.image}
                      resizeMode="contain"
                    />
                  </center>
                </div>
              </div>
            </div>
          </div>

        )} */}
        {/* {this.state.betelNut !== undefined && (
          <div className="container">
            <div className="u-s-p-b-60" style={{ paddingTop: "2.5rem" }}>
              <div className="container">
                <div className="row sub_content">
                  <div className="col-md-12">
                    <div className="row products">
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 u-s-m-b-30"
                        id="coco_oil56"
                      >
                        <center>
                          <img
                            className="img-fluid2 conut_col12"
                            id="coco_oil"
                            alt={this.state.betelNut.image_url}
                            src={this.state.betelNut.image_url}
                            resizeMode="contain"
                          />
                        </center>
                      </div>
                      {this.state.betelNut.products.map((contact) => (
                        <div
                          className="col-lg-3 col-md-3 col-6 u-s-m-b-30"
                          id="coco_aspt_img"
                        >
                          <div className="product-o u-h-100" id="newari_prd">

                            <a
                              className=""
                              id="home_bg_aspt"
                              onClick={() => this.getStoreData(contact)}
                            >
                              <img
                                className="aspect__img conut_aspt_img"
                                id="asp-img2"
                                src={contact.image}
                                alt=""
                              />
                            </a>
                          </div>
                          <center>
                            <div className="store_para2" id="oil_lit">
                              <div id="oil_store2">
                                <p
                                  onClick={() => this.getStoreData(contact)}
                                  id="newarrivals_name"
                                  className="arri_name"
                                >
                                  {contact.name}
                                </p>
                                <p
                                  className="loreum2"
                                  onClick={() => this.getStoreData(contact)}
                                  style={{ color: "#48C9B0" }}
                                >
                                  Loreum ipsum dolor sit amet,consectetuer
                                  adipiscing elit
                                </p>
                                <p id="decimal-prc">
                                  &#8377; {contact.decimal_price}
                                </p>

                                <div>
                                  <center>
                                    <button
                                      className="btn--e-transparent-brand-b-2"
                                      onClick={() => this.getStoreData(contact)}
                                    >
                                      Shop Now
                                    </button>
                                  </center>
                                </div>
                              </div>
                            </div>
                          </center>

                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <br /> */}

        {/* {this.state.naturallyGrown !== undefined && (
          <div className="container">
            <div className="natural_grwn" id="hero-slider2">
              <div id="s-h">
                <div className="skelet1" id="bottom-img">
                  <center>
                    <img
                      className="img-fluid"
                      id="crousl_sh27"
                      alt={this.state.naturallyGrown}
                      src={this.state.naturallyGrown}
                      resizeMode="contain"
                    />
                  </center>
                </div>
              </div>
            </div>
          </div>
        )}
        <br /> */}
        {/* 
        {this.state.botanicals !== undefined && (
          <div className="container">
            <div className="u-s-p-b-60" style={{ paddingTop: "2rem" }}>
              <div className="container" id="bont_cont">
                <div className="row sub_content">
                  <div className="col-md-12">
                    <div className="row">
                      {this.state.botanicals.products.map((contact) => (
                        <div className="col-lg-4 col-md-4 col-sm-6 u-s-m-b-30">
                          <a onClick={() => this.getStoreData(contact)}>
                            <div className="hover001" id="pic5">
                              <center>
                               
                                <img
                                  className="bonti_img"
                                  id="bonti52"
                                  src={contact.image}
                                  alt=""
                                />
                              </center>
                            </div>

                            <div className="" id="bonti_arriv">
                              <center>
                                <p
                                  onClick={() => this.getStoreData(contact)}
                                  id="newarrivals_name"
                                  className="arri_name"
                                >
                                  {contact.name}
                                </p>
                                <p
                                  className="loreum21 bonti_loreum"
                                  id="bonti_lorem"
                                  onClick={() => this.getStoreData(contact)}
                                >
                                  Loreum ipsum dolor sit amet,consectetuer
                                  adipiscing elit
                                </p>
                                <p id="decimal-prc">
                                  &#8377; {contact.decimal_price}
                                </p>
                              </center>
                            </div>

                            <div>
                              <center>
                                <button
                                  className="btn--e-transparent-brand-b-2 btn_shop"
                                  id="btn_brand28"
                                  onClick={() => this.getStoreData(contact)}
                                >
                                  Shop Now
                                </button>
                              </center>
                            </div>
                          </a>
                        </div>
                      ))}
                      <br />
                      <br />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <br /> */}
        {/* 
        {this.state.desiGhee !== undefined && (
          <div className="container">
            <div className="u-s-p-b-60" style={{ marginTop: "1rem" }}>
              <div className="container">
                <div className="row sub_content">
                  <div className="col-md-12">
                    <div className="row products">
                      <div
                        className="col-lg-6 col-md-6 col-sm-12 u-s-m-b-30"
                        id="coco_oil567"
                      >
                        <center>
                          <img
                            className="img-fluid2 conut_col123"
                            id="coco_oil"
                            alt={this.state.desiGhee.image}
                            src={this.state.desiGhee.image}
                            resizeMode="contain"
                          />
                        </center>
                      </div>
                      {this.state.desiGhee.products.map((contact) => (
                        <div
                          className="col-lg-3 col-md-3 col-6 u-s-m-b-30"
                          id="coco_aspt_img"
                        >
                          <div className="product-o u-h-100" id="newari_prd">
                            
                            <a
                              className=""
                              id="home_bg_aspt"
                              onClick={() => this.getStoreData(contact)}
                            >
                              <img
                                className="aspect__img conut_aspt_img"
                                id="asp-img2"
                                src={contact.image}
                                alt=""
                              />
                            </a>
                          </div>
                          <center>
                            <div className="store_para2" id="oil_lit">
                              <div id="oil_store2">
                                <p
                                  onClick={() => this.getStoreData(contact)}
                                  id="newarrivals_name"
                                  className="arri_name"
                                >
                                  {contact.name}
                                </p>
                                <p
                                  className="loreum2"
                                  onClick={() => this.getStoreData(contact)}
                                  style={{ color: "#48C9B0" }}
                                >
                                  Loreum ipsum dolor sit amet,consectetuer
                                  adipiscing elit
                                </p>
                                <p id="decimal-prc">
                                  &#8377; {contact.decimal_price}
                                </p>

                                <div>
                                  <center>
                                    <button
                                      className="btn--e-transparent-brand-b-2"
                                      onClick={() => this.getStoreData(contact)}
                                    >
                                      Shop Now
                                    </button>
                                  </center>
                                </div>
                              </div>
                            </div>
                          </center>
                      
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <br /> */}
        {/* 
        {this.state.rating !== undefined && (
          <div className="u-s-p-b-60 rating_soul" id="eleventh-container">
            <div className="container" id="rate_alev">
              <div className="row sub_content">
                <div className="col-md-12">
                  <div className="row">
                    {this.state.rating.sub_category.map((contact) => (
                      <div className="col-lg-3 col-md-6 col-sm-6 u-s-m-b-30">
                        <div>
                          <div className="hover001 hover_ratting" id="pic_rate">
                            <center>
                              <div>
                                <StarRatings
                                  starDimension="20px"
                                  starSpacing="1px"
                                  starEmptyColor="#fdb927"
                                  starRatedColor="#fdb927"
                                  starDimension="22px"
                                />
                                <h3 className="">{contact.name}</h3>
                                <h3>10/3/21</h3>
                              </div>
                              <br />
                              <div>
                                <p className="short_desp" id="short_pgh">
                                  {contact.short_description}
                                </p>
                              </div>
                              <br />
                              <div style={{ marginTop: "5px" }}>
                                <img
                                  className="img_soul_rate"
                                  id="soul_rt2"
                                  src={contact.image_url}
                                  alt=""
                                />
                              </div>
                            </center>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // getHomePage: () => dispatch(fetchHomePage()),
  getNewHomePage: () => dispatch(fetchNewHomePage()),
  setZipcodeData: (data) => dispatch(setZipcodeData(data)),
});

const mapStateToProps = (state) => {
  const { loginReducer, allAddressReducer } = state;

  const {
    //homePageData,
    //homePage,
    categoryData,
    banner,
    infographics,
    categoryBlocks,
    testimonials,
    featuredProducts,
    newHomePageData,
    zipcode,
    apiToken,
  } = loginReducer || [];

  const { allAddressData, shippingAddressData, billingAddressData } =
    allAddressReducer || [];

  return {
    //homePageData,
    //homePage,
    categoryData,
    banner,
    infographics,
    categoryBlocks,
    testimonials,
    featuredProducts,
    zipcode,
    apiToken,
    allAddressData,
    shippingAddressData,
    billingAddressData,
    newHomePageData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(HomeContainer));
