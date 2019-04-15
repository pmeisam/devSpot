import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class SignupForm extends Component {
  state = {
    bio: '',
    gitHub: '',
    linkedIn: '',
    portfolio: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    userService.updateProfile(this.state);
    this.props.history.push(`/${userService.getUser().user_name}`);
  };

  render() {
    return (
      <div className="container">
      <div style={{height: '90px'}}></div>
        <form onSubmit={this.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#5cdb95",
            width: "70vw",
            padding: "30px",
            margin: "0 auto",
            borderRadius: "15px",
          }}
        >
         
          <TextField
            style={{ width: "50vw" }}
            label="Portfolio"
            margin="normal"
            variant="outlined"
            type="url"
            placeholder="Portfolio"
            value={this.state.portfolio}
            name="portfolio"
            onChange={this.handleChange}
          />
          <TextField
            style={{ width: "50vw" }}
            label="Git Hub"
            margin="normal"
            variant="outlined"
            type="url"
            placeholder="Git Hub"
            value={this.state.gitHub}
            name="gitHub"
            onChange={this.handleChange}
          />
          <TextField
            style={{ width: "50vw" }}
            label="LinkedIn"
            margin="normal"
            variant="outlined"
            type="url"
            placeholder="LinkedIn"
            value={this.state.linkedIn}
            name="linkedIn"
            onChange={this.handleChange}
          />
          <TextField
            style={{ width: "50vw" }}
            label="Tell others a little about yourself"
            margin="normal"
            variant="outlined"
            type="text"
            placeholder="Bio"
            value={this.state.bio}
            name="bio"
            onChange={this.handleChange}
            autoComplete='off'
          />
          <div>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              type='submit'
            >
              Submit
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
