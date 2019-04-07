import React, { Component } from "react";
import postService from "../../utils/postService";
import "./ProfilePage.css";

class ProfilePage extends Component {
  async componentDidMount() {
    const projects = await postService.userIndex();
    this.props.handleUpdateUserProjects(projects);
  }
  render() {
    console.log(this.props.userProjects)
    return (
      <>
        {this.props.userProjects ? (
          <div className="container">
            <h3>Hello {this.props.userProjects.first_name}</h3>
            <div>
              {this.props.userProjects.projects.reverse().map((p, i) => (
                <div key={`card${i}`}>
                  <div key={`profileName${i}`}>
                    {this.props.userProjects.first_name}{" "}
                    {this.props.userProjects.last_name}
                  </div>
                  <iframe
                    title={`frameTitle${i}`}
                    key={`frame${i}`}
                    src={p.url}
                  />
                  <div key={`likesLength${i}`}>{p.likes.length} Likes</div>
                  <div key={`commentsLength${i}`}>
                    {p.comments.length} Comments
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <img src="./images/loading3.gif"/>
        )}
      </>
    );
  }
}

export default ProfilePage;
