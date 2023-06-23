import React from "react";
import Button from "react-bootstrap/lib/Button";
import _get from "lodash/get";
import moment from "moment";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import MaModal from "../Common/MaterialUIModal.jsx";
// import { Slider, InputNumber } from 'antd';
import calendarImage from "../../assets/images/select-date.png";
//import lazyLoader from '../../assets/svg/loader.gif';
//import circle from '../../assets/svg/circle.svg';
import Image from "react-image-resizer";
import { defaultMergeProps } from "react-redux/lib/connect/mergeProps";
import Phonepay from "../../assets/images1.0/phonepay.png";

export default function MyOrderComponent(props) {
  console.log(props.modeOfPayment);
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
              <div className="col-lg-7 col-md-7 col-xs-7 col-sm-7"></div>
              <div className="col-lg-5 col-md-5 col-xs-5 col-sm-5">
                <div className="row" style={{ marginTop: "15px" }} id="comp">
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>QTY</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>PRICE</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>TOTALS</p>
                  </div>
                </div>
              </div>
            </div>
            {props.totalCartItems.map((thisCart, index) => {
              return (
                <div key={index} className="row" style={{ minHeight: "165px" }}>
                  <div className="col-lg-7 col-md-7 col-xs-7 col-sm-7">
                    <React.Fragment>
                      <div>
                        <div className="row">
                          <div className="col-lg-5 col-md-5 col-xs-5 col-sm-5">
                            <div className="row" style={{ marginLeft: "0px" }}>
                              <div className="col-md-12" id="check">
                                <img
                                  style={{ height: "200px" }}
                                  src={thisCart.image}
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="col-lg-7 col-md-7 col-xs-7 col-sm-7 naming"
                            id="naming"
                            style={{ marginTop: "15px" }}
                          >
                            {thisCart.attribute_set.name !== "Buy Medicine" && (
                              <div>
                                <p
                                  style={{ color: "black", fontWeight: "bold" }}
                                >
                                  {thisCart.name}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  </div>

                  <div
                    className="col-lg-5 col-md-5 col-xs-5 col-sm-5"
                    id="naming"
                  >
                    <div className="row" style={{ marginTop: "25px" }}>
                      <div className="col-md-4">
                        <p style={{ color: "black" }}>{thisCart.qty}</p>
                      </div>
                      <div id="price" className="col-md-4">
                        <p style={{ color: "black" }}>RS {thisCart.price}</p>
                      </div>
                      <div id="pric" className="col-md-4">
                        <p style={{ color: "black" }}>
                          RS {thisCart.row_total}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div>
              <br />
              {/* <div className="row">
                            <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                            
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                            </div> 
                            <div className='col-lg-4 col-md-4 col-xs-4 col-sm-4'>
                                <div className="row">
                                    <div className="col-xs-4"><p style={{color:'black',fontWeight:'600'}}>Sub Total</p></div>
                                    <div className="col-xs-4"></div>
                                                    <div className="col-xs-4"><p style={{color:'black',fontWeight:'600'}}>RS {props.cartDataShow.totals.subtotal}</p></div>
                               </div>
                               <div className="row">
                                    <div className="col-xs-4"><p style={{color:'black'}}>Discount</p></div>
                                    <div className="col-xs-4"></div>
                                    <div className="col-xs-4"><p style={{color:'black'}}>RS {props.cartDataShow.totals.discount}</p></div>
                               </div>
                               <div className="row">
                                    <div className="col-xs-4"><p style={{color:'black'}}>Shipping Fees</p></div>
                                    <div className="col-xs-4"></div>
                                    <div className="col-xs-4"><p style={{color:'black'}}>RS {props.cartDataShow.totals.shipping_amount}</p></div>
                               </div>
                               <div className="row">
                                    <div className="col-xs-4"><p style={{color:'black',fontWeight:'600'}}>Grand Total</p></div>
                                    <div className="col-xs-4"></div>
                                    <div className="col-xs-4"><p style={{color:'black',fontWeight:'600'}}>RS {props.cartDataShow.totals.grand_total}</p></div>
                               </div>
                            </div> 
                         </div> */}
            </div>
          </div>

          <br />

          <div
            id="boxes"
            style={{ border: "2px solid #eaeaea", padding: "15px" }}
          >
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div
                  style={{
                    border: "1px solid #eaeaea",
                    padding: "20px",
                    height: "340px",
                  }}
                >
                  <br />
                  <center>
                    <p style={{ color: "black" }}>SHIPPING ADDRESS</p>
                  </center>
                  <br />
                  <p>
                    NAME :- {props.fields.firstName}&nbsp;
                    {props.fields.lastName}
                  </p>
                  <br />
                  <p>TELEPHONE :- {props.fields.telephone}</p>
                  <br />
                  <p>
                    STREET_ADDRESS :- {props.fields.streetAddress1}&nbsp;
                    {props.fields.streetAddress2}{" "}
                  </p>
                  <br />
                  <p>PINCODE :- {props.fields.postalCode}</p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" id="bil">
                {props.billAddressess !== undefined && (
                  <div
                    style={{
                      border: "1px solid #eaeaea",
                      padding: "20px",
                      height: "340px",
                    }}
                  >
                    <br />
                    <center>
                      <p style={{ color: "black" }}>BILLING ADDRESS</p>
                    </center>
                    <br />
                    <p>
                      NAME :- {props.billAddressess.firstName}&nbsp;
                      {props.billAddressess.lastName}
                    </p>
                    <br />
                    <p>TELEPHONE :- {props.billAddressess.telephone}</p>
                    <br />
                    <p>
                      STREET_ADDRESS :- {props.billAddressess.streetAddress1}
                      &nbsp;{props.billAddressess.streetAddress2}{" "}
                    </p>
                    <br />
                    <p>PINCODE :- {props.billAddressess.postalCode}</p>
                  </div>
                )}
              </div>

              <div id="topboder" className="col-lg-4 col-md-12 ">
                <div className="f-cart__pad-box" style={{ paddingTop: "40px" }}>
                  <div className="u-s-m-b-30">
                    <table className="f-cart__table">
                      <tbody>
                        <tr>
                          <td>SUBTOTAL</td>
                          <td>&#8377;{props.priceData.totals.subtotal}</td>
                        </tr>
                        <tr>
                          <td>SHIPPING</td>
                          <td>
                            &#8377;
                            {props.priceData.totals.shipping_amount}
                          </td>
                        </tr>
                        {props.modeOfPayment === "online" && (
                          <tr>
                            <td>PROMO DISCOUNT</td>
                            <td>
                              &#8377;{props.priceData.totals.discount_amount}
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td>GRAND TOTAL</td>
                          <td>
                            &#8377;
                            {props.priceData.totals.grand_total.toFixed(2)}
                          </td>
                        </tr>
                        {/* {props.modeOfPayment === "online" ?
                                <tr>
                                  <td>{props.translate('GRAND_TOTAL')}</td>
                                  <td>
                                    &#8377;
                                    {props.onlineGrandTotal.toFixed(2)}
                                  </td>
                                </tr>
                                :
                                <tr>
                                <td>{props.translate('GRAND_TOTAL')}</td>
                                <td>
                                  &#8377;
                                  {props.codGrandTotal.toFixed(2)}
                                </td>
                              </tr>
                                } */}
                        <center style={{ marginLeft: "34px" }}>
                          <h5
                            style={{
                              color: "black",
                              fontWeight: "700",
                              fontSize: "13px",
                            }}
                          >
                            MODE OF PAYMENT
                          </h5>
                        </center>
                        <div>
                          <div className="ch-payment-select">
                            <input
                              type="radio"
                              name="online"
                              value="online"
                              checked={props.selectedOption === "online"}
                              onClick={() =>
                                props.paymentMethodChange("online")
                              }
                            />
                            <span>Online</span>
                          </div>
                          <div className="ch-payment-select">
                            <input
                              disabled
                              type="radio"
                              name="gpay"
                              value="gpay"
                              checked={props.selectedOption === "phonepay"}
                              onClick={() =>
                                props.paymentMethodChange("phonepay")
                              }
                            />
                            <img
                              src={Phonepay}
                              alt="Google Pay"
                              className="ch-gpay-icon"
                            />
                          </div>
                          <center style={{ marginLeft: "40px" }}>
                            {props.modeOfPayment}
                          </center>
                        </div>

                        {/* <div className="radio-box newsletter__radio">
                                  <input type="radio" id="online" name="online" 
                                   value="online" 
                                   checked={props.modeOfPayment === "online"} 
                                   onChange={props.onSiteChanged}
                                  />
                                  <div className="radio-box__state radio-box__state--primary">
                                    <label
                                     className="radio-box__label"
                                      for="male"
                                    >
                                      ONLINE
                                    </label>
                                  </div>
                                </div>
                                <br/>
                                <div className="radio-box newsletter__radio">
                                <input type="radio" id="cod" name="cod" 
                                   value="cod" 
                                   checked={props.modeOfPayment === "cod"} 
                                   onChange={props.onSiteChanged}
                                  />
                                  <div class="radio-box__state radio-box__state--primary">
                                    <label
                                      className="radio-box__label"
                                      for="female"
                                    >
                                      CASH ON DELIVERY
                                    </label>
                                  </div>
                                </div> */}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {props.paymentDoneLoader === false ? (
                      <button
                        onClick={props.paymentHandlerSubmit}
                        type="submit"
                        className="login-btn"
                        value="Place Order"
                      >
                        Pay Now
                      </button>
                    ) : (
                      <center>
                        <div class="spinner-border btn--icon"></div>
                      </center>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />

          {/* <div className="row">
                        <div className="col-md-12">
                        {props.paymentDoneLoader !== true ?
                        <center>
                        <input onClick={props.paymentHandler} type="submit" style={{backgroundColor: '#0087b0',color: 'white',width:'170px',height:'35px',borderRadius: '25px',border:'1px solid'}} className="field_bt" value="Pay Now"/>
                        </center>
                        :<center>
                              <img src={lazyLoader} alt="#" style={{height:'60px',width:'60px'}} />
                            </center>}
                        </div>
                    </div> */}

          <br />
          <br />
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
                  ALL ADDRESS
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
                        NO BILLING ADDRESS
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
                        NO SHIPPING ADDRESS
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
                  <h1>NO ADDRESS</h1>
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
                    <p style={{ color: "black" }}>QTY</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>PRICE</p>
                  </div>
                  <div className="col-md-4">
                    <p style={{ color: "black" }}>TOTALS</p>
                  </div>
                </div>
              </div>
            </div>

            {props.guestCartData.map((thisCart, index) => {
              return (
                <div key={index} className="row" style={{ minHeight: "165px" }}>
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
                              DATE OF DELIVERY :{" "}
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
                        SUB TOTAL
                      </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        RS.{props.guestList[0].totals.subtotal}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>DISCOUNT</p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>
                        RS.{props.guestList[0].totals.discount_amount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>SHIPPING FEES</p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black" }}>
                        RS.{props.guestList[0].totals.shipping_amount}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        GRAND TOTAL
                      </p>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      <p style={{ color: "black", fontWeight: "600" }}>
                        RS.{props.guestList[0].totals.grand_total}
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
                      backgroundColor: "#8AB77D",
                      border: "1px solid",
                      borderRadius: "35px",
                      color: "white",
                    }}
                    className=""
                    onClick={props.showWithoutLogin}
                  >
                    PLEASE LOGIN TO PLACE YOUR ORDER
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="page-title">
            <h1>SHOPPING CART IS EMPTY</h1>
          </div>
          <div className="no-cart-empty">
            <p>YOU HAVE NO ITEMS IN YOUR CART</p>
            <p>
              CLICK <a href="/">HERE</a> TO CONTINUE SHOPPING
            </p>
          </div>
        </div>
      )}
      <br />
      <br />
    </div>
  );
}
