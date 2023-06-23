import React from "react";

export default function BreadCrumbs(props) {
  return (
    <div>
      <div className="u-s-p-y-60">
        <div className="section__content">
          <div className="container">
            <div className="breadcrumb">
              <div className="breadcrumb__wrap">
                <ul className="breadcrumb__list">
                  <li className="has-separator">
                    <a href="/">Home</a>
                  </li>
                  <li className="has-separator">
                    <a href="/view-cart">Cart</a>
                  </li>
                  <li className="is-marked">
                    <a>Checkout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
