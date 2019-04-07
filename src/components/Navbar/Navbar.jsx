import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          devSpot
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/${props.user.user_name}`}>
                profile
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create-post">
                create dev
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="" onClick={props.handleLogout}>
                sign out
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
// class FloatingMenuItem extends Component {
//   handleClick() {
//     this.props.action();
//   }

//   render() {
//     let buttonStyle = {
//       backgroundImage: `url(${this.props.icon})`
//     };

//     let label;

//     if (this.props.label) {
//       label = <label>{this.props.label}</label>;
//     }

//     return (
//       <div onClick={this.handleClick.bind(this)} className="floating-menu-item">
//         {label}
//         <div className="floating-menu-icon">
//           <i className="material-icons">{this.props.icon}</i>
//         </div>
//       </div>
//     );
//   }
// }

// class Navbar extends Component {
//   constructor() {
//     super();

//     this.state = {
//       toggled: false
//     };
//   }

//   toggleMenu() {
//     this.setState({ toggled: !this.state.toggled });
//   }

//   render() {
//     let buttons = [];
//     let className = "floating-menu";
//     let icon = "add";

//     if (this.state.toggled) {
//       className += " open";
//       icon = "clear";
//       buttons.push(
//         <FloatingMenuItem label="Item 1" onClick={this.props.handleLogout} icon="create" action="" key="i1" ></FloatingMenuItem>
//       );
//       buttons.push(
//         <FloatingMenuItem label="Item 2" icon="drafts" action="" key="i2" />
//       );
//       buttons.push(
//         <FloatingMenuItem label="Item 3" icon="drafts" action="" key="i3" />
//       );
//     }

//     buttons.push(
//       <FloatingMenuItem
//         label=""
//         icon={icon}
//         action={this.toggleMenu.bind(this)}
//         key="m"
//       />
//     );

//     return (
//       <div className="container">
//         <div className={className}>{buttons}</div>
//       </div>
//     );
//   }
// }

export default Navbar;
