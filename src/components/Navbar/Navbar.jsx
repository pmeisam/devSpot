import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <>
        <nav className="nav-extended #37474f blue-grey darken-3">
          <div className="nav-wrapper">
            <Link to="" className="brand-logo">
              devSpot
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link>about</Link>
              </li>
              <li>
                <Link>sign in</Link>
              </li>
              <li>
                <Link to='/signup'>sign up</Link>
              </li>
            </ul>
          </div>
          <div className="nav-content">
            <span className="nav-title"></span>
            <Link className="btn-floating btn-large halfway-fab waves-effect waves-light teal #e65100 orange darken-4">
              <i className="material-icons">add</i>
            </Link>
          </div>
        </nav>
        <div>HomePage</div>
      </>
    );
  }
}

export default Navbar;
