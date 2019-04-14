import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import userService from "../../utils/userService";
import socket from "../../socket";
import Card from "@material-ui/core/Card";

class ChatPage extends Component {
  state = {
    message: "",
    user: null,
    chatId: null,
    messages: [],
    userName: null
  };
  scrollToBottom = () => {
    this.el.scrollIntoView({ behavior: "smooth" });
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
    this.scrollToBottom();
    socket.registerApp(this);
    if (this.state.chat) {
      this.setState({ messages: this.state.chat.messages });
    }
    const user = userService.getUser();
    this.setState({ user });
    this.setState({ chatId: this.props.match.params.chatId });
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    console.log(this.state.messages);
    return (
      <div style={{ paddingTop: "150px" }}>
        <Card style={{width: '80%', margin: '0 auto', padding: '0 40px'}}>
          {this.state.messages ? (
            this.state.messages.map(m => (
              <p style={{margin: '10px 40px'}} key={m._id}>
                <span style={{fontWeight: '900'}}>{m.userName}:&nbsp;&nbsp;</span>
                {m.content}
              </p>
            
            ))
          ): (
            <p />
          )}</Card> 
          <form
            onSubmit={this.handleSubmit}
            style={{ bottom: 0, display: 'fixed', margin: "0 auto 0 auto" }}
          >
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
              autoComplete="off"
            />
            <Button
              // onClick={this.handleSubmit}
              disabled={this.props.message === ""}
              size="large"
              variant="outlined"
              color="secondary"
              type="submit"
              style={{ height: "57px" }}
            >
              Send
            </Button>
            <div
              ref={el => {
                this.el = el;
              }}
            />
          </form>
        
      </div>
    );
  }
}

export default ChatPage;
