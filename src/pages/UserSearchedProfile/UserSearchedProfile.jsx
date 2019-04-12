import React, { Component } from "react";
import userService from "../../utils/userService";
import { Route } from "react-router-dom";
// import postService from "../../utils/postService";
import EditProject from "../../components/EditProject/EditProject";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import PropTypes from "prop-types";
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
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MailIcon from "@material-ui/icons/Mail";
import socket from '../../socket';

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
class UserSearchedProfile extends Component {
  state = {
    queryData: null
  };

  async componentDidMount() {
    const users = await this.props.users;
    const queryData = users.filter(u => {
      return u.user_name === this.props.match.params.username;
    });
    this.setState({ queryData });
    console.log(this.state.queryData);
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{ paddingTop: "100px" }}>
        {this.state.queryData ? (
          <>
            <Card>
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
                    to={`/chat/${this.state.queryData[0].user_name}/${
                      userService.getUser().user_name
                    }}`}
                    onClick={() => {socket.createChat([this.state.queryData[0]._id, userService.getUser()._id])}}
                  >
                    <IconButton>
                      <MailIcon />
                    </IconButton>
                  </Link>
                }
              />
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
                    subheader={p.createdAt}
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
                      {p.likes.includes(userService.getUser().email) ? (
                        <FavoriteIcon
                          color="secondary"
                          onClick={() =>
                            this.props.handleLikeBtnOnProfile(p._id)
                          }
                        />
                      ) : (
                        <FavoriteIcon
                          onClick={() =>
                            this.props.handleLikeBtnOnProfile(p._id)
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
                      <ExpandMoreIcon />
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
