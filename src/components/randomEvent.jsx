import React, { Component } from "react";

class randomEvent extends Component {
  state = {};
  render() {
    const event = this.props.randomEvent.getRandomEvent();
    return (
      <div>
        <div className="random-event-description">{event.description}</div>
        {event.options.map((option, index) => (
          <div
            key={index}
            className="event-option"
            onClick={() =>
              this.props.onEventClick(event.effects[index], event.category)
            }
          >
            {index}
            {". "} {option}
          </div>
        ))}
      </div>
    );
  }
}

export default randomEvent;
