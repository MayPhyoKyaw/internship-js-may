import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class addJob extends React.Component {
    constructor(props){
        super(props);
        this.initial_state = {
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

    handleSubmit = (event) => {
        event.preventDefault();
        const user = this.state; 

            this.setState ({remark : ""});
            try {
                db.collection("job")
                    .add(
                        {
                            jobName : job.jobName,
                            jobPhone : job.jobPhone,
                        }
                )
                this.setState({isSuccess : true});
            }catch(error){
                console.log(error);
                this.setState({isSuccess : false});
                
                this.state = this.initial_state;
                console.log(this.state);
            }
    }

    render() {
    return (
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
                                                <input type="text" className="form-control" id="jobName" name="jobName" placeholder="Enter Job Name" onChange={this.handleChange} required />
                                            </div>
                                        </div>
                                      </div>
                                      <div className="col-sm-6">
                                          <div className="form-group">
                                              <div className="input-group mb-2">
                                                  <div className="input-group-prepend">
                                                      <div className="input-group-text"><i className="fa fa-phone text-info"></i></div>
                                                  </div>
                                                  <input type="text" className="form-control" id="phone" name="phone" placeholder="Enter Employer Phone Number" onChange={this.handleChange} required />
                                              </div>
                                          </div>
                                        </div>
                                    </div>

                                    
    
                                    <div className="text-center">
                                        <input type="submit" value="Add" className="btn btn-info btn-width rounded-4 py-2" />
                                    </div>
                                </div>
                        </form>
    )
    }}