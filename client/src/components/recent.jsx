import React, { Component } from "react";
import axios from "axios";

const URL = "http://localhost:5000/";

class Recent extends Component {
  state = { data: null };
  getRecents = () => {
    console.log(this.state.data);
    if (this.state.data == null)
      axios
        .post(URL + "user/recent", { uid: localStorage.getItem("id") })
        .then((data) => {
          console.log(data);
          this.setState({ data: data.data });
        });
    else {
      return this.state.data.map((element) => {
        console.log(element);
        return (
          <div className="row">
            <div className="col">{element.trainNo}</div>
            <div className="col">{element.from}</div>
            <div className="col">{element.to}</div>
            <div className="col">{element.passangersDetail.length}</div>
            <div className="col">
              {new Date(element.validTill).toLocaleDateString()}{" "}
              {new Date(element.validTill).toLocaleTimeString()}
            </div>
          </div>
        );
      });
    }
  };
  render() {
    return <div className="container">{this.getRecents()}</div>;
  }
}

export default Recent;
