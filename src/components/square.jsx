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
      <span>
        <button
          className="btn btn-primary square"
          onClick={() => {
            this.props.handleClick(this.props.location, this.props.square);
          }}
        >
          {this.props.square}
        </button>
        {(this.props.location + 1) % 7 === 0 && <br />}
      </span>
    );
  }
}

export default square;
