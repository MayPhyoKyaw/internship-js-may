import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    this.datatableRef = React.createRef();
    this.$datatable = null
    this.state = {
      allJobs : props.job || [],
      cities : props.city || [],
      areas : props.area || [],
      jobLimit : props.joblimit || [],
    }
  }

  static async getInitialProps() {
    let firebase = await loadFirebase() 
    const jobQuerySnapshot = await firebase
            .firestore()
            .collection("job")
            .get();
    const jobs = jobQuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
    }));
    const joblimitQuery = await firebase
            .firestore()
            .collection("job")
            .limit(8)
            .orderBy("postedDate")
            .get();
    const jobLimit = joblimitQuery.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
      }));  
    const areaQuerySnapshot = await firebase
            .firestore()
            .collection("area")
            .get();
    const areas = areaQuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
    }));
    const cityQuerySnapshot = await firebase
        .firestore()
        .collection("city")
        .get();
    const cities = cityQuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
    }));

    return {job: jobs, joblimit: jobLimit.reverse(), area : areas, city : cities}
  }

  componentDidMount() {
    this.initializeDatatable()
  }

  initializeDatatable() {
    this.$datatable = $(this.datatableRef.current).DataTable({
      "ordering" : false,
      "oLanguage": {
        "sLengthMenu": "Showing _MENU_ items per page", 
      }
    });
  }

  refreshTable() {
    const self = this;
    Index
      .getInitialProps()
      .then((response) => {
        self.setState({
          jobs: response.job,
        });
      })
      .bind(this);
  }

  handleChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
    if(event.target.name == "AREAID"){
        this.getCities(event.target.value)
    }
    this.setState({showCities : true})
  }

  getCities = (id) => {
    let cities = []
    try{
        let firebase = loadFirebase()
        firebase.firestore().collection('city').where('AREAID',"==",id)
        .get()
        .then((snapshot)=> {
            snapshot.forEach(doc => {
                cities.push(Object.assign(
                    {id : doc.id},
                    doc.data()
                ))
            })
            console.log({cities})
            this.setState({cities})
        })
    }catch(error){
        console.log(error)
    }
  };

  dateSorted = (event) => {
    let jobs = []
    this.setState({[event.target.name] : event.target.value})
    if(event.target.value == "old_to_new"){
        try{
            let firebase = loadFirebase()
            firebase.firestore().collection('job').orderBy('postedDate').get()
            .then(snaphsot => {
                snaphsot.forEach(doc=>{
                    jobs.push(Object.assign(
                      {id : doc.id},
                      doc.data()
                  ))
                })
                this.setState({allJobs : jobs})
            })
        }catch(error){
            console.log(error)
        }
    }else if(event.target.value == "new_to_old"){
        try{
          let firebase = loadFirebase()
          firebase.firestore().collection('job').orderBy('postedDate').get()
            .then(snaphsot => {
                snaphsot.forEach(doc=>{
                    jobs.push(Object.assign(
                      {id : doc.id},
                      doc.data()
                  ))
                })
                this.setState({allJobs : jobs.reverse()})
            })
        }catch(error){
            console.log(error)
        }
    }else {
        try{
          let firebase = loadFirebase()
          firebase.firestore().collection('job').get()
            .then(snaphsot => {
                snaphsot.forEach(doc=>{
                    jobs.push(Object.assign(
                      {id : doc.id},
                      doc.data()
                  ))
                })
                this.setState({allJobs : jobs})
            })
        }catch(error){
            console.log(error)
        }
    }
  }

  render() {
    const allJobs = this.state.allJobs
    const cities = this.state.cities
    const areas = this.state.areas
    return (
  <html>
    <Head>
        <title>Job Seeker-Home</title>
        <style js>{`
        .dataTables_wrapper .dataTables_paginate .paginate_button{
          color: white;
          background: #FFFFFF;
          font-size: 22px;
          font-weight: 600;
          line-height: 30.5px;
          padding: 0;
          margin: 0 5px;
          position: relative;
          border: 2px solid #103370;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0,0,0,0.2);
          z-index: 1;
          transition: all 0.3s ease 0s;
      }
      .dataTables_wrapper .dataTables_paginate .paginate_button.current,
      .dataTables_wrapper .dataTables_paginate .paginate_button:hover,
      .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover,
      .dataTables_wrapper .dataTables_paginate .paginate_button:focus,
      .dataTables_wrapper .dataTables_paginate .paginate_button.current:focus{
          color: white;
          background: linear-gradient(to right,#2b56a0,#103370,#2b56a0);
          border: 2px solid #103370;
      }
      .dataTables_wrapper .dataTables_paginate .paginate_button:before,
      .dataTables_wrapper .dataTables_paginate .paginate_button:after{
          content: '';
          background: transparent;
          color: white;
          height: 50%;
          width: 50%;
          transform: translateX(-50%);
          position: absolute;
          left: 50%;
          top: 0;
          z-index: -1;
          transition: all 0.3s ease 0s;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
      }
      .dataTables_wrapper .dataTables_paginate .paginate_button:after{
          top: auto;
          bottom: 0;
          clip-path: polygon(50% 0, 100% 100%, 0 100%);
      }
      .dataTables_wrapper .dataTables_paginate .paginate_button:hover:before,
      .dataTables_wrapper .dataTables_paginate .paginate_button:focus:before,
      .dataTables_wrapper .dataTables_paginate .paginate_button.current:before{
          background-color: #103370;
          top: -10px;
      }
      .dataTables_wrapper .dataTables_paginate .paginate_button:hover:after,
      .dataTables_wrapper .dataTables_paginate .paginate_button:focus:after,
      .dataTables_wrapper .dataTables_paginate .paginate_button.current:after{
          background-color: #103370;
          bottom: -10px;
      }
      .dataTables_filter input{
        width: 400px;
        height: 50px;
        border: 2px solid #192D59;
        border-radius: 10px;
        font-size: 25px
      }
      .dataTables_wrapper .dataTables_filter{
        text-align: left;
        font-size: 25px;
      }
      .dataTables_wrapper .dataTables_length{
        font-size: 20px;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
      }
      .dataTables_info {
        font-size: 20px;
        font-weight: bold;
        font-family: "Trebuchet MS", Helvetica, sans-serif;
      }
    `}</style>
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
          <select name="AREAID" id="area" className="btn btn-primary" onChange={this.handleChange} style={{background: "#2C5197", marginRight:10}}>
            <option selected disabled>Select Area</option>
            {this.state.areas.map(Area => (this.state.AREAID == Area.id ? 
                <option value={Area.id}>{Area.areaName}</option> : 
                <option value={Area.id}>{Area.areaName}</option>
            ))}
          </select>
            {this.state.showCities && (
              <select name="CITYID" id="city" className="btn btn-primary" onChange={this.handleChange} style={{background: "#2C5197", marginRight:10}}>
                  <option selected disabled>Select City</option>
                  {cities &&  cities.map(city => (
                      <option value={city.id}>{city.cityName}</option>
                  ))}
              </select>
            )}
            <select name="japaneseSkill" id="japaneseSkill" className="btn btn-primary" style={{background: "#2C5197", marginRight:10}}>
              <option selected disabled>Select Japanese Skill</option>
              <option value="3">N3 and above</option>
              <option value="2">N2 and above</option>
              <option value="1">N1</option>
            </select>
            <select name="employmentStatus" id="employmentStatus" className="btn btn-primary" style={{background: "#2C5197", marginRight:10}}>
              <option selected disabled>Select Employment Status</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
            </select>
        </div>
        <br/>
        <div className="dropdown">
          <input type="number" className="btn btn-primary" id="minSalary" name="minSalary" placeholder="Enter Minimum Salary" value={this.state.minSalary} style={{background: "#2C5197", marginRight:10}} />
          <input type="number" className="btn btn-primary" id="maxSalary" name="maxSalary" placeholder="Enter Maximum Salary" value={this.state.maxSalary}style={{background: "#2C5197", marginRight:10}} />
          <button type="button" className="btn btn-success">Search</button>
        </div>
    </div> 

  <div className="tab-content"> 
    <div className="container tab-pane active" id="default">
      <div className="h-25" id="job">
          <h2 style={{fontFamily: "Lucida Sans Unicode", paddingBottom:15 }}>Recommended Jobs</h2>
      </div>
      <div className="row">
        {this.state.jobLimit.map(Jobs => (
          <div className="col-sm-6 box" key={Jobs.id}>
            <h3>{Jobs.jobName} </h3>
            <Link href={`/detail?job=${Jobs.id}`}>
              <a><button type="button" className="btn btn-info btn-float" style={{background:"#1D85CA"}}>View Detail</button></a>
            </Link>
            <small><i>Posted on {Jobs.postedDate}</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10, background:"#1D85CA"}}>{Jobs.employmentStatus}</span>
              <span className="badge badge-info" style={{background:"#1D85CA"}}>N{Jobs.japaneseSkill} and above</span>
            </div>
              <table>
                <tr>
                  <td><p>Working Location: {Jobs.jobAddress}</p></td>
                  <td><p>Salary: {Jobs.minSalary} ~ {Jobs.maxSalary}</p></td>
                </tr>
                <tr>
                  <td><p>Working Days: {Jobs.workingDays} days a week</p></td>
                  <td><p>Working Hours: {Jobs.workingHours}</p></td>
                </tr>
              </table>
          </div>
        ))}
      </div>
          <div className="center">
            <a data-toggle="tab" href="#list"><button type="button" className="btn btn-secondary" style={{background:"#33588f", color: "#EBF1F6", width: 250+"px", borderColor:" #B0C4DE" }}>View More</button></a>
          </div>  
      </div>

    <div className="container tab-pane" id="list" style={{marginBottom: 30}}>
      <div className="h-25">
      <div className="row">
        <div className="col-sm-8">
          <h2 style={{fontFamily: "Lucida Sans Unicode" }}>All Jobs List</h2>
        </div>
        <div className="col-sm-4">
          <select name="sortby" id="dateFilter" className="btn-float select-css" onChange={this.dateSorted}>
            <option selected disabled>Filtered by Date</option>
            <option value="old_to_new">Oldest to Newest</option>
            <option value="new_to_old">Newest to Oldest</option>
          </select>
        </div>
      </div>
      </div>
    
    <table ref={this.datatableRef} className="display" style={{width:100+"%", marginBottom:20}}>
            <thead>
                <tr>
                    <th></th>
                </tr>
            </thead>
        <tbody>
         {this.state.allJobs && this.state.allJobs.map(Job => (
           <tr id={Job.id}>
            <td className="box" style={{paddingLeft: 40, paddingRight: 40, paddingTop: 30}}>
              <h3>{Job.jobName} </h3>
              <Link href={`/detail?job=${Job.id}`}>
                <a><button type="button" className="btn btn-info btn-float" style={{background:"#1D85CA"}}>View Detail</button></a>
              </Link>
              <div className="m-b">
              <small><i>Posted on {Job.postedDate}</i></small> &nbsp;
                <span className="badge badge-info" style={{marginRight:10, background:"#1D85CA"}}>{Job.employmentStatus}</span>
                <span className="badge badge-info" style={{background:"#1D85CA"}}>N{Job.japaneseSkill} and above</span>
              </div>
              <div className="row">
                <div className="col-sm-6">
                   <p>Working Location: {Job.jobAddress}</p>
                   <p>Salary: {Job.minSalary} ~ {Job.maxSalary}</p>
                </div>
                <div className="col-sm-6">
                    <p>Working Days: {Job.workingDays} days a week</p>
                    <p>Working Hours: {Job.workingHours}</p>
                </div>
              </div>
            </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
  </div>

      <div className="jumbotron text-left p-3 foot-color" style={{marginBottom: 0}}>
        <h3 style={{paddingTop: 20, color: "#0C364B"}}>Contact &nbsp; | &nbsp; <a href="/About" style={{color: "#026FB4"}}> About Us</a></h3> 
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
  )} }
