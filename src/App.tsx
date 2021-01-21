import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { range } from "./utility";
import NavBar from "./components/Navbar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    "& .MuiTextField-root": {
      margin: theme.spacing(5),
      width: "25ch",
    
    },
  },
  text: {
    marginLeft: theme.spacing(2),
    fontSize: "2rem"
  },
  button: {
    margin: theme.spacing(5),
    height: 50
  },
}));

/**
 * - takes in numbers 
 *  @returns - sequence of numbers that are divisible by 3
 */

function App() {
  const classes = useStyles();
  const [state, setstate] = useState<{
    firstNumber: string;
    secondNumber: string;
  }>({
    firstNumber: "",
    secondNumber: "",
  });
  const [result, setResult] = useState(0)
  const [disabled, setDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const { firstNumber, secondNumber } = state;

    if (parseInt(firstNumber) >= parseInt(secondNumber)) {
      setDisabled(true);
      setErrorMessage("First Number must be less than second number");
    } else {
      setDisabled(false);
      setErrorMessage("");
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setstate({ ...state, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { firstNumber, secondNumber } = state;
    let count = 0
    //loop through the array to find all numbers divisible by 3
    for (let i of range(parseInt(firstNumber), parseInt(secondNumber))) {
      if (i % 3 === 0) {
        alert(i);
        count++
      }
    }
    setResult(count)
  };
  return (
    <div>
      <NavBar />
      <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          error={disabled}
          id="firstNumber"
          label="First Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChange}
          value={state.firstNumber}
          helperText={errorMessage}
          required
        />

        <TextField
          id="secondNumber"
          label="Second Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={handleChange}
          value={state.secondNumber}
          required
        />

        <h4 className={classes.text}>= {result}</h4>

        <Button
          variant="contained"
          color="primary"
          disabled={disabled}
          className={classes.button}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default App;
