//vitals import

// import Details from "../vitals2.json"
//api import
// import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import axios from "axios";
//Imports for vitals table
import React, { useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  withStyles,
  makeStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//table fns and componenets:
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(sNo, patientId, name, time, message) {
  return {
    sNo,
    patientId,
    name,
    time,
    message,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

export function AlertTable(props) {
  const classes = useStyles();
  console.log("insdide alerts props = ", props);
  let show = null;
  //define the state hook
  const [apiData, setapiData] = useState([]);
  console.log("state= ", apiData);

  // GET API DATA:
  function getApiData() {
    // Variable to store response
    // Make a request for a user with a given ID
    axios
      .get(props.url + "covid19_patient_monitor/notification", {
        params: {
          d_id: props.match.params["d_id"],
        },
      })
      .then((res) => {
        setapiData(res.data);
        if (res.data.error != "none") {
          window.location.replace(
            "http://localhost:3000/doctor/" + props.match.params["d_id"]
          );
        }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  //read vitals data from json:
  function read_details(props) {
    //console.log("reached fn")
    //store the API data in the state by using getAPiData which invokes setapiData()
    getApiData();
    //console.log("jsondata= ",json_data)
    let Details = apiData;
    console.log("details ", Details);
    let item = [];
    for (let i = 1; i < Object.keys(Details).length; i++) {
      item.push(Details[i]);
    }
    //getApiData();
    console.log("items ", item);
    return item;
  }

  let items = read_details();
  const rows1 = [];
  for (let i = 0; i < items.length; i++) {
    rows1.push(
      createData(
        i + 1,
        items[i].patientId,
        items[i].name,
        items[i].time,
        items[i].message
      )
    );
  }
  console.log("rows= ", rows1);

  const theme = createMuiTheme({
    overrides: {
      MuiTableContainer: {
        root: {
          width: "1200px",
          marginTop: "100px",
          marginLeft: "220px",
          overflow: "auto",
        },
      },
    },
  });
  //   getApiData();
  console.log("msg =", show);
  return (
    <div>
      <div>{show}</div>
      {/* {window.location.href=="http://localhost:3000/vitals"&& */}
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Log No.</StyledTableCell>
                <StyledTableCell align="right">Patient ID</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Log Time</StyledTableCell>
                <StyledTableCell align="right">Message</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows1.map((row) => (
                <StyledTableRow key={row.patientId}>
                  <StyledTableCell align="right">{row.sNo}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.patientId}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.time}</StyledTableCell>
                  <StyledTableCell align="right">{row.message}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
    </div>
  );
}
