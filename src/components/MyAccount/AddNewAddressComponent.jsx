import React from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import lazyLoader from "../../assets/img/25.gif";

export default function AddNewAddressComponent(props) {
  console.log(props);

  return (
    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white dash-box-pad">
      <div className="dash__pad-2" id="dash2">
        <h1 className="dash__h1 u-s-m-b-14">{props.pageTitle}</h1>

        <span className="dash__text u-s-m-b-30">
          We need an address where we could deliver products.
        </span>
        <div className="dash-address-manipulation">
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
              <label className="gl-label" for="firstName">
                FIRST NAME *
              </label>

              <input
                className={
                  props.errors.firstName === "true"
                    ? "input-text input-text--primary-style input-error"
                    : "input-text input-text--primary-style"
                }
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
                onChange={props.handleChange}
                value={props.fields.firstName}
              />
            </div>
          </div>
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              <label className="gl-label" for="lastName">
                LAST NAME *
              </label>

              <input
                className={
                  props.errors.lastName === "true"
                    ? "input-text input-text--primary-style input-error"
                    : "input-text input-text--primary-style"
                }
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                onChange={props.handleChange}
                value={props.fields.lastName}
              />
            </div>
          </div>
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              <label className="gl-label" for="telephone">
                PHONE *
              </label>

              <input
                className={
                  props.errors.telephone === "true"
                    ? "input-text input-text--primary-style input-error"
                    : "input-text input-text--primary-style"
                }
                type="number"
                maxLength="10"
                name="telephone"
                id="telephone"
                placeholder="Phone No."
                onChange={props.handleChange}
                value={props.fields.telephone}
                onInput={(e) => {
                  props.maxLengthCheck(e);
                }}
              />
            </div>
          </div>
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              <label className="gl-label" for="streetAddress1">
                STREET ADDRESS 1 *
              </label>

              <input
                className={
                  props.errors.streetAddress1 === "true"
                    ? "input-text input-text--primary-style input-error"
                    : "input-text input-text--primary-style"
                }
                type="text"
                name="streetAddress1"
                id="streetAddress1"
                placeholder="House Name and Street1"
                onChange={props.handleChange}
                value={props.fields.streetAddress1}
              />
            </div>
          </div>
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              <label className="gl-label" for="streetAddress1">
                STREET ADDRESS 2
              </label>

              <input
                className="input-text input-text--primary-style"
                type="text"
                name="streetAddress2"
                id="streetAddress2"
                placeholder="House Name and Street2"
                onChange={props.handleChange}
                value={props.fields.streetAddress2}
              />
            </div>
          </div>
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              <label className="gl-label" for="billing_region_id_1">
                STATE/PROVINCE *
              </label>
              <select
                className={
                  props.errors.selectStateValue === "true"
                    ? "select-box select-box--primary-style input-error"
                    : "select-box select-box--primary-style"
                }
                id="billing_region_id_1"
                value={props.selectStateValue}
                onChange={props.handleStateChange}
              >
                <option value="">
                  Please select region, state or province
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
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              <label className="gl-label" for="city">
                TOWN/CITY *
              </label>

              <input
                className={
                  props.errors.city === "true"
                    ? "input-text input-text--primary-style input-error"
                    : "input-text input-text--primary-style"
                }
                type="text"
                name="city"
                id="city"
                placeholder="Town/City"
                onChange={props.handleChange}
                value={props.fields.city}
              />
            </div>
          </div>
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              <label className="gl-label" for="postalCode">
                ZIP/POSTAL CODE *
              </label>

              <input
                className={
                  props.errors.postalCode === "true"
                    ? "input-text input-text--primary-style input-error"
                    : "input-text input-text--primary-style"
                }
                type="text"
                name="postalCode"
                id="postalCode"
                placeholder="Zip/Postal Code"
                onChange={props.handleChange}
                value={props.fields.postalCode}
              />
            </div>
          </div>
          <br />
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              {!props.isBillingFlag ? (
                <React.Fragment>
                  <input
                    type="checkbox"
                    name="defaultBilling"
                    id="defaultBilling"
                    title="Use as My Default Billing Address"
                    onChange={props.handleChange}
                    value={props.fields.defaultBilling}
                  />
                  <label> &nbsp;Use as my default billing address</label>
                </React.Fragment>
              ) : (
                <strong> &nbsp;Default Billing Address</strong>
              )}
            </div>
          </div>
          <br />
          <div className="gl-inline-t">
            <div className="u-s-m-b-30">
              {!props.isShippingFlag ? (
                <React.Fragment>
                  <input
                    type="checkbox"
                    name="defaultShipping"
                    id="defaultShipping"
                    title="Use as My Default Shipping Address"
                    onChange={props.handleChange}
                    value={props.fields.defaultShipping}
                  />
                  <label> &nbsp;Use as my default shipping address</label>
                </React.Fragment>
              ) : (
                <strong> &nbsp;Default Shipping Address</strong>
              )}
            </div>
          </div>
          <br />
          {props.addressLoader === false ? (
            <a
              className="btn btn--e-brand-b-2"
              style={{ paddingBottom: "10px", paddingTop: "10px" }}
              onClick={props.handleSaveAddress.bind(props)}
            >
              SAVE
            </a>
          ) : (
            <img
              src={lazyLoader}
              style={{ height: "60px", width: "60px" }}
              alt="lazy-loader"
            />
          )}
        </div>
      </div>
    </div>
  );
}
