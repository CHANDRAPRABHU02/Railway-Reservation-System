import React, { Component } from "react";
import {
  Button,
  Nav,
  Form,
  FormControl,
  Navbar,
  Container,
} from "react-bootstrap";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {};
  render() {
    return <h1>Home Page</h1>;
    // return <Router> //   <Route path = "/" component = {} // </Router>
  }
}

export default App;
