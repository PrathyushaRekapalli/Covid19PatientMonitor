import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Select from "react-select";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Covid-19 Patient Monitor {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function SignIn(props) {
  const classes = useStyles();
  const options = [
    { value: "patient", label: "Patient" },
    { value: "doc", label: "Doctor" },
    { value: "admin", label: "Administrator" },
  ];
  const [state, setState] = React.useState({
    selected: "",
  });
  //define state to hold input field values
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");

  const handle_submit = (e) => {
    e.preventDefault();
    console.log("reached");
    axios
      .post(props.url + "covid19_patient_monitor/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.error === "none") {
          console.log("response", res);
          window.location.replace(
            "http://localhost:3000/" + res.data.type + "/" + res.data.id
          );
        } else {
          alert("ERROR ", res.data.error);
        }
      })
      .catch(
        (err) => {console.log(err);
        alert("ERROR ", err);
        })
  };
  const handle_select = (e) => {
    console.log("reached");
    console.log(e.value);
    setState({
      ...state,
      selected: e.value,
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userid"
            label="Enter Email"
            name="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handle_submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <a href="/signup">{"Don't have an account? Sign Up"}</a>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
