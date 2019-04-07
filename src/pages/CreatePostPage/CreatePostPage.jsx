import React, { Component } from 'react';
import postService from '../../utils/postService'

class CreatePostPage extends Component {
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>
              Please Enter Your Project's URL
            </label>
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
              name="caption"
              cols="30"
              rows="10"
              value={this.state.caption}
            />
          </div>
          <input className="btn btn-primary" type="submit" value="upload" />
        </form>
      </div>
    );
  }
}

export default CreatePostPage;
