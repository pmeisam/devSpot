import React, { Component } from "react";
import postService from "../../utils/postService";
import "./ProfilePage.css";

class ProfilePage extends Component {
  async componentDidMount() {
    const projects = await postService.userIndex();
    this.props.handleUpdateUserProjects(projects);
  }
  render() {
    return (
      <>
        {this.props.userIndex ? (
          <div className="container">
            <h3>Hello {this.props.userIndex.first_name}</h3>
            <div>
              {this.props.userIndex.projects.reverse().map((p, i) => (
                <div key={`card${i}`}>
                  <div key={`profileName${i}`}>{this.props.userIndex.first_name} {this.props.userIndex.last_name}</div>
                  <iframe title={`frameTitle${i}`} key={`frame${i}`} src={p.url} />
                  <div key={`likesLength${i}`}>{p.likes.length} Likes</div>
                  <div key={`commentsLength${i}`}>{p.comments.length} Comments</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <img src="./images/loading3.gif" alt="" />
        )}
      </>
    );
  }
}

export default ProfilePage;
