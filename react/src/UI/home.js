import React, { Component } from "react";

export class Home extends Component {
  render() {
    return (
      <div className="main">
        <head>
          <title>Covid-19 Patient Monitor</title>
        </head>
        <div>
          <header className="heading">Covid-19 Patient Monitor System</header>
          <br></br>
          <div className="description">
            Welcome ! This system allows doctors to monitor vital information
            about a patient. Patients can provide their details to the server ,
            and admins can managae these profiles
          </div>
        </div>
      </div>
    );
  }
}
