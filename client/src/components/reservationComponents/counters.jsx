import React, { Component } from "react";
import Counter from "./counter";

class counters extends Component {
  render() {
    return (
      <span>
        <button
          onClick={this.props.resetAll}
          className="btn btn-primary "
          style={{
            backgroundColor: "magenta",
            // margin: 5,
            // marginLeft: "20em",
          }}
        >
          Reset
        </button>
        {this.props.counters.map((itr) => (
          <Counter
            key={itr.id}
            id={itr.id}
            value={itr.value}
            name={itr.name}
            selected={true}
            onDelete={this.props.deleteItem}
            increaseProp={this.props.increaseValue}
            decreaseProp={this.props.decreaseValue}
            rate={itr.rate}
            changeRate={this.props.changeRate}
            isRateEdit={itr.isRateEdit}
            toggleRate={this.props.toggleRate}
          />
        ))}
      </span>
    );
  }
}

export default counters;
