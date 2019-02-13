import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?",
            id: 'a'
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
            id: 'b'
          }
        ]
      };
      this.addNewMessage = this.addNewMessage.bind(this);
  }

  addNewMessage(message) {
    this.setState({messages: [...this.state.messages, message]});
    
  }
  //deinfed function that set it to children this.props.
  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");

    }, 3000);
  }

  render() {
      const currentUser = this.state.currentUser.name;
      let messages = this.state.messages;
      return (
        <div>
          <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
          <MessageList messages={messages}/>
          <ChatBar currentUser={currentUser} addNewMessage={this.addNewMessage}/>
        </div>
    );
  }
}
export default App;
