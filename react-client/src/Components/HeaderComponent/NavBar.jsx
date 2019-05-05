import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/books">
              Books
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
export default NavBar;
