import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import postService from "../../utils/postService";
import EditProject from "../../components/EditProject/EditProject";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
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
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "60vw"
  }
});
class ProfilePage extends Component {
  state = { expanded: false };
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  async componentDidMount() {
    const projects = await postService.userIndex();
    this.props.handleUpdateUserProjects(projects);
  }
  render() {
    const { classes } = this.props;
    return (
      <>
        <div style={{ height: "100px" }} />
        {this.props.userProjects ? (
          this.props.userProjects.projects.reverse().map((p, i) => (
            <Card className={classes.card} key={`card${i}`}>
              <CardHeader
                avatar={
                  <Avatar aria-label="Recipe" className={classes.avatar}>
                    P
                  </Avatar>
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={this.props.userProjects.user_name}
                subheader={p.createdAt}
              />
              <iframe title={`frameTitle${i}`} key={`frame${i}`} src={p.url} />
              <CardContent>
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
              <Link
                to={`/${this.props.userProjects.user_name}/edit-profile/${
                  p._id
                }`}
              >
                <Fab color="secondary" aria-label="Edit" className="fab">
                  <EditIcon />
                </Fab>
              </Link>
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
              <Fab
                onClick={() => this.props.handleProjectDelete(p)}
                aria-label="Delete"
                className="fab"
              >
                <DeleteIcon />
              </Fab>
              <div key={`likesLength${i}`}>{p.likes.length} Likes</div>
              <div key={`commentsLength${i}`}>{p.comments.length} Comments</div>
              <CardActions className={classes.actions} disableActionSpacing>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon
                    onClick={() => this.props.handleLikeButton(p._id)}
                  />
                </IconButton>

                <IconButton
                  className={classnames(classes.expand, {
                    [classes.expandOpen]: this.state.expanded
                  })}
                  onClick={this.handleExpandClick}
                  aria-expanded={this.state.expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
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
                                this.props.handleCommentDelete(p, comment)
                              }
                            >
                              <i
                                style={{ fontSize: "20px" }}
                                className="fas fa-eraser"
                              />
                            </Button>
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
                            }
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
          <img src="./images/loading3.gif" alt="" />
        )}
      </>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfilePage);
