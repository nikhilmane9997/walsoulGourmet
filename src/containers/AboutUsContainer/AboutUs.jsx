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

class AboutUsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  render() {
    return (
      <div style={{ marginTop: "80px" }}>
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
                  <h1 className="section__heading u-c-secondary">ABOUT US</h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section style={{ paddingBottom: "100px" }}>
          <div className="w3-container" style={{ marginBottom: "100px" }}>
            <h3 className="header-text">General</h3>
            <div className="terms-sec">
              <p>
                We are a Gourmet brand founded in the year 2021, headquartered
                in Karnataka, Bengaluru called “Silicon City”. Walsoul Gourmet
                brings you an exclusive range and the best Natural of Nuts,
                Dried fruits, Seeds, Dry Roasted Snacks, Trail mixes, Festive
                Gift hampers, and more. With a wide variety of products that
                cater to every taste and age group, our bestsellers have found
                their way into the homes and hearts of many households.
                <br />
                Our innovative Gift Hampers and other products are available
                across Bangalore city major retail stores and other Marketplaces
                like Amazon. These gift hampers are designed to be perfectly
                suitable for your loved ones irrespective of their age.
                <br />
                We have also diversified our product range towards Cold Pressed
                Oil, Wild Honey thus making our products more health centric.
                <br />
                With our customers’ changing tastes, we experimented with new
                products to offer something innovative and healthy. This
                resulted in our Trial mix series, Healthy Seeds, and most
                recently our snack packs which are a perfect substitute for all
                the junk food available on the market. New products, aggressive
                strategies, and listening to customer requirements are the most
                important factors for our growth story.
              </p>
            </div>
            <div style={{ marginTop: "20px" }}>
              <center>
                <p style={{ color: "black" }}>
                  Contact us -: Walsoul Consulting Private Limited 688, 3rd
                  Floor, 7th Main , BTM 2nd Stage, BTM Layout, Bengaluru,
                  Karnataka 560076
                </p>
                <p style={{ color: "black" }}>
                  Phone No : +91 9110469843 / 9591-983-960
                </p>
              </center>
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
export default AboutUsContainer;
