import React from "react";
import "../styles/sidebar.scss";
import "../styles/App.css";
import {
  Patients,
  Doctors,
  RegisterDoctor,
  RegisterPatient,
} from "../components/admin_components";
import { Link } from "react-router-dom";
export class AdminLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftOpen: false,
      doctors: false,
      patients: false,
      link_btn: 0,
    };
    this.checker_details = this.checker_doctors.bind(this);
    this.checker_vitals = this.checker_patients.bind(this);
    this.update_state = this.update_state.bind(this);
    this.create_component = this.create_component.bind(this);
    this.checker_regdoctors = this.checker_regdoctors.bind(this);
    this.checker_regpatients = this.checker_regpatients.bind(this);
  }

  toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}Open`;
    this.setState({ [key]: !this.state[key] });
  };

  update_state() {
    this.setState({ details: false, vitals: false });
  }

  checker_doctors() {
    this.setState({
      link_btn: 1,
    });
  }
  checker_patients() {
    this.setState({
      link_btn: 2,
    });
  }
  checker_regpatients() {
    this.setState({
      link_btn: 3,
    });
  }
  checker_regdoctors() {
    this.setState({
      link_btn: 4,
    });
  }

  create_component() {
    let show;
    if (this.state.link_btn === 1) show = <Doctors {...this.props} />;
    else if (this.state.link_btn === 2) show = <Patients {...this.props} />;
    else if (this.state.link_btn === 3)
      show = <RegisterPatient {...this.props} />;
    else if (this.state.link_btn === 4)
      show = <RegisterDoctor {...this.props} />;
    else
      show = (
        <div className="patient_home">
          <h2>Welcome to the Admin portal!</h2>
          <p>
            Here you can create,edit or delete any doctor or patient records
            <br></br>
            Access these functions from the side-bar
          </p>
        </div>
      );
    return show;
  }

  decide_color() {
    let Style;
    if (this.state.leftOpen)
      Style = {
        color: "#F0F8FF",
        borderBottom: "5px solid #F0F8FF",
        position: "absolute",
        display: "block",
      };
    else
      Style = {
        color: "#4682B4",
        borderBottom: "5px solid #4682B4",
        position: "absolute",
        display: "block",
      };
    console.log(Style);
    return Style;
  }

  render() {
    let leftOpen = this.state.leftOpen ? "open" : "closed";
    let show = this.create_component();
    let Style = this.decide_color();
    return (
      <div id="layout">
        {console.log(this.props)}
        <div id="left" className={leftOpen}>
          <div className="icon" onClick={this.toggleSidebar} style={Style}>
            &equiv;
          </div>
          <div className={`sidebar ${leftOpen}`}>
            <div
              className="header"
              style={{ borderBottom: "5px solid #F0F8FF" }}
            >
              <h3 className="tit">Covid-19 Patient Monitor</h3>
            </div>
            <div className="content">
              <h3>
                Welcome ! <br></br>
                Admin ID:{this.props.match.params["a_id"]}
              </h3>
              <button
                id="lay"
                onClick={() => {
                  this.checker_doctors();
                }}
              >
                Update/Delete Doctors
              </button>
              <br></br>
              <button
                id="lay"
                onClick={() => {
                  this.checker_patients();
                }}
              >
                Update/Delete Patients
              </button>
              <br></br>
              <button
                id="lay"
                onClick={() => {
                  this.checker_regdoctors();
                }}
              >
                Doctor Registration
              </button>
              <br></br>
              <button
                id="lay"
                onClick={() => {
                  this.checker_regpatients();
                }}
              >
                Patient Registration
              </button>
              <br></br>
              <button
                id="lay"
                onClick={() => {
                  this.setState({ link_btn: 0 });
                }}
              >
                Home
              </button>
              <p>
                <Link to="/">
                  <button id="lay">LOG OUT</button>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div id="main">
          <div className="header" style={{ color: "#4682B4" }}>
            <h1
              className={`
                      tit
                      ${"left-" + leftOpen}
                  `}
            >
              Admin Portal
            </h1>
          </div>
          <div className="content">{show}</div>
        </div>
      </div>
    );
  }
}
