import React, { Component } from "react";

class chatBox extends Component {
  state = {};
  render() {
    return (
      <ul className="chat">
        {this.props.messages.map(message => (
          <li>{message}</li>
        ))}
      </ul>
    );
  }
}

export default chatBox;
