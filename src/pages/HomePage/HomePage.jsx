import React, { Component } from "react";
import styles from "./HomePage.module.css";
import {Link} from 'react-router-dom';
import postService from "../../utils/postService";
import userService from "../../utils/userService";

class HomePage extends Component {
  state = {
    comment: '',
    user: userService.getUser()
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleCommentSubmit = (e) => {
    e.preventDefault();
    const user = userService.getUser();
    let projectsCopy = [...this.props.projects];
    let projectCopy = { ...projectsCopy[e.target.id] };
    projectCopy.comments.push({ "comment": this.state.comment, 'user': user.user_name });
    postService.addComment({
      'comment': this.state.comment, 
      'user': user.user_name, 
      'userInfo': user, 
      'projectInfo': projectCopy
    });
    this.props.handleCommentSubmit(projectsCopy);
  }
  async componentDidMount() {
    const projects = await postService.index();
    this.props.handleUpdateProjects(projects);
  }
  render() {
    return (
      <>
        {this.props.projects ? (
          this.props.projects.map((p, i) => (
            <div
              key={`p${i}`}
              className="container card"
              style={{ width: "50rem" }}
            >
              <div className="row">
                <div className="col-md-6" />
                <p key={`user${i}`}>
                  {p.user[0].first_name} {p.user[0].last_name}
                </p>
                <iframe
                  title={`title${i}`}
                  className={styles.frame}
                  key={p.url}
                  src={p.url}
                />

                <div className="col-md-6 offset-md-4">
                  {/* <Link target="_blank" to={`${p.url}`}>direct to site</Link> */}
                  <div key={p.caption}>
                    <span>{p.user[0].user_name}:&nbsp;</span>
                    {p.caption}
                  </div>
                  <div key={`{comments${i}`}>
                    {p.comments ? (
                      p.comments.map((comment, idx) => (
                        <div key={`comment${i}in${idx}`}>
                          <button className="btn btn-danger btn-sm"
                                  onClick={() => this.props.handleCommentDelete(p, comment)} 
                                  type="submit" >X</button>&nbsp;
                          <span>{comment.user}:&nbsp;</span>
                          <span>{comment.comment}</span>
                        </div>
                      ))
                    ) : (
                      <h5>There aren't any comments yet</h5>
                    )}
                  </div>
                  <div key={`likes${i}`}>{p.likes.length} likes</div>
                  <button
                    key={`p.btn${i}`}
                    type="submit"
                    className="btn btn-danger"
                    onClick={() => this.props.handleLikeButton(p._id)}
                  >
                    Like
                  </button>
                  <form>
                  
                  <input
                    className="form-control"
                    placeholder="comments..."
                    type="text"
                    name="comment"
                    id={`comment${i}`}
                    value={this.state.comment}
                    onChange={this.handleChange}
                    key={`commentInput${i}`}
                  />
                  <button
                    key={`submit${i}`}
                    className="btn btn-primary"
                    // onClick={() =>
                    //   this.props.handleCommentSubmit(i)
                    // }
                    onClick={this.handleCommentSubmit}
                    id={i}
                    type="submit"
                  >
                    submit
                  </button>
                  </form>
                </div>
              </div>
            </div>
          ))
        ) : (
          <img src="./images/loading3.gif" alt="" />
        )}
      </>
    );
  }
}

export default HomePage;
