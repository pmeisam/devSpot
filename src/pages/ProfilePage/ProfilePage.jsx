import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import postService from "../../utils/postService";
import EditProject from "../../components/EditProject/EditProject";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SettingIcon from "@material-ui/icons/Settings";
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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import userService from "../../utils/userService";
import CommentIcon from "@material-ui/icons/Comment";
import "./ProfilePage.css";

const styles = theme => ({
  card: {
    maxWidth: "90%",
    margin: "20px 10%"
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
    backgroundColor: "#379683"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "60vw"
  }
});

class ProfilePage extends Component {
  state = { expanded: false, comment: "", user_name: "", user_id: null };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCommentSubmit = e => {
    e.preventDefault();
    const user = userService.getUser();
    let userProjectsCopy = { ...this.props.userProjects };
    console.log(userProjectsCopy);
    console.log(e.target.id);
    let projectCopy = { ...userProjectsCopy.projects[e.target.id] };
    console.log(projectCopy);
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
    this.props.handleCommentSubmitOnProfile(userProjectsCopy);
    this.setState({ comment: "" });
  };
  async componentDidMount() {
    const projects = await postService.userIndex();
    this.props.handleUpdateUserProjects(projects);
  }
  render() {
    const { classes } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <div style={{ height: "100px" }} />
        <Card className={classes.card} style={{ backgroundColor: "#5cdb95" }}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                {userService.getUser().first_name[0]}
              </Avatar>
            }
            action={
              <>
                <Link to={`/editprofile/${userService.getUser()._id}`}>
                  <IconButton>
                    <SettingIcon />
                  </IconButton>
                </Link>
              </>
            }
            title={
              userService.getUser().first_name +
              " " +
              userService.getUser().last_name
            }
            subheader={userService.getUser().user_name}
          />
        </Card>
        {this.props.userProjects ? (
          this.props.userProjects.projects.map((p, i) => (
            <Card
              className={classes.card}
              key={`card${i}`}
              style={{ backgroundColor: "#5cdb95" }}
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    {this.props.userProjects.first_name[0]}
                  </Avatar>
                }
                action={
                  <>
                    <IconButton
                      onClick={() => this.props.handleProjectDelete(p)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Link
                      to={`/${this.props.userProjects.user_name}/edit-profile/${
                        p._id
                      }`}
                    >
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </>
                }
                title={this.props.userProjects.user_name}
                subheader={p.createdAt.replace(/T/, "  ").replace(/\..+/, "")}
              />
              <iframe title={`frameTitle${i}`} key={`frame${i}`} src={p.url} />
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
                      {this.props.userProjects.user_name}:&nbsp;{" "}
                    </span>
                    {p.caption}
                  </Typography>
                ) : (
                  <p />
                )}
              </CardContent>
              <Route
                exact
                path={`/:${this.props.userProjects.user_name}/edit-profile/:${
                  p._id
                }`}
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
                      onClick={() => this.props.handleLikeBtnOnProfile(p._id)}
                    />
                  ) : (
                    <FavoriteIcon
                      onClick={() => this.props.handleLikeBtnOnProfile(p._id)}
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
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
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
                                this.props.handleCommentDeleteOnProfile(
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
          ))
        ) : (
          <img style={{ margin: "0 auto" }} src="./images/loading.gif" alt="" />
        )}
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
