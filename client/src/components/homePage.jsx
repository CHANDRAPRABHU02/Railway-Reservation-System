import React, { Component } from "react";

class Homepage extends Component {
  state = {};
  render() {
    return (
      <div>
        <div id="outerbox">
          <div id="innerbox">
            <div id="header">
              <h1> RAILWAY RESERVATION SYSTEM </h1>
            </div>
            <div class="topnav">
              <a class="active" href="#home">
                Home
              </a>
              <a href="#signup">Sign Up</a>
              <a href="#login">Login</a>
              <a href="#contact">Contact</a>
              <a href="#about">About</a>
            </div>

            <div id="content"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
