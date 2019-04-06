import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          <i className="material-icons">code</i>devSpot
        </Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="">
              <i className="material-icons">search</i>
            </Link>
          </li>
          <li>
            <Link to={`/${props.user.user_name}`}>
              <i className="material-icons">view_module</i>
            </Link>
          </li>
          <li>
            <Link to="/create-post">
              <i className="material-icons">file_upload</i>
            </Link>
          </li>
          <li>
            <Link to="" onClick={props.handleLogout}>
              <i className="material-icons">keyboard_backspace</i>
            </Link>
          </li>
        </ul>
      </div>
      {/* <p>Hello {props.user.first_name}</p> */}
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
