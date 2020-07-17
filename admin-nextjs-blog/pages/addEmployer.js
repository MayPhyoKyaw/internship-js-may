import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class updateEmployer extends React.Component {

    constructor(){
        super();
        this.initial_state = {
            employerName : '',
            employerPhone : '',
            employerEmail : '',
            employerArea : '',
            employerCity : '',
            employerAddress : ''
        };
        this.state = this.initial_state;
    }

    handleChange = (event) =>{
        this.setState({[event.target.name] : event.target.value});
    }
    addEmployer = event => {
        event.preventDefault();
        let firebase = loadFirebase() 
        const userRef = firebase.firestore().collection('employer')
                .add({
                        employerName : this.state.employerName,
                        employerPhone : this.state.employerPhone,
                        employerEmail : this.state.employerEmail,
                        employerArea : this.state.employerArea,
                        employerCity : this.state.employerCity,
                        employerAddress : this.state.employerAddress
                    });
                this.setState({
                    employerName : '',
                    employerPhone : '',
                    employerEmail : '',
                    employerArea : '',
                    employerCity : '',
                    employerAddress : ''
                });
    }

    render() {
    return (
<html>
<head>
    <title>Job Seeker Admin-Employer Addition</title>
</head>
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
                        <form action="#" method="post" style={{width: 50+"%"}} onSubmit={this.addEmployer} >
                                <div className="card-header p-0">
                                    <div className="bg-info text-white py-2" style={{paddingLeft:20}}>
                                        <h3><i className="fa fa-file-alt"></i> Employer Information</h3>
                                    </div>
                                </div>
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
                                                      <div className="input-group-text"><i className="fa fa-map-marked text-info"></i></div>
                                                  </div>
                                                  <select name="employerArea" id="Area" className="form-control" onChange={this.handleChange} value={this.state.selectedValue} required>
                                                    <option selected disabled>Select Area</option>
                                                    <option value="Hokkaidou1">Hokkaidou</option>
                                                    <option value="Honshu">Honshu</option>
                                                    <option value="Shikoku">Shikoku</option>
                                                    <option value="Kyushu4">Kyushu</option>
                                                    <option value="Okinawa">Okinawa</option>
                                                  </select>
                                              </div>
                                          </div>
                                    
                                            <div className="form-group">
                                                <div className="input-group mb-2">
                                                    <div className="input-group-prepend">
                                                        <div className="input-group-text"><i className="fa fa-map-marked text-info"></i></div>
                                                    </div>
                                                    <select name="employerCity" id="city" className="form-control" onChange={this.handleChange} value={this.state.selectedValue} required>
                                                        <option selected disabled>Select City</option>
                                                        <option value="Sapporo">Sapporo</option>
                                                        <option value="Tokyo2">Tokyo</option>
                                                        <option value="Osaka">Osaka</option>
                                                        <option value="Yokohama">Yokohama</option>
                                                        <option value="Kyoto">Kyoto</option>
                                                        <option value="Hiroshima">Hiroshima</option>
                                                    </select>
                                                </div>
                                            </div>
    
                                    <div className="form-group">
                                        <div className="input-group mb-2">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="fas fa-map-marked-alt text-info"></i></div>
                                            </div>
                                            <textarea className="form-control" name="employerAddress" placeholder="Enter Address" onChange={this.handleChange} value={this.state.employerAddress} required></textarea>
                                        </div>
                                    </div>
                                </div>
    
                                    <div className="text-center">
                                        <input type="submit" value="Add" className="btn btn-info btn-width rounded-4 py-2" />
                                    </div>
                        </form>
                        
                    </div>
        </div>
</body>
</html>
)}}