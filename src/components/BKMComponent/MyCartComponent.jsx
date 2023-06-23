import React from "react";
import Button from "react-bootstrap/lib/Button";
import _get from "lodash/get";
import { FormComponent, FormContainer } from "react-authorize-net";
import moment from "moment";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useMediaQuery } from "react-responsive";
import { Modal } from "react-responsive-modal";
// import { Slider, InputNumber } from 'antd';
import calendarImage from "../../assets/images/select-date.png";
import lazyLoader from "../../assets/img/25.gif";
import circle from "../../assets/img/circle.svg";
import Image from "react-image-resizer";
import { defaultMergeProps } from "react-redux/lib/connect/mergeProps";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Redirect } from "react-router";
import loaderRoll from "../../assets/img/Rolling.gif";

export default function MyCartComponent(props) {
  console.log(props);

  let result = [];
  let address = undefined;
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 601, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 600 });
    return isMobile ? children : null;
  };

  const handleAddress = () => {
    return <Redirect push to="/customer/account/address" />;
  };
  // if (props.customerAddress.length !== 0) {
  //   for (var i = 0; i < props.customerAddress.length; i++) {
  //     if (props.customerAddress[i].default_shipping === true) {
  //       address = props.customerAddress[i];
  //     }
  //   }
  // }
  console.log("shippingAddressData", props.showAdModal);
  if (props.apiToken !== "") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {props.totalCartItems.length !== 0 && props.apiToken !== "" ? (
          <div className="sh-cart-container">
            <div className="" style={{ marginTop: "100px" }}>
              <div className="section__intro u-s-m-b-60">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="section__text-wrap">
                        <h1
                          className="section__heading u-c-secondary"
                          style={{ color: "#4B817B" }}
                        >
                          CHECKOUT
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Desktop>
                <div>
                  <div
                    style={{
                      marginTop: "10px",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    {props.totalCartItems.map((thisCart, index) => {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid #5a4744",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="sh-cart-top-desc">
                            <div>
                              <div className="shp-cart-div">
                                <img
                                  className="shp-cart-img"
                                  src={thisCart.image}
                                  alt=""
                                />
                              </div>

                              <span className="sh-cart-qty">
                                Qty:
                                <div style={{ border: "1px solid gray" }}>
                                  <div className="input-counter">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateCart(
                                          thisCart,
                                          "sub",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      -
                                    </span>

                                    <span>{thisCart.qty}</span>

                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateCart(
                                          thisCart,
                                          "add",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <span> {thisCart.name}</span>
                              <span>Size:{thisCart.sku.split("-")[1]}</span>
                              <span>
                                Delivery Date:
                                {moment(
                                  thisCart.custom_attributes.delivery_date
                                ).format("MM/DD/YYYY")}
                              </span>
                              <span>
                                Message:
                                {thisCart.custom_attributes.gift_message}
                              </span>
                              <div className="sh-cart-top-desc">
                                <span
                                  className="editToGift"
                                  onClick={() => props.openEditPopUp(thisCart)}
                                >
                                  <i
                                    className="fas fa-edit"
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  ></i>{" "}
                                  GIFT
                                </span>
                                <span style={{ display: "flex" }}>
                                  Price:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.price}
                                  </p>
                                </span>
                              </div>
                              <div className="sh-cart-price">
                                <span style={{ display: "flex" }}>
                                  Total:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.row_total}
                                  </p>
                                </span>
                                <span
                                  className=""
                                  onClick={() =>
                                    props.removeProduct(thisCart.item_id)
                                  }
                                >
                                  <TrashIcon className="sh-cart-remove" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Desktop>
              <Mobile>
                <div>
                  <div
                    style={{
                      marginTop: "10px",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    {props.totalCartItems.map((thisCart, index) => {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid #5a4744",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="sh-cart-top-desc">
                            <div>
                              <div className="shp-cart-div">
                                <img
                                  className="shp-cart-img"
                                  src={thisCart.image}
                                  alt=""
                                />
                              </div>

                              <span className="sh-cart-qty">
                                Qty:
                                <div style={{ border: "1px solid gray" }}>
                                  <div className="input-counter">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateCart(
                                          thisCart,
                                          "sub",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      -
                                    </span>

                                    <span>{thisCart.qty}</span>

                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateCart(
                                          thisCart,
                                          "add",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span> {thisCart.name}</span>
                              <span>Size:{thisCart.sku.split("-")[1]}</span>
                              <span>
                                Delivery Date:
                                {moment(
                                  thisCart.custom_attributes.delivery_date
                                ).format("MM/DD/YYYY")}
                              </span>
                              <span>
                                Message:
                                {thisCart.custom_attributes.gift_message}
                              </span>
                              <div className="sh-cart-top-desc">
                                <span
                                  className="editToGift"
                                  onClick={() => props.openEditPopUp(thisCart)}
                                >
                                  <i
                                    className="fas fa-edit"
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  ></i>{" "}
                                  GIFT
                                </span>
                                <span style={{ display: "flex" }}>
                                  Price:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.price}
                                  </p>
                                </span>
                              </div>
                              <div className="sh-cart-price">
                                <span style={{ display: "flex" }}>
                                  Total:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.row_total}
                                  </p>
                                </span>
                                <span
                                  className="sh-cart-remove"
                                  onClick={() =>
                                    props.removeProduct(thisCart.item_id)
                                  }
                                >
                                  Remove
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Mobile>
              <Tablet>
                <div>
                  <div
                    style={{
                      marginTop: "10px",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    {props.totalCartItems.map((thisCart, index) => {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid #5a4744",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="sh-cart-top-desc">
                            <div>
                              <div className="shp-cart-div">
                                <img
                                  className="shp-cart-img"
                                  src={thisCart.image}
                                  alt=""
                                />
                              </div>

                              <span className="sh-cart-qty">
                                Qty:
                                <div style={{ border: "1px solid gray" }}>
                                  <div className="input-counter">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateCart(
                                          thisCart,
                                          "sub",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      -
                                    </span>

                                    <span>{thisCart.qty}</span>

                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateCart(
                                          thisCart,
                                          "add",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <span> {thisCart.name}</span>
                              <span>Size:{thisCart.sku.split("-")[1]}</span>
                              <span>
                                Delivery Date:
                                {moment(
                                  thisCart.custom_attributes.delivery_date
                                ).format("MM/DD/YYYY")}
                              </span>
                              <span>
                                Message:
                                {thisCart.custom_attributes.gift_message}
                              </span>
                              <div className="sh-cart-top-desc">
                                <span
                                  className="editToGift"
                                  onClick={() => props.openEditPopUp(thisCart)}
                                >
                                  <i
                                    className="fas fa-edit"
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  ></i>{" "}
                                  GIFT
                                </span>
                                <span style={{ display: "flex" }}>
                                  Price:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.price}
                                  </p>
                                </span>
                              </div>
                              <div className="sh-cart-price">
                                <span style={{ display: "flex" }}>
                                  Total:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.row_total}
                                  </p>
                                </span>
                                <span
                                  className="sh-cart-remove"
                                  onClick={() =>
                                    props.removeProduct(thisCart.item_id)
                                  }
                                >
                                  Remove
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Tablet>
              <div className="ch-dash-address-manipulation">
                <div className="checkout-address">
                  <span className="checkout-add-sec">Shipping Address</span>
                  <div className="ckeckout-items">
                    <div className="gl-inline-t">
                      <div style={{ display: "none" }} className="input-field">
                        <input
                          name="addressId"
                          id="addressId"
                          title="Address ID"
                          className="field-input"
                          type="text"
                          value={props.fields.addressId}
                        />
                      </div>
                      <div className="u-s-m-b-30">
                        <input
                          className={
                            props.errors.firstName
                              ? "input-text ch-cart-input-text--primary-style-error"
                              : "input-text ch-cart-input-text--primary-style"
                          }
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name"
                          onChange={(e) => {
                            props.handleChange(e);
                          }}
                          value={props.fields.firstName}
                        />
                      </div>
                    </div>
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        <input
                          className={
                            props.errors.lastName
                              ? "input-text ch-cart-input-text--primary-style-error"
                              : "input-text ch-cart-input-text--primary-style"
                          }
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name"
                          onChange={(e) => {
                            props.handleChange(e);
                          }}
                          value={props.fields.lastName}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ckeckout-items">
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        <input
                          className={
                            props.errors.telephone
                              ? "input-text ch-cart-input-text--primary-style-error"
                              : "input-text ch-cart-input-text--primary-style"
                          }
                          type="number"
                          maxLength="10"
                          name="telephone"
                          id="telephone"
                          placeholder="Phone No."
                          onChange={(e) => {
                            props.handleChange(e);
                          }}
                          value={props.fields.telephone}
                          onInput={(e) => {
                            props.maxLengthCheck(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        <input
                          className={
                            props.errors.streetAddress1
                              ? "input-text ch-cart-input-text--primary-style-error"
                              : "input-text ch-cart-input-text--primary-style"
                          }
                          type="text"
                          name="streetAddress1"
                          id="streetAddress1"
                          placeholder="House Name and Street1"
                          onChange={(e) => {
                            props.handleChange(e);
                          }}
                          value={props.fields.streetAddress1}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ckeckout-items">
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        <input
                          className={
                            props.errors.streetAddress2
                              ? "input-text ch-cart-input-text--primary-style-error"
                              : "input-text ch-cart-input-text--primary-style"
                          }
                          type="text"
                          name="streetAddress2"
                          id="streetAddress2"
                          placeholder="House Name and Street2"
                          onChange={(e) => {
                            props.handleChange(e);
                          }}
                          value={props.fields.streetAddress2}
                        />
                      </div>
                    </div>
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        <select
                          className={
                            props.errors.selectStateValue
                              ? "select-box select-box--primary-style input-error"
                              : "select-box select-box--primary-style"
                          }
                          id="shipping_region_id_1"
                          value={props.fields.selectStateValueShipping}
                          onChange={(e) => {
                            props.handleStateChange(e);
                          }}
                        >
                          <option value="">
                            {props.fields.selectStateValue}
                          </option>
                          {props.stateListRes &&
                            Object.entries(props.stateListRes).map(
                              ([value, thisState]) => (
                                <option
                                  key={value}
                                  /* value={`${thisState.code},${thisState.region_id}`} */ value={
                                    thisState.id
                                  }
                                  id={thisState.id}
                                  alt={thisState.id}
                                >
                                  {thisState.name}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="ckeckout-items">
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        <input
                          className={
                            props.errors.city
                              ? "input-text ch-cart-input-text--primary-style-error"
                              : "input-text ch-cart-input-text--primary-style"
                          }
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Town/City"
                          onChange={(e) => {
                            props.handleChange(e);
                          }}
                          value={props.fields.city}
                        />
                      </div>
                    </div>
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        <input
                          className={
                            props.errors.postalCode
                              ? "input-text ch-cart-input-text--primary-style-error"
                              : "input-text ch-cart-input-text--primary-style"
                          }
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          placeholder="Zip/Postal Code"
                          onChange={(e) => {
                            props.handleChange(e);
                          }}
                          value={props.fields.postalCode}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="gl-inline-t">
                      <div className="u-s-m-b-30">
                        {!props.isBillingFlag ? (
                          <React.Fragment>
                            <input
                              type="checkbox"
                              name="defaultBilling"
                              id="defaultBilling"
                              title="Use as My Default Billing Address"
                              onChange={(e) => {
                                props.handleChangeBill1(e);
                              }}
                              value={props.fields.defaultBilling}
                            />
                            <label>
                              {" "}
                              &nbsp;Use as my default billing address
                            </label>
                          </React.Fragment>
                        ) : (
                          <strong> &nbsp;Default Billing Address</strong>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="ckeckout-items">
                    {/*props.addressLoader === false ? */}
                    {props.showShippingLoader === true ? (
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={loaderRoll}
                          style={{ height: "30px", width: "30px" }}
                          alt=""
                        />
                      </div>
                    ) : (
                      <a
                        className="ch-add-btn"
                        onClick={props.handleSaveAddress.bind(props)}
                      >
                        SAVE
                      </a>
                    )}
                    <a
                      className="ch-add-btn"
                      onClick={() => {
                        props.showAddressModal("shipping");
                      }}
                    >
                      change Address
                    </a>

                    {
                      // : (
                      //   <img
                      //     src={lazyLoader}
                      //     style={{ height: "60px", width: "60px" }}
                      //     alt="lazy-loader"
                      //   />
                      // )
                    }
                  </div>
                </div>
                <div className="checkout-bill-address">
                  <div>
                    <span className="checkout-add-sec">Billing Address</span>
                    <div className="ckeckout-items u-s-m-b-30">
                      <div style={{ display: "none" }} className="input-field">
                        <input
                          name="addressId"
                          id="addressId"
                          title="Address ID"
                          className="field-input"
                          type="text"
                          value={props.fields1.addressId}
                        />
                      </div>

                      <input
                        className={
                          props.errors1.firstName
                            ? "input-text ch-cart-input-text--primary-style-error"
                            : "input-text ch-cart-input-text--primary-style"
                        }
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First Name"
                        onChange={(e) => {
                          props.handleChange1(e);
                        }}
                        value={props.fields1.firstName}
                      />

                      <input
                        className={
                          props.errors1.lastName
                            ? "input-text ch-cart-input-text--primary-style-error"
                            : "input-text ch-cart-input-text--primary-style"
                        }
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name"
                        onChange={(e) => {
                          props.handleChange1(e);
                        }}
                        value={props.fields1.lastName}
                      />
                    </div>
                    <div className="ckeckout-items u-s-m-b-30">
                      <input
                        className={
                          props.errors1.telephone
                            ? "input-text ch-cart-input-text--primary-style-error"
                            : "input-text ch-cart-input-text--primary-style"
                        }
                        type="number"
                        maxLength="10"
                        name="telephone"
                        id="telephone"
                        placeholder="Phone No."
                        onChange={(e) => {
                          props.handleChange1(e);
                        }}
                        value={props.fields1.telephone}
                        onInput={(e) => {
                          props.maxLengthCheck(e);
                        }}
                      />

                      <input
                        className={
                          props.errors1.streetAddress1
                            ? "input-text ch-cart-input-text--primary-style-error"
                            : "input-text ch-cart-input-text--primary-style"
                        }
                        type="text"
                        name="streetAddress1"
                        id="streetAddress1"
                        placeholder="House Name and Street1"
                        onChange={(e) => {
                          props.handleChange1(e);
                        }}
                        value={props.fields1.streetAddress1}
                      />
                    </div>

                    <div className="ckeckout-items u-s-m-b-30">
                      <input
                        className={
                          props.errors1.streetAddress2
                            ? "input-text ch-cart-input-text--primary-style-error"
                            : "input-text ch-cart-input-text--primary-style"
                        }
                        type="text"
                        name="streetAddress2"
                        id="streetAddress2"
                        placeholder="House Name and Street2"
                        onChange={(e) => {
                          props.handleChange1(e);
                        }}
                        value={props.fields1.streetAddress2}
                      />

                      <select
                        className={
                          props.errors1.selectStateValue
                            ? "select-box select-box--primary-style input-error"
                            : "select-box select-box--primary-style"
                        }
                        id="billing_region_id_1"
                        value={props.fields1.selectStateValueBilling}
                        onChange={(e) => {
                          props.handleStateChange1(e);
                        }}
                      >
                        <option value="">
                          {props.fields1.selectbillStateValue}
                        </option>
                        {props.stateListRes &&
                          Object.entries(props.stateListRes).map(
                            ([value, thisState]) => (
                              <option
                                key={value}
                                /* value={`${thisState.code},${thisState.region_id}`} */ value={
                                  thisState.id
                                }
                                id={thisState.id}
                                alt={thisState.id}
                              >
                                {thisState.name}
                              </option>
                            )
                          )}
                      </select>
                    </div>
                    <div className="ckeckout-items u-s-m-b-30">
                      <input
                        className={
                          props.errors1.city
                            ? "input-text ch-cart-input-text--primary-style-error"
                            : "input-text ch-cart-input-text--primary-style"
                        }
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Town/City"
                        onChange={(e) => {
                          props.handleChange1(e);
                        }}
                        value={props.fields1.city}
                      />

                      <input
                        className={
                          props.errors1.postalCode
                            ? "input-text ch-cart-input-text--primary-style-error"
                            : "input-text ch-cart-input-text--primary-style"
                        }
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="Zip/Postal Code"
                        onChange={(e) => {
                          props.handleChange1(e);
                        }}
                        value={props.fields1.postalCode}
                      />
                    </div>
                  </div>

                  <div className="ch-bill-add-btn">
                    <div className="ch-btn-sec">
                      {/*props.addressLoader === false ? */}
                      {props.showBillingLoader === true ? (
                        <div style={{ textAlign: "center" }}>
                          <img
                            src={loaderRoll}
                            style={{ height: "30px", width: "30px" }}
                            alt=""
                          />
                        </div>
                      ) : (
                        <span
                          className="ch-add-btn"
                          onClick={props.handleSaveBillingAddress.bind(props)}
                        >
                          SAVE
                        </span>
                      )}

                      <span
                        className="ch-add-btn"
                        onClick={() => {
                          props.showAddressModal("billing");
                        }}
                      >
                        change Address
                      </span>

                      {
                        // : (
                        //   <img
                        //     src={lazyLoader}
                        //     style={{ height: "60px", width: "60px" }}
                        //     alt="lazy-loader"
                        //   />
                        // )
                      }
                    </div>
                  </div>
                </div>
                <div className="checkout-bill-address-total">
                  <div className="ch-bill-container">
                    <div className="ch-bill-items">
                      <span>Sub Total</span>
                      <span style={{ fontWeight: "bold" }}>
                        {" "}
                        &#8377;{props.cartDataShow.totals.grand_total}
                      </span>
                    </div>
                    <div className="ch-bill-items">
                      <span>Promo Discount</span>
                      <span>&#8377;0</span>
                    </div>
                    <div className="ch-bill-items">
                      <span>Shipping Fees</span>
                      <span>&#8377;0</span>
                    </div>
                  </div>
                  <div className="ch-bill-add-btn-pro">
                    <button
                      className="ch-pro-btn"
                      type="submit"
                      onClick={() => {
                        props.showCheckOut();
                      }}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "80px" }}>
            <center>
              <div className="page-title">
                <h1>Shopping Cart is Empty</h1>
              </div>
              <div className="no-cart-empty">
                <p>You have no items in your shopping cart.</p>
                <p>
                  Click <a href="/">here</a> to continue shopping.
                </p>
              </div>
            </center>
            <br />
            <br />
            <br />
          </div>
        )}

        {props.showAdModal && props.custAddress.length && (
          <Modal
            open={props.showAdModal}
            onClose={() => props.showAddressModal()}
          >
            {props.showModalData === "billing" && (
              <div className="address-container-modal">
                <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                  <div className="dash__pad-2">
                    <div className="dash__address-header">
                      <h1 className="dash__h1">Billing Address Book</h1>
                      <div></div>
                    </div>
                  </div>
                </div>

                <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                  <div className="dash__table-2-wrap gl-scroll">
                    {props.otherAddress !== 0 &&
                      props.custAddress.map((thisAddress, index) => {
                        console.log(thisAddress);
                        return (
                          <div className="addrss-details">
                            <ul>
                              <li
                                style={{ fontSize: "14px", fontWeight: "bold" }}
                              >
                                {thisAddress.firstname}&nbsp;
                                {thisAddress.lastname}
                              </li>
                              <span>
                                <li>
                                  {thisAddress.street[0]}&nbsp;
                                  {thisAddress.street[1]}ss
                                </li>
                                <li>
                                  {thisAddress.city}&nbsp;
                                  {thisAddress.country_name}
                                </li>
                                <li style={{ fontWeight: "bold" }}>
                                  {thisAddress.postcode}
                                </li>
                                <li style={{ fontWeight: "bold" }}>
                                  {thisAddress.region.region}
                                </li>
                                <li>{thisAddress.telephone}</li>
                                {thisAddress.default_billing === true && (
                                  <li>Default billing Address</li>
                                )}
                              </span>
                            </ul>
                            {props.changeBillAddLoader &&
                            props.selectAddressBtn === thisAddress.id ? (
                              <div style={{ textAlign: "center" }}>
                                <img
                                  src={loaderRoll}
                                  style={{ height: "30px", width: "30px" }}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <span
                                className="edit-btn"
                                onClick={() =>
                                  props.changeBillingAddress(thisAddress)
                                }
                              >
                                Select
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
            {props.showModalData === "shipping" && (
              <div className="address-container-modal">
                <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                  <div className="dash__pad-2">
                    <div className="dash__address-header">
                      <h1 className="dash__h1">Shipping Address Book</h1>
                      <div></div>
                    </div>
                  </div>
                </div>

                <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
                  <div className="dash__table-2-wrap gl-scroll">
                    {props.otherAddress !== 0 &&
                      props.custAddress.map((thisAddress, index) => {
                        console.log(thisAddress.firstname);
                        return (
                          <div className="addrss-details">
                            <ul>
                              <li
                                style={{ fontSize: "14px", fontWeight: "bold" }}
                              >
                                {thisAddress.firstname}&nbsp;
                                {thisAddress.lastname}
                              </li>
                              <span>
                                <li>
                                  {thisAddress.street[0]}&nbsp;
                                  {thisAddress.street[1]}ss
                                </li>
                                <li>
                                  {thisAddress.city}&nbsp;
                                  {thisAddress.country_name}
                                </li>
                                <li style={{ fontWeight: "bold" }}>
                                  {thisAddress.postcode}
                                </li>
                                <li style={{ fontWeight: "bold" }}>
                                  {thisAddress.region.region}
                                </li>
                                <li>{thisAddress.telephone}</li>
                                {thisAddress.default_shipping === true && (
                                  <li>Default Shipping Address</li>
                                )}
                              </span>
                            </ul>
                            {props.changeShipAddLoader &&
                            props.selectShippAddressBtn === thisAddress.id ? (
                              <div style={{ textAlign: "center" }}>
                                <img
                                  src={loaderRoll}
                                  style={{ height: "30px", width: "30px" }}
                                  alt=""
                                />
                              </div>
                            ) : (
                              <span
                                className="edit-btn"
                                onClick={() =>
                                  props.changeShippingAddress(thisAddress)
                                }
                              >
                                Select
                              </span>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </Modal>
        )}
      </div>
    );
  }
  return (
    <div>
      <div className="" style={{ marginTop: "90px", height: "max-content" }}>
        {props.guestCartData.length !== 0 && props.apiToken === "" ? (
          <div className="">
            <div className="">
              <span className="sh-cart-heading">SHOPPING CART</span>
              <Desktop>
                <div style={{ marginBottom: "100px" }}>
                  <div
                    style={{
                      marginTop: "10px",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    {props.guestCartData.map((thisCart, index) => {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid #5a4744",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="sh-cart-top-desc">
                            <div>
                              <div className="shp-cart-div">
                                <img
                                  className="shp-cart-img"
                                  src={thisCart.image}
                                  alt=""
                                />
                              </div>

                              <span className="sh-cart-qty">
                                Qty:
                                <div style={{ border: "1px solid gray" }}>
                                  <div className="input-counter">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateGuestCart(
                                          thisCart,
                                          "sub",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      -
                                    </span>

                                    <span>{thisCart.qty}</span>

                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateGuestCart(
                                          thisCart,
                                          "add",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <span> {thisCart.name}</span>
                              <span>Size:{thisCart.sku.split("-")[1]}</span>
                              <span>
                                Delivery Date:
                                {moment(
                                  thisCart.custom_attributes.delivery_date
                                ).format("MM/DD/YYYY")}
                              </span>
                              <span>
                                Message:
                                {thisCart.custom_attributes.gift_message}
                              </span>
                              <div className="sh-cart-top-desc">
                                <span
                                  className="editToGift"
                                  onClick={() => props.openEditPopUp(thisCart)}
                                >
                                  <i
                                    className="fas fa-edit"
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  ></i>{" "}
                                  GIFT
                                </span>
                                <span style={{ display: "flex" }}>
                                  Price:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.price}
                                  </p>
                                </span>
                              </div>
                              <div className="sh-cart-price">
                                <span style={{ display: "flex" }}>
                                  Total:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.row_total}
                                  </p>
                                </span>
                                <span
                                  className=""
                                  onClick={() =>
                                    props.removeGuestProduct(thisCart.item_id)
                                  }
                                >
                                  <TrashIcon className="sh-cart-remove" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="sh-place-btn">
                    <button
                      type="button"
                      className="sh-cart-placeorder"
                      onClick={props.showWithoutLogin}
                    >
                      Please login
                    </button>
                  </div>
                </div>
              </Desktop>
              <Mobile>
                <div>
                  <div
                    style={{
                      marginTop: "10px",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    {props.guestCartData.map((thisCart, index) => {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid #5a4744",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="sh-cart-top-desc">
                            <div>
                              <div className="shp-cart-div">
                                <img
                                  className="shp-cart-img"
                                  src={thisCart.image}
                                  alt=""
                                />
                              </div>

                              <span className="sh-cart-qty">
                                Qty:
                                <div style={{ border: "1px solid gray" }}>
                                  <div className="input-counter">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateGuestCart(
                                          thisCart,
                                          "sub",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      -
                                    </span>

                                    <span>{thisCart.qty}</span>

                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateGuestCart(
                                          thisCart,
                                          "add",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <span> {thisCart.name}</span>
                              <span>Size:{thisCart.sku.split("-")[1]}</span>
                              <span>
                                Delivery Date:
                                {moment(
                                  thisCart.custom_attributes.delivery_date
                                ).format("MM/DD/YYYY")}
                              </span>
                              <span>
                                Message:
                                {thisCart.custom_attributes.gift_message}
                              </span>
                              <div className="sh-cart-top-desc">
                                <span
                                  className="editToGift"
                                  onClick={() => props.openEditPopUp(thisCart)}
                                >
                                  <i
                                    className="fas fa-edit"
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  ></i>{" "}
                                  GIFT
                                </span>
                                <span style={{ display: "flex" }}>
                                  Price:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.price}
                                  </p>
                                </span>
                              </div>
                              <div className="sh-cart-price">
                                <span style={{ display: "flex" }}>
                                  Total:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.row_total}
                                  </p>
                                </span>
                                <span
                                  className=""
                                  onClick={() =>
                                    props.removeGuestProduct(thisCart.item_id)
                                  }
                                >
                                  <TrashIcon className="sh-cart-remove" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="sh-place-btn">
                    <button
                      type="button"
                      className="sh-cart-placeorder"
                      onClick={props.showWithoutLogin}
                    >
                      Please login
                    </button>
                  </div>
                </div>
              </Mobile>
              <Tablet>
                <div style={{ marginBottom: "100px" }}>
                  <div
                    style={{
                      marginTop: "10px",
                      color: "black",
                      marginBottom: "10px",
                    }}
                  >
                    {props.guestCartData.map((thisCart, index) => {
                      return (
                        <div
                          style={{
                            borderBottom: "1px solid #5a4744",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="sh-cart-top-desc">
                            <div>
                              <div className="shp-cart-div">
                                <img
                                  className="shp-cart-img"
                                  src={thisCart.image}
                                  alt=""
                                />
                              </div>

                              <span className="sh-cart-qty">
                                Qty:
                                <div style={{ border: "1px solid gray" }}>
                                  <div className="input-counter">
                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateGuestCart(
                                          thisCart,
                                          "sub",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      -
                                    </span>

                                    <span>{thisCart.qty}</span>

                                    <span
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        props.updateGuestCart(
                                          thisCart,
                                          "add",
                                          thisCart.qty
                                        )
                                      }
                                    >
                                      +
                                    </span>
                                  </div>
                                </div>
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                              }}
                            >
                              <span> {thisCart.name}</span>
                              <span>Size:{thisCart.sku.split("-")[1]}</span>
                              <span>
                                Delivery Date:
                                {moment(
                                  thisCart.custom_attributes.delivery_date
                                ).format("MM/DD/YYYY")}
                              </span>
                              <span>
                                Message:
                                {thisCart.custom_attributes.gift_message}
                              </span>
                              <div className="sh-cart-top-desc">
                                <span
                                  className="editToGift"
                                  onClick={() => props.openEditPopUp(thisCart)}
                                >
                                  <i
                                    className="fas fa-edit"
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  ></i>{" "}
                                  GIFT
                                </span>
                                <span style={{ display: "flex" }}>
                                  Price:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.price}
                                  </p>
                                </span>
                              </div>
                              <div className="sh-cart-price">
                                <span style={{ display: "flex" }}>
                                  Total:
                                  <p
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    &#8377;{thisCart.row_total}
                                  </p>
                                </span>
                                <span
                                  className=""
                                  onClick={() =>
                                    props.removeGuestProduct(thisCart.item_id)
                                  }
                                >
                                  <TrashIcon className="sh-cart-remove" />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="sh-place-btn">
                    <button
                      type="button"
                      className="sh-cart-placeorder"
                      onClick={props.showWithoutLogin}
                    >
                      Please login
                    </button>
                  </div>
                </div>
              </Tablet>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "80px" }}>
            <center>
              <div className="page-title">
                <h1>Shopping Cart is Empty</h1>
              </div>
              <div className="no-cart-empty">
                <p>You have no items in your shopping cart.</p>
                <p>
                  Click <a href="/">here</a> to continue shopping.
                </p>
              </div>
            </center>
            <br />
            <br />
            <br />
          </div>
        )}
        <br />
        <br />
      </div>
    </div>
  );
}
