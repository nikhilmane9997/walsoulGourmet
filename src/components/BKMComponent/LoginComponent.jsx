import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import _get from 'lodash/get';
import lazyLoader from '../../assets/img/25.gif';


export default function LoginComponent(props) {
  return (
    <div className="reset_pwd">
      <div className="container">
          <div className="row">
          <div class=" col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3"></div>
              <div class=" col-sm-6 col-md-4 col-md-offset-4 col-sm-offset-3">
                <div id="CustomerLoginForm" style={{marginTop:'30px'}}>
									<div className="row">
										<div className="col-sm-12 field1" style={{ border: '1px solid black !important' }}>
											<input type="password" id="password" name="password" value={props.state.password}
                      onChange={props.handleInputChange}
                      onKeyUp={props.loginData.bind(this)} placeholder="Password" required=""/>
                      <span style={{color:'red'}}>{props.state.errors.password}</span>
										</div>
									</div>
                  <div className="row">
										<div className="col-sm-12 field1" style={{ border: '1px solid black !important' }}>
											<input type="password" id="confirmPassword" name="confirmPassword" value={props.state.confirmPassword}
                      onChange={props.handleInputChange}
                      onKeyUp={props.loginData.bind(this)} placeholder="Confirm Password" required=""/>
                      <span style={{color:'red'}}>{props.state.errors.confirmPassword}</span>
										</div>
									</div>
                  <div className="field" id="rst_btn">
                  <div id="btn1-pwd">
                    {props.resetLoader === false ?
                                      <center>
                                        <input onClick={props.loginDataclick.bind(this)} type="submit" style={{backgroundColor: '#923150',color: 'white',width:'170px',borderRadius: '25px',fontWeight: '700',fontFamily: 'Helvetica Neue'}} className="field_bt" value="Reset Password"/>
                                      </center>
                                      :<center>
                                        <img src={ lazyLoader } style={{height:'50px',marginTop:'50px'}} alt="lazy-loader"/>
                                        </center>}
                  </div>
                  </div>
                </div>
                
              </div>
          </div>
      </div>
      <br/>
      <br/>
    </div>
  );
}