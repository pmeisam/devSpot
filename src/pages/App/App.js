import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import postService from "../../utils/postService";
import BaseView from "../../components/BaseView/BaseView";
import NavBar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import ProfilePage from "../ProfilePage/ProfilePage";
import CreatePostPage from "../CreatePostPage/CreatePostPage";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { user: null, projects: null, userProjects: null };
  }
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };
  handleUpdateProjects = projects => {
    this.setState({ projects });
  };
  handleUpdateUserProjects = userProjects => {
    this.setState({ userProjects });
  };
  handleLikeButton = projectId => {
    let projectsCopy = [...this.state.projects];
    let userCopy = { ...this.state.user };
    projectsCopy.forEach(async p => {
      if (p._id === projectId) {
        if (p.likes.includes(userCopy.email)) {
          p.likes.splice(userCopy.email, 1);
        } else {
          p.likes.push(userCopy.email);
        }
        await postService.addLike({ projectId: p._id, userCopy });
      }
    });
    this.setState({ projects: projectsCopy });
  };
  handleCommentSubmit = (projects) => {
    this.setState({projects});
  };
  handleCommentDelete = (project, comment) => {
    let projectsCopy = [...this.state.projects];
    let projectCopy = projectsCopy.filter(p=> {return p._id === project._id});
    console.log(projectCopy)
    projectsCopy[0].comments.filter( (c, i) => {
      if(c._id === comment._id){
        projectsCopy[0].comments.splice(i, 1);
    }});
    postService.removeComment({project, comment});
    this.setState({projects: projectsCopy})
  }
  handleProjectDelete = (project) => {
    const userProjectsCopy = {...this.state.userProjects}
    const userProjects = this.state.userProjects.projects.filter( (p)=>{
      return p._id !== project._id
    })
    postService.deleteProject(project)
    userProjectsCopy.projects = userProjects;
    this.setState({userProjects: userProjectsCopy})
  }
  handleProjectUpdate = (userProjects) => {
    this.setState({userProjects})
  }

  async componentDidMount() {
    const user = userService.getUser();
    const projects = await postService.index();
    const userProjects = await postService.userIndex();
    this.setState({ user, projects, userProjects });
  }

  render() {
    return (
      <div>
        {userService.getUser() ? (
          <div>
            <NavBar
              user={userService.getUser()}
              handleLogout={this.handleLogout}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  userService.getUser() ? (
                    <HomePage
                      projects={this.state.projects}
                      user={userService.getUser()}
                      handleCommentSubmit={this.handleCommentSubmit}
                      handleLikeButton={this.handleLikeButton}
                      handleLogout={this.handleLogout}
                      handleUpdateProjects={this.handleUpdateProjects}
                      handleCommentDelete={this.handleCommentDelete}
                    />
                  ) : (
                    <div />
                  )
                }
              />
              <Route
                exact
                path="/create-post"
                render={({ history }) =>
                  userService.getUser() ? (
                    <CreatePostPage
                      history={history}
                      user={userService.getUser()}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              
              <Route
                path="/:username"
                render={props =>
                  userService.getUser() ? (
                        <ProfilePage
                          {...props}
                          user={userService.getUser()}
                          userProjects={this.state.userProjects}
                          handleProjectUpdate={this.handleProjectUpdate}
                          handleProjectDelete={this.handleProjectDelete}
                          handleUpdateUserProjects={this.handleUpdateUserProjects}
                        />
        
                  ) : (
                    <LoginPage />
                  )
                }
              />
            </Switch>
          </div>
        ) : (
          <div>
            <BaseView />
            <Switch>
              <Route
                exact
                path="/login"
                render={({ history }) => (
                  <LoginPage
                    history={history}
                    handleSignupOrLogin={this.handleSignupOrLogin}
                  />
                )}
              />
              <Route
                exact
                path="/signup"
                render={({ history }) => (
                  <SignupPage
                    history={history}
                    handleSignupOrLogin={this.handleSignupOrLogin}
                  />
                )}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

export default App;
