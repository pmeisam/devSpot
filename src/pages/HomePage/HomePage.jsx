import React, { Component } from "react";
import styles from "./HomePage.module.css";
import postService from "../../utils/postService";
// import {Link} from 'react-router-dom';
// import Home from '../../components/Home/Home';

class HomePage extends Component {
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
                  <div key={p.caption}>{p.caption}</div>
                  <div key={`{comments${i}`}>{p.comments}</div>
                  <div key={`likes${i}`}>{p.likes.length} likes</div>
                  <button
                    onClick={() => this.props.handleLikeButton(p._id)}
                    key={`p.btn${i}`}
                    className="btn btn-danger"
                  >
                    Like
                  </button>
                  <form>
                    <input
                      className="form-control"
                      key={`commentInput${i}`}
                      type="text"
                      placeholder="comments..."
                    />
                    <input
                      key={`submit${i}`}
                      className="btn btn-primary"
                      type="submit"
                    />
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
