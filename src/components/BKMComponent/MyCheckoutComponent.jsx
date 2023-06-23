import React from "react";
import Button from "react-bootstrap/lib/Button";
import _get from "lodash/get";
import { FormComponent, FormContainer } from "react-authorize-net";
import moment from "moment";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import MaModal from "../Common/MaterialUIModal.jsx";
// import { Slider, InputNumber } from 'antd';
import calendarImage from "../../assets/images/select-date.png";
import lazyLoader from "../../assets/img/25.gif";
import circle from "../../assets/img/circle.svg";
import Image from "react-image-resizer";
import { defaultMergeProps } from "react-redux/lib/connect/mergeProps";
//import Visa from "../../assets/img/visa.png";
//import Mastercard from "../../assets/img/mastercard.svg";
//import Amex from "../../assets/img/amex.png";
//import Discover from "../../assets/img/discover.jpg";
//import AuthImage from "../../assets/img/authImage.gif";

export default function MyCheckoutComponent(props) {
  console.log(props);
  let result = [];
  if (props.totalCartItems.length !== 0) {
    // result = _get(props.cartResult.items);
    /// console.log(props.cartResult.items);

    // const subTotal = _get(props.cartResult, [0, 'subtotal']);
    return (
      <div>
        <div className="container">
          <div style={{ border: "2px solid #eaeaea" }}>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>Qty</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>Price</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>Total</p>
                  </div>
                </div>
              </div>
            </div>
            {props.totalCartItems.map((thisCart, index) => {
              return (
                <div
                  key={index}
                  className="row"
                  style={{ minHeight: "165px" }}
                  key={index}
                >
                  <div className="col-lg-5 col-md-5 col-xs-5 col-sm-5">
                    <React.Fragment>
                      <div>
                        <div className="row">
                          <div className="col-lg-5 col-md-5 col-xs-5 col-sm-5">
                            <div className="row" style={{ marginLeft: "0px" }}>
                              <div
                                className="col-md-2"
                                style={{ marginLeft: "0px", marginTop: "56px" }}
                              ></div>
                              <div className="col-md-10">
                                <div
                                  style={{
                                    width: "140px",
                                    height: "140px",
                                    border: "1px solid #eaeaea",
                                  }}
                                >
                                  <img
                                    src={thisCart.image}
                                    style={{ width: "130px", height: "130px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-lg-7 col-md-7 col-xs-7 col-sm-7"
                            style={{ marginTop: "30px" }}
                          >
                            <p style={{ color: "black" }}>{thisCart.name}</p>
                            {/*<center>
                                                      <a style={{color:'#8AB77D',cursor:'pointer'}} onClick={() => props.removeProduct(thisCart.item_id)}>(Remove)</a>
                                                   </center>*/}
                            <p style={{ color: "black" }}>
                              Date of Delivery :{" "}
                              {thisCart.custom_attributes.delivery_date}
                            </p>
                            <p style={{ color: "black" }}>
                              <b>Size</b>:{" "}
                              {thisCart.sku.split("-").pop()}
                            </p>

                            {/* <p className="cart-deli-date">Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p> */}
                            {/* <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p> 
                                                        <div style={{ cursor: 'pointer' }} onClick={() => props.removeProduct(thisCart.item_id)} title='Remove Item'>Delete</div>*/}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </div>

                  <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ marginTop: "25px", marginLeft: "-20px" }}
                      >
                        <span>
                          Gift Message :-
                          {props.cartGift[index].gift_message !== null ? (
                            <span>{props.cartGift[index].gift_message}</span>
                          ) : (
                            <span>No Message</span>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                    <div className="row" style={{ marginTop: "25px" }}>
                      <div className="col-md-4">
                        <p style={{ color: "black" }}>{thisCart.qty}</p>
                      </div>
                      <div className="col-md-4">
                        <p style={{ color: "black" }}>{thisCart.price}</p>
                      </div>
                      <div className="col-md-4">
                        <p style={{ color: "black" }}>{thisCart.row_total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        Sub Total
                      </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        {props.cartDataShow.totals.subtotal}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>
                        Discount
                        {props.cartDataShow.totals.coupon_code !== null && (
                          <span style={{ color: "green", fontSize: "10px" }}>
                            {" "}
                            &nbsp;&nbsp;({
                              props.cartDataShow.totals.coupon_code
                            }{" "}
                            Applied)
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>
                        {props.cartDataShow.totals.discount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>Shipping Fees</p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>
                        {props.cartDataShow.totals.shipping_amount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        Grand Total
                      </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        {props.cartDataShow.totals.grand_total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <br />

          <div style={{ border: "2px solid #eaeaea", padding: "15px" }}>
            {props.cartDataShow.totals.grand_total !== "0.00" ? (
              <div className="row">
                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                  <div
                    style={{
                      border: "1px solid #eaeaea",
                      padding: "20px",
                      height: "445px",
                    }}
                  >
                    <br />
                    <center>
                      <p style={{ color: "black" }}>Shipping Address</p>
                    </center>
                    <br />
                    <p>
                      Name :- {props.fields.firstName}&nbsp;
                      {props.fields.lastName}
                    </p>
                    <br />
                    <p>Telephone :- {props.fields.telephone}</p>
                    <br />
                    <p>
                      Street Address :- {props.fields.streetAddress1}&nbsp;
                      {props.fields.streetAddress2}{" "}
                    </p>
                    <br />
                    <p>
                      State/Country :- {props.fields.city}/{props.fields.region}{" "}
                    </p>
                    <br />
                    <p>Pincode :- {props.fields.postalCode}</p>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <center>
                          <input
                            onClick={() => props.backToCart()}
                            type="submit"
                            style={{
                              backgroundColor: "#ff4500",
                              color: "white",
                              width: "170px",
                              height: "45px",
                              borderRadius: "25px",
                              border: "1px solid",
                              marginTop: "25px",
                            }}
                            className="field_bt"
                            value="Edit Shipping Address"
                          />
                        </center>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                  <div
                    style={{
                      border: "1px solid #eaeaea",
                      padding: "20px",
                      height: "445px",
                    }}
                  >
                    <br />
                    <center>
                      <p style={{ color: "black" }}>Billing Address</p>
                    </center>
                    <br />
                    <p>
                      Name :- {props.fields1.firstName}&nbsp;
                      {props.fields1.lastName}
                    </p>
                    <br />
                    <p>Telephone :- {props.fields1.telephone}</p>
                    <br />
                    <p>
                      Street Address :- {props.fields1.streetAddress1}&nbsp;
                      {props.fields1.streetAddress2}{" "}
                    </p>
                    <br />
                    <p>
                      State/Country :- {props.fields1.city}/
                      {props.fields1.region}{" "}
                    </p>
                    <br />
                    <p>Pincode :- {props.fields1.postalCode}</p>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        <center>
                          <input
                            onClick={() => props.backToCart()}
                            type="submit"
                            style={{
                              backgroundColor: "#ff4500",
                              color: "white",
                              width: "170px",
                              height: "45px",
                              borderRadius: "25px",
                              marginTop: "25px",
                              border: "1px solid",
                            }}
                            className="field_bt"
                            value="Edit Billing Address"
                          />
                        </center>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="col-lg-4 col-md-4 col-xs-4 col-sm-4"
                  id="headerData"
                >
                  <div
                    style={{
                      border: "1px solid #eaeaea",
                      padding: "10px",
                      height: "445px",
                    }}
                  >
                    <br />
                    <div className="fields row" style={{ marginTop: "10px" }}>
                      <div className="col-sm-12">
                        <p style={{ color: "black" }}>Payment Method</p>
                      </div>
                    </div>
                    <br />
                    <div className="lists" style={{ marginTop: "-20px" }}>
                      &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                      <img
                        className={
                          props.cadeImageShow === "visa" ? "" : "filter-grey"
                        }
                        src=""
                        alt="visa icon"
                        style={{ height: "20px", width: "40px" }}
                        loading="lazy"
                      />
                      &nbsp;&nbsp;&nbsp;
                      <img
                        className={
                          props.cadeImageShow === "master" ? "" : "filter-grey"
                        }
                        src=""
                        alt="mastercard icon"
                        style={{ height: "20px", width: "40px" }}
                        loading="lazy"
                      />
                      &nbsp;&nbsp;&nbsp;
                      <img
                        className={
                          props.cadeImageShow === "amex" ? "" : "filter-grey"
                        }
                        src=""
                        alt="AmericanExp icon"
                        style={{ height: "20px", width: "40px" }}
                        loading="lazy"
                      />
                      &nbsp;&nbsp;&nbsp;
                      <img
                        className={
                          props.cadeImageShow === "discover"
                            ? ""
                            : "filter-grey"
                        }
                        src=""
                        alt="Discover"
                        style={{ height: "20px", width: "40px" }}
                        loading="lazy"
                      />
                      &nbsp;&nbsp;&nbsp;
                      <a
                        href="https://verify.authorize.net/anetseal/?pid=0055f4a4-5591-4435-a11a-bce9d707174e&amp;rurl=http://arabellabouquets.com"
                        onmouseover="window.status='http://www.authorize.net/'; return true;"
                        onmouseout="window.status=''; return true;"
                        onclick="window.open('https://verify.authorize.net/anetseal/?pid=0055f4a4-5591-4435-a11a-bce9d707174e&amp;rurl=http://arabellabouquets.com','AuthorizeNetVerification','width=600,height=430,dependent=yes,resizable=yes,scrollbars=yes,menubar=no,toolbar=no,status=no,directories=no,location=yes'); return false;"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <img
                          src={AuthImage}
                          width="50"
                          height="50"
                          border="0"
                          alt="Authorize.Net Merchant - Click to Verify"
                        />
                      </a>
                    </div>
                    <br />

                    <div className="fields row" style={{ marginTop: "10px" }}>
                      <div className="col-sm-4">
                        <p>Card Number</p>
                      </div>
                      <div className="col-sm-8" style={{ marginLeft: "-1px" }}>
                        <input
                          type="text"
                          className={props.errors2.cardNumber ? "redData" : ""}
                          onChange={props.handleChange2}
                          value={props.fields2.cardNumber}
                          name="cardNumber"
                          id="cardNumber"
                          placeholder="Card Number"
                          style={{
                            height: "40px",
                            width: "200px",
                            paddingLeft: "12px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="row" style={{ marginTop: "10px" }}>
                      <div className="col-sm-4">
                        <p>Expiration Date</p>
                      </div>
                      <div className="col-sm-8" style={{ marginLeft: "-1px" }}>
                        <input
                          type="text"
                          onChange={props.handleChange2}
                          value={props.fields2.expirationDate}
                          className={
                            props.errors2.expirationDate ? "redData" : ""
                          }
                          placeholder="MM/YY"
                          name="expirationDate"
                          id="expirationDate"
                          style={{
                            height: "40px",
                            width: "100px",
                            paddingLeft: "12px",
                          }}
                        />
                      </div>
                    </div>
                    <div className="fields row" style={{ marginTop: "10px" }}>
                      <div className="col-sm-4">
                        <p>CVV</p>
                      </div>
                      <div className="col-sm-8" style={{ marginLeft: "-1px" }}>
                        <input
                          type="password"
                          onChange={props.handleChange2}
                          value={props.fields2.cardCode}
                          className={props.errors2.cardCode ? "redData" : ""}
                          name="cardCode"
                          id="cardCode"
                          placeholder="CVV"
                          style={{
                            height: "40px",
                            width: "100px",
                            paddingLeft: "12px",
                          }}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="row" style={{ marginTop: "16px" }}>
                      {props.placeSuccess !== true ? (
                        <center>
                          <input
                            onClick={() => props.placeShoppingOrder()}
                            type="submit"
                            style={{
                              backgroundColor: "#ff4500",
                              color: "white",
                              width: "170px",
                              height: "45px",
                              borderRadius: "25px",
                              border: "1px solid",
                              marginLeft: "85px",
                            }}
                            className="field_bt"
                            value="Place Order"
                          />
                        </center>
                      ) : (
                        <center>
                          <img
                            src={lazyLoader}
                            style={{ height: "60px", width: "60px" }}
                            alt="lazy-loader"
                          />
                        </center>
                      )}
                    </div>
                    <br />
                  </div>
                </div>

                <br />
              </div>
            ) : (
              <div>
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                    <div
                      style={{
                        border: "1px solid #eaeaea",
                        padding: "20px",
                        height: "445px",
                      }}
                    >
                      <br />
                      <center>
                        <p style={{ color: "black" }}>Shipping Address</p>
                      </center>
                      <br />
                      <p>
                        Name :- {props.fields.firstName}&nbsp;
                        {props.fields.lastName}
                      </p>
                      <br />
                      <p>Telephone :- {props.fields.telephone}</p>
                      <br />
                      <p>
                        Street Address :- {props.fields.streetAddress1}&nbsp;
                        {props.fields.streetAddress2}{" "}
                      </p>
                      <br />
                      <p>
                        State/Country :- {props.fields.city}/
                        {props.fields.region}{" "}
                      </p>
                      <br />
                      <p>Pincode :- {props.fields.postalCode}</p>
                      <br />
                      <div className="row">
                        <div className="col-md-12">
                          <center>
                            <input
                              onClick={() => props.backToCart()}
                              type="submit"
                              style={{
                                backgroundColor: "#8AB77D",
                                color: "white",
                                width: "170px",
                                height: "45px",
                                borderRadius: "25px",
                                border: "1px solid",
                              }}
                              className="field_bt"
                              value="Edit Shipping Address"
                            />
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-xs-6 col-sm-6">
                    <div
                      style={{
                        border: "1px solid #eaeaea",
                        padding: "20px",
                        height: "445px",
                      }}
                    >
                      <br />
                      <center>
                        <p style={{ color: "black" }}>Billing Address</p>
                      </center>
                      <br />
                      <p>
                        Name :- {props.fields1.firstName}&nbsp;
                        {props.fields1.lastName}
                      </p>
                      <br />
                      <p>Telephone :- {props.fields1.telephone}</p>
                      <br />
                      <p>
                        Street Address :- {props.fields1.streetAddress1}&nbsp;
                        {props.fields1.streetAddress2}{" "}
                      </p>
                      <br />
                      <p>
                        State/Country :- {props.fields1.city}/
                        {props.fields1.region}{" "}
                      </p>
                      <br />
                      <p>Pincode :- {props.fields1.postalCode}</p>
                      <br />
                      <div className="row">
                        <div className="col-md-12">
                          <center>
                            <input
                              onClick={() => props.backToCart()}
                              type="submit"
                              style={{
                                backgroundColor: "#8AB77D",
                                color: "white",
                                width: "170px",
                                height: "45px",
                                borderRadius: "25px",
                                border: "1px solid",
                              }}
                              className="field_bt"
                              value="Edit Billing Address"
                            />
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                <div className="row" style={{ marginTop: "16px" }}>
                  {props.placeSuccess !== true ? (
                    <center>
                      <input
                        onClick={() => props.placeZeroShoppingOrder()}
                        type="submit"
                        style={{
                          backgroundColor: "#8AB77D",
                          color: "white",
                          width: "170px",
                          height: "45px",
                          borderRadius: "25px",
                          border: "1px solid",
                        }}
                        className="field_bt"
                        value="Place Order"
                      />
                    </center>
                  ) : (
                    <center>
                      <img
                        src={lazyLoader}
                        style={{ height: "60px", width: "60px" }}
                        alt="lazy-loader"
                      />
                    </center>
                  )}
                </div>
                <br />
              </div>
            )}
          </div>
        </div>

        {props.showAdModal && (
          <MaModal
            open={props.showAdModal}
            handleCloseModal={() => props.showAddressModal()}
          >
            <div
              style={{
                backgroundColor: "#8AB77D",
                marginTop: "-20px",
                height: "64px",
              }}
            >
              <center>
                <h3 style={{ color: "white", paddingTop: "20px" }}>
                  All Address
                </h3>
              </center>
            </div>
            <br />
            <br />
            {props.addData !== undefined ? (
              <div>
                <AliceCarousel
                  items={props.addData}
                  responsive={props.responsive}
                  mouseTrackingEnabled={true}
                  onSlideChange={props.onSlideChange}
                  onSlideChanged={props.onSlideChanged}
                />

                <br />
                {props.addTerm !== undefined && props.addTerm === "shipping" ? (
                  <div className="row">
                    {props.shipAddress !== undefined ? (
                      <div className="col-sm-8" style={{ paddingLeft: "30px" }}>
                        {props.shipAddress.firstName}&nbsp;
                        {props.shipAddress.lastName}&nbsp;,
                        {props.shipAddress.company}&nbsp;,
                        {props.shipAddress.telephone}&nbsp;,
                        {props.shipAddress.streetAddress1}&nbsp;,
                        {props.shipAddress.streetAddress2}&nbsp;,
                        {props.shipAddress.city}&nbsp;,{props.shipAddress.state}
                        &nbsp;,
                        {props.shipAddress.postalCode}&nbsp;
                      </div>
                    ) : (
                      <div className="col-sm-8" style={{ paddingLeft: "30px" }}>
                        No Billing Address
                      </div>
                    )}
                    <div className="col-sm-4">
                      <center>
                        <input
                          onClick={() =>
                            props.changeShippingAddress(props.shipAddress)
                          }
                          type="submit"
                          style={{
                            backgroundColor: "#8AB77D",
                            color: "white",
                            width: "200px",
                            height: "45px",
                            borderRadius: "25px",
                            border: "1px solid",
                          }}
                          className="field_bt"
                          value="Update Shipping Address"
                        />
                      </center>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    {props.shipAddress !== undefined ? (
                      <div className="col-sm-8" style={{ paddingLeft: "30px" }}>
                        {props.billAddress.firstName}&nbsp;
                        {props.billAddress.lastName}&nbsp;,
                        {props.billAddress.company}&nbsp;,
                        {props.billAddress.telephone}&nbsp;,
                        {props.billAddress.streetAddress1}&nbsp;,
                        {props.billAddress.streetAddress2}&nbsp;,
                        {props.billAddress.city}&nbsp;,{props.billAddress.state}
                        &nbsp;,
                        {props.billAddress.postalCode}&nbsp;
                      </div>
                    ) : (
                      <div className="col-sm-8" style={{ paddingLeft: "30px" }}>
                        No Shipping Address
                      </div>
                    )}

                    <div className="col-sm-4">
                      <center>
                        <input
                          onClick={() =>
                            props.changeBillingAddress(props.billAddress)
                          }
                          type="submit"
                          style={{
                            backgroundColor: "#8AB77D",
                            color: "white",
                            width: "200px",
                            height: "45px",
                            borderRadius: "25px",
                            border: "1px solid",
                          }}
                          className="field_bt"
                          value="Update Billing Address"
                        />
                      </center>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <center>
                  <h1>No Address Found</h1>
                  <br />
                  <input
                    onClick={() => props.handleAddAddress()}
                    type="submit"
                    style={{
                      backgroundColor: "#8AB77D",
                      color: "white",
                      width: "200px",
                      height: "45px",
                      borderRadius: "25px",
                      border: "1px solid",
                    }}
                    className="field_bt"
                    value="Add New Address"
                  />
                </center>
              </div>
            )}
          </MaModal>
        )}
      </div>
    );
  }
  return (
    <div className="cart-empty col-sm-12">
      {props.guestCartData.length !== 0 && props.apiToken === "" ? (
        <div className="container">
          <div style={{ border: "2px solid #eaeaea" }}>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
              <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>Qty</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>Price</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>Total</p>
                  </div>
                </div>
              </div>
            </div>

            {props.guestCartData.map((thisCart, index) => {
              return (
                <div
                  key={index}
                  className="row"
                  style={{ minHeight: "165px" }}
                  key={index}
                >
                  <div className="col-lg-5 col-md-5 col-xs-5 col-sm-5">
                    <React.Fragment>
                      <div>
                        <div className="row">
                          <div className="col-lg-5 col-md-5 col-xs-5 col-sm-5">
                            <div className="row" style={{ marginLeft: "0px" }}>
                              <div
                                className="col-md-2"
                                style={{ marginLeft: "0px", marginTop: "56px" }}
                              >
                                <a
                                  style={{ cursor: "pointer" }}
                                  onClick={() =>
                                    props.removeGuestProduct(thisCart.item_id)
                                  }
                                >
                                  <img
                                    src={circle}
                                    style={{ height: "20px", width: "20px" }}
                                  />
                                </a>
                              </div>
                              <div className="col-md-10">
                                <div
                                  style={{
                                    width: "140px",
                                    height: "140px",
                                    border: "1px solid #eaeaea",
                                  }}
                                >
                                  <img
                                    src={thisCart.image}
                                    style={{ width: "130px", height: "130px" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-lg-7 col-md-7 col-xs-7 col-sm-7"
                            style={{ marginTop: "30px" }}
                          >
                            <p style={{ color: "black" }}>{thisCart.name}</p>
                            {/*<center>
                                                      <a style={{color:'#8AB77D',cursor:'pointer'}} onClick={() => props.removeProduct(thisCart.item_id)}>(Remove)</a>
                                                   </center>*/}
                            <p style={{ color: "black" }}>
                              Date of Delivery :{" "}
                              {thisCart.custom_attributes.delivery_date}
                            </p>

                            {/* <p className="cart-deli-date">Delivery Date : {moment(thisCart.delivery_date, 'YYYY-MM-DD').format('DD MMM YYYY')}<img className="cart-calendar" src={ calendarImage }></img></p> */}
                            {/* <p className="cart-deli">Delivery Method : {thisCart.delivery_method}</p> 
                                                        <div style={{ cursor: 'pointer' }} onClick={() => props.removeProduct(thisCart.item_id)} title='Remove Item'>Delete</div>*/}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </div>

                  <div className="col-lg-3 col-md-3 col-xs-3 col-sm-3">
                    <div className="row">
                      <div
                        className="col-md-12"
                        style={{ marginTop: "25px", marginLeft: "-20px" }}
                      >
                        <textarea
                          style={{ padding: "15px" }}
                          placeholder="Message"
                          rows={2}
                          cols={25}
                        />
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                    <div className="row" style={{ marginTop: "25px" }}>
                      <div className="col-md-4">
                        <p style={{ color: "black" }}>
                          {" "}
                          <div className="cart-info quantity">
                            <div
                              className="btn-increment-decrement"
                              onClick={() =>
                                props.updateGuestCart(
                                  thisCart,
                                  "sub",
                                  thisCart.qty
                                )
                              }
                            >
                              -
                            </div>
                            <input
                              className="input-quantity"
                              id="input-quantity-wristWear03"
                              value={thisCart.qty}
                            />
                            <div
                              className="btn-increment-increment"
                              onClick={() =>
                                props.updateGuestCart(
                                  thisCart,
                                  "add",
                                  thisCart.qty
                                )
                              }
                            >
                              +
                            </div>
                          </div>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p style={{ color: "black" }}>{thisCart.price}</p>
                      </div>
                      <div className="col-md-4">
                        <p style={{ color: "black" }}>{thisCart.row_total}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4"></div>
                <div className="col-lg-4 col-md-4 col-xs-4 col-sm-4">
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        Sub Total
                      </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        {props.guestList[0].totals.subtotal}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>Discount</p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>
                        {props.guestList[0].totals.discount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>Shipping Fees</p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>
                        {props.guestList[0].totals.shipping_amount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        Grand Total
                      </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        {props.guestList[0].totals.grand_total}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>

          <br />
          <div>
            <div className="row">
              <div className="col-md-12">
                <center>
                  <button
                    type="button"
                    style={{
                      height: "60px",
                      width: "250px",
                      backgroundColor: "#A87048",
                      border: "1px solid",
                      borderRadius: "35px",
                      color: "white",
                    }}
                    className=""
                    onClick={props.showWithoutLogin}
                  >
                    Please login to place your Order
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: "100px",marginTop:"80px" }}>
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
      <br /> <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
