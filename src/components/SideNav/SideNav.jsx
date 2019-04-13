import React, { Component } from "react";
import { TextField} from "@material-ui/core";
import "./SideNav.css";
import userService from "../../utils/userService";
import { Link } from "react-router-dom";

class SideNav extends Component {
  state = {
    user: "",
    users: userService.getAllUsers(),
    results: null
  };
  handleSearch = evt => {
    evt.preventDefault();
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
    console.log(this.state.user);
    const searchedUser = this.state.user;
    const searchData = this.state.users.filter(u => {
      if (u.user_name.includes(searchedUser)) {
        return u;
      } else {
        return 0;
      }
    });
    this.setState({ results: searchData });
  };
  async componentDidMount() {
    const users = await userService.getAllUsers(this.state.user);
    this.setState({ users });
  }
  render() {
    return (
      <aside className="sideNav">
        <form onSubmit={this.handleSearch} className="searchForm">
          <TextField
            required
            name="user"
            margin="normal"
            variant="outlined"
            label="Search users"
            placeholder="Search users"
            autoComplete="off"
            type='search'
            value={this.state.user}
            onChange={this.handleChange}
          />
           
        </form>
        {this.state.results ? (
          <ul>
            {this.state.results.map(u => (
              <li>
                <Link to={`/profile/${u.user_name}`}>{u.user_name}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Search Results will appear here.</p>
        )}
      </aside>
    );
  }
}

export default SideNav;
