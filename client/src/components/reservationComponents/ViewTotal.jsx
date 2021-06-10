import React, { Component } from "react";

class ViewTotal extends Component {
  state = {};
  render() {
    return (
      <div>
        <h3 style={{ paddingLeft: "15%" }}>No:1 XYZ road , chennai.</h3>
        <h6 style={{ paddingLeft: "22%" }}>
          <b>contact no.</b> 1234567890.
        </h6>
        <ol>{this.listItems()}</ol>
      </div>
    );
  }
  listItems = () => {
    const ans = this.props.counters
      .filter((itr) => itr.value)
      .map((itr) => <li>{itr.name}</li>);
    // console.log(this.props.counters);
    // return "hi";
    return ans;
  };
}

export default ViewTotal;
