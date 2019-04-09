import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import postService from "../../utils/postService";
import EditProject from "../../components/EditProject/EditProject";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import "./ProfilePage.css";

class ProfilePage extends Component {
  async componentDidMount() {
    const projects = await postService.userIndex();
    this.props.handleUpdateUserProjects(projects);
  }
  render() {
    return (
      <Switch>
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
                  <Link
                    to={`/${this.props.userProjects.user_name}/edit-profile/${
                      p._id
                    }`}
                  >
                    <Fab color="secondary" aria-label="Edit" className="fab">
                      <EditIcon />
                    </Fab>
                  </Link>
                  <Route
                    exact
                    path={`/:${
                      this.props.userProjects.user_name
                    }/edit-profile/:${p._id}`}
                    render={({ history }) => (
                      <EditProject
                        history={history}
                        project={p}
                        userProjects={this.props.userProjects}
                        handleProjectUpdate={this.props.handleProjectUpdate}
                      />
                    )}
                  />
                  
                  <Fab onClick={() => this.props.handleProjectDelete(p)}aria-label="Delete" className="fab">
                      <DeleteIcon />
                  </Fab>
                  <div key={`likesLength${i}`}>{p.likes.length} Likes</div>
                  <div key={`commentsLength${i}`}>
                    {p.comments.length} Comments
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <img src="./images/loading3.gif" alt="" />
        )}
      </Switch>
    );
  }
}

export default ProfilePage;
