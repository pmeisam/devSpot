import React, { Component } from "react";
import userService from "../../utils/userService";
import postService from "../../utils/postService";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {Link} from 'react-router-dom'
class EditProject extends Component {
  state = {
    url: "",
    description: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    const user = userService.getUser();
    const projectCopy = { ...this.props.project };
    const userProjects = { ...this.props.userProjects };
    const newProjectCopy = userProjects.projects.filter(project => {
      return project._id === projectCopy._id;
    });
    newProjectCopy[0].url = this.state.url;
    newProjectCopy[0].caption = this.state.description;
    postService.updateProject(newProjectCopy[0]);
    this.props.handleProjectUpdate(userProjects);
    this.props.history.push(`/${user.user_name}`);
  };
  render() {
    return (
      <form
        style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}
        onSubmit={this.handleSubmit}
      >
        <TextField
          required
          // fullWidth
          style={{width: '75vw'}}
          id="outlined-name"
          label="Project's URL"
          margin="normal"
          variant="outlined"
          placeholder="Project's URL"
          type="url"
          name="url"
          onChange={this.handleChange}
          value={this.state.url}
        />
        <br />
        <TextField
          required
          style={{width: '75vw'}}
          placeholder="Description"
          margin="normal"
          variant="outlined"
          label="Description"
          onChange={this.handleChange}
          name="description"
          cols="30"
          rows="10"
          value={this.state.description}
        />
        <br />
        <div>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            type="submit"
          >
            Done
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Link to={`/${userService.getUser().user_name}`}>Cancel</Link>
        </div>
      </form>
    );
  }
}

export default EditProject;
