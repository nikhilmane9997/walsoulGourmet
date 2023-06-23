import React, { Fragment } from 'react';
import _get from 'lodash/get';
import Datetime from 'react-datetime';
import Image from 'react-image-resizer';
import StarRatings from 'react-star-ratings';

import '../../assets/stylesheets/DatePickerReact.css';

export default function ProductGridComponent(props) {
    console.log(props);
    const renderDay = (inputProps, currentDate, selectedDate) => {
        inputProps.className = `${inputProps.className} customTdCls`;
        const formattedDate = currentDate.format('DD-MMM-YYYY');
        if (props.dateObjectArray && Object.keys(props.dateObjectArray[props.index]).length && props.dateObjectArray[props.index][formattedDate]) {
            inputProps.className = `${inputProps.className} hasDatePrice`;
            return <td {...inputProps} onClick={() => props.resetMoreDetails(formattedDate, props.index)}>
                {currentDate.date()}
                <div>{props.dateObjectArray[props.index][formattedDate]}</div>
            </td>;
        }
        inputProps.className = `${inputProps.className} rdtDisabled`;
        return <td {...inputProps}>{currentDate.date()}</td>;
    };
    const renderInput = (inputProps, openCalendar, closeCalendar) => {
        function clear() {
            inputProps.onChange({ target: { value: '' } });
        }
        return (
            <div>
                <div className="delivery-opinion">
                    <b className='delivery-by-grid'>Delivery By{' '}</b>
                    <span className='del-date'>
                        {_get(props.deliveryData, 'delivery_date_form')}
                    </span>
                    <span className="grid-calendar" onClick={openCalendar}>
                        {/* // commented temporarily */}
                        {/* <input type="date" className="datepicker59662 hasDatepicker" placeholder="+" id="dp1542198135597" style={{ border: '0px' }} /> */}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="product-m">
                <div className="product-m__thumb">

                    <div className="aspect aspect--bg-grey aspect--square u-d-block" onClick={() => props.getStoreData(props.thisData)}>

                        <img className="aspect__img" src={props.thisData.image} alt="" /></div>
                    <div class="product-m__quick-look">

                        <a className="fas fa-search" data-modal="modal" onClick={() => props.showProdDetail(props.thisData)} title="Quick Look"></a></div>
                    <div className="product-m__add-cart">

                        <a className="btn--e-brand" onClick={() => props.getStoreData(props.thisData)}>View</a></div>
                </div>
                <div className="product-m__content">
                    <div className="product-m__category">

                    </div>
                    <div className="product-m__name">

                        <div onClick={() => props.getStoreData(props.thisData)}>{props.thisData.name}</div></div>
                    <div className="product-m__rating gl-rating-style"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star-half-alt"></i><i className="far fa-star"></i><i className="far fa-star"></i>

                        <span className="product-m__review">(23)</span></div>
                    <div className="product-m__price">&#8377;{props.thisData.price}</div>
                    <div className="product-m__hover">
                        <div className="product-m__preview-description">

                            <span>{props.thisData.description}</span></div>
                        <div className="product-m__wishlist">

                            <a className="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist"></a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
