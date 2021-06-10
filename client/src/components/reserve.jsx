import React, { Component } from "react";
import Counters from "./reservationComponents/counters";
// import "./reservation/App.css";
import InputForm from "./reservationComponents/input";
import ViewTotal from "./reservationComponents/ViewTotal";

import Counter from "./reservationComponents/counter";
import { render } from "@testing-library/react";

class Reserve extends Component {
  state = {
    counters: [
      { id: 1, value: 1, name: "Milk", rate: 25, isRateEdit: false },
      { id: 2, value: 0, name: "GoodDay", rate: 20, isRateEdit: false },
      { id: 3, value: 2, name: "Bread", rate: 10, isRateEdit: false },
      { id: 4, value: 0, name: "Fruits", rate: 140, isRateEdit: false },
      { id: 5, value: 0, name: "Vegetables", rate: 75, isRateEdit: false },
    ],
    newId: 6,
    items: ["apple", "banana", "grape"],
    discountRate: 0,
    finalTotal: 0,
  };
  resetAll = () => {
    const counters = [...this.state.counters];
    counters.map((itr) => {
      itr.value = 0;
    });
    this.setState(counters);
    // console.log(counters);
  };

  changeTotal = () => {
    var newTotal = 0;
    this.state.counters
      .filter((itr) => itr.value)
      .map((itr) => {
        newTotal +=
          ((100 - this.state.discountRate) * itr.rate * itr.value) / 100;
      });
    // console.log(newTotal);
    return newTotal.toFixed(2);
  };

  appendItem = (itemName, itemRate) => {
    // console.log(itemName);
    let counters = [
      ...this.state.counters,
      {
        id: this.state.newId++,
        value: 0,
        name: itemName,
        rate: itemRate,
        isRateEdit: false,
      },
    ];
    this.setState({ counters });
    // console.log(counters);
  };
  changeRate = (newRate, gnId) => {
    if (!newRate || newRate < 1) {
      alert("Invalid Rate !!!");
      return;
    }
    // console.log(newRate, gnId);
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId) itr.rate = newRate;
    });
    this.setState(counters);
    this.toggleRate(gnId);
  };

  toggleRate = (gnId) => {
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId) itr.isRateEdit = !itr.isRateEdit;
    });
    this.setState(counters);
  };

  increaseValue = (gnId) => {
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId) itr.value++;
    });
    this.setState(counters);
  };

  decreaseValue = (gnId) => {
    let counters = [...this.state.counters];
    counters.map((itr) => {
      if (itr.id === gnId && itr.value > 0) itr.value--;
    });
    this.setState(counters);
  };

  deleteItem = (deleteId) => {
    const newCounter = this.state.counters.filter((itr) => itr.id !== deleteId);
    this.setState({ counters: newCounter });
    // console.log();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="bg-primary col-6"
            style={{
              boxSizing: "border-box",
              position: "relative",
              top: 20,
              left: -30,
              // position: "absolute",
              // left: 10,
              margin: 0,
              border: 0,
              // position: "relative",
            }}
          >
            <main className="container">
              <InputForm appendItem={this.appendItem} />
              <Counters
                counters={this.state.counters}
                items={this.state.items}
                resetAll={this.resetAll}
                increaseValue={this.increaseValue}
                decreaseValue={this.decreaseValue}
                deleteItem={this.deleteItem}
                changeRate={this.changeRate}
                toggleRate={this.toggleRate}
              />
            </main>
          </div>
          <div className="bg-danger col-6">
            <ViewTotal
              counters={this.state.counters}
              discountRate={this.state.discountRate}
            />
            <span
              style={{
                paddingLeft: 382,
              }}
            >
              <b>
                Total :
                <span
                  style={{
                    display: "inline-block",
                    textAlign: "right",
                    width: 100,
                  }}
                >
                  {this.changeTotal()}
                </span>
              </b>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Reserve;
