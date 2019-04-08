import React, { Component } from "react";
import userService from "../../utils/userService";
import postService from "../../utils/postService";

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
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Please Enter Your Project's URL</label>
            <input
              className="form-control"
              onChange={this.handleChange}
              placeholder="URL"
              required
              type="url"
              name="url"
              value={this.state.url}
            />
          </div>
          <div className="form-group">
            <label>Please Enter a Description</label>
            <textarea
              className="form-control"
              onChange={this.handleChange}
              placeholder="description..."
              name="description"
              cols="30"
              rows="10"
              value={this.state.description}
            />
          </div>
          <input className="btn btn-primary" type="submit" value="upload" />
        </form>
      </div>
    );
  }
}

export default EditProject;
