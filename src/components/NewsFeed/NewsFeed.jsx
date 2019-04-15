import React, { Component } from "react";
import "./NewsFeed.css";
import postService from "../../utils/postService";
import userService from "../../utils/userService";
import PropTypes from "prop-types";
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
import CommentIcon from '@material-ui/icons/Comment';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  card: {
    maxWidth: "90%",
    margin: "0 10% 20px 10%",
    backgroundColor: '#5cdb95'
  },
  media: {
    height: 0,
    paddingTop: "50" // 16:9
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
    transform: "rotate(2880deg)"
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

class HomePage extends Component {
  state = { expanded: false, comment: "", user_name: "", user_id: null };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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
  async componentDidMount() {
    const projects = await postService.index();
    this.props.handleUpdateProjects(projects);
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const user = userService.getUser();
    return (
      <>
        <div style={{ height: "15px" }} />
        {this.props.projects ? (
          this.props.projects.map((p, i) => (
            
            <Card className={classes.card} key={`card${i}`}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {p.user[0].first_name[0]}
                  </Avatar>
                }
                
                title={p.user[0].user_name}
                subheader={p.createdAt.replace(/T/, '  ').replace(/\..+/, '')}
              />
              <iframe title={`iframe${i}`} className="frame" src={p.url} />
              <CardContent>
                <a href={p.url} _blank="true">
                  Link to the project
                </a>
                <Typography>
                  <h6>{p.likes.length}&nbsp;
                    <i className="fas fa-heart" />
                    &nbsp;&nbsp;&nbsp;&nbsp;{p.comments.length}&nbsp;<i className="fas fa-comment"></i>
                  </h6>
                </Typography>
                {p.caption ? (
                  <Typography component="p">
                    <span style={{ fontWeight: "900" }}>{p.user[0].user_name}:&nbsp; </span>
                    {p.caption}
                  </Typography>
                ) : (
                  <p />
                )}
              </CardContent>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                 {/*  <FavoriteIcon
                    onClick={() => this.props.handleLikeButton(p._id)}
                  /> */}
                  {p.likes.includes(userService.getUser()._id) ? (
                    <FavoriteIcon
                      color="secondary"
                      onClick={() => this.props.handleLikeButton(p._id)}
                    />
                  ) : (
                    <FavoriteIcon
                      onClick={() => this.props.handleLikeButton(p._id)}
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
                  {/* View all comments */}
                </IconButton>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <div key={`{comments${i}`}>
                    {p.comments ? (
                      p.comments.map((comment, idx) => (
                        <div key={`comment${i}in${idx}`}>
                          <Typography paragraph>
                            {user._id === comment.user_id ? (
                              <Button
                                size="small"
                                color="inherit"
                                type="submit"
                                onClick={() =>
                                  this.props.handleCommentDelete(p, comment)
                                }
                              >
                                <i
                                  style={{ fontSize: "20px" }}
                                  className="fas fa-eraser"
                                />
                              </Button>
                            ) : (
                              <Button
                                size="small"
                                color="inherit"
                                type="submit"
                                disabled
                              >
                                <i
                                  style={{ fontSize: "20px" }}
                                  className="fas fa-eraser"
                                />
                              </Button>
                            )}
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
                        autoComplete='off'
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
          ))
        ) : (
          <img style={{margin: '0 auto'}} src="./images/loading.gif" alt="" />
        )}
      </>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HomePage);