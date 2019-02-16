import React, {Component} from 'react';

class Message extends Component {
  render() {
    const color = this.props.color;
    return (
      <div>
        <div className="message">
          <span className="message-username" style={{color: color}} >{this.props.currentUser}</span>
          <span className="message-content">{this.props.messages}</span>
          {picture}
        </div>
      </div>

    );
  }
}
export default Message;
