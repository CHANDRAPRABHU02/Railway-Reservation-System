import React, { Component } from "react";
import { fuzzySearch } from "react-select-search";
import SelectSearch from "react-select-search";
import "./reservationDropdownStyle.css";
import stations from "./stations.json";

class Reservation extends Component {
  state = {
    fromStationId: "",
    toStationId: "",
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
        onChange={this.handleChange}
        placeholder="Select your depature"
      />
    );
  };
  handleChange = (e) => {
    console.log("Fruit Selected!!", e);
    // this.setState({ fruit: e.target.value });
  };
  render() {
    return (
      <div className="container bg-dander">
        <div className="row justify-content-end">
          <div className="col-md bg-primary">{this.selectFromStation()}</div>
          <div className="col-md bg-primary">{this.selectFromStation()}</div>
        </div>
        <div className="row">
          <div className="col-sm bg-primary justify-content-end">
            {this.selectFromStation()}
          </div>
          <div className="col-sm bg-primary justify-content-end">
            {this.selectFromStation()}
          </div>
        </div>
      </div>
    );
  }
}

export default Reservation;
