import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <Link to="/" className="navbar-brand">
          Railway Reservation System
        </Link>
        <div
          id="myNavbar"
          className="collpase navbar-collapse"
          // style={{ float: "right" }}
        >
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/reserve" className="nav-link">
                Reserve
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/createAccount" className="nav-link">
                createAccount
              </Link>
            </li>
          </ul>
        </div>
        <span className="nav-text padding-0">
          <Link to="/profile" className="nav-link padding-0">
            {localStorage.getItem("name")}
          </Link>
        </span>
        <button
          type="button"
          class="navbar-toggler"
          data-toggle="collapse"
          data-target="#myNavbar"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </nav>
    );
  }
}
