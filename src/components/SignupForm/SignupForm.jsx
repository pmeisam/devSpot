import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

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
      <div>
        <h3>devSpot</h3>
        <div className="row">
          <div className="col s12">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={this.state.first_name}
                    name="first_name"
                    onChange={this.handleChange}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    name="last_name"
                    onChange={this.handleChange}
                  />
                  <input
                    type="text"
                    placeholder="User Name"
                    value={this.state.user_name}
                    name="user_name"
                    onChange={this.handleChange}
                  />
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                  />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.state.password}
                    name="password"
                    onChange={this.handleChange}
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={this.state.passwordConf}
                    name="passwordConf"
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn waves-effect waves-light #e65100 orange darken-4"
                    disabled={this.isFormInvalid()}
                  >
                    Sign Up
                  </button>
                  &nbsp;&nbsp;
                  <Link to="/">Cancel</Link>
                </form>
              </div>
              <div className="card-action">
                <Link to="/">back</Link>
                <Link to="">This is a link</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupForm;
