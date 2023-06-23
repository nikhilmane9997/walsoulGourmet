import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import lazyLoader from  '../../assets/images/lazy-loader.gif';
// import Modal from 'react-bootstrap/lib/Modal';
// import BigLogo from '../../assets/images/bloom_logo_white.png';
// import SmallLogo from '../../assets/images/bloom_logo_small.png';

// const Recaptcha = require('react-recaptcha');

let recaptchaStyle;
export default function RegisterComponent(props) {
  if (props.state.checkRecaptcha.length === 0) {
    recaptchaStyle = { cursor: 'not-allowed' };
  } else {
    recaptchaStyle = { cursor: 'pointer' };
  }
  return (
    <div>
     {/*<div className={`overlay ${ props.isFetching ? '' : 'hide'}`}>
          <span className="infinite-loader-class">
              <img
                src={ lazyLoader }
                alt="lazy-loader"
              />
          </span>
        </div>*/}
         <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <br/><br/>
               <p style={{fontSize:'22px',fontWeight:'400'}}>Account</p>
               <br/>
               <div className="row">
                    <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
											<input type="text"id="firstName" name="firstName" value={props.state.firstName} onChange={props.handleInputChange} placeholder="First Name" required="" />
                      <span className={`${ props.state.errors.firstName ? 'blink' : ''}`}>{props.state.errors.firstName }</span>
                     </div>
                    <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
											<input type="text" id="lastName" name="lastname" value={props.state.lastName} onChange={props.handleInputChange} placeholder="Last Name" required="" />
										  <span className={`${props.state.errors.lastName ? 'blink': ''}`}>{props.state.errors.lastName}</span>
                    </div>
               </div>
               <br/>
               <div className="row">
                    <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
											<input type="text" name="email" id="emailAddress" value={props.state.emailAddress} onChange={props.handleInputChange} placeholder="Email Address" required="" />
                      <span className={`${props.state.errors.emailAddress ? 'blink': ''}`}>{props.state.errors.emailAddress}</span>
                    </div>
                    <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
											<input type="text" name="billingTelephone" id="billingTelephone" value={props.state.phoneNo} onChange={props.handleInputChange} placeholder="Cell Phone" required="" />
									    <span className={`${props.state.errors.billingTelephone ? 'blink': ''}`}>{props.state.errors.billingTelephone}</span>
                  	</div>
               </div>
               <br/>
               <div className="row">
                    <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
											<input type="password" name="password" id="password" value={props.state.password} onChange={props.handleInputChange} placeholder="Password" required="" />
										  <span className={`${ props.state.errors.password }`? 'blink' : ''}>{props.state.errors.password}</span>
                    </div>
                    <div className="col-sm-6 field1" style={{ border: '1px solid black !important' }}>
											<input type="password" name="confirmation" id="confirmation" value={props.state.confirmation} onChange={props.handleInputChange} placeholder="Confirm Password" required="" />
										  <span className={`${ props.state.errors.confirmation }`? 'blink' : ''}>{props.state.errors.confirmation}</span>
                    </div>
               </div>
               <br/>
               <div className="field">
                  <center>
                        <input type="submit" onClick={props.customerRegisterData} style={{backgroundColor: '#f96495',color: 'white',width:'170px',borderRadius: '25px'}} className="field_bt" value="SIGN UP"/>
                  </center>
               </div>  
               <br/>
               <br/>                

            </div>
            <div className="col-sm-2"></div>
         </div>        
    </div>

  );
}
