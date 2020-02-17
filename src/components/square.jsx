import React, { Component } from "react";

class square extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.squareInfo
    };
  }
  render() {
    return (
      <button
        className="btn btn-primary square"
        onClick={() => {
          this.props.handleClick(this.props.location, this.props.square);
        }}
      >
        {this.props.square}
      </button>
    );
  }
}

export default square;
