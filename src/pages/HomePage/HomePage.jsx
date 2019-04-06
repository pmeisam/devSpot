import React, { Component } from "react";
import styles from './HomePage.module.css'
import postService from '../../utils/postService';
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
          this.props.projects.map((p,i) => (
            <div key={`p${i}`} className="card-panel blue-grey darken-1 white-text">
              <div key={p.user}>{p.user.user_name}</div>
              <iframe title={`title${i}`} className={styles.frame} key={p.url} src={p.url} />
              {/* <Link target="_blank" to={`${p.url}`}>direct to site</Link> */}
              <div key={p.caption}>{p.caption}</div>
              <div key={`{comments${i}`}>{p.comments}</div>
              <div key={`likes${i}`}>{p.likes}</div>
              <button key={`p.btn${i}`} className="btn">Like</button>
              <input key={`commentInput${i}`} type="text" placeholder="comments..."/>
              <input key={`submit${i}`} className="btn" type="submit"/>
            </div>
          ))
        ) : (
          <img src="./images/loading3.gif" alt=""/>
        )}
      </>
    );
  }
}

export default HomePage;
