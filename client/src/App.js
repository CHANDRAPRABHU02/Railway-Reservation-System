import React, { Component } from "react";
import { Button, Nav, Form, FormControl, Container } from "react-bootstrap";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";

import Homepage from "./components/homePage";
import Navbar from "./components/navbar";
import LoginPage from "./components/loginPage";
import CreateAccount from "./components/createAccount";
import Reservation from "./components/reservation";
import Profile from "./components/profile";
import Recent from "./components/recent";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
        </div>
        <div className="container-fluid ">
          <br />
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/createAccount" exact component={CreateAccount} />
          <Route path="/reserve" exact component={Reservation} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/recent" exact component={Recent} />
          <NotificationContainer />
        </div>
      </Router>
    );
  }
}

export default App;
