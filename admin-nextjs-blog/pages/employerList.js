import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js';

export default class employerList extends React.Component {

    constructor (props){
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
            employerName : '',
            employerPhone : '',
            employerEmail : '',
            employerArea : '',
            employerCity : '',
            employerAddress : ''

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
          firebase.firestore().collection('employer')
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
          return {employer: result, area: result2}
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
            firebase.firestore().collection('employer').doc(id).get().
            then((snapshot)=>{
                data = snapshot.data()
                console.log(data)
                this.setState ({
                    employerName : data.employerName,
                    employerPhone : data.employerPhone,
                    employerEmail : data.employerEmail,
                    employerArea : data.employerArea,
                    employerCity : data.employerCity,
                    employerAddress : data.employerAddress
                })
            })
            console.log("getting data")
            console.log(this.state.employerName)
            
        }catch(error){
            console.log(error)
        }
        console.log(this.state.employerName)
        $("#viewModal").modal('show')
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
                    employerArea : data.employerArea,
                    employerCity : data.employerCity,
                    employerAddress : data.employerAddress
                })
            })
            console.log("getting data")
            console.log(this.state.employerName)
            
        }catch(error){
            console.log(error)
        }
        console.log(this.state.employerName)
        $("#editModal").modal('show')
    }

    updateEmployer = () =>{
        let firebase = loadFirebase()
        try{
            firebase.firestore().collection('employer').doc(this.state.edit_id).update({
                employerName : this.state.employerName,
                employerPhone : this.state.employerPhone,
                employerEmail : this.state.employerEmail,
                employerArea : this.state.employerArea,
                employerCity : this.state.employerCity,
                employerAddress : this.state.employerAddress
            })
        }catch(error){
            console.log(error)
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

  deleteEmployer = () => {
    let firebase = loadFirebase()
    try{
        firebase.firestore().collection('employer')
        .doc(this.state.delete_id)
        .delete()
        console.log("Delete successful")
    }catch(error){
        console.log(error)
    }
      
}

  render() {
    const employer = this.props.employer
    const area = this.props.area
    return (
<html>
<head>
    <title>Job Seeker Admin-Job List</title>   
</head>
<body>
    <nav className="navbar bg-color sticky-top">
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
                        <a href="/addEmployer" className="btn btn-success"><i className="fa fa-plus-circle"></i> <span>Add New Employer</span></a>
                    </div>
                    <div className="col-xs-6">
                    </div>
                </div>
            </div>
                <table id="example" className="display" style={{width:100+"%"}}>
                    <thead className="thread-color">
                        <tr>
                            <th>Employer Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Added Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employer &&  
                        employer.map(Employer => (
                        <tr key={Employer.id}>
                            <td>{Employer.employerName}</td>
                            <td>{Employer.employerEmail}</td>
                            <td>{Employer.employerPhone}</td>
                            <td>{Employer.employerAddress}</td>
                            <td>2011/04/25</td>
                            <td>
                                <a href="/addJob"><i className="view fa fa-plus-circle" title="add" style={{color: "rgb(0, 110, 255)", cursor:"pointer"}}> Add Job </i></a> &nbsp;
                                <a><i onClick={()=>this.editPassId(Employer.id)} className="edit material-icons icon-padding" title="Edit" style={{color: "yellow", cursor:"pointer"}} data-dismiss="modal" data-toggle="tooltip">&#xE254;</i></a> &nbsp;
								<a onClick={()=>this.deletePassId(Employer.id)} className="delete material-icons icon-padding" title="Delete"  style={{color: "red", cursor:"pointer"}} data-dismiss="modal">&#xE872;</a> &nbsp;
							</td>
                        </tr>
                        ))
                    }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Employer Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                            <th>Added Date</th>
                            <th>Action</th>
                        </tr>
                    </tfoot>
                </table>
        </div>
    </div>
	
	<div id="editModal" className="modal fade">
		<div className="modal-dialog info-dialog">
			<div className="modal-content">
					<div className="modal-header">						
						<h4 className="modal-title" style={{fontFamily: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif", fontWeight: "bolder"}}>Application Requirement</h4>
						<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					</div>
					<form action="#" method="post" style={{width: 90+"%", margin: "auto", marginTop: 20}}>
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
                                            <textarea className="form-control" name="employerAddress" placeholder="Enter Address" required value={this.state.employerAddress} onChange={this.handleChange}></textarea>
                                        </div>
                                    </div>
                                </div>
                        </form>
                        <div className="modal-footer">
                            <input type="button" onClick={this.updateEmployer} value="Update" className="btn btn-info btn-width rounded-4 py-2" data-dismiss="modal" style={{marginRight:10}} />
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
						<input type="button" className="btn btn-danger" value="Delete" data-dismiss="modal" onClick={this.deleteEmployer} />
					</div>
				</form>
			</div>
		</div>
	</div>
    <footer className="text-center">copyright&#169;jobseeker</footer>
</body>
</html>
)}}