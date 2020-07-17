import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class userSignup extends React.Component {
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js";
    script.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js";
    
    script.async = true;
    document.body.appendChild(script);
  }
  render() {
    return (
<html>
<Head>
    <title>Job Seeker-Sign Up</title>
</Head>
<body>
  <nav className="navbar nav-color sticky-top">
      <a href="/index"><img src="/p1.jpg" height="35" width="200" style={{marginLeft: 15}}/></a>
      <button type="button" className="btn btn-primary btn-float signin" data-toggle="modal" data-target="#myModal" style={{background: "#2C5197"}}>Sign In</button>
  </nav>
  <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content box1" style={{background:"#052f66"}}>
          <div className="modal-header">
            <h2 className="modal-title">Login</h2>
            <button type="button" className="close" data-dismiss="modal" style={{color:"aliceblue"}}>&times;</button>
          </div>
          <div className="modal-body">
            <form>
              <p className="text-white"> Please enter your login and password!</p> 
              <input type="text" name="" placeholder="Username"/> 
              <input type="password" name="" placeholder="Password"/> 
              <p><a className="forgot text-white" href="#">Forgot password?</a></p>
              <p className="text-white">Don't Have An Account? <a className="forgot" href="/userSignup">Create Here!</a></p>
              <input type="submit" name="" value="Login" href="#"/>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" style={{color:"aliceblue"}}>Close</button>
          </div>
        </div>
      </div>
    </div>               
            <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-9 mx-auto">
                    <div className="card card-signin flex-row my-5">
                      <div className="card-img-left d-none d-md-flex">
                         <img src="/nurse.png" alt="Nursing Care" width="80%" height="60%" style={{paddingTop: 60+"%"}}/>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title text-center">Account Register</h5>
                        <form className="form-signin">
                          <div className="form-label-group">
                            <input type="text" id="inputUsername" className="form-control" placeholder="Username" required autofocus/>
                            <label for="inputUsername">Username</label>
                          </div>
            
                          <div className="form-label-group">
                            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required/>
                            <label for="inputEmail">Email address</label>
                          </div>

                          <div className="form-label-group">
                            <input type="text" id="inputPhone" className="form-control" placeholder="Phone Number" required/>
                            <label for="inputPhone">Phone Number</label>
                          </div>
                          
                          <hr/>
            
                          <div className="form-label-group">
                            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                            <label for="inputPassword">Password</label>
                          </div>
                          
                          <div className="form-label-group">
                            <input type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required/>
                            <label for="inputConfirmPassword">Confirm password</label>
                          </div>
                          
                          <hr/>
                          
                          <div className="form-label-group">
                            <input type="date" id="inputDoB" className="form-control" placeholder="Date of Birth" required/>
                            <label for="inputDob">Date of Birth</label>
                          </div>
            
                          <div className="form-label-group">
                            <input type="text" id="inputJapaneseSkill" className="form-control" placeholder="e.g. N3/N2/N1" required/>
                            <label for="inputJapaneseSkill">Japanese Skill</label>
                          </div>

                          <div className="form-label-group">
                            <textarea id="inputDegree" className="form-control" required></textarea>
                            <label for="inputDegree">Final Degree and Major</label>
                          </div>

                          <div className="form-label-group">
                            <textarea id="inputAddress" className="form-control" required></textarea>
                            <label for="inputAddress">Address</label>
                          </div>
            
                          <div className="form-label-group">
                            <input type="file" id="inputPhoto" className="form-control"/>
                            <label for="inputPhoto">Choose User Photo</label>
                          </div>
                          <br/>
                          <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit" style={{background: "#2C5197"}}>Sign Up</button>
                          
                         </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer className="text-center">copyright&#169;jobseeker.co.jp</footer>
</body>
</html>
)
}}