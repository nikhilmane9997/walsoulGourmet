import React, { useEffect, useState } from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import StarRatings from "react-star-ratings";
import ReactImageZoom from "react-image-zoom";
import SimpleImageSlider from "react-simple-image-slider";

import {
  ButtonBack,
  ButtonFirst,
  ButtonLast,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
  ImageWithZoom,
  Dot,
  DotGroup,
} from "pure-react-carousel";
import s from "pure-react-carousel/dist/react-carousel.es.css";
import Zoom from "react-img-zoom";
import Image from "react-image-resizer";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Datetime from "react-datetime";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import MetaTags from "react-meta-tags";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "../../assets/stylesheets/DatePickerReact.css";
import MaModal from "../Common/MaterialUIModal.jsx";
import MaModalFull from "../Common/MaterialUIModalFullScreen.jsx";
import MaModalOne from "../Common/MaterialUIModalOne.jsx";
import ReviewComponent from "../ProductComponent/reviewComponent.jsx";
import lazyLoader from "../../assets/img/Rolling.gif";
import verticalLoader from "../../assets/img/verticalLoader.gif";
import logo from "../../assets/img/logo.png";
import { configConsumerProps } from "antd/lib/config-provider";
import { concat, isUndefined } from "lodash";
import { Input, TextField } from "@material-ui/core";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

