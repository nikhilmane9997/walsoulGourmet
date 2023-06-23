import React, { Fragment, useEffect, useState } from "react";
import _get from "lodash/get";
import Datetime from "react-datetime";
import Image from "react-image-resizer";
import StarRatings from "react-star-ratings";
import SimpleImageSlider from "react-simple-image-slider";

import "../../assets/stylesheets/DatePickerReact.css";

export default function ProductListComponent(props) {
  console.log(">>>>>>>>>>", props);
  const [productPrice, setProductPrice] = useState({
    minPrice: "",
    maxPrice: "",
  });
  // console.log(productPrice.maxPrice);
  // const priceConfig = JSON.parse(props.thisData.price_config);
  // console.log("priceConfig", priceConfig);
  useEffect(() => {
    handlePrice();
  }, [props]);

  const renderDay = (inputProps, currentDate, selectedDate) => {
    inputProps.className = `${inputProps.className} customTdCls`;
    const formattedDate = currentDate.format("DD-MMM-YYYY");
    if (
      props.dateObjectArray &&
      Object.keys(props.dateObjectArray[props.index]).length &&
      props.dateObjectArray[props.index][formattedDate]
    ) {
      inputProps.className = `${inputProps.className} hasDatePrice`;
      return (
        <td
          {...inputProps}
          onClick={() => props.resetMoreDetails(formattedDate, props.index)}
        >
          {currentDate.date()}
          <div>{props.dateObjectArray[props.index][formattedDate]}</div>
        </td>
      );
    }
    inputProps.className = `${inputProps.className} rdtDisabled`;
    return <td {...inputProps}>{currentDate.date()}</td>;
  };
  const handlePrice = () => {
    let data = [];
    if (props.thisData.children_products !== undefined) {
      props.thisData.children_products.map((val) => {
        data.push(val.final_price);
      });
    }
    setProductPrice({
      minPrice: Math.min(...data),
      maxPrice: Math.max(...data),
    });
    // console.log(Math.min(...data));
  };

  const renderInput = (inputProps, openCalendar, closeCalendar) => {
    function clear() {
      inputProps.onChange({ target: { value: "" } });
    }

    return (
      <div>
        <div className="delivery-opinion">
          <b className="delivery-by-grid">Delivery By </b>
          <span className="del-date">
            {_get(props.deliveryData, "delivery_date_form")}
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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {" "}
      <div className="product-m" style={{ width: "100%" }}>
        <div className="product-m__thumb">
          <a
            onClick={() => props.getStoreData(props.thisData)}
            className="aspect u-d-block"
          >
            <img
              style={{ width: "100%", objectFit: "cover" }}
              // width={236}
              //height={330}
              src={props.thisData.image}
              alt={props.thisData.name}
              //showBullets={true}
              //slideDuration={0.5}
            />
          </a>
        </div>
        <div className="product-m__content">
          <div className="product-m__category">
            <div
              className="listing-card-name"
              onClick={() => props.getStoreData(props.thisData)}
              title={props.thisData.name}
            >
              {props.thisData.name}
            </div>
            <div className="product-m__price">
              <span>
                {props.thisData.children_products !== undefined ? (
                  <span
                    className="product-discountedPrice"
                    onClick={() => props.getStoreData(props.thisData)}
                  >
                    &#8377;{productPrice.minPrice}-&#8377;
                    {productPrice.maxPrice}
                  </span>
                ) : (
                  <span
                    className="product-discountedPrice"
                    onClick={() => props.getStoreData(props.thisData)}
                  >
                    &#8377;{props.thisData.final_price}
                  </span>
                )}

                {/* <span
                className={
                  props.thisData.price - props.thisData.final_price !== 0
                    ? "product-strike"
                    : "product-nostrike"
                }
              >
                &#8377;{props.thisData.price}
              </span> */}
              </span>
              {/* <span
              className={
                props.thisData.price - props.thisData.final_price !== 0
                  ? "product-discountPercentage"
                  : "product-nodiscountPercentage"
              }
            >
              (
              {Math.round(
                ((props.thisData.price - props.thisData.final_price) /
                  props.thisData.price) *
                100
              )}
              % OFF)
            </span> */}
            </div>
          </div>

          {/*   <div className="product-m__hover">
            <b>Sizes:&nbsp;</b>
            {props.thisData.children_products.map((key) => (
              <span className="product-sizeNoInventoryPresent">
                {key.size} &nbsp;
              </span>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
}
