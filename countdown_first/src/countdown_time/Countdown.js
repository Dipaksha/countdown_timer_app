import React, { useState, useRef } from "react";
import { Container, Grid, TextField, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        border: "2px solid black",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid black",
      },
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "green",
    marginTop: "12px",
    fontSize: "30px",
    color: "white",
  },
  textField: {
    color: "green",
    borderBottomColor: "white",
    borderColor: "white",
    marginRight: "10px",
    width: "20%",
    backgroundColor: "white",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "green",
    color: "white",
    marginLeft: "8px",
    width: "29%",
  },
}));
const Stopwatch = () => {
  const [state, setState] = useState({ minutes: 0, seconds: 0 });
  const interval = useRef(null);

  const handleMinSecChange = (event) => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const display = (state) => {
    const showCountDown =
      state.minutes === 0 && state.seconds === 0 ? null : (
        <span>
          {" "}
          {state.minutes <= 0
            ? "00"
            : state.minutes >= 10
            ? state.minutes
            : `0${state.minutes}`}
          :
          {state.seconds <= 0
            ? "00"
            : state.seconds >= 10
            ? state.seconds
            : `0${state.seconds}`}
        </span>
      );

    return showCountDown;
  };
  const handleStartClick = () => {
    interval.current = setInterval(() => {
      if (state.seconds > 0) {
        setState((prevState) => ({
          minutes:
            prevState.seconds === 0 ? prevState.minutes - 1 : prevState.minutes,
          seconds:
            prevState.seconds === 0
              ? (prevState.seconds = 59)
              : prevState.seconds - 1,
        }));
      }
      if (state.seconds === 0) {
        if (state.minutes === 0) {
          clearInterval(interval.current);
        } else {
          setState((prevState) => ({
            minutes: prevState.minutes - 1,
            seconds: (state.seconds = 59),
          }));
        }
      }
    }, 1000);
  };
  const handleClickPause = () => {
    clearInterval(interval.current);
  };

  console.log("minutes", state.minutes, "seconds", state.seconds);
  const handleClickReset = () => {
    setState({
      minutes: 0,
      seconds: 0,
    });
    clearInterval(interval.current);
  };
  const classes = useStyles();
  return (
    <Container maxWidth="xs">
      <Grid container spacing={2}>
        <Grid item className={classes.root}>
          <Paper className={classes.paper}>
            <TextField
              variant="outlined"
              className={classes.textField}
              name="minutes"
              fullWidth
              value={state.minutes <= 0 ? "" : state.minutes}
              onChange={handleMinSecChange}
            />
            <TextField
              variant="outlined"
              className={classes.textField}
              name="seconds"
              fullWidth
              value={state.seconds <= 0 ? "" : state.seconds}
              onChange={handleMinSecChange}
            />
          </Paper>
          <Paper className={classes.paper}>{display(state)}</Paper>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleStartClick}
          >
            start
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleClickPause()}
          >
            pause
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => handleClickReset()}
          >
            reset
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Stopwatch;
