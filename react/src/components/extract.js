import axios from "axios";
import React, { Component, useState } from "react";

export class Extract extends Component {
  constructor(props) {
    super(props);
    this.state = {
      res: null,
    };
  }

  getApiData() {
    let create_object = () => {
      return {
        name: 0,
        patientId: 0,
        email: 0,
        password: 0,
        address: 0,
        phone: 0,
        sex: 0,
        guardianName: 0,
        age: 0,
        height: 0,
        weight: 0,
        doctorId: 0,
      };
    };
    axios
      .get(this.props.url + "covid19_patient_monitor/get_info", {
        params: {
          a_id: "ADMIN123",
        },
      })
      .then((response) => {
        console.log("api response ", response.data.patients);
        this.setState({
          res: response.data.patients,
        });
        // response = res.data.patients;
        //setRes(res.data.patients);
      })
      .catch((err) => console.log("error ", err));
  }
  formatApiData() {
    // let Details = response.data.patients;
    // let d = [];
    // for (let j = 0; j < Object.keys(Details).length; j++)
    //   d[j] = create_object();
    // //console.log("table data: ", d);
    // // console.log("d name ", d[0].name);
    // for (var key in Details) {
    //   d[key - 1].name = Details[key].name;
    //   d[key - 1].patientId = Details[key].patientId;
    //   d[key - 1].address = Details[key].address;
    //   d[key - 1].password = Details[key].password;
    //   d[key - 1].email = Details[key].email;
    //   d[key - 1].phone = Details[key].phone;
    //   d[key - 1].guardianName = Details[key].guardianName;
    //   d[key - 1].doctorId = Details[key].doctorId;
    //   d[key - 1].sex = Details[key].sex;
    //   d[key - 1].weight = Details[key].weight;
    //   d[key - 1].height = Details[key].height;
    //   d[key - 1].age = Details[key].age;
    // }
    // setRes(d);
    //console.log("response ", response);
    // console.log("state= ", apiData);
  }
  async componentDidMount() {
    this.getApiData();
  }
  render() {
    return <div>Hello world</div>;
  }
}
