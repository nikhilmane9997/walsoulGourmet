import React from "react";
import BreadCrumbs from "../../components/Common/BreadCrumbs.jsx";
import MetaTags from "react-meta-tags";

class PrivacyPolicyContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "demo12",
      breadCrumbsList: [
        {
          link: "/",
          name: "home",
        },
        {
          link: undefined,
          name: "PRIVACY POLICY",
        },
      ],
    };
  }
  componentDidMount() {
    document.title = "Privacy Policy";
  }

  myFunction = (id) => {
    console.log(id);
    this.setState({
      test: id,
    });
    console.log(this.state.test);
  };
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <MetaTags>
          <title>Privacy Policy | Walsoul Gourmet</title>
          <meta
            name="keywords"
            content="Fresh flowers, send flowers, online delivery, roses, sunflower, daisies, gerbera, aster, solidago, lilies, best florist in USA"
          />
          <meta
            name="description"
            content="Send fresh flowers direct from farm for your loved ones, celebrate Birthday wises, surprises gifts and more with our colorful and vibrant flowers."
          />
        </MetaTags>
        <div style={{ display: "none" }}>
          <h1>
            flowers for all occasion Christmas, mother’s day, valentines day,
            birthday, wedding flowers, anniversary
          </h1>
          <h2>send flowers anywhere in USA to your loved ones</h2>
          <h3>
            bulk roses,wedding flowers from farm, fastest delivery, flowers
            shipped with water
          </h3>
          <h4>
            best florist delivering in any city in USA, order online for next
            day delivery
          </h4>
          <h5>
            flowers for all occasion Christmas, mother’s day, valentines day,
            birthday, wedding flowers, anniversary
          </h5>
          <h6>flowers for all seasons, winter, fall, summer, spring</h6>
        </div>
        <section>
          <div className="container" style={{ marginBottom: "20px" }}>
            <br />
            <center>
              <h5 style={{ fontFamily: "Quintessential", fontSize: "20px" }}>
                Walsoul Gourmet
                <br />
                <br />
              </h5>
            </center>
            <div className="section__intro ">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section__text-wrap">
                      <h1 className="section__heading u-c-secondary">
                        PRIVACY AND POLICY
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w3-container" style={{ marginBottom: "100px" }}>
              <h3 className="header-text">General</h3>
              <div className="terms-sec">
                <p>
                  Walsoul Gourmet shall not be liable for any delay or failure
                  to perform resulting from causes outside our reasonable
                  control, including, without limitation, any failure to perform
                  hereunder due to unforeseen circumstances or cause beyond our
                  control such as acts of God, war, terrorism, riots, embargoes,
                  acts of civil or military authorities, fire, floods,
                  accidents, strikes, or shortages of transportation facilities,
                  fuel, energy, labor or materials.
                </p>
              </div>
              <h3 className="header-text"> Credit Card Information</h3>
              <div className="terms-sec">
                <p>
                  We collect credit card payments from users when they purchase
                  our flowers or other products. No payments are collected
                  without a user’s explicit authorization. All credit card
                  information is processed for us by a third-party merchant
                  processing service, and we do not have access to any of our
                  users’ personal credit card information. Processing of the
                  foregoing credit cards follows credit card industry standards.
                  <br />
                  As always, consumers making purchases must have a valid credit
                  card, be at least 18 years of age or older, and have a good
                  credit standing.
                </p>
              </div>
              <h3 className="header-text">Security</h3>
              <div className="terms-sec">
                <p>
                  We use the most current technology for your order information
                  and protection against the decoding of that information by
                  anyone other than us.
                  <br />
                  However, despite all reasonable security precautions and
                  processes, such as password protection, encryption technology,
                  and use of firewall technology, no data transmission over the
                  Internet can be guaranteed to be 100% secure. As a result,
                  while we strive to protect your Personally Identifiable
                  Information, we cannot guarantee or warrant the security of
                  any information you transmit to or from our website, and you
                  do so at your own risk. Once we receive your transmission, we
                  will take commercially reasonable precautions to protect its
                  security on our systems.
                  <br />
                  If you open a Personal Account with Walsoul Gourmet, LLC DBA:
                  Walsoul Gourmet, your password will be your personal, secret
                  entry code to our website. When you access your account
                  information, it is kept on a secure server and a password is
                  needed to access any account areas. You can change your
                  password as many times as you like. We recommend that you keep
                  your password in a safe place and that you always sign off
                  your account and close your browser window once you have
                  finished your visit.
                  <br />
                  These precautions will help prevent someone else from
                  accessing your account, especially if you share a computer
                  with other people or use a computer in a public place such as
                  an Internet café or library.
                  <br />
                  Walsoul Gourmet, LLC is committed to protecting our customers'
                  privacy In order to better provide you with numerous products
                  and services, we collect some information about you. Our
                  primary goal in collecting information from you is to provide
                  you with a smooth, efficient, and customized experience while
                  using our Site. We only collect information that is necessary
                  for us to process your order. We may perform statistical
                  analyses of aggregate customer behavior. This allows us to
                  measure relative customer interest in the various areas of
                  each of our Sites for product development purposes. Any
                  information we collect is used for our own internal purposes
                  to improve the content and navigation of our Sites, to enhance
                  users' experiences when visiting our Sites, to customize the
                  content and/or layout of our pages, and to provide the
                  services required by an individual customer. We also use
                  information to notify consumers about updates to our Sites, to
                  complete user-initiated transactions, to trace false orders
                  and to contact consumers directly, or through our third-party
                  service partners, for marketing purposes.
                </p>
              </div>
              <h3 className="header-text">Security Measures</h3>
              <div className="terms-sec">
                <p>
                  Walsoul Gourmet, LLC DBA Walsoul Gourmet Web Site is protected
                  by a VeriSign Security Certificate. Our customers can be
                  assured that their personal information, including credit card
                  information, is safe.
                </p>
              </div>
              <h3 className="header-text">Charges And Option Out</h3>
              <div className="terms-sec">
                <p>
                  If you would like to modify your account simply return to our
                  website, click on the link called "Your Account". Once you
                  have signed into your account a menu of options is provided
                  for you to delete or edit your stored account information.
                  <br />
                  Unfortunately, to the extent that such information is also
                  stored in other databases, we cannot always ensure that such
                  corrections or deletions will reach the other databases. We
                  will use all reasonable efforts to ensure that your
                  information is removed from or corrected in our records.
                  <br />
                  You may opt-out of receiving communications from us, by
                  sending an email to customerservice@walsoulgourmet.in
                  <br />
                  <a
                    style={{ color: "blue", cursor: "pointer" }}
                    href="customerservice@walsoulgourmet.in"
                  >
                    &nbsp;to customerservice@walsoulgourmet.in
                  </a>
                </p>
              </div>
            </div>
          </div>
          <br />
        </section>
      </div>
    );
  }
}

export default PrivacyPolicyContainer;
