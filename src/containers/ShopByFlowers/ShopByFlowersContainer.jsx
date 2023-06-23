import React, { useRef } from "react";
import connect from "react-redux/lib/connect/connect";
import moment from "moment";
// import ReactGA from 'react-ga';
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _isError from "lodash/isError";
import _filter from "lodash/filter";
import _values from "lodash/values";
import _find from "lodash/find";
import _pull from "lodash/pull";
import _minBy from "lodash/minBy";
import _maxBy from "lodash/maxBy";
import each from "lodash/each";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import MetaTags from "react-meta-tags";
import Image from "react-image-resizer";
import ReactToPrint from "react-to-print";
import Redirect from "react-router/Redirect";
import Resizer from "react-image-file-resizer";
import InfiniteScroll from "react-infinite-scroll-component";
import ListingComponent from "../../components/BKMComponent/ListingComponent.jsx";
import FilterComponent from "../../components/BKMComponent/FilterComponent.jsx";
import ChangeStoreModal from "../../components/Common/ChangeStoreModal.jsx";
import MaterialUILeft from "../../components/Common/MaterialUILeft.jsx";
import HrCommon from "../../components/Common/HrCommon.jsx";
import ctaegoryImageDryFruits from "../../assets/images1.0/Pista_dry_Banner.jpg";
//import listingBanner from "../../assets/img/dw.jpg";
// import {
//   ButtonBack,
//   ButtonFirst,
//   ButtonLast,
//   ButtonNext,
//   CarouselProvider,
//   Slide,
//   Slider,
//   ImageWithZoom,
//   Dot,
//   DotGroup,
// } from "pure-react-carousel";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import s from "pure-react-carousel/dist/react-carousel.es.css";
import {
  fetchProductListing,
  fetchBKMListingData,
  fetchFilterCategoryData,
  fetchListingBanner,
} from "../../actions/bkm_listing";
import {
  postAddToCartData,
  setCartTypeData,
  flushCartViewData,
  clearCartData,
  fetchFilterData,
} from "../../actions/cart";
import {
  mapAddToCartApiData,
  mapProductSearchData,
} from "../../utils/commonMapper";
import { fetchAddToFavsData } from "../../actions/myfavourites";
import { fetchAddToWishlistData } from "../../actions/wishList";
import {
  receiveShowLoginModalData,
  updateCartData,
  setStoreId,
  flushCartData,
  setCartId,
} from "../../actions/login";
import BreadCrumbs from "../../components/Common/BreadCrumbs.jsx";
import { compareAndSortDates } from "../../helpers/commonUtil";
import ErrorBoundary from "../ErrorBoundary.jsx";
import ErrorHandler from "../../components/Hoc/ErrorHandler.jsx";
import lazyLoader from "../../assets/images/lazy-loader.gif";
//import profilePic from "../../assets/images/7.png";
//import funkarImage from "../../assets/images/8.png";
import { fetchProductReviews } from "../../actions/products";
import { fetchProductVendorReviews } from "../../actions/vendorReviews";
import { sortDeliveryDates } from "../../utils/dateUtil";
import fullLoader from "../../assets/img/loader.gif";
import { filter } from "compression";

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onClick = function (e) {
  console.log(e);
  if (!e.target.matches(".sort-sortBy")) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

class ShopByFlowersContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      listingBannerImg: [],
      unitQty: {},
      totalAmount: {},
      inputValid: {},
      showMaxQtyAlert: false,
      productId: undefined,
      url: undefined,
      listData: [],
      productDetails: [],
      allProductDetails: [],
      prodTemp: [],
      shippingMethodsArrData: [],
      deliveryDetails: [],
      displayData: [],
      availId: undefined,
      pageNo: 1,
      totalProductCount: undefined,
      showAscendSort: true,
      filtersEnabled: false,
      enableClearAll: false,
      searchStartDate: undefined,
      searchEndDate: undefined,
      showChangeStoreModal: false,
      showMoreDetail: {},
      dateObjectArray: [],
      viewType: "grid",
      filters: {},
      loginFlag: !_isEmpty(this.props.apiToken),
      sortValue: "index",
      selectedStoreId: undefined,
      selectedStoreName: undefined,
      fabricFilterData: [],
      fabricFilterDataTemp: [],
      fashiontypeFilterData: [],
      sizeData: [],

      fashiontypeFilterDataTemp: [],
      sizeDataTemp: [],
      categoryFilterData: [],
      agegroupFilterData: [],
      agegroupFilterDataTemp: [],
      categoryFilterDataTemp: [],
      colorsFilterData: [],
      colorsFilterDataTemp: [],
      farmsFilterData: [],
      farmsFilterDataTemp: [],
      stateCityFilterData: [],
      stateCityFilterDataTemp: [],
      boxTypeFilterData: [],
      boxTypeFilterDataTemp: [],
      varietyFilterData: [],
      varietyFilterDataTemp: [],
      uomFilterData: [],
      uomFilterDataTemp: [],
      lengthFilterData: [],
      lengthFilterDataTemp: [],
      gradeFilterData: [],
      gradeFilterDataTemp: [],
      priceFilterData: [],
      priceFilterDataTemp: [],
      blinkText: {},
      applyFilter: false,
      category: [],
      color: [],
      farm: [],
      location: [],
      boxType: [],
      variety: [],
      uom: [],
      length: [],
      grade: [],
      methodUpdated: false,
      method: "?",
      showMoreAvail: {},
      moreAvail: {},
      tabKey: "info",
      farmInfo: undefined,
      //componentRef : useRef(),
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
      // cartType: _get(this.props, 'cartType.cartType') ? _get(this.props, 'cartType.cartType') : undefined,
      prevBkmData: {},
      categoryId:
        this.props.match.params &&
        this.props.match.params.id &&
        this.props.match.params.id.split("-").pop().split(".").shift(), // this.props.location.hash && this.props.location.hash.substring(1),
      totalFilterValues: undefined,
      occasionFilterDataTemp: [],
      occasionFilterData: [],
      flowerFilterDataTemp: [],
      flowerFilterData: [],
      selectColor: "",
      selectFlower: "",
      selectOccasion: "",
      selectPrice: "",
      pageLoader: true,
      proLink: false,
      proData: undefined,
      cData: true,
      showDiv: true,
      seoDetailData: undefined,
      modalTest: false,
      colourShow: false,
      flowerTypeShow: false,
      occasionShow: false,
      showDetail: false,
      singleProductDetails: undefined,
      horData: undefined,
      recomFilterDataShow: "Recommended",
      showFilterDrop: false,
      filterAllData: {
        price: [],
        colors: [],
        fabric: [],
        size: [],
      },
      // filterAllData:[
      //   {
      //     field: "colors",
      //     value: [],
      //   },
      //   {
      //     field: "price",
      //     value: [],
      //   },
      //   {
      //     field: "fabric",
      //     value: [],
      //   },
      //   {
      //     field: "size",
      //     value: [],
      //   },

      // ],
      allValueId: [],
      resultSet: [
        {
          field: "category_id",
          value: 64,
          conditionType: "eq",
        },
        {
          field: "color",
          value: 64,
          conditionType: "eq",
        },
        {
          field: "flower_type",
          value: 64,
          conditionType: "eq",
        },
        {
          field: "occassion",
          value: 64,
          conditionType: "eq",
        },
      ],
    };
  }

  UNSAFE_componentWillMount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  vendorRatingsHover = (vendorId) => {
    this.setState({ productVendorReviews: [] });
    this.props.getProductReviews({ vendorId });
  };

  componentDidMount() {
    console.log("abcd", this.props);
    this.props.fetchListingBanner(this.state.categoryId);
    document.addEventListener("click", this.handleClickOutside, true);
    //const componentRef = useRef();
    //this.setState({
    //  cData:componentRef
    //});
    // var data={ searchCriteria[pageSize]: 10 }
    var data = [];

    for (var i = 0; i < this.state.resultSet.length; i++) {
      // if()
      var obj = {};

      data.push(obj);
    }
    console.log(data);
    this.props.fetchFilterData(this.state.categoryId);
    this.setState({ pageNo: 1 });
    console.log(this.state.categoryId);

    this.props.getProductListing(this.state.categoryId, undefined);

    const dataFilter = this.formatFilters(this.state.filterAllData);
    console.log(dataFilter);
  }

  componentDidUpdate(prevProps) {}

  UNSAFE_componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    console.log(this.state.productDetails);
    var bannerData = [];
    if (!_isEmpty(nextProps.filterData) && this.state.pageLoader) {
      const fillData = nextProps.filterData[0];

      // alert('test');
      console.log(fillData);
      //const colorsFilterData = _values(_get(nextProps.filtersData, 'Color'))
      console.log(_values(_get(fillData, "Category")));
      const categoryFilterData = _values(_get(fillData, "Category"));
      const priceFilterData = _values(_get(fillData, "Price"));
      const agegroupFilterData = _values(_get(fillData, "AgeGroup"));
      const colorsFilterData = _values(_get(fillData, "Color"));
      const fabricFilterData = _values(_get(fillData, "Fabric"));
      const fashiontypeFilterData = _values(_get(fillData, "FashionType"));
      const sizeData = _values(_get(fillData, "Size"));
      for (var i = 0; i < colorsFilterData.length; i++) {
        colorsFilterData[i].check = false;
        colorsFilterData[i].colorcode = colorsFilterData[i].display
          .split("-")
          .pop();
        colorsFilterData[i].colorname = colorsFilterData[i].display.slice(
          0,
          -8
        );
      }

      console.log(categoryFilterData);
      console.log(priceFilterData);
      console.log(agegroupFilterData);
      console.log(colorsFilterData);
      console.log(fabricFilterData);
      console.log(fashiontypeFilterData);
      console.log(sizeData);
      for (var i = 0; i < sizeData.length; i++) {
        sizeData[i].check = false;
      }
      for (var i = 0; i < fabricFilterData.length; i++) {
        fabricFilterData[i].check = false;
      }
      for (var i = 0; i < priceFilterData.length; i++) {
        priceFilterData[i].check = false;
      }
      for (var i = 0; i < categoryFilterData.length; i++) {
        categoryFilterData[i].check = false;
      }
      this.setState({
        totalFilterValues: nextProps.filterData,
        categoryFilterDataTemp: categoryFilterData,
        agegroupFilterDataTemp: agegroupFilterData,
        colorsFilterDataTemp: colorsFilterData,
        fabricFilterDataTemp: fabricFilterData,
        fashiontypeFilterDataTemp: fashiontypeFilterData,
        sizeDataTemp: sizeData,
        priceFilterDataTemp: priceFilterData,
        seoDetailData: nextProps.filterData[1].seo_detail,
        pageLoader: false,
      });
    }
    if (!_isEmpty(nextProps.productList)) {
      console.log(nextProps.productList);
      this.setState({
        productDetails: [],
      });
      // for (var i = 0; i < nextProps.productList.item.length; i++) {
      //   nextProps.productList.items[i].images = [];
      //   for (var j = 0; j < nextProps.productList.items[i].image.length; j++) {
      //     nextProps.productList.items[i].images.push({
      //       url: nextProps.productList[i].image[j],
      //     });
      //   }
      // }
      const prodTemp = [];
      console.log("nextProps.productList.items", nextProps);
      for (var i = 0; i < nextProps.productList.items.length; i++) {
        if (nextProps.productList.items[i] !== 0) {
          prodTemp.push(nextProps.productList.items[i]);
        }
      }
      console.log(prodTemp);

      /* for (var i = 0; i < prodTemp.length; i++) {
         for (var j = 0; j < prodTemp[i].children_products.length; j++) {
           prodTemp[i].children_products[j].size = prodTemp[i].children_products[
             j
           ].sku
             .split("-")
             .pop();
         }
       }*/

      console.log("prodtemp", prodTemp);

      for (var i = 0; i < nextProps.productList.items.length; i++) {
        nextProps.productList.items[i].images_data = [];
        if (nextProps.productList.items[i].images.length != 0) {
          for (
            var j = 0;
            j < nextProps.productList.items[i].images.length;
            j++
          ) {
            nextProps.productList.items[i].images_data.push({
              url: nextProps.productList.items[i].images[j],
            });
          }
        } else {
          nextProps.productList.items[i].images_data.push({
            url: nextProps.productList.items[i].image,
          });
        }
      }

      for (var i = 0; i < prodTemp.length; i++) {
        prodTemp[i].rating_details[0].avgRating = parseFloat(
          (parseInt(prodTemp[i].rating_details[0].global_percent) * 5) / 100
        );
        prodTemp[i].discount_data = Math.round(
          ((prodTemp[i].price - prodTemp[i].final_price) / prodTemp[i].price) *
            100
        );
      }
      for (var i = 0; i < prodTemp.length; i++) {
        prodTemp[i].position_data = 0;
        for (
          var j = 0;
          j < prodTemp[i].extension_attributes.category_links.length;
          j++
        ) {
          if (
            prodTemp[i].extension_attributes.category_links[j].category_id ===
            this.state.categoryId
          ) {
            prodTemp[i].position_data =
              prodTemp[i].extension_attributes.category_links[j].position;
          }
        }
      }

      prodTemp.sort(function (a, b) {
        return a.position_data - b.position_data;
      });

      //prodTemp.reverse();

      console.log("prodTemp", prodTemp);
      this.setState({
        ...this.state,
        totalProductCount: nextProps.productList.total_count,
        productDetails: prodTemp,
        allProductDetails: prodTemp,
        pageLoader: false,
      });
    }

    console.log("productDetails", this.state.productDetails);
    if (!_isEmpty(nextProps.listingBannerData)) {
      let bannerValue = [];
      bannerData = nextProps.listingBannerData.custom_attributes;
      bannerData.map((bannerImg) => {
        if (
          bannerImg.attribute_code === "gallery_image_1" ||
          bannerImg.attribute_code === "gallery_image_2" ||
          bannerImg.attribute_code === "gallery_image_3" ||
          bannerImg.attribute_code === "gallery_image_4"
        ) {
          bannerValue.push(bannerImg.value);
        }
      });

      this.setState({ listingBannerImg: bannerValue });
    }
  }

  handleScrollInc = () => {
    console.log("Page No" + this.state.pageNo);
    const pNo = this.state.pageNo;
    this.setState(
      {
        pageNo: pNo + 1,
      },
      () => {
        if (this.state.productDetails.length < this.state.totalProductCount) {
          console.log("test3");
          this.props.getProductListing({
            "searchCriteria[pageSize]": 10,
            "searchCriteria[currentPage]": this.state.pageNo,
            "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
            "searchCriteria[filterGroups][0][filters][0][value]": this.state
              .categoryId,
            "searchCriteria[filterGroups][0][filters][0][condition_type]": "in",
          });
        }
      }
    );
  };

  handleClearAllFilter = () => {
    this.setState({
      selectColor: "",
      selectOccasion: "",
      selectFlower: "",
      pageLoader: true,
    });
    this.props.getProductListing({
      "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
      "searchCriteria[filterGroups][0][filters][0][value]": this.state
        .categoryId,
      "searchCriteria[filterGroups][0][filters][0][condition_type]": "eq",
    });
  };

  formatFilters = (filters) => {
    const filterMapping = [];
    let indexData = 1;
    each(filters, (value, key) => {
      switch (key) {
        default:
          value.length !== 0 &&
            value.forEach((subValue, subKey) => {
              filterMapping.push(
                `searchCriteria[filterGroups][${indexData}][filters][${subKey}][field]=${key}`
              );
              filterMapping.push(
                `searchCriteria[filterGroups][${indexData}][filters][${subKey}][value]=${subValue}`
              );
              filterMapping.push(
                `searchCriteria[filterGroups][${indexData}][filters][${subKey}][condition_type]=eq`
              );
            });
          {
            value.length !== 0 && indexData++;
          }
          break;
        case "price":
          value.length !== 0 &&
            value.forEach((subValue, subKey) => {
              const fromTo = subValue.split("-");

              if (fromTo.length === 1) {
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][field]=price`
                );
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][value]=${fromTo[0]}`
                );
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][condition_type]=gteq`
                );
                indexData++;
              } else {
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][field]=price`
                );
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][value]=${fromTo[0]}`
                );
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][condition_type]=from`
                );
                indexData++;
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][field]=price`
                );
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][value]=${fromTo[1]}`
                );
                filterMapping.push(
                  `searchCriteria[filterGroups][${indexData}][filters][0][condition_type]=to`
                );
                indexData++;
              }
            });
          break;
      }
    });
    return filterMapping;
  };

  handleColorChange = (event, value) => {
    console.log(event);
    console.log(value);
    const {
      categoryFilterDataTemp,
      priceFilterDataTemp,
      colorsFilterDataTemp,
      fabricFilterDataTemp,
      sizeDataTemp,
      filterAllData,
    } = this.state;
    var dd = {
      price: [],
      colors: [],
      fabric: [],
      size: [],
    };
    if (event === "category") {
      for (var i = 0; i < categoryFilterDataTemp.length; i++) {
        if (categoryFilterDataTemp[i].value === value) {
          if (categoryFilterDataTemp[i].check === false) {
            categoryFilterDataTemp[i].check = true;
          } else {
            categoryFilterDataTemp[i].check = false;
          }
        }
      }
    }
    if (event === "price") {
      for (var i = 0; i < priceFilterDataTemp.length; i++) {
        if (priceFilterDataTemp[i].value === value) {
          if (priceFilterDataTemp[i].check === false) {
            priceFilterDataTemp[i].check = true;
          } else {
            priceFilterDataTemp[i].check = false;
          }
        }
      }
    }
    if (event === "colors") {
      for (var i = 0; i < colorsFilterDataTemp.length; i++) {
        if (colorsFilterDataTemp[i].value === value) {
          if (colorsFilterDataTemp[i].check === false) {
            colorsFilterDataTemp[i].check = true;
          } else {
            colorsFilterDataTemp[i].check = false;
          }
        }
      }
    }
    if (event === "fabric") {
      for (var i = 0; i < fabricFilterDataTemp.length; i++) {
        if (fabricFilterDataTemp[i].value === value) {
          if (fabricFilterDataTemp[i].check === false) {
            fabricFilterDataTemp[i].check = true;
          } else {
            fabricFilterDataTemp[i].check = false;
          }
        }
      }
    }
    if (event === "size") {
      for (var i = 0; i < sizeDataTemp.length; i++) {
        if (sizeDataTemp[i].value === value) {
          if (sizeDataTemp[i].check === false) {
            sizeDataTemp[i].check = true;
          } else {
            sizeDataTemp[i].check = false;
          }
        }
      }
    }

    for (var i = 0; i < sizeDataTemp.length; i++) {
      if (sizeDataTemp[i].check === true) {
        dd.size.push(sizeDataTemp[i].value);
      }
    }

    for (var i = 0; i < fabricFilterDataTemp.length; i++) {
      if (fabricFilterDataTemp[i].check === true) {
        dd.fabric.push(fabricFilterDataTemp[i].value);
      }
    }

    for (var i = 0; i < priceFilterDataTemp.length; i++) {
      if (priceFilterDataTemp[i].check === true) {
        dd.price.push(priceFilterDataTemp[i].value);
      }
    }

    for (var i = 0; i < categoryFilterDataTemp.length; i++) {
      if (categoryFilterDataTemp[i].check === true) {
        dd.price.push(categoryFilterDataTemp[i].value);
      }
    }

    for (var i = 0; i < colorsFilterDataTemp.length; i++) {
      if (colorsFilterDataTemp[i].check === true) {
        dd.colors.push(colorsFilterDataTemp[i].value);
      }
    }

    const ddFilter = this.formatFilters(dd);

    //ddFilter.push(`searchCriteria[filterGroups][0][filters][0][field]:category_id`);
    //ddFilter.push(`searchCriteria[filterGroups][0][filters][0][value]:${this.state.categoryId}`);
    //ddFilter.push(`searchCriteria[filterGroups][0][filters][0][condition_type]:eq`);

    console.log(ddFilter);
    this.setState({
      productDetails: [],
    });
    this.props.getProductListing(this.state.categoryId, ddFilter);

    this.setState({
      sizeDataTemp,
      priceFilterDataTemp,
      categoryFilterDataTemp,
      colorsFilterDataTemp,
      fabricFilterDataTemp,
      filterAllData: dd,
    });
  };

  // handleColorChange = (event, value) => {
  //   console.log(event);
  //   console.log(value);
  //   if (event === "color") {
  //     this.setState({
  //       selectColor: value,
  //       selectOccasion: "",
  //       selectFlower: "",
  //       pageLoader: true,
  //     });
  //     this.props.getProductListing({
  //       "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
  //       "searchCriteria[filterGroups][0][filters][0][value]":
  //         this.state.categoryId,
  //       "searchCriteria[filterGroups][0][filters][0][condition_type]": "eq",
  //       "searchCriteria[filterGroups][1][filters][0][field]": "color",
  //       "searchCriteria[filterGroups][1][filters][0][value]": value,
  //       "searchCriteria[filterGroups][1][filters][0][condition_type]": "eq",
  //     });
  //   }

  //   if (event === "occassion") {
  //     console.log(event);
  //     this.setState({
  //       selectOccasion: value,
  //       selectFlower: "",
  //       selectColor: "",
  //       pageLoader: true,
  //     });
  //     this.props.getProductListing({
  //       "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
  //       "searchCriteria[filterGroups][0][filters][0][value]":
  //         this.state.categoryId,
  //       "searchCriteria[filterGroups][0][filters][0][condition_type]": "eq",
  //       "searchCriteria[filterGroups][1][filters][0][field]": "occasion",
  //       "searchCriteria[filterGroups][1][filters][0][value]": value,
  //       "searchCriteria[filterGroups][1][filters][0][conditionType]": "eq",
  //     });
  //   }

  //   if (event === "flowerType") {
  //     this.setState({
  //       selectFlower: value,
  //       selectOccasion: "",
  //       selectColor: "",
  //       pageLoader: true,
  //     });
  //     this.props.getProductListing({
  //       "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
  //       "searchCriteria[filterGroups][0][filters][0][value]":
  //         this.state.categoryId,
  //       "searchCriteria[filterGroups][0][filters][0][condition_type]": "eq",
  //       "searchCriteria[filterGroups][1][filters][0][field]": "flower_type",
  //       "searchCriteria[filterGroups][1][filters][0][value]": value,
  //       "searchCriteria[filterGroups][1][filters][0][conditionType]": "eq",
  //     });
  //   }
  // };

  /*

handleColorChange = (event) => {
  console.log(event.target.name);
  if (event.target.name === 'color') {
    this.setState({
      selectColor: event.target.value,
    });
   

    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : 'color',
         'searchCriteria[filterGroups][1][filters][0][value]' : event.target.value,
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : 'eq',
        'searchCriteria[filterGroups][2][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][2][filters][0][value]' : this.state.selectOccasion === '' ? '' : this.state.selectOccasion,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : this.state.selectOccasion === '' ? 'neq' : 'eq',  
        'searchCriteria[filterGroups][3][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][3][filters][0][value]' : this.state.selectFlower === '' ? '' : this.state.selectFlower,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : this.state.selectFlower === '' ? 'neq' : 'eq',
      });
  }
  if (event.target.name === 'occassion') {
    console.log(event.target.value);
    this.setState({
      selectOccasion: event.target.value,
    });
    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : this.state.selectColor === '' ? '' : this.state.selectColor,
         'searchCriteria[filterGroups][1][filters][0][value]' : this.state.selectColor === '' ? 'neq' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : 'eq',
        'searchCriteria[filterGroups][2][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][2][filters][0][value]' : event.target.value,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : 'eq',  
        'searchCriteria[filterGroups][3][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][3][filters][0][value]' : this.state.selectFlower === '' ? '' : this.state.selectFlower,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : this.state.selectFlower === '' ? 'neq' : 'eq',
      });
  }
  if (event.target.name === 'flowerType') {
    this.setState({
      selectFlower: event.target.value,
    });
    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : 'color',
         'searchCriteria[filterGroups][1][filters][0][value]' : this.state.selectColor === '' ? '' : this.state.selectColor,
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : this.state.selectColor === '' ? 'neq' : 'eq',
         'searchCriteria[filterGroups][2][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][2][filters][0][value]' : this.state.selectOccasion === '' ? '' : this.state.selectOccasion,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : this.state.selectOccasion === '' ? 'neq' : 'eq',  
        'searchCriteria[filterGroups][3][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][3][filters][0][value]' : event.target.value,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : 'eq',
      });
  }
  if (event.target.name === 'price') {
    this.setState({
      selectPrice: event.target.value,
    });
    this.props.getProductListing(
      {
         'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
         'searchCriteria[filterGroups][0][filters][0][value]' : this.state.categoryId,
         'searchCriteria[filterGroups][0][filters][0][condition_type]' : 'eq',
         'searchCriteria[filterGroups][1][filters][0][field]' : 'color',
         'searchCriteria[filterGroups][1][filters][0][value]' : this.state.selectColor === '' ? '' : this.state.selectColor,
         'searchCriteria[filterGroups][1][filters][0][condition_type]' : this.state.selectColor === '' ? 'neq' : 'eq', 
        'searchCriteria[filterGroups][2][filters][0][field]' : 'price',
        'searchCriteria[filterGroups][2][filters][0][value]' : event.target.value,
        'searchCriteria[filterGroups][2][filters][0][conditionType]' : 'eq',
        'searchCriteria[filterGroups][3][filters][0][field]' : 'occasion',
        'searchCriteria[filterGroups][3][filters][0][value]' : this.state.selectOccasion === '' ? '' : this.state.selectOccasion,
        'searchCriteria[filterGroups][3][filters][0][conditionType]' : this.state.selectOccasion === '' ? 'neq' : 'eq',  
        'searchCriteria[filterGroups][4][filters][0][field]' : 'flower_type',
        'searchCriteria[filterGroups][4][filters][0][value]' : this.state.selectFlower === '' ? '' : this.state.selectFlower,
        'searchCriteria[filterGroups][4][filters][0][conditionType]' : this.state.selectFlower === '' ? 'neq' : 'eq',
      });
  }

 

  
}

*/

  handleCustomFilter = () => {
    console.log(this.state.selectColor);
    console.log(this.state.selectOccasion);
    console.log(this.state.selectFlower);
    console.log(this.state.selectPrice);
    this.props.getProductListing({
      "searchCriteria[filterGroups][0][filters][0][field]": "category_id",
      "searchCriteria[filterGroups][0][filters][0][value]": this.state
        .categoryId,
      "searchCriteria[filterGroups][0][filters][0][condition_type]": "eq",
      "searchCriteria[filterGroups][1][filters][0][field]": "color",
      "searchCriteria[filterGroups][1][filters][0][value]": this.state
        .selectColor,
      "searchCriteria[filterGroups][1][filters][0][condition_type]": "eq",
      "searchCriteria[filterGroups][2][filters][0][field]": "price",
      "searchCriteria[filterGroups][2][filters][0][value]": this.state
        .selectPrice,
      "searchCriteria[filterGroups][2][filters][0][condition_type]": "eq",
    });
  };

  handleMethodChange = (event) => {
    if (event.target.name === "store") {
      const selectedStoreName = _get(
        _find(_get(this.props.loginData, [0, "result", "store_list"], []), {
          store_id: event.target.value,
        }),
        "store_name"
      );
      this.setState({
        showChangeStoreModal: false,
        selectedStoreId: event.target.value,
        selectedStoreName,
        listData: [],
        totalProductCount: 0,
        productDetails: [],
        deliveryDetails: [],
        displayData: [],
        filtersEnabled: false,
        dateObjectArray: [],
        moreAvail: {},
        showMoreAvail: {},
        farmInfo: undefined,
        pageNo: 1,
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        priceFilterData: [],
        priceFilterDataTemp: [],
        agegroupFilterData: [],
        agegroupFilterDataTemp: [],
        fabricFilterData: [],
        fabricFilterDataTemp: [],
        fashiontypeFilterData: [],
        sizeData: [],
        fashiontypeFilterDataTemp: [],
        sizeDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
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
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: event.target.value,
        sort: this.state.sortValue,
        pageNo: 1,
      });
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: event.target.value,
      });
    } else {
      this.props.getBkmListSearchData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId
          ? this.state.selectedStoreId
          : this.props.storeId,
        sort: this.state.sortValue,
        pageNo: 1,
        method: event.target.value === "?" ? "" : event.target.value,
        category: this.state.category ? this.state.category.join("_") : 0,
        color: this.state.color ? this.state.color.join("_") : 0,
        farm: this.state.farm ? this.state.farm.join("_") : 0,
        location: this.state.location ? this.state.location.join("_") : 0,
        boxType: this.state.boxType ? this.state.boxType.join("_") : 0,
        variety: this.state.variety ? this.state.variety.join("_") : 0,
        uom: this.state.uom ? this.state.uom.join("_") : 0,
        length: this.state.length ? this.state.length.join("_") : 0,
        grade: this.state.grade ? this.state.grade.join("_") : 0,
      });
      // @ todo move to common mapper
      this.props.getFiltersData({
        currencyCode: this.props.currencyCode,
        apiToken: this.props.apiToken,
        storeId: this.state.selectedStoreId
          ? this.state.selectedStoreId
          : this.props.storeId,
        method: event.target.value === "?" ? "" : event.target.value,
        category: this.state.category ? this.state.category.join("_") : 0,
        color: this.state.color ? this.state.color.join("_") : 0,
        farm: this.state.farm ? this.state.farm.join("_") : 0,
        location: this.state.location ? this.state.location.join("_") : 0,
        boxType: this.state.boxType ? this.state.boxType.join("_") : 0,
        variety: this.state.variety ? this.state.variety.join("_") : 0,
        uom: this.state.uom ? this.state.uom.join("_") : 0,
        length: this.state.length ? this.state.length.join("_") : 0,
        grade: this.state.grade ? this.state.grade.join("_") : 0,
      });
      this.setState({
        listData: [],
        totalProductCount: 0,
        productDetails: [],
        deliveryDetails: [],
        displayData: [],
        dateObjectArray: [],
        methodUpdated: true,
        enableClearAll: true,
        pageNo: 1,
        method: event.target.value,
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        priceFilterData: [],
        priceFilterDataTemp: [],
        agegroupFilterData: [],
        agegroupFilterDataTemp: [],
        fabricFilterData: [],
        fabricFilterDataTemp: [],
        fashiontypeFilterData: [],
        sizeData: [],
        fashiontypeFilterDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
      });
    }
  };

  handleInuputChange = (event, prodData, deliData) => {
    let totalTemp = 0;
    let flag = false;
    const { blinkText, totalAmount, inputValid } = this.state;
    inputValid[prodData.pid] = true;
    if (
      !isNaN(event.target.value) &&
      event.target.value >= _get(deliData, "qty_per_box") &&
      event.target.value <= _get(deliData, "floorallowed") &&
      event.target.value % _get(deliData, "qty_per_box") === 0
    ) {
      inputValid[prodData.pid] = false;
    }
    if (event.target.value >= _get(deliData, "qty_per_box")) {
      totalTemp = event.target.value * _get(deliData, "total_price_currency");
    }
    if (event.target.value >= _get(deliData, "floorallowed")) {
      flag = true;
      totalTemp = 0;
    }
    if (event.target.value % _get(deliData, "qty_per_box") !== 0) {
      blinkText[prodData.pid] = "blink";
    } else {
      blinkText[prodData.pid] = "";
    }
    totalAmount[prodData.pid] = totalTemp;
    this.setState({
      unitQty: {
        ...this.state.unitQty,
        [prodData.pid]: Number(event.target.value)
          ? Number(event.target.value)
          : "",
      },
      totalAmount,
      showMaxQtyAlert: flag,
      productId: prodData.pid,
      blinkText,
      inputValid,
    });
  };

  handleAddCartClick = (prodData, deliData) => {
    if (
      this.props.apiToken &&
      (_get(this.props, "cartType") === "normal" ||
        !_get(this.props, "cartType"))
    ) {
      const reqBody = mapAddToCartApiData({
        ...this.state,
        ...prodData,
        ...deliData,
        totalAmount: this.state.totalAmount[prodData.pid],
        unitQty: this.state.unitQty[prodData.pid],
        user: this.props.user,
        apiToken: this.props.apiToken,
        customerStoreId: this.state.selectedStoreId
          ? this.state.selectedStoreId
          : this.props.storeId,
      });
      this.props.addToCart(reqBody);
      this.setState({
        unitQty: { ...this.state.unitQty, [prodData.pid]: 0 },
        totalAmount: { ...this.state.totalAmount, [prodData.pid]: 0 },
      });
    } else if (_get(this.props, "cartType") === "subscription") {
      alert(
        "Subscription orders cannot be purchased in combination with single orders at this time. Please clear your cart before adding this product to your cart"
      );
    } else if (_get(this.props, "cartType") === "pre-book") {
      alert(
        "Hello! Your Mother's Day PreBook products must be purchased separately from everyday product on the marketplace. Please complete your everyday purchases and continue shopping for your other favorite products!"
      );
    } else if (_get(this.props, "cartType") === "prime") {
      alert(
        "Normal orders cannot be purchased in combination with premium orders at this time. Please clear your cart before adding premium to your cart!"
      );
    } else if (_isEmpty(this.props.apiToken)) {
      this.props.showLoginModal({ show: true });
    }
  };

  sortingOrderClick = () => {
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId
        ? this.state.selectedStoreId
        : this.props.storeId,
      sort: this.state.sortValue,
      pageNo: 1,
      sortDirection: this.state.showAscendSort ? "ASC" : "DESC",
    });
    this.setState({
      showAscendSort: !this.state.showAscendSort,
      pageNo: 1,
      totalProductCount: 0,
      productDetails: [],
      prevBkmData: {},
    });
  };

  handleSortChange = (event) => {
    this.setState({
      sortValue: event.target.value,
      totalProductCount: 0,
      productDetails: [],
      pageNo: 1,
      prevBkmData: {},
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId
        ? this.state.selectedStoreId
        : this.props.storeId,
      sort: event.target.value,
      pageNo: 1,
    });
  };

  handleFilterCheckBoxChange = (event) => {
    const arr = _get(this.state, event.target.name, []);
    if (event.target.checked) {
      arr.push(event.target.value);
    } else {
      _pull(arr, event.target.value);
    }
    this.setState({
      applyFilter: true,
      [event.target.name]: [...arr],
    });
  };

  handleCategorySearch = (event) => {
    const searchValue = event.target.value;
    const searchType = event.target.name;
    if (!_isEmpty(event.target.value)) {
      switch (searchType) {
        case "category": {
          const categoryFilterData = this.state.categoryFilterDataTemp.filter(
            (obj) => obj.label.toLowerCase().match(searchValue.toLowerCase())
          );
          this.setState({
            categoryFilterData,
          });
          break;
        }
        case "color": {
          const colorsFilterData = this.state.colorsFilterDataTemp.filter(
            (obj) => obj.label.toLowerCase().match(searchValue.toLowerCase())
          );
          this.setState({
            colorsFilterData,
          });
          break;
        }
        case "price": {
          const priceFilterData = this.state.priceFilterDataTemp.filter((obj) =>
            obj.label.toLowerCase().match(searchValue.toLowerCase())
          );
          this.setState({
            priceFilterData,
          });
          break;
        }
        case "fabric": {
          const fabricFilterData = this.state.fabricFilterDataTemp.filter(
            (obj) => obj.label.toLowerCase().match(searchValue.toLowerCase())
          );
          this.setState({
            fabricFilterData,
          });
          break;
        }
        case "agegroup": {
          const agegroupFilterData = this.state.agegroupFilterDataTemp.filter(
            (obj) => obj.label.toLowerCase().match(searchValue.toLowerCase())
          );
          this.setState({
            agegroupFilterData,
          });
          break;
        }
        case "fashiontype": {
          const fashiontypeFilterData = this.state.fashiontypeFilterDataTemp.filter(
            (obj) => obj.label.toLowerCase().match(searchValue.toLowerCase())
          );
          this.setState({
            fashiontypeFilterData,
          });
          break;
        }
        case "size": {
          const sizeData = this.state.sizeDataTemp.filter((obj) =>
            obj.label.toLowerCase().match(searchValue.toLowerCase())
          );
          this.setState({
            sizeData,
          });
          break;
        }
        default:
      }
    }
  };

  handleClearAll = () => {
    this.setState(
      {
        filtersEnabled: false,
        enableClearAll: false,
        applyFilter: false,
        category: [],
        color: [],
        farm: [],
        location: [],
        boxType: [],
        variety: [],
        uom: [],
        length: [],
        grade: [],
        searchStartDate: undefined,
        searchEndDate: undefined,
        pageNo: 1,
        method: "?",
        methodUpdated: false,
        totalProductCount: 0,
        productDetails: [],
        listData: [],
        deliveryDetails: [],
        displayData: [],
        dateObjectArray: [],
        shippingMethodsArrData: [],
        filters: {},
        categoryFilterData: [],
        categoryFilterDataTemp: [],
        colorsFilterData: [],
        colorsFilterDataTemp: [],
        priceFilterData: [],
        priceFilterDataTemp: [],
        agegroupFilterData: [],
        agegroupFilterDataTemp: [],
        fabricFilterData: [],
        fabricFilterDataTemp: [],
        fashiontypeFilterData: [],
        sizeData: [],
        fashiontypeFilterDataTemp: [],
        farmsFilterData: [],
        farmsFilterDataTemp: [],
        stateCityFilterData: [],
        stateCityFilterDataTemp: [],
        boxTypeFilterData: [],
        boxTypeFilterDataTemp: [],
        varietyFilterData: [],
        varietyFilterDataTemp: [],
        uomFilterData: [],
        uomFilterDataTemp: [],
        lengthFilterData: [],
        lengthFilterDataTemp: [],
        gradeFilterData: [],
        gradeFilterDataTemp: [],
        prevBkmData: {},
      },
      () => {
        this.props.getBkmListSearchData({
          currencyCode: this.props.currencyCode,
          apiToken: this.props.apiToken,
          storeId: this.state.selectedStoreId
            ? this.state.selectedStoreId
            : this.props.storeId,
          sort: this.state.sortValue,
          pageNo: 1,
        });
        this.props.getFiltersData({
          currencyCode: this.props.currencyCode,
          apiToken: this.props.apiToken,
          storeId: this.state.selectedStoreId
            ? this.state.selectedStoreId
            : this.props.storeId,
        });
      }
    );
  };

  handleDateChange = (date, name) => {
    this.setState({
      [name]: moment(date).format("MM/DD/YYYY"),
    });
  };

  handleSearchClick = () => {
    this.setState({
      enableClearAll: true,
      listData: [],
      totalProductCount: 0,
      productDetails: [],
      deliveryDetails: [],
      displayData: [],
      dateObjectArray: [],
      pageNo: 1,
      prevBkmData: {},
    });
    this.props.getBkmListSearchData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId
        ? this.state.selectedStoreId
        : this.props.storeId,
      sort: this.state.sortValue,
      pageNo: 1,
      searchStartDate: this.state.searchStartDate,
      searchEndDate: this.state.searchEndDate,
      method: this.state.method === "?" ? "" : this.state.method,
      category: this.state.category ? this.state.category.join("_") : 0,
      color: this.state.color ? this.state.color.join("_") : 0,
      farm: this.state.farm ? this.state.farm.join("_") : 0,
      location: this.state.location ? this.state.location.join("_") : 0,
      boxType: this.state.boxType ? this.state.boxType.join("_") : 0,
      variety: this.state.variety ? this.state.variety.join("_") : 0,
      uom: this.state.uom ? this.state.uom.join("_") : 0,
      length: this.state.length ? this.state.length.join("_") : 0,
      grade: this.state.grade ? this.state.grade.join("_") : 0,
    });
    this.props.getFiltersData({
      currencyCode: this.props.currencyCode,
      apiToken: this.props.apiToken,
      storeId: this.state.selectedStoreId
        ? this.state.selectedStoreId
        : this.props.storeId,
      method: this.state.method === "?" ? "" : this.state.method,
      category: this.state.category ? this.state.category.join("_") : 0,
      color: this.state.color ? this.state.color.join("_") : 0,
      farm: this.state.farm ? this.state.farm.join("_") : 0,
      location: this.state.location ? this.state.location.join("_") : 0,
      boxType: this.state.boxType ? this.state.boxType.join("_") : 0,
      variety: this.state.variety ? this.state.variety.join("_") : 0,
      uom: this.state.uom ? this.state.uom.join("_") : 0,
      length: this.state.length ? this.state.length.join("_") : 0,
      grade: this.state.grade ? this.state.grade.join("_") : 0,
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

  handleMoreDetailClick = (productId) => {
    this.setState({
      showMoreDetail: {
        ...this.state.showMoreDetail,
        [productId]: !_get(this.state.showMoreDetail, productId, false),
      },
    });
  };

  handleMoreAvailClick = (productId) => {
    this.setState({
      showMoreAvail: {
        ...this.state.showMoreAvail,
        [productId]: !_get(this.state.showMoreAvail, productId, false),
      },
    });
  };

  ProductSwitch = (event, index, pId) => {
    const datesArr = {};
    const dataTempAvail = _get(this.state.moreAvail, [pId, event]);
    dataTempAvail.forEach((o) => {
      datesArr[_get(o, "delivery_date")] = _get(o, "total_price_format");
    });
    const dateObjectArray = [...this.state.dateObjectArray];
    const displayData = [...this.state.displayData];
    dateObjectArray[index] = datesArr;
    // eslint-disable-next-line prefer-destructuring
    displayData[index] = dataTempAvail[0];
    this.setState({
      //   dataToShow: { ...this.state.productDetails.info[event], ...dataTempAvail[0], newKey: event },
      //   datesArr,
      displayData,
      dateObjectArray,
    });
  };

  resetMoreDetails = (date, index, pid) => {
    const dataTempAvail = _filter(this.state.deliveryDetails[index], [
      "delivery_date",
      date,
    ])[0];
    this.setState({
      displayData: { ...this.state.displayData, [index]: dataTempAvail },
      unitQty: { ...this.state.unitQty, [pid]: "" },
      totalAmount: { ...this.state.totalAmount, [pid]: 0 },
    });
  };

  handleViewClick = (viewType) => {
    this.setState({
      viewType,
    });
  };

  handleAddToWishlist = (productId) => {
    this.props.addToWhishlist({
      apiToken: this.props.apiToken,
      productId,
    });
  };

  handleAddToFavorites = (productId) => {
    this.props.addToFavorites({
      apiToken: this.props.apiToken,
      productId,
      storeId: this.state.selectedStoreId
        ? this.state.selectedStoreId
        : this.props.storeId,
    });
  };

  setTabKey = (key) => this.setState({ tabKey: key });

  getStoreData = (data) => {
    console.log(data.sku.split("-")[0]);
    this.setState({
      proData: data,
      proLink: true,
    });
  };

  showModalData = () =>
    this.setState((prevState) => ({
      modalTest: !prevState.modalTest,
    }));

  showColourData = () => {
    this.setState({
      colourShow: true,
    });
  };

  dontShowColourData = () => {
    this.setState({
      colourShow: false,
    });
  };

  showOccassionData = () => {
    this.setState({
      occasionShow: true,
    });
  };

  dontShowOccassionData = () => {
    this.setState({
      occasionShow: false,
    });
  };

  showFlowerTypeData = () => {
    this.setState({
      flowerTypeShow: true,
    });
  };

  dontShowflowerTypeData = () => {
    this.setState({
      flowerTypeShow: false,
    });
  };

  setShowProduct = (data) => {
    if (data === "grid") {
      this.setState({
        viewType: "grid",
      });
    } else {
      this.setState({
        viewType: "list",
      });
    }
  };

  showProdDetail = (prod) => {
    console.log(prod);
    this.setState({
      singleProductDetails: prod,
      showDetail: true,
    });
    //  setTimeout(() => {
    // this.setState({
    // showDetail: true,
    //})
    //}, 1000);
  };

  showProdDetailClose = () => {
    this.setState({
      showDetail: false,
    });
  };

  horrizontalFilter = (data) => {
    this.setState({
      horData: data,
    });
  };

  recom = (e, data, data1) => {
    this.setState({
      recomFilterDataShow: data1,
      productDetails: [],
    });
    const { allProductDetails } = this.state;
    if (data === "rec") {
      console.log(data);
      allProductDetails.sort(function (a, b) {
        return a.position_data - b.position_data;
      });
    }
    if (data === "new") {
      console.log(data);
      allProductDetails.sort(function (a, b) {
        return a.id - b.id;
      });
      allProductDetails.reverse();
    }
    if (data === "pop") {
      console.log(data);
      allProductDetails.sort(function (a, b) {
        return (
          a.rating_details[0].global_review - b.rating_details[0].global_review
        );
      });
      allProductDetails.reverse();
    }
    if (data === "phtl") {
      console.log(data);
      allProductDetails.sort(function (a, b) {
        return a.final_price - b.final_price;
      });
      allProductDetails.reverse();
    }
    if (data === "plth") {
      console.log(data);
      allProductDetails.sort(function (a, b) {
        return a.final_price - b.final_price;
      });
    }
    if (data === "bd") {
      console.log(data);
      allProductDetails.sort(function (a, b) {
        return a.discount_data - b.discount_data;
      });
    }
    setTimeout(() => {
      this.setState({
        productDetails: allProductDetails,
      });

      var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }, 1000);
  };

  handleClickOutside = (event) => {
    console.log(event);
    this.setState(() => ({ mouseEvent: false, searchText: "" }));
    // var myDropdown = document.getElementById("myDropdown");
    // if (myDropdown.classList.contains("show")) {
    //   myDropdown.classList.remove("show");
    // }
    if (!event.target.matches(".sort-sortBy")) {
      var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains("show")) {
        myDropdown.classList.remove("show");
      }
    }
  };

  render() {
    // console.log(this.state.occasionFilterDataTemp);
    //console.log(this.state.colorsFilterDataTemp);
    //const componentRef = useRef();
    const properties = {
      duration: 2000,
      transitionDuration: 500,
      infinite: true,
      indicators: false,
      arrows: false,
    };

    console.log(this.state);
    const ref = React.createRef();
    if (this.state.proLink) {
      this.setState({
        proLink: false,
      });

      return (
        <Redirect
          push
          to={{
            pathname: "/product/" + this.state.proData.sku.split("-")[0],
          }}
        />
      );
    }

    if (this.state.pageLoader) {
      return (
        <div id="cover-spin">
          <center>
            <img
              src={fullLoader}
              style={{ height: "126px", marginTop: "300px" }}
              alt="lazy-loader"
            />
          </center>
        </div>
      );
    }
    console.log(this.state.proData);
    return (
      <div className="product-main" style={{ paddingBottom: "130px" }}>
        <div className="banner-container">
          {this.state.listingBannerImg !== undefined && (
            <Slide {...properties}>
              {this.state.listingBannerImg.map((bannerImgs, id) => {
                return (
                  <div id="hero-slider1" key={id}>
                    <div id="s-h">
                      <div className="skelet" id="bottom-img"></div>
                      <div>
                        <img
                          className="img-fluid"
                          src={`https://m2.walsoulconsulting.com/media/catalog/category/${bannerImgs}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slide>
          )}
        </div>

        <ErrorBoundary>
          <ListingComponent
            {...this.state}
            getStoreData={this.getStoreData}
            metaDesc={_get(
              this.props.bkmSearchData,
              "products.meta_description"
            )}
            isLoading={this.props.isLoading}
            showProdDetail={this.showProdDetail}
          />
        </ErrorBoundary>
        {/* <div className="col-lg-3 col-md-12">
                <div className="shop-w-master">
                  <h1 className="shop-w-master__heading u-s-m-b-30">
                    <i className="fas fa-filter u-s-m-r-8"></i>

                    <span>FILTERS</span>
                  </h1>
                  <div className="shop-w-master__sidebar sidebar--bg-snow">
                   {this.state.categoryFilterDataTemp.length !== 0 && (
                      <div className="u-s-m-b-30">
                        <div className="shop-w">
                          <div className="vertical-filters-filters brand-container">
                            <span className="vertical-filters-header">
                              Category
                            </span>
                          </div>

                          <ul className="shop-w__list-2">
                            {this.state.categoryFilterDataTemp.length !== 0 &&
                              this.state.categoryFilterDataTemp.map(
                                (contact) => (
                                  <li>
                                    <label className="vertical-filters-label">
                                      <a>
                                        <input type="checkbox" />

                                        <span className="brand_padding">
                                          {contact.display}
                                        </span>

                                        <span className="shop-w__total-text">
                                          ({contact.count})
                                        </span>
                                        <div className="common-checkboxIndicator"></div>
                                      </a>
                                    </label>
                                  </li>
                                )
                              )}
                          </ul>
                        </div>
                      </div>
                    )} 
                    {this.state.priceFilterDataTemp.length !== 0 && (
                      <div className="u-s-m-b-30">
                        <div className="shop-w">
                          <div className="vertical-filters-filters brand-container">
                            <span className="vertical-filters-header">
                              Price
                            </span>
                          </div>

                          <ul className="shop-w__list-2">
                            {this.state.priceFilterDataTemp.length !== 0 &&
                              this.state.priceFilterDataTemp.map((contact) => (
                                <li>
                                  <label className="vertical-filters-label">
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        this.handleColorChange(
                                          "price",
                                          contact.value
                                        )
                                      }
                                      checked={contact.check}
                                    />

                                    <span className="brand_padding">
                                      {contact.display}
                                    </span>

                                    <span className="shop-w__total-text">
                                      ({contact.count})
                                    </span>
                                    <div className="common-checkboxIndicator"></div>
                                  </label>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {this.state.colorsFilterDataTemp.length !== 0 && (
                      <div className="u-s-m-b-30">
                        <div className="shop-w">
                          <div className="vertical-filters-filters brand-container">
                            <span className="vertical-filters-header">
                              Color
                            </span>
                          </div>

                          <ul className="shop-w__list-2">
                            {this.state.colorsFilterDataTemp.length !== 0 &&
                              this.state.colorsFilterDataTemp.map((contact) => (
                                <li>
                                  <label className="vertical-filters-label">
                                    <a>
                                      <div
                                        className={
                                          this.state.selectColor ===
                                          contact.value
                                            ? "list__content bg-colo-grey"
                                            : "list__content"
                                        }
                                      >
                                      <input
                                        type="checkbox"
                                        onChange={() =>
                                          this.handleColorChange(
                                            "colors",
                                            contact.value
                                          )
                                        }
                                        checked={contact.check}
                                      />
                                      <span
                                        className={
                                          contact.colorname === "Multi"
                                            ? "colour-label colour-colorDisplay rainbow-box"
                                            : "colour-label colour-colorDisplay"
                                        }
                                        style={{
                                          backgroundColor: `${contact.colorcode}`,
                                        }}
                                      ></span>

                                      <span className="brand_padding">
                                        {contact.colorname}
                                      </span>
                                      </div>

                                      <span className="shop-w__total-text">
                                        ({contact.count})
                                      </span>
                                      <div className="common-checkboxIndicator"></div>
                                    </a>
                                  </label>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {this.state.fabricFilterDataTemp.length !== 0 && (
                      <div className="u-s-m-b-30">
                        <div className="shop-w">
                          <div className="vertical-filters-filters brand-container">
                            <span className="vertical-filters-header">
                              Fabric
                            </span>
                          </div>

                          <ul className="shop-w__list-2">
                            {this.state.fabricFilterDataTemp.length !== 0 &&
                              this.state.fabricFilterDataTemp.map((contact) => (
                                <li>
                                  <label className="vertical-filters-label">
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        this.handleColorChange(
                                          "fabric",
                                          contact.value
                                        )
                                      }
                                      checked={contact.check}
                                    />

                                    <span className="brand_padding">
                                      {contact.display}
                                    </span>

                                    <span className="shop-w__total-text">
                                      ({contact.count})
                                    </span>
                                    <div className="common-checkboxIndicator"></div>
                                  </label>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    {this.state.sizeDataTemp.length !== 0 && (
                      <div className="u-s-m-b-30">
                        <div className="shop-w">
                          <div className="vertical-filters-filters brand-container">
                            <span className="vertical-filters-header">
                              Sizes
                            </span>
                          </div>

                          <ul className="shop-w__list-2">
                            {this.state.sizeDataTemp.length !== 0 &&
                              this.state.sizeDataTemp.map((contact) => (
                                <li>
                                  <label className="vertical-filters-label">
                                    <input
                                      type="checkbox"
                                      onChange={() =>
                                        this.handleColorChange(
                                          "size",
                                          contact.value
                                        )
                                      }
                                      checked={contact.check}
                                    />

                                    <span className="brand_padding">
                                      {contact.display}
                                    </span>

                                    <span className="shop-w__total-text">
                                      ({contact.count})
                                    </span>
                                    <div className="common-checkboxIndicator"></div>
                                  </label>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div> */}

        {/* <div className="row">
                  <div className="col-md-12" id="horizt">
                    <section className="horizontal-filters-base">
                      <div className="horizontal-filters-sortContainer" id="horiz_cont">
                        <div
                          className="sort-sortBy"
                          onClick={() => myFunction()}
                        >
                          Sort by:
                          <span>{this.state.recomFilterDataShow}</span>
                          <span className=" sort-downArrow sprites-downArrow">
                            <i className="fas fa-angle-down u-s-m-l-6"> </i>
                          </span>
                          <div class="dropdown-content" id="myDropdown">
                            <a className={this.state.recomFilterDataShow === "Recommended" ? 'recom_css' : ''} onClick={(e) => this.recom(e, 'rec', "Recommended")}>Recommended</a>
                            <a className={this.state.recomFilterDataShow === "What's New" ? 'recom_css' : ''} onClick={(e) => this.recom(e, 'new', "What's New")}>What's New</a>
                            <a className={this.state.recomFilterDataShow === "Popularity" ? 'recom_css' : ''} onClick={(e) => this.recom(e, 'pop', "Popularity")}>Popularity</a>
                            <a className={this.state.recomFilterDataShow === "Price: High to Low" ? 'recom_css' : ''} onClick={(e) => this.recom(e, 'phtl', "Price: High to Low")}>Price: High to Low</a>
                            <a className={this.state.recomFilterDataShow === "Price: Low to High" ? 'recom_css' : ''} onClick={(e) => this.recom(e, 'plth', "Price: Low to High")}>Price: Low to High</a>
                            <a className={this.state.recomFilterDataShow === "Better Discount" ? 'recom_css' : ''} onClick={(e) => this.recom(e, 'bd', "Better Discount")}>Better Discount</a>
                          </div>

                        </div>
                      </div>
                    </section>
                  </div>
                </div> */}

        {/* <Modal open={this.state.showDetail} onClose={this.showProdDetailClose}>
          <div className="">
            <div className="">
              <div className="">
                {this.state.singleProductDetails !== undefined && (
                  <div className="modal-body">
                    <div className="row">
                      <div className="col-lg-5">
                        <div className="pd-breadcrumb u-s-m-b-30"></div>

                        <div className="pd u-s-m-b-30">
                          <CarouselProvider
                            visibleSlides={1}
                            totalSlides={
                              this.state.singleProductDetails.images.length
                            }
                            step={1}
                            naturalSlideWidth={200}
                            naturalSlideHeight={220}
                            hasMasterSpinner={true}
                          >
                            <div dir="ltr">
                              <Slider className={s.slider}>
                                <Slide index={0}>
                                  <ImageWithZoom
                                    src={
                                      this.state.singleProductDetails.images[0]
                                    }
                                  />
                                </Slide>
                                <Slide index={1}>
                                  <ImageWithZoom
                                    src={
                                      this.state.singleProductDetails.images[1]
                                    }
                                  />
                                </Slide>
                                <Slide index={2}>
                                  <ImageWithZoom
                                    src={
                                      this.state.singleProductDetails.images[2]
                                    }
                                  />
                                </Slide>
                                <Slide index={3}>
                                  <ImageWithZoom
                                    src={
                                      this.state.singleProductDetails.images[3]
                                    }
                                  />
                                </Slide>
                                <Slide index={4}>
                                  <ImageWithZoom
                                    src={
                                      this.state.singleProductDetails.images[4]
                                    }
                                  />
                                </Slide>
                              </Slider>
                              <br />
                              <Dot slide={0}>
                                <Image
                                  width={40}
                                  height={40}
                                  alt={
                                    this.state.singleProductDetails.images[0]
                                  }
                                  src={
                                    this.state.singleProductDetails.images[0]
                                  }
                                  resizeMode="contain"
                                />
                              </Dot>
                              <Dot slide={1}>
                                <Image
                                  width={40}
                                  height={40}
                                  alt={
                                    this.state.singleProductDetails.images[1]
                                  }
                                  src={
                                    this.state.singleProductDetails.images[1]
                                  }
                                  resizeMode="contain"
                                />
                              </Dot>
                              <Dot slide={2}>
                                <Image
                                  width={40}
                                  height={40}
                                  alt={
                                    this.state.singleProductDetails.images[2]
                                  }
                                  src={
                                    this.state.singleProductDetails.images[2]
                                  }
                                  resizeMode="contain"
                                />
                              </Dot>
                              <Dot slide={3}>
                                <Image
                                  width={40}
                                  height={40}
                                  alt={
                                    this.state.singleProductDetails.images[3]
                                  }
                                  src={
                                    this.state.singleProductDetails.images[3]
                                  }
                                  resizeMode="contain"
                                />
                              </Dot>
                              <Dot slide={4}>
                                <Image
                                  width={40}
                                  height={40}
                                  alt={
                                    this.state.singleProductDetails.images[4]
                                  }
                                  src={
                                    this.state.singleProductDetails.images[4]
                                  }
                                  resizeMode="contain"
                                />
                              </Dot>
                            </div>
                          </CarouselProvider>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="pd-detail">
                          <div>
                            <span className="pd-detail__name">
                              {this.state.singleProductDetails.name}
                            </span>
                          </div>
                          <div>
                            <div className="pd-detail__inline">
                              <span className="pd-detail__price">
                                &#8377;{this.state.singleProductDetails.price}
                              </span>

                              <span className="pd-detail__discount">
                                (76% OFF)
                              </span>
                              <del class="pd-detail__del">$28.97</del>
                            </div>
                          </div>
                          <div className="u-s-m-b-15">
                            <div className="pd-detail__rating gl-rating-style">
                              <i className="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star"></i>
                              <i class="fas fa-star-half-alt"></i>

                              <span className="pd-detail__review u-s-m-l-4">
                                <a href="product-detail.html">23 Reviews</a>
                              </span>
                            </div>
                          </div>
                          <div className="u-s-m-b-15">
                            <div className="pd-detail__inline">
                              <span className="pd-detail__stock">
                                200 in stock
                              </span>

                              <span className="pd-detail__left">
                                Only 2 left
                              </span>
                            </div>
                          </div>
                          <div className="u-s-m-b-15">
                            <span className="pd-detail__preview-desc">
                              {this.state.singleProductDetails.description}
                            </span>
                          </div>
                          <div className="u-s-m-b-15">
                            <div className="pd-detail__inline">
                              <span className="pd-detail__click-wrap">
                                <i className="far fa-heart u-s-m-r-6"></i>

                                <a href="signin.html">Add to Wishlist</a>

                                <span className="pd-detail__click-count">
                                  (222)
                                </span>
                              </span>
                            </div>
                          </div>
                          <div className="u-s-m-b-15">
                            <div className="pd-detail__inline">
                              <span className="pd-detail__click-wrap">
                                <i className="far fa-envelope u-s-m-r-6"></i>

                                <a href="signin.html">
                                  Email me When the price drops
                                </a>

                                <span className="pd-detail__click-count">
                                  (20)
                                </span>
                              </span>
                            </div>
                          </div>
                          <div class="u-s-m-b-15">
                            <ul class="pd-social-list">
                              <li>
                                <a className="s-fb--color-hover" href="#">
                                  <i className="fab fa-facebook-f"></i>
                                </a>
                              </li>
                              <li>
                                <a className="s-tw--color-hover" href="#">
                                  <i className="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a className="s-insta--color-hover" href="#">
                                  <i className="fab fa-instagram"></i>
                                </a>
                              </li>
                              <li>
                                <a className="s-wa--color-hover" href="#">
                                  <i className="fab fa-whatsapp"></i>
                                </a>
                              </li>
                              <li>
                                <a className="s-gplus--color-hover" href="#">
                                  <i className="fab fa-google-plus-g"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="u-s-m-b-15">
                            <form className="pd-detail__form">
                              <div className="pd-detail-inline-2">
                                <div className="u-s-m-b-15">
                                  <div className="input-counter">
                                    <span className="input-counter__minus fas fa-minus"></span>

                                    <input
                                      className="input-counter__text input-counter--text-primary-style"
                                      type="text"
                                      value="1"
                                      data-min="1"
                                      data-max="1000"
                                    />

                                    <span className="input-counter__plus fas fa-plus"></span>
                                  </div>
                                </div>
                                <div className="u-s-m-b-15">
                                  <button
                                    className="btn btn--e-brand-b-2"
                                    type="submit"
                                  >
                                    Add to Cart
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="u-s-m-b-15">
                            <span className="pd-detail__label u-s-m-b-8">
                              Product Policy:
                            </span>
                            <ul className="pd-detail__policy-list">
                              <li>
                                <i className="fas fa-check-circle u-s-m-r-8"></i>

                                <span>Buyer Protection.</span>
                              </li>
                              <li>
                                <i className="fas fa-check-circle u-s-m-r-8"></i>

                                <span>
                                  Full Refund if you don't receive your order.
                                </span>
                              </li>
                              <li>
                                <i className="fas fa-check-circle u-s-m-r-8"></i>

                                <span>
                                  Returns accepted if product not as described.
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal> */}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getProductListing: (data, data1) =>
    dispatch(fetchProductListing(data, data1)),
  fetchFilterData: (data) => dispatch(fetchFilterData(data)),
  fetchListingBanner: (data) => dispatch(fetchListingBanner(data)),
});

const mapStateToProps = (state) => {
  const { bkmReducer, cartReducer, loginReducer } = state;

  const {
    showLoginModal,
    hideLoginModal,
    homePageData,
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

  const { filterData, error: cartError } = cartReducer || [];

  const {
    productList,
    isFetching: isLoading,
    error: bkmError,
    listingBannerData,
  } = bkmReducer || [];

  const error = !_isEmpty(bkmError) || !_isEmpty(cartError);

  return {
    isLoading,
    productList,
    listingBannerData,
    filterData,
    catNameData,
    catDescData,
    error,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(ShopByFlowersContainer));
