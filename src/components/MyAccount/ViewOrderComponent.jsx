import React from "react";
import Button from "react-bootstrap/lib/Button";
import _get from "lodash/get";
import { Link } from "react-router-dom";

function addTwoNumbers(x, y) {
  var z = Number(x) + Number(y);
  z = z.toFixed(2);
  return z;
}
export default function ViewOrderComponent(props) {
  console.log(props);
  return (
    <div style={{ marginTop: "100px" }}>
      <div>
        <div className="">
          <div className="">
            <h1
              style={{ color: "#800000", marginTop: "50px", fontWeight: "700" }}
              id="order"
            >
              your order is {props.state.status}!
            </h1>
            <br />
            <h3
              id="ord"
              style={{
                color: "#800000",
                fontWeight: "bold",
                marginLeft: "20px",
                fontSize: "20px",
              }}
            >
              Order No. #
              <span
                style={{ color: "black", fontWeight: "bold", fontSize: "20px" }}
              >
                {props.state.orderNumber}
              </span>
            </h3>
            <span
              className="view-order-sub"
              style={{
                color: "#800000",
                marginLeft: "20px",
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              Order Date
            </span>
            <span
              style={{
                paddingLeft: "10px",
                color: "black",
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              {props.state.orderDate}
            </span>
            <br />
          </div>
        </div>
      </div>
      <br />
      <br />

      <div className="">
        <div className="conatainer">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                <div className="dash__pad-1">
                  <span
                    className="view-order-sub"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontFamily: "Helvetica Neue",
                      fontSize: "20px",
                    }}
                  >
                    Shipping Address
                  </span>
                  <br />
                  <br />
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Name:-{" "}
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {props.state.billingAddress.firstname}&nbsp;
                    {props.state.billingAddress.lastname}
                  </span>
                  <br />
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Address:-
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {props.state.billingAddress.street},&nbsp;
                    {props.state.billingAddress.postcode},&nbsp;
                    {props.state.billingAddress.city}
                  </span>
                  <br />
                  {/*<span style={{color: 'black'}}>PostalCode: {props.state.billingAddress.postcode}</span><br/>
                                    <span style={{color: 'black'}}>City: {props.state.billingAddress.city}</span><br/>*/}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Phone No:-{" "}
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {props.state.billingAddress.telephone}
                  </span>
                  <br />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                <div className="dash__pad-1">
                  <span
                    className="view-order-sub"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontFamily: "Helvetica Neue",
                      fontSize: "20px",
                    }}
                  >
                    Billing Address
                  </span>
                  <br />
                  <br />
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Name:-
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {props.state.billingAddress.firstname}&nbsp;
                    {props.state.billingAddress.lastname}
                  </span>
                  <br />
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Address:-{" "}
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {props.state.billingAddress.street},&nbsp;
                    {props.state.billingAddress.postcode},&nbsp;
                    {props.state.billingAddress.city}
                  </span>
                  <br />
                  {/*<span style={{color: 'black'}}>PostalCode: {props.state.billingAddress.postcode}</span><br/>
                                    <span style={{color: 'black'}}>City: {props.state.billingAddress.city}</span><br/>*/}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Phone No:-{" "}
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {props.state.billingAddress.telephone}
                  </span>
                  <br />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                <div className="dash__pad-1">
                  <span
                    className="view-order-sub"
                    style={{
                      color: "black",
                      fontWeight: "bold",
                      fontFamily: "Helvetica Neue",
                      fontSize: "20px",
                    }}
                  >
                    Payment Method
                  </span>
                  <br />
                  <br />
                  {/*<span>Card Number: &nbsp; &nbsp;{_get(props.state, 'paymentMethod.card_number')}</span><br/>
                                    <span>Card Type:&nbsp; &nbsp; {_get(props.state, 'paymentMethod.card_type')}</span><br/>*/}
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Payment Method :-
                  </span>{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {_get(props.state, "paymentMethod.payment_method")}
                  </span>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div>
        <div id="item_order">
          <div className="item_table" id="odr_tbl">
            <h3 style={{ color: "#800000", fontWeight: "bold" }}>
              <strong>Items Ordered</strong>
            </h3>
            <div className="table-responsive">
              <table
                className="table table-bordered vieworder-table"
                id="box_id_null_det"
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Helvetica Neue",
                        textAlign: "left",
                      }}
                    >
                      Product Name
                    </th>
                    <th
                      style={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Helvetica Neue",
                      }}
                    >
                      Qty
                    </th>
                    <th
                      style={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Helvetica Neue",
                      }}
                    >
                      Unit Cost
                    </th>
                    <th
                      style={{
                        fontSize: "15px",
                        color: "black",
                        fontWeight: "bold",
                        fontFamily: "Helvetica Neue",
                      }}
                    >
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {_get(props.state, "orderDetails") &&
                    Object.values(_get(props.state, "orderDetails")).map(
                      (product, key) =>
                        // console.log(product);
                        {
                          let sum = 0;
                          const abc = product.items.map((each, i) => {
                            sum += each.row_total;
                            return (
                              <tr key={i}>
                                <td
                                  style={{
                                    textAlign: "left",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {each.name}
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {each.qty_ordered}
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  &#8377;{each.price}
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "bold",
                                  }}
                                >
                                  &#8377; {each.row_total}
                                </td>
                              </tr>
                            );
                          });

                          sum > 0 &&
                            abc.push(
                              <tr key={sum}>
                                <td style={{ border: "none" }}></td>
                                <td style={{ border: "none" }}></td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    fontWeight: "600",
                                    fontWeight: "bold",
                                    color: "black",
                                    fontFamily: "Helvetica Neue",
                                  }}
                                >
                                  Shipping
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "600",
                                    fontWeight: "bold",
                                  }}
                                >
                                  &#8377; {product.shipping_amount}
                                </td>
                              </tr>
                            );

                          sum > 0 &&
                            abc.push(
                              <tr key={sum}>
                                <td style={{ border: "none" }}></td>
                                <td style={{ border: "none" }}></td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    fontWeight: "600",
                                    fontWeight: "bold",
                                    color: "black",
                                    fontFamily: "Helvetica Neue",
                                  }}
                                >
                                  Discount
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "600",
                                    fontWeight: "bold",
                                  }}
                                >
                                  &#8377; {product.discount_amount}
                                </td>
                              </tr>
                            );

                          sum > 0 &&
                            abc.push(
                              <tr key={sum}>
                                <td style={{ border: "none" }}></td>
                                <td style={{ border: "none" }}></td>
                                <td
                                  style={{
                                    textAlign: "left",
                                    fontWeight: "600",
                                    fontWeight: "bold",
                                    color: "black",
                                    fontFamily: "Helvetica Neue",
                                  }}
                                >
                                  Grand Total
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    fontWeight: "600",
                                    fontWeight: "bold",
                                  }}
                                >
                                  &#8377;{" "}
                                  {sum > 0
                                    ? `${addTwoNumbers(
                                        sum,
                                        product.discount_amount
                                      )}`
                                    : ""}
                                </td>
                              </tr>
                            );
                          return abc;
                        }
                    )}
                </tbody>
              </table>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
