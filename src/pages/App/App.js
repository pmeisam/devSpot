import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import ChatPage from '../ChatPage/ChatPage';
import BaseView from "../../components/BaseView/BaseView";
import NavBar from "../../components/Navbar/Navbar";
import HomePage from "../HomePage/HomePage";
import ProfilePage from "../ProfilePage/ProfilePage";
import CreatePostPage from "../CreatePostPage/CreatePostPage";
import UserSearchedProfile from '../UserSearchedProfile/UserSearchedProfile'
import userService from "../../utils/userService";
import postService from "../../utils/postService";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = { user: null, projects: null, userProjects: null, users: null };
  }
  handleSignupOrLogin = () => {
    const user = userService.getUser();
    this.setState({user});
  };

  handleLogout = () => {
    userService.logout();
    this.setState({user: null});
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
        if (p.likes.includes(userCopy._id)) {
          p.likes = p.likes.filter(a=>{
            return a !== userCopy._id
          })
        } else {
          p.likes.push(userCopy._id);
        }
        await postService.addLike({ projectId: p._id, userCopy });
      }
    });
    this.setState({ projects: projectsCopy });
  };
  handleLikeBtnOnProfile = projectId => {
    let projectsCopy = {...this.state.userProjects};
    let userCopy = { ...this.state.user };
    projectsCopy.projects.forEach(async p => {
      if (p._id === projectId) {
        if (p.likes.includes(userCopy._id)) {
          p.likes = p.likes.filter(a=>{
            return a !== userCopy._id
          })
        } else {
          p.likes.push(userCopy._id);
        }
        await postService.addLike({ projectId: p._id, userCopy });
      }
    });
    this.setState({ userProjects: projectsCopy });
  }
  handleCommentSubmit = projects => {
    this.setState({ projects });
  };
  handleCommentSubmitOnProfile = userProjects => {
    this.setState({ userProjects });
  };
  handleCommentDelete = (project, comment) => {
    let projectsCopy = [...this.state.projects];
    let projectCopy = projectsCopy.filter(p => {
      return p._id === project._id;
    });
    // console.log(projectCopy)
    const commentsCopy = projectCopy[0].comments.filter((c) => {
      return c._id !== comment._id
    });
    projectCopy[0].comments = commentsCopy;
    postService.removeComment({ project, comment });
    this.setState({ projects: projectsCopy });
  };

  handleCommentDeleteOnProfile = (project, comment) => {
    let userProjects = {...this.state.userProjects};
    const projectCopy = userProjects.projects.filter( p => { return p._id === project._id} );
    const commentsCopy = projectCopy[0].comments.filter( c => c._id !== comment._id)
    projectCopy[0].comments = commentsCopy;
    postService.removeComment({project, comment});
    this.setState({userProjects: userProjects});
  }

  handleProjectDelete = project => {
    const userProjectsCopy = { ...this.state.userProjects };
    const userProjects = this.state.userProjects.projects.filter(p => {
      return p._id !== project._id;
    });
    postService.deleteProject(project);
    userProjectsCopy.projects = userProjects;
    this.setState({ userProjects: userProjectsCopy });
  };
  handleProjectUpdate = userProjects => {
    this.setState({ userProjects });
  };

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
                path="/createpost"
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
                exact
                path="/profile/:username"
                render={( props ) =>
                  userService.getUser() ? (
                    <UserSearchedProfile
                      {...props}
                      users={userService.getAllUsers()}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/chat/:chatId"
                render={( props ) =>
                  userService.getUser() ? (
                    <ChatPage
                      {...props}
                      users={userService.getAllUsers()}
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
                      handleCommentSubmitOnProfile={this.handleCommentSubmitOnProfile}
                      handleLikeBtnOnProfile={this.handleLikeBtnOnProfile}
                      handleCommentDeleteOnProfile={this.handleCommentDeleteOnProfile}
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
