import React, { Component } from "react";
import axios from "axios";

import NotificationManager from "react-notifications/lib/NotificationManager";
const URL = "http://localhost:5000/";

class Profile extends Component {
  state = {};
  logout = () => {
    localStorage.clear();
    NotificationManager.info("Logged out Successfully");
    this.props.history.replace("/");
    window.location.reload(false);
  };
  refresh = () => {
    axios
      .post(URL + "user/getFullDetails", { _id: localStorage.getItem("id") })
      .then((e) => {
        console.log(e);
        localStorage.setItem("balance", e.data.balance);
        window.location.reload(false);
      });
  };
  handleRecent = () => {
    this.props.history.replace("/recent");
  };
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div className="col col-md-3">
            <button onClick={this.refresh} className="btn bg-danger">
              Refresh
            </button>
          </div>
          <div className="col col-md-3">
            <button onClick={this.logout} className="btn bg-danger">
              Logout
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-3">
            <h2>Name</h2>
          </div>
          <div className="col">
            <h2>{localStorage.getItem("name")}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-3">
            <h2>Email Id</h2>
          </div>
          <div className="col">
            <h2>{localStorage.getItem("email")}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col col-md-3">
            <h2>Balance</h2>
          </div>
          <div className="col">
            <h2>{localStorage.getItem("balance")}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button onClick={this.handleRecent} className="btn bg-info">
              Recent Transcation
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
