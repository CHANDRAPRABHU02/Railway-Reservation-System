import React, { Component } from "react";

class Counter extends Component {
  // state = {
  //   count: this.props.value,
  // };

  render() {
    return (
      <React.Fragment>
        <div>
          <div style={this.counterStyles()} className={this.getColorForCount()}>
            {this.formatCount()}
          </div>
          <button
            onClick={this.decrementCounter}
            className="btn btn-danger m-2"
          >
            <h1>-</h1>
          </button>
          <span
            style={{
              display: "inline-block",
              width: 120,
              textAlign: "center",
              textShadow: true,
              fontWeight: "bold",
              fontSize: 20,
              backgroundColor: "lightblue",
              padding: 10,
              paddingTop: 20,
              paddingBottom: 20,
              position: "relative",
            }}
          >
            {this.props.name}
            {this.EditAndDisplayRate()}
          </span>
          <button
            onClick={this.incrementCounter}
            className="btn ben-danger m-2"
          >
            <h1>+</h1>
          </button>
          {/* {this.displayMenuItems()} */}
          <button
            onClick={() => this.props.onDelete(this.props.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }

  incrementCounter = () => {
    this.props.increaseProp(this.props.id);
    // this.setState({ count: this.state.count + 1 });
    // console.log("clicked!!", this.state.count);
  };
  decrementCounter = () => {
    this.props.decreaseProp(this.props.id);
    // if (this.state.count != 0) this.setState({ count: this.state.count - 1 });
    // console.log("clicked!!", this.state.count);
  };
  counterStyles = () => {
    return {
      width: 80,
      // {this.state.count===0 ?:'width:80'},
      borderRadius: 50,
      paddingTop: 8,
    };
  };

  EditAndDisplayRate() {
    if (this.props.isRateEdit)
      return (
        <form
          onSubmit={(event) =>
            this.props.changeRate(event.target[0].value, this.props.id)
          }
          style={{
            fontSize: 10,
            borderRadius: "50%",
            display: "inline-block",
            position: "absolute",
            top: 1,
            right: 1,
          }}
        >
          <input
            placeholder="Rate"
            style={{
              width: 70,
            }}
            type="number"
          />
          <button type="submit">Submit</button>
        </form>
      );
    else
      return (
        <button
          class="btn btn-sm btn-primary"
          onClick={() => this.props.toggleRate(this.props.id)}
          style={{
            fontSize: 10,
            borderRadius: "50%",
            display: "inline-block",
            position: "absolute",
            top: 1,
            right: 1,
          }}
        >
          ₹{this.props.rate}
        </button>
      );
  }

  getColorForCount() {
    let classNameForCount = "badge m-2 bg-";
    classNameForCount += this.props.value === 0 ? "warning" : "primary";
    return classNameForCount;
  }

  formatCount() {
    const { value } = this.props;
    console.log("called");
    return value === 0 ? <h2>Zero</h2> : <h2>{value}</h2>;
  }
}

export default Counter;
