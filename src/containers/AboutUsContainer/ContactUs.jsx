import React from "react";
import ReactDOM from "react-dom";
import _get from "lodash/get";
import MetaTags from "react-meta-tags";
// import ExploreImage from '../../assets/images/Explore.png';
// import GrowerImage from '../../assets/images/Grower.png';
// import DeliveryImage from '../../assets/images/Delivery.png';
// import DeliveredImage from '../../assets/images/Delivered.png';
// import SustainabilityImage from '../../assets/images/sustainability-seal.png';
// import BreadCrumbs from '../../components/Common/BreadCrumbs.jsx';
// import Web from '../../assets/img/d.jpg';
// import Mobile from '../../assets/img/aboutusmobile.jpg';
// import aboutus from '../../assets/img/aboutus1.jpg';
// import data from '../../assets/img/d.jpg';
import coconut from "../../assets/images/Coconut.jpg";
import * as emailjs from "emailjs-com";
import swal from "sweetalert";
import signin from "../../assets/img/signin.jpg";
import { ToastContainer, toast } from "react-toastify";
import logLoader from "../../assets/img/Rolling.gif";

class ContactUsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactFirstName: undefined,
      contactLastName: undefined,
      contactEmail: undefined,
      contactPhone: undefined,
      contactMessage: undefined,
      submitLoader: false,
      errors5: {},
      breadCrumbsList: [
        {
          link: "/",
          name: "home",
        },
        {
          link: undefined,
          name: "",
        },
      ],
    };
  }
  componentDidMount() {
    document.title = "About Us";
    // document.title = 'About Us';
    // const meta = document.createElement('meta');
    // // meta.httpEquiv = 'X-UA-Compatible';
    // meta.content = 'width=device-width, initial-scale=1';
    // meta.name = 'about';
    // meta.description = 'about';
    // meta.title = 'bhavitha';
    // document.getElementsByTagName('head')[0].appendChild(meta);
    //this.scrollToDiv();
  }
  componentDidUpdate(prevProps) {}
  // eslint-disable-next-line class-methods-use-this
  handleInputContact = (event) => {
    console.log(event.target.id);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleContactValidation() {
    const errors5 = {};
    let formIsValid = true;
    console.log("test");

    // Email
    if (this.state.contactFirstName === undefined) {
      formIsValid = false;
      errors5.contactFirstName = "This is a required field.";
    }

    if (this.state.contactLastName === undefined) {
      formIsValid = false;
      errors5.contactLastName = "This is a required field";
    }

    if (this.state.contactEmail === undefined) {
      formIsValid = false;
      errors5.contactEmail = "This is a required field";
    }

    if (this.state.contactPhone === undefined) {
      formIsValid = false;
      errors5.contactPhone = "This is a required field";
    }

    if (this.state.contactMessage === undefined) {
      formIsValid = false;
      errors5.contactMessage = "This is a required field";
    }

    this.setState({ errors5 });
    console.log(this.state);
    return formIsValid;
  }
  addContact = () => {
    this.setState({
      submitLoader: true,
    });
    console.log(this.state.contactEmail);
    console.log(this.state.contactFirstName);
    console.log(this.state.contactLastName);
    console.log(this.state.contactPhone);
    console.log(this.state.contactMessage);
    if (this.handleContactValidation()) {
      var templateId = "template_s8jsh6u";
      var serviceId = "service_wzg19rv";
      var public_key = "KKCOqaOluWScMDyqX";
      var message =
        "First Name  : - " +
        this.state.contactFirstName +
        " " +
        "," +
        "Last Name : - " +
        this.state.contactLastName +
        " " +
        "," +
        "Email : - " +
        this.state.contactEmail +
        " " +
        "," +
        "Phone No : - " +
        this.state.contactPhone +
        " " +
        "," +
        "Message : - " +
        this.state.contactMessage +
        " " +
        ",";

      emailjs
        .send(
          serviceId,
          templateId,
          {
            from_name: "customerservice@walsoulgourmet.in",
            to_name: this.state.contactFirstName,
            message: message,
            // reply_to: "customerservice@walsoulgourmet.in",
          },
          public_key
        )
        .then(
          function (response) {
            toast.success(
              "Thank You...!we will revert back to you withing 24 hours"
            );
          },
          function (error) {
            toast.error("FAILED...", error);
          }
        );

      this.setState({
        showContact: false,
        contactFirstName: undefined,
        contactLastName: undefined,
        contactEmail: undefined,
        contactPhone: undefined,
        contactMessage: undefined,
        errors5: {},
        submitLoader: false,
      });
    }
  };

  render() {
    return (
      <div style={{ marginTop: "80px" }}>
        {/* <ToastContainer position={toast.POSITION.TOP_RIGHT} /> */}
        <MetaTags>
          <title>Walsoul Gourmet</title>
          <meta
            name="keywords"
            content="Fresh flowers, send flowers, online delivery, roses, sunflower, daisies, gerbera, aster, solidago, lilies, best florist in USA"
          />
          <meta
            name="description"
            content="Send fresh flowers direct from farm for your loved ones, celebrate Birthday wises, surprises gifts and more with our colorful and vibrant flowers."
          />
        </MetaTags>
        <div style={{ display: "none" }}></div>

        <div id="hero-slider1">
          <div id="s-h">
            <div className="skelet" id="bottom-img"></div>
            <div>
              <img className="img-fluid" src={coconut} alt="" />
            </div>
          </div>
        </div>

        <div className="section__intro " style={{ marginTop: "40px" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary">CONTACT US</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section style={{ paddingBottom: "100px" }}>
          <div className="contactus-container" id="">
            <div className="contactus-img">
              <img
                className="u-img-fluid-signin u-d-block"
                id="img_fld3"
                src={signin}
                alt=""
              />
            </div>
            <div className="" id="_992btn">
              <div
                className="new-l__section u-s-m-t-30"
                style={{ paddingLeft: "1.2rem", paddingRight: "1.2rem" }}
              >
                <br />

                <div className="dash-address-manipulation">
                  <div className="gl-inline">
                    <div className="" style={{ width: "100%" }}>
                      <label className="gl-label" for="contact-name">
                        FIRST NAME *
                      </label>

                      <input
                        className={
                          this.state.errors5.contactFirstName
                            ? "input-text contact-input-text--primary-style contact-input-error"
                            : "input-text contact-input-text--primary-style"
                        }
                        name="contactFirstName"
                        placeholder="FIRST NAME"
                        required=""
                        value={this.state.contactFirstName}
                        onChange={this.handleInputContact}
                      />
                    </div>
                    <div className="" style={{ width: "100%" }}>
                      <label className="gl-label" for="contact-lname">
                        LAST NAME *
                      </label>

                      <input
                        className={
                          this.state.errors5.contactLastName
                            ? "input-text contact-input-text--primary-style contact-input-error"
                            : "input-text contact-input-text--primary-style"
                        }
                        name="contactLastName"
                        value={this.state.contactLastName}
                        placeholder="LAST NAME"
                        required=""
                        onChange={this.handleInputContact}
                      />
                    </div>
                  </div>
                  <div className="gl-inline">
                    <div className="" style={{ width: "100%" }}>
                      <label className="gl-label" for="contact-email">
                        EMAIL *
                      </label>

                      <input
                        className={
                          this.state.errors5.contactEmail
                            ? "input-text contact-input-text--primary-style contact-input-error"
                            : "input-text contact-input-text--primary-style"
                        }
                        name="contactEmail"
                        placeholder="EMAIL"
                        required=""
                        value={this.state.contactEmail}
                        onChange={this.handleInputContact}
                      />
                    </div>
                    <div className="" style={{ width: "100%" }}>
                      <label className="gl-label" for="contact-phone">
                        PHONE NO *
                      </label>

                      <input
                        className={
                          this.state.errors5.contactPhone
                            ? "input-text contact-input-text--primary-style contact-input-error"
                            : "input-text contact-input-text--primary-style"
                        }
                        name="contactPhone"
                        value={this.state.contactPhone}
                        placeholder="PHONE NO"
                        required=""
                        onChange={this.handleInputContact}
                      />
                    </div>
                  </div>

                  <div className="gl-inline">
                    <div style={{ width: "100%" }}>
                      <label className="gl-label" for="contact-message">
                        MESSAGE *
                      </label>

                      <textarea
                        style={{
                          // width: "58%",
                          height: "100px",
                          paddingTop: "5px",
                        }}
                        className={
                          this.state.errors5.contactMessage
                            ? "input-text  contact-input-text--primary-style contact-input-error"
                            : "input-text  contact-input-text--primary-style"
                        }
                        name="contactMessage"
                        placeholder="MESSAGE"
                        required=""
                        value={this.state.contactMessage}
                        onChange={this.handleInputContact}
                      />
                    </div>
                  </div>

                  <div className="gl-inline">
                    <button
                      className="login-btn"
                      style={{ marginTop: "20px" }}
                      onClick={this.addContact}
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section>
          <center>
            <p style={{ color: "black" }}>
              One can reach us at -: Walsoul Consulting Private Limited 688, 3rd
              Floor, 7th Main , BTM 2nd Stage, BTM Layout, Bengaluru, Karnataka
              560076 Phone No : +91 9110469843 / 9591-983-960
            </p>
          </center>
        </section> */}
      </div>
    );
  }
}
export default ContactUsContainer;
