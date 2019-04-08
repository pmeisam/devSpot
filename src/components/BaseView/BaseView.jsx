import React, { Component } from "react";
import { Link } from "react-router-dom";

class BaseView extends Component {
  render() {
    return (
      <>
        <div className="container">
          <h1>devSpot</h1>
          <div className="btn-group" > 
            <Link className="btn btn-outline-primary" to="/signup">sign up</Link>
            <Link to="/login" className="btn btn-outline-info">log in</Link>
          </div>
         &nbsp;&nbsp;&nbsp;
          <img src="./images/homepage.png" alt="" />
        </div> 
      </>
    );
  }
}

export default BaseView;
