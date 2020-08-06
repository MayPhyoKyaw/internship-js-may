import React from 'react';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import {loadFirebase, JOB_COLLECTION, AREA_COLLECTION, CITY_COLLECTION, EMPLOYER_COLLECTION, getCollectionRecords} from '../lib/db.js';

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.datatableRef1 = React.createRef();
    this.datatableRef2 = React.createRef();
    this.$datatable1 = null
    this.$datatable2 = null
    this.state = {
      AREAID : '',
      CITYID : '',
      employmentStatus : '',
      japaneseSkill : '',
      minSalary : '',
      maxSalary : '',
      filteredJob : '',
      noJobFound : false,
      allJobs : props.job || [],
      cities : props.city || [],
      areas : props.area || [],
      jobLimit : props.joblimit || [],
    }
  }

  static async getInitialProps() {
    const firebase = await loadFirebase() 
    const jobs = await getCollectionRecords(JOB_COLLECTION)
    const areas = await getCollectionRecords(AREA_COLLECTION) 
    const cities = await getCollectionRecords(CITY_COLLECTION) 
    const employers = await getCollectionRecords(EMPLOYER_COLLECTION) 
    const joblimitQuery = await firebase
      .firestore()
      .collection("job")
      .orderBy("postedDate")
      .get();
    const jobLimit = joblimitQuery.docs.map((doc) => ({
        data: doc.data(),
        id: doc.id,
    }));  
    return {job: jobs, joblimit: jobLimit.reverse().slice(0,9), area : areas, city : cities, employer: employers}
  }

  componentDidMount() {
    this.initializeDatatable()
    document.getElementById("btnSearch").disabled = true;
    document.getElementById("btnReset").disabled = true;
    document.getElementById("city").disabled = true;
  }

  initializeDatatable() {
    this.$datatable1 = $(this.datatableRef1.current).DataTable({
      "dom": '<"top"fi>rt<"bottom"lp><"clear">',
      "ordering" : false,
      "language": {
        "sLengthMenu": "", 
        "info": "",
        "zeroRecords": "No Matching Result Found"
      }
    });
    this.$datatable2 = $(this.datatableRef2.current).DataTable({
      "ordering" : false,
      "info": false,
      "searching": false,
      "language": {
        "sLengthMenu": "", 
        "zeroRecords": "No Matching Result Found"
      }
    });
    
  }

  refreshTable() {
    const self = this;
    Index
      .getInitialProps()
      .then((response) => {
        self.setState({
          allJobs: response.job,
          filteredJob: response.job
        });
      })
      .bind(this);
  }

  handleChange = (event) => {
    document.getElementById("btnSearch").disabled = false;
    document.getElementById("btnReset").disabled = false;
    
    this.setState({[event.target.name] : event.target.value})
    if(event.target.name == "AREAID"){
        this.getAreas(event.target.value)
        this.getCities(event.target.value)
        document.getElementById("city").disabled = false;
        $("#city option:first").attr("selected","selected");
    }
  }

  getAreas = (id) => {
    let area = {}
    try{
      const firebase = loadFirebase()
      firebase.firestore().collection('area').doc(id).get()
      .then((snapshot)=>{
          area = snapshot.data();
          this.setState({areaName : area.areaName})
      })  
    }catch(error){
        console.log(error)
    }
  }

  getCities = (id) => {
    let cities = []
    try{
        let firebase = loadFirebase()
        firebase.firestore().collection('city')
          .where('AREAID',"==",id)
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
                    jobs.push(Object.assign({
                      id : doc.id,
                      data: doc.data()
                    }))
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
                    jobs.push(Object.assign({
                      id : doc.id,
                      data: doc.data()
                    }))
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
                    jobs.push(Object.assign({
                      id : doc.id,
                      data : doc.data()
                    }))
                })
                this.setState({allJobs : jobs})
            })
        }catch(error){
            console.log(error)
        }
    }
  }

  getDate = (object) => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(object.seconds);
    return t.getDate()+'/'+(t.getMonth()+1)+'/'+t.getFullYear()
  }

  selectDisable = () => {
    $("#area option:first").attr("disabled","disabled");
    $("#city option:first").attr("disabled","disabled");
    $("#japaneseSkill option:first").attr("disabled","disabled");
    $("#employmentStatus option:first").attr("disabled","disabled");
  }

  reset = () => {
    this.setState({
      minSalary : '',
      filteredJob : '',
      AREAID : '',
      CITYID : '',
      employmentStatus : '',
      japaneseSkill : '',
    })

    $("#area option[selected]").removeAttr("selected");
    $("#area option:first").attr("selected","selected");
    $("#city option[selected]").removeAttr("selected");
    $("#city option:first").attr("selected","selected");
    $("#japaneseSkill option[selected]").removeAttr("selected");
    $("#japaneseSkill option:first").attr("selected","selected");
    $("#employmentStatus option[selected]").removeAttr("selected");
    $("#employmentStatus option:first").attr("selected","selected");

    document.getElementById("btnSearch").disabled = true;
    document.getElementById("btnReset").disabled = true;
    document.getElementById("city").disabled = true;

  }

  filter = () => {
    let jobs = []
    let filteredJobs = []
    let filteredID = []
    console.log(this.state)
    try{
      const firebase = loadFirebase()
        let filterQuery = firebase.firestore().collection('job')
        if(this.state.japaneseSkill !== ""){
          filterQuery = filterQuery.where('japaneseSkill','<=',this.state.japaneseSkill)
        }
        if(this.state.employmentStatus !== ""){
          filterQuery = filterQuery.where('employmentStatus','==',this.state.employmentStatus)
        }
        if(this.state.AREAID !== ""){
          filterQuery = filterQuery.where('AREAID','==',this.state.AREAID)
        }
        if(this.state.CITYID !== ""){
          filterQuery = filterQuery.where('CITYID','==',this.state.CITYID)
        }
        if(this.state.minSalary !== ""){
          filterQuery = filterQuery.where('minSalary','>=',this.state.minSalary)
        }
        
        filterQuery.get()
        .then(querySnaphsot => {
          querySnaphsot.forEach(doc=>{
            jobs.push(Object.assign({
              id : doc.id,
              data : doc.data()
            }))
          })
          filteredID = [...new Set(jobs.map(Job => Job.id))] 
          console.log(filteredID)
          if(filteredID.length > 0){
            filteredID.forEach(id => {
              loadFirebase().firestore().collection('job').doc(id).get()
              .then(snapshot => {
                filteredJobs.push(Object.assign({
                  id : id, 
                  data : snapshot.data()
                }))
                this.setState({filteredJob: filteredJobs})
              })
            })
          }else{
            this.setState({filteredJob : []})
            this.setState({noJobFound : true})
          }

        })        
    }catch(error){
        console.log(error)
    }
  }

  jobLocation = (CITYID, AREAID) => {
    const city = this.props.city
    const area = this.props.area
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

  areaJobCount = (id) => {
    let count = 0
    this.state.allJobs.map(job => {
      if(job.data.AREAID == id){
        count ++
      }
    })
    return count;     
  }

  cityJobCount = (id) => {
    let count = 0
    this.state.allJobs.map(job => {
      if(job.data.CITYID == id){
        count ++
      }
    })
    return count;     
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
            margin: 20px 10px 0px 10px;
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
            height: 40px;
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
      <img src="/p1.jpg" height="45" width="200" style={{marginLeft : 15}}/>
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
        <h1 style={{fontFamily: "Lucida Console"}}>Nursing Job Seeker Japan</h1>
        <br/>
        <div className="dropdown" style={{paddingBottom: 0, paddingTop: 30}}>
          <select name="AREAID" id="area" className="btn btn-primary" onChange={this.handleChange} onClick={this.selectDisable} style={{background: "#2C5197", marginRight:10, marginBottom: 5}}>
              <option>Select Area</option>
              {this.state.areas.map(Area => (
                  <option value={Area.id}>{Area.data.areaName} ({this.areaJobCount(Area.id)})</option>
              ))}
          </select>
          <select name="CITYID" id="city" className="btn btn-primary" onChange={this.handleChange} onClick={this.selectDisable}  style={{background: "#2C5197", marginRight:10, marginBottom: 5}}>
                  <option>Select City</option>
                  {this.state.cities.map(city => (
                      <option value={city.id}>{city.cityName} ({this.cityJobCount(city.id)})</option>
                  ))}
          </select>
          <select name="japaneseSkill" id="japaneseSkill" className="btn btn-primary" onChange={this.handleChange} onClick={this.selectDisable} style={{background: "#2C5197", marginRight:10, marginBottom: 5}}>
              <option>Select Japanese Skill</option>
              <option value="3">N3 and above</option>
              <option value="2">N2 and above</option>
              <option value="1">N1</option>
          </select>
          <select name="employmentStatus" id="employmentStatus" className="btn btn-primary" onChange={this.handleChange} onClick={this.selectDisable} style={{background: "#2C5197", marginRight:10, marginBottom: 5}}>
              <option>Select Employment Status</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
          </select>
          <input type="number" className="btn btn-primary" id="minSalary" name="minSalary" onChange={this.handleChange} placeholder="Enter Minimum Salary" value={this.state.minSalary} style={{background: "#2C5197", marginRight:10, marginBottom: 5}} />
        
          <button id="btnSearch" type="button" className="btn btn-success" data-toggle="tab" href="#filter" onClick={this.filter} style={{marginBottom: 5}}>Search</button>
          <button id="btnReset" type="button" className="btn btn-danger" data-toggle="tab" href="#list" onClick={this.reset} style={{marginLeft : 10}}>Reset</button>
        </div>
      </div> 

  <div className="tab-content"> 
    <div className="container tab-pane active" id="default">
      <div className="h-25" id="job">
          <h2 style={{fontFamily: "Lucida Sans Unicode", paddingBottom:15 }}>Recommended Jobs</h2>
      </div>
      <div className="row">
        {this.state.jobLimit.map(Jobs => (
          <div className="col-sm-4 p3 box" key={Jobs.id} style={{marginBottom: 20, paddingTop:20}}>
            <h4>{Jobs.data.jobName} </h4>
            <Link href={`/detail?job=${Jobs.id}`}>
              <a><button type="button" className="btn btn-info btn-float" style={{background:"#1D85CA"}}>View Detail</button></a>
            </Link>
            <small><i>Posted on {this.getDate(Jobs.data.postedDate)}</i></small> 
            <div className="m-b">
              <span className="badge badge-info" style={{marginRight:10, background:"#1D85CA"}}>{Jobs.data.employmentStatus}</span>
              <span className="badge badge-info" style={{background:"#1D85CA"}}>N{Jobs.data.japaneseSkill} and above</span>
            </div>
                <ul style={{listStyleType: "none", paddingLeft: 0}}>
                  <li><b>Working Location:</b> {this.jobLocation(Jobs.data.CITYID, Jobs.data.AREAID)}</li>
                  <li><b>Salary:</b> {Jobs.data.minSalary} ~ {Jobs.data.maxSalary} per Month</li>
                  <li><b>Working Days:</b> {Jobs.data.workingDays} days a week</li>
                  <li><b>Working Hours:</b> {Jobs.data.workingHours}</li>
                </ul>
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
    
      <table ref={this.datatableRef1} id="example" className="display" style={{width:100+"%"}}>
                    <thead className="thread-color">
                        <tr>
                          <td></td>
                        </tr>
                    </thead>
        <tbody>
         {this.state.allJobs && this.state.allJobs.map(Job => (
           <tr id={Job.id}>
            <td className="box" style={{paddingLeft: 40, paddingRight: 40}}>
              <h3>{Job.data.jobName} </h3>
              <Link href={`/detail?job=${Job.id}`}>
                <a><button type="button" className="btn btn-info btn-float" style={{background:"#1D85CA"}}>View Detail</button></a>
              </Link>
              <div className="m-b">
              <small><i>Posted on {this.getDate(Job.data.postedDate)}</i></small> &nbsp;
                <span className="badge badge-info" style={{marginRight:10, background:"#1D85CA"}}>{Job.data.employmentStatus}</span>
                <span className="badge badge-info" style={{background:"#1D85CA"}}>N{Job.data.japaneseSkill} and above</span>
              </div>
              <div className="row" style={{paddingBottom: 0, paddingTop: 0}}>
                <div className="col-sm-6">
                   <p>Working Location: {this.jobLocation(Job.data.CITYID, Job.data.AREAID)}</p>
                   <p>Salary: {Job.data.minSalary} ~ {Job.data.maxSalary} per Month</p>
                </div>
                <div className="col-sm-6">
                    <p>Working Days: {Job.data.workingDays} days a week</p>
                    <p>Working Hours: {Job.data.workingHours}</p>
                </div>
              </div>
              </td>
            </tr>
          ))}
        </tbody>
    </table>
    </div>
    {this.state.filteredJob.length<=0 && this.state.noJobFound && <div className="container" style={{paddingTop: 30, paddingLeft: 50, fontSize: 30}}>No Jobs Found</div> }
    <div className="container tab-pane" id="filter" style={{marginBottom: 30}}>
    
    <table ref={this.datatableRef2} id="example" className="display" style={{width:100+"%"}}>
                    <thead className="thread-color">
                        <tr>
                          <td></td>
                        </tr>
                    </thead>
                    <tbody>
         {this.state.filteredJob && this.state.filteredJob.map(Job => (
           <tr id={Job.id}>
            <td className="box" style={{paddingLeft: 40, paddingRight: 40}}>
              <h3>{Job.data.jobName} </h3>
              <Link href={`/detail?job=${Job.id}`}>
                <a><button type="button" className="btn btn-info btn-float" style={{background:"#1D85CA"}}>View Detail</button></a>
              </Link>
              <div className="m-b">
              <small><i>Posted on {this.getDate(Job.data.postedDate)}</i></small> &nbsp;
                <span className="badge badge-info" style={{marginRight:10, background:"#1D85CA"}}>{Job.data.employmentStatus}</span>
                <span className="badge badge-info" style={{background:"#1D85CA"}}>N{Job.data.japaneseSkill} and above</span>
              </div>
              <div className="row" style={{paddingBottom: 0, paddingTop: 0}}>
                <div className="col-sm-6">
                   <p>Working Location: {this.jobLocation(Job.data.CITYID, Job.data.AREAID)}</p>
                   <p>Salary: {Job.data.minSalary} ~ {Job.data.maxSalary} per Month</p>
                </div>
                <div className="col-sm-6">
                    <p>Working Days: {Job.data.workingDays} days a week</p>
                    <p>Working Hours: {Job.data.workingHours}</p>
                </div>
              </div>
            </td>
            </tr>
          ))}
     </tbody>
    </table>
    </div>
  </div>

      <div className="jumbotron text-left p-1 foot-color" style={{marginBottom: 0}}>
        <h3 style={{color: "#0C364B", paddingLeft:30}}>Contact &nbsp; | &nbsp; <a href="/About" style={{color: "#026FB4"}}> About Us</a></h3> 
        <br/>
        <table>
            <tr>
              <td className="text-center" style={{paddingLeft:30}}>Company Name Co., Ltd.</td>
            </tr>
            <tr style={{paddingBottom:10, paddingLeft:50}}>
              <td style={{paddingLeft:50}}><span className="fa fa-phone" style={{fontSize:20}}></span>:  +00-11-000-1111</td>
              <td><span className="fa fa-globe" style={{fontSize:20}}></span>:  www.jobseeker.co.jp</td>
              <td rowspan="2"><a href="#" className="fa fa-twitter"></a></td>
              <td rowspan="2"><a href="#" className="fa fa-facebook fa-facebook-f"></a></td>
            </tr>
            <tr style={{paddingLeft:50}}>
              <td style={{paddingLeft:50}}><span className="fa fa-envelope" style={{fontSize:20}}></span>: jobseeker@dummy.jp</td>
              <td><span className="fa fa-map-marker" style={{fontSize:20}}></span>: No.--, Detail Address, City, State</td>
            </tr>
        </table>
      </div> 

        <footer className="text-center">copyright&#169;jobseeker.co.jp</footer>         
</body>
</html>
  )} }
