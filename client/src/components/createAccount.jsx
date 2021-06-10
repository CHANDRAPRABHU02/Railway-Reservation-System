import React, { Component } from "react";
import axios from "axios";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

class CreateAccount extends Component {
  state = {};

  onSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
    };
    if (data.name.length === 0) {
      NotificationManager.warning("Name cannot be empty");
      return;
    }
    if (data.email.length === 0) {
      NotificationManager.warning("Email id cannot be empty");
      return;
    }
    if (data.password.length === 0) {
      NotificationManager.warning("Password cannot be empty");
      return;
    }
    if (data.password.length < 5) {
      NotificationManager.warning("Password should be minimum of 5 characters");
      return;
    }
    console.log(data);
    axios.post("http://localhost:5000/user/add", data).then((e) => {
      console.log(e.data);
      if (e.data.length === 24) {
        NotificationManager.success("Account created successfully");
        localStorage.setItem("name", data.name);
        localStorage.setItem("email", data.email);
        localStorage.setItem("id", e.data);
        this.props.history.replace("/");
      } else if (e.data === "Error") {
        NotificationManager.error("Error");
      }
    });
  };
  render() {
    return (
      <div className="text-center customstyle-navbar">
        <main className="form-signin">
          <form onSubmit={this.onSubmit}>
            <img
              className="mb-4"
              src="/docs/5.0/assets/brand/bootstrap-logo.svg"
              alt=""
              style={{ width: "72", height: "57" }}
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="name"
              />
              <label for="floatingInput">Name</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                name="email"
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                // id="floatingPassword"
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
            <button className="btn btn-lg btn-primary" type="submit">
              Create Account
            </button>
            <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
          </form>
        </main>
        <NotificationContainer />
      </div>
    );
  }
}

export default CreateAccount;
