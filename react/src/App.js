//Imports for react compnents/functions
import React, { Component } from "react";
//Imports for porject components
import { DoctorLayout } from "./UI/doctor_ui";
import { PatientLayout } from "./UI/patient_ui";
import { AdminLayout } from "./UI/admin_ui";
import { SignUp } from "./UI/signup";
import { SignIn } from "./UI/signin";
import { Home2 } from "./UI/home2";
import { Route, BrowserRouter } from "react-router-dom";
import { VitalsTable2 } from "./components/vitalstable2";
//Import for styles
import "./styles/App.css";

class App extends Component {
  //set host url here

 url ="http://localhost:8080/";
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route path="/" component={Home2} />
          <Route
            path={"/signin"}
            exact
            render={(props) => {
              return <SignIn {...props} url={this.url} />;
            }}
          />
          <Route
            path="/signup"
            exact
            render={(props) => {
              return <SignUp {...props} url={this.url} />;
            }}
          />
          <Route
            path="/doctor/:d_id"
            exact
            render={(props) => {
              return <DoctorLayout {...props} url={this.url} />;
            }}
          />
          <Route
            path="/patient/:p_id"
            exact
            render={(props) => {
              return <PatientLayout {...props} url={this.url} />;
            }}
          />
          <Route
            path="/admin/:a_id"
            exact
            render={(props) => {
              return <AdminLayout {...props} url={this.url} />;
            }}
          />
          <Route
            path="/vitals/:p_id"
            exact
            render={(props) => {
              return <VitalsTable2 {...props} url={this.url} />;
            }}
          />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
