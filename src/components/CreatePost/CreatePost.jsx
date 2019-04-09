import React, { Component } from "react";
import postService from "../../utils/postService";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
      <div className="container">
        <div style={{ height: "100px" }} />
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={this.handleSubmit}
        >
          <TextField
            required
            fullWidth
            id="outlined-name"
            label="Project's URL"
            margin="normal"
            variant="outlined"
            placeholder="Project's URL..."
            type="url"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <br />
          <TextField
            required
            fullWidth
            placeholder="Description"
            name="caption"
            margin="normal"
            variant="outlined"
            id="outlined-name"
            label="Description"
            onChange={this.handleChange}
            value={this.state.caption}
          />
          <br />
          <div>
            <Button
              size="large"
              variant="outlined"
              color="primary"
              type="submit"
              value="upload"
            >
              Post&nbsp;
              <i className="fas fa-cloud-upload-alt" />
            </Button>
            <Link style={{ marginLeft: "20px" }} to="/">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default CreatePost;
