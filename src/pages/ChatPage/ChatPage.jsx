import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import userService from "../../utils/userService";
import socket from "../../socket";
import Card from "@material-ui/core/Card";
import chatService from "../../utils/chatService";

class ChatPage extends Component {
  state = {
    message: "",
    user: null,
    chatId: null,
    messages: [],
    userName: null,
    chatRoom: null
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
  async componentDidMount() {
    this.scrollToBottom();
    socket.registerApp(this);
    if (this.state.chat) {
      this.setState({ messages: this.state.chat.messages });
    }
    const user = userService.getUser();
    this.setState({ user });
    this.setState({ chatId: this.props.match.params.chatId });
  }
  async componentDidUpdate() {
    this.scrollToBottom();
    const allChats = await chatService.getAllChats();
    const chatRoom = allChats.filter(ch => {
      if (ch._id === this.props.match.params.chatId) {
        return ch;
      } else {
        return 0;
      }
    });
    this.setState({ chatRoom });
  }

  render() {
    return (
      <div style={{ paddingTop: "80px", display: 'flex', minHeight: '100vh', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'end' }}>
        <Card style={{ width: "80%", margin: "0 auto", padding: "0 40px", minHeight: '75vh' }}>
          {this.state.chatRoom ? (
            this.state.chatRoom[0].messages.map(m =>
              m.userName === userService.getUser().user_name ? (
                <p
                  style={{
                    margin: "10px 40px",
                    backgroundColor: "#659dbd",
                    padding: "4px",
                    borderRadius: "8px"
                  }}
                  key={m._id}
                >
                  <span style={{ fontWeight: "900" }}>
                    {m.userName}:&nbsp;&nbsp;
                  </span>
                  {m.content}
                </p>
              ) : (
                <p
                  style={{
                    margin: "10px 40px",
                    backgroundColor: "#8ee4af",
                    padding: "4px",
                    borderRadius: "8px",
                    textAlign: 'right',
                  }}
                  key={m._id}
                >
                
                  <span style={{ fontWeight: "900" }}>
                  {m.userName}:&nbsp;&nbsp;
                  </span>
                  {m.content}
                </p>
              )
            )
          ) : (
            <p />
          )}
        </Card>
        <form
          onSubmit={this.handleSubmit}
          style={{ bottom: 0, display: 'fixed', margin: "0 10vw 0 10vw", backgroundColor: 'white', width: '80vw', padding: '10px' }}
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
            color="primary"
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
