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

function createData(
  sNo,
  patientId,
  bloodPressure,
  respiratoryRate,
  heartRate,
  spO2,
  temperature,
  isCritical,
  time,
  message
) {
  return {
    sNo,
    patientId,
    bloodPressure,
    respiratoryRate,
    heartRate,
    spO2,
    temperature,
    isCritical,
    time,
    message,
  };
}

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

export function VitalsTable2(props) {
  const classes = useStyles();

  //define the state hook
  const [apiData, setapiData] = useState([]);
  console.log("state= ", apiData);

  // GET API DATA:
  function getApiData() {
    // Variable to store response
    // Make a request for a user with a given ID
    axios
      .get(props.url + "covid19_patient_monitor/patient_vitals", {
        params: {
          p_id: props.match.params["p_id"],
        },
      })
      .then(function (response) {
        // handle success
        if (response.data.error != "none") {
          alert("The patient vitals are not yet posted");
          return;
          //alert(response.data.error);
        }
        setapiData(response.data);
        // console.log("new state= ",apiData)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  //read vitals data from json:
  function read_details() {
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
    //console.log("items ",item)
    return item;
  }

  let items = read_details();
  const rows1 = [];
  for (let i = 0; i < items.length; i++) {
    rows1.push(
      createData(
        i + 1,
        items[i].patientId,
        items[i].bloodPressure,
        items[i].respiratoryRate,
        items[i].heartRate,
        items[i].spO2,
        items[i].temperature,
        items[i].isCritical,
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
          marginTop: "150px",
          marginLeft: "220px",
          overflow: "auto",
        },
      },
    },
  });

  return (
    <div>
      {/* {console.log("pid ", props)} */}
      {/* {window.location.href=="http://localhost:3000/vitals"&& */}
      <ThemeProvider theme={theme}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Log No.</StyledTableCell>
                <StyledTableCell align="right">Patient ID</StyledTableCell>
                <StyledTableCell>Blood Pressure</StyledTableCell>
                <StyledTableCell align="right">
                  Respiratory Rate
                </StyledTableCell>
                <StyledTableCell align="right">Heart Rate</StyledTableCell>
                <StyledTableCell align="right">SpO2 Level</StyledTableCell>
                <StyledTableCell align="right">Temparature</StyledTableCell>
                <StyledTableCell align="right">isCritical</StyledTableCell>
                <StyledTableCell align="right">Log Time</StyledTableCell>
                <StyledTableCell align="right">Note</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows1.map((row) => (
                <StyledTableRow key={row.name}>
                  {/* <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell> */}
                  <StyledTableCell align="right">{row.sNo}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.patientId}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.bloodPressure}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.respiratoryRate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.heartRate}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.spO2}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.temperature}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.isCritical}
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
