import React, {Component} from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TextField, Button } from "@material-ui/core";
import './SideNav.css'
import userService from "../../utils/userService";
// import { InputBase } from "@material-ui/core/InputBase";

class SideNav extends Component {
    state={
        user: '',
        users: userService.getAllUsers()
    }

    handleSearch = (evt) => {
        evt.preventDefault();
        console.log(this.state.users);
        const searchedUser = this.state.user
        // var modelQuery = searchedUser ? new RegExp(searchedUser, 'i') : '';
        // console.log(this.state.users[0].user_name)
        const searchData = this.state.users.filter( u =>{
            if(u.user_name.includes(searchedUser)){
                return u;
            }
        })
        console.log("searchData: ", searchData)
    }
    handleChange = (evt) => {
        this.setState({[evt.target.name]: evt.target.value})
    }
    async componentDidMount() {
        const users = await userService.getAllUsers(this.state.user);
        this.setState({users})
    }
  render() {
    return (
      <aside className="sideNav">
        {/* <form onSubmit={this.handleSearch} className="searchForm">
            search bar to search for users
          <TextField
                required
                name='user'
                margin="normal"
                variant="outlined"
                label="Search users"
                placeholder="Search users"
                value={this.state.user}
                onChange={this.handleChange}
                />
            <Button
                variant="outlined"
                color="primary"
                type="submit"
            >   
                <SearchIcon />
            </Button>
        </form> */}
      </aside>
    );
  }
}

export default SideNav;
