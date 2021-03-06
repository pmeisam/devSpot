import React, { Component } from "react";
import userService from "../../utils/userService";
import { Route } from "react-router-dom";
import postService from "../../utils/postService";
import EditProject from "../../components/EditProject/EditProject";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MailIcon from "@material-ui/icons/Mail";
import chatService from "../../utils/chatService";
import CommentIcon from '@material-ui/icons/Comment';

const styles = theme => ({
  card: {
    maxWidth: "90%",
    margin: "20px 10%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(1440deg)"
  },
  avatar: {
    backgroundColor: '#379683'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "60vw"
  }
});
class UserSearchedProfile extends Component {
  state = {
    queryData: null,
    chat: null,
    chatId: null,
    expanded: false,
    comment: '',
    allMessages: null,
    chatRoom: null
  };
  
  handleCommentSubmit = e => {
    e.preventDefault();
    const user = userService.getUser();
    let projectsCopy = [...this.props.projects];
    let projectCopy = { ...projectsCopy[e.target.id] };
    if (this.state.comment.length > 0) {
      projectCopy.comments.push({
        comment: this.state.comment,
        user_name: user.user_name,
        user_id: user._id
      });
      postService.addComment({
        comment: this.state.comment,
        user_name: user.user_name,
        user_id: user._id,
        userInfo: user,
        projectInfo: projectCopy
      });
    }
    this.props.handleCommentSubmit(projectsCopy);
    this.setState({ comment: "" });
  };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleChange = evt => {
    this.setState({[evt.target.name]: evt.target.value});
  }
  

  async componentDidMount() {
    
    const users = await this.props.users;
    const queryData = users.filter(u => {
      return u.user_name === this.props.match.params.username;
    });
    const allMessages = await chatService.getAllChats();
    this.setState({allMessages})
    this.setState({queryData})
    const chat = await chatService.createChat([
      this.state.queryData,
      userService.getUser()
    ]);
    this.setState({ chat: chat, chatId: chat._id});
  }
  render() {
    const { classes } = this.props;
    return (
      <div style={{ paddingTop: "100px" }}>
        {this.state.queryData ? (
          <>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    {this.state.queryData[0].first_name[0]}
                  </Avatar>
                }
                title={`${this.state.queryData[0].first_name} ${
                  this.state.queryData[0].last_name
                }`}
                subheader={this.state.queryData[0].user_name}
                action={
                  <Link
                    to={`/chat/${this.state.chatId}`}
                  >
                    <IconButton>
                      <MailIcon />
                    </IconButton>
                  </Link>
                }
              />
                <CardContent>
            <Typography style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              {this.state.queryData[0] ? (
                <>
                  <h6>{this.state.queryData[0].bio}</h6>
                  {this.state.queryData[0].portfolio ? (
                    <a _blank href={this.state.queryData[0].portfolio}>
                      <i class="fas fa-laptop-code icon" />
                    </a>
                  ) : (
                    <p />
                  )}
                  {this.state.queryData[0].linkedIn ? (
                    <a _blank href={this.state.queryData[0].linkedIn}>
                      <i class="fab fa-linkedin icon" />
                    </a>
                  ) : (
                    <p />
                  )}
                  {this.state.queryData[0].gitHub ? (
                    <a _blank href={this.state.queryData[0].gitHub}>
                      <i class="fab fa-github-square icon" />
                    </a>
                  ) : (
                    <p />
                  )}
                </>
              ) : (
                <p />
              )}
            </Typography>
          </CardContent>
            </Card>

            {this.state.queryData[0].projects.map((p, i) => (
              <>
                <Card className={classes.card} key={`card${i}`}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                        {this.state.queryData[0].first_name[0]}
                      </Avatar>
                    }
                    title={this.state.queryData[0].user_name}
                    subheader={p.createdAt.replace(/T/, '  ').replace(/\..+/, '')}
                  />
                  <iframe
                    title={`frameTitle${i}`}
                    key={`frame${i}`}
                    src={p.url}
                  />
                  <CardContent>
                    <Typography>
                      <h6 key={`likesLength${i}`}>
                        {p.likes.length}&nbsp;
                        <i className="fas fa-heart" />
                        &nbsp;&nbsp;&nbsp;&nbsp;{p.comments.length}&nbsp;
                        <i class="fas fa-comment" />
                      </h6>
                    </Typography>
                    {p.caption ? (
                      <Typography component="p">
                        <span style={{ fontWeight: "900" }}>
                          {this.state.queryData[0].user_name}:&nbsp;{" "}
                        </span>
                        {p.caption}
                      </Typography>
                    ) : (
                      <p />
                    )}
                  </CardContent>
                  <Route
                    exact
                    path={`/:${
                      this.state.queryData[0].user_name
                    }/edit-profile/:${p._id}`}
                    render={({ history }) => (
                      <EditProject
                        history={history}
                        project={p}
                        userProjects={this.props.userProjects}
                        handleProjectUpdate={this.props.handleProjectUpdate}
                      />
                    )}
                  />
                  <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton aria-label="Add to favorites">
                      {p.likes.includes(userService.getUser()._id) ? (
                        <FavoriteIcon
                          color="secondary"
                          onClick={() =>
                            this.props.handleLikeButton(p._id)
                          }
                        />
                      ) : (
                        <FavoriteIcon
                          onClick={() =>
                            this.props.handleLikeButton(p._id)
                          }
                        />
                      )}
                    </IconButton>
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <CommentIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse
                    in={this.state.expanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <CardContent>
                      <div key={`{comments${i}`}>
                        {p.comments ? (
                          p.comments.map((comment, idx) => (
                            <div key={`comment${i}in${idx}`}>
                              <Typography paragraph>
                                <Button
                                  size="small"
                                  color="inherit"
                                  type="submit"
                                  onClick={() =>
                                    this.props.handleCommentDelete(
                                      p,
                                      comment
                                    )
                                  }
                                >
                                  <i
                                    style={{ fontSize: "20px" }}
                                    className="fas fa-eraser"
                                  />
                                </Button>
                                <span style={{ fontWeight: "900" }}>
                                  {comment.user_name}
                                </span>
                                :&nbsp;
                                {comment.comment}
                              </Typography>
                              <hr />
                            </div>
                          ))
                        ) : (
                          <h5>There aren't any comments yet</h5>
                        )}
                      </div>
                      <Typography>
                        <form>
                          <TextField
                            id="outlined-name"
                            label="Comment"
                            margin="normal"
                            variant="outlined"
                            required
                            className={classes.textField}
                            placeholder="comments..."
                            type="text"
                            name="comment"
                            value={this.state.comment}
                            onChange={this.handleChange}
                            key={`commentInput${i}`}
                          />
                          <button
                            key={`submit${i}`}
                            type="submit"
                            id={i}
                            style={{ height: "56px" }}
                            className="btn btn-outline-dark"
                            onClick={this.handleCommentSubmit}
                          >
                            Send&nbsp;
                            <i id={i} className="fas fa-paper-plane" />
                          </button>
                        </form>
                      </Typography>
                    </CardContent>
                  </Collapse>
                </Card>
              </>
            ))}
          </>
        ) : (
          <p />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(UserSearchedProfile);
