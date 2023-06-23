import React from 'react';
import Redirect from 'react-router/Redirect';
import connect from 'react-redux/lib/connect/connect';
import moment from 'moment';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _isError from 'lodash/isError';
import _filter from 'lodash/filter';
import _values from 'lodash/values';
import _find from 'lodash/find';
import _pull from 'lodash/pull';
// import _minBy from 'lodash/minBy';
// import _maxBy from 'lodash/maxBy';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListingComponent from '../../components/BKMComponent/ListingComponent.jsx';
import FilterComponent from '../../components/BKMComponent/FilterComponent.jsx';
import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
import ChangeStoreModal from '../../components/Common/ChangeStoreModal.jsx';
import {
    fetchBKMListingData,
    fetchFilterCategoryData,
    fetchCategoriesfinalSearchResult,
    fetchCategoriesAutoCompleteResult,
} from '../../actions/bkm_listing';
// import Loader from '../../components/Loader/Loader.jsx';
// import Modal from 'react-bootstrap/lib/Modal';
import { postAddToCartData, flushCartViewData, clearCartData , fetchFilterData} from '../../actions/cart';
import {
    mapAddToCartApiData,
    mapProductSearchData,
} from '../../utils/commonMapper';
import { fetchAddToFavsData } from '../../actions/myfavourites';
import { fetchAddToWishlistData } from '../../actions/wishList';
import { receiveShowLoginModalData, updateCartData, setStoreId, flushCartData, setCartId } from '../../actions/login';
import { compareAndSortDates } from '../../helpers/commonUtil';
import ErrorBoundary from '../ErrorBoundary.jsx';
import ErrorHandler from '../../components/Hoc/ErrorHandler.jsx';
import { fetchProductReviews } from '../../actions/products';
import { fetchProductVendorReviews } from '../../actions/vendorReviews';
import lazyLoader from '../../assets/img/loader.gif';

class BestsellerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handleBkmClick: false,
            unitQty: {},
            totalAmount: {},
            showMaxQtyAlert: false,
            productId: undefined,
            url: undefined,
            listData: {},
            prodOrder: [],
            productDetails: [],
            shippingMethodsArrData: [],
            deliveryDetails: [],
            displayData: [],
            availId: undefined,
            pageNo: 1,
            totalProductCount: undefined,
            showAscendSort: true,
            filtersEnabled: false,
            enableClearAll: false,
            redirectToDetailsPage: false,
            searchStartDate: undefined,
            searchEndDate: undefined,
            showChangeStoreModal: false,
            showMoreDetail: {},
            dateObjectArray: [],
            viewType: 'grid',
            filters: {},
            loginFlag: !_isEmpty(this.props.apiToken),
            sortValue: 'index',
            selectedStoreId: undefined,
            selectedStoreName: undefined,
            categoryFilterData: [],
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
            blinkText: {},
            applyFilter: false,
            catDescription: '',
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
            method: '?',
            passedSearchedData: {},
            proLink: false,
            proData: undefined,
            pageLoader: true,
            breadCrumbsList: [
                {
                    link: '/',
                    name: 'home',
                },
                {
                    link: '/wholesale-flowers.html',
                    name: 'Shop Flowers',
                },
                {
                    link: undefined,
                    name: 'SEARCH RESULT FOR ""',
                },
            ],
        };
    }

    UNSAFE_componentWillMount() {
        if (_get(this.props.location, 'state.searchText')) {
            this.setState({
                passedSearchedData: _get(this.props.location, 'state'),
                breadCrumbsList: [
                    {
                        link: '/',
                        name: 'home',
                    },
                    {
                        link: '/wholesale-flowers.html',
                        name: 'Shop Flowers',
                    },
                    {
                        link: undefined,
                        name: `SEARCH RESULT FOR "${_get(this.props.location, 'state.searchText')}"`,
                    },
                ],
            }, () => {
                this.props.getCategoryAutoCompleteData(this.state.passedSearchedData.searchText);
            });
        }
    }

    ratingsHover = (productId) => {
        this.setState({ productReviewData: [] });
       // this.props.getMyProductReviews({
         //   productId,
        //});
    }

    vendorRatingsHover = (vendorId) => {
        this.setState({ productVendorReviews: [] });
      //  this.props.getProductReviews({ vendorId });
    }

    componentDidMount() {
        const catId = 56;
        //this.props.fetchFilterData(catId);
        if (this.props.searchText || this.state.passedSearchedData.searchText) {
            this.props.getCategoryAutoCompleteData(this.state.passedSearchedData.searchText);
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
     console.log(nextProps);
        // if (!_isEmpty(nextProps.productList))
        // {
        //  console.log(nextProps.productList);
         
        //  const prodTemp = [];
        //  for(var i=0;i<nextProps.productList.items.length;i++)
        //  {
        //    prodTemp.push(nextProps.productList.items[i]);
        //  }
        
   
       
        //  console.log(prodTemp);
        //  this.setState({
        //    ...this.state,
        //    totalProductCount: nextProps.productList.total_count,
        //   // productDetails: prodTemp,
        //    productDetails: this.state.productDetails.concat(prodTemp),
        //  });
        // }


      /*  if (!_isEmpty(_get(nextProps, 'autoCompleteData')) ) {
            console.log(nextProps.autoCompleteData);
            let data=[];
           
            for (var i = 0; i < nextProps.autoCompleteData.items.length; i++) {
                nextProps.autoCompleteData.items[i].images_data = [];
                if (nextProps.autoCompleteData.items[i].images.length != 0) {
                  for (var j = 0;j < nextProps.autoCompleteData.items[i].images.length;j++) {
                    nextProps.autoCompleteData.items[i].images_data.push({
                      url: nextProps.autoCompleteData.items[i].images[j],
                    });
                  }
                } else {
                  nextProps.autoCompleteData.items[i].images_data.push({
                    url: nextProps.autoCompleteData.items[i].image,
                  });
                }
              }
              for(var i = 0;i<nextProps.autoCompleteData.items.length;i++)
              {
                      //  if(nextProps.autoCompleteData.items[i].qty > 0)
                        //{
                          data.push(nextProps.autoCompleteData.items[i]);
                        //}
              }
              console.log(data);
              this.setState({
                productDetails:data,
                totalProductCount: data.length,
              });
            // this.setState({
            //     ...this.state,
            //     totalProductCount: data.length,
            //     pageLoader:false,
            //     productDetails: data,
            //   });
              console.log(this.state.totalProductCount);
        }*/

        if (!_isEmpty(_get(nextProps, 'autoCompleteData')) && this.state.pageLoader) {
            console.log(nextProps.autoCompleteData);
            let data=[];
           
            for (var i = 0; i < nextProps.autoCompleteData.items.length; i++) {
                nextProps.autoCompleteData.items[i].images_data = [];
                if (nextProps.autoCompleteData.items[i].images.length != 0) {
                  for (var j = 0;j < nextProps.autoCompleteData.items[i].images.length;j++) {
                    nextProps.autoCompleteData.items[i].images_data.push({
                      url: nextProps.autoCompleteData.items[i].images[j],
                    });
                  }
                } else {
                  nextProps.autoCompleteData.items[i].images_data.push({
                    url: nextProps.autoCompleteData.items[i].image,
                  });
                }
              }
              for(var i = 0;i<nextProps.autoCompleteData.items.length;i++)
              {
                      //  if(nextProps.autoCompleteData.items[i].qty > 0)
                        //{
                          data.push(nextProps.autoCompleteData.items[i]);
                        //}
              }
              console.log(data);
            this.setState({
                ...this.state,
                totalProductCount: data.length,
                pageLoader:false,
                productDetails: data,
              });
              console.log(this.state.productDetails);
        }



    }

    handleScrollInc = () => {
        const pNo = this.state.pageNo;
        this.setState(
            {
                pageNo: pNo + 1,
            },
            () => {
                /* (this.state.productDetails.length < this.state.totalProductCount) && this.props.getBkmListSearchData({
                    currencyCode: this.props.currencyCode,
                    apiToken: this.props.apiToken,
                    storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                    pageType: 'bseller',
                    sort: this.state.sortValue,
                    pageNo: this.state.pageNo,
                    zipcode: _get(this.props, 'zipcode'),
                }); */
                (this.state.productDetails.length < this.state.totalProductCount) &&
                    this.props.getHeaderSearchResult({
                        q: this.state.passedSearchedData.searchText,
                        currencyCode: this.props.currencyCode,
                        apiToken: this.props.apiToken,
                        storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                        sort: this.state.sortValue,
                        pageNo: this.state.pageNo,
                        zipCode: this.props.zipcode,
                        category: this.state.category ? this.state.category.join('_') : 0,
                        color: this.state.color ? this.state.color.join('_') : 0,
                        farm: this.state.farm ? this.state.farm.join('_') : 0,
                        location: this.state.location ? this.state.location.join('_') : 0,
                        boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
                        variety: this.state.variety ? this.state.variety.join('_') : 0,
                        uom: this.state.uom ? this.state.uom.join('_') : 0,
                        length: this.state.length ? this.state.length.join('_') : 0,
                        grade: this.state.grade ? this.state.grade.join('_') : 0,
                    }, this.state.passedSearchedData.searchText);
            },
        );
    };

    handleRedirectClick = () => {
        this.setState({
            handleBkmClick: true,
        });
    };

    handleMethodChange = (event) => {
        if (event.target.name === 'store') {
            const selectedStoreName = _get(_find(_get(this.props.loginData, [0, 'result', 'store_list'], []), { store_id: event.target.value }), 'store_name');
            this.setState({
                showChangeStoreModal: false,
                selectedStoreId: event.target.value,
                selectedStoreName,
                listData: [],
                prodOrder: [],
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
            });
            this.props.setStoreId({
                storeId: event.target.value,
                storeName: selectedStoreName,
            });
            this.props.flushCartData();
            this.props.flushCartViewData();
            this.props.clearCart({ apiToken: this.props.apiToken, cartId: this.props.cartId });
            /* this.props.getBkmListSearchData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: event.target.value,
                pageType: 'bseller',
                sort: this.state.sortValue,
                pageNo: 1,
            }); */
            this.props.getHeaderSearchResult({
                q: this.state.passedSearchedData.searchText,
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: event.target.value,
                sort: this.state.sortValue,
                pageNo: 1,
                // zipCode: this.props.zipcode,
            }, this.state.passedSearchedData.searchText);
            this.props.getFiltersData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: event.target.value,
                q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            });
        } else {
            /* this.props.getBkmListSearchData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                pageType: 'bseller',
                sort: this.state.sortValue,
                pageNo: 1,
                method: event.target.value,
            }); */
            this.props.getHeaderSearchResult({
                q: this.state.passedSearchedData.searchText,
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                sort: this.state.sortValue,
                pageNo: 1,
                // zipCode: this.props.zipcode,
                method: event.target.value,
                category: this.state.category ? this.state.category.join('_') : 0,
                color: this.state.color ? this.state.color.join('_') : 0,
                farm: this.state.farm ? this.state.farm.join('_') : 0,
                location: this.state.location ? this.state.location.join('_') : 0,
                boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
                variety: this.state.variety ? this.state.variety.join('_') : 0,
                uom: this.state.uom ? this.state.uom.join('_') : 0,
                length: this.state.length ? this.state.length.join('_') : 0,
                grade: this.state.grade ? this.state.grade.join('_') : 0,
            }, this.state.passedSearchedData.searchText);
            // @ todo move to common mapper
            this.props.getFiltersData({
                currencyCode: this.props.currencyCode,
                apiToken: this.props.apiToken,
                storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
                method: event.target.value === '?' ? '' : event.target.value,
                category: this.state.category ? this.state.category.join('_') : 0,
                color: this.state.color ? this.state.color.join('_') : 0,
                farm: this.state.farm ? this.state.farm.join('_') : 0,
                location: this.state.location ? this.state.location.join('_') : 0,
                boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
                variety: this.state.variety ? this.state.variety.join('_') : 0,
                uom: this.state.uom ? this.state.uom.join('_') : 0,
                length: this.state.length ? this.state.length.join('_') : 0,
                grade: this.state.grade ? this.state.grade.join('_') : 0,
                q: this.state.passedSearchedData.searchText,
            });
            this.setState({
                // sortValue: event.target.value,
                listData: [],
                prodOrder: [],
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
            });
        }
    };

    handleInuputChange = (event, prodData, deliData) => {
        let totalTemp = 0;
        let flag = false;
        const { blinkText, totalAmount } = this.state;
        if (event.target.value >= _get(deliData, 'qty_per_box')) {
            totalTemp = event.target.value * _get(deliData, 'total_price_currency');
        }
        if (event.target.value >= _get(deliData, 'floorallowed')) {
            flag = true;
            totalTemp = 0;
        }
        if (event.target.value % _get(deliData, 'qty_per_box') !== 0) {
            blinkText[prodData.pid] = 'blink';
        } else {
            blinkText[prodData.pid] = '';
        }
        totalAmount[prodData.pid] = totalTemp;
        this.setState({
            unitQty: { ...this.state.unitQty, [prodData.pid]: Number(event.target.value) ? Number(event.target.value) : '' },
            totalAmount,
            showMaxQtyAlert: flag,
            productId: prodData.pid,
            blinkText,
        });
    };

    handleAddCartClick = (prodData, deliData) => {
        if (this.props.apiToken) {
            const reqBody = mapAddToCartApiData({
                ...this.state,
                ...prodData,
                ...deliData,
                user: this.props.user,
                unitQty: this.state.unitQty[prodData.pid],
                totalAmount: this.state.totalAmount[prodData.pid],
                apiToken: this.props.apiToken,
                customerStoreId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            });
            this.props.addToCart(reqBody);
            this.setState({
                unitQty: { ...this.state.unitQty, [prodData.pid]: 0 },
                totalAmount: { ...this.state.totalAmount, [prodData.pid]: 0 },
            });
        } else {
            this.props.showLoginModal({ show: true });
        }
    };

    sortingOrderClick = () => {
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageType: 'bseller',
            pageNo: 1,
            sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
            // zipCode: this.props.zipcode,
            sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
        }, this.state.passedSearchedData.searchText);
        this.setState({
            showAscendSort: !this.state.showAscendSort,
        });

    };

    handleSortChange = (event) => {
        this.setState({
            sortValue: event.target.value,
            totalProductCount: 0,
            productDetails: [],
        });
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            pageType: 'bseller',
            sort: event.target.value,
            pageNo: 1,
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: event.target.value,
            pageNo: 1,
            // zipCode: this.props.zipcode,
            // sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
        }, this.state.passedSearchedData.searchText);
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
                case 'category': {
                    const categoryFilterData = this.state.categoryFilterDataTemp.filter(obj =>
                        obj.label.toLowerCase().match(searchValue.toLowerCase()));
                    this.setState({
                        categoryFilterData,
                    });
                    break;
                }
                case 'color':
                    {
                        const colorsFilterData = this.state.colorsFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            colorsFilterData,
                        });
                        break;
                    }
                case 'farm':
                    {
                        const farmsFilterData = this.state.farmsFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            farmsFilterData,
                        });
                        break;
                    }
                case 'location':
                    {
                        const stateCityFilterData = this.state.stateCityFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            stateCityFilterData,
                        });
                        break;
                    }
                case 'boxType':
                    {
                        const boxTypeFilterData = this.state.boxTypeFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            boxTypeFilterData,
                        });
                        break;
                    }
                case 'variety':
                    {
                        const varietyFilterData = this.state.varietyFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            varietyFilterData,
                        });
                        break;
                    }
                case 'uom':
                    {
                        const uomFilterData = this.state.uomFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            uomFilterData,
                        });
                        break;
                    }
                case 'length':
                    {
                        const lengthFilterData = this.state.lengthFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            lengthFilterData,
                        });
                        break;
                    }
                case 'grade':
                    {
                        const gradeFilterData = this.state.gradeFilterDataTemp.filter(obj =>
                            obj.label.toLowerCase().match(searchValue.toLowerCase()));
                        this.setState({
                            gradeFilterData,
                        });
                        break;
                    }
                default:
            }
        }
    }

    handleCustomFilter = () => {
        // what we are dooing here ?? .
        // const reqBody = mapProductSearchData({
        //     ...this.state,
        //     currencyCode: this.props.currencyCode,
        //     apiToken: this.props.apiToken,
        //     storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        //     pageNo: 1, // pageNo: this.state.enableClearAll ? this.state.pageNo : 1,
        //   });
        this.setState({
            filtersEnabled: true,
            enableClearAll: true,
            applyFilter: false,
            pageNo: 1, // this.state.enableClearAll ? this.state.pageNo : 1,
            tabKey: 'info',
            farmInfo: undefined,
            totalProductCount: 0,
            productDetails: [],
            listData: [],
            prodOrder: [],
            deliveryDetails: [],
            displayData: [],
            dateObjectArray: [],
            shippingMethodsArrData: [],
            filters: {},
            categoryFilterData: [],
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
        });
        // this.props.getBkmListSearchData(reqBody);
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
            // zipCode: this.props.zipcode,
            sortDirection: this.state.showAscendSort ? 'ASC' : 'DESC',
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
            method: this.state.method === '?' ? '' : this.state.method,
        }, this.state.passedSearchedData.searchText);
        this.props.getFiltersData({
            q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
            method: this.state.method === '?' ? '' : this.state.method,
        });
    };

    handleClearAll = () => {
        this.setState({
            filtersEnabled: false,
            enableClearAll: false,
            category: [],
            color: [],
            farm: [],
            location: [],
            boxType: [],
            uom: [],
            length: [],
            grade: [],
            searchStartDate: undefined,
            searchEndDate: undefined,
            totalProductCount: 0,
            productDetails: [],
            listData: [],
            prodOrder: [],
            deliveryDetails: [],
            displayData: [],
            dateObjectArray: [],
            shippingMethodsArrData: [],
            filters: {},
            categoryFilterData: [],
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
        });
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            pageType: 'bseller',
            sort: this.state.sortValue,
            pageNo: 1,
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
        }, this.state.passedSearchedData.searchText);
        this.props.getFiltersData({
            q: this.state.passedSearchedData.searchText ? this.state.passedSearchedData.searchText : this.props.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
        });
    };

    handleDateChange = (date, name) => {
        this.setState({
            [name]: moment(date).format('MM/DD/YYYY'),
        });
    };

    handleSearchClick = () => {
        this.setState({
            enableClearAll: true,
        });
        /* this.props.getBkmListSearchData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageType: 'bseller',
            pageNo: 1,
            searchStartDate: this.state.searchStartDate,
            searchEndDate: this.state.searchEndDate,
        }); */
        this.props.getHeaderSearchResult({
            q: this.state.passedSearchedData.searchText,
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            sort: this.state.sortValue,
            pageNo: 1,
            searchStartDate: this.state.searchStartDate,
            searchEndDate: this.state.searchEndDate,
            method: this.state.method === '?' ? '' : this.state.method,
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
        }, this.state.passedSearchedData.searchText);
        this.props.getFiltersData({
            currencyCode: this.props.currencyCode,
            apiToken: this.props.apiToken,
            storeId: this.state.selectedStoreId ? this.state.selectedStoreId : this.props.storeId,
            method: this.state.method === '?' ? '' : this.state.method,
            category: this.state.category ? this.state.category.join('_') : 0,
            color: this.state.color ? this.state.color.join('_') : 0,
            farm: this.state.farm ? this.state.farm.join('_') : 0,
            location: this.state.location ? this.state.location.join('_') : 0,
            boxType: this.state.boxType ? this.state.boxType.join('_') : 0,
            variety: this.state.variety ? this.state.variety.join('_') : 0,
            uom: this.state.uom ? this.state.uom.join('_') : 0,
            length: this.state.length ? this.state.length.join('_') : 0,
            grade: this.state.grade ? this.state.grade.join('_') : 0,
            q: this.state.passedSearchedData.searchText,
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
            // productId,
        });
    };

    resetMoreDetails = (date, index, pid) => {
        const dataTempAvail = _filter(this.state.deliveryDetails[index], [
            'delivery_date',
            date,
        ])[0];
        this.setState({
            displayData: { ...this.state.displayData, [index]: dataTempAvail },
            unitQty: { ...this.state.unitQty, [pid]: '' },
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
    }

    handleAddToFavorites = (productId) => {
        this.props.addToFavorites({
            apiToken: this.props.apiToken,
            productId,
        });
    }

    getStoreData = (data) => {
        console.log(data);
        this.setState({
              proData: data,
             proLink: true,
        });
      }  
      

    createMarkup = content => ({ __html: content });

    render() {
        console.log(this.props);
        console.log(this.state);

        if (this.state.pageLoader) {
            return (
              <div id="cover-spin">
                <center>
                  <img src={ lazyLoader } style={{height:'126px',marginTop:'300px'}} alt="lazy-loader"/>
                  </center>  
              </div>
            );
        }

        if (this.state.proLink) {
            this.setState({
             proLink: false,
           });
           return (
             <Redirect push to={{
               pathname: '/product/'+this.state.proData.sku
           }} />
            );
         
         
         }

        if (this.state.handleBkmClick) {
            return <Redirect push to='/' />;
        }

        if (this.state.redirectToDetailsPage) {
            return <Redirect push to={{
                pathname: `/${this.state.url}.html`,
                state: { productId: this.state.productId },
            }} />;
        }

        // if (_get(this, 'props.isLoading') && this.state.pageNo === 1) {
        //   return (
        //     <div className='container'>
        //       <Loader />
        //     </div>
        //   );
        // }

        return (
            <div>             
                 
      
              <div style={{overflow:'none',paddingTop:'140px'}}>
                   
                   
                  {/*  <ErrorBoundary>
                      
                        <ListingComponent
                          {...this.state}
                          getStoreData={this.getStoreData}
                          metaDesc={_get(this.props.bkmSearchData, 'products.meta_description')}
                          isLoading={this.props.isLoading}
                        />  
                    </ErrorBoundary> */}

        <div className="u-s-p-b-60" id="stor-data" style={{marginTop:'-2%', marginBottom:'-4rem'}}>
          <div className="container" id="sect_cont5">
            <div className="row sub_content">
             <div className="col-md-12">
                <div className="section__content">
                    <div className="row">   
                        <div className="products pro-data" id="product_img">
                        <ListingComponent
                          {...this.state}
                          getStoreData={this.getStoreData}
                          metaDesc={_get(this.props.bkmSearchData, 'products.meta_description')}
                          isLoading={this.props.isLoading}
                        />  
                        </div>
                    </div>         
                </div>
              </div> 
            </div>
          </div>
        </div>  
        <br/><br/>

                </div>
               
      
      
      
      
            </div>
          );
    }
}

const mapDispatchToProps = dispatch => ({
    getBkmListSearchData: data => dispatch(fetchBKMListingData(data)),
    addToCart: data => dispatch(postAddToCartData(data)),
    // getBkmCartData: data => dispatch(fetchCartData(data)),
    getFiltersData: data => dispatch(fetchFilterCategoryData(data)),
    addToFavorites: data => dispatch(fetchAddToFavsData(data)),
    addToWhishlist: data => dispatch(fetchAddToWishlistData(data)),
    showLoginModal: data => dispatch(receiveShowLoginModalData(data)),
    getHeaderSearchResult: (data, text) => dispatch(fetchCategoriesfinalSearchResult(data, text)),
    updateCart: data => dispatch(updateCartData(data)),
    setStoreId: data => dispatch(setStoreId(data)),
    flushCartData: () => dispatch(flushCartData()),
    flushCartViewData: () => dispatch(flushCartViewData()),
    clearCart: data => dispatch(clearCartData(data)),
    setCartId: data => dispatch(setCartId(data)),
    getMyProductReviews: data => dispatch(fetchProductReviews(data)),
    getProductReviews: data => dispatch(fetchProductVendorReviews(data)),
    getCategoryAutoCompleteData: data => dispatch(fetchCategoriesAutoCompleteResult(data)),
    fetchFilterData: data => dispatch(fetchFilterData(data)),  
});

const mapStateToProps = (state) => {
    const { bkmReducer, loginReducer, cartReducer, productReviewsReducer, vendorReviewsReducer } = state;

    const {
        bkmCartData,
        bkmSearchData,
        filtersData,
        isFetching: isLoading,
        finalSearchData,
        searchText,
        autoCompleteData,
        error: bkmError,
    } = bkmReducer || [];

    const {
        apiToken,
        cartId,
        currencyCode,
        storeId,
        loginData,
        user,
        storeName,
        zipcode,
        error: loginError,
        cartCount,
    } = loginReducer || [];

    const {
        addCartResponseDetails,
        type,
        filterData,
        error: addToCartError,
    } = cartReducer || [];

    const { productReviewsData: productReviewData } = productReviewsReducer || [];

    const { productVendorReviews } = vendorReviewsReducer || [];

    const error = !_isEmpty(loginError) || _isError(loginError) || !_isEmpty(addToCartError) || _isError(addToCartError) || !_isEmpty(bkmError) || _isError(bkmError);

    return {
        bkmCartData,
        bkmSearchData,
        isLoading,
        apiToken,
        cartId,
        currencyCode,
        storeId,
        filtersData,
        loginData,
        user,
        storeName,
        zipcode,
        finalSearchData,
        searchText,
        addCartResponseDetails,
        type,
        error,
        productReviewData,
        productVendorReviews,
        cartCount,
        filterData,
        autoCompleteData,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ErrorHandler(BestsellerContainer));
