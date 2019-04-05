import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "../../components/Navbar/Navbar";
import SignupPage from "../SignupPage/SignupPage";
import userService from "../../utils/userService";

class App extends Component {
  constructor() {
    super();
    this.state = { user: null };
  }
  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  async componentDidMount() {
    const user = userService.getUser();
    this.setState({ user });
  }
  render() {
    return (
      <>
        <Switch>
          <Route exact path="/" render={() => <Navbar {...this.props} />} />
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
      </>
    );
  }
}

export default App;
