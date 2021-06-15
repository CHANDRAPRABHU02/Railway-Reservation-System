import React, { Component } from "react";
import ReactDom from "react-dom";
import { fuzzySearch } from "react-select-search";
import SelectSearch from "react-select-search";
import "./reservationDropdownStyle.css";
import stations from "./stations.json";
import DatePicker from "react-datepicker";
import jsPDF from "jspdf";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import axios from "axios";
const trainImg = require("./pictures/train1.jpg");
const URL = "http://localhost:5000/";

class Reservation extends Component {
  state = {
    fromStationId: "",
    currentState: 1,
    toStationId: "",
    trains: [],
    currentTrain: {},
    startDate: new Date(),
    passangers: [],
  };
  handleFromStationChange = (e) => {
    console.log("Fruit Selected!!", e);
    // this.setState({ fruit: e.target.value });
    this.state.toStationId = e;
  };
  handleToStationChange = (e) => {
    console.log("Fruit Selected!!", e);
    // this.setState({ fruit: e.target.value });
    this.state.fromStationId = e;
  };
  selectFromStation = () => {
    const countries = [];
    for (const i in stations) {
      countries.push({
        name: stations[i]["stationName"] + " - " + stations[i]["code"],
        value: stations[i]["stationName"] + " - " + stations[i]["code"],
      });
    }
    return (
      <SelectSearch
        options={countries}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Not found"
        onChange={this.handleFromStationChange}
        placeholder="Stations"
      />
    );
  };
  selectToStation = () => {
    const countries = [];
    for (const i in stations) {
      countries.push({
        name: stations[i]["stationName"] + " - " + stations[i]["code"],
        value: stations[i]["stationName"] + " - " + stations[i]["code"],
      });
    }
    return (
      <SelectSearch
        options={countries}
        search
        filterOptions={fuzzySearch}
        emptyMessage="Not found"
        onChange={this.handleToStationChange}
        placeholder="Stations"
      />
    );
  };
  onDateChange = (e) => {
    console.log(e);
    if (e < Date.now() - 24 * 3600000) {
      console.log("Date range");
      NotificationManager.warning("Invalid Date");
      return;
    }
    this.setState({ startDate: new Date(e), trains: [] });
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
    if (this.state.trains.length === 0) {
      for (let i = 0; i < 15; i++) {
        this.state.trains.push({
          trainno: Math.floor(Math.random() * 100000),
          name: "ABC express",
          arrivalTime: this.getStage2ArrivalTime(),
          departureTime: this.getStage2departureTime(),
        });
      }
      this.state.trains.sort((a, b) => {
        return a.arrivalTime.getTime() - b.arrivalTime.getTime();
      });
      this.setState({ trains: this.state.trains });
    }
    return (
      <div className="container-fluid">
        {this.state.trains.map((i) => {
          return (
            <div onClick={(e) => this.selectTrain(i)} className="row ">
              <div className={"col m-2 rounded " + this.stage2DynamicColor(i)}>
                {i.trainno + " - " + i.name}
              </div>
              <div className={"col m-2 rounded " + this.stage2DynamicColor(i)}>
                {this.displayTime(i.arrivalTime)}
              </div>
              <div className={"col m-2 rounded " + this.stage2DynamicColor(i)}>
                {this.displayTime(i.departureTime)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  displayTime = (curTime) => {
    return curTime.toLocaleDateString() + " " + curTime.toLocaleTimeString();
  };
  getStage2ArrivalTime = () => {
    const fiveRound = 5 * 60 * 1000;
    const curTime = new Date(
      Math.floor(
        (this.state.startDate.getTime() + Math.random() * 20 * 3600000) /
          fiveRound
      ) * fiveRound
    );
    console.log(this.state.startDate);
    return curTime;
  };
  getStage2departureTime = () => {
    return new Date(Date.now());
  };
  selectTrain = (e) => {
    this.setState({ currentTrain: e });
  };
  stage2DynamicColor = (i) => {
    if (i === this.state.currentTrain) return "bg-primary fw-bold";
    return "bg-info";
  };
  stage3 = () => {
    if (this.state.passangers.length === 0) this.addPasangers();
    return (
      <div className="container-fluid">
        <div
          style={{ paddingTop: 10, paddingBottom: 10 }}
          className="row justify-content-end"
        >
          <div className="col-1">
            <button onClick={this.addPasangers} className="btn bg-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
          </div>
          <div className="col-1">
            <button onClick={this.removePassengers} className="btn bg-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-dash"
                viewBox="0 0 16 16"
              >
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </button>
          </div>
        </div>
        <div>{this.getFormatedPassanger()}</div>
      </div>
    );
  };
  getFormatedPassanger = () => {
    return this.state.passangers.map((i) => {
      return (
        <div className="row m-2">
          <div className="col">
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                onChange={(e) => this.handleNameChange(e, i)}
                placeholder="name"
                name="name"
                value={i.name}
              />
              <label for="floatingInput">Name</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                onChange={(e) => this.handleAgeChange(e, i)}
                placeholder="age"
                name="name"
                value={i.age}
              />
              <label for="floatingInput">Age</label>
            </div>
          </div>
          <div className="col">
            <div className="form-floating">
              <input
                type="number"
                className="form-control"
                onChange={(e) => this.handleADNChange(e, i)}
                placeholder="age"
                name="name"
                value={i.adno}
              />
              <label for="floatingInput">Aadhar number</label>
            </div>
          </div>
          <div className="col flex-grow-0">
            <select
              style={{ marginTop: 20 }}
              value={i.gender}
              onChange={(e) => this.handleGenderChange(e, i)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>
      );
    });
  };

  handleADNChange = (e, i) => {
    i.adno = e.target.value;
    this.setState({ passangers: this.state.passangers });
  };
  handleAgeChange = (e, i) => {
    i.age = e.target.value;
    this.setState({ passangers: this.state.passangers });
  };
  handleNameChange = (e, i) => {
    i.name = e.target.value;
    this.setState({ passangers: this.state.passangers });
  };
  handleGenderChange = (e, i) => {
    // console.log(e, i);
    i.gender = e.target.value;
    this.setState({ passangers: this.state.passangers });
  };
  addPasangers = () => {
    this.state.passangers.push({
      name: "",
      gender: "Male",
      age: null,
      adno: null,
    });
    this.setState({ passangers: this.state.passangers });
  };
  removePassengers = () => {
    if (this.state.passangers.length === 1) {
      NotificationManager.warning("can't delete");
    } else {
      this.state.passangers.pop();
      this.setState({ passangers: this.state.passangers });
    }
  };
  stage4 = () => {
    var amt = this.state.passangers.length * 100;
    console.log(amt);
    if (amt > localStorage.getItem("balance")) {
      console.log(amt);
      NotificationManager.info(
        "Recharge you wallet in your profile section",
        "Insufficient ammount"
      );
      console.log(amt);
      return "Invalid";
    }
    return (
      <button onClick={this.pay} className="btn btn-primary">
        Pay
      </button>
    );
  };
  pay = () => {
    const data = { ...this.state };
    delete data["trains"];
    delete data["currentState"];
    data["uid"] = localStorage.getItem("id");
    data["amt"] = this.state.passangers.length * 100;
    console.log(data);
    axios.post(URL + "user/book", data).then((res) => {
      console.log(res);
      if (res.data == "debited") {
        this.setState({ currentState: this.state.currentState + 1 });
      } else {
        NotificationManager.warning("Error");
      }
    });
  };
  stage5 = () => {
    const tkbody = "\
     <div> <h1>hi</h1> <h3>hello</h3> </div> \
     ";
    return (
      <div>{}</div>
      // <button onClick={this.generatePdf}>
      //   <h1>Download</h1>
      // </button>
    );
  };
  generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4");
    const tkbody = `
     <div> <h1>hi</h1> <h3>hello</h3> </div> 
     `;
    doc.html(tkbody, {
      callback: function (doc) {
        doc.save("tk.pdf");
      },
      x: 0,
      y: 0,
    });
  };

  incrementState = () => {
    this.setState({ currentState: this.state.currentState + 1 });
  };

  decrementState = () => {
    this.setState({ currentState: this.state.currentState - 1 });
  };

  render() {
    return (
      <div style={{ minHeight: "85vh" }} className="container-fluid bg-danger">
        {this.dynamicStateChange()}
        {/* {this.stage4()} */}
        {/* <div className="row ">
          <div className="col-sm  d-flex justify-content-center justify-content-md-end ">
            <span>From</span>
          </div>
          <div className="col-sm d-flex justify-content-center justify-content-md-start ">
            {this.selectFromStation()}
          </div>
        </div> */}
        <div className>
          <button onClick={this.decrementState}>Back</button>
          <button onClick={this.incrementState}>Next</button>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default Reservation;
