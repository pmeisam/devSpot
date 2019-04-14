import React, { Component } from "react";
import NewsFeed from "../../components/NewsFeed/NewsFeed";
import SideNav from "../../components/SideNav/SideNav";
import "./HomePage.css";

class HomePage extends Component {
  render() {
    return (
      <main>
        <SideNav className="sideNav" />
        <NewsFeed
          className='newsFeed'
          projects={this.props.projects}
          user={this.props.user}
          handleCommentSubmit={this.props.handleCommentSubmit}
          handleLikeButton={this.props.handleLikeButton}
          handleLogout={this.props.handleLogout}
          handleUpdateProjects={this.props.handleUpdateProjects}
          handleCommentDelete={this.props.handleCommentDelete}
        />
      </main>
    );
  }
}

export default HomePage;
