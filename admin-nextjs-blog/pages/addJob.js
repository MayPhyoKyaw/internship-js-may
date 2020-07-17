import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class addJob extends React.Component {

    static async getInitialProps() {
        let firebase = await loadFirebase() 
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
        return {area: result2}
      }

    constructor(){
        super();
        this.initial_state = {
            jobName : '',
            workingDays : '',
            jobPhone : '',
            workingHours : '',
            jobEmail : '',
            jobArea : '',
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
        };
        this.state = this.initial_state;
    }

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
    }
    addJob = event => {
        event.preventDefault();
        let firebase = loadFirebase() 
        const userRef = firebase.firestore().collection('job')
                .add({
                        jobName : this.state.jobName,
                        workingDays : this.state.workingDays,
                        jobPhone : this.state.jobPhone,
                        workingHours : this.state.workingHours,
                        jobArea : this.state.jobArea,
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
                    jobName : '',
                    workingDays : '',
                    jobPhone : '',
                    workingHours : '',
                    jobEmail : '',
                    jobArea : '',
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
            $("#addModal").modal('show')
    }
    render() {
        const area = this.props.area
    return (
<html>
<Head>
    <title>Job Seeker Admin-Job Addition</title>
</Head>
<body>
    <nav className="navbar bg-color sticky-top">
        <img src="/p1.jpg" height="35" width="200" />
        <ul className="nav nav-tabs box-margin">
            <li className="nav-item">
              <a className="nav-link active" href="/jobList" >Job</a>
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
    <div className="container">  
    <br/> 
        <div className="row justify-content-center" > 
                        <form action="#" method="post" style={{width: 100+"%"}} onSubmit={this.addJob}>
                                <div className="card-header p-0">
                                    <div className="bg-info text-white py-2" style={{paddingLeft:20}}>
                                        <h3><i className="fa fa-file-alt"></i> Application Requirement</h3>
                                    </div>
                                </div>
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
                                                  <input type="text" className="form-control" id="phone" name="jobPhone" placeholder="Enter Employer Phone Number" onChange={this.handleChange} value={this.state.jobPhone} required />
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
                                                  <select name="jobArea" id="jobArea" className="form-control" onChange={this.handleChange} value={this.state.selectedValue} required>
                                                    <option selected disabled>Select Area</option>
                                                    {area &&  area.map(jobArea => (
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
                                                    <select name="jobCity" id="city" className="form-control" onChange={this.handleChange} value={this.state.selectedValue} required>
                                                        <option selected disabled>Select City</option>
                                                        <option value="Sapporo">Sapporo</option>
                                                        <option value="Tokyo">Tokyo</option>
                                                        <option value="Osaka">Osaka</option>
                                                        <option value="Yokohama">Yokohama</option>
                                                        <option value="Kyoto">Kyoto</option>
                                                        <option value="Hiroshima">Hiroshima</option>
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
                                            <textarea className="form-control" name="jobDescription" placeholder="Enter Job Description" onChange={this.handleChange} value={this.state.jobDescription} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" name="qualification" placeholder="Enter Qualification" onChange={this.handleChange} value={this.state.qualification} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-1: I have no experience or knowledge of nursing care, but is it okay? </label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" name="FAQ1" placeholder="FAQ: Answer 1" onChange={this.handleChange} value={this.state.FAQ1} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-2: This is my first time... touching the bait?</label>
                                        <div className="input-group mb-2">                                         
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" name="FAQ2" placeholder="FAQ: Answer 2" onChange={this.handleChange} value={this.state.FAQ2} required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-3:Is there flexibility in time and days?</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" name="FAQ3" placeholder="FAQ: Answer 3" onChange={this.handleChange} value={this.state.FAQ3} required></textarea>
                                        </div>
                                    </div>
    
                                    <div className="text-center">
                                        <input type="submit" value="Add" className="btn btn-info btn-width rounded-4 py-2" />
                                    </div>
                                </div>
                        </form>
                    </div>
            </div>
    <div id="addModal" className="modal fade">
		<div className="modal-dialog del-dialog">
			<div className="modal-content"> 
				<form>
					<div className="modal-header">						
						<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Successful!!</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<div className="modal-body" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif"}}>					
						<p> {this.state.jobName} is successfully added!! </p>
					</div>
					<div className="modal-footer">
						<a href="/jobList"><input type="button" className="btn btn-secondary" value="Ok" /></a>
					</div>
				</form>
			</div>
		</div>
	</div>
</body>
</html>
)}}