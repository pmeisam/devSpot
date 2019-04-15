import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import userService from "../../utils/userService";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "0 auto"
  }
});

class NotificationPage extends React.Component {
  state = {
    notifications: []
  };
  async componentDidMount() {
    const notifications = await userService.getNotifications();
    this.setState({ notifications });
  }

  render() {
    const { classes } = this.props;
    console.log(this.state.notifications);
    return (
      <div style={{ paddingTop: "100px" }}>
        <List className={classes.root}>
          {this.state.notifications ? (
            this.state.notifications.map(value => (
              <ListItem key={value.notification} role={undefined} dense button>
                <ListItemText primary={`${value.notification}`} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Comments">
                    <Link
                      to={`/profile/${value.user_name}`}
                    >
                      <AccountCircle />
                    </Link>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))
          ) : (
            <ListItem>There are no notifications yet</ListItem>
          )}
        </List>
      </div>
    );
  }
}

NotificationPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotificationPage);
