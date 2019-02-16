import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket("ws://localhost:3001/");
    this.state = {
      currentUser: {name: "Anonymous"}, 
      textcolor: {}, 
      messages: [
        
        ]
      };
      this.onNewMessage = this.onNewMessage.bind(this);
      this.changeDefaultUser = this.changeDefaultUser.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
  }

 

  changeDefaultUser(username) {
    if (username !== this.state.currentUser.name) {
      const notification = {type: "postNotification", content: this.state.currentUser.name + " has changed their name to " + username}
      let newNotify = JSON.stringify(notification);
      this.socket.send(newNotify);
      this.setState({currentUser: {name: username}});
    }
  }


  //adding type to the message
  onNewMessage(username, content) {
    if (username && content) { 
      const newMessage = {username: username, content: content, type: "postMessage"};
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
      let userOnline = JSON.parse(message.data);

      if (userOnline.type === "onlineNums") {
        this.setState({currentUserNum: userOnline.num});
        this.setState({textcolor: userOnline.color});
      }
      
      if (userOnline.type === "incomingMessage") {
        console.log('this is the incoming Message', userOnline);
        this.setState({messages: [...this.state.messages, userOnline]});
      }

      if (userOnline.type === "incomingNotification") {
        this.setState({messages: [...this.state.messages, userOnline]})
      }

      if (userOnline.type === "closing windows") {
        this.setState({currentUserNum: userOnline.num });
      }
    }
  }

  render() {
      const currentUser = this.state.currentUser.name;
      let messages = this.state.messages;
      let user = this.state.currentUser.name;
      let number = this.state.currentUserNum;
      let color = this.state.textcolor;


      return (
        <div>
          <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="userCount">{number} user(s) online</span>
          </nav>
          <MessageList messages={messages} user={user} color={color}/>
          <ChatBar currentUser={currentUser}  onNewMessage={this.onNewMessage} changeDefaultUser={this.changeDefaultUser}/>
        </div>
    );
  }
}
export default App;
