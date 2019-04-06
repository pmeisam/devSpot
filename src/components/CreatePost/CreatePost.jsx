import React, { Component } from "react";
import postService from "../../utils/postService";

class CreatePost extends Component {
  state = {
    url: "",
    caption: "",
    user: this.props.user
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    try {
      await postService.create_post(this.state);
      this.props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (
      <div className="card-panel blue-grey darken-1 white-text">
        <h4>Create Post</h4>
        <form onSubmit={this.handleSubmit}>
          {/* <input type="hidden" name="user" value={this.props.user}/> */}
          <input
            onChange={this.handleChange}
            placeholder="url"
            required
            type="url"
            name="url"
            value={this.state.url}
          />
          <textarea
            onChange={this.handleChange}
            placeholder="caption"
            name="caption"
            cols="30"
            rows="10"
            value={this.state.caption}
          />
          <input type="submit" value="upload" />
        </form>
      </div>
    );
  }
}

export default CreatePost;
