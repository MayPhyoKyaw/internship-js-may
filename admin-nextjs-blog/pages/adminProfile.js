import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class userProfile extends React.Component {
  render() {
    return (
<html>
<Head>
    <title>Job Seeker-Profile</title>
    <style js>{`
        body{
            background: linear-gradient(to right, #ffffff, #eff3f8, #ffffff);
        }
        `}</style>
</Head>
<body>
    <nav className="navbar nav-color profile-nav">
        <a href="/index"><img src="/p1.jpg" height="35" width="200" style={{paddingLeft: 20}}/></a>
    </nav>
<div className="container" style={{paddingTop:50}}>
    <div className="row">
  		<div className="col-sm-3">
            <div className="text-center">
                <div className="col-sm-10" style={{marginBottom:20, fontFamily:"'Comic Sans MS', Comic Sans, cursive"}}><h2>User name</h2></div>
                <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="avatar" style={{borderRadius:100}}/> <br/>
                    <i style={{fontSize:10}}>Upload a different photo...</i>
                    <input type="file" className="text-center center-block file-upload" style={{fontSize:15}} />
            </div><hr/><br/>
               
        </div>
    	<div className="col-sm-9">
        <nav class="navbar">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#home">User Information</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#login">Change Password</a>
                </li>
            </ul>
        </nav>
       
            <div className="tab-content">
                <div className="tab-pane active" id="home">
                    <hr/>
                    <form className="form" action="##" method="post" id="userProfileForm">
                        <div className="form-group">
                            <div className="col-xs-6">
                                <label htmlFor="username"><h6>Username</h6></label>
                                <input type="text" className="form-control" name="username" id="username" placeholder="user name" title="enter your user name if any." />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-6">
                                <label htmlFor="email"><h6>Email</h6></label>
                                <input type="email" className="form-control" name="email" id="email" placeholder="you@email.com" title="enter your email." />
                            </div>
                        </div>
                                              
                        <div className="form-group">
                            <div className="col-xs-12">
                                <br/>
                              	<button className="btn btn-lg btn-success" type="submit" style={{width:140}}><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                            </div>
                        </div>
              	    </form> <hr/>
                </div>

                <div className="tab-pane" id="login">
                <hr/>
                    <form className="form" action="##" method="post" id="passwordForm">
                        <div className="form-group"> 
                            <div className="col-xs-7">
                                <label><h6>Enter Current Password</h6></label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password." />
                            </div>
                        </div>
                        <hr style={{height: 2, backgroundColor: "rgb(226, 234, 236)"}} />
                        
                        <div className="form-group"> 
                            <div className="col-xs-7">
                                <label><h6>Enter New Password</h6></label>
                                <input type="password" className="form-control" name="password" id="password" placeholder="password" title="enter your password." />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-xs-7">
                                <label><h6>Re-enter New Password</h6></label>
                                <input type="password" className="form-control" name="password2" id="password2" placeholder="password2" title="enter your password2." />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <div className="col-xs-12">
                                <br/>
                              	<button className="btn btn-lg btn-success" type="submit" style={{width:140}}><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                            </div>
                        </div>
              	    </form> <hr/>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
)}}