import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import BaseView from "../../components/BaseView/BaseView";
import NavBar from "../../components/Navbar/Navbar";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import HomePage from "../HomePage/HomePage";
import ProfilePage from "../ProfilePage/ProfilePage";
import CreatePostPage from "../CreatePostPage/CreatePostPage";
import userService from "../../utils/userService";
import postService from "../../utils/postService";
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
  handleUpdateUserIndex = userProjects => {
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
                      handleLogout={this.handleLogout}
                      handleUpdateProjects={this.handleUpdateProjects}
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
                      userIndex={this.state.userProjects}
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
