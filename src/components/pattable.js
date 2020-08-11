import axios from "axios";
import React, { Component, useState } from "react";
import MaterialTable from "material-table";

export class PatTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      x: true,
      table_data: [],
      columns: [
        { title: "Name", field: "name" },
        { title: "Patient ID", field: "patientId", editable: "never" },
        { title: "Email", field: "email" },
        { title: "Address", field: "address" },
        { title: "Password", field: "password" },
        { title: "Phone Number", field: "phone" },
        { title: "Gender", field: "sex" },
        { title: "Name of Guardian", field: "guardianName" },
        { title: "Age", field: "age" },
        { title: "Height", field: "height" },
        { title: "Weight", field: "weight" },
        { title: "Doctor ID", field: "doctorId", editable: "never" },
      ],
      data: this.table_data,
    };
    this.add_data = this.add_data.bind(this);
  }

  create_object = () => {
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
  getApiData() {
    axios
      .get(this.props.url + "covid19_patient_monitor/get_info", {
        params: {
          a_id: this.props.match.params["a_id"],
        },
      })
      .then((response) => {
        console.log("api response ", response.data.patients);
        let Details = response.data.patients;
        console.log("details ", Details);
        let d = [];
        for (let j = 0; j < Object.keys(Details).length; j++)
          d[j] = this.create_object();
        for (var key in Details) {
          d[key - 1].name = Details[key].name;
          d[key - 1].patientId = Details[key].patientId;
          d[key - 1].address = Details[key].address;
          d[key - 1].password = Details[key].password;
          d[key - 1].email = Details[key].email;
          d[key - 1].phone = Details[key].phone;
          d[key - 1].guardianName = Details[key].guardianName;
          d[key - 1].doctorId = Details[key].doctorId;
          d[key - 1].sex = Details[key].sex;
          d[key - 1].weight = Details[key].weight;
          d[key - 1].height = Details[key].height;
          d[key - 1].age = Details[key].age;
          console.log("d =", d);
          this.setState({
            table_data: d,
          });
        }
      })
      .catch((err) => console.log("error ", err));
  }

  async componentDidMount() {
    this.getApiData();
  }

  add_data = (data, newData) => {
    console.log("state in add data", this.state);
    this.setState({
      ...this.state,
      x: false,
    });
    let arr = data;
    arr.push(newData);
    this.setState({
      ...this.state,
      table_data: arr,
    });
    console.log("state in add data", this.state);
    this.setState({
      ...this.state,
      x: true,
    });
  };

  render() {
    return (
      <>
        {this.state.x && (
          <MaterialTable
            title="Registered Patients"
            columns={this.state.columns}
            data={this.state.table_data}
            editable={{
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataUpdate = [...this.state.table_data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    const element = dataUpdate[index];
                    //setData([...dataUpdate]);
                    this.setState({
                      ...this.state,
                      table_data: [...dataUpdate],
                      selected: element,
                    });
                    axios
                      .post(
                        this.props.url +
                          "covid19_patient_monitor/update_patient",
                        {
                          ...this.state.selected,
                          adminId: this.props.match.params["a_id"],
                        }
                      )
                      .then((res) => {
                        console.log(res);
                        if (res.data.error != "none") alert("Update Failed!");
                      });
                    resolve();
                  }, 1000);
                }),
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...this.state.table_data];
                    const index = oldData.tableData.id;
                    const element = dataDelete[index];
                    dataDelete.splice(index, 1);
                    //setData([...dataDelete]);
                    this.setState({
                      ...this.state,
                      table_data: [...dataDelete],
                      selected: element,
                    });
                    // console.log("sele ", this.state.selected);
                    axios
                      .get(
                        this.props.url +
                          "covid19_patient_monitor/delete_patient",
                        {
                          params: {
                            p_id: this.state.selected.patientId,
                            a_id: this.props.match.params["a_id"],
                          },
                        }
                      )
                      .then((res) => console.log(res));
                    resolve();
                  }, 1000);
                }),
            }}
          />
        )}
      </>
    );
  }
}
