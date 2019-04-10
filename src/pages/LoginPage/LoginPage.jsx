import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class LoginPage extends Component {
  state = {
    email: "",
    pw: ""
  };

  handleChange = e => {
    this.setState({
      // Using ES2015 Computed Property Names
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      // Let <App> know a user has signed up!
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // Use a modal or toast in your apps instead of alert
      alert("Invalid Credentials!");
    }
  };

  render() {
    return (
      <div>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
          
        >
          <TextField
            required
            style={{ width: "50vw" }}
            label="Email"
            margin="normal"
            variant="outlined"
            type="email"
            placeholder="Email"
            autoComplete="off"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
          <TextField
            required
            style={{ width: "50vw" }}
            label="Password"
            margin="normal"
            variant="outlined"
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="pw"
            value={this.state.pw}
            onChange={this.handleChange}
          />
          <div>
            <Button onClick={this.handleSubmit} size="large" variant="outlined" color="primary">
              Log In
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
