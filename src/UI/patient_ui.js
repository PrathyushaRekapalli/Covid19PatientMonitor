import React from "react";
import "../styles/sidebar.scss";
import "../styles/App.css";
import axios from "axios";
import { VitalsTable2 } from "../components/vitalstable2";
import { Link } from "react-router-dom";

export class PatientLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      leftOpen: false,
      details: false,
      vitals: false,
      link_btn: 0,
      posts: [],
    };
    this.checker_details = this.checker_details.bind(this);
    this.checker_vitals = this.checker_vitals.bind(this);
    this.update_state = this.update_state.bind(this);
    this.create_component = this.create_component.bind(this);
  }

  toggleSidebar = (event) => {
    let key = `${event.currentTarget.parentNode.id}Open`;
    this.setState({ [key]: !this.state[key] });
  };

  update_state() {
    this.setState({ details: false, vitals: false });
  }

  checker_details() {
    this.setState({
      link_btn: 1,
    });
  }
  checker_vitals() {
    this.setState({
      link_btn: 2,
    });
  }

  create_component() {
    let show;
    if (this.state.link_btn === 2) show = <VitalsTable2 {...this.props} />;
    else
      show = (
        <div className="patient_home">
          <h2>Welcome to the patient portal!</h2>
          <p>
            Here you can check your personal details and your vital health
            infromation<br></br>
            Access it via the side-bar
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
                Patient ID: {this.props.match.params["p_id"]}
              </h3>
              <br></br>
              <button
                id="lay"
                onClick={() => {
                  this.checker_vitals();
                }}
              >
                Vitals
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
                  <button id="logout_btn" id="lay">
                    LOG OUT
                  </button>
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
              Patient Portal
            </h1>
          </div>
          <div className="content">{show}</div>
        </div>
      </div>
    );
  }
}
