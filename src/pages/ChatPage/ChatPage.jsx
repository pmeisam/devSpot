import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import userService from "../../utils/userService";

class ChatPage extends Component {
  state = {
    message: "",
    user: null
  };
  handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value});
  }
  componentDidMount() {
    const user = userService.getUser();
    this.setState({user});
  }
  render() {
    return (
      <div style={{ paddingTop: "100px" }}>
        <form style={{ bottom: 0, position: "fixed", margin: "0 auto" }}>
          <TextField
            required
            style={{ width: "70vw" }}
            margin="normal"
            variant="outlined"
            type="text"
            label="Message"
            placeholder="Message"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <Button
            // disabled={this.isFormInvalid()}
            size="large"
            variant="outlined"
            color="secondary"
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default ChatPage;
