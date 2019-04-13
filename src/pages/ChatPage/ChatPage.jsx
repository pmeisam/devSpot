import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import userService from "../../utils/userService";
import socket from '../../socket';

class ChatPage extends Component {
  state = {
    message: "",
    user: null,
    chatId: null,
    messages: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    try {
      socket.sendMessage({
        content: this.state.message,
        id: this.props.match.params.chatId
      });
      
    } catch (err) {
      console.log('there was an error!')
    }
  }
  handleChange = (evt) => {
    this.setState({[evt.target.name]: evt.target.value});
  }
  componentDidMount() {
    const user = userService.getUser();
    this.setState({user});
    this.setState({chatId: this.props.match.params.chatId})
    // this.setState({messages: })
  }
  render() {
    return (
      <div style={{ paddingTop: "100px" }}>
        <div>
          {this.state.message}
        </div>
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
            onClick={this.handleSubmit}
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
