// eslint-disable-next-line no-unused-vars
import React from "react";
import _get from "lodash/get";
import { Tabs, Tab } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import MetaTags from "react-meta-tags";
import { LoaderListingPage } from "../../components/Loader/Loader.jsx";
import ProductComponent from "./Product.jsx";
import ProductGridComponent from "./ProductGridComponent.jsx";
import ProductListComponent from "./ProductListComponent.jsx";
// import '../../assets/stylesheets/ProductListing.css';
//import iDescArrow from '../../assets/images/i_desc_arrow.png';
//import iAscArrow from  '../../assets/images/i_asc_arrow.png';
//import cart from  '../../assets/img/cart_data.png';

export default function ListingComponent(props) {
  console.log(props.productDetails);
  // if (_get(props, 'isLoading') && props.pageNo === 1) {
  //     return (
  //         <div className="text-center">
  //             <LoaderListingPage />
  //         </div>
  //     );
  // }
  console.log(props);
  if (props.productDetails.length === 0) {
    return (
      <div>
        <div>
          {/* <div className="col-md-2">   
                                    </div>
                                    <div className="col-md-4">
                                            <img src={cart} className="bg_no_product"/>  
                                    </div>
                                    <div className="col-md-4" style={{marginTop:'150px',marginLeft:'130px'}}>
                                        <h1 style={{fontSize:'60px'}}><b>OOPS !</b></h1>
                                        <p style={{fontSize:'20px'}}>We're sorry! No Product found</p>                
                                    </div>
                                    <div className="col-md-2">   
                                    </div> */}
        </div>
        <br />
        <br />
      </div>
    );
  }
  return (
    <div
      className=" product-draw"

      //   style={{
      //     display: "grid",
      //     gridTemplateColumns: " 25% 25% 25% 25%",
      //     marginBottom: "110px",
      //     columnGap: "15px",
      //     alignItems: "center",
      //     justifyContent: "center",
      //   }}
    >
      {props.productDetails &&
        props.productDetails.map((thisData, index) => (
          <ProductGridComponent
            index={index}
            key={index}
            thisData={thisData}
            getStoreData={props.getStoreData}
            showProdDetail={props.showProdDetail}
          />
        ))}
      {/* {props.viewType === "list" &&
        props.productDetails &&
        props.productDetails.map((thisData, index) => (
          <ProductListComponent
            index={index}
            key={index}
            thisData={thisData}
            getStoreData={props.getStoreData}
            showProdDetail={props.showProdDetail}
          />
        ))} */}
    </div>
  );
}
