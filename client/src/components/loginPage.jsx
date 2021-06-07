import React, { Component } from "react";
import axios from "axios";

import "./navbarStyle.css";

class LoginPage extends Component {
  state = {};
  onSubmit(e) {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
  }
  render() {
    return (
      <div className="text-center customstyle-navbar">
        <main className="form-signin">
          <form
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
            method="POST"
          >
            <img
              className="mb-4"
              src="/docs/5.0/assets/brand/bootstrap-logo.svg"
              alt=""
              style={{
                width: "72",
                height: "57",
              }}
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
              />
              <label for="floatingPassword">Password</label>
            </div>

            <div className="checkbox mb-3">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
          </form>
        </main>
      </div>
    );
  }
}

export default LoginPage;
