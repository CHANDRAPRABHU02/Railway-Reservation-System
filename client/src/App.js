import React, { Component } from "react";
import { Button, Nav, Form, FormControl, Container } from "react-bootstrap";

import { BrowserRouter as Router, Route } from "react-router-dom";

import Homepage from "./components/homePage";
import Navbar from "./components/navbar";
import LoginPage from "./components/loginPage";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={Homepage} />
          <Route path="/login" exact component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
