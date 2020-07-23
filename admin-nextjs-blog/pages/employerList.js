import React, { useReducer } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class employerList extends React.Component {

    constructor (props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.datatableRef = React.createRef();
        this.$datatable = null
        this.initial_state = {
            EMPLOYERID : '',
            jobName : '',
            workingDays : '',
            jobPhone : '',
            workingHours : '',
            jobEmail : '',
            AREAID : '',
            CITYID : '',
            ageRange : '',
            minSalary : '',
            maxSalary : '',
            employmentStatus : '',
            japaneseSkill : '',
            jobAddress : '',
            postedDate : '',
            jobDescription : '',
            qualification : '',
            FAQ1 : '',
            FAQ2 : '',
            FAQ3 : '',
            employerName : '',
            employerPhone : '',
            employerEmail : '',
            employerAddress : '',
            companyDescription : '',
            employers: props.employer || [],
            jobs : props.jobs || [],
            areas: props.area || [],
        };
        this.state = this.initial_state;
    }

    componentDidMount () {
        this.initializeDatatable()
    }
    initializeDatatable() {
        this.$datatable = $(this.datatableRef.current).DataTable({
            order: [[3, "desc"]],
        });
    }
    refreshTable() {
        this.$datatable.clear()
        const self = this;
        employerList
            .getInitialProps()
            .then((response) => {
            self.setState({
                employers: response.employer,
                jobs : response.jobs
            });
        })
        .bind(this);
    }

    refreshAfterAddTable() {
        const self = this;
        employerList
            .getInitialProps()
            .then((response) => {
            self.setState({
                jobs : response.jobs,
                employers: response.employer,
            });
        })
    }

    static async getInitialProps() {
        const firebase = await loadFirebase() 
        const employerQuerySnapshot = await firebase
            .firestore()
            .collection("employer")
            .limit(10)
            .get();
        const employers = employerQuerySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
        const areaQuerySnapshot = await firebase
            .firestore()
            .collection("area")
            .limit(10)
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

        const jobQuerySnapshot = await firebase
        .firestore()
        .collection("job")
        .get();
        const jobs = jobQuerySnapshot.docs.map((doc) => ({
            data : doc.data(),
            id: doc.id,
        }));
        return { employer: employers, area: areas, city : cities , jobs : jobs };
    }

    deletePassId = (id)=>{
        $("#deleteConfirmModal").modal('show');
        this.setState({delete_id : id})
        console.log(this.state.delete_id)
    }

    addPassId = (id) => {
        this.setState({edit_id : id})
        let firebase = loadFirebase()
        let data = {}
        try{
            firebase.firestore().collection('employer').doc(id).get().
            then((snapshot)=>{
                data = snapshot.data()
                console.log(data)
                this.setState ({
                    EMPLOYERID: data.edit_id,
                    employerName : data.employerName,
                    employerPhone : data.employerPhone,
                    employerEmail : data.employerEmail,
                    employerAddress : data.employerAddress,
                    companyDescription : data.companyDescription
                })
            })
            console.log("getting data")
            console.log(this.state.employerName)
        }catch(error){
            console.log(error)
        }
        console.log(this.state.employerName)
        $("#addJobModal").modal('show')
    }

    editPassId = (id) => {
        this.setState({edit_id : id})
        let firebase = loadFirebase()
        let data = {}
        try{
            firebase.firestore().collection('employer').doc(id).get()
            .then((snapshot)=>{
                data = snapshot.data()
                console.log(data)
                this.setState ({
                    employerName : data.employerName,
                    employerPhone : data.employerPhone,
                    employerEmail : data.employerEmail,
                    employerAddress : data.employerAddress,
                    companyDescription : data.companyDescription
                })
            })
            console.log("getting data")
            console.log(this.state.employerName)
            
        }catch(error){
            console.log(error)
        }
        console.log(this.state.employerName)
        $("#editEmployerModal").modal('show')
    }

    updateEmployer = () =>{
        let firebase = loadFirebase()
        try{
            firebase.firestore().collection('employer').doc(this.state.edit_id).update({
                employerName : this.state.employerName,
                employerPhone : this.state.employerPhone,
                employerEmail : this.state.employerEmail,
                employerAddress : this.state.employerAddress,
                companyDescription : this.state.companyDescription,
            });
            this.refreshTable();
        }catch(error){
            console.log(error)
        }
        $("#editEmployerModal").modal('hide')
    }

    jobCount = (id) => {
        let jobs= this.state.jobs
        let count = 0
            jobs.map(job => {
                 if(job.data.EMPLOYERID == id){
                     count ++
                 } 
             })
             return count;     
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
        if(event.target.name == "AREAID"){
            this.getCities(event.target.value)
        }
        this.setState({showCities : true})
    }

    addJob = event => {
        event.preventDefault();
        let firebase = loadFirebase() 
        const userRef = firebase.firestore().collection('job')
                .add({
                        EMPLOYERID : this.state.edit_id,
                        jobName : this.state.jobName,
                        workingDays : this.state.workingDays,
                        jobPhone : this.state.jobPhone,
                        workingHours : this.state.workingHours,
                        AREAID : this.state.AREAID,
                        CITYID :   this.state.CITYID,   
                        jobEmail : this.state.jobEmail,
                        ageRange : this.state.ageRange,
                        minSalary : this.state.minSalary,
                        maxSalary : this.state.maxSalary,
                        employmentStatus : this.state.employmentStatus,
                        japaneseSkill : this.state.japaneseSkill,
                        jobAddress : this.state.jobAddress,
                        postedDate : this.state.postedDate,
                        jobDescription : this.state.jobDescription,
                        qualification : this.state.qualification,
                        FAQ1 : this.state.FAQ1,
                        FAQ2 : this.state.FAQ2,
                        FAQ3 : this.state.FAQ3
                    });
                this.setState({
                    EMPLOYERID : '',
                    jobName : '',
                    workingDays : '',
                    jobPhone : '',
                    workingHours : '',
                    jobEmail : '',
                    AREAID : '',
                    CITYID : '',
                    ageRange : '',
                    minSalary : '',
                    maxSalary : '',
                    employmentStatus : '',
                    japaneseSkill : '',
                    jobAddress : '',
                    postedDate : '',
                    jobDescription : '',
                    qualification : '',
                    FAQ1 : '',
                    FAQ2 : '',
                    FAQ3 : ''
                }); 
                this.refreshAfterAddTable();
                console.log(userRef);
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
    }

    selectDisable = (event) => {   
        $("#city option:first").attr("disabled","disabled");
   
        $("#area option:first").attr("disabled","disabled"); 
    }

    addEmployer = event => {
        event.preventDefault();
        let firebase = loadFirebase() 
        const userRef = firebase.firestore().collection('employer')
                .add({
                        employerName : this.state.employerName,
                        employerPhone : this.state.employerPhone,
                        employerEmail : this.state.employerEmail,
                        employerAddress : this.state.employerAddress,
                        companyDescription : this.state.companyDescription
                    });
                this.setState({
                    employerName : '',
                    employerPhone : '',
                    employerEmail : '',
                    employerAddress : '',
                    companyDescription : ''
                });
        $("#addEmployerModal").modal('hide');     
        this.refreshAfterAddTable(); 
    }

    deleteEmployer = () => {
        let firebase = loadFirebase()
        try{
            firebase.firestore().collection('employer')
            .doc(this.state.delete_id)
            .delete()
            console.log("Delete successful");
            this.refreshTable();
        }catch(error){
            console.log(error)
        }
    }

    clearInput = (event) => {
        this.setState(this.initial_state);
        let inputs, index;

        inputs = document.getElementsByTagName('input');
        for (index = 0; index < inputs.length; ++index) {
            inputs[index].value = ''
        }
        document.getElementById('jobAddress').value = '';
        document.getElementById('qualification').value = '';
        document.getElementById('jobDescription').value = '';
        document.getElementById('FAQ1').value = '';
        document.getElementById('FAQ2').value = '';
        document.getElementById('FAQ3').value = '';  
  
        $("#employmentStatus option[selected]").removeAttr("selected");    
        $("#employmentStatus option:first").attr("selected","selected");
        $("#japaneseSkill option[selected]").removeAttr("selected");    
        $("#japaneseSkill option:first").attr("selected","selected");
        $("#area option[selected]").removeAttr("selected");    
        $("#area option:first").attr("selected","selected"); 
        $("#city option[selected]").removeAttr("selected");    
        $("#city option:first").attr("selected","selected"); 
    }

  render() {
    // const area = this.props.area
    const cities = this.state.cities
    return (
<html>
<head>
    <title>Job Seeker Admin-Job List</title>   
</head>
<body>
    <nav className="navbar bg-color sticky-top" style={{width: 100 + "%"}}>
        <img src="/p1.jpg" height="35" width="200" />
        <ul className="nav nav-tabs box-margin">
            <li className="nav-item">
              <a className="nav-link" href="/jobList" style={{color: "aliceblue"}}>Job</a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">Employer</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" style={{color: "rgb(169, 195, 218)"}}><i className="fa fa-user-circle" style={{fontSize:24}}></i> Username</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/adminProfile"><i className="fa fa-user"></i> Profile</a>
                  <a className="dropdown-item" href="#"><i className="fa fa-tasks"></i> Activity Log</a>
                  <a className="dropdown-item" href="#"><i className="fa fa-sign-out-alt"></i> Sign Out</a>
                </div>
            </li>
          </ul>
    </nav>
    <div className="container admin-container">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-xs-6">
                        <a className="btn btn-success" href="#addEmployerModal" data-toggle="modal"><i className="fa fa-plus-circle"></i> <span>Add New Employer</span></a>
                    </div>
                    <div className="col-xs-6">
                    </div>
                </div>
            </div>
                <table ref={this.datatableRef} id="example" className="display" style={{width:100+"%"}}>
                    <thead className="thread-color">
                        <tr>
                            <th>Employer Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Number of Jobs</th>
                            <th>Address</th>
                            <th>Company Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.employers.map((Employer) => (
                        <tr key={Employer.id}>
                            <td>{Employer.employerName}</td>
                            <td>{Employer.employerEmail}</td>
                            <td>{Employer.employerPhone}</td>
                            <td>{this.jobCount(Employer.id)}</td>
                            <td>{Employer.employerAddress}</td>
                            <td>{Employer.companyDescription}</td>
                            <td>
                                <a><button onClick={()=>this.addPassId(Employer.id)}  className="view btn btn-success fa fa-plus-circle" title="add" style={{cursor:"pointer", margin:"auto"}} data-dismiss="modal" data-toggle="tooltip"> Add Job </button></a> &nbsp; <br/>
                                <a><button onClick={()=>this.editPassId(Employer.id)} className="edit btn btn-warning fa fa-pencil-square-o" title="Edit" style={{ cursor:"pointer"}} data-dismiss="modal" data-toggle="tooltip"> </button></a> &nbsp;
								<a onClick={()=>this.deletePassId(Employer.id)}> <button className="delete btn btn-danger fa fa-trash" title="Delete"  style={{ cursor:"pointer"}} data-dismiss="modal"> </button></a> &nbsp;
							</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Employer Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Number of Jobs</th>
                            <th>Address</th>
                            <th>Company Description</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
        </div>
    </div>
	
	<div id="editEmployerModal" className="modal fade">
		<div className="modal-dialog info-dialog">
			<div className="modal-content">
					<div className="modal-header">						
						<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Application Requirement</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.clearInput}>&times;</button>
					</div>
					<form action="#" method="post" style={{width: 100+"%", margin: "auto", marginTop: 20}}>
                                <div className="card-header p-0">
                                    <div className="bg-info text-white py-2" style={{paddingLeft:20}}>
                                        <h3><i className="fa fa-file-alt"></i> Employer Information Edition</h3>
                                    </div>
                                </div>
                                <div className="card-body p-3">

                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fa fa-address-card text-info"></i></div>
                                                </div>
                                                <input type="text" className="form-control" id="employerName" name="employerName" placeholder="Enter Employer Name" value={this.state.employerName} onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                        
                                          <div className="form-group">
                                              <div className="input-group mb-2">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                                  </div>
                                                  <input type="text" className="form-control" id="phone" name="employerPhone" placeholder="Enter Employer Phone Number" value={this.state.employerPhone} onChange={this.handleChange} required />
                                              </div>
                                          </div>
                                
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                                    </div>
                                                    <input type="email" className="form-control" id="employerEmail" name="employerEmail" placeholder="e.g. ejemplo@gmail.com" value={this.state.employerEmail} onChange={this.handleChange} required />
                                                </div>
                                            </div>
                                    
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fas fa-map-marked-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" name="employerAddress" placeholder="Enter Address" required value={this.state.employerAddress} onChange={this.handleChange}></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fas fa-map-marked-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" name="companyDescription" placeholder="Enter Company Description" value={this.state.companyDescription} onChange={this.handleChange} required></textarea>
                                        </div>
                                    </div>
                                </div>
                        
                        <div className="modal-footer">
                            <input type="button" onClick={this.updateEmployer} value="Update" className="btn btn-info btn-width rounded-4 py-2" style={{marginRight:10}} />
                            <input type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearInput} value="Cancel" />
                        </div>
                    </form>
			</div>
		</div>
	</div>

    <div id="addEmployerModal" className="modal fade">
		<div className="modal-dialog info-dialog">
			<div className="modal-content">
					<div className="modal-header">						
						<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Employer Information</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={this.clearInput}>&times;</button>
					</div>
					<form action="#" method="post" style={{width: 100+"%", margin: "auto", marginTop: 20}} onSubmit={this.addEmployer} >
                                <div className="card-body p-3">
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fa fa-address-card text-info"></i></div>
                                                </div>
                                                <input type="text" className="form-control" id="employerName" name="employerName" placeholder="Enter Employer Name" onChange={this.handleChange} value={this.state.employerName} required />
                                            </div>
                                        </div>
                                        
                                          <div className="form-group">
                                              <div className="input-group mb-2">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                                  </div>
                                                  <input type="text" className="form-control" id="phone" name="employerPhone" placeholder="Enter Employer Phone Number" onChange={this.handleChange} value={this.state.employerPhone} required />
                                              </div>
                                          </div>
                                
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                                    </div>
                                                    <input type="email" className="form-control" id="employerEmail" name="employerEmail" placeholder="e.g. ejemplo@gmail.com" onChange={this.handleChange} value={this.state.employerEmail} required />
                                                </div>
                                            </div>
    
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fas fa-map-marked-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" id="employerAddress" name="employerAddress" placeholder="Enter Address" onChange={this.handleChange} value={this.state.employerAddress} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fas fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" id="companyDescription" name="companyDescription" placeholder="Enter Company Description" onChange={this.handleChange} value={this.state.companyDescription} required></textarea>
                                        </div>
                                    </div>
                                </div>
                        <div className="modal-footer">
                            <input type="submit" value="Add Employer" className="btn btn-info btn-width rounded-4 py-2" style={{marginRight:10}} />
                            <input type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearInput} value="Cancel" />
                        </div>
                    </form>
			</div>
		</div>
	</div>

    <div id="addJobModal" className="modal fade">
		<div className="modal-dialog info-dialog">
			<div className="modal-content">
					<div className="modal-header">						
                        <h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>{this.state.employerName}</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<form action="#" method="post" style={{width: 100+"%", margin:"auto", marginTop: 20}} onSubmit={this.addJob}>
                                <div className="card-header p-0">
                                    <div className="bg-info text-white py-2" style={{paddingLeft:20}}>
                                        <h3><i className="fa fa-file-alt"></i> Application Requirement</h3>
                                    </div>
                                </div>
                                <input type="hidden" className="form-control" id="EMPLOYERID" name="EMPLOYERID" value={this.state.edit_id} required />
                                <div className="card-body p-3">
                                    <div className="row">
                                      <div className="col-sm-6">
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fa fa-briefcase text-info"></i></div>
                                                </div>
                                                <input type="text" className="form-control" id="jobName" name="jobName" placeholder="Enter Job Name" onChange={this.handleChange} value={this.state.jobName} required />
                                            </div>
                                        </div>
                                      </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-calendar-alt text-info"></i></div>
                                                    </div>
                                                    <input type="number" className="form-control" id="workingDays" name="workingDays" placeholder="Working Days per Week" onChange={this.handleChange} value={this.state.workingDays} required /> &nbsp; days per week
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                          <div className="form-group">
                                              <div className="input-group mb-2">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                                  </div>
                                                  <input type="text" className="form-control" id="jobPhone" name="jobPhone" placeholder="Enter Employer Phone Number" onChange={this.handleChange} value={this.state.jobPhone} required />
                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                              <div className="form-group">
                                                  <div className="input-group mb-2">
                                                      <div className="input-group-prepend">
                                                          <div className="input-group-text"><i className="fa fa-hourglass-half text-info"></i></div>
                                                      </div>
                                                      <input type="text" className="form-control" id="workingHours" name="workingHours" placeholder="e.g. 9:00-17:00" onChange={this.handleChange} value={this.state.workingHours} required />
                                                  </div>
                                              </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                                    </div>
                                                    <input type="email" className="form-control" id="jobEmail" name="jobEmail" placeholder="e.g. ejemplo@gmail.com" onChange={this.handleChange} value={this.state.jobEmail} required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-calendar-check text-info"></i></div>
                                                    </div>
                                                    <input type="text" className="form-control" id="ageRange" name="ageRange" placeholder="e.g. 23~25" onChange={this.handleChange} value={this.state.ageRange} required /> &nbsp; years old
                                                </div>
                                            </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-sm-6">
                                          <div className="form-group">
                                              <div className="input-group mb-2">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text"><i className="fa fa-map-marked text-info"></i></div>
                                                  </div>
                                                  <select name="AREAID" id="area" className="form-control" onClick={this.selectDisable} onChange={this.handleChange} value={this.state.selectedValue} required>
                                                    <option selected disabled>Select Area</option>
                                                    {this.state.areas.map(jobArea => (
                                                        <option value={jobArea.id}>{jobArea.areaName}</option>
                                                    ))}
                                                  </select>
                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                              <div className="form-group">
                                                  <div className="input-group mb-2">
                                                      <div className="input-group-prepend">
                                                          <div className="input-group-text"><i className="fa fa-yen-sign text-info"></i></div>
                                                      </div>
                                                      <input type="text" className="form-control" id="minSalary" name="minSalary" placeholder="Enter Minimum Salary" onChange={this.handleChange} value={this.state.minSalary} required /> &nbsp; Yen
                                                  </div>
                                              </div>
                                        </div>
                                      </div>

                                      <div className="row">
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-map-marked text-info"></i></div>
                                                    </div>
                                                    {this.state.showCities && (
                                                    <select name="CITYID" id="city" className="form-control" onClick={this.selectDisable} onChange={this.handleChange} value={this.state.selectedValue} required>
                                                        <option selected disabled>Select City</option>
                                                        {cities &&  cities.map(city => (
                                                            <option value={city.id}>{city.cityName}</option>
                                                        ))}
                                                    
                                                    </select>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                              <div className="form-group">
                                                  <div className="input-group mb-2">
                                                      <div className="input-group-prepend">
                                                          <div className="input-group-text"><i className="fa fa-yen-sign text-info"></i></div>
                                                      </div>
                                                      <input type="text" className="form-control" id="maxSalary" name="maxSalary" placeholder="Enter Maximum Salary" onChange={this.handleChange} value={this.state.maxSalary} required /> &nbsp; Yen
                                                  </div>
                                              </div>
                                        </div>
                                      </div>

                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fa fa-user-clock text-info"></i></div>
                                                </div>
                                                <select name="employmentStatus" id="employmentStatus" className="form-control" onChange={this.handleChange} value={this.state.selectedValue} required>
                                                  <option selected disabled>Select Employment Status</option>
                                                  <option value="Full-Time">Full-Time</option>
                                                  <option value="Part-Time">Part-Time</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-award text-info"></i></div>
                                                    </div>
                                                    <select name="japaneseSkill" id="japaneseSkill" className="form-control" onChange={this.handleChange} value={this.state.selectedValue} required>
                                                        <option selected disabled >Select Minimum Japanese Skill</option>
                                                        <option value="3">N3</option>
                                                        <option value="2">N2</option>
                                                        <option value="1">N1</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"><i className="fas fa-map-marked-alt text-info"></i></div>
                                                </div>
                                                <textarea className="form-control" id="jobAddress" name="jobAddress" placeholder="Enter Address" onChange={this.handleChange} value={this.state.jobAddress} required></textarea>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-calendar text-info"> Posted Date</i></div>
                                                    </div>
                                                    <input type="date" id="postedDate" name="postedDate" class="form-control" value="datetime" onChange={this.handleChange} value={this.state.postedDate} required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                    <div className="card-header p-0">
                                        <div className="bg-info text-white py-2" style={{paddingLeft:20}}>
                                            <h3><i className="fa fa-info"></i> &nbsp; About Application</h3>
                                        </div>
                                    </div>
                                <div className="card-body p-3">
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" id="jobDescription" name="jobDescription" placeholder="Enter Job Description" onChange={this.handleChange} value={this.state.jobDescription} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" id="qualification" name="qualification" placeholder="Enter Qualification" onChange={this.handleChange} value={this.state.qualification} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-1: I have no experience or knowledge of nursing care, but is it okay? </label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" id="FAQ1" name="FAQ1" placeholder="FAQ: Answer 1" onChange={this.handleChange} value={this.state.FAQ1} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-2: This is my first time... touching the bait?</label>
                                        <div className="input-group mb-2">                                         
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" id="FAQ2" name="FAQ2" placeholder="FAQ: Answer 2" onChange={this.handleChange} value={this.state.FAQ2} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-3:Is there flexibility in time and days?</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" id="FAQ3" name="FAQ3" placeholder="FAQ: Answer 3" onChange={this.handleChange} value={this.state.FAQ3} required></textarea>
                                        </div>
                                    </div>
                                </div>
                        </form>
					<div className="modal-footer">
                        <input type="button" onClick={this.addJob} value="Add" className="btn btn-info btn-width rounded-4 py-2" data-dismiss="modal" style={{marginRight:10}} />
                        <input type="button" className="btn btn-secondary" data-dismiss="modal" value="Cancel" />
					</div>
			</div>
		</div>
	</div>
	
	<div id="deleteConfirmModal" className="modal fade">
		<div className="modal-dialog del-dialog">
			<div className="modal-content"> 
                <div className="modal-header">						
					<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Delete Job</h4>
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>                                                   
				<form>
					<div className="modal-body" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif"}}>					
						<p>Are you sure you want to delete this company?</p>
						<p className="text-warning"><small>This action cannot be undone.</small></p>
					</div>
				</form>
                <div className="modal-footer">
					<input type="button" className="btn btn-secondary" data-dismiss="modal" value="Cancel" />
					<input type="button" className="btn btn-danger" value="Delete" data-dismiss="modal" onClick={this.deleteEmployer} />
				</div>
			</div>
		</div>
	</div>
    <footer className="text-center">copyright&#169;jobseeker</footer>
</body>
</html>
)}}
