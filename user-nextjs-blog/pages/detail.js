import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {
  loadFirebase, 
  AREA_COLLECTION, 
  CITY_COLLECTION, 
  EMPLOYER_COLLECTION, 
  getCollectionRecords, 
} from '../lib/db.js';

export default class detail extends React.Component {

  static async getInitialProps ({req, res, query}){
    let job = {}
    
    const firebase = loadFirebase();
    const querySnapshot = await firebase.firestore().collection("job").doc(query.job).get()
    job = querySnapshot.data()
    
    const areas = await getCollectionRecords(AREA_COLLECTION) 
    const cities = await getCollectionRecords(CITY_COLLECTION) 
    const employers = await getCollectionRecords(EMPLOYER_COLLECTION) 
      return({employers, areas, cities, job})
  }

  getEmployerName = (employerId) => {
    const employers = this.props.employers
    let employerName = ''
    employers && employers.map(Employers => {
        if(Employers.id == employerId){
            employerName = Employers.data.employerName
        }
    })
    return employerName;
  }

  getEmployerAddress = (EMPLOYERID) => {
    const employers = this.props.employers
    let employerAddress = ''
    console.log(EMPLOYERID)
    employers && employers.map(Employers => {
        if(Employers.id == EMPLOYERID){
            employerAddress = Employers.data.employerAddress
        }
    })
    return employerAddress;
  }

  getEmployerEmail = (EMPLOYERID) => {
    const employers = this.props.employers
    let employerEmail = ''
    console.log(EMPLOYERID)
    employers && employers.map(Employers => {
        if(Employers.id == EMPLOYERID){
            employerEmail = Employers.data.employerEmail
        }
    })
    return employerEmail;
  }

  getEmployerPhone = (EMPLOYERID) => {
    const employers = this.props.employers
    let employerPhone = ''
    console.log(EMPLOYERID)
    employers && employers.map(Employers => {
        if(Employers.id == EMPLOYERID){
            employerPhone = Employers.data.employerPhone
        }
    })
    return employerPhone;
  }

  getCompanyDescription = (EMPLOYERID) => {
    const employers = this.props.employers
    let companyDescription = ''
    console.log(EMPLOYERID)
    employers && employers.map(Employers => {
        if(Employers.id == EMPLOYERID){
          companyDescription = Employers.data.companyDescription
        }
    })
    return companyDescription;
  }

  getJobLocation = (CITYID, AREAID) => {
    const city = this.props.cities
    const area = this.props.areas
    let cityName = ''
    let areaName = ''

    city && city.map(City=>{
        if(City.id == CITYID){
            cityName = City.data.cityName
        }
    })
    area && area.map(Area=>{
        if(Area.id == AREAID){
            areaName = Area.data.areaName
        }
    })
   return cityName + ", " + areaName
  }

  getDate = (object) => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(object.seconds);
    return t.getDate()+'/'+(t.getMonth()+1)+'/'+t.getFullYear()
  }

  render() {
    const job = this.props.job
    return (
<html>
<Head>
    <title>Job Seeker-Detail</title>
</Head>
<body>
  <nav className="navbar nav-color sticky-top">
      <a href="/index"><img src="/p1.jpg" height="45" width="200" style={{marginLeft: 15}}/></a>
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
                <h2 className="text-center job-title">{job.jobName}</h2>
                <hr className="new1"/>
                <span className="badge badge-light btn-float" style={{marginRight:30}}>Posted Date: {this.getDate(job.postedDate)}</span>
                <h4 className="head-style">Job Description</h4>
                <p className="para">
                  {job.jobDescription}            
                </p>
                <h4 className="head-style">Frequent Answer Question</h4>
                <p className="para">
                    Q: I have no experience or knowledge of this job, but is it okay? <br/>
                    A: {job.FAQ1}  <br/>
                    Q: this is my first time... to do? <br/>
                    A: {job.FAQ2}<br/>
                    Q: Is there flexibility in time and days? <br/>
                    A: {job.FAQ3}  <br/>
                </p>
                <hr className="new1"/>
                <h3 className="text-left job-title"><u>Company Information</u></h3>
                <p><b>Employer or Company Name:</b> {this.getEmployerName(job.EMPLOYERID)} </p>
                <p><b>Address:</b> {this.getEmployerAddress(job.EMPLOYERID)}</p>
                <p><b>Email:</b> {this.getEmployerEmail(job.EMPLOYERID)}</p>
                <p><b>Phone Number:</b> +{this.getEmployerPhone(job.EMPLOYERID)}</p>   
                <p><b>Company Description</b><br/> {this.getCompanyDescription(job.EMPLOYERID)}</p> 
                <div className="center" style={{paddingTop: 50}}>
                      <button type="button" className="btn apply" style={{backgroundColor:"#7af706", color: "rgb(4, 15, 24)"}}>Apply Now</button>
                </div> 
            </div>
            <div className="col-sm-4">
              <h4 className="req-title job-title text-center">Application Requirements</h4>
              <ul style={{listStyle: "none"}}>
                <li className="li-padding"><b>Employment Status:</b>&nbsp;{job.employmentStatus}</li>
                <li className="li-padding"><b>Age Range:</b>&nbsp; {job.ageRange} years old</li>
                <li className="li-padding"><b>Working Hours:</b>&nbsp; {job.workingHours}</li>
                <li className="li-padding"> <b>Working Days:</b>&nbsp; {job.workingDays} days a week</li>
                <li className="li-padding"><b>Minimum Salary:</b>&nbsp; {job.minSalary} yen</li>
                <li className="li-padding"><b>Maximum Salary:</b>&nbsp; {job.maxSalary} yen</li>
                <li className="li-padding"><b>Japanese Skill:</b>&nbsp; N{job.japaneseSkill} and above</li>
                <li className="li-padding"><b>Qualification:</b>&nbsp; {job.qualification}</li>
                <li className="li-padding"><b>Job Address:</b>&nbsp; {job.jobAddress}</li>
                <li className="li-padding"><b>Working Place:</b> &nbsp;{this.getJobLocation(job.CITYID, job.AREAID)} </li>
              </ul>
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
