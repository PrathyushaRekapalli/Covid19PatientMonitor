import React, { Component, useState, useEffect } from "react";
import "../styles/App.css";
import uparrow from "../images/up arrow.jpg";
import downarrow from "../images/down arrow.jpg";
// import { Extract } from "./listextractor";
import { Personlistmaker } from "./personlist.js";
import { AlertTable } from "./alerts";
import { Links, Route } from "react-router-dom";
//import for register form
import "./form.css";
import axios from "axios";

export class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_list: [],
      id_list: [],
    };
  }
  render() {
    return (
      <div>
        <AlertTable {...this.props} />
      </div>
    );
  }
}

export class Patients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_list: [],
      id_list: [],
      patients_obj: null,
    };
    this.show_list = this.show_list.bind(this);
    this.update_state = this.update_state.bind(this);
    // this.getstate = this.getstate.bind(this);
    //this.close_list=this.show_list.bind(this); binding here uses prev state, therefore bound in onClick
  }

  show_list(temp_list, tempid_list) {
    this.setState({
      name_list: temp_list,
      id_list: tempid_list,
    });
    // this.setState({
    //     name_list:['a','c']
    // })
  }

  getapiData = async () => {
    try {
      let res = await axios.get(
        this.props.url + "covid19_patient_monitor/doctor",
        {
          params: {
            d_id: this.props.match.params["d_id"],
          },
        }
      );
      this.setState({ patients_obj: res.data.patients });
      // if (res.data.error != "none") {
      //   alert(res.data.error);
      //   return;
      // }
    } catch (err) {
      console.log("error ", err);
    }
  };
  update_state = async () => {
    //get api data
    await this.getapiData();
    let name_list = [],
      id_list = [];
    console.log("state outside", this.state.patients_obj);
    for (var key in this.state.patients_obj) {
      name_list.push(this.state.patients_obj[key]);
      id_list.push(key);
    }
    console.log(name_list, id_list);
    // let [temp_list, tempid_list] = Extract("Kumar");
    this.setState({
      name_list: name_list,
      id_list: id_list,
    });
    //alert(this.state.name_list)
    // }
  };

  close_list() {
    this.setState({
      name_list: [],
      id_list: [],
    });
    console.log("on change works!");
  }
  render() {
    let Style = {
      display: "block",
      boxSizing: "border-box",
      border: "5px solid none",
      padding: "15px",
      fontFamily: "sans-serif",
      color: "#4682b4",
    };

    return (
      <div>
        <div style={Style}>
          Here you can see your list of registered patients. Click on a patient
          to see their vital health information.
        </div>
        <div className="patient_box_title">
          Registered Patients
          <img
            src={downarrow}
            className="down"
            onClick={this.update_state.bind(this)}
            height="20px"
            width="20px"
            role="button"
            tabIndex="0"
            alt="exapand"
          ></img>
          <img
            src={uparrow}
            className="up"
            onClick={this.close_list.bind(this)}
            height="20px"
            width="20px"
            role="button"
            tabIndex="0"
            alt="exapand"
          ></img>
        </div>
        <div className="patients">
          <Personlistmaker
            name_list={this.state.name_list}
            id_list={this.state.id_list}
          />
        </div>
      </div>
    );
  }
}

//registration ui

export function Register(props) {
  //define state to hold input field values
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [guardianName, setguardianName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [doctorId, setdId] = useState(props.match.params["d_id"]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //post input details
    axios
      .post(props.url + "covid19_patient_monitor/doctor", {
        name: name,
        address: address,
        email: email,
        phone: phone,
        sex: sex,
        guardianName: guardianName,
        age: age,
        height: height,
        weight: weight,
        doctorId: doctorId,
      })
      .then((res) => {
        console.log("response api= ", res.data);
        alert("Registration Complete!");
        if (res.data.error != "none") alert(res.data.error);
        return;
      })
      .catch((err) => {
        console.log("error ", err);
      });
  };

  return (
    <div>
      <div className="wrapper">
        <div className="title">Patient Registration</div>
        <div className="form">
          <div className="inputfield">
            <label>Name</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Email Address</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Phone Number</label>
            <input
              type="number"
              className="input"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Age</label>
            <input
              type="number"
              className="input"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Height(cm)</label>
            <input
              type="number"
              className="input"
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Weight(kg)</label>
            <input
              type="number"
              className="input"
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Gender</label>
            <div className="custom_select">
              <select onChange={(e) => setSex(e.target.value)}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="inputfield">
            <label>Guardian</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setguardianName(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Address</label>
            <textarea
              className="textarea"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="inputfield">
            <input
              id="submit-btn"
              type="submit"
              value="Register"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
