import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class jobList extends React.Component {

    constructor (props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
            edit_id : '',
            delete_id : '',
            jobName : '',
            workingDays : '',
            jobPhone : '',
            workingHours : '',
            jobEmail : '',
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

    }
    componentDidMount () {
        const script = document.createElement("script");
        script.src = "/scripts/datatable.js";
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
        let result2 = await new Promise((resolve, reject) => {
            firebase.firestore().collection('area')
              .limit(10)
              .get()
              .then(snapshot => {
                console.log(snapshot)
                let data2 = []
                snapshot.forEach((doc) => {
                  data2.push(
                    Object.assign({
                      id: doc.id
                    }, doc.data())
                  )
                })
                console.log(data2)
                resolve(data2)
              })
              .catch(error => {
                reject([])
              })
          })
        return {job: result, area: result2}
      }

      deletePassId = (id)=>{
            $("#deleteConfirmModal").modal('show');
            this.setState({delete_id : id})
            console.log(this.state.delete_id)
      }
      

        viewPassId = (id) => {
            this.setState({edit_id : id})
            let firebase = loadFirebase()
            let data = {}
            try{
                firebase.firestore().collection('job').doc(id).get().
                then((snapshot)=>{
                    data = snapshot.data()
                    console.log(data)
                    this.setState ({
                        jobName : data.jobName, 
                        employmentStatus : data.employmentStatus,
                        workingDays : data.workingDays,
                        jobPhone : data.jobPhone,
                        workingHours : data.workingHours,
                        jobEmail : data.jobEmail,
                        ageRange : data.ageRange,
                        minSalary : data.minSalary,
                        maxSalary : data.maxSalary,
                        japaneseSkill : data.japaneseSkill,
                        jobAddress : data.jobAddress,
                        postedDate : data.postedDate,
                        jobDescription : data.jobDescription,
                        qualification : data.qualification,
                        FAQ1 : data.FAQ1,
                        FAQ2 : data.FAQ2,
                        FAQ3 : data.FAQ3
                    })
                })
                console.log("getting data")
                console.log(this.state.jobName)
                
            }catch(error){
                console.log(error)
            }
            console.log(this.state.jobName)
            $("#viewModal").modal('show')
        }

        editPassId = (id) => {
            this.setState({edit_id : id})
            let firebase = loadFirebase()
            let data = {}
            try{
                firebase.firestore().collection('job').doc(id).get()
                .then((snapshot)=>{
                    data = snapshot.data()
                    console.log(data)
                    this.setState ({
                        jobName : data.jobName, 
                        employmentStatus : data.employmentStatus,
                        workingDays : data.workingDays,
                        jobPhone : data.jobPhone,
                        workingHours : data.workingHours,
                        jobEmail : data.jobEmail,
                        ageRange : data.ageRange,
                        minSalary : data.minSalary,
                        maxSalary : data.maxSalary,
                        japaneseSkill : data.japaneseSkill,
                        jobAddress : data.jobAddress,
                        postedDate : data.postedDate,
                        jobDescription : data.jobDescription,
                        qualification : data.qualification,
                        FAQ1 : data.FAQ1,
                        FAQ2 : data.FAQ2,
                        FAQ3 : data.FAQ3
                    })
                })
                console.log("getting data")
                console.log(this.state.jobName)
                
            }catch(error){
                console.log(error)
            }
            console.log(this.state.jobName)
            $("#editModal").modal('show')
        }

        updateJob = () =>{
            let firebase = loadFirebase()
            try{
                firebase.firestore().collection('job').doc(this.state.edit_id).update({
                        jobName : this.state.jobName, 
                        employmentStatus : this.state.employmentStatus,
                        workingDays : this.state.workingDays,
                        jobPhone : this.state.jobPhone,
                        workingHours : this.state.workingHours,
                        jobEmail : this.state.jobEmail,
                        ageRange : this.state.ageRange,
                        minSalary : this.state.minSalary,
                        maxSalary : this.state.maxSalary,
                        japaneseSkill : this.state.japaneseSkill,
                        jobAddress : this.state.jobAddress,
                        postedDate : this.state.postedDate,
                        jobDescription : this.state.jobDescription,
                        qualification : this.state.qualification,
                        FAQ1 : this.state.FAQ1,
                        FAQ2 : this.state.FAQ2,
                        FAQ3 : this.state.FAQ3
                })
            }catch(error){
                console.log(error)
            }
        }

        handleChange = (event) => {
            this.setState({[event.target.name] : event.target.value})
        }

      deleteJob = () => {
        let firebase = loadFirebase()
        try{
            firebase.firestore().collection('job')
            .doc(this.state.delete_id)
            .delete()
            console.log("Delete successful")
        }catch(error){
            console.log(error)
        }
    }

  render() {
    const job = this.props.job
    const area = this.props.area
    return (
        <>
<Head>
    <title>Job Seeker Admin-Job List</title>
</Head>
<body>
    <nav className="navbar bg-color sticky-top">
        <img src="/p1.jpg" height="35" width="200" />
        <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" href="#" >Job</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/employerList" style={{color: "aliceblue"}}>Employer</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" style={{color: "rgb(169, 195, 218)"}}><i className="fa fa-user-circle" style={{fontSize:24}}></i> Username</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/adminProfile"><i className="fa fa-user"></i> Profile</a>
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
                        <h2 style={{color: "Black"}}>Job List</h2>
                    </div>
                    <div className="col-xs-6">
                    </div>
                </div>
            </div>
                <table id="example" className="display" style={{width:100+"%"}}>
                    <thead className="thread-color">
                        <tr>
                            <th>Job Name</th>
                            <th>Employment Status</th>
                            <th>City</th>
                            <th>Salary</th>
                            <th>Posted Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {job &&  
                        job.map(Job => (
                        <tr id={Job.id}>
                            <td>{Job.jobName}</td>
                            <td>{Job.employmentStatus}</td>
                            <td>{Job.minSalary}</td>
                            <td>{Job.minSalary}~{Job.maxSalary}</td>
                            <td>2011/04/25</td>
                            <td>
                                <a><i onClick={()=>this.viewPassId(Job.id)} className="view material-icons icon-padding" title="View" style={{color: "rgb(0, 110, 255)", cursor:"pointer"}} data-dismiss="modal" data-toggle="tooltip">&#xE417;</i></a> &nbsp;
                                <a><i onClick={()=>this.editPassId(Job.id)} className="edit material-icons icon-padding" title="Edit" style={{color: "yellow", cursor:"pointer"}} data-dismiss="modal" data-toggle="tooltip">&#xE254;</i></a> &nbsp;
								<a onClick={()=>this.deletePassId(Job.id)} className="delete material-icons icon-padding" title="Delete"  style={{color: "red", cursor:"pointer"}} data-dismiss="modal">&#xE872;</a> &nbsp;
							</td>
                        </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Job Name</th>
                            <th>Employer Name</th>
                            <th>City</th>
                            <th>Salary</th>
                            <th>Posted Date</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
        </div>
    </div>
	
	<div id="viewModal" className="modal fade">
		<div className="modal-dialog info-dialog">
			<div className="modal-content">
					<div className="modal-header">						
						<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Detail Information</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div className="modal-body" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif"}}>
                        <ul className="list-group">
                            <li className="list-group-item">Job Name: {this.state.jobName}</li>
                            <li className="list-group-item">Phone Number: {this.state.jobPhone}</li>
                            <li className="list-group-item">Email: {this.state.jobEmail}</li>
                            <li className="list-group-item">Address: {this.state.jobAddress}, {this.state.jobCity}, {this.state.jobArea}</li>
                            <li className="list-group-item">Employment Status: {this.state.employmentStatus}</li>
                            <li className="list-group-item">Salary: {this.state.minSalary}~{this.state.maxSalary} Yen</li>
                            <li className="list-group-item">Working Days: {this.state.workingDays} Days per Week</li>
                            <li className="list-group-item">Working Hours:{this.state.workingHours}</li>
                            <li className="list-group-item">Age Range: {this.state.ageRange} years old</li>
                            <li className="list-group-item">Minimum Japanese Skill: {this.state.japaneseSkill}</li>
                            <li className="list-group-item">Job Description: {this.state.jobDescription}</li>
                            <li className="list-group-item">
                                Q1: I have no experience or knowledge of this job, but is it okay?<br/>
                                A1: {this.state.FAQ1}
                            </li>
                            <li className="list-group-item">
                                Q2: this is my first time... to do?<br/>
                                A2: {this.state.FAQ2}
                            </li>
                            <li className="list-group-item">
                                Q3: Is there flexibility in time and days?<br/>
                                A3: {this.state.FAQ3}
                            </li>
                            <li className="list-group-item">Qualification: {this.state.qualification}</li>
                        </ul>		
					</div>
					<div className="modal-footer">
						<input type="button" className="btn btn-secondary" data-dismiss="modal" value="Cancel" />
                        <a href="/updateJob"><button className="btn btn-warning">Edit</button></a>
                        <a onClick={()=>this.deletePassId(this.state.id)} data-dismiss="modal"><button className="btn btn-danger">Delete</button></a> 
					</div>
			</div>
		</div>
	</div>

    <div id="editModal" className="modal fade">
		<div className="modal-dialog info-dialog">
			<div className="modal-content">
					<div className="modal-header">						
						<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Application Requirement</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<form action="#" method="post" style={{width: 100+"%"}}>
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
                                                    <input type="number" className="form-control" id="workingDays" name="workingDays" placeholder="Working Days per Week" onChange={this.handleChange} min="1" max="7" value={this.state.workingDays} required /> &nbsp; days per week
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
                                                  <input type="text" className="form-control" id="phone" name="jobPhone" placeholder="Enter Job Phone Number" onChange={this.handleChange} value={this.state.jobPhone} required />
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
                                                    <input type="email" className="form-control" id="employerEmail" name="jobEmail" placeholder="e.g. ejemplo@gmail.com" onChange={this.handleChange} value={this.state.jobEmail} required />
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
                                                  <select name="jobArea" id="jobArea" className="form-control" required>
                                                    <option selected disabled>Select Area</option>
                                                    {area &&  area.map(jobArea => (
                                                        <option value={jobArea.areaName}>{jobArea.areaName}</option>
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
                                                      <input type="number" className="form-control" id="minSalary" name="minSalary" placeholder="Enter Minimum Salary" onChange={this.handleChange} min="1" maxlength="7" value={this.state.minSalary} required /> &nbsp; Yen
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
                                                    <select name="city" id="city" className="form-control" required>
                                                        <option selected disabled>Select City</option>
                                                        <option value="1">Sapporo</option>
                                                        <option value="2">Tokyo</option>
                                                        <option value="3">Osaka</option>
                                                        <option value="4">Yokohama</option>
                                                        <option value="5">Kyoto</option>
                                                        <option value="6">Hiroshima</option>
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
                                                      <input type="number" className="form-control" id="maxSalary" name="maxSalary" placeholder="Enter Maximum Salary" onChange={this.handleChange} min="1" maxlength="7" value={this.state.maxSalary} required /> &nbsp; Yen
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
                                                    <select name="japaneseSkill" id="japaneseSkill" className="form-control" required>
                                                      <option selected disabled>Select Minimum Japanese Skill</option>
                                                      <option value="1">N3</option>
                                                      <option value="2">N2</option>
                                                      <option value="3">N1</option>
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
                                                <textarea className="form-control" name="jobAddress" placeholder="Enter Address" onChange={this.handleChange} value={this.state.jobAddress} required></textarea>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-calendar text-info"></i></div>
                                                    </div>
                                                    <input type="datetime-local" name="postedDate" class="form-control" value="datetime" onChange={this.handleChange} value={this.state.postedDate} required/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="Enter Job Description" value={this.state.jobDescription} onChange={this.handleChange} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="Enter Qualification" value={this.state.qualification} onChange={this.handleChange} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-1: I have no experience or knowledge of nursing care, but is it okay? </label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="FAQ: Answer 1" value={this.state.FAQ1} onChange={this.handleChange} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-2: This is my first time... touching the bait?</label>
                                        <div className="input-group mb-2">                                         
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="FAQ: Answer 2" value={this.state.FAQ2} onChange={this.handleChange} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-3:Is there flexibility in time and days?</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="FAQ: Answer 3" value={this.state.FAQ3} onChange={this.handleChange} required></textarea>
                                        </div>
                                    </div>
                                </div>
                        </form>
					<div className="modal-footer">
                        <input type="button" onClick={this.updateJob} value="Update" className="btn btn-info btn-width rounded-4 py-2" data-dismiss="modal" style={{marginRight:10}} />
                        <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
					</div>
			</div>
		</div>
	</div>
	
	<div id="deleteConfirmModal" className="modal fade">
		<div className="modal-dialog del-dialog">
			<div className="modal-content"> 
				<form>
					<div className="modal-header">						
						<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Delete Job</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div className="modal-body" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif"}}>					
						<p>Are you sure you want to delete these Records?</p>
						<p className="text-warning"><small>This action cannot be undone.</small></p>
					</div>
					<div className="modal-footer">
						<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel" />
						<input type="button" className="btn btn-danger" value="Delete" data-dismiss="modal" onClick={this.deleteJob} />
					</div>
				</form>
			</div>
		</div>
	</div>
    <footer className="text-center">copyright&#169;jobseeker.co.jp</footer>
</body>
</>
)}}