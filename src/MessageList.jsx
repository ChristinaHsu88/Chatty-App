import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const color = this.props.color;
    const message = messages.map((eachMessage) => 
      <Message currentUser={eachMessage.username} messages={eachMessage.content} key={eachMessage.id} color={color}/>
    )
    return (
      <div>
      <main className="messages">
        {message}
        <div className="message system">
        
        </div>
      </main>
      </div>

    );
  }
}
export default MessageList;
