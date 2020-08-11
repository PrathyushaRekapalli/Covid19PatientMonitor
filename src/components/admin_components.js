import React, { Component, useState } from "react";
import axios from "axios";
import { DocTable } from "./docstable";
import { PatTable } from "./pattable";
import { StylesProvider } from "@material-ui/core/styles";
//import for register form
import "./form.css";

export class Patients extends Component {
  render() {
    return (
      <div>
        <div className="docpat">
          <StylesProvider injectFirst>
            <PatTable {...this.props} />
          </StylesProvider>
        </div>
      </div>
    );
  }
}

export class Doctors extends Component {
  render() {
    return (
      <div>
        <div className="docpat">
          <StylesProvider injectFirst>
            <DocTable {...this.props} />
          </StylesProvider>
        </div>
      </div>
    );
  }
}

export function RegisterPatient(props) {
  //define state to hold input field values
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [guardianName, setguardianName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [adminId, setaId] = useState(props.match.params["a_id"]);
  const [doctorId, setdId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //post the input details
    axios
      .post(props.url + "covid19_patient_monitor/add_patient", {
        name: name,
        address: address,
        password: password,
        email: email,
        phone: phone,
        sex: sex,
        guardianName: guardianName,
        age: age,
        height: height,
        weight: weight,
        adminId: adminId,
        doctorId: doctorId,
      })
      .then((res) => {
        console.log("response api= ", res.data);
        alert("Registration Complete! ");
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
            <label>Password</label>
            <input
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
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
            <label>Doctor ID</label>
            <input
              type="text"
              className="input"
              onChange={(e) => setdId(e.target.value)}
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

export function RegisterDoctor(props) {
  //define state to hold input field values
  const [name, setName] = useState("");
  const [hospitalInfo, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hospitalName, sethospitalName] = useState("");
  const [password, setPassword] = useState("");
  const [adminId, setdId] = useState(props.match.params["a_id"]);
  console.log("props = ", props);
  const handleSubmit = (e) => {
    e.preventDefault();
    //post the input details
    axios
      .post(props.url + "covid19_patient_monitor/doctor_signup", {
        name: name,
        hospitalInfo: hospitalInfo,
        email: email,
        phone: phone,
        hospitalName: hospitalName,
        adminId: adminId,
        password: password,
      })
      .then((res) => {
        console.log("response api= ", res.data);
        alert("Registration Complete! ");
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
        <div className="title">Doctor Registration</div>
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
            <label>Password</label>
            <input
              type="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Hospital/Clinic Name</label>
            <input
              type="text"
              className="input"
              onChange={(e) => sethospitalName(e.target.value)}
            />
          </div>
          <div className="inputfield">
            <label>Hospital/Clinic Address</label>
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
