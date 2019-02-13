import React, {Component} from 'react';



class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: ''
    }
  }

  render() {

  const onSubmit = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const content = event.target.content.value;
    // const newMessage = {};
    this.props.addNewMessage(username, content);
    this.props.onNewMessage(username, content);
    
  }

    return (
      <div>
        <form onSubmit={onSubmit}>
        <footer className="chatbar">
          <input className="chatbar-username" name="username"  defaultValue={this.props.currentUser}/>
          <input className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" />
          <input className="submit-function" type="submit"/>
      </footer>
      </form>
      </div>
    );
  }
}
export default ChatBar;
