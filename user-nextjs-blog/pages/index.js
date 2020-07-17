import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class index extends React.Component {
  componentDidMount () {
    const script = document.createElement("script");
    script.src = "/scripts/pagination.js";
    script.async = true;
    document.body.appendChild(script);
  }

  static async getInitialProps() {
    let firebase = await loadFirebase() 
    let result = await new Promise((resolve, reject) => {
      firebase.firestore().collection('job')
        .limit(10)
        .get()
        .then(snapshot => {
          console.log(snapshot)
          let data = []
          snapshot.forEach((doc) => {
            data.push(
              Object.assign({
                id: doc.id
              }, doc.data())
            )
          })
          console.log(data)
          resolve(data)
        })
        .catch(error => {
          reject([])
        })
    })
    console.log(result)
    return {job: result}
  }

  render() {
    const job = this.props.job
    return (
    <html>
      <Head>
        <title>Job Seeker-Home</title>
    </Head>
<body>
  <nav className="navbar nav-color sticky-top">
      <img src="/p1.jpg" height="35" width="200" style={{marginLeft : 15}}/>
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

      <div className="jumbotron text-center head-color">
        <h1 style={{fontFamily: "Lucida Console"}}>Job Seeker Japan</h1>
        <br/>
        <div className="dropdown">
          <select name="area" id="area" className="btn btn-primary" style={{background: "#2C5197", marginRight:10}}>
            <option selected disabled>Select Area</option>
            <option value="1">Hokkaidou</option>
            <option value="2">Honshu</option>
            <option value="3">Shikoku</option>
            <option value="4">Kyushu</option>
            <option value="5">Okinawa</option>
          </select>
            <select name="city" id="city" className="btn btn-primary" style={{background: "#2C5197", marginRight:10}}>
              <option selected disabled>Select City</option>
              <option value="1">Sapporo</option>
              <option value="2">Tokyo</option>
              <option value="3">Osaka</option>
              <option value="4">Yokohama</option>
              <option value="5">Kyoto</option>
              <option value="6">Hiroshima</option>
            </select>
            <select name="japaneseSkill" id="japaneseSkill" className="btn btn-primary" style={{background: "#2C5197", marginRight:10}}>
              <option selected disabled>Select Japanese Skill</option>
            <option value="1">N3 and above</option>
            <option value="2">N2 and above</option>
            <option value="3">N1</option>
            </select>
        </div>
        <br/>
        <div className="dropdown">
          <select name="employmentStatus" id="employmentStatus" className="btn btn-primary" style={{background: "#2C5197", marginRight:10}}>
            <option selected disabled>Select Employment Status</option>
            <option value="1">Full-Time</option>
            <option value="2">Part-Time</option>
          </select>
            <select name="minSalary" id="minSalary" className="btn btn-primary" style={{background: "#2C5197", marginRight:10}}>
              <option selected disabled>Select Minimum Salary</option>
              <option value="1">50000</option>
              <option value="2">60000</option>
            </select>
          <button type="button" className="btn btn-success">Search</button>
        </div>
    </div> 

  <div className="tab-content"> 
    <div className="container tab-pane active" id="default">
      <div className="h-25" id="job">
          <h2 style={{fontFamily: "Lucida Sans Unicode", paddingBottom:15 }}>Recommended Jobs</h2>
      </div>
        <div className="row">
        {job &&  
        job.map(Job => (
          <div className="col-sm-6 box" key={Job.id}>
            <h3>{Job.jobName} </h3>
            <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
            <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
              <span className="badge badge-info">N2 and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: Tokyo</p></td>
                  <td><p>Salary: {Job.minSalary} ~ {Job.maxSalary}</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: 4 days a week</p></td>
                  <td><p>Working Hours: 9:00~3:00</p></td>
                </tr>
              </table>
          </div>
        )
      )}
    </div>
        

          <div className="row">
            <div className="col-sm-6 box">
              <h3>Employer Name</h3>
              <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
              <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
              <div className="m-b">
                <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
                <span className="badge badge-info">N2 and above</span>
              </div>
                <table>
                  <tr>
                    <td><p>Working Location: Tokyo</p></td>
                    <td><p>Salary: Monthly wages 80000 yen</p></td>
                  </tr>
                  <tr>
                    <td><p>Working Days: 4 days a week</p></td>
                    <td><p>Working Hours: 9:00~3:00</p></td>
                  </tr>
                </table>
            </div>
            <div className="col-sm-6 box">
                <h3>Employer Name</h3>
                <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
                <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
                <div className="m-b">
                  <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
                  <span className="badge badge-info">N2 and above</span>
                </div>
                <table>
                  <tr>
                    <td><p>Working Location: Tokyo</p></td>
                    <td><p>Salary: Monthly wages 80000 yen</p></td>
                  </tr>
                  <tr>
                    <td><p>Working Days: 4 days a week</p></td>
                    <td><p>Working Hours: 9:00~3:00</p></td>
                  </tr>
                </table>
            </div>
          </div> 

          <div className="row">
        <div className="col-sm-6 box">
            <h3>Employer Name</h3>
            <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
            <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
              <span className="badge badge-info">N2 and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: Tokyo</p></td>
                  <td><p>Salary: Monthly wages 80000 yen</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: 4 days a week</p></td>
                  <td><p>Working Hours: 9:00~3:00</p></td>
                </tr>
              </table>
            </div> 

          <div className="col-sm-6 box">
            <h3>Employer Name</h3>
            <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
            <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
              <span className="badge badge-info">N2 and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: Tokyo</p></td>
                  <td><p>Salary: Monthly wages 80000 yen</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: 4 days a week</p></td>
                  <td><p>Working Hours: 9:00~3:00</p></td>
                </tr>
              </table>
            </div>        
        </div>

          <div className="center">
            <a data-toggle="tab" href="#list"><button type="button" className="btn btn-secondary">View More</button></a>
          </div>  
      </div>

      <div className="container tab-pane" id="list">
      <div className="h-25">
      <div className="row">
        <div className="col-sm-8">
          <h2 style={{fontFamily: "Lucida Sans Unicode" }}>All Jobs List</h2>
        </div>
        <div className="col-sm-4">
          <select name="dateFilter" id="dateFilter" className="btn-float select-css">
            <option selected disabled>Filtered by Date</option>
            <option value="1">Oldest to Newest</option>
            <option value="2">Newest to Oldest</option>
          </select>
        </div>
      </div>
      </div>
        <div className="row">
          <div className="col-sm-6 box">
            <h3>Employer Name</h3>
            <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
            <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
              <span className="badge badge-info">N2 and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: Tokyo</p></td>
                  <td><p>Salary: Monthly wages 80000 yen</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: 4 days a week</p></td>
                  <td><p>Working Hours: 9:00~3:00</p></td>
                </tr>
              </table>
            </div>

          <div className="col-sm-6 box">
            <h3>Employer Name</h3>
            <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
            <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
              <span className="badge badge-info">N2 and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: Tokyo</p></td>
                  <td><p>Salary: Monthly wages 80000 yen</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: 4 days a week</p></td>
                  <td><p>Working Hours: 9:00~3:00</p></td>
                </tr>
              </table>
            </div>        
        </div>

          <div className="row">
            <div className="col-sm-6 box">
              <h3>Employer Name</h3>
              <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
              <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
              <div className="m-b">
                <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
                <span className="badge badge-info">N2 and above</span>
              </div>
                <table>
                  <tr>
                    <td><p>Working Location: Tokyo</p></td>
                    <td><p>Salary: Monthly wages 80000 yen</p></td>
                  </tr>
                  <tr>
                    <td><p>Working Days: 4 days a week</p></td>
                    <td><p>Working Hours: 9:00~3:00</p></td>
                  </tr>
                </table>
            </div>
            <div className="col-sm-6 box">
                <h3>Employer Name</h3>
                <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
                <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
                <div className="m-b">
                  <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
                  <span className="badge badge-info">N2 and above</span>
                </div>
                <table>
                  <tr>
                    <td><p>Working Location: Tokyo</p></td>
                    <td><p>Salary: Monthly wages 80000 yen</p></td>
                  </tr>
                  <tr>
                    <td><p>Working Days: 4 days a week</p></td>
                    <td><p>Working Hours: 9:00~3:00</p></td>
                  </tr>
                </table>
            </div>
          </div> 

          <div className="row">
        <div className="col-sm-6 box">
            <h3>Employer Name</h3>
            <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
            <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
              <span className="badge badge-info">N2 and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: Tokyo</p></td>
                  <td><p>Salary: Monthly wages 80000 yen</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: 4 days a week</p></td>
                  <td><p>Working Hours: 9:00~3:00</p></td>
                </tr>
              </table>
            </div> 

          <div className="col-sm-6 box">
            <h3>Employer Name</h3>
            <a href="/detail"><button type="button" className="btn btn-info btn-float">View Detail</button></a>
            <small><i>Posted on Feb 19, 2016, 15:17</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10}}>Part Time</span>
              <span className="badge badge-info">N2 and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: Tokyo</p></td>
                  <td><p>Salary: Monthly wages 80000 yen</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: 4 days a week</p></td>
                  <td><p>Working Hours: 9:00~3:00</p></td>
                </tr>
              </table>
            </div>        
        </div>

        <div className="row" style={{paddingBottom:5}}>
          <div className="col-sm-7">
            <h5>Showing 1 to 10 of 25 Jobs</h5>
          </div>
          <div className="col-sm-5">
          <nav className="pagination-outer" aria-label="Page navigation" style={{float:"right"}}>
            <ul className="pagination pagination-style">
              <li className="page-item">
                <a href="#" className="page-link" aria-label="Previous">
                    <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">4</a></li>
              <li className="page-item">
                <a href="#" className="page-link" aria-label="Next">
                    <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </nav>
          </div>
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
  )
}
}