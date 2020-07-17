import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class updateEmployer extends React.Component {
    render() {
    return (
<html>
<head>
    <title>Job Seeker Admin-Job Edition</title>
</head>
<body>
    <nav className="navbar bg-color sticky-top">
        <img src="/p1.jpg" height="35" width="200" />
        <ul className="nav nav-tabs box-margin">
            <li className="nav-item">
              <a className="nav-link active" href="jobList.html" >Job</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="employerList.html" style={{color: "aliceblue"}}>Employer</a>
            </li>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" style={{color: "rgb(169, 195, 218)"}}><i className="fa fa-user-circle" style={{fontSize:24}}></i> Username</a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="adminProfile.html"><i className="fa fa-user"></i> Profile</a>
                  <a className="dropdown-item" href="#"><i className="fa fa-sign-out-alt"></i> Sign Out</a>
                </div>
            </li>
        </ul>
    </nav>
    <div className="container">  
        <div className="row justify-content-center" > 
            <div className="row check-margin">
                <h2>Employer Name</h2>
            </div>
                        
                        <form action="#" method="post" style={{width: 100+"%"}}>
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
                                                <input type="text" className="form-control" id="jobName" name="jobName" placeholder="Enter Job Name" required />
                                            </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-calendar-alt text-info"></i></div>
                                                    </div>
                                                    <input type="number" className="form-control" id="workingDays" name="workingDays" placeholder="Working Days per Week" min="1" max="7" required /> &nbsp; days per week
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
                                                  <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter Employer Phone Number" required />
                                              </div>
                                          </div>
                                        </div>
                                        <div className="col-sm-6">
                                              <div className="form-group">
                                                  <div className="input-group mb-2">
                                                      <div className="input-group-prepend">
                                                          <div className="input-group-text"><i className="fa fa-hourglass-half text-info"></i></div>
                                                      </div>
                                                      <input type="text" className="form-control" id="workingHours" name="workingHours" placeholder="e.g. 9:00-17:00" required />
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
                                                    <input type="email" className="form-control" id="employerEmail" name="email" placeholder="e.g. ejemplo@gmail.com" required />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-calendar-check text-info"></i></div>
                                                    </div>
                                                    <input type="text" className="form-control" id="ageRange" name="ageRange" placeholder="e.g. 23~25" required /> &nbsp; years old
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
                                                    <option value="1">Hokkaidou</option>
                                                    <option value="2">Honshu</option>
                                                    <option value="3">Shikoku</option>
                                                    <option value="4">Kyushu</option>
                                                    <option value="5">Okinawa</option>
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
                                                      <input type="number" className="form-control" id="minSalary" name="minSalary" placeholder="Enter Minimum Salary" min="1" maxlength="7" required /> &nbsp; Yen
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
                                                      <input type="number" className="form-control" id="maxSalary" name="maxSalary" placeholder="Enter Maximum Salary" min="1" maxlength="7" required /> &nbsp; Yen
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
                                                <select name="employmentStatus" id="employmentStatus" className="form-control" required>
                                                  <option selected disabled>Select Employment Status</option>
                                                  <option value="1">Full-Time</option>
                                                  <option value="2">Part-Time</option>
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
    
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fas fa-map-marked-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="Enter Address" required></textarea>
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
                                            <textarea className="form-control" placeholder="Enter Job Description" required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="Enter Qualification" required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-1: I have no experience or knowledge of nursing care, but is it okay? </label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="FAQ: Answer 1" required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-2: This is my first time... touching the bait?</label>
                                        <div className="input-group mb-2">                                         
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="FAQ: Answer 2" required></textarea>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Frequent Question-3:Is there flexibility in time and days?</label>
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fa fa-pencil-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="FAQ: Answer 3" required></textarea>
                                        </div>
                                    </div>
    
                                    <div className="text-center">
                                        <input type="submit" value="Update" className="btn btn-info btn-width rounded-4 py-2"  style={{marginRight:10}} />
                                        <a href="/jobList"><input type="button" value="Cancel" className="btn btn-warning btn-width rounded-4 py-2" /></a>
                                    </div>
                                </div>
    
                            
                        </form>
                    </div>
        </div>
</body>
</html>
)}}