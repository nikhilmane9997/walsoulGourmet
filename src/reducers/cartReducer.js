import _get from 'lodash/get';
import * as CART_CONSTANTS from '../constants/cart';
import {
    REMOVE_FROM_CART_URL_CONSTANTS,
    UPDATE_CART_URL_CONSTANTS,
    MOVE_TO_WISHLIST_CONSTANTS,
    REMOVE_EXPIRED_PRODUCTS_CONSTANTS,
    BULK_ADD_TO_CART_CONSTANTS,
    CLEAR_CART_CONSTANTS,
    GIFT_MESSAGE,
} from '../constants/cart';

const cartReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    cartId: '',
    cancelDiscountCouponData: [],
    discountCouponData: [],
    firstCartData: [],
    productInfo: [],
    addCartResponseDetails: [],
    RemoveFromCartData: [],
    updateCartData: [],
    moveToWishListData: [],
    removeExpiredProductsData: [],
    showCartResult: undefined,
    cartType: '',
    bulkCartData: [],
    productCount: '',
    productQuantity: '',
    cartData: [],
    grandTotalData: [], 
    filterData: [],
    newCartData: [],
    cartDatNew: [],
    maskId: undefined,
    guestAddCartResponse: [],
    guestUpdateCartResponse: [],
    guestDeleteCartResponse: undefined,
    guestCartList: [],
    cartConvertResponse: undefined,
    guestCartItems: [],
    cartStatus: false,
    reserveId: '',
    giftMessage: undefined,
    razorpay_order_id:'',
}, action) => {
    switch (action.type) {
        case CART_CONSTANTS.REQUEST_GIFT_MESSAGE:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                giftMessage: undefined,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_GIFT_MESSAGE:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                giftMessage: action.data,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_GIFT_MESSAGE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
         case CART_CONSTANTS.REQUEST_FILTER:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                filterData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_FILTER:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                filterData: action.data,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_FILTER_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case CART_CONSTANTS.SETTING_BILLING_AND_SHIPPING.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                grandTotalData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.SETTING_BILLING_AND_SHIPPING.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                grandTotalData: action.data,
                reserveId: action.data.totals.extension_attributes.reserved_order_id,
                razorpay_order_id: action.data.totals.extension_attributes.reserved_order_id,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.SETTING_BILLING_AND_SHIPPING.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case CART_CONSTANTS.RECEIVED_CART_DATA:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                cartData: action.data,
                lastUpdated: action.receivedAt,
            });
        case CART_CONSTANTS.REQUEST_CART_ITEMS_BY_CUSTOMER:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                firstCartData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_CART_ITEMS_BY_CUSTOMER:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                firstCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_CART_ITEMS_BY_CUSTOMER_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case CART_CONSTANTS.REQUEST_BILL_SHIP_ADD:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                cartId: '',
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_BILL_SHIP_ADD:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                cartId: action.data,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_BILL_SHIP_ADD_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case CART_CONSTANTS.REQUEST_QUOTE:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                cartId: '',
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_QUOTE:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                cartId: action.data,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_QUOTE_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case CART_CONSTANTS.REQUEST_FIRST_CART_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                cancelDiscountCouponData: [],
                discountCouponData: [],
                //addCartResponseDetails: [],
                showCartResult: undefined,
                updateCartData: [],
                RemoveFromCartData: [],
                moveToWishListData: [],
                productInfo: [],
                firstCartData: [],
                productCount: '',
                productQuantity: '',
                removeExpiredProductsData: [],
                lastUpdated: action.receivedAt,
            });
        case CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                firstCartData: action.data,
                productInfo: action.data.items,
                productCount: action.data.items_count,
                productQuantity: action.data.items_qty,
                cartId: action.data.id,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_FIRST_CART_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.REQUEST_ADD_TO_CART:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                // addCartResponseDetails: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_ADD_TO_CART:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                addCartResponseDetails: action.data,
                cartId: action.data[0].quote_id,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_ADD_TO_CART_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.REQUEST_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                cancelDiscountCouponData: [],
                discountCouponData: [],
                firstCartData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                moveToWishListData: [],
                discountCouponData: action.data,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_DISCOUNT_COUPON_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // cancelled Discount Coupon reducers case
        case CART_CONSTANTS.REQUEST_CANCEL_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                discountCouponData: [],
                cancelDiscountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                cancelDiscountCouponData: action.data,
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.RECEIVED_CANCEL_DISCOUNT_COUPON_SEARCH_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // Remove From Cart reducers case
        case REMOVE_FROM_CART_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                RemoveFromCartData: [],
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                discountCouponData: [],
                moveToWishListData: [],
                RemoveFromCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case REMOVE_FROM_CART_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // Update Cart reducers case
        case UPDATE_CART_URL_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                updateCartData: [],
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case UPDATE_CART_URL_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                updateCartData: action.data,
                discountCouponData: [],
                moveToWishListData: [],
                lastUpdated: action.receivedAt,
            });

        case UPDATE_CART_URL_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // move to wishlist reducers case
        case MOVE_TO_WISHLIST_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                moveToWishListData: [],
                discountCouponData: [],
                lastUpdated: action.receivedAt,
            });

        case MOVE_TO_WISHLIST_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                moveToWishListData: action.data,
                discountCouponData: [],
                lastUpdated: action.receivedAt,
            });

        case MOVE_TO_WISHLIST_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        // Remove Expired products reducers case
        case REMOVE_EXPIRED_PRODUCTS_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                moveToWishListData: [],
                discountCouponData: [],
                removeExpiredProductsData: [],
                lastUpdated: action.receivedAt,
            });

        case REMOVE_EXPIRED_PRODUCTS_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                removeExpiredProductsData: action.data,
                discountCouponData: [],
                lastUpdated: action.receivedAt,
            });

        case REMOVE_EXPIRED_PRODUCTS_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.CLEAR_CART_DATA:
            return Object.assign({}, state, {
                type: '',
                error: '',
                cartType: '',
                isFetching: false,
                cancelDiscountCouponData: [],
                discountCouponData: [],
                firstCartData: [],
                addCartResponseDetails: [],
                RemoveFromCartData: [],
                updateCartData: [],
                moveToWishListData: [],
                showCartResult: undefined,
                grandTotalData: [], 
                filterData: [],
                newCartData: [],
                cartDatNew: [],
                maskId: undefined,
                guestAddCartResponse: [],
                guestUpdateCartResponse: [],
                guestDeleteCartResponse: undefined,
                guestCartList: [],
                cartConvertResponse: undefined,
                guestCartItems: [],
            });
        case CART_CONSTANTS.SET_CART_TYPE:
            return Object.assign({}, state, {
                type: action.type,
                cartType: action.data,
            });

        // Bulk Add to cart reducers case
        case BULK_ADD_TO_CART_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                bulkCartData: [],
                lastUpdated: action.receivedAt,
            });

        case BULK_ADD_TO_CART_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                bulkCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case BULK_ADD_TO_CART_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

        case CART_CONSTANTS.FLUSH_CART_VIEW_DATA:
            return Object.assign({}, state, {
                type: action.type,
                firstCartData: [],
                cartType: '',
                showCartResult: undefined,
            });

        // Clear cart
        case CLEAR_CART_CONSTANTS.REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                clearedCartData: [],
                lastUpdated: action.receivedAt,
            });

        case CLEAR_CART_CONSTANTS.RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                didInvalidate: false,
                clearedCartData: action.data,
                lastUpdated: action.receivedAt,
            });

        case CLEAR_CART_CONSTANTS.RECEIVED_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });
        case CART_CONSTANTS.GET_CART_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                newCartData: [],
                cartStatus: false,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.GET_CART_RECEIVED:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                newCartData: action.data,
                cartStatus: action.data[0].status,
                cartId: action.data[0].quote_id,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.GET_CART_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

            case CART_CONSTANTS.GUEST_REQUEST_ADD_TO_CART:
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                guestAddCartResponse: [],
                maskId: undefined,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.GUEST_RECEIVED_ADD_TO_CART:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                guestAddCartResponse: action.data,
                maskId: action.data[0].mask_id,
                lastUpdated: action.receivedAt,
            });

        case CART_CONSTANTS.GUEST_RECEIVED_ADD_TO_CART_ERROR:
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
            });

            case CART_CONSTANTS.GUEST_REQUEST_EDIT_TO_CART:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    guestUpdateCartResponse: [],
                    lastUpdated: action.receivedAt,
                });
    
            case CART_CONSTANTS.GUEST_RECEIVED_EDIT_TO_CART:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    guestUpdateCartResponse: action.data,
                    lastUpdated: action.receivedAt,
                });
    
            case CART_CONSTANTS.GUEST_RECEIVED_EDIT_TO_CART_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });

                case CART_CONSTANTS.GUEST_REQUEST_DELETE_TO_CART:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    guestDeleteCartResponse: undefined,
                    lastUpdated: action.receivedAt,
                });
    
            case CART_CONSTANTS.GUEST_RECEIVED_DELETE_TO_CART:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    guestDeleteCartResponse: action.data,
                    lastUpdated: action.receivedAt,
                });
    
            case CART_CONSTANTS.GUEST_RECEIVED_DELETE_TO_CART_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });
            
                case CART_CONSTANTS.GUEST_REQUEST_CART_LIST_CART:
                return Object.assign({}, state, {
                    isFetching: true,
                    type: action.type,
                    guestCartList: [],
                    guestCartItems: [],
                    lastUpdated: action.receivedAt,
                });
    
            case CART_CONSTANTS.GUEST_RECEIVED_CART_LIST_CART:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    guestCartList: action.data,
                    guestCartItems: action.data[0].items,
                    lastUpdated: action.receivedAt,
                });
    
            case CART_CONSTANTS.GUEST_RECEIVED_CART_LIST_ERROR:
                return Object.assign({}, state, {
                    isFetching: false,
                    type: action.type,
                    error: action.error,
                });

                case CART_CONSTANTS.GUEST_REQUEST_CONVERT_CART:
                    return Object.assign({}, state, {
                        isFetching: true,
                        type: action.type,
                        cartConvertResponse: undefined,
                        lastUpdated: action.receivedAt,
                    });
        
                case CART_CONSTANTS.GUEST_RECEIVED_CONVERT_CART:
                    return Object.assign({}, state, {
                        isFetching: false,
                        type: action.type,
                        guestCartList: [],
                        guestCartItems: [],
                        maskId: undefined,
                        cartConvertResponse: action.data,
                        lastUpdated: action.receivedAt,
                    });
        
                case CART_CONSTANTS.GUEST_RECEIVED_CONVERT_ERROR:
                    return Object.assign({}, state, {
                        isFetching: false,
                        type: action.type,
                        error: action.error,
                    });

        default:
            return state;
    }
};

export default cartReducer;
