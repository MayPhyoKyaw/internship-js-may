import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default class about extends React.Component {
  render() {
    return (
<html>
<Head>
    <title>Job Seeker-Detail</title>
	<style js>{`
		body{
			background: linear-gradient(to right, #ffffff, #eff3f8, #ffffff);
		}
	`}</style>
</Head>
<body>
  <nav className="navbar nav-color sticky-top">
      <a href="/index"><img src="/p1.jpg" height="35" width="200" style={{marginLeft: 15}}/></a>
      <button type="button" className="btn btn-primary btn-float signin" data-toggle="modal" data-target="#myModal" style={{background: "#2C5197"}}>Sign In</button>
  </nav> 
  <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content box1" style={{background:"#052f66"}}>
          <div className="modal-header">
            <h2 className="modal-title">Login</h2>
            <button type="button" className="close" data-dismiss="modal" style={{color:"aliceblue"}}>&times;</button>
          </div>
          <div className="modal-body">
            <form>
              <p className="text-white"> Please enter your login and password!</p> 
              <input type="text" name="" placeholder="Username"/> 
              <input type="password" name="" placeholder="Password"/> 
              <p><a className="forgot text-white" href="#">Forgot password?</a></p>
              <p className="text-white">Don't Have An Account? <a className="forgot" href="/userSignup">Create Here!</a></p>
              <input type="submit" name="" value="Login" href="#"/>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" style={{color:"aliceblue"}}>Close</button>
          </div>
        </div>
      </div>
    </div>
    
    <h1 className="text-center about-h1">About Us</h1>

	<div className="container about-container" style={{height: "auto"}}>
	    <div className="row">

	    <div className="col-lg-4">
	        <div className="our-team-main">
	
	            <div className="team-front">
	                <img src="http://placehold.it/110x110/9c27b0/fff?text=Dilip" className="img-fluid" />
	                <h3>Vision</h3>
	            </div>
	
	            <div className="team-back">
	                <span>
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque penatibus et magnis dis parturient montes,
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque.
	                </span>
	            </div>
	        </div>
	    </div>

	    <div className="col-lg-4">
	        <div className="our-team-main">
	
	            <div className="team-front">
	                <img src="http://placehold.it/110x110/336699/fff?text=Dilip" className="img-fluid" />
	                <h3>Mission</h3>
	            </div>
	
	            <div className="team-back">
	                <span>
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque penatibus et magnis dis parturient montes,
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque.
	                </span>
	            </div>
	
	        </div>
	    </div>

	    <div className="col-lg-4">
	        <div className="our-team-main">
	
	            <div className="team-front">
	                <img src="http://placehold.it/110x110/607d8b/fff?text=Dilip" className="img-fluid" />
	                <h3>Join with Us</h3>
	            </div>
	
	            <div className="team-back">
	                <span>
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque penatibus et magnis dis parturient montes,
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque.
	                </span>
	            </div>
	        </div>
	    </div>

	    <div className="col-lg-4">
	        <div className="our-team-main">
	            <div className="team-front">
	                <img src="http://placehold.it/110x110/4caf50/fff?text=Dilip" className="img-fluid" />
	                <h3>Contact Information</h3>
	            </div>
	
	            <div className="team-back">
	                <span>
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque penatibus et magnis dis parturient montes,
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque.
	                </span>
	            </div>
	        </div>
	    </div>
        
	    <div className="col-lg-4">
	        <div className="our-team-main">
	
	            <div className="team-front">
	                <img src="http://placehold.it/110x110/e91e63/fff?text=Dilip" className="img-fluid" />
	                <h3>Address</h3>
	            </div>
	
	            <div className="team-back">
	                <span>
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque penatibus et magnis dis parturient montes,
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque.
	                </span>
	            </div>
	
	        </div>
	    </div>
        
	    <div className="col-lg-4">
	        <div className="our-team-main">
	
	            <div className="team-front">
	                <img src="http://placehold.it/110x110/2196f3/fff?text=Dilip" className="img-fluid" />
	                <h3>Information</h3>
	            </div>
	
	            <div className="team-back">
	                <span>
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque penatibus et magnis dis parturient montes,
	                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
	                    natoque.
	                </span>
	            </div>
	
	        </div>
	    </div>
	    </div>
	</div>

    <div className="container about-container">
        <div className="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d112061.09262729759!2d77.208022!3d28.632485!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x644e33bc3def0667!2sIndior+Tours+Pvt+Ltd.!5e0!3m2!1sen!2sus!4v1527779731123" width="100%" height="650px" frameborder="0" style={{border:0}} allowfullscreen></iframe>
        </div>
        <div className="contact-form">
            <h1 className="title" style={{fontFamily: "'Comic Sans MS', cursive, sans-serif"}}>Contact Us</h1>
            <h2 className="subtitle">We are here assist you.</h2>
            <form action="">
                <input type="text" name="name" placeholder="Your Name" />
                <input type="email" name="e-mail" placeholder="Your E-mail Adress" />
                <input type="tel" name="phone" placeholder="Your Phone Number"/>
                <textarea name="text" id="" rows="8" placeholder="Your Message"></textarea>
                <button className="btn-send">Get a Call Back</button>
            </form>
        </div>
    </div>
    
    <footer className="text-center"> copyright&#169;jobseeker.co.jp</footer>
</body>
</html>
)}}