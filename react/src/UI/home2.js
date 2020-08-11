import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home2 extends Component {
  render() {
    return (
      <div>
        {window.location.href == "http://localhost:3000/" && (
          <div className="mainhome">
            <title>Covid-19 Patient Monitor</title>
            <div>
              <header className="heading">
                Covid-19 Patient Monitor System
              </header>
              <br></br>
              <div className="description">
                Welcome ! This system allows doctors to monitor vital
                information about a patient. Patients can provide their details
                to the server , and admins can manage these profiles
              </div>
            </div>
            <div className="signin">
              Do you have an account? Log in
              <Link to="/signin" className="in">
                Sign In
              </Link>
            </div>
            <div className="signup">
              Are you a new Patient? Sign up!
              <Link to="/signup" className="in">
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}
