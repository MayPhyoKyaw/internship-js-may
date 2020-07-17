import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class addJob extends React.Component {
    constructor(){
        super();
        this.initial_state = {
            jobName : '',
            jobPhone : '',
            japaneseSkill: ''
        };
        this.state = this.initial_state;
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    addJob = event => {
        event.preventDefault();
        let firebase = loadFirebase() 
        const userRef = firebase.firestore().collection('job').add({
            jobName: this.state.jobName,
            jobPhone: this.state.jobPhone,
            japaneseSkill: this.state.japaneseSkill
        });        
        this.setState({
          jobName: '',
          jobPhone: '',
          japaneseSkill: ''
        });
    };

    render() {
    return (
        <body>
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
                                                      <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                                  </div>
                                                  <input type="text" className="form-control" id="jobPhone" name="jobPhone" placeholder="Enter Employer Phone Number" onChange={this.handleChange} value={this.state.jobPhone} />
                                              </div>
                                          </div>
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
    
                                    <div className="text-center">
                                        <input type="submit" value="Add" className="btn btn-info btn-width rounded-4 py-2"  />
                                    </div>
                                </div>
                        </form>
                    </body>
    )
    }}