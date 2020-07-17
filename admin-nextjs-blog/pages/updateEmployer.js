import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class updateEmployer extends React.Component {
    render() {
    return (
<html>
<Head>
    <title>Job Seeker Admin-Employer Edition</title>
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
        <div className="row justify-content-center check-margin"> 
                        
                        <form action="#" method="post" style={{width: 50+"%"}}>
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
                                                <input type="text" className="form-control" id="employerName" name="employerName" placeholder="Enter Employer Name" required />
                                            </div>
                                        </div>
                                        
                                          <div className="form-group">
                                              <div className="input-group mb-2">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                                  </div>
                                                  <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter Employer Phone Number" required />
                                              </div>
                                          </div>
                                
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-envelope text-info"></i></div>
                                                    </div>
                                                    <input type="email" className="form-control" id="employerEmail" name="email" placeholder="e.g. ejemplo@gmail.com" required />
                                                </div>
                                            </div>
                                    
                                          <div className="form-group">
                                              <div className="input-group mb-2">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text"><i className="fa fa-map-marked text-info"></i></div>
                                                  </div>
                                                  <select name="jobArea" id="jobArea" className="form-control" required >
                                                    <option selected disabled>Select Area</option>
                                                    <option value="1">Hokkaidou</option>
                                                    <option value="2">Honshu</option>
                                                    <option value="3">Shikoku</option>
                                                    <option value="4">Kyushu</option>
                                                    <option value="5">Okinawa</option>
                                                  </select>
                                              </div>
                                          </div>
                                    
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
    
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fas fa-map-marked-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" placeholder="Enter Address" required></textarea>
                                        </div>
                                    </div>
                                </div>
    
                                    <div className="text-center">
                                        <input type="submit" value="Update" className="btn btn-info btn-width rounded-4 py-2" style={{marginRight:10}} />
                                        <input type="submit" value="Cancel" className="btn btn-warning btn-width rounded-4 py-2" />
                                    </div>
                        </form>
                        
        </div>
    </div>
</body>
</html>
    )}}