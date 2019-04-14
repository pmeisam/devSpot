import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "./SideNav.css";
import userService from "../../utils/userService";
import { Link } from "react-router-dom";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

const styles = theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  root: {
    width: '100%',
    maxWidth: 245,
    backgroundColor: theme.palette.background.paper,
    margin: '0 auto'
  },
})

class SideNav extends Component {
  state = {
    user: "",
    users: userService.getAllUsers(),
    results: null,
    userLoggedIn: null
  };
  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };
  handleSearch = evt => {
    evt.preventDefault();
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
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
    const userLoggedIn = users.filter(u => {
      if (u._id === userService.getUser()._id) {
        return u;
      }
    });
    this.setState({ userLoggedIn });
  }
  render() {
    const { classes } = this.props;
    return (
      <aside className="sideNav">
        {this.state.userLoggedIn ? (
          <h3>Welcome to devSpot {this.state.userLoggedIn.first_name}</h3>
        ) : (
          <p />
        )}

        <form onSubmit={this.handleSubmit}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search users by username…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              required
              name="user"
              margin="normal"
              variant="outlined"
              label="Search users"
              placeholder="Search users"
              autoComplete="off"
              type="search"
              value={this.state.user}
              onChange={this.handleChange}
            />
          </div>
        </form>
        
        {this.state.results ? (
          <>
            <List className={classes.root}>
            {this.state.results.map(value=> (
              <Link
              to={`/profile/${value.user_name}`}
            >
              <ListItem key={value} role={undefined} dense button>
              
              <ListItemText primary={`${value.user_name}`} />
            </ListItem>
            </Link>
            ) )}
            </List>
            {/* <ul>
              {this.state.results.map(u => (
                <li>
                  <Link
                    className="searchResults"
                    to={`/profile/${u.user_name}`}
                  >
                    {u.user_name}
                  </Link>
                </li>
              ))}
            </ul> */}
          </>
        ) : (
          <p></p>
        )}
      </aside>
    );
  }
}

export default withStyles(styles)(SideNav);
