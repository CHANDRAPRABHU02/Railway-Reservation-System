import React, { Component } from "react";
import ReactDom from "react-dom";
import { fuzzySearch } from "react-select-search";
import SelectSearch from "react-select-search";
import "./reservationDropdownStyle.css";
import stations from "./stations.json";
import DatePicker from "react-datepicker";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import axios from "axios";
const trainImg = require("./pictures/train1.jpg");

class Reservation extends Component {
  state = {
    fromStationId: "",
    currentState: 1,
    toStationId: "",
    startDate: new Date(),
  };
  selectFromStation = () => {
    const countries = [];
    for (const i in stations) {
      countries.push({
        name: stations[i]["stationName"] + " - " + stations[i]["code"],
        value: i,
      });
    }
    return (
      <SelectSearch
        options={countries}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Not found"
        onChange={this.selectFromStation}
        placeholder="Stations"
      />
    );
  };
  selectToStation = () => {
    const countries = [];
    for (const i in stations) {
      countries.push({
        name: stations[i]["stationName"] + " - " + stations[i]["code"],
        value: i,
      });
    }
    return (
      <SelectSearch
        options={countries}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Not found"
        onChange={this.selectToStation}
        placeholder="Stations"
      />
    );
  };
  handleFromStationChange = (e) => {
    console.log("Fruit Selected!!", e);
    // this.setState({ fruit: e.target.value });
  };
  handleToStationChange = (e) => {
    console.log("Fruit Selected!!", e);
    // this.setState({ fruit: e.target.value });
  };
  onDateChange = (e) => {
    console.log(e);
    if (e < Date.now() - 24 * 3600000) {
      console.log("Date range");
      NotificationManager.warning("Invalid Date");
      return;
    }
    this.setState({ startDate: new Date(e) });
  };
  Example = () => {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.onDateChange}
        dateFormat="d-MMMM-yyyy"
        className=" rounded"
      />
    );
  };
  dynamicStateChange = () => {
    if (this.state.currentState == 1) {
      return this.stage1();
    }
    if (this.state.currentState == 2) {
      return this.stage2();
    }
    if (this.state.currentState == 3) {
      return this.stage3();
    }
    if (this.state.currentState == 4) {
      return this.stage4();
    }
    if (this.state.currentState == 5) {
      return this.stage5();
    }
  };
  stage1 = () => {
    return (
      <div id="reservationMain" className="container-fluid bg-primary">
        <div className="row justify-content-center">
          <div className="col-lg-1 col-sm-3 d-flex justify-content-center">
            <h3>
              <span className="badge bg-info">From</span>
            </h3>
          </div>
          <div className="col-sm-auto d-flex justify-content-center">
            {this.selectFromStation()}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-1 col-sm-3 d-flex justify-content-center">
            <h3>
              <span className="badge bg-info">To</span>
            </h3>
          </div>
          <div className="col-sm-auto d-flex justify-content-center">
            {this.selectToStation()}
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-1 col-sm-3 d-flex justify-content-center">
            <h3>
              <span className="badge bg-info">Date</span>
            </h3>
          </div>
          <div className="col-sm-auto d-flex justify-content-center">
            {this.Example()}
          </div>
        </div>
      </div>
    );
  };
  stage2 = () => {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col bg-primary">hi</div>
          <div className="col bg-primary">hi</div>
          <div className="col bg-primary">hi</div>
        </div>
      </div>
    );
  };
  stage3 = () => {};
  stage4 = () => {};
  stage5 = () => {};

  render() {
    return (
      <div className="container-fluid bg-danger">
        {this.dynamicStateChange()}
        {/* <div className="row ">
          <div className="col-sm  d-flex justify-content-center justify-content-md-end ">
            <span>From</span>
          </div>
          <div className="col-sm d-flex justify-content-center justify-content-md-start ">
            {this.selectFromStation()}
          </div>
        </div> */}
        <NotificationContainer />
      </div>
    );
  }
}

export default Reservation;
