import React, { Component } from "react";
import { Link } from "react-router-dom";

class BaseView extends Component {
  render() {
    return (
      <>
        <div className="card-panel blue-grey darken-1 white-text">
          <h3 className="card-title">devSpot</h3>
          <Link to="/signup">sign up</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/login">log in</Link>&nbsp;&nbsp;&nbsp;
          <img src="./images/homepage.png" alt="" />
          <div className="card-action">
        </div>
        </div>
        
      </>
    );
  }
}

export default BaseView;
