import React, { Component } from "react";
import axios from "axios";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

import "./navbarStyle.css";

class LoginPage extends Component {
  state = {
    URL: "http://localhost:5000",
  };
  onSubmit = (e) => {
    e.preventDefault();
    // console.log(e.target[0].value);
    // console.log(e.target[1].value);
    const data = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    console.log(data);
    axios.post(this.state.URL + "/user/validate", data).then((e) => {
      console.log(e.data);
      if (e.data === "notValid") {
        NotificationManager.error(
          "If you forgot your password use 'forgot password'",
          "Invalid Login"
        );
      } else if (e.data.length === 24) {
        //Success
        NotificationManager.success("Login Successful");
        console.log("Fetch");
        axios
          .post(this.state.URL + "/user/getFullDetails", { _id: e.data })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", res.data.email);
            localStorage.setItem("id", e.data);
            localStorage.setItem("balance", res.data.balance);
            this.props.history.replace("/");
            window.location.reload(false);
          });
      } else {
        NotificationManager.warning("Error");
      }
    });
  };
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
                autoComplete="email"
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
                autoComplete="password"
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
            <a
              href=""
              onClick={(e) => this.props.history.replace("/createAccount")}
            >
              Create Account
            </a>
            <p className="mt-5 mb-3 text-muted">&copy; RRS:2017–2021</p>
          </form>
        </main>
        <NotificationContainer />
      </div>
    );
  }
}

export default LoginPage;