function getSecondPart(text) {
  return text.split("-")[1];
}
function getSecondPartSku(text) {
  return text.split("-")[1];
}
export default function ProductDetailComponent(props) {
  const [showPackage, setShowPackage] = useState(false);
  const [selectSize, setSelectSize] = useState(false);
  const [glassBtn, setGlassBtn] = useState("");
  const [petBtn, setPetBtn] = useState(false);
  const [packageData, setPackageData] = useState("");
  const [defaultImgSrc, setDefaultImgSrc] = useState("");

  useEffect(() => {
    if (props.productDetails.children_products[0].name.includes("Oil")) {
      setPackageData("Glass");
    }
    setDefaultImgSrc(props.productDetails.images[0]);
    props.defaultDates(props.productDetails.children_products[0].sku);
  }, []);
  const defaultImages = (imgSrc) => {
    setDefaultImgSrc(imgSrc);
  };
  const textSplitBold = (text) => {
    return text.split(":")[0];
  };
  const textDescPlane = (text) => {
    return text.split(":")[1];
  };
  const handleGlass = () => {
    setGlassBtn(true), setPetBtn(false), setPackageData("Glass");
  };
  const handlePet = () => {
    setGlassBtn(false), setPetBtn(true), setPackageData("Pet");
  };
  let arr = [];
  for (var i = 0; i < props.productReviewData.length; i++) {
    if (
      arr.length <= 3 &&
      props.productReviewData[i].ratings.length != 0 &&
      props.productReviewData[i].ratings[0].value === 5
    ) {
      arr.push(props.productReviewData[i]);
    }
  }

  const wid = document.querySelector("prod-det-img");
  console.log(">>>>>>", props);
  if (props.productDetails) {
    return (
      <div
        style={{
          display: "flex",
          height: "max-content",
          flexDirection: "column",
        }}
      >
        <div className="product-detail-container">
          {/*====== Section 1 ======-->*/}
          <div className="u-s-p-t-90">
            <div style={{ marginLeft: "25px", marginRight: "45px" }}>
              <div className="product-row">
                <div className="col-lg-7">
                  {/*====== Product Breadcrumb ======-->*/}
                  <div className="pd-breadcrumb u-s-m-b-30 crumb30">
                    <ul className="pd-breadcrumb__list">
                      <li className="has-separator">
                        <a href="/">Home</a>
                      </li>

                      <li className="is-marked">
                        <a>{props.productDetails.name}</a>
                      </li>
                    </ul>
                  </div>
                  {/*======  End - Product Breadcrumb ======-->*/}

                  {/*======  Product Detail Zoom ======-->*/}

                  <div className="row">
                    <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2">
                      <div className="">
                        <ul className="img_dott1">
                          {props.sideImages.length !== 0
                            ? props.sideImages.map((contact, id) => (
                                <li
                                  className="liscroll"
                                  style={{ marginBottom: "15px" }}
                                  key={id}
                                >
                                  <img
                                    src={contact}
                                    onClick={() =>
                                      props.handleMouseEnter(contact)
                                    }
                                    style={{
                                      height: "75px",
                                      width: "75px",
                                      border: "1px solid #cdcdcd",
                                    }}
                                  />
                                  &nbsp;&nbsp;
                                </li>
                              ))
                            : props.productDetails.images.map((contact, id) => (
                                <li
                                  className="liscroll"
                                  style={{ marginBottom: "15px" }}
                                  key={id}
                                >
                                  <img
                                    src={contact}
                                    onClick={() => {
                                      defaultImages(contact);
                                    }}
                                    style={{
                                      height: "75px",
                                      width: "75px",
                                      border: "1px solid #cdcdcd",
                                    }}
                                  />
                                  &nbsp;&nbsp;
                                </li>
                              ))}
                        </ul>
                      </div>
                    </div>

                    <div className="col-xl-9 col-lg-9 col-md-10 col-12">
                      <div id="img-zm2">
                        <div className="img--zoom1" id="zoom3">
                          {props.sideImages.length !== 0
                            ? props.sideImages.map((contact, id) => {
                                if (contact === props.imageSrc) {
                                  return (
                                    <div key={id} className="zoom-product-img">
                                      <Zoom
                                        img={props.imageSrc}
                                        zoomScale={3}
                                        height={500}
                                        width={500}
                                      />
                                    </div>
                                  );
                                }
                              })
                            : props.productDetails.length !== 0 &&
                              props.productDetails.images.map((contact, id) => {
                                if (contact === defaultImgSrc) {
                                  return (
                                    <div key={id} className="zoom-product-img">
                                      <Zoom
                                        img={defaultImgSrc}
                                        zoomScale={3}
                                        height={500}
                                        width={500}
                                      />
                                    </div>
                                  );
                                }
                              })}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        marginLeft: "10px",
                        marginTop: "0px",
                        height: "185px",
                      }}
                    >
                      <div className="cust-sec">
                        <span className="cust-rat">Customer Reviews</span>
                        {props.totatlReviewCount !== undefined &&
                          props.productReviewData.length !== 0 && (
                            <span
                              href="#cust-rev"
                              style={{ color: "#6464fb", cursor: "pointer" }}
                              onClick={() => props.toggleAllReviewModalFn()}
                            >
                              See All Reviews
                            </span>
                          )}
                      </div>

                      {props.productDetails !== undefined && (
                        <div className="ratring-bar-container">
                          <div className="index-flexRow index-ratingBarContainer">
                            <div className="index-rating">
                              <span className="index-ratingLevel">5</span>
                              <i
                                className="fas fa-star"
                                style={{ color: "gold" }}
                              ></i>
                            </div>
                            <progress
                              min="0"
                              max="100"
                              value={
                                props.productDetails.rating_details[0]
                                  .new_rating[4].percent
                              }
                              data-rating="5"
                            ></progress>

                            <div className="index-count">
                              {Math.round(
                                props.productDetails.rating_details[0]
                                  .new_rating[4].percent
                              )}
                              %
                            </div>
                          </div>
                          <div className="index-flexRow index-ratingBarContainer">
                            <div className="index-rating">
                              <span className="index-ratingLevel">4</span>
                              <i
                                className="fas fa-star"
                                style={{ color: "gold" }}
                              ></i>
                            </div>

                            <progress
                              min="0"
                              max="100"
                              value={
                                props.productDetails.rating_details[0]
                                  .new_rating[3].percent
                              }
                              data-rating="4"
                            ></progress>

                            <div className="index-count">
                              {Math.round(
                                props.productDetails.rating_details[0]
                                  .new_rating[3].percent
                              )}
                              %
                            </div>
                          </div>
                          <div className="index-flexRow index-ratingBarContainer">
                            <div className="index-rating">
                              <span className="index-ratingLevel">3</span>
                              <i
                                className="fas fa-star"
                                style={{ color: "gold" }}
                              ></i>
                            </div>

                            <progress
                              min="0"
                              max="100"
                              value={
                                props.productDetails.rating_details[0]
                                  .new_rating[2].percent
                              }
                              data-rating="3"
                            ></progress>

                            <div className="index-count">
                              {Math.round(
                                props.productDetails.rating_details[0]
                                  .new_rating[2].percent
                              )}
                              %
                            </div>
                          </div>
                          <div className="index-flexRow index-ratingBarContainer">
                            <div className="index-rating">
                              <span className="index-ratingLevel">2</span>
                              <i
                                className="fas fa-star"
                                style={{ color: "gold" }}
                              ></i>
                            </div>

                            <progress
                              min="0"
                              max="100"
                              value={
                                props.productDetails.rating_details[0]
                                  .new_rating[1].percent
                              }
                              data-rating="2"
                            ></progress>

                            <div className="index-count">
                              {Math.round(
                                props.productDetails.rating_details[0]
                                  .new_rating[1].percent
                              )}
                              %
                            </div>
                          </div>
                          <div className="index-flexRow index-ratingBarContainer">
                            <div className="index-rating">
                              <span className="index-ratingLevel">1</span>
                              <i
                                className="fas fa-star"
                                style={{ color: "gold" }}
                              ></i>
                            </div>

                            <progress
                              min="0"
                              max="100"
                              value={
                                props.productDetails.rating_details[0]
                                  .new_rating[0].percent
                              }
                              data-rating="1"
                            ></progress>

                            <div className="index-count">
                              {Math.round(
                                props.productDetails.rating_details[0]
                                  .new_rating[0].percent
                              )}
                              %
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    {/*<div className="col-xl-1 col-lg-1 col-md-2 col-sm-2">
                          </div> */}
                  </div>
                  {props.showAllReviewModal && (
                    <div
                      id="cust-rev"
                      style={{ display: "flex", height: "max-content" }}
                    >
                      <div className="product-reviewmodal-section">
                        <div className="cus-review-container">
                          <span className="cust-rat">Customer Reviews</span>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                            onClick={() => props.toggleAllReviewModalFn()}
                          >
                            <span className="close-btn"> Close</span>
                          </div>
                        </div>
                        <div className="review-full-items">
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "5px",
                              color: "black",
                              fontWeight: "bold",
                              columnGap: "40px",
                            }}
                          ></span>
                          {props.productReviewData !== "" &&
                            props.productReviewData.map((val, id) => {
                              if (val.ratings.length != 0) {
                                return (
                                  <div
                                    key={id}
                                    className="product-review"
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      style={{
                                        borderBottom: "1px outset",

                                        minHeight: "50px",

                                        marginTop: "10px",
                                      }}
                                    >
                                      <div style={{ marginLeft: "10px" }}>
                                        <div
                                          style={{
                                            display: "flex",
                                            columnGap: "20px",
                                            alignItems: "center",
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontWeight: "bold",
                                              textTransform: "capitalize",
                                            }}
                                          >
                                            {val.nickname}
                                          </span>
                                          <span className="rating-star">
                                            {[...Array(5)].map((_, id) => {
                                              if (id <= 4) {
                                                return (
                                                  <span key={id}>
                                                    <svg
                                                      key={id}
                                                      aria-hidden="true"
                                                      className={
                                                        val.ratings.length !=
                                                          0 &&
                                                        val.ratings[0].value <=
                                                          id
                                                          ? "rating-stars-gray"
                                                          : "raing-stars"
                                                      }
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
                                          </span>
                                        </div>
                                        <span
                                          style={{
                                            display: "flex",
                                            width: "80%",
                                          }}
                                        >
                                          {val.detail}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                        </div>
                      </div>
                    </div>
                  )}
                  {/*------End - Product Detail Zoom----*/}
                </div>
                <div className="col-lg-5" id="col_pddetail">
                  {/*------Product Right Side Details----*/}
                  <div className="pd-detail" id="pdd-ddetail">
                    <div>
                      <span className="pd-detail__name">
                        {props.productDetails.name}
                      </span>
                    </div>
                    <div>
                      {/* <div className="index-overallRatingContainer">
                      <div className="index-overallRating">
                        <div>
                          {props.productDetails.rating_details[0].avgRating}
                        </div>
                        <span className="myntraweb-sprite index-starIcon index-productRatingsGoodIcon sprites-productRatingsGoodIcon"></span>
                        <div className="index-separator-data">|</div>
                        <div className="index-ratingsCount">
                          {props.productDetails.rating_details[0].global_review}{" "}
                          Ratings
                        </div>
                      </div>
                    </div> */}
                    </div>
                    <div>
                      <div className="pd-detail__inline">
                        <span className="pd-detail__price">
                          &#8377;
                          {props.prodChildData === undefined
                            ? props.productDetails.children_products[0]
                                .final_price
                            : props.prodChildData.final_price}
                        </span>
                        <span
                          className={
                            props.productDetails.special_price -
                              props.productDetails.final_price !==
                              0 && "product-discountPercentage"
                          }
                        >
                          (
                          {props.prodChildData === undefined
                            ? props.productDetails.children_products[0]
                                .special_price !== 0
                              ? Math.round(
                                  ((props.productDetails.children_products[0]
                                    .special_price -
                                    props.productDetails.children_products[0]
                                      .final_price) /
                                    props.productDetails.children_products[0]
                                      .special_price) *
                                    100
                                )
                              : 0
                            : props.prodChildData.special_price !== 0
                            ? Math.round(
                                ((props.prodChildData.special_price -
                                  props.prodChildData.final_price) /
                                  props.prodChildData.special_price) *
                                  100
                              )
                            : 0}
                          {}% OFF)
                        </span>
                        <span
                          className={
                            props.productDetails.special_price -
                              props.productDetails.final_price !==
                              0 && "product-strike"
                          }
                        >
                          &#8377;
                          {props.prodChildData === undefined
                            ? props.productDetails.children_products[0]
                                .special_price
                            : props.prodChildData.special_price}
                        </span>
                        {props.totatlReviewCount !== undefined &&
                          props.productReviewData.length !== 0 && (
                            <span
                              style={{ color: "#6464fb", cursor: "pointer" }}
                              onClick={() => props.toggleAllReviewModalFn()}
                            >
                              See All Reviews
                            </span>
                          )}
                      </div>
                      <span className="rating-star">
                        {[...Array(5)].map((_, id) => {
                          if (id <= 4) {
                            return (
                              <span key={id}>
                                <svg
                                  key={id}
                                  aria-hidden="true"
                                  className={
                                    Math.round(
                                      props.productDetails.rating_details[0]
                                        .avgRating
                                    ) != 0 &&
                                    id <
                                      Math.round(
                                        props.productDetails.rating_details[0]
                                          .avgRating
                                      )
                                      ? "raing-stars"
                                      : " rating-stars-gray"
                                  }
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

                        <span>({props.totatlReviewCount || 0})</span>
                        {/* <span>
                        {Math.round(
                          props.productDetails.rating_details[0].global_percent
                        )}
                        %
                      </span> */}
                      </span>
                    </div>
                    <span className="inclusive-text">
                      inclusive of all taxes
                    </span>
                    {props.productDetails.children_products[0].name.includes(
                      "Oil"
                    ) && (
                      <div style={{ display: "flex", columnGap: "10px" }}>
                        <span>Package:</span>
                        <button
                          className={
                            glassBtn || glassBtn === ""
                              ? "product-package-selected"
                              : "product-package-default"
                          }
                          onClick={() => {
                            handleGlass();
                          }}
                        >
                          Glass
                        </button>
                        <button
                          className={
                            petBtn
                              ? "product-package-selected"
                              : "product-package-default"
                          }
                          onClick={() => {
                            handlePet();
                          }}
                        >
                          Pet
                        </button>
                      </div>
                    )}

                    <div className="u-s-m-b-15">
                      <div className="pd-detail__form">
                        {/* <div className="u-s-m-b-15">

                                            <span className="pd-detail__label u-s-m-b-8">Color:</span>
                                            <div className="pd-detail__color">
                                                <div className="color__radio">

                                                    <input type="radio" id="jet" name="color" checked/>

                                                    <label className="color__radio-label" for="jet" style={{backgroundColor: '#333333'}}></label></div>
                                                <div className="color__radio">

                                                    <input type="radio" id="folly" name="color"/>

                                                    <label className="color__radio-label" for="folly" style={{backgroundColor: '#FF0055'}}></label></div>
                                                <div className="color__radio">

                                                    <input type="radio" id="yellow" name="color"/>

                                                    <label className="color__radio-label" for="yellow" style={{backgroundColor: '#FFFF00'}}></label></div>
                                                <div className="color__radio">

                                                    <input type="radio" id="granite-gray" name="color"/>

                                                    <label className="color__radio-label" for="granite-gray" style={{backgroundColor: '#605F5E'}}></label></div>
                                                <div className="color__radio">

                                                    <input type="radio" id="space-cadet" name="color"/>

                                                    <label className="color__radio-label" for="space-cadet" style={{backgroundColor: '#1D3461'}}></label></div>
                                            </div>
                                        </div> */}
                        {/* <div className="u-s-m-b-15">

                                            <span className="pd-detail__label u-s-m-b-8">Size:</span>

                                        <div className="size-buttons-size-buttons"> 
                                            {props.productDetails.map((contact) => (
                                                <div className="size-buttons-tipAndBtnContainer">
                                                    <div className="size-buttons-buttonContainer">
                                                       {contact.qty !== 0 ?
                                                        <button onClick={() => props.sizeSelectData(contact)} className={props.prodChildSku === contact.sku ? "size-selected size-buttons-size-button size-buttons-size-button-default":"size-buttons-size-button size-buttons-size-button-default"}>
                                                                <span className="size-buttons-size-strike-hide">
                                                                </span>
                                                                <p className="size-buttons-unified-size">{contact.size}</p>
                                                        </button>
                                                        :
                                                        <button className="size-buttons-size-button size-buttons-size-button-default" style={{backgroundColor:'lightgrey'}}>
                                                                <span className="size-buttons-size-strike-hide">
                                                                </span>
                                                                <p className="size-buttons-unified-size">{contact.size}</p>
                                                        </button>
                                                         } 
                                                        {contact.qty < 5 ?
                                                        <span className={contact.qty === 0 ? "bar-not-display size-buttons-inventory-left":"size-buttons-inventory-left"} style={{bottom: '-1px'}}>
                                                            {contact.qty} Left
                                                        </span>
                                                        :<span></span>}
                                                    </div>
                                                </div>
                                            ))}
                                          </div>   



                                        </div>*/}
                        <div className="u-s-m-b-15">
                          <span className="pd-detail__label u-s-m-b-8">
                            SIZE:
                            <div className="size-buttons-size-buttons">
                              {props.productDetails.children_products.map(
                                (contact, id) => (
                                  <div
                                    className={
                                      !!contact.name.includes(packageData)
                                        ? "size-buttons-tipAndBtnContainer"
                                        : "disabled-btn"
                                    }
                                    key={id}
                                    disabled={
                                      !contact.name.includes(packageData)
                                    }
                                  >
                                    <div
                                      className={
                                        !!contact.name.includes(packageData)
                                          ? "size-buttons-buttonContainer"
                                          : "disabled-btn"
                                      }
                                    >
                                      {contact.qty !== 0 ? (
                                        <button
                                          disabled={
                                            !contact.name.includes(packageData)
                                          }
                                          onClick={(e) => {
                                            e.preventDefault();
                                            props.sizeSelectData(contact);
                                            props.sideImageSelection(contact);
                                            setSelectSize(true);
                                          }}
                                          className={
                                            !!contact.name.includes(packageData)
                                              ? (props.prodChildSku ===
                                                  undefined &&
                                                  props.productDetails
                                                    .children_products[0]
                                                    .sku === contact.sku) ||
                                                props.prodChildSku ===
                                                  contact.sku
                                                ? "size-selected size-buttons-size-button size-buttons-size-button-default"
                                                : "size-buttons-size-button size-buttons-size-button-default"
                                              : "disabled-btn"
                                          }
                                        >
                                          <span className="size-buttons-size-strike-hide"></span>
                                          <p
                                            className={
                                              (props.prodChildSku ===
                                                undefined &&
                                                props.productDetails
                                                  .children_products[0].sku ===
                                                  contact.sku) ||
                                              props.prodChildSku === contact.sku
                                                ? "size-buttons-unified-size1"
                                                : "size-buttons-unified-size"
                                            }
                                          >
                                            {getSecondPart(contact.name)}
                                          </p>
                                        </button>
                                      ) : (
                                        <button
                                          className={
                                            "size-buttons-size-button size-buttons-size-button-default"
                                          }
                                          style={{
                                            backgroundColor: "lightgrey",
                                          }}
                                        >
                                          <span className="size-buttons-size-strike-hide"></span>
                                          <p className="size-buttons-unified-size">
                                            {getSecondPartSku(contact.sku)}
                                          </p>
                                        </button>
                                      )}
                                      {contact.qty < 5 ? (
                                        <span
                                          className={
                                            contact.qty === 0
                                              ? "bar-not-display size-buttons-inventory-left"
                                              : "size-buttons-inventory-left"
                                          }
                                          style={{ bottom: "-1px" }}
                                        >
                                          {contact.qty} Left
                                        </span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </span>
                        </div>
                        <div className="pd-detail-inline-2">
                          {/* <div className="u-s-m-b-15 pd_dt_15">
                            
                            <div className="input-counter">
                              <a onClick={props.DecreaseItem}>
                                <span className="input-counter__minus fas fa-minus"></span>
                              </a>

                              <input
                                className="input-counter__text input-counter--text-primary-style"
                                type="text"
                                defaultValue={props.valueData}
                                data-min="1"
                                data-max="10"
                                value={props.valueData}
                              />

                              <a onClick={props.IncreaseItem}>
                                <span className="input-counter__plus fas fa-plus"></span>
                              </a>
                            </div>
                          </div> */}
                          {/*======  - Input Counter ======*/}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <div className="prod-qty">
                              <a onClick={props.DecreaseItem}>
                                <span className=" fas fa-minus"></span>
                              </a>

                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                {props.valueData || props.valueData}
                              </span>
                              <a onClick={props.IncreaseItem}>
                                <span className=" fas fa-plus"></span>
                              </a>
                            </div>
                            {props.cartLoader === true ? (
                              <img
                                src={lazyLoader}
                                alt="#"
                                style={{ height: "50px", width: "50px" }}
                              />
                            ) : props.deliveryStatus === "" &&
                              props.deliveryStatus === false ? (
                              <span className="out-stock">Out Of Stock</span>
                            ) : (
                              <button
                                className="btn btn--e-brand-shadow"
                                onClick={props.addProductToCart}
                              >
                                <i className="fas fa-shopping-bag"></i>
                                &nbsp;&nbsp;&nbsp;Add To Cart
                              </button>
                            )}
                          </div>
                          {/* <div className="u-s-m-b-15 detl_b15" id="qty_detl">
                            {props.deliveryStatus !== "" &&
                            props.deliveryStatus === true ? (
                              <button
                                className="btn btn--e-brand-shadow"
                                onClick={props.addProductToCart}
                              >
                                <i className="fas fa-shopping-bag"></i>
                                &nbsp;&nbsp;&nbsp;Add To Cart
                              </button>
                            ) : (
                              <button
                                className="btn btn--e-brand-shadow brnd_shdw"
                                disabled
                              >
                                <i className="fas fa-shopping-bag"></i>
                                &nbsp;&nbsp;&nbsp;Add to Cart
                              </button>
                            )}
                            &nbsp;&nbsp;&nbsp;
                            {props.cartLoader === true && (
                              <img
                                src={lazyLoader}
                                alt="#"
                                style={{ height: "50px", width: "50px" }}
                              />
                            )}
                          </div> */}
                        </div>
                      </div>
                    </div>

                    {/* <div className="u-s-m-b-15">
                    <h4 style={{ fontWeight: "600" }}>
                      Delivery Options&nbsp;&nbsp;&nbsp;
                      <i className="fas fa-truck"></i>
                      <span className="free-shp"> Free Shipping</span>
                    </h4>

                    <div className="Address-switcher-container">
                      <div className="Address-address-box Address-pincode-input Address-pdp-box">
                        <Input
                          type="number"
                          inputProps={{
                            maxLength: 6,
                          }}
                          disableUnderline={true}
                          className="MuiInputBase-input"
                          name="zipCodeData"
                          id="zipCodeData"
                          placeholder="Enter a PIN code"
                          onInput={(e) => {
                            e.target.value = Math.max(
                              0,
                              parseInt(e.target.value)
                            )
                              .toString()
                              .slice(0, 6);
                          }}
                          defaultValue={props.zipCodeData}
                          onChange={props.handleChangeZip}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            selectSize
                              ? props.changeZipCode()
                              : toast.error("Please Select Size");
                          }}
                          type="submit"
                          className="Address-address-button check-btn"
                        >
                          CHECK
                        </button>
                      </div>
                      <div>
                        {props.deliveryStatus === true &&
                        props.deliveryStatus !== undefined ? (
                          <span style={{ color: "#0c7c3e" }}>
                            Delivery Available
                          </span>
                        ) : (
                          <div>
                            <span style={{ color: "red" }}>
                              Delivery Not Available
                            </span>
                            <p className="pincode-enterPincode">
                              Please enter PIN code to check delivery time &amp;
                              Pay on Delivery Availability
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div> */}

                    {/* <div className="u-s-m-b-15">
                                    <h4 style={{fontWeight:'600'}}>Product Details&nbsp;&nbsp;&nbsp;<i className="fas fa-truck"></i></h4>
                                      -----* <p dangerouslySetInnerHTML={props.createMarkup(props.productDetails.short_description)}></p> *-------
                                      {props.productDetails.description.split("\r\n").map((i,key) => {
                                       return <span className="meta-desc" key={key}>{i}<br/></span>;
                                    })}
                                </div> */}
                    {/* {props.productDetails.custom_fields[18].value !== false &&
                                <div className="u-s-m-b-15">
                                    <h4 style={{fontWeight:'600'}}>Size & Fit</h4>
                                    <span>{props.productDetails.custom_fields[26].value}</span>
                                     
                                </div>
                                 } 
                                 {props.productDetails.custom_fields[27].value !== false &&
                                <div className="u-s-m-b-15">
                                    <h4 style={{fontWeight:'600'}}>Material & Core</h4>
                                    <span>{props.productDetails.custom_fields[27].value}</span>
                                     
                                </div>
                                 } 
                                 <div className="u-s-m-b-15">
                                    <h4 style={{fontWeight:'600'}}>Specifications</h4>
                                    <div className="index-tableContainer">
                                       {props.productDetails.custom_fields[25].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Fabric</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[25].value}</div>
                                        </div>
                                         }
                                        {props.productDetails.custom_fields[22].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Pattern</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[22].value}</div>
                                        </div>
                                         }
                                         {props.productDetails.custom_fields[21].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Sleve Length</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[22].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[5].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Wash Care</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[5].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[19].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Neck</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[19].value}</div>
                                        </div>
                                         }
                                        {props.productDetails.custom_fields[24].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Sleeve Styling</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[24].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[23].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Fabric Purity</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[23].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[20].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Colour Family</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[20].value}</div>
                                        </div>
                                         }
                                         {props.productDetails.custom_fields[18].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Shape</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[18].value}</div>
                                        </div>
                                         }
                                        {props.productDetails.custom_fields[17].value !== null &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Length</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[17].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[16].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Design Styling</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[16].value}</div>
                                        </div>
                                         }
                                           {props.productDetails.custom_fields[15].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Fashion Type</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[15].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[14].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Print Or Pattern Type</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[14].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[13].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Season</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[13].value}</div>
                                        </div>
                                         }
                                         {props.productDetails.custom_fields[12].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Usage</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[12].value}</div>
                                        </div>
                                         }
                                         {props.productDetails.custom_fields[11].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Weave Pattern</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[11].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[10].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Slit Detail</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[10].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[8].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Age Group</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[8].value}</div>
                                        </div>
                                         }
                                           {props.productDetails.custom_fields[7].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Stitch</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[7].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[6].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Hemline</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[6].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[5].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Wash care</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[5].value}</div>
                                        </div>
                                         }
                                          {props.productDetails.custom_fields[4].value !== false &&
                                        <div className="index-row">
                                            <div className="index-rowKey">Weave Type</div>
                                            <div className="index-rowValue">{props.productDetails.custom_fields[4].value}</div>
                                        </div>
                                         }
                                    </div>
                                     
                                </div>*/}

                    {/* product ratings */}
                    <div className="u-s-m-b-15 indx_flex15">
                      <div className="row" id="btn_e_row">
                        <div className="col-md-12" id="btn_e_col">
                          <div className="other-details-sec">
                            <ul className="cust-rat">Other Details</ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                {props.otherDetails[0].lable === "threshold" &&
                                  "Flavor"}
                                <p>:</p>
                              </li>
                              <li style={{ fontWeight: "bold" }}>
                                {props.otherDetails[0].value}
                              </li>
                            </ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                Use by
                                <p>:</p>
                              </li>
                              <li style={{ fontWeight: "bold" }}>
                                {props.otherDetails[1].value}
                              </li>
                            </ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                Box Color
                                <p>:</p>
                              </li>
                              <li style={{ fontWeight: "bold" }}>
                                {props.otherDetails[2].value}
                              </li>
                            </ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                {props.otherDetails[3].lable}
                                <p>:</p>
                              </li>
                              <li style={{ fontWeight: "bold" }}>
                                {props.otherDetails[3].value}
                              </li>
                            </ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                Weight
                                <p>:</p>
                              </li>
                              <li style={{ fontWeight: "bold" }}>
                                {props.prodChildData === undefined
                                  ? `${props.productDetails.children_products[0].weight}`
                                  : `${props.prodChildData.weight}`}
                                &nbsp;kgs
                              </li>
                            </ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                No of items
                                <p>:</p>
                              </li>
                              <li style={{ fontWeight: "bold" }}>
                                {props.otherDetails[6].value}
                              </li>
                            </ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                form
                                <p>:</p>
                              </li>
                              <li style={{ fontWeight: "bold" }}>
                                {props.otherDetails[7].value}
                              </li>
                            </ul>
                            <ul className="other-details">
                              <li className="other-details-li">
                                <div>
                                  <span>dimension</span>
                                  {/* <p>(h&#10005;w&#10005;l)</p> */}
                                </div>
                                <p>:</p>
                              </li>
                              <li
                                style={{
                                  display: "flex",
                                  columnGap: "5px",
                                  fontWeight: "bold",
                                }}
                              >
                                {props.otherDetails[8].value}{" "}
                                <span>&#10005;</span>
                                {props.otherDetails[9].value}
                                <span>&#10005;</span>
                                {props.otherDetails[10].value}&nbsp;cm
                              </li>
                            </ul>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              columnGap: "120px",
                              marginTop: "20px",
                            }}
                          >
                            <span className="cust-rat">Specification</span>
                            {/* <button
                            onClick={() => props.toggleReviewModalFn()}
                            className="writet-ratings"
                          >
                            Write A Review
                          </button> */}
                          </div>
                        </div>
                      </div>

                      {/* <div className="product-review-section">
                      {props.productReviewData !== "" &&
                        arr.map((val, id) => {
                          if (
                            val.ratings.length != 0 &&
                            val.ratings[0].value >= 4
                          ) {
                            return (
                              <div
                                key={id}
                                className="product-review"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    backgroundColor: "#fff",
                                    height: "50px",

                                    marginTop: "10px",
                                  }}
                                >
                                  <div style={{ marginLeft: "10px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        columnGap: "20px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {val.nickname}
                                      </span>
                                      <span className="rating-star">
                                        {[...Array(5)].map((_, id) => {
                                          if (id <= 4) {
                                            return (
                                              <span key={id}>
                                                <svg
                                                  key={id}
                                                  aria-hidden="true"
                                                  className={
                                                    val.ratings.length != 0 &&
                                                    val.ratings[0].value <= id
                                                      ? "rating-stars-gray"
                                                      : "raing-stars"
                                                  }
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
                                      </span>
                                    </div>
                                    <span
                                      style={{ display: "flex", width: "50%" }}
                                    >
                                      {val.detail}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div> */}

                      {/* <div className="u-s-m-b-15">
                      {props.productReviewData !== undefined && (
                        <h4 style={{ fontWeight: "600" }}>
                          Customer Reviews (
                          {props.productReviewData.items.length})
                        </h4>
                      )}
                      {props.productReviewData !== "" &&
                        props.productReviewData.items1.map((contact, id) => (
                          <div
                            className="user-review-userReviewWrapper row"
                            key={id}
                          >
                            <div className="user-review-main user-review-showRating col-2">
                              <span className="user-review-starRating user-review-fiveStars">
                                {contact.ratings[0].value}
                                <span className="user-review-starIcon">
                                  <i className="fas fa-star"></i>
                                </span>
                              </span>
                            </div>
                            <div className="user-review-reviewTextWrapper  col-10">
                              {contact.detail}
                            </div>
                          </div>
                        ))}
                    </div> */}
                    </div>
                    <div>
                      {props.productDetails.short_description !== "" && (
                        <div className="product-description ">
                          {/* <p dangerouslySetInnerHTML={props.createMarkup(props.productDetails.short_description)}></p> */}
                          {props.productDetails.short_description
                            .split("\r\n\r")
                            .map((description, key) => {
                              return (
                                <span className="meta-desc" key={key}>
                                  <span
                                    style={{
                                      fontWeight: "bold",
                                      color: "black",
                                    }}
                                  >
                                    <span className="bullet-point-section">
                                      <span className="bullet-point"></span>
                                      <span style={{ color: "#5a4744" }}>
                                        {textSplitBold(description)}
                                      </span>
                                    </span>
                                  </span>
                                  <span>{textDescPlane(description)}</span>
                                </span>
                              );
                            })}
                        </div>
                      )}
                    </div>
                  </div>
                  {/*-====== End - Product Right Side Details ======*/}
                </div>
              </div>
            </div>
          </div>

          {/*  <div className="u-s-p-t-90">
                <div style={{marginLeft:'25px',marginRight:'25px'}}>
                    <h4>Related Product</h4>
                     <div className="row">
                     {props.relatedData !== undefined && props.relatedData.map((contact) => (
                         <div className="col-lg-3 col-md-3 col-sm-6 u-s-m-b-30">
                    <div className="product-m">
                      <div className="product-m__thumb">
                        <a
                          className="aspect u-d-block"
                          href={"/product/" + `${contact.sku}`}
                        >
                          <SimpleImageSlider
                            width={250}
                            height={320}
                            images={contact.images_data}
                            alt={contact.name}
                            showBullets={true}
                            slideDuration={0.5}
                            autoplay={true}
                          />
                        </a>
                      </div>
                      <div className="product-m__content">
                        <div className="product-m__category">
                          <a href={"/product/" + `${contact.sku}`}>
                            {contact.name}
                          </a>
                        </div>

                        <div className="product-m__price">
                          <span>
                            <span className="product-discountedPrice">
                              &#8377;{contact.final_price}
                            </span>
                            <span
                              className={
                                contact.price - contact.final_price !== 0
                                  ? "product-strike"
                                  : "product-nostrike"
                              }
                            >
                              &#8377;{contact.price}
                            </span>
                          </span>
                          <span
                            className={
                              contact.price - contact.final_price !== 0
                                ? "product-discountPercentage"
                                : "product-nodiscountPercentage"
                            }
                          >
                            (
                            {Math.round(
                              ((contact.price - contact.final_price) /
                                contact.price) *
                                100
                            )}
                            % OFF)
                          </span>
                        </div>
                        <div className="product-m__hover">
                          <b>Sizes:&nbsp;</b>
                          {contact.children_products.map((key) => (
                            <span className="product-sizeNoInventoryPresent">
                              {key.size} &nbsp;
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                     ))}    

                     </div>
                  </div>
            </div>   */}

          {/* {props.children && !_isEmpty(props.children) && (
    <div className="u-s-p-b-60 alice_top" id="crousel-top">
      <div id="crous-img">
      <div className="container">
        <div className="row sub_content">
          <div className="col-md-12">
              <div className="dividerHeading" id="divd_headd">
                <center><h2 id="hdd_may"><span>You May Also Like</span></h2></center>
              </div>

              <br/>
            <div className="container">
                <AliceCarousel
                    items={props.children}
                    responsive={props.responsive}
                    slideToIndex={props.currentIndex}
                    mouseTrackingEnabled={true}
                    onSlideChange={props.onSlideChange}
                    onSlideChanged={props.onSlideChanged}
                  /> 
            </div>    
          </div>
        </div>
      </div>
      </div>    
    </div>
 )} */}

          {/*  {
                     props.showReviewModal &&
                    <MaModal open={props.showReviewModal} handleCloseModal={() => props.toggleReviewModalFn()}>
                   
                    <div className="row" style={{backgroundColor:'#923150',marginTop:'-20px',height:'64px',marginLeft:'0px',marginRight:'0px'}}>
                    <div className="col-md-3"></div>
                    <div className="col-md-6"> <center><h3 style={{color:'white',paddingTop:'9px'}}>Rate and  Review</h3>
                      
                      </center></div>
                      <div className="col-md-3"><a style={{padding:'20px',cursor:'pointer',float:'right',color:'white'}} onClick={() => props.toggleReviewModalFn()}>X</a></div>
                    </div> 
                     <br/>
                   
                      <div>
                         <center>   <p>Your review will be publically posted on our website.</p>
                          <br/> 
                               <StarRatings
                                rating={props.rating}
                                starRatedColor="blue"
                                starDimension="25px"
                                starSpacing="1px"
                                changeRating={props.changeRating}
                                numberOfStars={5}
                                name='rating'
                                className="field-input"
                            />
                             <br /><span style={{ color: 'red' }}>{props.errors.rating}</span>
                            <br/>
                            {props.loginData === '' ?
                       <div></div>
                       
                     :  <h3 style={{textTransform:'none'}}>{props.userFirstName} </h3>}
                       <div>
                         <input style={{width:'400px',borderTopStyle: 'hidden',borderRightStyle: 'hidden',borderLeftStyle: 'hidden',borderBottomStyle: 'groove'}} type="text" className="no-outline" placeholder="Enter Title" onChange={props.handleChange} name="review_title"/>
                         <br /><span style={{ color: 'red' }}>{props.errors.review_title}</span>
                       </div>
                       <br/>
                       <br/>
                       <div>
                          <textarea rows={4} style={{width:'400px',borderTopStyle: 'hidden',borderRightStyle: 'hidden',borderLeftStyle: 'hidden',borderBottomStyle: 'groove'}} type="text" className="no-outline" placeholder="Share details of your experience with Cottinfab" onChange={props.handleChange} name="review_details"></textarea>
                            <br/><span style={{ color: 'red' }}>{props.errors.review_details}</span>
                       </div>
                         <br/>
                       {props.reviewPostLoader  ?
                          <img src={ lazyLoader } style={{height:'60px',width:'60px'}}  alt="lazy-loader"/>
                        : <button type="button" style={{height:'50px',width:'200px',backgroundColor:'#923150',border:'1px solid',borderRadius:'35px',color:'white'}} className="" onClick={() => props.submitReviews()}>Post</button>}
                        </center>
                     </div>
                  </MaModal>
                }  */}

          {props.showReviewModal && (
            <MaModal
              open={props.showReviewModal}
              handleCloseModal={() => props.toggleReviewModalFn()}
            >
              <div className="mkSty-pr2" id="mk-styl">
                <div id="mkstyle45">
                  <div
                    className="row rate-roow2"
                    id="rate_row3"
                    style={{
                      backgroundColor: "#633974",
                      marginTop: "-20px",
                      height: "64px",
                      marginRight: "0px",
                    }}
                  >
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                      {" "}
                      <center>
                        <h3
                          id="rate5"
                          style={{ color: "white", paddingTop: "16px" }}
                        >
                          Rate and Review
                        </h3>
                      </center>
                    </div>
                    <div className="col-md-3" id="cross-md">
                      <a
                        style={{
                          padding: "20px",
                          cursor: "pointer",
                          float: "right",
                          color: "white",
                        }}
                        onClick={() => props.toggleReviewModalFn()}
                      >
                        X
                      </a>
                    </div>
                  </div>
                  <br />

                  <div>
                    <center>
                      {" "}
                      <p
                        style={{
                          color: "black",
                          fontSize: "18px",
                          fontWeight: "400",
                        }}
                      >
                        Your Review Will Be Publically Posted On Walsoul Gourmet
                      </p>
                      <br />
                      <StarRatings
                        rating={props.rating}
                        starRatedColor="#633974"
                        starDimension="25px"
                        starSpacing="1px"
                        changeRating={props.changeRating}
                        numberOfStars={5}
                        name="rating"
                        className="field-input"
                      />
                      <br />
                      <span style={{ color: "red" }}>
                        {props.errors.rating}
                      </span>
                      <br />
                      {props.loginData === "" ? (
                        <div></div>
                      ) : (
                        <h3 style={{ textTransform: "none" }}>
                          {props.userFirstName}{" "}
                        </h3>
                      )}
                      <div className="cointainer">
                        <center>
                          <div className="row">
                            <div className="col-md-9 col-9">
                              <input
                                style={{
                                  borderTopStyle: "hidden",
                                  borderRightStyle: "hidden",
                                  borderLeftStyle: "hidden",
                                  borderBottomStyle: "groove",
                                  marginTop: "20px",
                                  marginRight: "-135px",
                                }}
                                type="text"
                                maxLength="50"
                                className="no-outline Werty123"
                                placeholder="Enter Title"
                                onChange={props.handleChange}
                                name="review_title"
                                id="ent-tlt"
                              />
                            </div>
                            <div className="col-md-3 col-3">
                              <p className="char_lft" id="inpt_chr_lt">
                                {props.chars_left1}
                              </p>
                            </div>
                          </div>
                        </center>
                        <br />
                        <span style={{ color: "red" }}>
                          {props.errors.review_title}
                        </span>
                      </div>
                      <br />
                      <br />
                      <div className="container">
                        <div className="row">
                          <div className="col-md-9 col-9">
                            <textarea
                              rows={4}
                              style={{
                                borderTopStyle: "hidden",
                                borderRightStyle: "hidden",
                                borderLeftStyle: "hidden",
                                borderBottomStyle: "groove",
                                marginRight: "-135px",
                              }}
                              type="text"
                              maxLength="120"
                              // onChange={this.handleWordCount}
                              className="no-outline Werty123"
                              placeholder="Tell us about your experience!"
                              onChange={props.handleChange}
                              name="review_details"
                              id="exp-area"
                            ></textarea>
                          </div>
                          <div className="col-md-3 col-3">
                            <p className="char_lft2" id="int_chr_lt2">
                              {props.chars_left}
                            </p>
                          </div>
                        </div>
                        <br />
                        <span style={{ color: "red" }}>
                          {props.errors.review_details}
                        </span>
                      </div>
                      <br />
                      {props.reviewPostLoader ? (
                        <img
                          src={lazyLoader}
                          style={{ height: "60px", width: "60px" }}
                          alt="lazy-loader"
                        />
                      ) : (
                        <button
                          type="button"
                          style={{
                            height: "50px",
                            width: "200px",
                            backgroundColor: "#633974",
                            border: "1px solid",
                            borderRadius: "35px",
                            color: "white",
                            fontSize: "20px",
                            marginBottom: "60px",
                          }}
                          className=""
                          onClick={() => props.submitReviews()}
                        >
                          Post
                        </button>
                      )}
                    </center>
                  </div>
                </div>
              </div>
            </MaModal>
          )}
        </div>

        <div className="product-details-responsive-container">
          <div className="product-details-responsive">
            {/* poduct name */}
            <div>
              <div className="">
                <ul className="pd-breadcrumb__list">
                  <li className="is-marked">
                    <a>{props.productDetails.name}</a>
                  </li>
                </ul>
              </div>
            </div>

            {/* product zoom img  */}
            <div>
              <div id="img-zm2">
                <div className="img--zoom1" id="zoom3">
                  {props.sideImages.length !== 0
                    ? props.sideImages.map((contact, id) => {
                        if (contact === props.imageSrc) {
                          return (
                            <div key={id} className="zoom-product-img">
                              <Zoom img={props.imageSrc} zoomScale={3} />
                            </div>
                          );
                        }
                      })
                    : props.productDetails.length !== 0 &&
                      props.productDetails.images.map((contact, id) => {
                        if (contact === defaultImgSrc) {
                          return (
                            <div key={id} className="zoom-product-img">
                              <Zoom img={defaultImgSrc} zoomScale={3} />
                            </div>
                          );
                        }
                      })}
                </div>
              </div>
            </div>
            {/* child img */}
            <div>
              <div className="child-prod-sec">
                <div className="child-prod-img">
                  {props.sideImages.length === 0
                    ? props.productDetails.images.map((contact, id) => (
                        <div
                          className="liscroll"
                          style={{ marginBottom: "15px" }}
                          key={id}
                        >
                          <img
                            src={contact}
                            onClick={() => {
                              defaultImages(contact);
                            }}
                            className="child-img-size"
                          />
                        </div>
                      ))
                    : props.productDetails.length !== 0 &&
                      props.sideImages.map((contact, id) => (
                        <div
                          className="liscroll"
                          style={{ marginBottom: "15px" }}
                          key={id}
                        >
                          <img
                            src={contact}
                            onMouseEnter={() => props.handleMouseEnter(contact)}
                            style={{
                              height: "75px",
                              width: "75px",
                              border: "1px solid #cdcdcd",
                            }}
                          />
                        </div>
                      ))}
                </div>
              </div>
            </div>

            {/* product detail info */}
            <div>
              <div>
                <div className="pd-detail__inline">
                  <span className="pd-detail__price">
                    &#8377;
                    {props.prodChildData === undefined
                      ? props.productDetails.children_products[0].final_price
                      : props.prodChildData.final_price}
                  </span>
                  <span
                    className={
                      props.productDetails.special_price -
                        props.productDetails.final_price !==
                        0 && "product-discountPercentage"
                    }
                  >
                    (
                    {props.prodChildData === undefined
                      ? props.productDetails.children_products[0]
                          .special_price !== 0
                        ? Math.round(
                            ((props.productDetails.children_products[0]
                              .special_price -
                              props.productDetails.children_products[0]
                                .final_price) /
                              props.productDetails.children_products[0]
                                .special_price) *
                              100
                          )
                        : 0
                      : props.prodChildData.special_price !== 0
                      ? Math.round(
                          ((props.prodChildData.special_price -
                            props.prodChildData.final_price) /
                            props.prodChildData.special_price) *
                            100
                        )
                      : 0}
                    {}% OFF)
                  </span>
                  <span
                    className={
                      props.productDetails.special_price -
                        props.productDetails.final_price !==
                        0 && "product-strike"
                    }
                  >
                    &#8377;
                    {props.prodChildData === undefined
                      ? props.productDetails.children_products[0].special_price
                      : props.prodChildData.special_price}
                  </span>
                  {props.totatlReviewCount !== undefined &&
                    props.productReviewData.length !== 0 && (
                      <span
                        style={{ color: "#6464fb", cursor: "pointer" }}
                        onClick={() => props.toggleAllReviewModalFn()}
                      >
                        See All Reviews
                      </span>
                    )}
                </div>
                <span className="rating-star">
                  {[...Array(5)].map((_, id) => {
                    if (id <= 4) {
                      return (
                        <span key={id}>
                          <svg
                            key={id}
                            aria-hidden="true"
                            className={
                              Math.round(
                                props.productDetails.rating_details[0].avgRating
                              ) != 0 &&
                              id <
                                Math.round(
                                  props.productDetails.rating_details[0]
                                    .avgRating
                                )
                                ? "raing-stars"
                                : " rating-stars-gray"
                            }
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

                  <span>({props.totatlReviewCount || 0})</span>
                </span>
              </div>
              <span className="inclusive-text">inclusive of all taxes</span>
              {props.productDetails.children_products[0].name.includes(
                "Oil"
              ) && (
                <div style={{ display: "flex", columnGap: "10px" }}>
                  <span>Package:</span>
                  <button
                    className={
                      glassBtn || glassBtn === ""
                        ? "product-package-selected"
                        : "product-package-default"
                    }
                    onClick={() => {
                      handleGlass();
                    }}
                  >
                    Glass
                  </button>
                  <button
                    className={
                      petBtn
                        ? "product-package-selected"
                        : "product-package-default"
                    }
                    onClick={() => {
                      handlePet();
                    }}
                  >
                    Pet
                  </button>
                </div>
              )}

              <div className="u-s-m-b-15">
                <div className="pd-detail__form">
                  <div className="">
                    <span className="pd-detail__label u-s-m-b-8">
                      SIZE:
                      <div className="size-buttons-size-buttons">
                        {props.productDetails.children_products.map(
                          (contact, id) => (
                            <div
                              className={
                                !!contact.name.includes(packageData)
                                  ? "size-buttons-tipAndBtnContainer"
                                  : "disabled-btn"
                              }
                              key={id}
                              disabled={!contact.name.includes(packageData)}
                            >
                              <div
                                className={
                                  !!contact.name.includes(packageData)
                                    ? "size-buttons-buttonContainer"
                                    : "disabled-btn"
                                }
                              >
                                {contact.qty !== 0 ? (
                                  <button
                                    disabled={
                                      !contact.name.includes(packageData)
                                    }
                                    onClick={(e) => {
                                      e.preventDefault();
                                      props.sizeSelectData(contact);
                                      props.sideImageSelection(contact);
                                      setSelectSize(true);
                                    }}
                                    className={
                                      !!contact.name.includes(packageData)
                                        ? (props.prodChildSku === undefined &&
                                            props.productDetails
                                              .children_products[0].sku ===
                                              contact.sku) ||
                                          props.prodChildSku === contact.sku
                                          ? "size-selected size-buttons-size-button size-buttons-size-button-default"
                                          : "size-buttons-size-button size-buttons-size-button-default"
                                        : "disabled-btn"
                                    }
                                  >
                                    <span className="size-buttons-size-strike-hide"></span>
                                    <p
                                      className={
                                        (props.prodChildSku === undefined &&
                                          props.productDetails
                                            .children_products[0].sku ===
                                            contact.sku) ||
                                        props.prodChildSku === contact.sku
                                          ? "size-buttons-unified-size1"
                                          : "size-buttons-unified-size"
                                      }
                                    >
                                      {getSecondPart(contact.name)}
                                    </p>
                                  </button>
                                ) : (
                                  <button
                                    className={
                                      "size-buttons-size-button size-buttons-size-button-default"
                                    }
                                    style={{
                                      backgroundColor: "lightgrey",
                                    }}
                                  >
                                    <span className="size-buttons-size-strike-hide"></span>
                                    <p className="size-buttons-unified-size">
                                      {getSecondPartSku(contact.sku)}
                                    </p>
                                  </button>
                                )}
                                {contact.qty < 5 ? (
                                  <span
                                    className={
                                      contact.qty === 0
                                        ? "bar-not-display size-buttons-inventory-left"
                                        : "size-buttons-inventory-left"
                                    }
                                    style={{ bottom: "-1px" }}
                                  >
                                    {contact.qty} Left
                                  </span>
                                ) : (
                                  <span></span>
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </span>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div className="prod-qty">
                        <a onClick={props.DecreaseItem}>
                          <span className=" fas fa-minus"></span>
                        </a>

                        <span style={{ color: "black", fontWeight: "bold" }}>
                          {props.valueData || props.valueData}
                        </span>
                        <a onClick={props.IncreaseItem}>
                          <span className=" fas fa-plus"></span>
                        </a>
                      </div>

                      {props.deliveryStatus !== "" &&
                      props.deliveryStatus === true ? (
                        <button
                          className="btn btn--e-brand-shadow"
                          onClick={props.addProductToCart}
                        >
                          <i className="fas fa-shopping-bag"></i>
                          &nbsp;&nbsp;&nbsp;Add To Cart
                        </button>
                      ) : (
                        <span className="out-stock">Out Of Stock</span>
                      )}

                      {props.cartLoader === true && (
                        <img
                          src={lazyLoader}
                          alt="#"
                          style={{ height: "50px", width: "50px" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* other Details */}
              <div className="other-details-sec">
                <ul className="cust-rat">Other Details</ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    {props.otherDetails[0].lable === "threshold" && "Flavor"}
                    <p>:</p>
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    {props.otherDetails[0].value}
                  </li>
                </ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    Use by
                    <p>:</p>
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    {props.otherDetails[1].value}
                  </li>
                </ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    Box Color
                    <p>:</p>
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    {props.otherDetails[2].value}
                  </li>
                </ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    {props.otherDetails[3].lable}
                    <p>:</p>
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    {props.otherDetails[3].value}
                  </li>
                </ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    Weight
                    <p>:</p>
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    {props.prodChildData === undefined
                      ? `${props.productDetails.children_products[0].weight}`
                      : `${props.prodChildData.weight}`}
                    &nbsp;kgs
                  </li>
                </ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    No of items
                    <p>:</p>
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    {props.otherDetails[6].value}
                  </li>
                </ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    form
                    <p>:</p>
                  </li>
                  <li style={{ fontWeight: "bold" }}>
                    {props.otherDetails[7].value}
                  </li>
                </ul>
                <ul className="other-details">
                  <li className="other-details-li">
                    dimension
                    <p>:</p>
                  </li>
                  <li
                    style={{
                      display: "flex",
                      columnGap: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    {props.otherDetails[8].value}
                    <span>&#10005;</span>
                    {props.otherDetails[9].value}
                    <span>&#10005;</span>
                    {props.otherDetails[10].value}&nbsp;cm
                  </li>
                </ul>
              </div>
              {/* product ratings */}
              <div className="">
                <div className="" id="">
                  <div
                    style={{
                      display: "flex",
                      columnGap: "120px",
                      marginTop: "20px",
                    }}
                  >
                    <span className="cust-rat">Specification</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", height: "max-content" }}>
                {props.productDetails.short_description !== "" && (
                  <div className="product-description ">
                    {props.productDetails.short_description
                      .split("\r\n\r")
                      .map((description, key) => {
                        return (
                          <span className="meta-desc" key={key}>
                            <span
                              style={{
                                fontWeight: "bold",
                                color: "black",
                              }}
                            >
                              <span className="bullet-point-section">
                                <span className="bullet-point"></span>
                                <span style={{ color: "#5a4744" }}>
                                  {textSplitBold(description)}
                                </span>
                              </span>
                            </span>
                            <span>{textDescPlane(description)}</span>
                          </span>
                        );
                      })}
                  </div>
                )}
              </div>
            </div>
            {/* Custmor review */}
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                height: "max-content",
              }}
            >
              <div>
                <div className="cust-sec">
                  <span className="cust-rat">Customer Reviews</span>
                  {props.totatlReviewCount !== undefined &&
                    props.productReviewData.length !== 0 && (
                      <span
                        href="#cust-rev"
                        style={{ color: "#6464fb", cursor: "pointer" }}
                        onClick={() => props.toggleAllReviewModalFn()}
                      >
                        See All Reviews
                      </span>
                    )}
                </div>

                {props.productDetails !== undefined && (
                  <div className="ratring-bar-container">
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">5</span>
                        <i
                          className="fas fa-star"
                          style={{ color: "gold" }}
                        ></i>
                      </div>
                      <progress
                        min="0"
                        max="100"
                        value={
                          props.productDetails.rating_details[0].new_rating[4]
                            .percent
                        }
                        data-rating="5"
                      ></progress>

                      <div className="index-count">
                        {Math.round(
                          props.productDetails.rating_details[0].new_rating[4]
                            .percent
                        )}
                        %
                      </div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">4</span>
                        <i
                          className="fas fa-star"
                          style={{ color: "gold" }}
                        ></i>
                      </div>

                      <progress
                        min="0"
                        max="100"
                        value={
                          props.productDetails.rating_details[0].new_rating[3]
                            .percent
                        }
                        data-rating="4"
                      ></progress>

                      <div className="index-count">
                        {Math.round(
                          props.productDetails.rating_details[0].new_rating[3]
                            .percent
                        )}
                        %
                      </div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">3</span>
                        <i
                          className="fas fa-star"
                          style={{ color: "gold" }}
                        ></i>
                      </div>

                      <progress
                        min="0"
                        max="100"
                        value={
                          props.productDetails.rating_details[0].new_rating[2]
                            .percent
                        }
                        data-rating="3"
                      ></progress>

                      <div className="index-count">
                        {Math.round(
                          props.productDetails.rating_details[0].new_rating[2]
                            .percent
                        )}
                        %
                      </div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">2</span>
                        <i
                          className="fas fa-star"
                          style={{ color: "gold" }}
                        ></i>
                      </div>

                      <progress
                        min="0"
                        max="100"
                        value={
                          props.productDetails.rating_details[0].new_rating[1]
                            .percent
                        }
                        data-rating="2"
                      ></progress>

                      <div className="index-count">
                        {Math.round(
                          props.productDetails.rating_details[0].new_rating[1]
                            .percent
                        )}
                        %
                      </div>
                    </div>
                    <div className="index-flexRow index-ratingBarContainer">
                      <div className="index-rating">
                        <span className="index-ratingLevel">1</span>
                        <i
                          className="fas fa-star"
                          style={{ color: "gold" }}
                        ></i>
                      </div>

                      <progress
                        min="0"
                        max="100"
                        value={
                          props.productDetails.rating_details[0].new_rating[0]
                            .percent
                        }
                        data-rating="1"
                      ></progress>

                      <div className="index-count">
                        {Math.round(
                          props.productDetails.rating_details[0].new_rating[0]
                            .percent
                        )}
                        %
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* customer details review */}
            <div>
              {props.showAllReviewModal && (
                <div
                  id="cust-rev"
                  style={{ display: "flex", height: "max-content" }}
                >
                  <div className="product-reviewmodal-section">
                    <div className="cus-review-container">
                      <span className="cust-rat">Customer Reviews</span>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                        }}
                        onClick={() => props.toggleAllReviewModalFn()}
                      >
                        <span className="close-btn"> Close</span>
                      </div>
                    </div>
                    <div className="review-full-items">
                      <span
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          padding: "5px",
                          color: "black",
                          fontWeight: "bold",
                          columnGap: "40px",
                        }}
                      ></span>
                      {props.productReviewData !== "" &&
                        props.productReviewData.map((val, id) => {
                          if (val.ratings.length != 0) {
                            return (
                              <div
                                key={id}
                                className="product-review"
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <div
                                  style={{
                                    borderBottom: "1px outset",

                                    minHeight: "50px",

                                    marginTop: "10px",
                                  }}
                                >
                                  <div style={{ marginLeft: "10px" }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        columnGap: "20px",
                                        alignItems: "center",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontWeight: "bold",
                                          textTransform: "capitalize",
                                        }}
                                      >
                                        {val.nickname}
                                      </span>
                                      <span className="rating-star">
                                        {[...Array(5)].map((_, id) => {
                                          if (id <= 4) {
                                            return (
                                              <span key={id}>
                                                <svg
                                                  key={id}
                                                  aria-hidden="true"
                                                  className={
                                                    val.ratings.length != 0 &&
                                                    val.ratings[0].value <= id
                                                      ? "rating-stars-gray"
                                                      : "raing-stars"
                                                  }
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
                                      </span>
                                    </div>
                                    <span
                                      style={{
                                        display: "flex",
                                        width: "80%",
                                      }}
                                    >
                                      {val.detail}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <div> '' </div>;
}
