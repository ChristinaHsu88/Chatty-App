import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {
  render() {
    const messages = this.props.messages;
    const message = messages.map((eachMessage) => 
      <Message currentUser={eachMessage.username} messages={eachMessage.content} key={eachMessage.id}/>
    )
    return (
      <div>
      <main className="messages">
        {message}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
      </div>

    );
  }
}
export default MessageList;
