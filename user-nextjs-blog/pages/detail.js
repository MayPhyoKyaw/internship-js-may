import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class detail extends React.Component {
  
  render() {
    return (
<html>
<Head>
    <title>Job Seeker-Detail</title>
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
  
    <div className="container-fluid" style={{paddingTop:30}}>
        <div className="row content">
            <div className="col-sm-7 detail-margin">
                <h2 className="text-center job-title">Nursing Care</h2>
                <hr className="new1"/>
                <span className="badge badge-light btn-float" style={{marginRight:30}}>Posted Date: 2020/6/20, 8:20</span>
                <h4 className="head-style">Job Description</h4>
                <p className="para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.                  
                </p>
                <h4 className="head-style">Frequent Answer Question</h4>
                <p className="para">
                    Q: I have no experience or knowledge of this job, but is it okay? <br/>
                    A: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  <br/>
                    Q: this is my first time... to do? <br/>
                    A: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<br/>
                    Q: Is there flexibility in time and days? <br/>
                    A: Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  <br/>
                </p>
                <div className="center" style={{paddingTop: 50}}>
                  <button type="button" className="btn apply" style={{backgroundColor:"#7af706", color: "rgb(4, 15, 24)"}}>Apply Now</button>
                </div>
            </div>
            <div className="col-sm-4 detail-margin">
              <h4 className="req-title job-title text-center">Application Requirements</h4>
              <ul style={{listStyle: "none"}}>
                <li className="li-padding"><b>Employment Status:</b>&nbsp;Full-Time </li>
                <li className="li-padding"><b>Age Range:</b>&nbsp; 23~25 years old</li>
                <li className="li-padding"><b>Working Hours:</b>&nbsp; 9:00~5:00</li>
                <li className="li-padding"> <b>Working Days:</b>&nbsp; 5 days a week</li>
                <li className="li-padding"><b>Minimum Salary:</b>&nbsp; 60000 yen</li>
                <li className="li-padding"><b>Maximum Salary:</b>&nbsp; 150000 yen</li>
                <li className="li-padding"><b>Working Place:</b> &nbsp;Hokkaidou, Sapporo</li>
                <li className="li-padding"><b>Japanese Skill:</b>&nbsp; N2 and above</li>
                <li className="li-padding"><b>Qualification:</b>&nbsp; English skill: preintermediate and no experiences years...</li>
                <li className="li-padding"><b>Job Address:</b>&nbsp; No.00, "A" Road, "A" township.</li>
              </ul>
                    
              <hr className="new1"/>
              <h3 className="text-left job-title"><u>Company Information</u></h3>
              <p><b>Employer or Company Name:</b> Lorem ipsum </p>
              <p><b>Address:</b> Hokkaido, Sapporo, ...</p>
              <p><b>Email:</b> Lorem@ipsum.co.jp</p>
              <p><b>Phone Number:</b> +00-11-000-1111</p>    
            </div>
        </div>
    </div>
  
    <div className="jumbotron text-left p-3 foot-color" style={{marginBottom: 0}}>
        <h3 style={{paddingTop: 20}}>Contact &nbsp; | &nbsp; <a href="/About"> About Us</a></h3> 
        <br/>
        <table>
            <tr>
              <td className="text-center">Company Name Co., Ltd.</td>
            </tr>
            <tr>
              <td><span className="fa fa-phone" style={{fontSize:20}}></span>:  +00-11-000-1111</td>
              <td><span className="fa fa-globe" style={{fontSize:20}}></span>:  www.jobseeker.co.jp</td>
              <td rowspan="2"><a href="#" className="fa fa-twitter"></a></td>
              <td rowspan="2"><a href="#" className="fa fa-facebook fa-facebook-f"></a></td>
            </tr>
            <tr>
              <td><span className="fa fa-envelope" style={{fontSize:20}}></span>:  jobseeker@dummy.jp</td>
              <td><span className="fa fa-map-marker" style={{fontSize:20}}></span>: No.--, Detail Address, City, State</td>
            </tr>
        </table>
    </div>      
  <footer className="text-center">copyright&#169;jobseeker.co.jp</footer>
</body>
</html>
)}}
