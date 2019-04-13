import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import userService from "../../utils/userService";
import socket from "../../socket";

class ChatPage extends Component {
  state = {
    message: "",
    user: null,
    chatId: null,
    messages: [],
    userName: null
  };
  handleSubmit = e => {
    e.preventDefault();
    try {
      socket.sendMessage({
        content: this.state.message,
        id: this.props.match.params.chatId
      });
    } catch (err) {
      console.log("there was an error!");
    }
    this.setState({ message: "" });
  };
  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };
  componentDidMount() {
    socket.registerApp(this);
    if (this.state.chat) {
      this.setState({ messages: this.state.chat.messages });
    }
    console.log(this.state.messages);
    const user = userService.getUser();
    this.setState({ user });
    this.setState({ chatId: this.props.match.params.chatId });
  }
  render() {
    console.log(this.state.messages);
    return (
      <div style={{ paddingTop: "150px" }}>
        {this.state.messages ? 
          this.state.messages.map(m => (
            <p key={m._id}>
              <span>{m.userName}:&nbsp;&nbsp;</span>
              {m.content}
            </p>
          ))
         : (
          <p />
        )}
        <form onSubmit={this.handleSubmit} style={{ bottom: 0, position: "fixed", margin: "0 auto" }}>
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
            // onClick={this.handleSubmit}
            disabled={this.props.message === ""}
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
