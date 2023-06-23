import React from "react";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";

const addressBook = (props) => {
  console.log(props.otherAddress);
  return (
    <div>
      {props.otherAddress.length !== 0 ? (
        <div className="address-container">
          <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
            <div className="dash__pad-2">
              <div className="dash__address-header">
                <h1 className="dash__h1">Address Book</h1>
                <div></div>
              </div>
            </div>
          </div>

          <div className="dash__box dash__box--shadow dash__box--bg-white dash__box--radius u-s-m-b-30">
            <div className="dash__table-2-wrap gl-scroll">
              {props.otherAddress !== 0 &&
                props.otherAddress.map((thisAddress, index) => {
                  return (
                    <div className="addrss-details">
                      <ul>
                        <li style={{ fontSize: "14px", fontWeight: "bold" }}>
                          {thisAddress.firstName}&nbsp;{thisAddress.lastName}
                        </li>
                        <span>
                          <li>
                            {thisAddress.street1}&nbsp;{thisAddress.street2}
                          </li>
                          <li>
                            {thisAddress.city}&nbsp;{thisAddress.country_name}
                          </li>
                          <li style={{ fontWeight: "bold" }}>
                            {thisAddress.postcode}
                          </li>
                          <li>{thisAddress.telephone}</li>
                          {thisAddress.defaultBilling === true && (
                            <li>Default Billing Address</li>
                          )}
                          {thisAddress.defaultShipping === true && (
                            <li>Default Shipping Address</li>
                          )}
                        </span>
                      </ul>
                      <span
                        className="edit-btn"
                        onClick={() =>
                          props.handleEditAddress(
                            _get(thisAddress, "entity_id")
                          )
                        }
                      >
                        Edit
                      </span>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="add-address" onClick={() => props.handleAddAddress()}>
            <div onClick={() => props.handleAddAddress()}>
              <i class="fas fa-plus u-s-m-r-8"></i>

              <span>Add New Address</span>
            </div>
          </div>
        </div>
      ) : (
        <div class="empty" style={{ paddingTop: "100px" }}>
          <div class="empty__wrap">
            <span class="empty__big-text">EMPTY</span>

            <span class="empty__text-1">No Address found.</span>

            <a
              class="empty__redirect-link btn--e-brand"
              onClick={() => props.handleAddAddress()}
            >
              <i class="fas fa-plus u-s-m-r-8"></i>

              <span>Add New Address</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default addressBook;
