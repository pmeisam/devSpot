import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class SignupForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    passwordConf: ""
  };

  handleChange = e => {
    this.props.updateMessage("");
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.signup(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // Invalid user data (probably duplicate email)
      this.props.updateMessage(err.message);
    }
  };

  isFormInvalid() {
    return !(
      this.state.first_name &&
      this.state.last_name &&
      this.state.user_name &&
      this.state.email &&
      this.state.password === this.state.passwordConf
    );
  }

  render() {
    return (
      <div className="container">
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgb(216, 77, 66)",
            width: "70vw",
            padding: "30px",
            margin: "0 auto",
            borderRadius: "15px"
          }}
        >
          <TextField
            required
            style={{ width: "50vw" }}
            label="First Name"
            margin="normal"
            variant="outlined"
            type="text"
            placeholder="First Name"
            value={this.state.first_name}
            name="first_name"
            onChange={this.handleChange}
          />
          <TextField
            required
            style={{ width: "50vw" }}
            label="Last Name"
            margin="normal"
            variant="outlined"
            type="text"
            placeholder="Last Name"
            value={this.state.last_name}
            name="last_name"
            onChange={this.handleChange}
          />
          <TextField
            required
            style={{ width: "50vw" }}
            label="User Name"
            margin="normal"
            variant="outlined"
            type="text"
            placeholder="User Name"
            value={this.state.user_name}
            name="user_name"
            onChange={this.handleChange}
          />
          <TextField
            required
            style={{ width: "50vw" }}
            label="Email"
            margin="normal"
            variant="outlined"
            type="email"
            placeholder="Email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
          />
          <TextField
            required
            style={{ width: "50vw" }}
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
          />
          <TextField
            required
            style={{ width: "50vw" }}
            label="Confirm Password"
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Confirm Password"
            value={this.state.passwordConf}
            name="passwordConf"
            onChange={this.handleChange}
          />
          <div>
            <Button
              disabled={this.isFormInvalid()}
              size="large"
              variant="outlined"
              color="primary"
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
            &nbsp;&nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default SignupForm;
