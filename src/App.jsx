import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001/");
    //window.mysocket = this.socket;
    this.state = {
      currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          // {
          //   username: "Bob",
          //   content: "Has anyone seen my marbles?",
          //   id: 'a'
          // },
          // {
          //   username: "Anonymous",
          //   content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          //   id: 'b'
          // }
        ]
      };
      this.addNewMessage = this.addNewMessage.bind(this);
      this.onNewMessage = this.onNewMessage.bind(this);
  }


  addNewMessage(username, content) {
    if (username && content) {
      const message = {username: username, content: content, id: Date.now()};
      //this.setState({messages: [...this.state.messages, message]});
    }
  }

  onNewMessage(username, content) {
    if (username && content) {
      console.log(username, content);
      const newMessage = {username: username, content: content};
      let newMsg = JSON.stringify(newMessage);
      this.socket.send(newMsg);
    }
  }

  //deinfed function that set it to children this.props.
  componentDidMount() {
    console.log("componentDidMount <App />");
    
    
    this.socket.onopen = () => {
      console.log('connected to server');
      
    }

    this.socket.onmessage = (message) => {
      console.log("message", message);
      //console.log(message.data);
      const newData = JSON.parse(message.data);
      //console.log(newData);
      this.setState({messages: [...this.state.messages, newData]})
    }
    
    
    // setTimeout(() => {
    //   console.log("Simulating incoming message");

    // }, 3000);
  }



  render() {
      const currentUser = this.state.currentUser.name;
      let messages = this.state.messages;
      //console.log(messages);
      
      return (
        <div>
          <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
          <MessageList messages={messages}/>
          <ChatBar currentUser={currentUser} addNewMessage={this.addNewMessage} onNewMessage={this.onNewMessage} />
        </div>
    );
  }
}
export default App;
